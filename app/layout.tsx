import "./globals.css";
import StarsCanvas from "../Components/main/StarBackground";
import Navbar from "../Components/main/Navbar";
import Blackhole from "../Components/main/Blackhole";
import Home from "../Components/header/index";
import ChainWrapper from "./Dashboard/thirdWeb/ChainWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: './global_Model_Image.png'
  }
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`$(inter.className) dark:bg-[#030014] bg-[#F7F7F7] overflow-y-scroll overflow-x-hidden w-[100vw]`}
      >
        <ChainWrapper>
          <Navbar />
          <StarsCanvas />
          <Home />
          {children}
        </ChainWrapper>
      </body>
    </html>
  );
}
