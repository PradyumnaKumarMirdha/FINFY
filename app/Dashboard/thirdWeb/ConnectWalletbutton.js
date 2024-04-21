import React from "react";
import { ConnectWallet, lightTheme, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

const ConnectWalletbutton = () => {
  const address = useAddress();
  return (
    <div>
      {address ? (
        <div>
          Wallet Connected
        </div>
) : (
        <div>
          <ConnectWallet
            theme={lightTheme({
              colors: {
                accentText: "#8018f7",
                accentButtonBg: "#8018f7",
                modalBg: "#ffffff",
                dropdownBg: "#ffffff",
                borderColor: "rgba(125,0,255, .15)",
              },
            })}
            btnTitle={"Login"}
            modalTitle={"Choose Your Wallet"}
            modalSize={"wide"}
            modalTitleIconUrl={""}
            showThirdwebBranding={false}
            className={styles.customWallet}
          />
        </div>
      )}
    </div>
  );
};

export default ConnectWalletbutton;
