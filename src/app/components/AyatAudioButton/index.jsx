"use client";

import React from "react";

const AyatAudioButton = ({
  isPlaying,
  isLoading,
  onToggle,
  disabled,
}) => {
  const ariaLabel = isLoading
    ? "Memuat audio ayat"
    : isPlaying
      ? "Jeda audio ayat"
      : "Putar audio ayat";

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-800 text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors shrink-0"
    >
      {isLoading ? (
        <svg
          className="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : isPlaying ? (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a7 7 0 000 12.728"
          />
        </svg>
      )}
    </button>
  );
};

export default AyatAudioButton;
