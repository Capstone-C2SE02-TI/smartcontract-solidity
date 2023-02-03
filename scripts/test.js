const { ethers } = require("hardhat");
const hre = require("hardhat");
const {
    DEX_CONTRACT_ADDRESS,
} = require("../contract-metadatas/dex.metadata.js");

const dex_metadata = require("../contracts/artifacts/DEX_metadata.json");
const BigNumber = hre.ethers.BigNumber;

const {
    arrayify,
    BytesLike,
    concat,
    hexDataSlice,
    hexlify,
    hexZeroPad,
    isHexString,
} = require("@ethersproject/bytes");

async function main() {
    let ABI = [
        { type: "constructor", stateMutability: "nonpayable", inputs: [] },
        {
            type: "event",
            name: "Approval",
            inputs: [
                {
                    type: "address",
                    name: "owner",
                    internalType: "address",
                    indexed: true,
                },
                {
                    type: "address",
                    name: "spender",
                    internalType: "address",
                    indexed: true,
                },
                {
                    type: "uint256",
                    name: "value",
                    internalType: "uint256",
                    indexed: false,
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "OwnershipTransferred",
            inputs: [
                {
                    type: "address",
                    name: "previousOwner",
                    internalType: "address",
                    indexed: true,
                },
                {
                    type: "address",
                    name: "newOwner",
                    internalType: "address",
                    indexed: true,
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "Paused",
            inputs: [
                {
                    type: "address",
                    name: "account",
                    internalType: "address",
                    indexed: false,
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "Transfer",
            inputs: [
                {
                    type: "address",
                    name: "from",
                    internalType: "address",
                    indexed: true,
                },
                {
                    type: "address",
                    name: "to",
                    internalType: "address",
                    indexed: true,
                },
                {
                    type: "uint256",
                    name: "value",
                    internalType: "uint256",
                    indexed: false,
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "Unpaused",
            inputs: [
                {
                    type: "address",
                    name: "account",
                    internalType: "address",
                    indexed: false,
                },
            ],
            anonymous: false,
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "addOperator",
            inputs: [
                { type: "address", name: "operator", internalType: "address" },
            ],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
            name: "allowance",
            inputs: [
                { type: "address", name: "owner", internalType: "address" },
                { type: "address", name: "spender", internalType: "address" },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [{ type: "bool", name: "", internalType: "bool" }],
            name: "approve",
            inputs: [
                { type: "address", name: "spender", internalType: "address" },
                { type: "uint256", name: "amount", internalType: "uint256" },
            ],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
            name: "balanceOf",
            inputs: [
                { type: "address", name: "account", internalType: "address" },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "burn",
            inputs: [
                { type: "uint256", name: "amount", internalType: "uint256" },
            ],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
            name: "cap",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "uint8", name: "", internalType: "uint8" }],
            name: "decimals",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [{ type: "bool", name: "", internalType: "bool" }],
            name: "decreaseAllowance",
            inputs: [
                { type: "address", name: "spender", internalType: "address" },
                {
                    type: "uint256",
                    name: "subtractedValue",
                    internalType: "uint256",
                },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [{ type: "bool", name: "", internalType: "bool" }],
            name: "increaseAllowance",
            inputs: [
                { type: "address", name: "spender", internalType: "address" },
                {
                    type: "uint256",
                    name: "addedValue",
                    internalType: "uint256",
                },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "mint",
            inputs: [
                { type: "address", name: "to", internalType: "address" },
                { type: "uint256", name: "amount", internalType: "uint256" },
            ],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "string", name: "", internalType: "string" }],
            name: "name",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "bool", name: "", internalType: "bool" }],
            name: "operators",
            inputs: [{ type: "address", name: "", internalType: "address" }],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "address", name: "", internalType: "address" }],
            name: "owner",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "pause",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "bool", name: "", internalType: "bool" }],
            name: "paused",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "removeOperator",
            inputs: [
                { type: "address", name: "operator", internalType: "address" },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "renounceOwnership",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "string", name: "", internalType: "string" }],
            name: "symbol",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
            name: "totalSupply",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [{ type: "bool", name: "", internalType: "bool" }],
            name: "transfer",
            inputs: [
                { type: "address", name: "to", internalType: "address" },
                { type: "uint256", name: "amount", internalType: "uint256" },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [{ type: "bool", name: "", internalType: "bool" }],
            name: "transferFrom",
            inputs: [
                { type: "address", name: "from", internalType: "address" },
                { type: "address", name: "to", internalType: "address" },
                { type: "uint256", name: "amount", internalType: "uint256" },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "transferOwnership",
            inputs: [
                { type: "address", name: "newOwner", internalType: "address" },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "unpause",
            inputs: [],
        },
    ];
    // iface.format(FormatTypes.full);
    let iface = new ethers.utils.Interface(ABI);

    ABI.forEach((item) => {
        if (item["type"] == "function") {
            console.log(item["name"]);
            functionFragment = iface.getFunction(item["name"]);

            console.log(
                item["name"],
                hexlify(iface.getSighash(functionFragment))
            );
        }
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
