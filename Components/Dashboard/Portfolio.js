import React from "react";
import { useAddress, useTokenBalance, useContract } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_KEY,
    ethers.getDefaultProvider("https://rpc.ankr.com/avalanche_fuji")
  ),
  { clientId: "896ad281c02889214293ccb61d35b78a" }
);

const formatIndianNumber = (number) => {
  return number.toLocaleString('en-IN');
};

const calculateTotalBalance = (
  thirdWebTokens,
  sanityTokens,
  tokenToINR,
  account
) => {
  let total = 0;
  for (const token of thirdWebTokens) {
    const { contract: stakeTokenContract } = useContract(token, "token");
    const { data } = useTokenBalance(stakeTokenContract, account);

    if (data !== undefined) {
      total += Number(data.displayValue) * tokenToINR[token];
    }
  }

  return total;
};

const Portfolio = ({ thirdWebTokens, sanityTokens }) => {
  const account = useAddress();
  const tokenToINR = {};

  for (const token of sanityTokens) {
    tokenToINR[token.contractAddress] = Number(token.inrPrice);
  }

  const data = calculateTotalBalance(
    thirdWebTokens,
    sanityTokens,
    tokenToINR,
    account
  );

  return (
    <div>
      {data !== undefined ? <div>₹ {formatIndianNumber(data)}</div> : <div>Loading...</div>}
    </div>
  );
};

export default Portfolio;


