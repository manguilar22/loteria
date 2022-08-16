import {ethers, utils} from "ethers";
import React, {useEffect, useState} from "react";
import axios from "axios";

import Loteria from "../abis/Loteria.json";

function Mint() {
    const [wallet, setWallet] = useState(null);
    const [txHash, setTransactionHash] = useState(null);

    useState(() => {
        if (typeof window.ethereum !== "undefined") {
            // Add listener when account switches
            window.ethereum.on("accountsChanged", (accounts) => {
                setWallet(accounts[0]);
            });
        } else {
            alert("please install metamask to continue");
        }
    }, []);

    const handleConnection = async () => {
        const provider = window.ethereum;
        const accounts = await provider.request({method: "eth_requestAccounts"});
        const account = accounts[0];
        console.log(`Connected Address: ${account}`);
        setWallet(account);
    }

    const handleMint = async () => {
        setTransactionHash(null);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const address = process.env.REACT_APP_LOTERIA_TOKEN;

        const loteria = await new ethers.Contract(address, Loteria.abi, signer);

        const counter = await loteria.currentCounter();
        const price = await loteria.currentPrice();

        const tokenURL = `https://ipfs.io/ipfs/${process.env.REACT_APP_BOARD_CID}/${counter}.json`;

        const tx = await loteria.mint(wallet, tokenURL, {value: price});

        console.log(`Loteria Token Address: ${address}, counter=${counter}, price=${price}, url=${tokenURL}`);
        setTransactionHash(tx.hash);
    }

    return (
        <div>
            <h1>Mint Page</h1>

            <button onClick={handleConnection}>Connect to Metamask</button>

            {wallet && <button onClick={handleMint}>Mint</button>}

            {txHash && <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}> Verify your mint.</a>}

        </div>
    );
}

export default Mint;
