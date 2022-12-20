const { ethers } = require("hardhat");
const hre = require("hardhat");
const {
    DEX_CONTRACT_ADDRESS,
} = require("../contract-metadatas/dex.metadata.js");

const dex_metadata = require("../contracts/artifacts/DEX_metadata.json")
const BigNumber = hre.ethers.BigNumber;

async function main() {
   

    console.log(dex_metadata["output"]["abi"]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
