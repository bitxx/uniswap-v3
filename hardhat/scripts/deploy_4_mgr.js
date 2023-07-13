// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    //solidity version：0.8.18

    //发布仓位描述
    const Mgr = await ethers.getContractFactory("NonfungiblePositionManager");
    //分别传入weth9合约地址以及转为16进制的`eth`名称，也就是该名称是bytes32：
    const mgr = await Mgr.deploy('0xC5F57433074986CD739900242033Ca5E5f6da4be','0xFe33eC9960E430608030e92860264B486Ae99Ef2','0xd28EC177C8f347F4C759a9a15055Ccf1A66E2342');
    await mgr.deployed(); //等的确认发布

    console.log("NonfungiblePositionManager address:", mgr.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
