import Link from "next/link";
import React from "react";

const DaftarSurat = ({ api }) => {
  return (
    <div>
      <div className="flex flex-col p-4 gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
        {api.data.map((item) => (
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
              </div>{" "}
            </div>
            <h1 className="text-black text-end font-bold">{item.nama}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DaftarSurat;
