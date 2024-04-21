/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { StockContext } from "./stockContext";

// Create context object
export const SavedContext = createContext({});

// Create the provider component
export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState();
  const router = useRouter();

  let { currency, sortBy } = useContext(StockContext);

  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      let newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    let newCoin = oldCoins.filter((coin) => coin !== coinId);

    setAllCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  };

  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      ).then((res) => res.json());

      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSavedResult = () => {
    getSavedData();
  };

  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setSavedData();
    }
  }, [allCoins]);

  useEffect(() => {
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;

    if (!isThere) {
      // Set the local storage with an empty array
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      // Set the state with the current values from the local storage
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(totalCoins);

      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    }
  }, []);

  // Use Next.js router events to listen for route changes and reset saved data
  useEffect(() => {
    const handleRouteChange = (url) => {
        resetSavedResult();
    };

    if (router && router.events) {
        const routeChangeComplete = () => {
            handleRouteChange(router.pathname);
        };

        router.events.on("routeChangeComplete", routeChangeComplete);

        return () => {
            router.events.off("routeChangeComplete", routeChangeComplete);
        };
    }
}, [router]);

  return (
    <SavedContext.Provider
      value={{
        saveCoin,
        allCoins,
        removeCoin,
        savedData,
        resetSavedResult,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};
