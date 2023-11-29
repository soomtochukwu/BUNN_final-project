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
    mapping(uint => mapping(address => ballot)) votes;

    // PROPOSAL/TOPIC
    struct Topic {
        uint id;
        string Title;
        uint for_votes;
        uint against_votes;
        address initiator;
        string[] topic_implementation_contract_interfaces;
        address[] topic_implementation_contract;
        uint256[] topic_implementation_contract_parameter;
        uint256[] parameters;
        bool executed;
        bool cancelled;
    }
    mapping(uint => Topic) public Topics;

    /* ballot box
    maps `ballots` against the `Topic` it is for
     */

    // A qualified user imitates a TOPIC/PROPOSAL
    function initiate(
        string memory Title_,
        string[] memory topic_implementation_contract_interfaces_,
        address[] memory topic_implementation_contract_,
        uint256[] memory topic_implementation_contract_parameter_,
        uint256[] memory parameters_
    ) public returns (uint) {
        Topic memory new_topic = Topic({
            id: 2,
            Title: Title_,
            for_votes: 0,
            against_votes: 0,
            initiator: msg.sender,
            topic_implementation_contract_interfaces: topic_implementation_contract_interfaces_,
            topic_implementation_contract: topic_implementation_contract_,
            topic_implementation_contract_parameter: topic_implementation_contract_parameter_,
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
        Topic memory topic_to_implement = Topics[topic_id];
        string[] memory interfaces = topic_to_implement
            .topic_implementation_contract_interfaces;
        
        for (
            uint i = 0;
            i < topic_to_implement.topic_implementation_contract.length;
            i++
        ) {
            string memory _interface = interfaces[i];
            // HERE IS THE ISSUE
            import _interface;
        }

        return "Topic implemented";
    }
}
