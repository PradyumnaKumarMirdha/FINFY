"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-4 md:px-20 mt-8 md:mt-40 w-full z-[20]"
    >
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-center md:text-start md:items-center gap-5">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[15px] border border-[#7042f88b] opacity-[0.9]"
        >
          <h1 className="Welcome-text text-[18px]">A.I. Assistant</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-3xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Providing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              the best{" "}
            </span>
            Financial experience
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px] text-center md:text-left"
        >
          Hi.. I&apos;m <span className="text-lg font-bold">FINFY</span>.<br />
          Your financial assistant came here to help you with all your Questions.
          <br />
          Feel Free to ask me anything.
        </motion.p>

        {/* Link with motion animation */}
        <Link href="/Home">
          <motion.div className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]" variants={slideInFromLeft(1)}>
            Start Now
          </motion.div>
        </Link>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full md:w-1/2 h-full flex justify-center items-center"
      >
        <Image src="/mainIconsdark.svg" alt="work icons" height={350} width={350} />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
