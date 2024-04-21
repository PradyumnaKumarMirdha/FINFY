"use client";
import React from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TrendingStocks } from "../../../../config/api";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import { Skeleton } from "@material-ui/lab";
import "./global.css";
import { StockContext } from "../../../../app/Market/context/Stock/stockContext";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "60%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "black",
    paddingTop: "7vh",
    height: "auto",
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  let { stockData, symbol } = useContext(StockContext);

  // Took data from api TrendingCoins
  const fetchTrendingStocks = async () => {
    const { data } = await axios.get(TrendingStocks());

    setTrending(data.slice(0, 10));
  };
  // Whenever the data rendered the first time
  useEffect(() => {
    fetchTrendingStocks();
  }, []);

  const items = trending.map((unit, index) => {
    let profit = unit?.change >= 0;
    if (index < 10) {
      return (
        <React.Fragment key={unit.company}>
          {stockData ? (
            <Link
              className={classes.carouselItem}
              href={`/Market/Stock/${unit.stock_name}`}
            >
              <img
                src={unit?.stock_image}
                alt={unit.company}
                style={{
                  marginBottom: 10,
                  transition: "all 0.3s ease",
                  height: '5rem'
                }}
                className="hover:scale-110 rounded-full"
              />
              <span className="dark:text-white text-black ">
                {unit.stock_name}
                &nbsp;
                <span
                  style={{
                    color: profit ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                  }}
                >
                  {profit && "+"} {unit?.change?.toFixed(2)}%
                </span>
              </span>
              <span  className="dark:text-white text-black" style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol} {numberWithCommas(unit?.price.toFixed(2))}
              </span>
            </Link>
          ) : (
            <>
            <Skeleton variant="circle" width={100} height={100} />
            <Skeleton variant="rect" width={100} height={30} />
            </>
          )}
        </React.Fragment>
      );
    } else {
      return <Skeleton variant="circle" width={100} height={100} />; // Skip rendering for items beyond the first 10
    }
  });
  // Responsive styles
  const responsive = {
    0: {
      items: 2,
    },
    720: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        disableButtonsControls
        animationDuration={2000}
        autoPlayInterval={1000}
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
