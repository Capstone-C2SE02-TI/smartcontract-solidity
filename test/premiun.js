// const tokenPrice = await DEX_CONTRACT_ADDRESS.price()

//             const rawTransaction = {
//                 from,
//                 to: DEX_CONTRACT_ADDRESS,
//                 value: hre.ethers.utils.hexValue(hre.ethers.utils.parseEther("1")),
//             }

//             await buyer.signTransaction(rawTransaction)

//             await buyer.sendTransaction(tx)
const { expect } = require("chai");
const hre = require("hardhat");
let dex_iface;
let owner, buyer;
let ownerAddress, buyerAddress;
let provider;
let ERC20Contract;
let DEXContract;
const {
    ERC20_CONTRACT_ADDRESS,
} = require("../contract-metadatas/erc20.metadata");
const {
    PREMIUM_SUBSCRIPTION_CONTRACT_ADDRESS,
} = require("../contract-metadatas/premiumSubscription.metadata");
describe("Premium Subscription Unit Test", () => {
    before(async () => {
        [owner, buyer] = await hre.ethers.getSigners();
        ownerAddress = await owner.getAddress();
        buyerAddress = await buyer.getAddress();

        ERC20Contract = await hre.ethers.getContractAt(
            "TI",
            ERC20_CONTRACT_ADDRESS
        );
        PremiumSubscriptionContract = await hre.ethers.getContractAt(
            "premiumSubscription",
            PREMIUM_SUBSCRIPTION_CONTRACT_ADDRESS
        );

    });

    it("Test", async() => {
        console.log(ownerAddress, buyerAddress);

    })
});
