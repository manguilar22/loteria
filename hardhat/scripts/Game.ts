import {ethers} from "hardhat";

async function main() {

    const remotePlayer = "0xDE0EC906B1A038Bf02b69fD0F8Bcf10d2882De9E";

    const address = "0xD49d10E0B1A307F010893e5278FBc79aD5041E08";
    const kermes = await ethers.getContractAt("Game", address);

    const beanAddress = "0xc44B8cE1A8aE3e75bc5baBeC981640389e7dEB8C";
    const bean = await ethers.getContractAt("Bean",beanAddress);

    await bean.mint("1000");
    await bean.transfer(remotePlayer, ethers.utils.parseEther("100"));

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
