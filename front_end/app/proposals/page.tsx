"use client";

import { readContract, writeContract, getAccount } from "@wagmi/core";
import { useState } from "react";

import React from "react";
import { governor_abi, governor_address } from "../var";

const
    Proposals = () => {
        /*
            Component state variables 
            */
        const
            [det, setDet] = useState(0),
            [title, setTitle] = useState(""),
            [details_, setDetails_] = useState(""),
            [contract_address, setContract_address] = useState(""),
            [signature, setSignature] = useState(""),
            [name_, setName] = useState(""),
            [is_member, setIsMember] = useState(""),
            /*
                  Update Component state variables
                  */
            _title = (event: { target: { value: React.SetStateAction<string> } }) => {
                setTitle(event.target.value);
            },
            _details_ = (event: {
                target: { value: React.SetStateAction<string> };
            }) => {
                setDetails_(event.target.value);
            },
            _contract_address = (event: {
                target: { value: React.SetStateAction<string> };
            }) => {
                setContract_address(event.target.value);
            },
            _signature = (event: {
                target: { value: React.SetStateAction<string> };
            }) => {
                setSignature(event.target.value);
            },
            _setName = (event: {
                target: { value: React.SetStateAction<string> };
            }) => {
                setName(event.target.value);
            },
            /*
                  Component state functions 
                  */
            register = async () => {
                const hash = await writeContract({
                    address: governor_address,
                    abi: governor_abi,
                    functionName: "register",
                    args: [name_],
                    chainId: 11155111,
                })
            },
            isMember = async () => {
                let member = await readContract({
                    address: governor_address,
                    abi: governor_abi,
                    functionName: "Members",
                    args: [getAccount().address],
                    chainId: 11155111,
                });
                setIsMember(String(member))

            },
            initiate_topic = async () => {
                const hash = await writeContract({
                    address: governor_address,
                    abi: governor_abi,
                    functionName: "initiate_topic",
                    args: [title, details_, contract_address, signature],
                    chainId: 11155111,
                    // account: '0x49f2451AbEe35B261bB01f9d0CDC49f8f8df6E3f',
                });

                console.log(hash);
            };
        isMember();
        return (
            <>

                {/* <div onClick={dets} className="p-4">
                    Proposals
                    <br />
                    {det}
                </div> */}
                <div className="p-4" >

                    {
                        is_member.includes("true")
                            ?
                            <div className="propose">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={_title}
                                />

                                <input
                                    type="text"
                                    placeholder="Details"
                                    value={details_}
                                    onChange={_details_}
                                />

                                <input
                                    type="text"
                                    placeholder="Contract Address"
                                    value={contract_address}
                                    onChange={_contract_address}
                                />

                                <input
                                    type="text"
                                    placeholder="Signature"
                                    value={signature}
                                    onChange={_signature}
                                />

                                <button onClick={initiate_topic}>
                                    initiate topic
                                </button>
                            </div>
                            :
                            <div className="register">
                                <input type="text" placeholder="name" onChange={_setName} />
                                <button type="button" onClick={register}>
                                    register
                                </button>
                            </div>
                    }
                </div>

            </>
        )
    };

export default Proposals;
