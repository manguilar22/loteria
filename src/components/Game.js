import {ethers, utils} from "ethers";
import React, {useState} from "react";

import axios from "axios";
import Loteria from "../abis/Loteria.json";
import Bean from "../abis/Bean.json";
import GameContract from "../abis/Game.json";
import CardDisplay from "./hoc/CardDisplay";
import LockedDisplay from "./hoc/LockedDisplay";

function Game() {

    const [wallet, setWallet] = useState(null);
    const [beanBalance, setBeanBalance] = useState(0);
    const [loteriaBalance, setLoteriaBalance] = useState(0);
    const [boards, setBoards] = useState([]);
    const [board, setBoard] = useState(null);
    const [callingCards, setCallingCards] = useState([]);
    const [currentPositions, setCurrentPositions] = useState([]);
    const [gameRoomNumber, setGameRoomNumber] = useState(0);
    const [lockedBeansBalance, setLockedBeans] = useState(0);
    const [score, setScore] = useState(0);
    const [depositTX, setDepositTX] = useState(null);
    const [banner, setBanner] = useState(null);

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

    // Events
    const handleConnection = async () => {
        const provider = window.ethereum;
        const accounts = await provider.request({method: "eth_requestAccounts"});
        const account = accounts[0];
        console.log(`Connected Address: ${account}`);
        await setWallet(account);
    }

    const handleTokenChange = async (e) => {
        const value = e.target.value;

        const board = boards[value];

        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        const gameMaster = await new ethers.Contract(process.env.REACT_APP_GAME_MASTER, GameContract.abi, provider);
        const bean = await new ethers.Contract(process.env.REACT_APP_BEAN_TOKEN,Bean.abi,provider);
        const currentLockedAmount = await gameMaster.getPlayersBalance(gameRoomNumber, wallet, board.tokenId);

        const currentBeanBalance = await bean.balanceOf(wallet);
        const currentBeanBalanceF = parseInt(ethers.utils.formatEther(currentBeanBalance.toString()));
        setBeanBalance(currentBeanBalanceF);
        setBanner(null);
        setCurrentPositions(null);

        setBoard(board);
        setScore(parseInt(ethers.utils.formatEther(currentLockedAmount.toString())));
    }

    const handleGameRoomChange = async (e) => {
        let gameRoomNumber = e.target.value;

        const ethersProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const bean = await new ethers.Contract(process.env.REACT_APP_BEAN_TOKEN,Bean.abi,ethersProvider);
        const gameMaster = await new ethers.Contract(process.env.REACT_APP_GAME_MASTER, GameContract.abi, ethersProvider);

        const callingCards = await gameMaster.getGameCards(gameRoomNumber);
        const lockedBeans = await gameMaster.getGameRoomBalance(gameRoomNumber);
        const lockedBeansFormat = ethers.utils.formatEther(lockedBeans);

        const currentBeanBalance = await bean.balanceOf(wallet);
        const value = parseInt(ethers.utils.formatEther(currentBeanBalance.toString()));
        setBeanBalance(value);

        setGameRoomNumber(gameRoomNumber);
        setCallingCards(callingCards);
        setLockedBeans(parseInt(lockedBeansFormat));
        setDepositTX(null);
        setBanner(null);
        setCurrentPositions(null);
    }

    // Web3 Methods
    const getLoteriaPositions = async () => {
        // Get token balances
        const ethersProvider = await new ethers.providers.Web3Provider(window.ethereum);

        const loteria = await new ethers.Contract(process.env.REACT_APP_LOTERIA_TOKEN, Loteria.abi, ethersProvider);
        const bean = await new ethers.Contract(process.env.REACT_APP_BEAN_TOKEN, Bean.abi, ethersProvider);

        const loteriaBalance = await loteria.balanceOf(wallet);
        const beanBalance = await bean.balanceOf(wallet);

        setLoteriaBalance(loteriaBalance.toNumber());
        setBeanBalance(parseInt(ethers.utils.formatUnits(beanBalance.toString(), "ether")));

        // find nft boards
        const currentCounter = await loteria.currentCounter();
        const playingBoards = [];

        for (let tokenId = 0; tokenId <= currentCounter.toNumber() - 1; tokenId++) {
            const owner = await loteria.ownerOf(tokenId);

            if (owner === utils.getAddress(wallet)) {
                const tokenURI = await loteria.tokenURI(tokenId);

                await axios.get(tokenURI)
                    .then(response => {
                        const {image, positions} = response.data;
                        playingBoards.push({image,positions,tokenURI,tokenId});
                    })
                    .catch(err => console.log(`Could not fetch IPFS, err=${err}`));
            }
        }
        setBoards(playingBoards);
        setBoard(playingBoards[0]);
    };

    const lockBeanTokens = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bean = await new ethers.Contract(process.env.REACT_APP_BEAN_TOKEN, Bean.abi, signer);
        const gameMaster = await new ethers.Contract(process.env.REACT_APP_GAME_MASTER, GameContract.abi, signer);

        let lockAmount = 0;
        let styledPositions = [];
        const {tokenId, positions} = board;
        positions.forEach(e => {
            if (callingCards.includes(e.card)) {
                lockAmount += 1;
                styledPositions.push({card: e.card, style: true});
            } else {
                console.log(`${e.card} has not been called`);
                styledPositions.push({card: e.card, style: false});
            }
        });

        const currentLockedAmount = await gameMaster.getPlayersBalance(gameRoomNumber, wallet, tokenId);
        const currentLockedAmountFormat = parseInt(ethers.utils.formatEther(currentLockedAmount.toString()));

        console.log(`Positions: (${lockAmount}/${positions.length} - lockAmount=${lockAmount} currentLockedDeposit=${currentLockedAmountFormat}`);

        if (lockAmount === currentLockedAmountFormat) {
            const banner = "You can not deposit because you have no new positions.";
            setBanner(banner);
        } else if (beanBalance === 0) {
            const banner = "You need beans.";
            setBanner(banner);
        } else if (currentLockedAmountFormat >= beanBalance) {
            console.log(`Current bean balance: ${beanBalance}, lockAmount=${lockAmount} currentLockedDeposit=${currentLockedAmountFormat}`);

            const depositValue = lockAmount - currentLockedAmountFormat;
            const difference = depositValue - beanBalance;
            console.log(`Desposit Value: ${depositValue}`);
            console.log(`Difference: ${difference}`);

            const approve = await bean.approve(gameMaster.address, ethers.utils.parseEther(difference.toString()));

            approve.wait(2);

            const deposit = await gameMaster.lockTokens(gameRoomNumber,tokenId,ethers.utils.parseEther(difference.toString()));

            console.log(deposit.blockNumber);

            setDepositTX(deposit);
        } else {
            const depositValue = lockAmount - currentLockedAmountFormat;
            console.log(`you can deposit - ${depositValue}`);

            const approve = await bean.approve(gameMaster.address,ethers.utils.parseEther(depositValue.toString()));

            approve.wait(2);

            const deposit = await gameMaster.lockTokens(gameRoomNumber,tokenId,ethers.utils.parseEther(depositValue.toString()));

            setDepositTX(deposit);
        }

        setCurrentPositions(styledPositions);
        setScore(lockAmount);
    }

    const awardLoteriaWinner = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        const dappAccount = await new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);

        const gameMaster = await new ethers.Contract(process.env.REACT_APP_GAME_MASTER, GameContract.abi, dappAccount);

        const value = await gameMaster.getGameRoomBalance(gameRoomNumber);
        console.log(value);
        console.log(wallet);
        console.log(gameRoomNumber);

        const award = await gameMaster.awardWinner(gameRoomNumber, wallet);
        console.log(`Congratulations: ${award.hash}`);

        setCurrentPositions([]);
    }

    return (<div>

            <h2>Play Game</h2>

            <button onClick={handleConnection}>Connect to Metamask</button>

            {wallet && <button onClick={getLoteriaPositions}>Play Game</button>}

            {loteriaBalance === 0 ? <p/> : <p>Loteria Balance: {loteriaBalance}</p>}

            {beanBalance === 0 ? <p/> : <p>Bean Balance: {beanBalance}</p>}

            {loteriaBalance === 0 ? <p/> : <select onChange={handleTokenChange}>

                {boards.map((e, idx) => <option key={idx} value={idx}>Token {idx + 1}</option>)}

            </select>}

            {board && <select onChange={handleGameRoomChange}>{new Array(4).fill(0).map((_, idx) => <option key={idx}
                                                                                                            value={idx + 1}>Game
                Room #{idx + 1}</option>)}</select>}

            {board && <p>Locked beans in this game room: {lockedBeansBalance} BEANS</p>}

            <br/>

            {callingCards.length ?
                <button style={{"backgroundColor": "yellow"}} onClick={lockBeanTokens}>Lock</button> : <p/>}

            {depositTX && <a href={`https://mumbai.polygonscan.com/tx/${depositTX.hash}`}>Your deposit was mined on Polygon in block {depositTX.blockNumber}.</a>}

            {board && <hr/>}

            {board ? <img src={board.image} width={"250px"} height={"300px"}/> : <p/>}

            {banner && !(score===16) ? <h3 style={{"color":"red"}}>{banner}</h3> : <p/>}

            {board && !currentPositions ? <CardDisplay positions={board.positions}/> : <p/>}

            {currentPositions && <LockedDisplay playingPositions={currentPositions}/>}

            {score === 16 ?
                <button style={{"backgroundColor": "green"}} onClick={awardLoteriaWinner}>Claim Prize</button> : <p/>}

            {callingCards.length === 0 ? <p/> : <h3>Cards that have been called</h3>}
            {callingCards.length === 0 ? <p/> : <ol>{callingCards.map((e, idx) => <li key={idx}>{e}</li>)}</ol>}
        </div>
    );
}

export default Game;
