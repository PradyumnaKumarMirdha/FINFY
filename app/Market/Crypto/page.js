"use client";
import React, { useState } from "react";
import Home from "./Home";
import TableComponent from "../../../Components/Market/Crypto/TableComponent";
import Filters from "../../../Components/Market/Crypto/Filters";
import Link from "next/link";
import CryptoNews from "../../../Components/Market/News/CryptoNews";
// import dynamic from "next/dynamic";
// import CryptoDetail from '../CryptoDetail/page';

const Page = () => {
  const [cryptoId, setCryptoId] = useState(null);

  const handleCryptoDetailClick = (id) => {
    setCryptoId(id);
    setShowCryptoDetail(true);
  };

  const handleBackClick = () => {
    setShowCryptoDetail(false);
  };

  return (
    <div style={{position: 'relative', zIndex: '21'}} className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[90%] h-full flex flex-col dark:bg-[#ebd6ff16] rounded-md">
      <Home />
      <section className="mb-24 relative justify-center self-center w-[90%] px-6 py-2">
        <Filters />
        <TableComponent onCryptoDetailClick={handleCryptoDetailClick} />
      </section>
      <CryptoNews/>
      <div className="relative m-16 dark:text-white text-black">
        <button className="absolute py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black black_border bg-[#7e22ce]  text-white font-bold">
          WARNING!
        </button>

        <div className="purple_border p-8 border dark:border-white border-black">
          This
          <span className="font-mono text-purple-700 font-bold px-2">Project</span>
           is for educational purposes only, so this information isn't a recommendation for what you should personally do, as with any trade always first look then leap.
        </div>
      </div>
      </div>
    </div>
  );
};

export default Page;
