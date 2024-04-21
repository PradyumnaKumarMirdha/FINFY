import Link from "next/link";
import "./globals.css"
const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-4">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Stocks Card */}
        <div className="cardCrypto flex flex-col items-center justify-center bg-gray-200 p-8 rounded-lg shadow-md w-full lg:w-1/2">
          <div className="card-content">
            <h2 className="card-title text-lg">Crypto Dashboard</h2>
            <p className="card-body py-3">
            Discover the exciting world of cryptocurrencies with real-time data updates. Stay informed about crypto market trends, digital asset prices, blockchain technology advancements, and more.
            </p>
            <Link className="button" href="/Dashboard/Crypto">
              View
            </Link>
          </div>
        </div>

        {/* Crypto Card */}
        <div className="cardStock flex flex-col items-center justify-center bg-gray-200 p-8 rounded-lg shadow-md w-full lg:w-1/2">
          <div className="card-content">
            <h2 className="card-title text-lg">Stock Dashboard</h2>
            <p className="card-body py-3">
            Dive into the dynamic realm of stocks and investments with up-to-date data insights. Stay abreast of market trends, stock prices, company performance, and investment opportunities.
            </p>
            <Link className="button" href="/Dashboard/Stock">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
