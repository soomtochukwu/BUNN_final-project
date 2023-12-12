const
    { network } = require("hardhat"),
    { verify } = require("../utils/verify");

require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
    // let BUNN_DAO_test;
    const
        { deployer } = await getNamedAccounts(),
        { deploy } = await deployments,
        { chainId } = network.config.chainId,

        /* 
        deploy BUNN_DAO_test 
        */
        BUNN_DAO_test = await deploy("BUNN_DAO_test", {
            from: deployer,
            args: [],
            log: true,
            waitConfirmations: network.config.blockConfirmations,
        }),

        // verify BUNN_DAO_test
        ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
    if (chainId !== 31337 && ETHERSCAN_KEY) {
        await verify(
            BUNN_DAO_test.address,
            [],
            "contracts/governance_token.sol:BUNN_DAO_test"
        );
        console.log("")
    };



    /* 
    deploy external_contract
     */
    const external_contract = await deploy("external_contract", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations,
    });

    // verify external_contract
    if (chainId !== 31337 && ETHERSCAN_KEY) {
        await verify(
            external_contract.address,
            [],
            "contracts/BUNN_Governor_Implementation.sol:external_contract"
        );
        console.log("")
    };



    /* 
    deploy bunnG_test
     */
    const bunnG_test = await deploy("bunnG_test", {
        from: deployer,
        args: [BUNN_DAO_test.address],
        log: true,
        waitConfirmations: network.config.blockConfirmations,
    });

    // verify bunnG_test
    if (chainId !== 31337 && ETHERSCAN_KEY) {
        await verify(
            bunnG_test.address,
            [BUNN_DAO_test.address],
            "contracts/BUNN_Governor_Proxy.sol:bunnG_test"
        );
        console.log("")
    }
}

module.exports.tags = ["all", "nft"]