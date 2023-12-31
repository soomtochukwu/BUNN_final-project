"use client"

import "./dashboard.css"
import "../globals.css"

import React, { useState } from 'react'
import { readContract, writeContract, getAccount } from "@wagmi/core";

import { governor_abi, governor_address } from '../var';
import { parseEther } from 'viem';
const
    Admin = () => {
        const
            [amount, setAmount] = useState(""),
            [topic_id, setTopId] = useState(""),
            [target_admin_address, setTargetAdminAddress] = useState(""),
            [override, setOverride] = useState(""),

            _setAmount = (event: any) => {
                setAmount(event.target.value)
            },
            _setTargetAdminAddress = (event: any) => {
                setTargetAdminAddress(event.target.value)
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
            },
            add_admin = async () => {
                const hash = writeContract({
                    address: governor_address,
                    abi: governor_abi,
                    functionName: "addAdmin",
                    args: [target_admin_address]
                })
            },
            remove_admin = async () => {
                const hash = writeContract({
                    address: governor_address,
                    abi: governor_abi,
                    functionName: "removeAdmin",
                    args: [target_admin_address]
                })
            }
            ;

        return (
            <div className='dashboard max-w-6xl mx-auto'>
                <br />
                <div className='instructions'>
                    <div>
                        Contracts can only be implemented once
                    </div>
                    <div>
                        Once canceled, it cannot bee implemented
                    </div>
                    <div>
                        only admins can add or remove an admin
                    </div>
                </div>

                <div className='m-2 propose rounded-2xl'>

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

                <div className='instructions'>
                    <div>
                        To cancel a topic, enter the <i>Topic ID</i> into the Topic ID field below
                    </div>
                </div>

                <div className='m-2 propose  rounded-2xl'>
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

                <div className='instructions'>
                    <div>
                        To add an admin, enter their address bellow
                    </div>
                    <div>
                        For a new member to become an admin,
                        all existing admins must add them
                    </div>
                </div>

                <div className='propose'>
                    <input
                        type="text"
                        placeholder='New Admin Address'
                        value={target_admin_address}
                        onChange={_setTargetAdminAddress}
                    />
                    <button type="button" onClick={add_admin}>
                        Add new Admin
                    </button>
                </div>

                <div className='instructions'>
                    <div>
                        To remove an admin, enter their address bellow
                    </div>
                    <div>
                        All existing admins must remove them in oder to demote them
                    </div>
                </div>

                <div className='propose'>
                    <input
                        type="text"
                        placeholder='Demote Admin Address'
                        value={target_admin_address}
                        onChange={_setTargetAdminAddress}
                    />
                    <button type="button" onClick={remove_admin}>
                        Remove Admin
                    </button>
                </div>
            </div>
        )
    }

export default Admin