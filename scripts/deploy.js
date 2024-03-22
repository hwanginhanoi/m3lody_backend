import { ethers } from "ethers";

async function main() {
    const contract = require("../artifacts/contracts/migrate.sol/EtherSender.json");
    let url = "http://localhost:8545";
    let provider = new ethers.providers.JsonRpcProvider(url);
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    const wallet = new ethers.Wallet(privateKey, provider);
    const account = wallet.connect(provider);
    const contractFactory = new ethers.ContractFactory(contract.abi, contract.bytecode, account);
    const contractDeploy = await contractFactory.deploy();
    await contractDeploy.deployed();
    console.log("Contract deployed to:", contractDeploy.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
