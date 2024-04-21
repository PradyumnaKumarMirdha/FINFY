import { CryptoProvider } from "../context/Crypto/testCrypto";
export const metadata = {
  title: "Finfy: Crypto Market",
  description: "Crypto Saved",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="$(inter.className) dark:bg-[#030014] bg-current overflow-y-scroll overflow-x-hidden w-[100vw] h-[full] first-letter:
        content-center items-center relative text-white"
      >
        <CryptoProvider>
          {children}
        </CryptoProvider>
      </body>
    </html>
  );
}
