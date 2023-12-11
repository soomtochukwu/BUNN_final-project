// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "./restrictions.sol";
import "./utility_token-interface.sol";

contract BUNN_Governor is Restrictions {
    /**************************
    Section 0: External resources 

    **************************/
    address public utility_token_address;

    /**************************
    Section A: State Variables 
    **************************/

    /*
    Section A1: defines how members are represented.

    After acquiring said token, one "automatically" becomes a
    member by voting. ***MORE DELEGATIONS ON THIS LATER***
    A member is represented as `Member`.
    `Members` maps their address to `Member`.

    Members are recorded when they vote, `cast_vote`. 
    */
    struct Member {
        string name; // if necessary
        address _address;
        uint256 delegated_tokens; // if necessary
        // other attributes
    }
    mapping(address => Member) Members;

    /* 
    Section A2: defines the voting structure.

    it features a "ballot box" represented as a mapping called `votes`.
    `votes` maps last votes to `ballot`. the last vote is the sum of all votes.
    `ballot` maps voters' address to their "ballot paper".

    Members can cast their vote(s) by calling the `cast_vote` function.
    */
    struct ballot {
        address voter;
        uint position; // 0=false, 1=true.
        bool voted;
    }
    mapping(uint => mapping(address => ballot)) votes;

    /*
    Section A3: defines how "Topics" of "Proposals" is represented.

    `Topic` defines species the required attributes (self-explanatory) of a topic.
    `Topics` is supposed to track "Topics" according to their respective ID(uint).

    Qualified members initiate their "Topic" by calling the `initiate_topic` function.
     */
    struct Topic {
        uint id;
        string Title;
        uint256 for_votes;
        uint256 against_votes;
        address initiator;
        address[] implementation_contracts;
        uint[] implementation_contracts_values;
        string[] signatures;
        bool executed;
        bool cancelled;
    }
    mapping(uint => Topic) public Topics;

    /* ************************* */
    constructor(address UTA) {
        utility_token_address = UTA;
    }

    /*************************
    Section B: Functions
    *************************/

    // A qualified user initiates a TOPIC/PROPOSAL
    function initiate_topic(
        string memory Title_,
        address[] memory implementation_contracts_,
        uint[] memory implementation_contracts_values_,
        bytes[] memory parameters_
    ) public returns (uint) {
        Topic memory new_topic = Topic({
            id: 2,
            Title: Title_,
            for_votes: 0,
            against_votes: 0,
            initiator: msg.sender,
            implementation_contracts: implementation_contracts_,
            implementation_contracts_values: implementation_contracts_values_,
            parameters: parameters_,
            executed: false,
            cancelled: false
        });
        Topics[new_topic.id] = new_topic;
        return new_topic.id;
    }

    // A qualified user casts their vote(s)
    function cast_vote(uint topic_id, uint position_) public {
        Topic memory topic = Topics[topic_id];
        ballot memory casted_vote = ballot({
            voter: msg.sender,
            position: position_,
            voted: true
        });

        IUTILITY_TOKEN BUNN = IUTILITY_TOKEN(utility_token_address);

        /*sanity checks*/

        // check if the voting period has expired
        require(block.timestamp < end_time, "Voting duration exceeded");
        // ensure that the voter has enough tokens
        require(
            BUNN.balanceOf(msg.sender) > 0,
            "YOU MUST POSSES TOKENs TO BE AN ELIGIBLE VOTER"
        );

        // map users vote against the topic they voted for
        // it is supposed to track users who participated in the decision
        votes[topic_id][msg.sender] = casted_vote;

        uint256 end_time = voting_duration + block.timestamp;
        // check if the voting period has expired
        uint256 total_votes = topic.for_votes + topic.against_votes;
        require(quorum(topic.for_votes, total_votes), "Threshold not met");

        if (position_) {
            topic.for_votes++;
        } else {
            topic.against_votes++;
        }
    }

    // execute/implement a decision or topic is it passed the voting process
    function implement_decision(
        uint topic_id
    ) public view returns (string memory) {
        Topic memory topic_to_implement;
        address[] memory implementation_contracts;
        uint[] memory implement_values;
        bytes[] memory parameters;

        topic_to_implement = Topics[topic_id];
        implementation_contracts = topic_to_implement.implementation_contracts;
        implementation_values = topic_to_implement
            .implementation_contracts_values;
        signatures = topic_to_implement.signatures;

        require(
            implementation_contracts.length == implementation_values.length,
            "Inconsistency!!"
        );

        for (uint i = 0; i < implementation_contracts.length; i++) {
            // implement/execute decision
            implementation_contracts[i].call(
                bytes4(keccak256(signatures)),
                implementation_values
            );
        }

        return "Topic implemented";
    }

    /*************************
    Section C: Maintenance/Upgrade
    *************************/

    function upgrade_implement_decision() public returns () {}
}
