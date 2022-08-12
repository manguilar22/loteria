import {ethers} from "hardhat";


async function main() {


    // ERC20
    const Bean = await ethers.getContractFactory("Bean");
    const bean = await Bean.deploy();

    await bean.deployed();

    console.log(`ERC-20 Bean Token: ${bean.address}`);

    // CommunityWallet
    const Game = await ethers.getContractFactory("Game");
    const game = await Game.deploy(bean.address);

    await game.deployed();

    // ERC721
    const Loteria = await ethers.getContractFactory("Loteria");
    const loteria = await Loteria.deploy(game.address);

    await loteria.deployed();

    console.log(`Community Wallet / Game: ${game.address}`);
    console.log(`ERC-721 Loteria Token Address: ${loteria.address}`);

}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
});
