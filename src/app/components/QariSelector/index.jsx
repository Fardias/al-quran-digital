"use client";

import React from "react";
import { QARI_LIST } from "../../lib/qari";

const QariSelector = ({ value, onChange }) => {
  return (
    <div className="mb-5">
      <label
        htmlFor="qari-select"
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        Pembaca (Qari)
      </label>
      <select
        id="qari-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
      >
        {QARI_LIST.map((qari) => (
          <option key={qari.id} value={qari.id}>
            {qari.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QariSelector;
