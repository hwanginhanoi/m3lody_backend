
/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers")

module.exports = {

  solidity: {
    version: "0.8.24",
  },
  network: {
    localhost: {
      url: "http://127.0.0.1:8545",
      account: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"

    },
    hardhat: {
      mining: {
        auto: false,
        interval: 5000,
        blockGasLimit: 30000000 // Network block gasLimit
      }
    }
  }
}
