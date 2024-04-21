'use client'
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Transfer from "./Transfer";
import CoinSelector from "./CoinSelector";
import Receive from "./Receive";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const TransferModal = ({ thirdWebTokens, sanityTokens, walletAddress }) => {
  const [action, setAction] = useState("send");
  const [selectedToken, setSelectedToken] = useState(sanityTokens[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const exportStorageContent = (content) => {
    // Your logic to export storage content
  };

  useEffect(() => {
    if (action === "transferred") {
      // Simulate delay for demonstration purposes
      setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
    }
  }, [action]);

  const renderLogic = () => {
    if (action === "send") {
      return (
        <Transfer
          setAction={setAction}
          thirdWebTokens={thirdWebTokens}
          sanityTokens={sanityTokens}
          selectedToken={selectedToken}
          walletAddress={walletAddress}
          exportStorageContent={exportStorageContent}
        />
      );
    } else if (action === "receive") {
      return (
        <Receive
          setAction={setAction}
          selectedToken={selectedToken}
          walletAddress={walletAddress}
        />
      );
    } else if (action === "select") {
      return (
        <CoinSelector
          setAction={setAction}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
          walletAddress={walletAddress}
        />
      );
    } else if (action === "transferring") {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
          }}
        >
          Transfer in progress...
        </div>
      );
    } else if (action === "transferred") {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#27ad75",
          }}
        >
          {showSuccess && <BlinkingText>Transaction Completed</BlinkingText>}
        </div>
      );
    }
  };

  return (
    <Wrapper>
      <Tabs defaultValue="account" className="w-full ">
        <Selector>
          <TabsList className="grid w-full h-full grid-cols-2">
            <TabsTrigger
              className="h-full font-bold text-2xl tracking-wide uppercase"
              value="send"
              onClick={() => setAction("send")}
            >
              send
            </TabsTrigger>
            <TabsTrigger
              className="h-full font-bold text-xl tracking-wide uppercase"
              value="receive"
              onClick={() => setAction("receive")}
            >
              Receive
            </TabsTrigger>
          </TabsList>
        </Selector>
        <TabsContent value="send"></TabsContent>
        <TabsContent value="receive"></TabsContent>
      </Tabs>
      <ModalMain>{renderLogic()}</ModalMain>
    </Wrapper>
  );
};

export default TransferModal;

const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  margin-top: 1rem
  background: #fff;
  `;
  
  const Selector = styled.div`
  background: #F1F0F0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
  font-family: monospace;
  `;
  
  const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`;

const blinkAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const BlinkingText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #27ad75;
  animation: ${blinkAnimation} 1s linear infinite;
`;
