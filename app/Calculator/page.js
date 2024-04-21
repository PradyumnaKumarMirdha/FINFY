import React from "react";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <>
      <div className="mx-auto p-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            className="w-full bg-slate-300 bg-opacity-10 rounded-lg  inline-block shadow-xl border-1 m-[2%] hover:scale-110 transition-transform ease"
            style={{ position: "relative", zIndex: "21" }}
          >
            <Link className="block p-[28px]" href="/Calculator/Loan">
              <div className="w-full rounded-md mb-[35px] flex items-center justify-center align-middle">
                <Image
                  src="/loan-calculator.svg"
                  className="size-[5rem] self-center align-middle justify-center items-center"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-center p-[10px] text-xl font-semibold">
                <div className="dark:text-white text-black">
                  Loan Calculator
                </div>
              </div>
              <div className="p-[3px] text-center pt-[10px] border-1 text-[#666] ">
                <p className="leading-5">Calculate your loans and EMIs</p>
              </div>
            </Link>
          </div>
          <div
            className="w-full  bg-slate-300 bg-opacity-10 rounded-lg inline-block shadow-xl border-1 m-[2%] hover:scale-110 transition-transform ease"
            style={{ position: "relative", zIndex: "21" }}
          >
            <Link className="block p-[28px]" href="/Calculator/GST">
              <div className="w-full rounded-md mb-[35px] flex items-center justify-center align-middle">
                <Image
                  src="/gst-calculator.svg"
                  className="size-[5rem] self-center align-middle justify-center items-center"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-center p-[10px] text-xl font-semibold ">
                <div className="dark:text-white text-black">GST Calculator</div>
              </div>
              <div className="p-[3px] text-center pt-[10px] border-1 text-[#666] ">
                <p className="leading-5">Calculate inclusive GST on purchase</p>
              </div>
            </Link>
          </div>
          <div
            className="w-full  bg-slate-300 bg-opacity-10 rounded-lg inline-block shadow-xl border-1 m-[2%] hover:scale-110 transition-transform ease"
            style={{ position: "relative", zIndex: "21" }}
          >
            <Link className="block p-[28px]" href="/Calculator/FD">
              <div className="w-full rounded-md mb-[35px] flex items-center justify-center align-middle">
                <Image
                  src="/fd-calculator.svg"
                  className="size-[5rem] self-center align-middle justify-center items-center"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-center p-[10px] text-xl font-semibold ">
                <div className="dark:text-white text-black">FD Calculator</div>
              </div>
              <div className="p-[3px] text-center pt-[10px] border-1 text-[#666] ">
                <p className="leading-5">Calculate returns on your FD</p>
              </div>
            </Link>
          </div>
          <div
            className="w-full  bg-slate-300 bg-opacity-10 rounded-lg inline-block shadow-xl border-1 m-[2%] hover:scale-110 transition-transform ease"
            style={{ position: "relative", zIndex: "21" }}
          >
            <Link className="block p-[28px]" href="/Calculator/RD">
              <div className="w-full rounded-md mb-[35px] flex items-center justify-center align-middle">
                <Image
                  src="/rd-calculator.svg"
                  className="size-[5rem] self-center align-middle justify-center items-center"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-center p-[10px] text-xl font-semibold ">
                <div className="dark:text-white text-black">RD Calculator</div>
              </div>
              <div className="p-[3px] text-center pt-[10px] border-1 text-[#666] ">
                <p className="leading-5">Calculate returns on your RD</p>
              </div>
            </Link>
          </div>
          <div
            className="w-full  bg-slate-300 bg-opacity-10 rounded-lg inline-block shadow-xl border-1 m-[2%] hover:scale-110 transition-transform ease"
            style={{ position: "relative", zIndex: "21" }}
          >
            <Link className="block p-[28px]" href="/Calculator/NPS">
              <div className="w-full rounded-md mb-[35px] flex items-center justify-center align-middle">
                <Image
                  src="/npsCalculator.svg"
                  className="size-[5rem] self-center align-middle justify-center items-center"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-center p-[10px] text-xl font-semibold ">
                <div className="dark:text-white text-black">NPS Calculator</div>
              </div>
              <div className="p-[3px] text-center pt-[10px] border-1 text-[#666] ">
                <p className="leading-5">
                  Calculate the amount of pension according to NPS
                </p>
              </div>
            </Link>
          </div>
          <div
            className="w-full  bg-slate-300 bg-opacity-10 rounded-lg inline-block shadow-xl border-1 m-[2%] hover:scale-110 transition-transform ease"
            style={{ position: "relative", zIndex: "21" }}
          >
            <Link className="block p-[28px]" href="/Calculator/SIP">
              <div className="w-full rounded-md mb-[35px] flex items-center justify-center align-middle">
                <Image
                  src="/sip-calculator.svg"
                  className="size-[5rem] self-center align-middle justify-center items-center"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-center p-[10px] text-xl font-semibold">
                <div className="dark:text-white text-black">SIP Calculator</div>
              </div>
              <div className="p-[3px] text-center pt-[10px] border-1 text-[#666] ">
                <p className="leading-5">
                  Calculate the returns on invested SIP
                </p>
              </div>
            </Link>
          </div>
          <div
            className="w-full  bg-slate-300 bg-opacity-10 rounded-lg inline-block shadow-xl border-1 m-[2%] hover:scale-110 transition-transform ease"
            style={{ position: "relative", zIndex: "21" }}
          >
            <Link className="block p-[28px]" href="/Calculator/Lumpsum">
              <div className="w-full rounded-md mb-[35px] flex items-center justify-center align-middle">
                <Image
                  src="/lumpsum-calculator.svg"
                  className="size-[5rem] self-center align-middle justify-center items-center"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-center p-[10px] text-xl font-semibold ">
                <div className="dark:text-white text-black">
                  Lumpsum Calculator
                </div>
              </div>
              <div className="p-[3px] text-center pt-[10px] border-1 text-[#666] ">
                <p className="leading-5">
                  Calculate returns on lumpsum investment
                </p>
              </div>
            </Link>
          </div>
          <div
            className="w-full  bg-slate-300 bg-opacity-10 rounded-lg inline-block shadow-xl border-1 m-[2%] hover:scale-110 transition-transform ease"
            style={{ position: "relative", zIndex: "21" }}
          >
            <Link className="block p-[28px]" href="/Calculator/PPF">
              <div className="w-full rounded-md mb-[35px] flex items-center justify-center align-middle">
                <Image
                  src="/ppf.svg"
                  className="size-[5rem] self-center align-middle justify-center items-center"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-center p-[10px] text-xl font-semibold ">
                <div className="dark:text-white text-black">PPF Calculator</div>
              </div>
              <div className="p-[3px] text-center pt-[10px] border-1 text-[#666] ">
                <p className="leading-5">
                  Calculate the returns on PPF investment
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
