"use client"
import { config } from "dotenv"
config()
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })



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
    children: React.ReactNode
}) {

    const
        [details, setDetails] = useState(0),
        [hash, setHash] = useState(""),
        cont = async () => {
            const
                data = await readContract({
                    address: '0x846C9D65404B5325163f2850DAcF7C3Dff9ef0B2',
                    abi: abi,
                    functionName: 'balanceOf',
                    args: [getAccount().address],
                    chainId: 11155111,
                });
            console.log(data);
            setDetails(Number(data));

        },
        send = async () => {

            const { hash } = await writeContract({
                address: '0x846C9D65404B5325163f2850DAcF7C3Dff9ef0B2',
                abi: abi,
                functionName: 'transfer',
                args: ['0x605372510fA1849DE13fcd0b442d9c2C4D2e8BA4', 10 * 1e18],
                chainId: 11155111,
                // account: '0x49f2451AbEe35B261bB01f9d0CDC49f8f8df6E3f',
            });
            setHash(hash)
        }
    return (
        <html>
            <body>
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
                        <div
                            // onClick={set}
                            className='flex justify-end m-3'>
                            <ConnectButton
                                label='Connect'
                                showBalance={false}
                                accountStatus="avatar"
                            />
                        </div>
                        <div onClick={cont}>
                            balance <br />
                            {details / 1e18}
                        </div>
                        <div onClick={send}>
                            transfer <br />
                            {JSON.stringify(hash)}
                        </div>
                        {children}
                    </RainbowKitProvider>
                </WagmiConfig>
            </body>
        </html>

    )
}
