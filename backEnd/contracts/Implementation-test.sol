// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract IMPLEMENTATION_CONTRACT {
    uint256 public state = 0;
    uint256 public val;

    constructor() {}

    //functions signature ==> "function alterState(uint)"
    function alterState() public payable returns (uint) {
        val += msg.value;
        val /= 1e18;
        return val;
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }
}
