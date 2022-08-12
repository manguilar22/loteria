import React from 'react';
import './App.css';

import {
    Link,
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Mint from "./components/Mint.js";
import Game from "./components/Game.js";

function App() {

    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/mint">Mint</Link>
                    </li>
                    <li>
                        <Link to="/game">Game</Link>
                    </li>
                </ul>
            </div>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/mint" element={<Mint/>}/>
                <Route path="/game" element={<Game/>}/>
            </Routes>

        </BrowserRouter>
    );
}


function Home() {
    // ERC-20
    const beanTokenAddress = process.env.REACT_APP_BEAN_TOKEN;
    const tokenSymbol = "BEAN";
    const beanTokenDecimals = 18;
    const tokenImage=""; // TODO: URL for the BEAN icon

    // ERC-721
    const loteriaToken = process.env.REACT_APP_LOTERIA_TOKEN;
    const loteriaTokenSymbol = "LOT";
    const loteriaTokenDecimals = 0;
    const loteriaTokenImage = ""; // TODO: URL for the Loteria token icon.

    const addBeanTokenToWallet = async () => {

        try {
            const toAdd = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: beanTokenAddress,
                        symbol: tokenSymbol,
                        decimals: beanTokenDecimals,
                        image: tokenImage
                    }
                }
            });

            if (toAdd) {
                alert("Thank you for your interest.");
            } else {
                console.log("opted-out");
            }
        } catch (e) {
            alert("please install metamask.")
        }



    }

    return (
        <div>
            <h1>Crypto Loteria</h1>

            <button onClick={addBeanTokenToWallet}>Add Bean Token</button>

            <br/>

            <a href={"https://testnets.opensea.io/collection/loteriatoken"}>Sales on Opensea</a>
        </div>
    )
}

export default App;
