import { ethers, utils } from "ethers"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import Loteria from "../abis/Loteria.json"
import Bean from "../abis/Bean.json";

function Mint() {
  const [wallet, setWallet] = useState(null)
  const [txHash, setTransactionHash] = useState(null)
  const [beanTXhash, setBeanTXhash] = useState(null)

  useState(() => {
    if (typeof window.ethereum !== "undefined") {
      // Add listener when account switches
      window.ethereum.on("accountsChanged", accounts => {
        setWallet(accounts[0])
      })
    } else {
      alert("please install metamask to continue")
    }
  }, [])

  const handleConnection = async () => {
    const provider = window.ethereum
    const accounts = await provider.request({ method: "eth_requestAccounts" })
    const account = accounts[0]
    console.log(`Connected Address: ${account}`)
    setWallet(account)
  }

  const handleMint = async () => {
    setTransactionHash(null)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const address = process.env.REACT_APP_LOTERIA_TOKEN

    const loteria = await new ethers.Contract(address, Loteria.abi, signer)

    const counter = await loteria.currentCounter()
    const price = await loteria.currentPrice()

    const tokenURL = `https://ipfs.io/ipfs/${process.env.REACT_APP_BOARD_CID}/${counter}.json`

    const tx = await loteria.mint(wallet, tokenURL, { value: price })

    console.log(`Loteria Token Address: ${address}, counter=${counter}, price=${price}, url=${tokenURL}`)
    setTransactionHash(tx.hash)
  }

  const handleTokenPurchase = async () => {
    setTransactionHash(null)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const address = process.env.REACT_APP_BEAN_TOKEN

    const bean = await new ethers.Contract(address, Bean.abi, signer);
    const value = ethers.utils.parseEther("0.01");

    const tx = await bean.buy({value});

    setBeanTXhash(tx.hash);
  };

  return (
    <Flex flexDir={"column"} h={"100%"} alignItems={"center"} justifyContent={"center"}>
      <Heading>Mint Page</Heading>
      <Box p={5}></Box>
      <Button w={"200px"} onClick={handleConnection}>
        Connect to Metamask
      </Button>
      <Box p={5}></Box>

      {wallet && (
        <Button w={"200px"} onClick={handleMint}>
          Mint
        </Button>
      )}
      <Box p={5}></Box>
      {txHash && <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}> Verify your mint.</a>}

      <Box p={5}></Box>

      {wallet && (
          <Button w={"200px"} onClick={handleTokenPurchase}>
            Buy Bean Tokens
          </Button>
      )}
      <Box p={5}></Box>
      {beanTXhash && <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}> Verify your purchase.</a>}
    </Flex>
  )
}

export default Mint
