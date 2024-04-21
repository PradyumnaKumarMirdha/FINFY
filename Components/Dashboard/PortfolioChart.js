'use client'
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PortfolioChart = () => {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("365");

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const fetchData = async (days) => {
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=inr&days=${days}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const candlestickData = data.map((item) => ({
        x: item[0],
        y: [item[1], item[2], item[3], item[4]],
      }));
      setSeries([{ data: candlestickData }]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedTimeframe);
  }, [selectedTimeframe]);

  const handleButtonClick = (days) => {
    setSelectedTimeframe(days);
  };

  return (
    <div>
      <div className="mb-3">
        <button
          className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
            selectedTimeframe === "1"
              ? "bg-[#8018f7] text-[#8018f7]"
              : "bg-gray-100 text-gray-200"
          }`}
          onClick={() => handleButtonClick("1")}
        >
          1D
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
            selectedTimeframe === "7"
              ? "bg-[#8018f7] text-[#8018f7]"
              : "bg-gray-100 text-gray-200"
          }`}
          onClick={() => handleButtonClick("7")}
        >
          7D
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
            selectedTimeframe === "30"
              ? "bg-[#8018f7] text-[#8018f7]"
              : "bg-gray-100 text-gray-200"
          }`}
          onClick={() => handleButtonClick("30")}
        >
          1M
        </button>

        <button
          className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
            selectedTimeframe === "90"
              ? "bg-[#8018f7] text-[#8018f7]"
              : "bg-gray-100 text-gray-200"
          }`}
          onClick={() => handleButtonClick("90")}
        >
          3M
        </button>

        <button
          className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
            selectedTimeframe === "180"
              ? "bg-[#8018f7] text-[#8018f7]"
              : "bg-gray-100 text-gray-200"
          }`}
          onClick={() => handleButtonClick("180")}
        >
          6M
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
            selectedTimeframe === "365"
              ? "bg-[#8018f7] text-[#8018f7]"
              : "bg-gray-100 text-gray-200"
          }`}
          onClick={() => handleButtonClick("365")}
        >
          1Y
        </button>
      </div>
      <div id="chart">
        <div style={{ width: "100%" }}>
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={350}
            width="100%"
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PortfolioChart;
