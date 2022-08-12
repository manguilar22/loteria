import {ethers} from "hardhat";


async function main() {
    /**
     * Method calls
     'payee(uint256)': [Function (anonymous)],
     'releasable(address)': [Function (anonymous)],
     'releasable(address,address)': [Function (anonymous)],
     'release(address)': [Function (anonymous)],
     'release(address,address)': [Function (anonymous)],
     'released(address,address)': [Function (anonymous)],
     'released(address)': [Function (anonymous)],
     'shares(address)': [Function (anonymous)],
     'totalReleased(address)': [Function (anonymous)],
     'totalReleased()': [Function (anonymous)],
     'totalShares()': [Function (anonymous)],
     payee: [Function (anonymous)],
     shares: [Function (anonymous)],
     totalShares: [Function (anonymous)]
     */

    const address = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";
    const wallet = await ethers.getContractAt("Community", address);

    const totalShares = await wallet.totalShares();
    const payee = await wallet.payee(0);

    console.log(`Community Wallet: payee=${payee}, shares=${totalShares}`);

    let payeeBalance = await ethers.provider.getBalance(payee);

    console.log(`Payee Balance: ${payeeBalance} wei`);

    await wallet["release(address)"](payee)

    payeeBalance = await ethers.provider.getBalance(payee);

    console.log(`Payee Balance after releasing funds: ${payeeBalance} wei`);

}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})
