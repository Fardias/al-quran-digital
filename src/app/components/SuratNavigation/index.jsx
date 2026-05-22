"use client";

import Link from "next/link";
import React from "react";

const SuratNavigation = ({ suratSebelumnya, suratSelanjutnya }) => {
  return (
    <div className="flex justify-between gap-3 mb-5">
      <div className="flex-1 min-w-0">
        {suratSebelumnya ? (
          <Link
            href={`/surat/${suratSebelumnya.nomor}`}
            className="block border-2 border-slate-800 rounded-xl p-3 md:p-4 hover:opacity-50 text-sm md:text-base font-semibold text-slate-800 truncate"
          >
            ← {suratSebelumnya.namaLatin}
          </Link>
        ) : null}
      </div>
      <div className="flex-1 min-w-0 text-end">
        {suratSelanjutnya ? (
          <Link
            href={`/surat/${suratSelanjutnya.nomor}`}
            className="block border-2 border-slate-800 rounded-xl p-3 md:p-4 hover:opacity-50 text-sm md:text-base font-semibold text-slate-800 truncate"
          >
            {suratSelanjutnya.namaLatin} →
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default SuratNavigation;
