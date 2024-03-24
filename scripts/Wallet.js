// scripts/transferOwnershis.js
const hre = require('hardhat');
async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const provider = new hre.ethers.providers.Web3Provider(window.Ethereum)
    console.log("Deploying contract with the account:", deployer.address);

    const ConfirmationContract = await hre.ethers.getContractFactory("ConfirmationContract");
    const contract = await ConfirmationContract.deploy();
    await contract.deployed();

    console.log("Contract address:", contract.address);

    // Transfer ownership (example)
    const newOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Address of the new owner
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