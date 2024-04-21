"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "../../utils/motion";
import Image from "next/image";
import Link from "next/link";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center items-center md:items-start text-center md:text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[15px] border border-[#7042f88b] dark:opacity-[0.9] opacity-0"
        >
          <h1 className="Welcome-text text-[18px] dark:text-transparent text-gray-700">A.I. Assistant</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold dark:text-white text-black max-w-[600px] w-auto h-auto"
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
          className="text-lg dark:text-gray-400 text-gray-800 my-5 max-w-[600px]"
        >
          Hi.. I&apos;m <span className="text-lg font-bold">FINFY</span>.<br />
          Your financial assistant came here to help you with all your Questions.
          <br />
          Feel Free to ask me anything.
        </motion.p>

        {/* Link with motion animation */}
        <Link href="/Home"  >
        <motion.div className="py-2 button-primary text-center dark:text-white text-gray-900 cursor-pointer rounded-lg w-[200px]"variants={slideInFromLeft(1)}>
              Start Now
        </motion.div>
        </Link>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image src="/mainIconsdark.svg" alt="work icons" height={650} width={650} />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
