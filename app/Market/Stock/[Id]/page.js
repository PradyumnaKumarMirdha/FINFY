"use client";
import { useContext, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { StockContext } from "../../context/Stock/stockContext";
import Chart from "../@modal/(..)Stock/[id]/Chart";
import { Skeleton } from "@material-ui/lab";

// Dark Hover box color : #2a2e39
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
  const { getCoinData, coinData: data, currency } = useContext(StockContext);
  const [green, setGreen] = useState(0);
  const symbol = params.Id;

  useEffect(() => {
    getCoinData(params.Id);
  }, [params.Id]);

  return (
    <div
      style={{ position: "fixed", zIndex: "21" }}
      className="h-[90%] flex bg-white bg-opacity-75 rounded-lg text-black relative  lg:overflow-hidden scrollbar-thumb-gray-100s scrollbar-track-purple-400 overflow-x-hidden"
    >
      {data ? (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:h-full p-6 ">
          <div className="flex flex-col lg:w-[50%] h-full pr-2 w-full ">
            <div className="flex w-full items-center pr-2">
              <img
                className="w-[3rem] h-[3rem] rounded-full"
                src={data.data_preview.stock_image}
                alt={data.data_preview.company}
              />
              <h1 className="text-lg capitalize font-medium pl-2">
                {data.data_preview.company}
              </h1>
              <span
                className="text-sm py-0.5 px-2.5 ml-2  bg-[#8018f7] text-[#8018f7] bg-opacity-25 
        rounded uppercase
        "
              >
                {data.about.ISIN}
              </span>
            </div>
            <div className="flex w-full mt-6">
              <div className="w-full flex flex-col">
                <div className="flex justify-between">
                  <span
                    style={{
                      fontSize: "1rem", 
                      lineHeight: "1.25rem",
                      textTransform: "capitalize", // This is equivalent to capitalize
                      color: "#6B7280", // This is equivalent to text-gray-100
                    }}
                  >
                    Price
                  </span>
                  <div
                    style={{
                      fontSize: "1rem",
                      padding: "0.25rem",
                      marginLeft: "0.5rem",
                      marginTop: "0.25rem",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "0.25rem",
                      backgroundColor:
                        Number(data.data_preview.symbol_change_pt) > 0
                          ? "rgba(5, 253, 18, 0.26)"
                          : "rgba(209, 52, 57, 0.25)",
                      color:
                        Number(data.data_preview.symbol_change_pt) > 0
                          ? "#38a169"
                          : "#ef4444",
                    }}
                  >
                    <span>{Number(data.data_preview.symbol_change_pt)}%</span>
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
                          Number(data.data_preview.symbol_change_pt) > 0
                            ? "#38a169"
                            : "#ef4444",
                        transform:
                          Number(data.data_preview.symbol_change_pt) > 0
                            ? "rotate(180deg)"
                            : "none",
                      }}
                    >
                      <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                    </svg>
                  </div>
                </div>
                <h2 style={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: "700"}} >
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    maximumSignificantDigits: 5,
                  }).format(data.data_preview.stock_price)}
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
                <h2 className="text-base font-bold"> ₹ {data.mrkt_capita}</h2>
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
                  Dividend Yeild
                </span>
                <h2 className="text-base font-bold">{data.div_yield}</h2>
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
                  Net Income
                </span>
                <h2 className="text-base font-bold"> ₹ {data.Net_income}</h2>
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
                  Revenue
                </span>
                <h2 className="text-base font-bold">₹ {data.Revenue}</h2>
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
                  Share Float
                </span>
                <h2 className="text-base font-bold">{data.Share_float}</h2>
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
                  P/E Ratio
                </span>
                <h2 className="text-base font-bold">{data.PE_ratio}</h2>
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
                  Sector
                </span>
                <h2 className="text-base font-bold">{data.about.Sector}</h2>
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
                  Headquaters
                </span>
                <h2 className="text-base font-bold">
                  {data.about.Headquarters}
                </h2>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <span
                style={{
                  fontSize: "1rem", 
                  lineHeight: "1.25rem",
                  textTransform: "capitalize", // This is equivalent to capitalize
                  color: "#6B7280", // This is equivalent to text-gray-100
                }}
              >
                Industry
              </span>
              <h2 className="text-base font-bold">{data.about.Industry}</h2>
            </div>

            <div className="flex flex-col mt-4">
              <span
                style={{
                  fontSize: "1rem", 
                  lineHeight: "1.25rem",
                  textTransform: "capitalize", // This is equivalent to capitalize
                  color: "#6B7280", // This is equivalent to text-gray-100
                }}
              >
                CEO
              </span>
              <h2 className="text-base font-bold">{data.about.CEO}</h2>
            </div>

            <div className="flex w-full mt-4 justify-between">
              <div className="flex flex-col">
                <a
                  target={"_blank"}
                  rel="no referrer"
                  style={{
                    fontSize: "1rem",
                    backgroundColor: "#f0f3fa",
                    color: "gray",
                    "&:hover": {
                      color: "#8018f7",
                    },
                    padding: "0.375rem 0.75rem", 
                    margin: "0.25rem 0", 
                    borderRadius: "0.5rem", 
                  }}
                  href={data?.about.Website}
                >
                  {data?.about.Website}
                </a>
              </div>

              <div className="flex flex-col">
                <span style={{
                    fontSize: "1rem", 
                    lineHeight: "1.25rem",
                    textTransform: "capitalize",
                    color: "#6B7280",
                    paddingBottom: "0.75rem", 
                  }}>
                  Performance Change
                </span>
                <div className="flex justify-between">
                  1 Week:
                  <div
                    style={{
                      fontSize: "1rem",
                      padding: "0.25rem",
                      marginLeft: "0.5rem",
                      marginTop: "0.25rem",
                      fontWeight: "500",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "0.25rem",
                      backgroundColor:
                        Number(data.performance.one_week) > 0
                          ? "rgba(5, 253, 18, 0.26)"
                          : "rgba(255, 45, 0, 0.26)", // Conditional background color
                      color:
                        Number(data.performance.one_week) > 0
                          ? "#38a169"
                          : "#ef4444", // Conditional text color
                    }}
                  >
                    <span>{Number(data.performance.one_week)}%</span>
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
                          Number(data.performance.one_week) > 0
                            ? "green"
                            : "red",
                        transform:
                          Number(data.performance.one_week) > 0
                            ? "rotate(180deg)"
                            : "none",
                      }}
                    >
                      <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between">
                  {" "}
                  1 Month:
                  <div
                    style={{
                      fontSize: "1rem",
                      padding: "0.25rem",
                      marginLeft: "0.5rem",
                      marginTop: "0.25rem",
                      textAlign: "center",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "0.25rem",
                      backgroundColor:
                        Number(data.performance.one_month) > 0
                          ? "rgba(5, 253, 18, 0.26)"
                          : "rgba(255, 45, 0, 0.26)", // Conditional background color
                      color:
                        Number(data.performance.one_month) > 0
                          ? "#38a169"
                          : "#ef4444", // Conditional text color
                    }}
                  >
                    <span>{Number(data.performance.one_month)}%</span>
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
                          Number(data.performance.one_month) > 0
                            ? "green"
                            : "red",
                        transform:
                          Number(data.performance.one_month) > 0
                            ? "rotate(180deg)"
                            : "none",
                      }}
                    >
                      <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <p
              variant="h3"
              style={{
                marginTop: "1.25rem", 
                fontSize: ".75rem", 
                textAlign: "justify", 
                fontWeight: "300", 
                letterSpacing: "0.025em", 
                lineHeight: "1.6", 
                overflow: "hidden", 
              }}
              
            >
              {ReactHtmlParser(data.about.desc)}.
            </p>
          </div>

          <div className="flex flex-col lg:w-[55%] w-full h-[60vh] lg:pl-4 pl-0 lg:mt-0 mt-2">
            <Chart id={symbol} />
          </div>
        </div>
      ) : (
        <div className="w-[90vw] h-[90vh] ">
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
                        lineHeight: "1.25rem",
                        textTransform: "capitalize", // This is equivalent to capitalize
                        color: "#6B7280", // This is equivalent to text-gray-100
                      }}
                    >
                      Price
                    </span>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center bg-green text-green rounded bg-opacity-25 uppercase
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
                    Dividend Yeild
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
                    Net Income
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
                    Revenue
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
                    Share Float
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
                    P/E Ratio
                  </span>
                  <Skeleton variant="rect" className="text-base font-bold" />
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span style={{
                    fontSize: "1rem", 
                    lineHeight: "1.25rem",
                    textTransform: "capitalize", // This is equivalent to capitalize
                    color: "#6B7280", // This is equivalent to text-gray-100
                  }}>
                    Sector
                  </span>
                  <Skeleton
                    variant="rect"
                    width={150}
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
                    Headquaters
                  </span>
                  <Skeleton variant="rect" className="text-base font-bold" />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <span
                  style={{
                    fontSize: "1rem", 
                    lineHeight: "1.25rem",
                    textTransform: "capitalize", // This is equivalent to capitalize
                    color: "#6B7280", // This is equivalent to text-gray-100
                  }}
                >
                  Industry
                </span>
                <Skeleton
                  variant="rect"
                  width={300}
                  className="text-base font-bold"
                />
              </div>

              <div className="flex flex-col mt-4">
                <span
                  style={{
                    fontSize: "1rem", 
                    lineHeight: "1.25rem",
                    textTransform: "capitalize", // This is equivalent to capitalize
                    color: "#6B7280", // This is equivalent to text-gray-100
                  }}
                >
                  CEO
                </span>
                <Skeleton
                  variant="rect"
                  width={300}
                  className="text-base font-bold"
                />
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
                    Performance Change
                  </span>
                  <div className="flex justify-between">
                    <Skeleton
                      width={50}
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25 bg-green text-green
          `}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Skeleton
                      width={50}
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25
           bg-red text-red
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
  );
};

export default CoinDetailsPage;
