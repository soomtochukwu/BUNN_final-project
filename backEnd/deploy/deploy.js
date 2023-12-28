const
    { network } = require("hardhat"),
    { verify } = require("../utils/verify");

require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
    console.log("")
    const
        ETHERSCAN_KEY = process.env.ETHERSCAN_KEY,


        { deployer } = await getNamedAccounts(),
        { deploy } = await deployments,
        { chainId } = network.config.chainId,

        /* 
        deploy BUNN_UTILITY_TOKEN 
        */
        BUNN_UTILITY_TOKEN = await deploy("BUNN_UTILITY_TOKEN", {
            from: deployer,
            args: [],
            log: true,
            waitConfirmations: network.config.blockConfirmations,
        }),

        /* 
        deploy BUNN_GOVERNOR_LOGIC 
        */
        BUNN_GOVERNOR_LOGIC = await deploy("BUNN_GOVERNOR_LOGIC", {
            from: deployer,
            args: [],
            log: true,
            waitConfirmations: network.config.blockConfirmations,
        }),

        /* 
        deploy BUNN_GOVERNOR 
        */
        BUNN_GOVERNOR = await deploy("BUNN_GOVERNOR", {
            from: deployer,
            args: [
                BUNN_UTILITY_TOKEN.address,
                BUNN_GOVERNOR_LOGIC.address
            ],
            log: true,
            waitConfirmations: network.config.blockConfirmations,
        }),

        /* 
        deploy IMPLEMENTATION_CONTRACT 
        */
        IMPLEMENTATION_CONTRACT = await deploy("IMPLEMENTATION_CONTRACT", {
            from: deployer,
            args: [],
            log: true,
            waitConfirmations: network.config.blockConfirmations,
        })
        ;

    // verify BUNN_UTILITY_TOKEN
    if (chainId !== 31337 && ETHERSCAN_KEY) {
        await verify(
            BUNN_UTILITY_TOKEN.address,
            [],
            "contracts/governance_token.sol:BUNN_UTILITY_TOKEN"
        );
        console.log("")
    };

    // verify BUNN_GOVERNOR_LOGIC
    if (chainId !== 31337 && ETHERSCAN_KEY) {
        await verify(
            BUNN_GOVERNOR_LOGIC.address,
            [],
            "contracts/BUNN_Logic.sol:BUNN_GOVERNOR_LOGIC"
        );
        console.log("")
    };

    // verify BUNN_GOVERNOR
    if (chainId !== 31337 && ETHERSCAN_KEY) {
        await verify(
            BUNN_GOVERNOR.address,
            [
                BUNN_UTILITY_TOKEN.address,
                BUNN_GOVERNOR_LOGIC.address
            ],
            "contracts/BUNN_Governor_Proxy.sol:BUNN_GOVERNOR"
        );
        console.log("")
    };

    // verify IMPLEMENTATION_CONTRACT
    if (chainId !== 31337 && ETHERSCAN_KEY) {
        await verify(
            IMPLEMENTATION_CONTRACT.address,
            [],
            "contracts/Implementation-test.sol:IMPLEMENTATION_CONTRACT"
        );
        console.log("")
    };


}

module.exports.tags = ["all", "nft"]