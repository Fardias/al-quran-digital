"use client";

import React, { useState } from "react";

const AyatCopyButton = ({
  teksArab,
  teksIndonesia,
  suratNamaLatin,
  nomorAyat,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${teksArab}\n\n${teksIndonesia}\n\n— QS. ${suratNamaLatin}: ${nomorAyat}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Gagal menyalin teks");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Tersalin" : "Salin ayat"}
      className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-800 text-slate-800 hover:bg-slate-100 transition-colors shrink-0 text-xs font-semibold"
    >
      {copied ? (
        <span className="text-[10px] leading-none">OK</span>
      ) : (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
};

export default AyatCopyButton;
