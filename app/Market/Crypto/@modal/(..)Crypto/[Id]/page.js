"use client";
import { useContext, useEffect, useState } from "react";

import ReactHtmlParser from "react-html-parser";
import { Skeleton } from "@material-ui/lab";

import { CryptoContext } from "../../../../context/Crypto/testCrypto";
import Modal from "./modal";
import Chart from "./Chart";
const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <div className="flex w-full rounded-r-lg mt-4 mb-2 justify-between">
      <span
        className="bg-[#25da72] h-1.5 w-[50%] transition-all transition-ease"
        style={{
          width: `${100 - "#25da72"}%`,
          backgroundColor: "#d6436e",
          width: "50%",
          borderRadius: "20px 0 0 20px",
        }}
      >
        &nbsp;
      </span>
      <span
        className="bg-[#25da72] h-1.5 w-[50%] transition-all transition-ease"
        style={{
          width: `${"#25da72"}%`,
          backgroundColor: "#25da72",
          width: "50%",
          borderRadius: " 0 20px 20px 0",
        }}
      >
        &nbsp;
      </span>
    </div>
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
      <div
        style={{ position: "fixed", zIndex: "22", marginTop: "5vh" }}
        className="w-[90%] h-[90%] flex bg-white bg-opacity-75 rounded-lg  text-black relative  lg:overflow-hidden scrollbar-thumb-gray-100s scrollbar-track-gray-200 overflow-x-hidden"
      >
        {data ? (
          <div className="flex flex-col lg:flex-row lg:justify-between lg:h-full p-6 ">
            <div className="flex flex-col lg:w-[50%] h-full pr-2 w-full ">
              <div className="flex w-full items-center ">
                <img
                  className="w-[3rem] h-[3rem] mx-1.5"
                  src={data.image.large}
                  alt={data.id}
                />
                <h1
                  style={{
                    fontSize: "1.5rem",
                    lineHeight: "1.75rem",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                  className="text-xl capitalize font-medium"
                >
                  {data.name}
                </h1>
                <span
                  className="text-sm py-0.5 px-2.5 ml-2  bg-[#8018f7] text-[#8018f7] bg-opacity-25 
        rounded uppercase
        "
                >
                  {data.symbol}
                </span>
              </div>
              <div className="flex w-full mt-6">
                <div className="w-full flex flex-col">
                  <div className="flex justify-between">
                    <span
                      style={{
                        fontSize: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#000", // This is equivalent to text-gray-100
                      }}
                    >
                      Price
                    </span>
                    <div
                      style={{
                        fontSize: "1rem",
                        padding: "0.25rem",
                        marginLeft: "0.5rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "0.25rem",
                        backgroundColor:
                          Number(data.market_data.price_change_percentage_24h) >
                          0
                            ? "rgba(5, 253, 18, 0.26)"
                            : "rgba(209, 52, 57, 0.25)",
                        color:
                          Number(data.market_data.price_change_percentage_24h) >
                          0
                            ? "#38a169"
                            : "#d6436e",
                      }}
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
                        style={{
                          width: "1rem",
                          marginLeft: "0.5rem",
                          fill:
                            Number(
                              data.market_data.price_change_percentage_24h
                            ) > 0
                              ? "#25da72"
                              : "#d6436e",
                          transform:
                            Number(
                              data.market_data.price_change_percentage_24h
                            ) > 0
                              ? "rotate(180deg)"
                              : "none",
                        }}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      lineHeight: "1.75rem",
                      fontWeight: "700",
                    }}
                  >
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
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.25rem",
                      textTransform: "capitalize", // This is equivalent to capitalize
                      color: "#6B7280", // This is equivalent to text-gray-100
                    }}
                  >
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
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.25rem",
                      textTransform: "capitalize", // This is equivalent to capitalize
                      color: "#6B7280", // This is equivalent to text-gray-100
                    }}
                  >
                    Fully diluted valuation
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
                <span
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25rem",
                    textTransform: "capitalize", // This is equivalent to capitalize
                    color: "#6B7280", // This is equivalent to text-gray-100
                  }}
                >
                  Total volume
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
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.25rem",
                      textTransform: "capitalize", // This is equivalent to capitalize
                      color: "#6B7280", // This is equivalent to text-gray-100
                    }}
                  >
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
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.25rem",
                      textTransform: "capitalize", // This is equivalent to capitalize
                      color: "#6B7280", // This is equivalent to text-gray-100
                      alignSelf: "end",
                    }}
                    className=" self-end justify-end text-end"
                  >
                    High 24H
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
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.25rem",
                      textTransform: "capitalize", // This is equivalent to capitalize
                      color: "#6B7280", // This is equivalent to text-gray-100
                    }}
                  >
                    Max supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 0,
                    }).format(data.market_data.max_supply)}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.25rem",
                      textTransform: "capitalize", // This is equivalent to capitalize
                      color: "#6B7280", // This is equivalent to text-gray-100
                      alignSelf: "end",
                    }}
                  >
                    Circulating supply
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
                    style={{
                      fontSize: "0.75rem", // text-sm
                      backgroundColor: "#ffffff", // bg-[#ffffff]
                      color: "#718096", // text-gray-400
                      hover: {
                        color: "#8018f7", // hover:text-[#8018f7]
                      },
                      paddingLeft: "0.25rem", // px-1.5
                      paddingRight: "0.25rem", // px-1.5
                      paddingTop: "0.25rem", // py-0.5
                      paddingBottom: "0.25rem", // py-0.5
                      marginTop: "0.25rem", // my-1
                      marginBottom: "0.25rem", // my-1
                      borderRadius: "0.25rem", // rounded-lg
                    }}
                    
                    href={data?.links?.homepage[0]}
                  >
                    {data?.links?.homepage[0].substring(0, 30)}
                  </a>
                  <a
                    target={"_blank"}
                    rel="no referrer"
                    style={{
                      fontSize: "0.75rem", // text-sm
                      backgroundColor: "#ffffff", // bg-[#ffffff]
                      color: "#718096", // text-gray-400
                      hover: {
                        color: "#8018f7", // hover:text-[#8018f7]
                      },
                      paddingLeft: "0.25rem", // px-1.5
                      paddingRight: "0.25rem", // px-1.5
                      paddingTop: "0.25rem", // py-0.5
                      paddingBottom: "0.25rem", // py-0.5
                      marginTop: "0.25rem", // my-1
                      marginBottom: "0.25rem", // my-1
                      borderRadius: "0.25rem", // rounded-lg
                    }}
                    
                    href={data?.links?.blockchain_site[0]}
                  >
                    {data?.links?.blockchain_site[0].substring(0, 30)}
                  </a>

                  {data?.links?.official_forum_url[0] && (
                    <a
                      target={"_blank"}
                      rel="no referrer"
                      style={{
                        fontSize: "0.75rem", // text-sm
                        backgroundColor: "#ffffff", // bg-[#ffffff]
                        color: "#718096", // text-gray-400
                        hover: {
                          color: "#8018f7", // hover:text-[#8018f7]
                        },
                        paddingLeft: "0.25rem", // px-1.5
                        paddingRight: "0.25rem", // px-1.5
                        paddingTop: "0.25rem", // py-0.5
                        paddingBottom: "0.25rem", // py-0.5
                        marginTop: "0.25rem", // my-1
                        marginBottom: "0.25rem", // my-1
                        borderRadius: "0.25rem", // rounded-lg
                      }}
                      
                      href={data?.links?.official_forum_url[0]}
                    >
                      {data?.links?.official_forum_url[0].substring(0, 30)}
                    </a>
                  )}
                </div>

                <div className="flex flex-col">
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.25rem",
                      textTransform: "capitalize",
                      color: "#6B7280",
                      paddingBottom: "0.75rem",
                    }}
                  >
                    Sentiment
                  </span>
                  <div className="flex justify-between flex-col">
                    <div
                      style={{
                        marginTop: ".25rem",
                        fontSize: "0.75rem",
                        display: "flex",
                        flexDirection: "row", // Changed from column to row
                        alignItems: "center", // Align items in the center vertically
                        textAlign: "justify",
                        fontWeight: "400",
                        letterSpacing: "0.025em",
                        paddingLeft: "0.25rem",
                        paddingRight: "0.25rem",
                        paddingTop: "0.25rem",
                        paddingBottom: "0.25rem",
                        marginLeft: "0.5rem",
                        marginBottom: "0.25rem",
                        lineHeight: "1.5",
                        backgroundColor: "rgba(37, 218, 114, 0.25)",
                        color: "#25da72",
                        borderRadius: "5px",
                      }}
                    >
                      <span>
                        {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#25da72"
                        style={{
                          width: "1rem",
                          marginLeft: "0.5rem",
                        }}
                        className={`rotate-180`}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between flex-col">
                    <div
                      style={{
                        marginTop: ".25rem",
                        fontSize: "0.75rem",
                        display: "flex",
                        flexDirection: "row", // Changed from column to row
                        alignItems: "center", // Align items in the center vertically
                        textAlign: "justify",
                        fontWeight: "400",
                        letterSpacing: "0.025em",
                        paddingLeft: "0.25rem",
                        paddingRight: "0.25rem",
                        paddingTop: "0.25rem",
                        paddingBottom: "0.25rem",
                        marginLeft: "0.5rem",
                        marginBottom: "0.25rem",
                        lineHeight: "1.5",
                        backgroundColor: "rgba(214, 67, 110, 0.25)",
                        color: "#d6436e",
                      }}
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25
           bg-[#d6436e] text-[#d6436e]
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
                        fill="#d6436e"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          width: "1rem",
                          marginLeft: "0.5rem",
                        }}
                        className={`rotate-180`}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <span style={{ paddingTop: "1.25rem", fontWeight: "600" }}>
                Rank: {data.market_cap_rank}
              </span>
              <p
                variant="h3"
                className="mt-5 text-sm text-justify font-light tracking-wide line-clamp-5 leading-relaxed "
              >
                {ReactHtmlParser(data.description.en)}.
              </p>
            </div>

            <div className="flex flex-col lg:w-[55%] w-full h-[60vh] lg:pl-4 pl-0 lg:mt-0 mt-2">
              <Chart id={data.id} />
            </div>
          </div>
        ) : (
          <div className="h-[90%] ">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:h-full p-6 ">
              <div className="flex flex-col lg:w-[50%] h-full pr-2 w-full ">
                <div className="flex w-full items-center pr-2">
                  <Skeleton variant="circle" width={80} height={80} />
                  <Skeleton
                    variant="rect"
                    width={300}
                    height={25}
                    className="text-lg capitalize font-medium ml-2"
                  />
                  <Skeleton
                    width={60}
                    height={30}
                    className="text-sm py-0.5 px-2.5 ml-2  bg-[#8018f7] text-[#8018f7] bg-opacity-25 
      rounded uppercase
      "
                  />
                </div>
                <div className="flex w-full mt-6">
                  <div className="w-full flex flex-col">
                    <div className="flex justify-between">
                      <span
                        style={{
                          fontSize: "1rem",
                          textTransform: "capitalize", // This is equivalent to capitalize
                          color: "#6B7280", // This is equivalent to text-gray-100
                        }}
                      >
                        Price
                      </span>
                      <div
                        className={`text-sm px-1 ml-2 font-medium flex items-center bg-[#25da72] text-[#25da72] rounded bg-opacity-25 uppercase
                    `}
                      >
                        <Skeleton variant="rect" width={80} />
                      </div>
                    </div>
                    <Skeleton
                      variant="rect"
                      width={150}
                      height={25}
                      className="text-lg font-bold"
                    />
                  </div>
                </div>

                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                    >
                      Market Cap
                    </span>
                    <Skeleton
                      variant="rect"
                      width={100}
                      height={20}
                      className="text-base font-bold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                    >
                      Fully diluted valuation
                    </span>
                    <Skeleton
                      variant="rect"
                      width={100}
                      height={20}
                      className="text-base font-bold"
                    />
                  </div>
                </div>

                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                    >
                      Total volume
                    </span>
                    <Skeleton variant="rect" className="text-base font-bold" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                      className="pr-[3.6ch]"
                    >
                      Low 24H
                    </span>
                    <Skeleton variant="rect" className="text-base font-bold" />
                  </div>
                </div>

                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                    >
                      high 24H
                    </span>
                    <Skeleton variant="rect" className="text-base font-bold" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                      className="pr-[3.1ch]"
                    >
                      Max supply
                    </span>
                    <Skeleton variant="rect" className="text-base font-bold" />
                  </div>
                </div>

                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                    >
                      Circulating supply
                    </span>
                    <Skeleton
                      variant="rect"
                      width={150}
                      className="text-base font-bold"
                    />
                  </div>
                </div>
                <div className="flex w-full mt-4 justify-between">
                  <div className="flex flex-col">
                    <Skeleton
                      width={200}
                      target={"_blank"}
                      rel="no referrer"
                      className="text-sm bg-[#f0f3fa] text-gray-100 hover:text-[#8018f7] px-1.5 py-0.5 my-1 rounded-lg"
                    />

                    <Skeleton
                      width={200}
                      target={"_blank"}
                      rel="no referrer"
                      className="text-sm bg-[#f0f3fa] text-gray-100 hover:text-[#8018f7] px-1.5 py-0.5 my-1 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                    >
                      sentiment
                    </span>
                    <div className="flex justify-between">
                      <Skeleton
                        width={50}
                        className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
        rounded uppercase bg-opacity-25 bg-[#25da72] text-[#25da72]
        `}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Skeleton
                        width={50}
                        className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
        rounded uppercase bg-opacity-25
         bg-[#d6436e] text-[#d6436e]
        `}
                      />
                    </div>
                  </div>
                </div>
                <Skeleton variant="text" className="text-base font-bold" />
                <Skeleton variant="text" className="text-base font-bold" />
                <Skeleton variant="text" className="text-base font-bold" />
              </div>

              <div className="flex flex-col lg:w-[60vw] w-full h-[60vh] lg:pl-4 pl-0 lg:mt-0 mt-2">
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  variant="rect"
                  className="text-base font-bold"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CoinDetailsPage;
