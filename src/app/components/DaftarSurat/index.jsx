"use client";

import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "../SearchBar";

const DaftarSurat = ({ api }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurat = api.data.filter((item) =>
    item.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <div className="flex flex-col p-4 gap-5 md:grid md:grid-cols-2 lg:grid-cols-2 lg:px-[300px]">
        {filteredSurat.length > 0 ? (
          filteredSurat.map((item) => (
            <Link
              href={`/surat/${item.nomor}`}
              className="border-2 border-slate-800 rounded-xl p-4 flex gap-5 justify-between items-center hover:opacity-50 md:text-xl"
              key={item.nomor}
            >
              <div className="flex gap-5">
                <div className="flex bg-slate-800 w-[50px] h-[50px] rounded-full justify-center items-center text-center">
                  <h1 className="text-white">{item.nomor}</h1>
                </div>
                <div className="">
                  <h1 className="text-black font-bold">{item.namaLatin}</h1>
                  <h1 className="text-black">
                    {item.tempatTurun} | {item.jumlahAyat} Ayat
                  </h1>
                </div>
              </div>
              <h1 className="text-black text-end font-bold">{item.nama}</h1>
            </Link>
          ))
        ) : (
          <div className="col-span-2 p-4  rounded-xl text-center">
            <h1 className="text-slate-600 font-semibold text-lg">
              {searchQuery ? "Surat tidak ditemukan" : "Memuat daftar surat..."}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarSurat;
