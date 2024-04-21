"use client";
import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "@/app/Market/context/testCrypto";
import Modal from "./modal";
import ReactHtmlParser from 'react-html-parser';
import Chart from "./Chart";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <>
      <span
        className="bg-red h-1.5 rounded-l-lg w-[50%] transition-all transition-ease"
        style={{ width: `${100 - green}%` }}
      >
        &nbsp;
      </span>
      <span
        className="bg-green h-1.5 rounded-r-lg w-[50%] transition-all transition-ease"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
  );
};

const CoinDetailsPage = ({ params }) => {
  const { getCoinData, coinData: data, currency } = useContext(CryptoContext);
  const [green, setGreen] = useState(0);

  useEffect(() => {
    getCoinData(params.Id);
  }, [params.Id]);

  

  return (
    <Modal>
      <div className="w-[80%] h-[80%] bg-white bg-opacity-75 rounded-lg text-black relative">
        {data ? (
          <div className="flex lg:flex-row lg:justify-between lg:h-full lg:w-full p-6">
            <div className="flex flex-col lg:w-[50%] h-full pr-2">
              <div className="flex lg:flex-row lg:items-center">
                <img
                  className="w-[3rem] h-[3rem] mx-1.5"
                  src={data.image.large}
                  alt={data.id}
                />
                <h1 className="text-xl capitalize font-medium">{data.name}</h1>
                <span
                  className="text-sm
        py-0.5 px-2.5 ml-2  bg-[#8018f7] text-[#8018f7] bg-opacity-25
        rounded uppercase
        "
                >
                  {data.symbol}
                </span>
              </div>
              <div className="flex lg:flex-row lg:mt-6">
                <div className="w-full flex flex-col">
                  <div className="flex lg:flex-row lg:justify-between">
                    <span>Price</span>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center
                      rounded uppercase bg-opacity-25
          ${
            data.market_data.price_change_percentage_24h > 0
              ? "bg-green text-green"
              : "bg-red text-red"
          }
          `}
                    >
                      <span>
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
                        ${
                          data.market_data.price_change_percentage_24h > 0
                            ? "fill-green rotate-180"
                            : "fill-red"
                        }
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      maximumSignificantDigits: 5,
                    }).format(data.market_data.current_price[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    Market Cap
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.market_cap[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    fully diluted valuation
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                    }).format(
                      data.market_data.fully_diluted_valuation[currency]
                    )}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col w-full mt-4 justify-between">
                <span className="text-sm capitalize text-gray-100">
                  total volume
                </span>
                <h2 className="text-base font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 0,
                  }).format(data.market_data.total_volume[currency])}
                </h2>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <HighLowIndicator
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    Low 24H
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.low_24h[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    high 24H
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>
              
              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    max supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 0,
                    }).format(data.market_data.max_supply)}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    circulating supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 0,
                    }).format(data.market_data.circulating_supply)}
                  </h2>
                </div>
              </div>
              
              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <a
                    target={"_blank"}
                    rel="no referrer"
                    className="text-sm bg-[#f0f3fa] text-gray-100 hover:text-[#8018f7] px-1.5 py-0.5 my-1 rounded-md"
                    href={data?.links?.homepage[0]}
                  >
                    {data?.links?.homepage[0].substring(0, 30)}
                  </a>
                  <a
                    target={"_blank"}
                    rel="no referrer"
                    className="text-sm bg-[#f0f3fa] text-gray-100 hover:text-[#8018f7] px-1.5 py-0.5 my-1 rounded-md"
                    href={data?.links?.blockchain_site[0]}
                  >
                    {data?.links?.blockchain_site[0].substring(0, 30)}
                  </a>

                  {data?.links?.official_forum_url[0] && (
                    <a
                      target={"_blank"}
                      rel="no referrer"
                      className="text-sm bg-[#f0f3fa] text-gray-100 hover:text-[#8018f7] px-1.5 py-0.5 my-1 rounded-md"
                      href={data?.links?.official_forum_url[0]}
                    >
                      {data?.links?.official_forum_url[0].substring(0, 30)}
                    </a>
                  )}
                </div>

                <div className="flex flex-col content-start">
                  <span className="text-sm capitalize text-gray-100">
                    sentiment
                  </span>
                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25 bg-green text-green
          
          `}
                    >
                      <span>
                        {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
                        fill-green rotate-180
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25
           bg-red text-red
          `}
                    >
                      <span>
                        {Number(data.sentiment_votes_down_percentage).toFixed(
                          2
                        )}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
              "fill-red"
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <span className="pt-5 font-semibold">Rank: {data.market_cap_rank}</span>
              <p variant="h3" className="mt-5 text-sm text-justify font-light tracking-wide line-clamp-5 leading-relaxed ">
              {ReactHtmlParser(data.description.en)}.
              </p>
            </div>

            <div className="flex flex-col w-[55%] h-full pl-3 ">
            <Chart id={data.id} />
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default CoinDetailsPage;

// "use client";
// import { useContext, useEffect, useState } from "react";
// import { CryptoContext } from "../../../../context/testCrypto";
// import Modal from "./modal";
// import ReactHtmlParser from 'react-html-parser';
// import Chart from "./Chart";

// const HighLowIndicator = ({ currentPrice, high, low }) => {
//   const [green, setGreen] = useState();

//   useEffect(() => {
//     let total = high - low;
//     let greenZone = ((high - currentPrice) * 100) / total;
//     setGreen(Math.ceil(greenZone));
//   }, [currentPrice, high, low]);

//   return (
//     <div className="flex w-full  mt-4 justify-between">
//       <span
//         className="bg-red h-1.5 rounded-l-lg w-[50%] lg:w-auto transition-all transition-ease"
//         style={{ width: `${100 - green}%` }}
//       >
//         &nbsp;
//       </span>
//       <span
//         className="bg-green h-1.5 rounded-r-lg w-[50%] lg:w-auto transition-all transition-ease"
//         style={{ width: `${green}%` }}
//       >
//         &nbsp;
//       </span>
//     </div>
//   );
// };

// const CoinDetailsPage = ({ params }) => {
//   const { getCoinData, coinData: data, currency } = useContext(CryptoContext);
//   const [green, setGreen] = useState(0);

//   useEffect(() => {
//     getCoinData(params.Id);
//   }, [params.Id]);

  

//   return (
//     <Modal>
//       <div className="w-[90%] h-[90%] flex bg-white bg-opacity-75 rounded-lg text-black relative  lg:overflow-hidden scrollbar-thumb-gray-100s scrollbar-track-gray-200 overflow-x-hidden">
//         {data ? (
//           <div className="flex flex-col lg:flex-row lg:justify-between lg:h-full p-6 ">
//             <div className="flex flex-col lg:w-[50%] h-full pr-2 w-full ">
//               <div className="flex w-full items-center ">
//                 <img
//                   className="w-[3rem] h-[3rem] mx-1.5"
//                   src={data.image.large}
//                   alt={data.id}
//                 />
//                 <h1 className="text-xl capitalize font-medium">{data.name}</h1>
//                 <span
//                   className="text-sm py-0.5 px-2.5 ml-2  bg-[#8018f7] text-[#8018f7] bg-opacity-25 
//         rounded uppercase
//         "
//                 >
//                   {data.symbol}
//                 </span>
//               </div>
//               <div className="flex w-full mt-6">
//                 <div className="w-full flex flex-col">
//                   <div className="flex justify-between">
//                     <span className="capitalize text-gray-100">Price</span>
//                     <div
//                       className={`text-sm px-1 ml-2 font-medium flex items-center bg-green text-green rounded bg-opacity-25 uppercase
//           ${
//             data.market_data.price_change_percentage_24h > 0
//               ? "bg-green text-green"
//               : "bg-red text-red"
//           }
//           `}
//                     >
//                       <span>
//                         {Number(
//                           data.market_data.price_change_percentage_24h
//                         ).toFixed(2)}
//                         %
//                       </span>
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 14 14"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className={`w-[1rem] ml-0.5 fill-green rotate-180
//                         ${
//                           data.market_data.price_change_percentage_24h > 0
//                             ? "fill-green rotate-180"
//                             : "fill-red"
//                         }
//                         `}
//                       >
//                         <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <h2 className="text-lg font-bold">
//                     {new Intl.NumberFormat("en-IN", {
//                       style: "currency",
//                       currency: currency,
//                       maximumSignificantDigits: 5,
//                     }).format(data.market_data.current_price[currency])}
//                   </h2>
//                 </div>
//               </div>

//               <div className="flex w-full mt-4 justify-between">
//                 <div className="flex flex-col">
//                   <span className="text-sm capitalize text-gray-100">
//                     Market Cap
//                   </span>
//                   <h2 className="text-base font-bold">
//                     {new Intl.NumberFormat("en-IN", {
//                       style: "currency",
//                       currency: currency,
//                       minimumFractionDigits: 0,
//                     }).format(data.market_data.market_cap[currency])}
//                   </h2>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-sm capitalize text-gray-100">
//                     fully diluted valuation
//                   </span>
//                   <h2 className="text-base font-bold">
//                     {new Intl.NumberFormat("en-IN", {
//                       style: "currency",
//                       currency: currency,
//                       notation: "compact",
//                     }).format(
//                       data.market_data.fully_diluted_valuation[currency]
//                     )}
//                   </h2>
//                 </div>
//               </div>

//               <div className="flex flex-col w-full mt-4 justify-between">
//                 <span className="text-sm capitalize text-gray-100">
//                   total volume
//                 </span>
//                 <h2 className="text-base font-bold">
//                   {new Intl.NumberFormat("en-IN", {
//                     style: "currency",
//                     currency: currency,
//                     minimumFractionDigits: 0,
//                   }).format(data.market_data.total_volume[currency])}
//                 </h2>
//               </div>

//               <div className="flex w-full mt-4 justify-between">
//                 <HighLowIndicator
//                   currentPrice={data.market_data.current_price[currency]}
//                   high={data.market_data.high_24h[currency]}
//                   low={data.market_data.low_24h[currency]}
//                 />
//               </div>

//               <div className="flex w-full mt-4 justify-between">
//                 <div className="flex flex-col">
//                   <span className="text-sm capitalize text-gray-100">
//                     Low 24H
//                   </span>
//                   <h2 className="text-base font-bold">
//                     {new Intl.NumberFormat("en-IN", {
//                       style: "currency",
//                       currency: currency,
//                       minimumFractionDigits: 5,
//                     }).format(data.market_data.low_24h[currency])}
//                   </h2>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-sm capitalize text-gray-100">
//                     high 24H
//                   </span>
//                   <h2 className="text-base font-bold">
//                     {new Intl.NumberFormat("en-IN", {
//                       style: "currency",
//                       currency: currency,
//                       minimumFractionDigits: 5,
//                     }).format(data.market_data.high_24h[currency])}
//                   </h2>
//                 </div>
//               </div>
              
//               <div className="flex w-full mt-4 justify-between">
//                 <div className="flex flex-col">
//                   <span className="text-sm capitalize text-gray-100">
//                     max supply
//                   </span>
//                   <h2 className="text-base font-bold">
//                     {new Intl.NumberFormat("en-IN", {
//                       minimumFractionDigits: 0,
//                     }).format(data.market_data.max_supply)}
//                   </h2>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-sm capitalize text-gray-100">
//                     circulating supply
//                   </span>
//                   <h2 className="text-base font-bold">
//                     {new Intl.NumberFormat("en-IN", {
//                       minimumFractionDigits: 0,
//                     }).format(data.market_data.circulating_supply)}
//                   </h2>
//                 </div>
//               </div>
              
//               <div className="flex w-full mt-4 justify-between">
//                 <div className="flex flex-col">
//                   <a
//                     target={"_blank"}
//                     rel="no referrer"
//                     className="text-sm bg-[#f0f3fa] text-gray-100 hover:text-[#8018f7] px-1.5 py-0.5 my-1 rounded-lg"
//                     href={data?.links?.homepage[0]}
//                   >
//                     {data?.links?.homepage[0].substring(0, 30)}
//                   </a>
//                   <a
//                     target={"_blank"}
//                     rel="no referrer"
//                     className="text-sm bg-[#f0f3fa] text-gray-100 hover:text-[#8018f7] px-1.5 py-0.5 my-1 rounded-lg"
//                     href={data?.links?.blockchain_site[0]}
//                   >
//                     {data?.links?.blockchain_site[0].substring(0, 30)}
//                   </a>

//                   {data?.links?.official_forum_url[0] && (
//                     <a
//                       target={"_blank"}
//                       rel="no referrer"
//                       className="text-sm bg-[#f0f3fa] text-gray-100 hover:text-[#8018f7] px-1.5 py-0.5 my-1 rounded-lg"
//                       href={data?.links?.official_forum_url[0]}
//                     >
//                       {data?.links?.official_forum_url[0].substring(0, 30)}
//                     </a>
//                   )}
//                 </div>

//                 <div className="flex flex-col">
//                   <span className="text-sm capitalize text-gray-100">
//                     sentiment
//                   </span>
//                   <div className="flex justify-between">
//                     <div
//                       className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
//           rounded uppercase bg-opacity-25 bg-green text-green
          
//           `}
//                     >
//                       <span>
//                         {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
//                       </span>
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 14 14"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className={`
//                         w-[1rem] ml-0.5
//                         fill-green rotate-180
//                         `}
//                       >
//                         <path d="M7.47951 " />
//                       </svg>
//                     </div>
//                   </div>

//                   <div className="flex justify-between">
//                     <div
//                       className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
//           rounded uppercase bg-opacity-25
//            bg-red text-red
//           `}
//                     >
//                       <span>
//                         {Number(data.sentiment_votes_down_percentage).toFixed(
//                           2
//                         )}
//                         %
//                       </span>
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 14 14"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className={`
//                         w-[1rem] ml-0.5
//               "fill-red"
//                         `}
//                       >
//                         <path d="M7.47951 " />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <span className="pt-5 font-semibold">Rank: {data.market_cap_rank}</span>
//               <p variant="h3" className="mt-5 text-sm text-justify font-light tracking-wide line-clamp-5 leading-relaxed ">
//               {ReactHtmlParser(data.description.en)}.
//               </p>
//             </div>

//             <div className="flex flex-col lg:w-[55%] w-full h-[60vh] lg:pl-4 pl-0 lg:mt-0 mt-2">
//             <Chart id={data.id} />
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </Modal>
//   );
// };

// export default CoinDetailsPage;

