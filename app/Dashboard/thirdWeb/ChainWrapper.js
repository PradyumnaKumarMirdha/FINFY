"use client";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
} from "@thirdweb-dev/react";

function ChainWrapper({ children }) {
  return (
    <ThirdwebProvider
      clientId="896ad281c02889214293ccb61d35b78a"
      activeChain={"avalanche-fuji"}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
}

export default ChainWrapper;
