"use client";
import React from "react";

import { readContract, writeContract, getAccount } from "@wagmi/core";
import { useState } from "react";
import { governor_abi, governor_address } from "../var";

const
    Vote = () => {
        const
            [topic_id, setTopicId] = useState(""),
            [supports, setSupport] = useState(""),
            [is_member, setIsMember] = useState(""),
            [name_, setName] = useState(""),

            _setTopicId = (event: any) => {
                setTopicId(event.target.value)
            },
            _setName = (event: any) => {
                setName(event.target.value);
            },
            _setSupport = (event: any) => {
                setSupport(event.target.value)
            },
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

            cast_vote = async () => {
                const hash = await writeContract({
                    address: governor_address,
                    abi: governor_abi,
                    functionName: "cast_vote",
                    args: [BigInt(topic_id), Boolean(supports)],
                    chainId: 11155111,
                })
            };
        isMember();

        return (
            <div className="max-w-6xl mx-auto text-center">
                {
                    is_member.includes("true")
                        ?
                        <div>

                            <div className="instructions">
                                <div>
                                    You must posses <b>BUNN utility tokens</b> to be an eligible voter
                                </div>
                                <div>
                                    1 ETH is equal to 250 BUNN hence your voting power is multiple of ur balance and 250
                                </div>
                                <div>
                                    In the <i>Topic ID</i> field
                                    Enter the ID of the topic / proposal you want to vote for
                                </div>
                                <div>
                                    In the <i>Supports</i> field, enter true if you are voting in favour of the proposal and vice versa
                                </div>

                            </div>
                            <div className="p-4 propose">
                                <input
                                    type="text"
                                    value={topic_id}
                                    placeholder="Topic ID"
                                    onChange={_setTopicId}
                                />
                                <br />
                                <input
                                    type="string"
                                    value={supports}
                                    placeholder="support[: true or false]"
                                    onChange={_setSupport}
                                />
                                <button onClick={cast_vote}>
                                    cast vote
                                </button>
                            </div>
                        </div>
                        :

                        <div className="mx-auto w-fit text-center">

                            <b className="text-4xl">
                                Welcome
                            </b>
                            <div className="instructions">
                                <div>
                                    You must be a registered to participate
                                </div>
                                <div>
                                    To register, enter your username below and click register
                                </div>
                            </div>

                            <div className="propose">
                                <input type="text" placeholder="name" onChange={_setName} />
                                <button type="button" onClick={register}>
                                    register
                                </button>
                            </div>
                        </div>
                }
            </div>
        )
    }

export default Vote