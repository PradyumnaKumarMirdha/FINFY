// App.js
"use client";
import React from "react";
import "../../globals.css";
import Header from "../../../Components/Market/Crypto/Header";
import Navigation from "../../../Components/Market/Crypto/Navigation";
import Banner from "../../../Components/Market/Crypto/Banner/Banner";
import "react-alice-carousel/lib/alice-carousel.css";
import AppWrapper from "../context/Crypto/CryptoContext";
import { StorageProvider } from "../context/Crypto/SavedContext";
import { Breadcrumbs } from "@material-tailwind/react";
function Home() {
  return (
    <AppWrapper>
      <StorageProvider>
        <main className="w-[100%] h-full flex flex-col dark:bg-transparent bg-white first-letter:  content-center items-center relative dark:text-white text-black">
          <Header />
          <main className="w-full m-2 bg-white dark:bg-transparent">
            <Breadcrumbs
              className="bg-white dark:bg-transparent text-black dark:text-white relative z-21"
              fullWidth
            >
              <a
                href="#"
                className="text-black dark:text-white opacity-100 font-medium"
              >
                Market
              </a>
              <a
                href="#"
                className="w-full text-black dark:bg-transparent bg-white dark:text-white opacity-100 font-medium"
              >
                Crypto
              </a>
            </Breadcrumbs>
          </main>

          <Banner />

          <div className="w-full h-screen dark:bg-transparent bg-white fixed" />
          <Navigation />
        </main>
      </StorageProvider>
    </AppWrapper>
  );
}

export default Home;
