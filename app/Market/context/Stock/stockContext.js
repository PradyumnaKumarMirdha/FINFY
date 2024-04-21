/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { createContext, useEffect, useState } from "react";

export const StockContext = createContext({});

export const StockProvider = ({ children }) => {
  const [stockData, setStockData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();

  const [coinSearch, setCoinSearch] = useState("");

  const [currency, setCurrency] = useState("inr");
  const [symbol, setSymbol] = useState("₹"); // Default symbol for INR
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [perPage, setPerPage] = useState(10);

  const [error, setError] = useState({ data: "", coinData: "", search: "" });

  const getStockData = async () => {
    setError({ ...error, data: "" });
    setStockData(); 
    setTotalPages(100);
    try {
      const data = await fetch(
        `http://localhost:8000/stockapi/scrape/?page=${page}&per_page=${perPage}`
      ).then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        let errorResponse = await res.json();
        setError({ ...error, data: errorResponse.error });
        throw new Error(errorResponse.error);
      }).then((json) => json);

      setStockData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinData = async (coinid) => {
    setCoinData();
    try {
      const data = await fetch(
        `http://localhost:8000/stockdetailapi/stock-detail/?symbol=${coinid}`
      )
        .then((res) => res.json())
        .then((json) => json);

      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://{removeme}api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);

      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };

  useEffect(() => {
    if (currency === "inr") setSymbol("₹");
    getStockData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <StockContext.Provider
      value={{
        stockData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        symbol,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setPerPage,
        perPage,
        getCoinData,
        coinData,
        error
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

