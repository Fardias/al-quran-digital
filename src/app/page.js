import DaftarSurat from "./components/DaftarSurat";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/surat`);
  const data = await response.json();
  // console.log(data.data);
  return (
    <div>
      <DaftarSurat api={data}/>
    </div>
  );
}
