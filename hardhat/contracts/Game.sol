// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Game is PaymentSplitter, AccessControl {
    bytes32 public constant GAME_MASTER = keccak256("GAME_MASTER");

    struct Position {
        uint256 gameRoomNumber;
        address account;
        uint256 balance;
    }

    address[] private accounts = [0xB4ccF44f3ED31c9A35A7833e3E84eB0215a248D9];
    uint256[] private projectShares = [100];

    IERC20 private token;
    Position[] private positions;
    uint256[] private gameRooms;
    mapping(uint256 => uint256) private lockedTokens;
    mapping(uint256 => bool) private gameStatus;        // game open = true / game close = false
    mapping(uint256 => string[]) private games;

    constructor(IERC20 tokenAddress) PaymentSplitter(accounts,projectShares) {
        token = tokenAddress;
        _grantRole(GAME_MASTER, msg.sender);
    }

    function getGameRooms() public view returns(uint256[] memory) {
        return gameRooms;
    }

    function getGameStatus(uint256 gameRoomNumber) public view returns (bool) {
        return gameStatus[gameRoomNumber];
    }

    function getGameCards(uint256 gameRoomNumber) public view returns (string[] memory) {
        return games[gameRoomNumber];
    }

    function addCallingCardSet(uint256 gameRoomNumber, string[] memory cards) public returns (bool) {
        if (!gameStatus[gameRoomNumber])
        {
            gameStatus[gameRoomNumber] = true;
            gameRooms.push(gameRoomNumber);
        }


        for (uint256 i = 0; i < cards.length; ++i)
        {
            games[gameRoomNumber].push(cards[i]);
        }
        return true;
    }

    function addCallingCard(uint256 gameRoomNumber, string memory cardName) public returns (bool) {
        if (!gameStatus[gameRoomNumber])
        {
            gameStatus[gameRoomNumber] = true;
            gameRooms.push(gameRoomNumber);
        }

        games[gameRoomNumber].push(cardName);
        return true;
    }

    function awardWinner(uint256 gameRoomNumber, address account) public {
        require(hasRole(GAME_MASTER, msg.sender), "You are not a game master and can not award the game winner.");

        uint256 pot = lockedTokens[gameRoomNumber];
        token.transfer(account, pot);

        gameStatus[gameRoomNumber] = false;
    }

    function getPlayers() public view returns (Position[] memory) {
        return positions;
    }

    function getPlayersBalance(uint256 gameRoomNumber, address account) public view returns (uint256) {
        for (uint256 i = 0; i < positions.length; ++i)
        {
            Position memory position = positions[i];

            if (position.gameRoomNumber == gameRoomNumber && position.account == account)
            {
                uint256 balance = position.balance;
                return balance;
            }
        }
        return 0;
    }

    function getGameRoomBalance(uint256 gameRoomNumber) public view returns (uint256) {
        uint256 lockedBalance = lockedTokens[gameRoomNumber];
        return lockedBalance;
    }

    function lockTokens(uint256 gameRoomNumber,uint256 depositValue) public returns(bool) {
        //require(gameStatus[gameRoomNumber],"this game room does not exist.");
        require(token.balanceOf(msg.sender) >= depositValue,"you do not have enough beans to cover this cost.");

        for (uint256 i = 0; i < positions.length; ++i)
        {
            address account = positions[i].account;
            uint256 balance = positions[i].balance;
            uint256 lockedBeans = lockedTokens[gameRoomNumber];

            if (account == msg.sender && balance > 0)
            {
                uint256 newBalance = balance + depositValue;
                uint256 newLockedBalance = lockedBeans + depositValue;

                positions[i].balance = newBalance;
                lockedTokens[gameRoomNumber] += newLockedBalance;

                token.transferFrom(msg.sender,address(this),depositValue);

                return false;
            }
        }

        Position memory position = Position(gameRoomNumber,msg.sender,depositValue);
        lockedTokens[gameRoomNumber] += depositValue;
        positions.push(position);

        token.transferFrom(msg.sender,address(this),depositValue);

        return true;
    }

}
