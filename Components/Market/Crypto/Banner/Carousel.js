"use client";
import React from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { CryptoContext } from '../../../../app/Market/context/Crypto/testCrypto';
import { useContext, useEffect, useState } from 'react';
import { TrendingCoins } from '../../../../config/api';
import AliceCarousel from 'react-alice-carousel';
import Link from 'next/link';
import { Skeleton } from '@material-ui/lab';
import './global.css';

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: '60%',
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'black',
    paddingTop: '7vh',
    height: 'auto',
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  let { cryptoData, currency, symbol } = useContext(CryptoContext);
  // Took data from api TrendingCoins
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };
  // Whenever the data rendered the first time
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <>
        {cryptoData ? (
          <Link
            key={coin.id}
            className={classes.carouselItem}
            href={`/Market/Crypto/${coin.id}`}
          >
            <img
              src={coin?.image}
              alt={coin.name}
              style={{
                marginBottom: 10,
                transition: 'all 0.3s ease',
                height: '5rem'
              }}
              className="hover:scale-110"
            />
            <span className="dark:text-white text-black ">
              {coin.symbol}
              &nbsp;
              <span
                style={{
                  color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                  fontWeight: 500,
                }}
              >
                {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </span>
            <span className="dark:text-white text-black"
            style={{ fontSize: 22, fontWeight: 500 }}>
              {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
          </Link>
        ) : (
          <Skeleton variant="circle" width={100} height={100} />
        )}
      </>
    );
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
