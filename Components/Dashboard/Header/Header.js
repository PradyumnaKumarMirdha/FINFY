import React from "react";
import ConnectWalletbutton from "../../../app/Dashboard/thirdWeb/ConnectWalletbutton";
import Dashboard from "../../../app/Dashboard/Crypto/Dashboard";
import { useAddress } from "@thirdweb-dev/react";
import styles from "../../../app/Dashboard/styles/Home.module.css";
import ChainWrapper from "../../../app/Dashboard/thirdWeb/ChainWrapper";
import TransferModal from "../modal/TransferModal";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../ui/dialog"


const Header = ({sanityTokens, thirdWebTokens, walletAddress}) => {

  // const router = useRouter()
  const address = useAddress();

  const formatAddress = (address) => {
    if (!address) return "";
    const formattedAddress = `${address.slice(0, 8)}....${address.slice(-3)}`;
    return formattedAddress;
  };

  return (
    <div>
      <ChainWrapper>

      <div className='w-full p-4 px-10 border-b-2 border-gray-700 flex items-center justify-between' style={{ paddingLeft: '15rem', paddingRight: '15rem', zIndex: 22, backdropFilter: 'blur(2px)' }}>
        <div className="text-[2rem] font-semibold dark:text-white">Dashboard</div>
        <div className="flex items-center">
          <div className='mx-3 flex items-center justify-end gap-8'>
            <div
              className='cursor-pointer font-bold hover:text-green-500 duration-300 dark:text-white'
              onClick={() => console.log("Rewards clicked")}
              >
              Rewards
            </div>
            <div
              className='cursor-pointer font-bold hover:text-green-500 duration-300 dark:text-white'
              onClick={() => console.log("Portfolio clicked")}
              >
              Assets
            </div>
          </div>
          
          <Dialog>
      <DialogTrigger asChild>
          <div className="border border-black rounded-xl mr-4 text-lg font-normal py-2 px-4 cursor-pointer dark:text-white dark:border-gray-400">
            Send / Receive
          </div>
      </DialogTrigger >
      <DialogContent className=" justify-center bg-[#fff] shadow-2xl shadow-[rgba(125,0,255, .15)] ">
        <TransferModal sanityTokens={sanityTokens} thirdWebTokens={thirdWebTokens} walletAddress={walletAddress}/>
      </DialogContent>
    </Dialog>
          {address ? (
            <div className="text-base border border-[#282b2f] rounded-3xl mr-[1rem] px-4 py-1 dark:border-gray-600">
              <div className="text-lg mb-[0.1rem] text-[#27ad75] font-medium">Wallet Connected</div>
              <div className="text-sm dark:text-white text-center">
                <Dashboard address={formatAddress(address)} />
              </div>
            </div>
          ) : (
            <div className="mr-[1rem]">
              <ConnectWalletbutton className={styles.customWallet} />
            </div>
          )}
        </div>
      </div>
          </ChainWrapper>
    </div>
  );
};

export default Header;


