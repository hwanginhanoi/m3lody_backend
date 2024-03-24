import { ethers } from "ethers";

// Provider (Ethereum node endpoint)
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Transaction Hash

// Function to get product purchase details by transaction hash
export async function getPurchase(transactionHash) {
    try {
        // Get transaction receipt to retrieve contract address
        const receipt = await provider.getTransactionReceipt(transactionHash);

        if (!receipt || !receipt.contractAddress) {
            console.log('Contract address not found for this transaction.');
            return;
        }

        // Contract ABI (Interface)
        const contractABI = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "productId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amountPaid",
                        "type": "uint256"
                    }
                ],
                "name": "ProductPurchased",
                "type": "event"
            },
            {
                "stateMutability": "payable",
                "type": "fallback"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "productId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_author",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "_seller",
                        "type": "address"
                    }
                ],
                "name": "addProduct",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "productId",
                        "type": "uint256"
                    }
                ],
                "name": "getProduct",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "products",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "author",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "wallet",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "productId",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseProduct",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            }
        ];

        // Initialize Contract Instance with contract address
        const contract = new ethers.Contract(receipt.contractAddress, contractABI, provider);

        // Get product purchase details using contract function
        const result = await contract.getProduct(1);
        console.log('Product Name:', result[0]);
        console.log('Author:', result[1]);
        console.log('Price:', ethers.utils.formatEther(result[2]), 'ETH');
        console.log('Seller Address:', result[3]);


        return result;

    } catch (error) {
        console.error('Error:', error);

        return error;
    }
}

// Example usage

