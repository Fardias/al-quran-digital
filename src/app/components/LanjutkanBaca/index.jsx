"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getLastRead, removeLastRead } from "../../lib/bookmark";

const LanjutkanBaca = () => {
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    setLastRead(getLastRead());
  }, []);

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeLastRead();
    setLastRead(null);
  };

  if (!lastRead) return null;

  return (
    <div className="px-4 lg:px-[300px] mb-4">
      <div className="border-2 border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50">
        <Link
          href={`/surat/${lastRead.suratNomor}?ayat=${lastRead.nomorAyat}`}
          className="hover:opacity-70 transition-opacity"
        >
          <p className="text-sm text-slate-600">Lanjutkan baca</p>
          <p className="font-bold text-slate-800 md:text-lg">
            {lastRead.suratNamaLatin} — Ayat {lastRead.nomorAyat}
          </p>
        </Link>
        <button
          type="button"
          onClick={handleRemove}
          className="text-sm font-semibold text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg px-3 py-1.5 shrink-0 self-start sm:self-center"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default LanjutkanBaca;
