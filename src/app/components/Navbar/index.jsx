import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-slate-800 text-slate-400 p-4 text-center font-bold">
      <Link className="md:text-2xl" href="/">AL-QURAN DIGITAL</Link>
    </div>
  );
};

export default Navbar;
