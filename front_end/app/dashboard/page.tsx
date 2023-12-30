"use client"


import React, { useState } from 'react'
import { readContract, writeContract, getAccount } from "@wagmi/core";

import { governor_abi, governor_address } from '../var';
import { parseEther } from 'viem';
const
    Admin = () => {
        const
            [amount, setAmount] = useState(""),
            [topic_id, setTopId] = useState(""),
            [override, setOverride] = useState(""),

            _setAmount = (event: any) => {
                setAmount(event.target.value)
            },
            _setTopId = (event: any) => {
                setTopId(event.target.value)
            },
            _setOverride = (event: any) => {
                setOverride(event.target.value)
            },


            cancel_topic = async () => {
                const hash = await writeContract({
                    address: governor_address,
                    abi: governor_abi,
                    functionName: "cancel_Topic",
                    args: [
                        BigInt(topic_id)
                    ],
                    chainId: 11155111,
                })
            },
            implement_topic = async () => {
                const hash = writeContract({
                    address: governor_address,
                    abi: governor_abi,
                    functionName: "implement_decision",
                    args: [
                        BigInt(topic_id),
                        Boolean(override)
                    ],
                    value: parseEther(amount)
                })
            }
            ;

        return (
            <div className='bg-red-300 max-w-4xl mx-auto'>
                <br />
                <div className='m-2 bg-green-800 rounded-2xl'>

                    <input
                        type="number"
                        placeholder='Value'
                        value={amount}
                        onChange={_setAmount}
                    />

                    <input
                        type="number"
                        placeholder='Topic Id'
                        value={topic_id}
                        onChange={_setTopId}
                    />

                    <input
                        type="text"
                        placeholder='Override:[true or false]'
                        value={override}
                        onChange={_setOverride}
                    />

                    <button type="button" onClick={implement_topic}>
                        Implement Topic
                    </button>

                </div>
                <br />
                <div className='m-2 bg-green-800 rounded-2xl'>
                    <input
                        type="number"
                        placeholder='Topic Id'
                        value={topic_id}
                        onChange={_setTopId}
                    />

                    <button type="button" onClick={cancel_topic}>
                        Cancel Topic
                    </button>
                </div>
            </div>
        )
    }

export default Admin