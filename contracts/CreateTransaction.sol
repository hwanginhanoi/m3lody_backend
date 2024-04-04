// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductPurchase is ERC721Enumerable, Ownable {

    // Struct to represent a product
    struct Product {
        string name;
        string author;
        uint256 price;
        address payable wallet;
    }

    // Mapping to store products by a unique identifier
    mapping(uint256 => Product) public products;

    // Event to log purchase
    event ProductPurchased(uint256 productId, address buyer, uint256 amountPaid);

    constructor() ERC721("ProductPurchase", "PP") {}

    // Function to add a product
    function addProduct(uint256 productId, string memory _name, string memory _author, uint256 _price, address payable _seller) external onlyOwner {
        products[productId] = Product({
            name: _name,
            author: _author,
            price: _price,
            wallet: _seller
        });
    }

    // Function to purchase a product
    function purchaseProduct(uint256 productId) external payable {
        Product storage product = products[productId];

        require(msg.value == product.price, "Insufficient funds sent");

        // Transfer Ether to the seller
        product.wallet.transfer(msg.value);
        // Mint the token to the buyer
        _mint(msg.sender, productId);
        // Emit an event to log the purchase
        emit ProductPurchased(productId, msg.sender, msg.value);
    }

    function getProduct(uint256 productId) external view returns (string memory, string memory, uint256, address payable) {
        Product storage product = products[productId];
        return (product.name, product.author, product.price, product.wallet);
    }

    fallback() external payable {}

    receive() external payable {}
}
