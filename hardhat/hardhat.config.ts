import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

task("accounts", "Prints an account's balance")
    .setAction(async (taskArgs,hre) => {
      const accounts = await hre.ethers.provider.listAccounts();

      for (let i of accounts) {
        const balance = await hre.ethers.provider.getBalance(i);

        console.log(`Account: ${i}, Balance: ${balance}`);
      }
    });

task("bean", "send bean tokens to the following address")
    .addParam("account", "ethereum address that will receive the tokens")
    .addParam("value", "the number of tokens you want to send")
    .setAction(async (taskArgs, hre) => {
      const beanTokenAddress = "0xfc1F64472a53fB6504A327Bba9bE3DA2A4ca4198"; //taskArgs.token;
      const bean = await hre.ethers.getContractAt("Bean",beanTokenAddress);

      const accounts = await hre.ethers.provider.listAccounts();
      const sender = accounts[0];
      const senderBalance = await bean.balanceOf(sender);

      await bean.mint(taskArgs.value);

      console.log(`sender account=${sender}, balance=${senderBalance}`);

      const value = hre.ethers.utils.parseEther(taskArgs.value);
      const tx = await bean.transfer(taskArgs.account, value);

      console.log(tx);
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
      accounts: ["0x956f04b3236686f558ff214bead359bcfc73a3d7288b5b1f03c440de4a505bee"],
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
