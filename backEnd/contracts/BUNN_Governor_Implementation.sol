// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract external_contract {
    uint public state;
    constructor() {
        
    }

    //functin signature ==> "function alterState(uint)"
    function alterState(uint arg) public{
        state = arg;
    }
}