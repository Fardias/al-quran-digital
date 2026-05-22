"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import QariSelector from "../../components/QariSelector";
import AyatAudioButton from "../../components/AyatAudioButton";
import AyatCopyButton from "../../components/AyatCopyButton";
import SuratNavigation from "../../components/SuratNavigation";
import AyatTafsir from "../../components/AyatTafsir";
import {
  DEFAULT_QARI_ID,
  QARI_STORAGE_KEY,
  QARI_LIST,
} from "../../lib/qari";
import {
  saveLastRead,
  getAutoPlayAyat,
  setAutoPlayAyat,
} from "../../lib/bookmark";

const page = ({ params: { id } }) => {
  const searchParams = useSearchParams();
  const ayatParam = searchParams.get("ayat");

  const [data, setData] = useState(null);
  const [tafsirByAyat, setTafsirByAyat] = useState({});
  const [tafsirError, setTafsirError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [qariId, setQariId] = useState(DEFAULT_QARI_ID);
  const [autoPlayAyat, setAutoPlayAyatState] = useState(false);
  const [playingAyat, setPlayingAyat] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [errorAyat, setErrorAyat] = useState(null);
  const [expandedTafsir, setExpandedTafsir] = useState(() => new Set());

  const audioRef = useRef(null);
  const playingAyatRef = useRef(null);
  const autoPlayRef = useRef(false);
  const ayatListRef = useRef([]);
  const playAyatRef = useRef(null);
  const qariIdRef = useRef(DEFAULT_QARI_ID);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    playingAyatRef.current = playingAyat;
  }, [playingAyat]);

  useEffect(() => {
    autoPlayRef.current = autoPlayAyat;
  }, [autoPlayAyat]);

  useEffect(() => {
    qariIdRef.current = qariId;
  }, [qariId]);

  useEffect(() => {
    ayatListRef.current = data?.data?.ayat ?? [];
  }, [data]);

  useEffect(() => {
    const stored = localStorage.getItem(QARI_STORAGE_KEY);
    if (stored && QARI_LIST.some((q) => q.id === stored)) {
      setQariId(stored);
    }
    setAutoPlayAyatState(getAutoPlayAyat());
  }, []);

  useEffect(() => {
    localStorage.setItem(QARI_STORAGE_KEY, qariId);
  }, [qariId]);

  useEffect(() => {
    setAutoPlayAyat(autoPlayAyat);
  }, [autoPlayAyat]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingAyat(null);
    setAudioLoading(false);
    setAudioError(null);
    setErrorAyat(null);
  }, []);

  const resetAudioUi = useCallback(() => {
    setPlayingAyat(null);
    setAudioLoading(false);
    setAudioError(null);
    setErrorAyat(null);
  }, []);

  const playAyat = useCallback(
    (ayat) => {
      const audioUrl = ayat.audio?.[qariIdRef.current];
      if (!audioUrl || !audioRef.current) return;

      setAudioError(null);
      setErrorAyat(null);
      setAudioLoading(true);
      setPlayingAyat(ayat.nomorAyat);

      if (data?.data) {
        saveLastRead({
          suratNomor: data.data.nomor,
          suratNamaLatin: data.data.namaLatin,
          nomorAyat: ayat.nomorAyat,
        });
      }

      const audio = audioRef.current;
      audio.pause();
      audio.src = audioUrl;
      audio.load();
      audio.play().catch((err) => {
        console.error("Error playing audio:", err);
        setAudioLoading(false);
        setErrorAyat(ayat.nomorAyat);
        setAudioError("Gagal memutar audio");
      });
    },
    [data]
  );

  useEffect(() => {
    playAyatRef.current = playAyat;
  }, [playAyat]);

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleEnded = () => {
      const current = playingAyatRef.current;
      if (autoPlayRef.current && current && ayatListRef.current.length) {
        const nextAyat = ayatListRef.current.find(
          (a) => a.nomorAyat === current + 1
        );
        if (nextAyat && playAyatRef.current) {
          playAyatRef.current(nextAyat);
          return;
        }
      }
      resetAudioUi();
    };

    const handleCanPlay = () => {
      setAudioLoading(false);
      setAudioError(null);
      setErrorAyat(null);
    };

    const handleError = () => {
      console.error("Error loading audio");
      setAudioLoading(false);
      setErrorAyat(playingAyatRef.current);
      setAudioError("Gagal memuat audio");
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, [resetAudioUi]);

  useEffect(() => {
    stopAudio();
    setExpandedTafsir(new Set());
    hasScrolledRef.current = false;
  }, [id, qariId, stopAudio]);

  const toggleTafsir = useCallback((nomorAyat) => {
    setExpandedTafsir((prev) => {
      const next = new Set(prev);
      if (next.has(nomorAyat)) {
        next.delete(nomorAyat);
      } else {
        next.add(nomorAyat);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
      try {
        const [suratRes, tafsirRes] = await Promise.all([
          fetch(`${baseUrl}/surat/${id}`),
          fetch(`${baseUrl}/tafsir/${id}`),
        ]);

        const suratResult = await suratRes.json();
        setData(suratResult);

        if (suratResult?.data) {
          const nomorAyat = ayatParam
            ? parseInt(ayatParam, 10)
            : 1;
          const validAyat = suratResult.data.ayat?.some(
            (a) => a.nomorAyat === nomorAyat
          )
            ? nomorAyat
            : 1;

          saveLastRead({
            suratNomor: suratResult.data.nomor,
            suratNamaLatin: suratResult.data.namaLatin,
            nomorAyat: validAyat,
          });
        }

        if (tafsirRes.ok) {
          const tafsirResult = await tafsirRes.json();
          const map = {};
          tafsirResult?.data?.tafsir?.forEach((item) => {
            map[item.ayat] = item.teks;
          });
          setTafsirByAyat(map);
          setTafsirError(false);
        } else {
          setTafsirByAyat({});
          setTafsirError(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTafsirByAyat({});
        setTafsirError(true);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    setTafsirError(false);
    fetchData();
  }, [id, ayatParam]);

  useEffect(() => {
    if (loading || !data?.data || hasScrolledRef.current || !ayatParam) return;

    const nomor = parseInt(ayatParam, 10);
    if (Number.isNaN(nomor)) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(`ayat-${nomor}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        hasScrolledRef.current = true;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [loading, data, ayatParam]);

  const toggleAudio = useCallback(
    (ayat) => {
      if (playingAyat === ayat.nomorAyat && audioRef.current && !audioRef.current.paused) {
        stopAudio();
        return;
      }
      playAyat(ayat);
    },
    [playingAyat, stopAudio, playAyat]
  );

  if (loading) {
    return (
      <div className="lg:px-[300px] p-4 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="lg:px-[300px] p-4 text-center">
        <p className="text-slate-600 font-semibold">Gagal memuat data surat.</p>
      </div>
    );
  }

  const filteredAyat = data.data.ayat.filter((item) =>
    item.nomorAyat.toString().includes(searchQuery)
  );

  return (
    <div className="lg:px-[300px]">
      <div className="p-4 md:text-xl">
        <div className="p-4 border-2 border-slate-800 rounded-xl text-center mb-5">
          <h1 className="font-bold">{data.data.namaLatin}</h1>
          <h1>-{data.data.arti}-</h1>
          <h1 className="mb-3">{data.data.jumlahAyat} Ayat</h1>
        </div>

        <SuratNavigation
          suratSebelumnya={data.data.suratSebelumnya}
          suratSelanjutnya={data.data.suratSelanjutnya}
        />

        <div className="mb-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari nomor ayat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <QariSelector value={qariId} onChange={setQariId} />

        <label className="flex items-center gap-2 mb-5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoPlayAyat}
            onChange={(e) => setAutoPlayAyatState(e.target.checked)}
            className="w-4 h-4 accent-slate-800"
          />
          <span className="text-sm font-semibold text-slate-700">
            Mode tilawah (lanjut ayat berikutnya)
          </span>
        </label>

        {tafsirError && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-5">
            Tafsir gagal dimuat.
          </p>
        )}

        <div className="flex flex-col gap-5">
          {filteredAyat.length > 0 ? (
            filteredAyat.map((item) => (
              <div
                key={item.nomorAyat}
                id={`ayat-${item.nomorAyat}`}
                className="p-4 border-2 border-slate-800 rounded-xl"
              >
                <div className="flex justify-between items-start mb-3">
                  <h1 className="font-bold">{item.nomorAyat}.</h1>
                  <div className="flex gap-2">
                    <AyatCopyButton
                      teksArab={item.teksArab}
                      teksIndonesia={item.teksIndonesia}
                      suratNamaLatin={data.data.namaLatin}
                      nomorAyat={item.nomorAyat}
                    />
                    <AyatAudioButton
                      isPlaying={playingAyat === item.nomorAyat}
                      isLoading={
                        audioLoading && playingAyat === item.nomorAyat
                      }
                      onToggle={() => toggleAudio(item)}
                      disabled={!item.audio?.[qariId]}
                    />
                  </div>
                </div>
                {audioError && errorAyat === item.nomorAyat && (
                  <p className="text-sm text-red-600 mb-2">{audioError}</p>
                )}
                <h1 className="text-end mb-5 font-bold text-[25px]">
                  {item.teksArab}
                </h1>
                <h1 className="italic font-semibold">{item.teksLatin}</h1>
                <h1>{item.teksIndonesia}</h1>
                <AyatTafsir
                  teks={tafsirByAyat[item.nomorAyat]}
                  isOpen={expandedTafsir.has(item.nomorAyat)}
                  onToggle={() => toggleTafsir(item.nomorAyat)}
                  disabled={
                    tafsirError || !tafsirByAyat[item.nomorAyat]
                  }
                />
              </div>
            ))
          ) : (
            <div className="p-4 border-2 border-slate-800 rounded-xl text-center">
              <h1 className="text-slate-600 font-semibold">
                {searchQuery ? "Ayat tidak ditemukan" : "Memuat ayat..."}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
