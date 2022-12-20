const { expect } = require("chai");
const hre = require("hardhat");
const {
    ERC20_CONTRACT_ADDRESS,
} = require("../contract-metadatas/erc20.metadata.js");
const BigNumber = hre.ethers.BigNumber;
let owner, receiver1;
let ownerAddress, receiver1Address;
let provider;
let ERC20Contract;

describe("ERC20 UnitTest", () => {
    before(async () => {
        [owner, receiver1] = await hre.ethers.getSigners();
        ownerAddress = await owner.getAddress();
        receiver1Address = await receiver1.getAddress();
        provider = hre.ethers.providers.getDefaultProvider(
            process.env.ALCHEMY_API_URL
        );
        ERC20Contract = await hre.ethers.getContractAt(
            "TI",
            ERC20_CONTRACT_ADDRESS
        );
    });

    describe("Transfer UnitTest", () => {
        it("Balance when transfer", async () => {
            const ownerBalanceBefore = await ERC20Contract.balanceOf(
                ownerAddress
            );
            const receiver1BalanceBefore = await ERC20Contract.balanceOf(
                receiver1Address
            );
            const transferValue = BigNumber.from("10");

            const transferTX = await ERC20Contract.connect(owner).transfer(
                receiver1Address,
                transferValue
            );
            await transferTX.wait();

            const ownerBalanceAfter = await ERC20Contract.balanceOf(
                ownerAddress
            );
            const receiver1BalanceAfter = await ERC20Contract.balanceOf(
                receiver1Address
            );

            const ownerBalanceCompareStatus = ownerBalanceAfter.eq(
                transferValue.sub(ownerBalanceBefore).abs()
            );
            const receiver1BalanceCompareStatus = receiver1BalanceAfter.eq(
                transferValue.add(receiver1BalanceBefore)
            );

            expect(ownerBalanceCompareStatus).to.equal(true);
            expect(receiver1BalanceCompareStatus).to.equal(true);
        });
    });

    describe("TransferFrom UnitTest", () => {
        it("Allowance when approve", async () => {
            const approveValue = BigNumber.from("10");

            const approveTX = await ERC20Contract.connect(owner).approve(
                receiver1Address,
                approveValue
            );
            await approveTX.wait();

            const allowance = await ERC20Contract.allowance(
                ownerAddress,
                receiver1Address
            );

            const allowanceCompareStatus = approveValue.eq(allowance);

            expect(allowanceCompareStatus).to.equal(true);
        });

        it("Allowance, balance after transfer from", async () => {
            const beforeAllowance = await ERC20Contract.allowance(
                ownerAddress,
                receiver1Address
            );

            const ownerBalanceBefore = await ERC20Contract.balanceOf(
                ownerAddress
            );
            const receiver1BalanceBefore = await ERC20Contract.balanceOf(
                receiver1Address
            );

            const transferFromTX = await ERC20Contract.connect(
                receiver1
            ).transferFrom(ownerAddress, receiver1Address, beforeAllowance);

            await transferFromTX.wait();

            const ownerBalanceAfter = await ERC20Contract.balanceOf(
                ownerAddress
            );
            const ownerBalanceCompareStatus = ownerBalanceAfter.eq(
                beforeAllowance.sub(ownerBalanceBefore).abs()
            );
            expect(ownerBalanceCompareStatus).to.equal(true);

            const receiver1BalanceAfter = await ERC20Contract.balanceOf(
                receiver1Address
            );
            const receiver1BalanceCompareStatus = receiver1BalanceAfter.eq(
                beforeAllowance.add(receiver1BalanceBefore)
            );
            expect(receiver1BalanceCompareStatus).to.equal(true);
        });
    });
});
