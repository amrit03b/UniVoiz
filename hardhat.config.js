require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    avalancheFuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: ["0b1ac645e1f9d47a781b38bed923b06a8470658347c4ddba02d49eccdeffdcb9"]
    }
  }
};
