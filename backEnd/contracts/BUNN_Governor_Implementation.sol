// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract external_contract {
    uint256 public state = 0;
    uint256 public val;

    constructor() {}

    //functions signature ==> "function alterState(uint)"
    function alterState(uint256 arg) public payable  returns(uint ){
        state += arg;
        val = val + msg.value;
        val = val/1e18;
        return state;
    }

    function balance() public view returns (uint256){
        return address(this).balance;
    }
}
