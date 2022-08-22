// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Bean is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address private owner;

    constructor() ERC20("Bean","BEAN") {
        owner = msg.sender;
        _mint(msg.sender, 1000 * 10 ** decimals());

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(uint256 tokenValue) public onlyRole(MINTER_ROLE) {
        _mint(msg.sender, tokenValue * 10 ** decimals());
    }

    function buy() payable public {
        require(msg.value >= 0.01 ether,"you need more than 0.01 MATIC to purchase bean tokens.");
        _mint(msg.sender, 20 * 10 ** decimals());

        (bool status, ) = owner.call{value: msg.value}("");
        require(status,"deposit failed");
    }
}
