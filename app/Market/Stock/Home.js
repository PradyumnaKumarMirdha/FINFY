'use client'

import React from "react";

import "../../globals.css";
import "react-alice-carousel/lib/alice-carousel.css";

import { Breadcrumbs } from "@material-tailwind/react";
import { StorageProvider } from "../context/Stock/SavedContext";
import { StockProvider } from "../context/Stock/stockContext";

// Component
import Header from "../../../Components/Market/Stock/Header"
import Banner from "../../../Components/Market/Stock/Banner/Banner";
import Navigation from "../../../Components/Market/Stock/Navigation"

function Home() {
  return (
    <StockProvider>
      <StorageProvider>
      <main className="w-[100%] h-full flex flex-col dark:bg-transparent bg-white first-letter:  content-center items-center relative dark:text-white text-black">
        <Header />
        <main className="w-full m-2 bg-white  dark:bg-transparent">
        <Breadcrumbs className="bg-white dark:bg-transparent text-black dark:text-white relative z-21" fullWidth>
          <a href="#" className="text-black dark:text-white opacity-60 font-light">
            Market
          </a>
          <a href="#" className="text-black dark:text-white opacity-100 font-medium">
            Stock
          </a>
        </Breadcrumbs>
      </main>

        <Banner />

        <div className="w-full h-screen dark:bg-transparent bg-white fixed" />
        <Navigation />
      </main>
      </StorageProvider>
    </StockProvider>
  );
}

export default Home;
