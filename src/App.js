import React, { useState } from "react"
import "./App.css"
import { Button, Text, Flex, Box } from "@chakra-ui/react"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import { motion } from "framer-motion"
import Mint from "./components/Mint.js"
import Game from "./components/Game.js"

import { ethers, utils } from "ethers"

const svgVariant = {
  hidden: { scale: 10 },
  visible: {
    rotate: 0,
    scale: 1,
    transition: { duration: 5 }
  }
}

const transition = { duration: 4, ease: "easeInOut" }

const animateIn = {
  pathLength: 1,
  pathOffset: 0
}
const animateOut = {
  pathLength: 1,
  pathOffset: 1
}

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
  const [visible, setVisible] = useState(true)

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
    <Flex bg={"black"} h="100vh" flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} overflow={"hidden"} pb="170px">
      <Flex w={"100%"} h={"100%"} color={"white"} justifyContent={"center"} alignItems="center">
        <Flex w={"500px"} alignItems={""}>
          <motion.svg
            onTap={() => {
              setVisible(val => !val)
            }}
            variants={svgVariant}
            fill="none"
            width="100%"
            height="100%"
            stroke="currentColor"
            initial="hidden"
            animate="visible"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 668.78 358.15"
          >
            <html>
              <object type="image/svg+xml" data="some.svg"></object>
            </html>

            <defs>{/* <style>.cls-1{fill:#fedf1e;}.cls-2{fill:#ee3962;}.cls-3{fill:#2ac3ea;}.cls-4{fill:#993493;}</style> */}</defs>
            <motion.path stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" d="M295.63,338.49a5.85,5.85,0,0,1-.46,2.29,6.07,6.07,0,0,1-1.36,2,6.34,6.34,0,0,1-2.05,1.33,6.31,6.31,0,0,1-4.68,0,6.34,6.34,0,0,1-2.05-1.33,5.87,5.87,0,0,1-1.81-4.3v-73a6.07,6.07,0,0,1,3.86-5.64,6.31,6.31,0,0,1,4.68,0,6.12,6.12,0,0,1,3.41,3.34,5.87,5.87,0,0,1,.46,2.3v6.08H308v-6.08a18,18,0,0,0-1.36-6.87,18.31,18.31,0,0,0-4.09-6,18.64,18.64,0,0,0-6.17-4,19.05,19.05,0,0,0-7-1.34h0a19,19,0,0,0-7,1.34,18.5,18.5,0,0,0-6.16,4,17.89,17.89,0,0,0-5.45,12.91l0,73a18,18,0,0,0,5.47,12.9,18.5,18.5,0,0,0,6.16,4,19,19,0,0,0,14,0,18.64,18.64,0,0,0,6.17-4,18.21,18.21,0,0,0,4.09-6,17.93,17.93,0,0,0,1.36-6.86V332.4H295.63Z" transform="translate(-204.8 -219.01)" />
            <motion.path stroke="#ee3962" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" d="M246,338.49a42,42,0,0,0,3.19,16,42.56,42.56,0,0,0,9.53,14.09A43.56,43.56,0,0,0,273.07,378a44.51,44.51,0,0,0,32.69,0,43.49,43.49,0,0,0,14.39-9.36,42.75,42.75,0,0,0,9.54-14.09,42,42,0,0,0,3.18-16V332.4H320.45v6.09A30,30,0,0,1,311.37,360a30.84,30.84,0,0,1-10.27,6.67,31.57,31.57,0,0,1-23.36,0A30.7,30.7,0,0,1,267.48,360a30,30,0,0,1-9.1-21.51V308.07H246Z" transform="translate(-204.8 -219.01)" />
            <motion.path stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" d="M332.87,271.55v-6.08a42,42,0,0,0-3.18-16,42.5,42.5,0,0,0-9.54-14.08A43.37,43.37,0,0,0,305.76,226a44.37,44.37,0,0,0-32.69,0,43.43,43.43,0,0,0-14.38,9.37A42.11,42.11,0,0,0,246,265.47v30.42h12.41V265.47a30,30,0,0,1,9.1-21.51,31.07,31.07,0,0,1,10.26-6.69,31.84,31.84,0,0,1,23.36,0A31.22,31.22,0,0,1,311.37,244a30,30,0,0,1,9.08,21.51v6.08Z" transform="translate(-204.8 -219.01)" />
            <motion.path stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" d="M394.43,309.78a18.36,18.36,0,0,0,7-1.37,18.62,18.62,0,0,0,11.63-17.25V267.88a18.58,18.58,0,0,0-18.62-18.62H375.81v60.52Zm-6.21-48.11h6.21a6.23,6.23,0,0,1,4.38,1.81,6.27,6.27,0,0,1,1.82,4.4v23.28a6.23,6.23,0,0,1-1.82,4.38,6.11,6.11,0,0,1-2,1.37,6.36,6.36,0,0,1-2.34.45h-6.21Z" transform="translate(-204.8 -219.01)" />
            <motion.polygon stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" points="189.29 103.18 171 103.18 171 163.7 183.42 163.7 183.42 124.44 192.15 163.7 204.94 163.7 189.29 103.18" />
            <motion.rect stroke="#ee3962" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" x="146.18" y="30.25" width="12.41" height="133.45" />
            <motion.path stroke="#993493" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-4" d="M434.69,307.5a43.56,43.56,0,0,0,3.18-16.34V267.88a43.61,43.61,0,0,0-3.18-16.35,43.59,43.59,0,0,0-23.92-23.92,43.57,43.57,0,0,0-16.34-3.19H351v12.42h43.46a31.17,31.17,0,0,1,11.68,2.27,31,31,0,0,1,19.34,28.77v23.28a31.21,31.21,0,0,1-2.27,11.68,30.65,30.65,0,0,1-6,9.4c-.26.28-.53.58-.81.86a31,31,0,0,1-10.07,6.73l16.25,62.87h12.8L420.6,325.82a45.53,45.53,0,0,0,4.55-3.94A43.38,43.38,0,0,0,434.69,307.5Z" transform="translate(-204.8 -219.01)" />
            <motion.polygon stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" points="321.3 0 289.93 102.15 289.93 163.7 302.35 163.7 302.35 104.24 334.39 0 321.3 0" />
            <motion.polygon stroke="#ee3962" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" points="246.15 0 233.07 0 265.11 104.23 265.11 163.7 277.52 163.7 277.52 102.15 246.15 0" />
            <motion.polygon stroke="#993493" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-4" points="308.21 0 295.13 0 283.72 43.53 272.32 0 259.24 0 283.72 79.67 308.21 0" />
            <motion.path stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" d="M605.05,306.94a18.73,18.73,0,0,0,6.17-4.09,18.53,18.53,0,0,0,4.09-6.16,18.87,18.87,0,0,0,1.36-7V266.4a18.92,18.92,0,0,0-1.36-7,18.61,18.61,0,0,0-17.26-11.61H579.44v60.53h18.61A18.61,18.61,0,0,0,605.05,306.94Zm-7-46.74a6.24,6.24,0,0,1,2.34.45,6.17,6.17,0,0,1,2.05,1.36,6.06,6.06,0,0,1,1.36,2.06,6,6,0,0,1,.46,2.33v23.29a6.09,6.09,0,0,1-.46,2.33,6.22,6.22,0,0,1-1.36,2.05,6,6,0,0,1-2.05,1.36,6.25,6.25,0,0,1-2.34.46h-6.21V260.2Z" transform="translate(-204.8 -219.01)" />
            <motion.rect stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" x="349.81" y="28.78" width="12.41" height="133.45" />
            <motion.path stroke="#ee3962" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" d="M638.32,250.06A43.45,43.45,0,0,0,598.05,223H554.61v12.41h43.44a30.91,30.91,0,0,1,11.68,2.28,31.17,31.17,0,0,1,17.08,17.09,31.08,31.08,0,0,1,2.27,11.67v23.29a31.12,31.12,0,0,1-2.27,11.67,31,31,0,0,1-28.76,19.35H579.44v60.52h12.4v-48.1h6.21a43.41,43.41,0,0,0,43.45-43.44V266.4A43.56,43.56,0,0,0,638.32,250.06Z" transform="translate(-204.8 -219.01)" />
            <motion.polygon stroke="#993493" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-4" points="451.14 42.66 475.97 42.66 475.97 163.7 488.38 163.7 488.38 30.25 451.14 30.25 451.14 42.66" />
            <motion.polygon stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" points="500.79 163.7 513.21 163.7 513.21 42.66 538.03 42.66 538.03 30.25 500.79 30.25 500.79 163.7" />
            <motion.rect stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" x="451.14" y="5.42" width="86.89" height="12.42" />
            <motion.path stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" d="M769.25,262.46a31.42,31.42,0,0,1,2.27-11.69,31,31,0,0,1,28.76-19.34h0a31,31,0,0,1,31,31v31h12.41v-31A43.41,43.41,0,0,0,800.28,219h0a43.38,43.38,0,0,0-43.44,43.45v31h12.41Z" transform="translate(-204.8 -219.01)" />
            <motion.path stroke="#ee3962" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" d="M831.32,336.94a30.88,30.88,0,0,1-9.09,21.94,31,31,0,0,1-22,9.09h0a31,31,0,0,1-11.68-2.28,30.67,30.67,0,0,1-10.26-6.81,31,31,0,0,1-6.82-10.26,31.37,31.37,0,0,1-2.27-11.68v-31H756.84v31a43.38,43.38,0,0,0,43.44,43.44h0a43.4,43.4,0,0,0,43.45-43.44v-31H831.32Z" transform="translate(-204.8 -219.01)" />
            <motion.path stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" d="M813.45,249.29a18.63,18.63,0,0,0-6.16-4.09,18.88,18.88,0,0,0-7-1.36h0a18.79,18.79,0,0,0-7,1.36A18.68,18.68,0,0,0,783,255.45a18.66,18.66,0,0,0-1.37,7v74.48a18.6,18.6,0,0,0,18.62,18.62,18.61,18.61,0,0,0,17.26-11.62,18.61,18.61,0,0,0,1.37-7V262.46a18.61,18.61,0,0,0-5.46-13.17Zm-7,87.65a6.05,6.05,0,0,1-1.81,4.39,6.38,6.38,0,0,1-2,1.36,6,6,0,0,1-2.34.46,6.1,6.1,0,0,1-2.34-.46,6.38,6.38,0,0,1-2.05-1.36,6.23,6.23,0,0,1-1.82-4.39V262.46a6.22,6.22,0,0,1,.46-2.34,6.31,6.31,0,0,1,1.36-2.06,6.22,6.22,0,0,1,2.05-1.36,6.28,6.28,0,0,1,2.34-.45,6.16,6.16,0,0,1,4.39,1.81,6.34,6.34,0,0,1,1.37,2.06,6.2,6.2,0,0,1,.44,2.34Z" transform="translate(-204.8 -219.01)" />
            <motion.polygon stroke="#993493" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-4" points="12.42 198.32 0 198.32 0 356.6 86.89 356.6 86.89 344.19 12.42 344.19 12.42 198.32" />
            <motion.polygon stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" points="37.24 319.36 37.24 198.32 24.84 198.32 24.84 331.77 86.89 331.77 86.89 319.36 86.89 319.36 37.24 319.36" />
            <motion.path stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" d="M315.09,459.23a31.23,31.23,0,0,1,2.28-11.69,31.2,31.2,0,0,1,17.08-17.08,31.27,31.27,0,0,1,11.67-2.26h0a31.37,31.37,0,0,1,11.69,2.26,31,31,0,0,1,19.35,28.77v31h12.41v-31a43.41,43.41,0,0,0-43.45-43.45h0a43.26,43.26,0,0,0-30.72,12.74,43.26,43.26,0,0,0-12.72,30.71v31h12.41Z" transform="translate(-204.8 -219.01)" />
            <motion.path stroke="#ee3962" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" d="M377.16,533.71a30.93,30.93,0,0,1-9.09,21.95,31,31,0,0,1-21.95,9.09h0a31,31,0,0,1-31-31v-31H302.68v31a43.38,43.38,0,0,0,43.44,43.44h0a43.4,43.4,0,0,0,43.45-43.44v-31H377.16Z" transform="translate(-204.8 -219.01)" />
            <motion.path stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" d="M359.29,446.06a18.63,18.63,0,0,0-6.16-4.09,18.84,18.84,0,0,0-7-1.36h0a18.78,18.78,0,0,0-7,1.36,18.71,18.71,0,0,0-10.26,10.26,18.61,18.61,0,0,0-1.37,7v74.48A18.6,18.6,0,0,0,339.13,551a18.62,18.62,0,0,0,24.25-10.26,18.38,18.38,0,0,0,1.37-7V459.23a18.5,18.5,0,0,0-1.37-7A18.79,18.79,0,0,0,359.29,446.06Zm-7,87.65a6.21,6.21,0,0,1-.45,2.34,6.18,6.18,0,0,1-3.42,3.41,6,6,0,0,1-2.34.46,6.14,6.14,0,0,1-2.34-.46,6.2,6.2,0,0,1-3.41-3.41,6.22,6.22,0,0,1-.46-2.34V459.23a6.25,6.25,0,0,1,.46-2.34,6.43,6.43,0,0,1,1.36-2.05,6.25,6.25,0,0,1,2-1.37,6.32,6.32,0,0,1,2.34-.45,6.16,6.16,0,0,1,4.4,1.82,6.16,6.16,0,0,1,1.81,4.39Z" transform="translate(-204.8 -219.01)" />
            <motion.polygon stroke="#993493" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-4" points="198.34 235.56 223.17 235.56 223.17 356.6 235.58 356.6 235.58 223.15 198.34 223.15 198.34 235.56" />
            <motion.polygon stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" points="247.99 356.6 260.41 356.6 260.41 235.56 285.24 235.56 285.24 223.15 247.99 223.15 247.99 356.6" />
            <motion.rect stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" x="198.34" y="198.32" width="86.89" height="12.42" />
            <motion.polygon stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" points="343.35 294.49 380.6 294.49 380.6 282.08 380.6 282.08 330.94 282.08 330.94 330.18 393.01 330.18 393.01 317.76 343.35 317.76 343.35 294.49" />
            <motion.polygon stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" points="330.94 269.65 380.6 269.66 380.6 257.26 343.35 257.25 343.35 233.97 393.01 233.97 393.01 221.56 330.94 221.56 330.94 269.65" />
            <motion.polygon stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" points="306.12 196.72 306.12 355 393.01 355 393.01 342.59 318.52 342.59 318.52 209.14 393.01 209.14 393.01 196.74 306.12 196.72" />
            <motion.path stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" d="M662.63,501.08a18.54,18.54,0,0,0,13.17-5.46,18.39,18.39,0,0,0,4.09-6.15,18.91,18.91,0,0,0,1.36-7V459.18a18.88,18.88,0,0,0-1.36-7A18.63,18.63,0,0,0,675.8,446a18.88,18.88,0,0,0-6.17-4.09,18.6,18.6,0,0,0-7-1.36H644v60.52ZM656.42,453h6.21a6.23,6.23,0,0,1,4.39,1.82,6.27,6.27,0,0,1,1.82,4.39v23.29a6.18,6.18,0,0,1-1.82,4.37,6.18,6.18,0,0,1-4.39,1.83h-6.21Z" transform="translate(-204.8 -219.01)" />
            <motion.polygon stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" points="457.5 294.49 439.21 294.49 439.21 355 451.62 355 451.62 315.75 460.35 355 473.15 355 457.5 294.49" />
            <motion.rect stroke="#ee3962" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" x="414.38" y="221.55" width="12.41" height="133.45" />
            <motion.path stroke="#993493" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-4" d="M702.9,498.8a43.47,43.47,0,0,0,3.18-16.33V459.18a43.44,43.44,0,0,0-43.45-43.45H619.18v12.41h43.45a31,31,0,0,1,11.68,2.28,31.17,31.17,0,0,1,17.08,17.09,31.08,31.08,0,0,1,2.27,11.67v23.29a30.87,30.87,0,0,1-8.27,21.08c-.27.28-.54.57-.82.85a30.85,30.85,0,0,1-10.06,6.74L690.76,574h12.8l-14.75-56.88a45.46,45.46,0,0,0,4.55-4A43.48,43.48,0,0,0,702.9,498.8Z" transform="translate(-204.8 -219.01)" />
            <motion.rect stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" x="515.71" y="198.26" width="12.41" height="158.28" />
            <motion.rect stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" x="540.54" y="198.26" width="12.41" height="158.28" />
            <motion.polygon stroke="#2ac3ea" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-3" points="644.16 199.86 631.61 199.86 656.22 358.13 668.78 358.13 644.16 199.86" />
            <motion.polygon stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-1" points="596.27 199.86 571.65 358.13 584.2 358.13 608.82 199.86 596.27 199.86" />
            <motion.polygon stroke="#ee3962" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-2" points="638.11 322.44 602.31 322.44 596.75 358.13 609.32 358.13 612.94 334.85 627.48 334.85 631.12 358.13 643.67 358.13 638.11 322.44" />
            <motion.path stroke="#fedf1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} initial={{ pathLength: 0, pathOffset: 0 }} animate={visible ? animateIn : animateOut} transition={transition} className="cls-4" d="M809.05,529H841L825,426.48Zm16-21.78,1.46,9.37h-2.92Z" transform="translate(-204.8 -219.01)" />
          </motion.svg>
        </Flex>
      </Flex>

      {polygonConnect ? <Text color="white"> You are connected to Polygon </Text> : <Text color="white">You are not connected to Polygon and will not be able to play.</Text>}

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

      <Button>
        <a target={"_blank"} href={"https://testnets.opensea.io/collection/loteriatoken"}>
          Sales on Opensea
        </a>
      </Button>
    </Flex>
  )
}

export default App
