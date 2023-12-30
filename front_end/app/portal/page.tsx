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
            <>
                {
                    is_member.includes("true")
                        ?

                        <div className="p-6">
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
                        :

                        <div className="register">
                            <input type="text" placeholder="name" onChange={_setName} />
                            <button type="button" onClick={register}>
                                register
                            </button>
                        </div>
                }
            </>
        )
    }

export default Vote