"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
const config = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      // @ts-ignore
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
exports.default = config;
