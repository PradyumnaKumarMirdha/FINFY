"use client";
import "./global.css";
import React, { useContext, useRef, useState } from "react";
import Search from "./Filters/Search";
import { StockContext } from "../../../app/Market/context/Stock/stockContext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button } from "@material-tailwind/react";
const Filters = () => {
  let { setSortBy, resetFunction } = useContext(StockContext);
  const resetRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
    resetFunction();
  };

  return (
    <div className=" w-full lg:h-12 h-full  border-0 flex lg:flex-row flex-col lg:items-center lg:justify-between relative align-start justify-between bg-white dark:bg-[transparent]">
      <Search />
      <div
        style={{ position: "relative", zIndex: "21" }}
        className="flex justify-between mt-4 lg:mt-0 md:flex-row flex-col relative "
      >
        <label
          className="relative flex md:justify-center justify-start items-center  text-[#131722] pr-6 "
          style={{ paddingRight: "0px" }}
        >
          <span className="mr-2 sm:font-bold font-medium sm:text-base text-sm w-16 dark:text-white">
            sort by:{" "}
          </span>
          <select
            name="sortby"
            className="h-12 text-black  rounded-md bg-[#f0f3fa] text-base 
            pl-3 pr-10 py-1 leading-4 capitalize shadow-md hover:shadow-xl focus:outline-0 transition-all transition-ease hover:scale-105
            w-full md:w-48
            "
            // onClick={handleSort}
          >
            <option value="market_cap_desc">Under Construction</option>
            <option value="market_cap_asc">Large Cap</option>
            <option value="volume_desc">Small Cap</option>
            <option value="volume_asc">Largest Employer</option>
            <option value="id_desc">Top Gainers</option>
            <option value="id_asc">Top Losers</option>
            <option value="gecko_asc">Best Performance</option>
            <option value="gecko_desc">Highest Revenue</option>
          </select>
        </label>
        <Button
          style={{
            width: "8rem", // Adjust the width value as needed
            backgroundColor: "#f0f3fa", // Background color
            color: "black", // Text color
            display: "flex",
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
            gap: "0.75rem", // Adjust the gap value as needed
            height: "auto", // Adjust height dynamically
            padding: "0.5rem", // Add padding
            paddingTop: "0.7rem", // Add padding
            paddingBottom: "0.7rem", // Add padding
            borderRadius: "0.375rem", // Add border radius
            transition: "all 0.3s ease", // Transition effect
            position: "relative",
            zIndex: "21"
          }}
          className="shadow-md hover:shadow-xl focus:outline-0 transition-all transition-ease hover:scale-105"
          fullWidth
          onClick={handleClick}
        >
          <div className="gap-2">
            <span>Reset</span>
            <RestartAltIcon className={animate ? "animate-spin" : ""} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Filters;
