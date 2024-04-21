"use client";
import debounce from "lodash.debounce";
import React, { useContext, useState } from "react";
import { Input } from "@material-tailwind/react";
import { CryptoContext } from "../../../../app/Market/context/Crypto/testCrypto";
import { Typography } from "@material-tailwind/react";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };
  return (
    <div className="relative w-auto" style={{ zIndex: 22 }}>
      <form
        style={{
          width: "100%", // This is equivalent to w-full
          height: "120%",
          position: "relative", // This is equivalent to relative
          display: "flex", // This is equivalent to flex
          alignItems: "center", // This is equivalent to items-center
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.05)", // This is equivalent to shadow-inner
          transition: "box-shadow 0.3s, transform 0.3s", // This is equivalent to transition-all transition-ease
          zIndex: "22", // This is equivalent to z-1
          ":hover": {
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", // This is equivalent to hover:shadow-lg
            transform: "scale(1.1)", // This is equivalent to hover:scale-110
          },
        }}
        className="w-full relative flex items-center shadow-inner hover:shadow-lg hover:scale-110 transition-all transition-ease"
        onSubmit={handleSubmit}
      >
        <Input
          style={{
            backgroundColor: "#f0f3fa", // Background color
            width: "100%", // Full width
            borderRadius: "0.375rem", // Border radius
            paddingLeft: "0.5rem", // Left padding
            outline: "none", // Remove outline
            placeholder: {
              fontSize: "1rem", // This is equivalent to placeholder:text-base
            },
            ":hover": {
              transform: "scale(1.05)", // Scale to 105%
              // Add any other styles you want to apply on hover
            },
          }}
          className="bg-[#f0f3fa] w-full rounded pl-2 placeholder:text-base required outline-0 "
          placeholder="Search here"
          color="black"
          onChange={handleInput}
          value={searchText}
        />
        <button type="submit" className="absolute pb-[8px] bg-transparent right-1 cursor-pointer">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                  fill="#8018f7"
                />
              </svg>
            </button>
      </form>
      {searchText.length > 0 ? (
        <ul style={{zIndex: 21}}
          className="absolute top-11 right-0 w-full h-96 rounded overflow-x-hidden py-2 bg-gray-100 bg-opacity-60  backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200
"
        >
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                >
                  <img
                    className="w-[1.5rem] h-[1.5rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />

                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full animate-pulse">
              <div className="flex items-center space-x-4">
                <Typography
                  as="div"
                  className="mb-4 h-10 w-10 rounded-full bg-gray-100"
                >
                  &nbsp;
                </Typography>
                <div className="space-y-2">
                  <Typography
                    as="div"
                    className="mb-4 h-3 w-[200px] rounded-full bg-gray-100"
                  >
                    &nbsp;
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </ul>
      ) : null}
    </div>
  );
};
const Search = () => {
  let { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 1000);

  return (
    <div className="relative lg:w-[50%] md:w-full">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;
