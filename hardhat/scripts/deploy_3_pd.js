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
    //发布library
    const Library = await ethers.getContractFactory("NFTDescriptor");
    //分别传入weth9合约地址以及转为16进制的`eth`名称，也就是该名称是bytes32：
    const library = await Library.deploy();
    await library.deployed();

    //发布仓位描述
    const Pd = await ethers.getContractFactory("NonfungibleTokenPositionDescriptor",{
        libraries: {
            NFTDescriptor: library.address
        }
    });
    //分别传入weth9合约地址以及转为16进制的`eth`名称，也就是该名称是bytes32：
    const pd = await Pd.deploy('0xFe33eC9960E430608030e92860264B486Ae99Ef2','0x4554480000000000000000000000000000000000000000000000000000000000');
    await pd.deployed(); //等的确认发布

    console.log("PositionDescriptor address:", pd.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
