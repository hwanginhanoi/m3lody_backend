
/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers")

module.exports = {

  solidity: {
    version: "0.8.24",
  },
  network: {
    localhost: {
      url: "http://127.0.0.1:8545",
      account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

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
