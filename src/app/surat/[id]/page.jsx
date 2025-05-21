"use client";

import React, { useState } from "react";

const page = ({ params: { id } }) => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/surat/${id}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="lg:px-[300px] p-4 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const filteredAyat = data?.data?.ayat.filter((item) =>
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

        {/* Search Bar */}
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

        <div className="flex flex-col gap-5">
          {filteredAyat?.length > 0 ? (
            filteredAyat.map((item) => (
              <div key={item.nomorAyat} className="p-4 border-2 border-slate-800 rounded-xl">
                <h1 className="font-bold mb-3">{item.nomorAyat}.</h1>
                <h1 className="text-end mb-5 font-bold text-[25px]">
                  {item.teksArab}
                </h1>
                <h1 className="italic font-semibold">{item.teksLatin}</h1>
                <h1>{item.teksIndonesia}</h1>
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
