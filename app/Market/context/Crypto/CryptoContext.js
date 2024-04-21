// contexts/CryptoContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
export const Crypto = createContext();

// Define the props type for the CryptoContext component
const AppWrapper = ({ children }) => {
  // Create the CryptoContext component
  let [currency, setCurrency] = useState("INR");
  let [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "EURO") setSymbol("€");
    else if (currency === "JPY") setSymbol("¥");
    else if (currency === "RUB") setSymbol("₽");
  }, [currency]);
    
  // Define the context value
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default AppWrapper;
// Define a custom hook to use the CryptoContext
export function useAppContext() {
  const context = useContext(Crypto);
  return context;
}
