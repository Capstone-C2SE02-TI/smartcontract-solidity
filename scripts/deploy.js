const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const initAmount = 10000000;
    const symbol = "TI";
    const decimals = 0;
    const TIFactory = await hre.ethers.getContractFactory("TI");
    const TIInstance = await TIFactory.deploy(
        initAmount,
        symbol,
        decimals,
        symbol
    );

    await TIInstance.deployed();

    console.log("TI deploy to :", TIInstance.address);

    const TIPrice = "0.001";
    const DEXFactory = await hre.ethers.getContractFactory("DEX");
    const DEXInstance = await DEXFactory.deploy(
        TIInstance.address,
        ethers.utils.parseEther(TIPrice)
    );

    await DEXInstance.deployed();

    console.log("DEX deploy to :", DEXInstance.address);

    const premiumSubscriptionFactory = await hre.ethers.getContractFactory(
        "premiumSubscription"
    );
    const premiumSubscriptionInstance = await premiumSubscriptionFactory.deploy(
        TIInstance.address
    );

    await premiumSubscriptionInstance.deployed();

    console.log(
        "premiumSubscription deploy to :",
        premiumSubscriptionInstance.address
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
