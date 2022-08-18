import React, { useState } from "react"
import "./App.css"
import { Button, Heading, Text, Flex, Box } from "@chakra-ui/react"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom"

import Mint from "./components/Mint.js"
import Game from "./components/Game.js"

import { ethers, utils } from "ethers"

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
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home() {
  const [polygonConnect, setPolygonConnect] = useState(false)
  // ERC-20
  const beanTokenAddress = process.env.REACT_APP_BEAN_TOKEN
  const tokenSymbol = "BEAN"
  const beanTokenDecimals = 18
  const tokenImage = "" // TODO: URL for the BEAN icon

  // ERC-721
  const loteriaToken = process.env.REACT_APP_LOTERIA_TOKEN
  const loteriaTokenSymbol = "LOT"
  const loteriaTokenDecimals = 0
  const loteriaTokenImage = "" // TODO: URL for the Loteria token icon.

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
      })

      if (toAdd) {
        alert("Thank you for your interest.")
      } else {
        console.log("opted-out")
      }
    } catch (e) {
      alert("Okay, come back later.")
    }
  }

  const connectToPolygonTestNet = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: utils.hexValue(80001),
            chainName: "Mumbai PoS Testnet",
            rpcUrls: ["https://rpc-mumbai.matic.today"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            nativeCurrency: {
              symbol: "tMATIC",
              name: "tMATIC",
              decimals: 18
            },
            iconUrls: ["https://polygon.technology/_nuxt/img/polygon-logo-white.a8997ce.svg"]
          }
        ]
      })

      setPolygonConnect(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Flex flexDir={"column"} w={"100%"} alignItems={"center"}>
      <Heading>Crypto Loteria</Heading>

      {polygonConnect ? <Text> You are connected to Polygon </Text> : <Text>You are not connected to Polygon and won't be able to play.</Text>}

      <br />
      <Box p={5}></Box>

      {
        <Button w={"250px"} onClick={connectToPolygonTestNet}>
          Connect to Polygon TestNet
        </Button>
      }
      <Box p={5}></Box>

      {polygonConnect ? (
        <Button w={"250px"} onClick={addBeanTokenToWallet}>
          Add Bean Token
        </Button>
      ) : (
        <p />
      )}

      <br />

      <Box p={5}></Box>

      <a href={"https://testnets.opensea.io/collection/loteriatoken"}>Sales on Opensea</a>
    </Flex>
  )
}

export default App
