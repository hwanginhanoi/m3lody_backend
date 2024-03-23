const hre = require('hardhat');

async function main() {
    const deployer = await hre.ethers.getSigners();
    // Get the ContractFactory and Signers here.
    const ProductPurchase = await hre.ethers.getContractFactory('ProductPurchase');
    const productPurchase = await ProductPurchase.deploy();
    await productPurchase.deployed()
    await productPurchase.addProduct(1, "Item1", "Mr. Thanh", ethers.utils.parseEther("10"), "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
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