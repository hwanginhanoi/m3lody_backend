const hre = require('hardhat');
const ethers = require('ethers');
const fs = require('fs');
async function main() {
    const deployer = await hre.ethers.getSigners();

    // Get the ContractFactory and Signers here.
    const ProductPurchase = await hre.ethers.getContractFactory('ProductPurchase');
    const productPurchase = await ProductPurchase.deploy();
    await productPurchase.deployed()
    await productPurchase.addProduct(1, "Item2", "Mr. Thanh", ethers.utils.parseEther("10"), "0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    //await productPurchase.getProduct(1);
    ethToSend = ethers.utils.parseEther("10")
    await productPurchase.purchaseProduct(1, { value: ethToSend });
    updateEnvFile(productPurchase.address)
}
function updateEnvFile(contractAddress) {
    try {
        // Read existing .env file
        const envFilePath = '.env';
        const envContent = fs.readFileSync(envFilePath, 'utf8');

        // Replace CONTRACT_ADDRESS value with the deployed contract address
        const updatedEnvContent = envContent.replace(
            /CONTRACT_ADDRESS=.*/,
            `CONTRACT_ADDRESS=${contractAddress}`
        );

        // Write updated content back to .env file
        fs.writeFileSync(envFilePath, updatedEnvContent);

        console.log('.env file updated with contract address:', contractAddress);
    } catch (error) {
        console.error('Error updating .env file:', error);
    }
}


// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });