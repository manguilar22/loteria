import {ethers} from "hardhat";

async function main() {

    const address = "0xF6dD32F88eF71e695EcA3F9d8E37F65A7FBb89a6";
    const kermes = await ethers.getContractAt("Game", address);

    const card1 = ["ElGwei",
        "Anonymous",
        "ElTrader",
        "10kPizza",
        "ElMetaverseOrangeYellow",
        "ElSatoshi", "ElMartian"];
    const card2 = [
        "Anonymous",
        "ElGwei",
        "ElMiner",
        "LasBitcoins",
        "ElAirdrop",
        "ElPaperhands",
        "ElMartian"
    ];
    const card3 = ["ElGwei",
        "Anonymous",
        "ElMiner",
        "ElSatoshi",
        "ElMartian"];
    const card4 = [
        "LasBitcoins",
        "ElAirdrop",
        "ElPaperhands",
        "ElBull",
        "ElLambo",
    ];

    const rooms = [card1,card2,card3,card4];

    let gameId = 1;
    console.log("| Game Room | Card Name | Block Number | Gas Price | Gas Limit | Hash |");
    console.log("| --- | --- | --- | --- | --- | --- |");
    for (let i of rooms) {
        for (let card of i) {
            const tx = await kermes.addCallingCard(gameId, card);

            tx.wait();

            const {blockNumber,gasPrice,gasLimit,hash} = tx;

            // @ts-ignore
            const gasPriceF = await ethers.utils.parseEther(gasPrice.toString());
            const gasLimitF = await ethers.utils.formatEther(gasLimit.toString())
            console.log(`| ${gameId} | ${card} | ${blockNumber} | ${gasPrice} | ${gasLimit} | ${hash} |`);
        }
        gameId += 1;
    }
}

main().catch(err => {
    console.log(err);
    process.exitCode = 1;
})
