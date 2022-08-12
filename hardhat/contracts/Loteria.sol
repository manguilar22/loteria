// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Loteria is ERC721, ERC721Enumerable, ERC721URIStorage,ERC721Royalty, AccessControl {
    using Counters for Counters.Counter;

    address private communityWallet;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;
    uint256 public currentPrice = 0.03 ether;

    constructor(address _communityWallet) ERC721("LoteriaToken", "LOTERIA") {
        communityWallet = _communityWallet;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function currentCounter() public view returns(uint256) {
        return _tokenIdCounter.current();
    }

    function setTokenURI(uint256 tokenId,string memory newTokenURI) public onlyRole(MINTER_ROLE) {
        _setTokenURI(tokenId,newTokenURI);
    }

    function setPrice(uint256 newPrice) public onlyRole(MINTER_ROLE) {
        currentPrice = newPrice;
    }

    function safeMint(address to, string memory uri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function mint(address to, string memory uri) payable public {
        require(msg.value >= currentPrice,"not enough ETH was sent. Please check token price.");

        uint256 tokenId = _tokenIdCounter.current();

        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        (bool status, ) = payable(communityWallet).call{value:msg.value}("");
        require(status,"failed purchase.");
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage,ERC721Royalty) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC721Royalty, AccessControl)  returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
