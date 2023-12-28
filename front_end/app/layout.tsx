"use client";

import "./globals.css";
import "./scroll-bar.css"
import { Header } from "./header/header";







import '@rainbow-me/rainbowkit/styles.css';

import {
  ConnectButton,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { readContract, writeContract, getAccount } from '@wagmi/core'

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
} from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useState } from 'react'
import { abi } from './abi'

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia],
  [
    alchemyProvider({ apiKey: 'AoXMtTMOV2rpOJXY_wn1Fk0QfsXHo3HN' }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'BUNN-DAO',
  projectId: 'f9060cc5cab290626ad485eb45d8cb64',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})






export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>BUNN DAO | TEAM-B</title>
      </head>
      <body className="body ">
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            initialChain={sepolia}
            theme={darkTheme({
              accentColor: 'green',
              accentColorForeground: 'white',
              borderRadius: 'large',
              fontStack: 'rounded',
              overlayBlur: 'small',
            })} chains={chains}>

            <Header />

            <div className="children bg-green-100 text-black">{children}</div>

            <div className="bottom-0 bg-green-900 text-center p-6">
              <footer className="footer text-black">
                Created by <br />
                <a
                  href="https://github.com/soomtochukwu"
                  target="Somtochukwu"
                  className="hover:border-l-2 p-2 border-black active:bg-green-900"
                >
                  Somtochukwu
                </a>
                <br />
                <a
                  href="https://github.com/favxlaw"
                  target="Favour"
                  className="hover:border-l-2 p-2 border-black active:bg-green-900"
                >
                  Favour
                </a>
                <br />
                <a
                  href=""
                  target="Franklin"
                  className="hover:border-l-2 p-2 border-black active:bg-green-900"
                >
                  Franklin
                </a>
              </footer>
            </div>
          </RainbowKitProvider>
        </WagmiConfig>

      </body>

    </html>
  );
}
