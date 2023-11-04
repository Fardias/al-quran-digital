import React from "react";

const page = async ({ params: { id } }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/surat/${id}`
  );
  const data = await response.json();
    console.log(data.data.ayat[0].teksLatin);
  return (
    <div className="p-4 md:text-xl">
      <div className="p-4 border-2 border-slate-800 rounded-xl text-center mb-5">
        <h1 className="font-bold">{data.data.namaLatin}</h1>
        <h1>-{data.data.arti}-</h1>
        <h1>{data.data.jumlahAyat} Ayat</h1>
      </div>{" "}



    <div className="flex flex-col gap-5">
    {data.data.ayat.map((item) => (
        <div className="p-4 border-2 border-slate-800 rounded-xl">
            <h1 className="font-bold mb-3">{item.nomorAyat}.</h1>
            <h1 className="text-end mb-5 font-bold text-[25px]">{item.teksArab}</h1>
            <h1 className="italic font-semibold">{item.teksLatin}</h1>
            <h1>{item.teksIndonesia}</h1>
      </div>
    ))}
    </div>
    </div>
  );
};

export default page;
