// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Bean is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("Bean","BEAN") {
        //_mint(msg.sender, 10000 * 10 ** decimals());

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        // TODO: Check if for who on the team wants to mint.
        _grantRole(MINTER_ROLE,0x5E988F7D828d8478F71104c9EDe275A5F9f8344D);
        _grantRole(MINTER_ROLE,0x5eb47bA77B28A10862cAb6fb6865aDC246AC2A58);
    }

    function mint(uint256 tokenValue) public onlyRole(MINTER_ROLE) {
        _mint(msg.sender, tokenValue * 10 ** decimals());
    }
}
