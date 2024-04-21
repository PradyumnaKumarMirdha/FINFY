'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Blackhole from "./Blackhole";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (<>
 
    <div className="navbar-wrapper ">
      <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 dark:bg-[#03001417] bg-transparent backdrop-blur-md z-50 px-10  justify-start">
        <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
          <a
            href="#about-me"
            className="h-auto w-auto flex flex-row items-center"
          >
            <Image
              src="/finfybot.png"
              alt="logo"
              width={70}
              height={70}
              className="cursor-pointer hover:animate-slowspin "
            />

            <span className="font-bold ml-[12px] hidden md:block text-2xl dark:text-gray-300 text-black">
              FINFY
            </span>
          </a>
          {/* bg-[#0300145e] */}
          <div className="w-[700px] h-full flex flex-row items-center justify-between md:mr-20">
            <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] dark:bg-[#0300145e] bg-gradient-to-br from-opacity-40 to-opacity-40 via-gradient-purple mr-[15px] px-[20px] py-[10px] rounded-full dark:text-gray-200 text-black">
              <Link
                href="/"
                className="nav-link cursor-pointer hover:font-bold"
              >
                Home
              </Link>
              <a
                href="/Dashboard"
                className="nav-link cursor-pointer hover:font-bold"
              >
                Dashboard
              </a>
              <a
                href="/Market"
                className="nav-link cursor-pointer hover:font-bold"
              >
                Market
              </a>
              <Link
                href="/Calculator"
                className="nav-link cursor-pointer hover:font-bold"
              >
                Calculator
              </Link>
              <Link
                href="/News"
                className="nav-link cursor-pointer hover:font-bold"
              >
                News
              </Link>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <ThemeToggle setDarkModeLocal={setDarkMode}/>
            {/* {Socials.map((social) => (
              <Image
                src={social.src}
                alt={social.name}
                key={social.name}
                width={24}
                height={24}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
    {darkMode && <Blackhole />}
    <div className="h-[65px]"></div>
    </>
  );
};

export default Navbar;
