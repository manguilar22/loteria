import {ethers} from "hardhat";


async function main() {
    const nftAddress = "0xCFC5895b5e83ce44Aa599E60B59f0D8Cdb48A1c5";
    const communityWallet = "0x7bff188A4d4FEAa4978149007581310A19568552";

    const loteria = await ethers.getContractAt("Loteria",nftAddress);

    const price = await loteria.currentPrice();

    console.log(`Loteria Token Price: ${price}`);

    const accounts = await ethers.provider.listAccounts();
    const admin = accounts[0];

    for (let i = 0; i <= 5; i++) {
        const tx = await loteria.mint(admin, i.toString(),{value:price});
        const communityWalletBalance = await ethers.provider.getBalance(communityWallet);
        console.log(`tx object: ${Object.keys(tx)}`);

        const tokenId = await loteria.currentCounter();

        console.log(`Single Mint: index=${i}, communityWalletBalance=${communityWalletBalance},tokenId=${tokenId.toNumber()}`);
    }
    const adminBalance = await ethers.provider.getBalance(admin);

    console.log(`Admin Balance after mint: ${adminBalance} wei`);
}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
});
