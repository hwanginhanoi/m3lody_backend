const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))

const hre = require('hardhat');

async function main() {
    const deployer = await hre.ethers.getSigners();
    // Get the ContractFactory and Signers here.
    const EtherSender = await hre.ethers.getContractFactory('EtherSender');
    const etherSender = await EtherSender.deploy();
    await etherSender.deployed()
    const amountToSend = ethers.utils.parseEther('10');
    await etherSender.sendEther("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", { value: amountToSend });


    console.log('SendEth deployed to:', etherSender.address);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
