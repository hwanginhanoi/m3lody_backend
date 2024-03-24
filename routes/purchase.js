// Import necessary modules
import express from 'express';
import ethers from 'ethers';

// Initialize Express app
const router = express.Router();


// Provider (Ethereum node endpoint)
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Contract Address and ABI
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Replace with your deployed contract address
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
]; // Replace with your contract ABI

// Initialize Contract Instance
const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

// API Endpoint to add a product

// API Endpoint to purchase a product
router.post('/', async (req, res) => {
    try {
        const { productId, name, author, price, seller } = req.body;
        // Call contract function to add product
        let tx = await contract.addProduct(productId, name, author, ethers.utils.parseEther(price), seller);
        // Call contract function to purchase product
        await contract.purchaseProduct(productId, { value: ethers.utils.parseEther(price) });
        res.status(200).json({ success: true, message: 'Product purchased successfully', data: tx.hash });
    } catch (error) {
        console.error('Error purchasing product:', error);
        res.status(500).json({ success: false, message: 'Error purchasing product' });
    }
});

// API Endpoint to get product information
router.get('/get-product/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        // Call contract function to get product information
        const productInfo = await contract.getProduct(productId);
        res.status(200).json({ success: true, productInfo: productInfo });
    } catch (error) {
        console.error('Error getting product information:', error);
        res.status(500).json({ success: false, message: 'Error getting product information' });
    }
});
export default router;
// Start the server
