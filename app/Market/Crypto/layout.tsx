import Navbar from "../../../Components/main/Navbar";
import StarsCanvas from "../../../Components/main/StarBackground";
import { StorageProvider } from "../context/Crypto/SavedContext";
import { CryptoProvider } from "../context/Crypto/testCrypto";
import { StockProvider } from "../context/Stock/stockContext";
export const metadata = {
  title: "FINFY : Market Crypto Data",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="$(inter.className) dark:bg-[#030014] bg-current overflow-y-scroll overflow-x-hidden w-[100vw] h-[full]"
      ><CryptoProvider>
        <StorageProvider>
          <StockProvider>

        <Navbar />
          <StarsCanvas />
          {children}
          {modal}
          </StockProvider>
        </StorageProvider>
      </CryptoProvider>
      </body>
    </html>
  );
}
