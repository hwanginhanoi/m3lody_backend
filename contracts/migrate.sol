// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract EtherSender {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    // Payable function to receive Ether
    receive() external payable {}

    // Function to send Ether from this contract to a specified address
    function sendEther(address payable _recipient, uint256 _amount) external {
        require(msg.sender == owner, "Only owner can send Ether");
        require(address(this).balance >= _amount, "Insufficient balance");

        // Transfer Ether to the specified recipient
        _recipient.transfer(_amount);
    }

    // Function to get the contract's balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}