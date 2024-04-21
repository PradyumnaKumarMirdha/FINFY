import React, { useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { CryptoContext } from "../../../../context/Crypto/testCrypto";

function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip ">
        <p className="label text-sm text-[#8018f7]">{`${label} : ${new Intl.NumberFormat(
          "en-IN",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({ data, currency, type, chartType }) => {
  return (
    <ResponsiveContainer height={"100%"}>
      {chartType === "line" ? (
        <LineChart width={400} height={400} data={data}>
          <Line
            type="monotone"
            dataKey={type}
            stroke="#8018f7"
            strokeWidth={"1px"}
          />
          <CartesianGrid stroke="#323232" />
          <XAxis dataKey="date" hide />
          <YAxis dataKey={type} hide domain={["auto", "auto"]} />
          <Tooltip
            content={<CustomTooltip />}
            currency={currency}
            cursor={false}
            wrapperStyle={{ outline: "none" }}
          />
          <Legend />
        </LineChart>
      ) : (
        <AreaChart width={400} height={400} data={data}>
          <Area
            type="monotone"
            dataKey={type}
            stroke="#8018f7"
            strokeWidth={"1px"}
            fill="#ae6df8db"
          />
          <CartesianGrid stroke="#323232" />
          <XAxis dataKey="date" hide />
          <YAxis dataKey={type} hide domain={["auto", "auto"]} />
          <Tooltip
            content={<CustomTooltip />}
            currency={currency}
            cursor={false}
            wrapperStyle={{ outline: "none" }}
          />
          <Legend />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();
  let { currency } = useContext(CryptoContext);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);
  const [chartType, setChartType] = useState("line");

  useLayoutEffect(() => {
    const getChartData = async (id) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        )
          .then((res) => res.json())
          .then((json) => json);


        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
            prices: item[1],
          };
        });

        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };

    getChartData(id);
  }, [id, type, days]);

  return (
    <div className="w-full h-[60%]">
  <ChartComponent data={chartData} currency={currency} type={type} chartType={chartType}/>
  <div className="flex flex-row mb-4 "> {/* New div for the line button */}
    <button
      className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
        chartType === "line"
          ? "bg-[#8018f7] text-[#8018f7]"
          : "bg-gray-200 text-black"
      }`}
      onClick={() => setChartType("line")}
    >
      Line
    </button>
    <button
      className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
        chartType === "area"
          ? "bg-[#8018f7] text-[#8018f7]"
          : "bg-gray-200 text-black"
      }`}
      onClick={() => setChartType("area")}
    >
      Area
    </button>
  </div>
  <div className="min-h-[100px]">
    <button
      className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
        type === "prices"
          ? "bg-[#8018f7] text-[#8018f7]"
          : "bg-gray-200 text-black"
      }`}
      onClick={() => setType("prices")}
    >
      Price
    </button>
    <button
      className={`text-sm py-0.5 px-1.5 h-8 ml-2 bg-opacity-25 rounded capitalize ${
        type === "market_caps"
          ? "bg-[#8018f7] text-[#8018f7]"
          : "bg-gray-200 text-black"
      }`}
      onClick={() => setType("market_caps")}
    >
      Market Caps
    </button>
    <button
      className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize h-8 ${
        type === "total_volumes"
          ? "bg-[#8018f7] text-[#8018f7]"
          : "bg-gray-200 text-black"
      }`}
      onClick={() => setType("total_volumes")}
    >
      Total Volumes
    </button>

    <button
      className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize h-8 ${
        days === 7 ? "bg-[#8018f7] text-[#8018f7]" : "bg-gray-200 text-black"
      }`}
      onClick={() => setDays(7)}
    >
      7d
    </button>
    <button
      className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize h-8 ${
        days === 14 ? "bg-[#8018f7] text-[#8018f7]" : "bg-gray-200 text-black"
      }`}
      onClick={() => setDays(14)}
    >
      14d
    </button>
    <button
      className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  h-8 ${
        days === 30 ? "bg-[#8018f7] text-[#8018f7]" : "bg-gray-200 text-black"
      }`}
      onClick={() => setDays(30)}
    >
      30d
    </button>
  </div>
  
</div>

      
  );
};

export default Chart;
