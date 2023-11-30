// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract BUNN_Governor {
    constructor() {}

    // ballot paper
    struct ballot {
        address voter;
        bool position;
        bool voted;
    }
    /* ballot box
    maps `ballots` against the `Topic` it is for
     */
    mapping(uint => mapping(address => ballot)) votes;

    // PROPOSAL/TOPIC
    struct Topic {
        uint id;
        string Title;
        uint for_votes;
        uint against_votes;
        address initiator;
        address[] implementation_contracts;
        uint[] implementation_contracts_values;
        bytes[] parameters;
        bool executed;
        bool cancelled;
    }
    mapping(uint => Topic) public Topics;

    // A qualified user imitates a TOPIC/PROPOSAL
    function initiate(
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
    function vote(uint topic_id, bool position_) public {
        Topic memory topic = Topics[topic_id];
        ballot memory casted_vote = ballot({
            voter: msg.sender,
            position: position_,
            voted: true
        });
        /*
        map users vote against the topic they voted for 
        it is supposed to track users who participated in the decision
        */
        votes[topic_id][msg.sender] = casted_vote;

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
        implement_values = topic_to_implement.implementation_contracts_values;
        parameters = topic_to_implement.parameters;

        require(
            implementation_contracts.length == implement_values.length,
            "Inconsistency!!"
        );

        for (uint i = 0; i < implementation_contracts.length; i++) {}

        return "Topic implemented";
    }
}
