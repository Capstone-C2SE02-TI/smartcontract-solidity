const { expect } = require("chai");
const hre = require("hardhat");
const {
    ERC20_CONTRACT_ADDRESS,
} = require("../contract-metadatas/erc20.metadata.js");
const {
    DEX_CONTRACT_ADDRESS,
} = require("../contract-metadatas/dex.metadata.js");
const DEX_METADATA = require("../contracts/artifacts/DEX_metadata.json");
const BigNumber = hre.ethers.BigNumber;
let dex_iface;
let owner, buyer;
let ownerAddress, buyerAddress;
let provider;
let ERC20Contract;
let DEXContract;
let TIPrice;

describe("DEX UnitTest", () => {
    before(async () => {
        [owner, buyer] = await hre.ethers.getSigners();
        ownerAddress = await owner.getAddress();
        buyerAddress = await buyer.getAddress();
        provider = hre.ethers.providers.getDefaultProvider(
            process.env.ALCHEMY_API_URL
        );
        ERC20Contract = await hre.ethers.getContractAt(
            "TI",
            ERC20_CONTRACT_ADDRESS
        );
        DEXContract = await hre.ethers.getContractAt(
            "DEX",
            DEX_CONTRACT_ADDRESS
        );
        dex_iface = new hre.ethers.utils.Interface(
            DEX_METADATA["output"]["abi"]
        );
    });

    describe("Buy UnitTest", () => {
        let approveValue;

        xit("Approve to contract", async () => {
            approveValue = BigNumber.from("10");

            const approveTX = await ERC20Contract.connect(buyer).approve(
                DEX_CONTRACT_ADDRESS,
                approveValue
            );
            await approveTX.wait();
        });

        xit("Allowance after approve", async () => {
            const allowance = await ERC20Contract.allowance(
                buyerAddress,
                DEX_CONTRACT_ADDRESS
            );
            const allowanceCompareStatus = approveValue.eq(allowance);

            expect(allowanceCompareStatus).to.equal(true);
        });

        it.only("Buy ", async () => {
            const buyerBalanceBefore = await ERC20Contract.balanceOf(buyerAddress);
            const tokenPrice = await DEXContract.price();
            const buyAmount = "100";

            const paidETH = tokenPrice.mul(tokenPrice);
            const rawTransaction = {
                to: DEX_CONTRACT_ADDRESS,
                value: hre.ethers.utils.hexValue(paidETH),
                data: dex_iface.encodeFunctionData("copyTrading", [buyAmount])
            };

            await buyer.signTransaction(rawTransaction);

            const buyTxResponse = await buyer.sendTransaction(tx);

            await buyTxResponse.wait();

            const buyerBalanceAfter = await ERC20Contract.balanceOf(buyerAddress);

            const balanceCompareStatus = buyerBalanceAfter.eq(buyerBalanceBefore.add(buyAmount));
            
            console.log(buyerBalanceBefore,buyerBalanceAfter, buyerBalanceBefore.add(buyAmount))
            expect(balanceCompareStatus).to.equal(true);

        });
    });
});
