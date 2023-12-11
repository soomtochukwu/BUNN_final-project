pragma solidity ^0.8.19;

import "./restrictions.sol";
import "./utility_token-interface.sol";

contract BUNN_Governor is Restrictions {
    address public utility_token_address;

    struct Member {
        address _address;
    }
    mapping(address => Member) Members;

    struct ballot {
        address voter;
        bool voted;
    }
    mapping(uint => mapping(address => ballot)) votes;

    struct Topic {
        uint id;
        string Title;
        uint256 for_votes;
        uint256 against_votes;
        address initiator;
        address[] implementation_contracts;
        uint[] implementation_contracts_values;
        bytes[] parameters;
        bool executed;
        bool cancelled;
    }
    mapping(uint => Topic) public Topics;

    constructor(address UTA) {
        utility_token_address = UTA;
    }

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

    function cast_vote(uint topic_id, uint position_) public {
        Topic memory topic = Topics[topic_id];
        ballot memory casted_vote = ballot({
            voter: msg.sender,
            position: position_,
            voted: true
        });

        IUTILITY_TOKEN BUNN = IUTILITY_TOKEN(utility_token_address);

        require(block.timestamp < end_time, "Voting duration exceeded");
        require(
            BUNN.balanceOf(msg.sender) > 0,
            "YOU MUST POSSES TOKENs TO BE AN ELIGIBLE VOTER"
        );

        votes[topic_id][msg.sender] = casted_vote;

        uint256 end_time = voting_duration + block.timestamp;
        uint256 total_votes = topic.for_votes + topic.against_votes;
        require(quorum(topic.for_votes, total_votes), "Threshold not met");

        if (position_) {
            topic.for_votes++;
        } else {
            topic.against_votes++;
        }
    }

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

        for (uint i = 0; i < implementation_contracts.length; i++) {
            /* 
            PENDING
             */
        }

        return "Topic implemented";
    }
}
