"use client";

import React from "react";

const AyatTafsir = ({ teks, isOpen, onToggle, disabled }) => {
  return (
    <div className="mt-4 pt-4 border-t border-slate-300">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Tutup tafsir ayat" : "Buka tafsir ayat"}
        className="flex items-center gap-2 text-sm font-semibold text-slate-800 hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40 transition-opacity"
      >
        <svg
          className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {isOpen ? "Tutup tafsir" : "Tafsir"}
      </button>
      {isOpen && teks && (
        <p className="text-sm text-slate-700 whitespace-pre-line mt-3 leading-relaxed">
          {teks}
        </p>
      )}
    </div>
  );
};

export default AyatTafsir;
