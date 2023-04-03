var Web3 = require("@nomiclabs/hardhat-web3");
var web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.INFURA_API_URL)
);
var { Transaction } = require("ethereumjs-tx");

async function cancelTransaction(address, transactionHash) {
    const transactionReceipt = await web3.eth.getTransaction(transactionHash);

    if (address.toLowerCase() != transactionReceipt.from.toLowerCase()) {
        throw new Error("Address didnt match");
    }
    const oldGasPrice = Number(transactionReceipt.gasPrice);
    const newGasPrice = oldGasPrice >= 2 ? oldGasPrice * 0.1 : 2;

    const newTransaction = {
        from: address,
        to: transactionReceipt.to,
        gasPrice: Web3.utils.toHex(newGasPrice),
        gas: Web3.utils.toHex(transactionReceipt.gas),
        nonce: Web3.utils.toHex(transactionReceipt.nonce),
        value: "0x0",
        data: transactionReceipt.input,
    };
    const chainIdHex = await hre.network.provider.send("eth_chainId");
    const chainIdDecimal = web3.utils.hexToNumber(chainIdHex);

    const transaction = new Transaction(newTransaction, {
        chain: chainIdDecimal,
    });

    transaction.sign(Buffer.from(process.env.ADMIN_PRIVATE_KEY, "hex"));

    console.log(
        await web3.eth.sendSignedTransaction(
            "0x" + transaction.serialize().toString("hex")
        )
    );
}
cancelTransaction(
    "0x18A298Ce206112460e4Bfa5504cf2A89050c7663",
    "0x1052e0519c95f6ee78848495645121f443310aecd90fb6242e4a89a87a6317bf"
).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
