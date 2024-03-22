// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract EtherSender {
    address public owner;
    address payable receiver;
    constructor( ) {
        owner = msg.sender;
        
    }

    modifier onlyOwner()
    {
        require(msg.sender == owner, "Only contract owner can access this function");  
        _;
    }

    // Function to send Ether from this contract to a specified address
    function sendEther(address payable _receiver) external payable onlyOwner() {
        require(msg.sender == owner, "Only owner can send Ether");
        require(address(this).balance >= 0, "Insufficient balance");

        // Transfer Ether to the specified recipient
        _receiver.transfer(msg.value);
    }
    fallback() external payable {}
    receive() external payable { }
}