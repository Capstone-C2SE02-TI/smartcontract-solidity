require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
require("dotenv").config()


module.exports = {
  solidity : "0.8.0",

  networks : {
    goerli : {
      url : `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      // accounts : [process.env.PRIVATE_KEY]
      accounts :  {
        mnemonic : process.env.MNEMONIC
      }
    },

    mainnet : {
      url : `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`
    }
    
  },

  etherscan : {
    apiKey : process.env.ETHERSCAN_API_KEY
  }
};
