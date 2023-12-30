"use client"

import React, { useState } from 'react'
import {
    readContract,
    writeContract,
    getAccount
} from "@wagmi/core";

import { useConnect, useContractEvent } from 'wagmi';


import {
    utility_token_abi,
    governor_abi,
    utility_token_address
} from '../var';
import { parseEther } from 'viem';

const
    Buy = () => {
        const
            { connect } = useConnect(),
            [balance, setBalance] = useState(0),
            [amount, setAmount] = useState(""),
            _setAmount = (event: any) => {
                setAmount(event.target.value)
            },

            ShowBalance = async () => {
                const _balance = await readContract({
                    address: utility_token_address,
                    abi: utility_token_abi,
                    functionName: "balanceOf",
                    args: [getAccount().address]
                });
                setBalance(Number(_balance))
                console.log("_balance", _balance)
            },
            buy_tokens = async () => {
                const data = await writeContract({
                    address: utility_token_address,
                    abi: utility_token_abi,
                    functionName: "buy_tokens",
                    args: [],
                    chainId: 11155111,
                    value: parseEther(amount)

                });
                console.log("byuy token function", data)
            }
            ;

        ShowBalance();
        return (
            <div className='my-auto mx-auto max-w-4xl'>
                <p>
                    Welcome!
                    <br />
                    1 ETH = 250 BUNN (experimental rate)
                    Your voting power is equal to the quantity of BUNN you hold
                </p>
                <div>
                    You currently hold <b> {balance} BUNN</b>
                </div>
                <div>
                    <input
                        type="text"
                        value={amount}
                        placeholder='buy more'
                        onChange={_setAmount}
                    />
                    <button
                        type="button"
                        onClick={buy_tokens}
                    >
                        buy more tokens
                    </button>
                </div>
            </div>
        )
    }

export default Buy