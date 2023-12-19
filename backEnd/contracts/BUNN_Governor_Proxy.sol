// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "./restrictions.sol";
import "./utility_token-interface.sol";
import "./governor_storage.sol";

contract BUNN_GOVERNOR is governor_storage, Restrictions {


    /* *************************
    Section B: Events
    
    **************************/
    event decision_implemented(
        string title,
        uint topic_id,
        bool implemented
    );
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
    constructor(address utility_token_address_, address upgraded_logic_contract) {
        utility_token_address = utility_token_address_;
        admin[msg.sender].is_admin = true;
        logic_contrcat = upgraded_logic_contract;
    }

    /*************************
    Section C: Functions
    *************************/

    function register(string memory name_/* , uint256 d_tokens */) public {
        (bool success,) = logic_contrcat.delegatecall(abi.encodeWithSignature("register(string)", name_));
        require(success, "FAILED TO REGISTER");
    }

    // A qualified user initiates a TOPIC/PROPOSAL
    function initiate_topic(
        string memory title_,
        string memory details_,
        address  implementation_contract_address_,
        string memory signature_
    ) public {
        bytes memory data = abi.encodeWithSignature("initiate_topic(string,string,address,string)", title_, details_, implementation_contract_address_, signature_);
        (bool success,) = logic_contrcat.delegatecall(data);
        
        require(success, "FAILED TO INITIATE TOPIC");
    }

    // A qualified user casts their vote(s)
    function cast_vote(uint256 topic_id, bool position_) public {
        
        Topic memory topic = Topics[topic_id];
        IUTILITY_TOKEN BUNN = IUTILITY_TOKEN(utility_token_address);
        uint256 end_time = voting_duration + topic.start_time;

        /*sanity checks*/
        // check if the Topic is cancelled 
        require(!topic.cancelled, "INVALID VOTE. TOPIC IS CANCELLED");
        // check if sender is a registered user
        require(Members[msg.sender].belongs, "NOT A MEMBER");
        // check if the voting period has expired
        require(end_time > block.timestamp, "VOTING PERIOD HAS ELAPSED");
        // ensure that the voter has enough tokens
        require(
            BUNN.balanceOf(msg.sender) > 0,
            "YOU MUST POSSES TOKENs TO BE AN ELIGIBLE VOTER"
        );
        uint256 voting_power_ = BUNN.balanceOf(msg.sender);
        
        // map users vote against the topic they voted for
        // it is supposed to track users who participated in the decision

        require(!ballots[msg.sender][topic_id].voted, "MEMBERS CAN ONLY CAST A VOTE PER TOPIC");
        ballots[msg.sender][topic_id] = ballot({
            Topic_ID: topic_id,
            position: position_,
            voted: true,
            voting_power: voting_power_
        });

        // count votes based on voting power
        if (ballots[msg.sender][topic_id].position) {
            votes[topic_id].for_votes = votes[topic_id].for_votes + voting_power_;
        }else {
            votes[topic_id].against_votes = votes[topic_id].against_votes + voting_power_;
        }

        emit vote_cast(msg.sender, topic.id, position_);
    
    }

    // execute/implement a decision or topic is it passed the voting process
    function implement_decision(uint256 topic_id, bool _override) public payable onlyAdmin{
        (bool success, ) = logic_contrcat.delegatecall(abi.encodeWithSignature("implement_decision(uint256,bool)", topic_id, _override));
        require(success, "FAILED TO IMPLEMENT DECISION");
    }

    function cancel_Topic(uint256 topic_id) public onlyAdmin {
        Topics[topic_id].cancelled = true;
    }
    

    /*************************
    Section D: Maintenance/Upgrade
    *************************/
    function UPGRADE(address upgradeed_logic_contract) public onlyAdmin {
        logic_contrcat = upgradeed_logic_contract;
    }

    modifier onlyAdmin() {
        require(admin[msg.sender].is_admin, "ACCESS DENIED!");
        _;
    }

    function addAdmin(address newAdmin) public onlyAdmin {
        if(admin[newAdmin].adders >= admins.length ){
            admin[newAdmin].is_admin = true;
            admins.push(newAdmin);
            admin[newAdmin].adders = admin[newAdmin].adders + 1;
        }else{
            admin[newAdmin].adders = admin[newAdmin].adders + 1;
        }
        
        emit new_Admin(newAdmin);
    }

    function removeAdmin(address demotedAdmin) public onlyAdmin{
        // require(admin[demotedAdmin].removers > (admins.length/2), "");
        if(admin[demotedAdmin].removers >= admins.length-1 ){
            admin[demotedAdmin].is_admin = false;
            admin[demotedAdmin].removers = admin[demotedAdmin].removers + 1;
        }else {
            admin[demotedAdmin].removers = admin[demotedAdmin].removers + 1;
        }

        emit remove_Admin(demotedAdmin);
    }
}
