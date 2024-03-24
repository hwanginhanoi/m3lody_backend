const { ethers } = require("ethers");

// Kết nối đến localhost Hardhat node
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

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
]


// Địa chỉ hợp đồng đã triển khai trên localhost
const contractAddress = '0xb0d4afd8879ed9f52b28595d31b441d079b2ca07';

// Khởi tạo một đối tượng hợp đồng
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Hàm để lấy thông tin sản phẩm mua hàng
async function getProductPurchaseDetails(accountAddress) {
    try {
        // Gọi hàm trong hợp đồng
        const result = await contract.getProduct(1);
        console.log('Tên sản phẩm:', result);
        console.log('Giá:', result[1]);
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

// Ví dụ về việc sử dụng
const buyerAddress = '0xcd8a1c3ba11cf5ecfa6267617243239504a98d90';
getProductPurchaseDetails(buyerAddress);
