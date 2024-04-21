import styled from "styled-components";
import React from "react";
import styles from "../../../app/Dashboard/styles/Home.module.css";
import ConnectWalletbutton from "../../../app/Dashboard/thirdWeb/ConnectWalletbutton";

const Connect = ({ address }) => {
  const formatAddress = (address) => {
    if (!address) return "";
    const formattedAddress = `${address.slice(0, 8)}....${address.slice(-3)}`;
    return formattedAddress;
  };

  return (
    <div className="z-21">
      {address && ( // Only render if address is true
        <WalletLink>
          <WalletLinkTitle>Wallet Connected</WalletLinkTitle>
          <WalletAddress>{formatAddress(address)}</WalletAddress>
        </WalletLink>
      )}
      {!address && ( // Only render if address is false
        <div className="mr-[1rem]">
          <ConnectWalletbutton className={styles.customWallet} />
        </div>
      )}
    </div>
  );
};

export default Connect;



const WalletLink = styled.div`
  font-size: 0.8rem;
  border: 1px solid #282b2f;
  border-radius: 5rem;
  font-size: 1.2rem;
  margin-right: 1rem;
  padding: 0 1rem;
`;

const WalletLinkTitle = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: #27ad75;
  font-weight: 600;
`;

const WalletAddress = styled.div`
  font-size: 0.8rem;
`;


