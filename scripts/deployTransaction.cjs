const hre = require('hardhat');

async function main() {
    const deployer = await hre.ethers.getSigners();
    // Get the ContractFactory and Signers here.
    const ProductPurchase = await hre.ethers.getContractFactory('ProductPurchase', deployer);
    const productPurchase = await ProductPurchase.deploy();
    await productPurchase.deployed()
    await productPurchase.addProduct(2, "Item2", "Mr. Thanh", ethers.utils.parseEther("10"), "0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    //await productPurchase.getProduct(1);
    ethToSend = ethers.utils.parseEther("10")
    await productPurchase.purchaseProduct(1, { value: ethToSend });
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });