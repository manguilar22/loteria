import {HardhatUserConfig, task} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

task("accounts", "Prints an account's balance")
    .setAction(async (taskArgs, hre) => {
        const accounts = await hre.ethers.provider.listAccounts();

        for (let i of accounts) {
            const balance = await hre.ethers.provider.getBalance(i);

            console.log(`Account: ${i}, Balance: ${balance}`);
        }
    });

task("game","create loteria game by calling cards.")
    .addOptionalParam("blockchain","the network name of where the game room is set.")
    .addParam("room"," the number for the game room.")
    .addParam("card","the name of the card for setting in the game room.")
    .setAction(async (taskArgs, hre) => {
        const {card,room,blockchain} = taskArgs;
        switch (blockchain) {
            default:
                const gameAddress = "0x2BC4dD115cfd301c0a52e214f3F383b5e24A9be2";
                const game = await hre.ethers.getContractAt("Game",gameAddress);
                const tx = await game.addCallingCard(room,card);
                console.log(`Added the card: ${card} to the Game Room #${room} on the ${blockchain || "ganache"} network.`);
        }
    });

task("bean", "send bean tokens to the following address")
    .addOptionalParam("blockchain", "the network name of where the bean token is deployed too. (i.e. polygontest")
    .addParam("account", "ethereum address that will receive the tokens")
    .addParam("value", "the number of tokens you want to send")
    .setAction(async (taskArgs, hre) => {

        let beanTokenAddress = "";
        let bean = null;
        let value = null;
        let tx = null;

        switch (taskArgs.blockchain) {
            case "polygontest":
                beanTokenAddress = "";
                bean = await hre.ethers.getContractAt("Bean",beanTokenAddress);
                value = hre.ethers.utils.parseEther(taskArgs.value);
                tx = await bean.transfer(taskArgs.account, value);
                console.log(tx);
            default:
                beanTokenAddress = "0xDf41667827FD8CEA52578783C66680A1A067B3A0";
                bean = await hre.ethers.getContractAt("Bean",beanTokenAddress);
                value = hre.ethers.utils.parseEther(taskArgs.value);
                tx = await bean.transfer(taskArgs.account, value);
                console.log(tx);
        }
    });


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.11",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        ganache: {
            chainId: 1337,
            url: "http://127.0.0.1:8545",
            accounts: ["0xc754b06e6f1ce37ed9173449374eac4d2aa3b32f964e7689b224975ca98bcfef"],
            gas: 10000000,
            gasPrice: 2100000000
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

export default config;
