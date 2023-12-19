// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract governor_storage {
    /**************************
    Section 0: External resources 

    *************************/
    address public utility_token_address;
    uint256 public returned;
    address public logic_contract;

    /**************************
    Section A: State Variables 
    **************************/

    /*
    Section A1: defines how members are represented.

    ***MORE DELEGATIONS ON THIS LATER***
    A member is represented as `Member`.
    `Members` maps their address to `Member`.

    Members are recorded when they vote, `cast_vote`. 
    */
    struct admin_ {
        bool is_admin;
        uint256 removers;
        uint256 adders;
    }
    mapping(address => admin_) public admin;

    address[] internal admins;

    struct Member {
        string name; // if necessary
        bool belongs;
        /* uint delegated_tokens;*/ // if necessary
        // other attributes
    }
    mapping(address => Member) public Members;

    /* 
    Section A2: defines the voting structure.

    it features a "ballot box" represented as a mapping called `votes`.
    `votes` maps last votes to `ballot`. the last vote is the sum of all votes.
    `ballot` maps voters' address to their "ballot paper".

    Members can cast their vote(s) by calling the `cast_vote` function.
    */
    struct ballot {
        uint256 Topic_ID;
        bool position;
        bool voted;
        uint256 voting_power;
    }
    mapping(address => mapping(uint => ballot)) public ballots;

    struct vote {
        uint256 for_votes;
        uint256 against_votes;
    }
    mapping(uint => vote) public votes;

    /*
    Section A3a: defines how "Topics" of "Proposals" is represented.

    `Topic` defines species the required attributes (self-explanatory) of a topic.
    `Topics` is supposed to track "Topics" according to their respective ID(uint).

    Qualified members initiate their "Topic" by calling the `initiate_topic` function.
     */
    struct Topic {
        uint256 id;
        string title;
        address initiator;
        string details;
        address implementation_contract_address;
        string signature;
        uint256 start_time;
        bool executed;
        bool cancelled;
    }
    mapping(uint256 => Topic) public Topics;

    uint256 public counter = 1;
}
