"use client";
// Components
import Header from "../../../Components/Dashboard/Header/Header"
import styled from "styled-components";
//Icons
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import PortfolioChart from "../../../Components/Dashboard/PortfolioChart";
// import BuyTokens from '@/components/BuyTokens'
import Notice from "../../../Components/Dashboard/Notice";
import Assets from "../../../Components/Dashboard/Assets";

//Dependencies
import { useState, useEffect } from "react";
import Portfolio from "../../../Components/Dashboard/Portfolio";
// import Main from '@/components/Main'

import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const [myCoins, setMyCoins] = useState([]);
  const walletAddress = useAddress();
  const [sanityTokens, setSanityTokens] = useState([]);
  const [thirdWebTokens, setThirdWebTokens] = useState([]);
  const [storedTransactions, setStoredTransactions] = useState([]);

  useEffect(() => {
    // Fetch stored transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setStoredTransactions(transactions);

    // Your existing code for fetching tokens...
  }, []);

  useEffect(() => {
    const getSanityAndThirdWebTokens = async () => {
      const coins = await fetch(
        "https://5pakioiu.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27coins%27%5D%7B%0A++symbol%2C%0A++name%2C%0A++inrPrice%2C%0A++contractAddress%2C%0A++logo%0A%7D"
      );
      const sanityTokens = (await coins.json()).result;
      setSanityTokens(sanityTokens);

      const thirdWebContracts = await Promise.all(
        sanityTokens.map(async (token) => await token.contractAddress)
      );
      setThirdWebTokens(thirdWebContracts);
    };

    getSanityAndThirdWebTokens(); // Call the async function immediately
  }, []); // Empty dependency array means it only runs once on mount

  const url =
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=30&offset=0";
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        "X-RapidAPI-Key": "d2bb196a7dmshfd50828122e2ec3p17cdf5jsnd0181521db23",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setMyCoins(data.data.coins);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Wrapper className={styles.wrapper}>
      <Header
        sanityTokens={sanityTokens}
        thirdWebTokens={thirdWebTokens}
        walletAddress={walletAddress}
      />
      <div className={styles.mainContainer}>
        <Wrapper className={styles.leftMain}>
          <div className={styles.portfolioAmountContainer}>
            <div className={styles.portfolioAmount}>
              <div>
                  <BalanceTitle >Portfolio balance</BalanceTitle>
                  <BalanceValue>
                    <Portfolio
                      thirdWebTokens={thirdWebTokens}
                      sanityTokens={sanityTokens}
                      walletAddress={walletAddress}
                    />
                  </BalanceValue>
              </div>{" "}
              <div className={styles.portfolioPercent}>
                +0.0008(+0.57%)
                <span className={styles.pastHour}> Past Hour</span>
              </div>
            </div>
            <div>
              <div className={styles.chartContainer}>
                <div className="w-full">
                  <PortfolioChart />
                </div>
              </div>
            </div>
          </div>

          <Notice transactions={storedTransactions}/>
        </Wrapper>
        <Wrapper>
          <div className={styles.rightMain}>
            <div className={styles.rightMainItem}>
              <div className={styles.ItemTitle}>Crypto Currencies</div>

              <BiDotsHorizontalRounded className={styles.moreOptions} />
            </div>
            {myCoins.map((coin) => {
              let price = parseFloat(coin.price);
              price = price.toFixed(2);

              return <Assets key={coin.uuid} coin={coin} price={price} />;
            })}

            <div className={styles.rightMainItem}>
              <div className={styles.ItemTitle}>Lists</div>
              <AiOutlinePlus className={styles.moreOptions} />
            </div>
          </div>
        </Wrapper>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  background: transparent;
  overflow: auto; /* Enable scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer */
  &::-webkit-scrollbar {
    display: none; /* WebKit browsers */
  }
  position: relative;
  z-index: 21;
`;


const BalanceTitle = styled.div`
  color: #8018f7;
  font-size: 1.3rem;
  font-weight: 400;
  padding-bottom: .2rem;
  border-bottom: 1px solid #373a5d !important; /* Added !important */
`;

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
  padding-top: .6rem;
`;
const styles = {
  wrapper: "w-screen h-screen flex flex-col overflow-x-hidden bg-[#F5F6F8] relative z-21",
  mainContainer: "w-3/4 h-full m-auto flex mt-10 flex-col md:flex-row",
  leftMain: "flex flex-col md:w-3/4 h-full p-6 w-full",
  portfolioAmountContainer:
    "flex flex-col border pl-3 py-3 mb-12 bg-white rounded-md p-[1rem]",
  portfolioAmount: "text-black text-4xl",
  portfolioPercent: "text-black font-bold text-sm",
  pastHour: "text-gray-400",
  chartContainer:
    "text-5xl flex justify-center w-full h-1/3 text-black mt-1 mb-1",
  buyingPowerContainer:
    "w-full border-t mb-2 border-b h-16 border-[#30363b] flex justify-between items-center p-4",
  buyingPowerTitle: "text-black font-bolder text-lg",
  buyingPowerAmount: "text-black font-bolder text-xl",
  notice: "flex border border bg-white p-5 flex-col flex-1",
  noticeContainer: "flex-1",
  noticeTitle: "text-gray-500",
  noticeMessage: "text-black font-bold",
  noticeCTA: "font-bold text-green-500 cursor-pointer mt-5",
  rightMain:
    "flex flex-col flex-1 h-5/6 bg-white mt-6 rounded-lg overflow-y-scroll w-full",
  rightMainItem:
    "flex items-center text-black p-5 border-b border-[#30363b] w-auto",
  ItemTitle: "flex-1 font-bold",
  moreOptions: "cursor-pointer text-xl",
};