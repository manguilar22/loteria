import {ethers} from "hardhat";

async function main() {

    const address = "0xAD339fe6D783dD597Cc372840D80f7d4af53563D";
    const kermes = await ethers.getContractAt("Game", address);

    const card1 = ["ElGwei",
        "Anonymous",
        "ElMiner",
        "LasBitcoins",
        "ElAirdrop",
        "Anonymous",
        "ElPaperhands",
        "ElLambo",
        "ElBull",
        "LaMoon",
        "LaOrangePill",
        "LaWallet",
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
        "ElBull",
        "ElLambo",
        "LaMoon",
        "LaOrangePill",
        "LaWallet",
        "ElTrader",
        "ELDoge",
        "10kPizza",
        "ElMetaverseOrangeYellow",
        "ElSatoshi",
        "ElMartian"
    ];
    const card3 = ["ElGwei",
        "Anonymous",
        "ElMiner",
        "ElSatoshi",
        "ElMartian"];
    const rooms = [card1,card2,card3];

    let gameId = 1;
    for (let i of rooms) {
        for (let card of i) {
            const tx = await kermes.addCallingCard(gameId, card);
            console.log(Object.keys(tx));
        }
        gameId += 1;
    }
}

main().catch(err => {
    console.log(err);
    process.exitCode = 1;
})
