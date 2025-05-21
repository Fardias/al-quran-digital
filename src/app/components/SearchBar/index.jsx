"use client";

import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Cari surat..."
          onChange={(e) => onSearch(e.target.value)}
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
  );
};

export default SearchBar; 