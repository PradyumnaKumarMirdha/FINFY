import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-[8]">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Crypto Card */}
        <div className="cardCrypto flex flex-col items-center justify-center bg-gray-200 p-8 rounded-lg shadow-md w-full lg:w-1/2">
          <div className="card-content">
            <h2 className="card-title text-lg">Crypto Market</h2>
            <p className="card-body py-3">
            Explore cryptocurrencies with real-time updates and in-depth analysis. Get news and insights, helping you to navigate the complexities of digital assets.
            </p>
            <Link className="button" href="/Market/Crypto">
              View
            </Link>
          </div>
        </div>

        {/* Stock Card */}
        <div className="cardStock flex flex-col items-center justify-center bg-transparent p-8 rounded-lg shadow-md w-full lg:w-1/2">
          <div className="card-content">
            <h2 className="card-title text-lg">Stock Market</h2>
            <p className="card-body py-3">
            Explore the dynamic world of stocks and investments with real-time data updates. Stay informed about market trends, stock prices, and company performance.
            </p>
            <Link className="button" href="/Market/Stock">
              View
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Page;
