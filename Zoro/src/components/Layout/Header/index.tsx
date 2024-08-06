/** @jsxImportSource @emotion/react */
//import ClaimRewardButton from '../ClaimRewardButton';
import { ethers } from "ethers";
import ConnectButton from "../ConnectButton";
import { Toolbar } from "../Toolbar";
import Breadcrumbs from "./Breadcrumbs";
import { useStyles } from "./styles";
import AppBar from "@mui/material/AppBar";
import React from "react";
import { chain } from "lodash";

const Header: React.FC = () => {
  const styles = useStyles();
 

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();

        // Check if connected to Polygon Mainnet
        if (chainId !== 137) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x89' }] // Hexadecimal of 137
            });
            console.log('Switched to Polygon network');
          } catch (error:any) {
            const switchError = error as any;
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x89',
                      chainName: 'Polygon Mainnet',
                      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'] /* Add other URLs if needed */,
                      nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                      },
                      blockExplorerUrls: ['https://polygonscan.com/']
                    }
                  ]
                });
              } catch (addError) {
                console.error('Failed to add the network:', addError);
              }
            } else {
              console.error('Failed to switch the network:', switchError);
            }
          }
        } else {
          console.log('Already connected to Polygon network');
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('MetaMask not installed');
    }
  };
  return (
    <AppBar position="relative" css={styles.appBar} className="header-wrap">
      <Toolbar css={styles.toolbar}>
        <Breadcrumbs />

        <div css={styles.ctaContainer}>
          {/*<ClaimRewardButton css={styles.claimXvsButton} /> */}
          <button onClick={connectWallet} style={{padding:"10px",borderRadius:"50px",marginRight:"20px"}}>Connect Polygon</button>
          <ConnectButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
