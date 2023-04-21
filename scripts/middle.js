const hre = require("hardhat");
const {
    MIDDLE_CONTRACT_ADDRESS,
} = require("../contract-metadatas/middle.metadata");
const MIDDLE_METADATA = require("../artifacts/contracts/middle.sol/middle.json");
async function main() {
    const provider = hre.ethers.providers.getDefaultProvider(
        process.env.ALCHEMY_API_URL
    );
    const middleContract = await ethers.getContractAt(
        "middle",
        MIDDLE_CONTRACT_ADDRESS
    );
    const user = "0x72598E10eF4c7C0E651f1eA3CEEe74FCf0A76CF2";
    const amount = ethers.utils.parseEther("0.001");
    const pancakeswapAddr = "0xeff92a263d31888d860bd50809a8d171709b7b1c";
    const inputdata =
        "0x7ff36ab50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000072598E10eF4c7C0E651f1eA3CEEe74FCf0A76CF2000000000000000000000000000000000000000000000000000000006442a2e70000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d600000000000000000000000007865c6E87B9F70255377e024ace6630C1Eaa37F";
    const [owner] = await hre.ethers.getSigners();
    console.log(owner.address);
    const tx = await middleContract
    .connect(owner)
    .copyTrading(user, pancakeswapAddr, inputdata, amount, {
        gasLimit: 300000, // set your desired gas limit here,
    })
    
    await tx.wait();
    // const dex_iface = new hre.ethers.utils.Interface(MIDDLE_METADATA["abi"]);
    // const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY2, provider);

    // console.log(wallet.address);
    // const rawTransaction = {
    //     to: MIDDLE_CONTRACT_ADDRESS,
    //     // value: hre.ethers.utils.hexValue(paidETH),
    //     data: dex_iface.encodeFunctionData("copyTrading", [
    //         pancakeswapAddr,
    //         "0x7ff36ab50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000072598E10eF4c7C0E651f1eA3CEEe74FCf0A76CF20000000000000000000000000000000000000000000000000000000064418d830000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d600000000000000000000000007865c6E87B9F70255377e024ace6630C1Eaa37F",
    //     ]),
    //     gasLimit: 210000,
    //     value: "0x",
    // };

    // const signedTx = await wallet.signTransaction(rawTransaction);

    // const buyTxResponse = await wallet.sendTransaction(rawTransaction);

    // await buyTxResponse.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
