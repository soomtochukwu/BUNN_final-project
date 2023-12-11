// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "./restrictions.sol";
import "./utility_token-interface.sol";

contract bunnG_test is Restrictions {
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
        bool position;
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
        uint256 start_time;
        bool executed;
        bool cancelled;
    }
    uint public counter = 1;
    mapping(uint => Topic) public Topics;

    /* *************************
    Section B: Events
    
    **************************/
    event decision_implemented(uint topic_acted_on,bool implemented, bytes data);
    event vote_cast(address indexed participant, uint topic_acted_on, bool position);
    event proposal_made(uint topic_acted_on, address indexed proposer);

    /* ************************* */
    constructor(address UTA) {
        utility_token_address = UTA;
    }

    /*************************
    Section C: Functions
    *************************/

    // A qualified user initiates a TOPIC/PROPOSAL
    function initiate_topic(
        string memory Title_,
        address[] memory implementation_contracts_,
        uint[] memory implementation_contracts_values_,
        string[] memory signatures_
    ) public {
        Topic memory new_topic = Topic({
            id: counter,
            Title: Title_,
            for_votes: 0,
            against_votes: 0,
            initiator: msg.sender,
            implementation_contracts: implementation_contracts_,
            implementation_contracts_values: implementation_contracts_values_,
            signatures: signatures_,
            start_time: block.timestamp,
            executed: false,
            cancelled: false
        });
        Topics[counter] = new_topic;
        emit proposal_made(counter, msg.sender);
        counter++;
    }

    // A qualified user casts their vote(s)
    function cast_vote(uint topic_id, bool position_) public {
        Topic memory topic = Topics[topic_id];
        ballot memory casted_vote = ballot({
            voter: msg.sender,
            position: position_,
            voted: true
        });

        /*sanity checks*/
        IUTILITY_TOKEN BUNN = IUTILITY_TOKEN(utility_token_address);

        // check if the voting period has expired
        uint256 end_time = voting_duration + topic.start_time;
        require(end_time > block.timestamp , "Voting period has elapsed ");
        
        // ensure that the voter has enough tokens
        require(
            BUNN.balanceOf(msg.sender) > 0,
            "YOU MUST POSSES TOKENs TO BE AN ELIGIBLE VOTER"
        );

        uint256 total_votes = topic.for_votes + topic.against_votes;
        require(quorum(topic.for_votes, total_votes), "Threshold not exceeded");

        // map users vote against the topic they voted for
        // it is supposed to track users who participated in the decision
        votes[topic_id][msg.sender] = casted_vote;

        if (position_) {
            topic.for_votes++;
        } else {
            topic.against_votes++;
        }

        emit vote_cast(msg.sender, topic.id, position_);
    }

    // execute/implement a decision or topic is it passed the voting process
    function implement_decision(
        uint topic_id
    ) public payable returns (string memory) {
        Topic memory topic_to_implement;
        address[] memory implementation_contracts;
        uint[] memory implementation_values;
        string[] memory signatures;

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
            //  bytes memory callData = abi.encodePacked(
            //     bytes4(keccak256(bytes(signatures[0]))),
            //     implementation_values
            // );

            (bool success, bytes memory returned_data) = implementation_contracts[0]
            .call(abi.encodeWithSignature(signatures[0], implementation_values));

            require(success, "FAILED TO IMPLEMENT DECISION");

            emit decision_implemented(topic_to_implement.id, success, returned_data);
        }

        return "Topic implemented";
    }

    /*************************
    Section D: Maintenance/Upgrade
    *************************/
}
