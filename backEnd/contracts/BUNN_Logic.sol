// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "./restrictions.sol";
import "./utility_token-interface.sol";
import "./governor_storage.sol";

contract BUNN_GOVERNOR_LOGIC is governor_storage, Restrictions {
    /* *************************
    Section B: Events
    
    **************************/
    event decision_implemented(string title, uint topic_id, bool implemented);
    event vote_cast(
        address indexed participant,
        uint topic_acted_on,
        bool position
    );
    event proposal_made(address indexed proposer, string topic);
    event new_member(address indexed new_member);
    event new_Admin(address indexed newAdmin);
    event remove_Admin(address indexed demotedAdmin);

    /* ************************* */
    constructor() {}

    /*************************
    Section C: Functions
    *************************/

    function register(string memory name_ /* , uint256 d_tokens */) public {
        Members[msg.sender] = Member({
            name: name_,
            belongs: true /* ,
            delegated_tokens: d_tokens */
        });
        emit new_member(msg.sender);
    }

    // A qualified user initiates a TOPIC/PROPOSAL
    function initiate_topic(
        string memory title_,
        string memory details_,
        address implementation_contract_address_,
        string memory signature_
    ) public {
        /* sanity checks */
        require(Members[msg.sender].belongs, "NOT A MEMBER");

        Topic memory new_topic = Topic({
            id: counter,
            title: title_,
            initiator: msg.sender,
            details: details_,
            implementation_contract_address: implementation_contract_address_,
            signature: signature_,
            start_time: block.timestamp,
            executed: false,
            cancelled: false
        });

        // require(Topics[new_topic.id], "FAILED TO INITIATE TOPIC");

        Topics[new_topic.id] = new_topic;

        counter = counter + 1;
        emit proposal_made(msg.sender, new_topic.title);
    }

    // A qualified user casts their vote(s)
    function cast_vote(uint256 topic_id, bool position_) public {
        // Topic memory topic = Topics[topic_id];
        // IUTILITY_TOKEN BUNN = IUTILITY_TOKEN(utility_token_address);
        // /*sanity checks*/
        // // check if the Topic is cancelled
        // require(!topic.cancelled, "INVALID VOTE. TOPIC IS CANCELLED");
        // // check if sender is a registered user
        // require(Members[msg.sender].belongs, "NOT A MEMBER");
        // // check if the voting period has expired
        // uint256 end_time = voting_duration + topic.start_time;
        // require(end_time > block.timestamp, "VOTING PERIOD HAS ELAPSED");
        // // ensure that the voter has enough tokens
        // require(
        //     BUNN.balanceOf(msg.sender) > 0,
        //     "YOU MUST POSSES TOKENs TO BE AN ELIGIBLE VOTER"
        // );
        // // map users vote against the topic they voted for
        // // it is supposed to track users who participated in the decision
        // require(!ballots[msg.sender][topic_id].voted, "MEMBERS CAN ONLY CAST A VOTE PER TOPIC");
        // ballots[msg.sender][topic_id] = ballot({
        //     Topic_ID: topic_id,
        //     position: position_,
        //     voted: true
        // });
        // if (ballots[msg.sender][topic_id].position) {
        //     votes[topic_id].for_votes = votes[topic_id].for_votes + 1;
        // }else {
        //     votes[topic_id].against_votes = votes[topic_id].against_votes + 1;
        // }
        // emit vote_cast(msg.sender, topic.id, position_);
    }

    // execute/implement a decision or topic is it passed the voting process
    function implement_decision(
        uint256 topic_id,
        bool _override
    ) public payable onlyAdmin {
        Topic memory topic_to_implement;
        address implementation_contract;
        string memory signature;

        uint256 total_votes = votes[topic_id].for_votes +
            votes[topic_id].against_votes;
        uint256 end_time = voting_duration + topic_to_implement.start_time;
        topic_to_implement = Topics[topic_id];
        implementation_contract = topic_to_implement
            .implementation_contract_address;
        signature = topic_to_implement.signature;

        /* sanity checks */
        // check if voting is still in progress
        if (_override) {
            //
        } else {
            require(
                end_time > block.timestamp,
                "CANNOT IMPLEMENT BECAUSE VOTING IS STILL IN PROGRESS"
            );
        }
        //check the quorum
        require(
            quorum(votes[topic_id].for_votes, total_votes),
            "THRESHOLD NOT EXCEEDED"
        );
        // check that the topic has not been cancelled
        require(!topic_to_implement.cancelled, "THIS TOPIC IS CANCELLED");
        // topic can only be implemented once
        require(
            !topic_to_implement.executed,
            "TOPIC CAN ONLY BE IMPLEMENTED ONCE"
        );
        // implement topic
        (bool success, bytes memory returned_data) = implementation_contract
            .call{value: msg.value}(abi.encodeWithSignature(signature));
        // confirm successful implementation
        require(success, "FAILED TO IMPLEMENT");
        mark_as_executed(topic_id);
        // emit respective event
        emit decision_implemented(topic_to_implement.title, topic_id, success);
        returned = abi.decode(returned_data, (uint256));
    }

    function mark_as_executed(uint256 topic_id) private {
        Topics[topic_id].executed = true;
    }

    /*************************
    Section D: Maintenance/Upgrade
    *************************/

    modifier onlyAdmin() {
        require(admin[msg.sender].is_admin, "ACCESS DENIED!");
        _;
    }

    function addAdmin(address newAdmin) public onlyAdmin {
        if (admin[newAdmin].adders >= admins.length) {
            admin[newAdmin].is_admin = true;
            admins.push(newAdmin);
            admin[newAdmin].adders = admin[newAdmin].adders + 1;
        } else {
            admin[newAdmin].adders = admin[newAdmin].adders + 1;
        }

        emit new_Admin(newAdmin);
    }

    function removeAdmin(address demotedAdmin) public onlyAdmin {
        // require(admin[demotedAdmin].removers > (admins.length/2), "");
        if (admin[demotedAdmin].removers >= admins.length - 1) {
            admin[demotedAdmin].is_admin = false;
            admin[demotedAdmin].removers = admin[demotedAdmin].removers + 1;
        } else {
            admin[demotedAdmin].removers = admin[demotedAdmin].removers + 1;
        }

        emit remove_Admin(demotedAdmin);
    }
}
