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
    .catch(error => {
        console.error(error);
        process.exit(1);
    });