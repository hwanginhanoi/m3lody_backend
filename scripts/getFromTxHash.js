import { ethers } from "ethers";

// Provider (Ethereum node endpoint)
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Transaction Hash

// Function to get product purchase details by transaction hash
export async function getPurchase(txHash) {
    try {
        // Get transaction receipt
        const txReceipt = await provider.getTransactionReceipt(txHash);

        if (!txReceipt) {
            throw new Error("Transaction not found");
        }

        // Parse event logs to find ProductPurchased event
        const ProductPurchasedEvent = txReceipt.logs.find(log => log.topics[0] === ethers.utils.id("ProductPurchased(uint256,address,uint256)"));

        if (!ProductPurchasedEvent) {
            throw new Error("ProductPurchased event not found in the transaction logs");
        }

        // Extract productId from the event
        const productId = ethers.utils.hexStripZeros(ProductPurchasedEvent.topics[1]);

        // Call getProduct function with productId to retrieve product data
        const product = await contract.getProduct(productId);

        console.log("Product Name:", product[0]);
        console.log("Author:", product[1]);
        console.log("Price:", product[2]);
        console.log("Seller Wallet:", product[3]);

        return product;
    } catch (error) {
        console.error("Error getting product from transaction hash:", error);
        throw error;
    }

}

// Example usage

