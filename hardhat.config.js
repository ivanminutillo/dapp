require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.6.10",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      /*
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },
    hardhat: {
      chainId: 31337
    },
  }
};
