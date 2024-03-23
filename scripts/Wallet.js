// scripts/transferOwnershis.js
const hre = require('hardhat');

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contract with the account:", deployer.address);

    const ConfirmationContract = await hre.ethers.getContractFactory("ConfirmationContract");
    const contract = await ConfirmationContract.deploy();
    await contract.deployed();

    console.log("Contract address:", contract.address);

    // Transfer ownership (example)
    const newOwner = "0xNewOwnerAddress"; // Address of the new owner
    console.log("Transferring ownership to:", newOwner);
    await contract.connect(deployer).transferOwnership(newOwner);

    console.log("Ownership transferred successfully");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });