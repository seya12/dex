// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
// Import this file to use console.log
import "hardhat/console.sol";
import "./Token.sol";

contract Tokens {
    address[] public tokens;

    function createToken(
        string memory name_,
        string memory symbol_,
        uint totalSupply_,
        uint decimals_
    ) public {
        Token token = new Token(name_, symbol_, totalSupply_, decimals_);
        tokens.push(address(token));
    }

    function getTokens() external view returns (address[] memory) {
        return tokens;
    }

    function getTokenNames() external view returns (string[] memory) {
        string[] memory tokenNames = new string[](tokens.length);

        for (uint i = 0; i < tokens.length; i++) {
            Token t = Token(tokens[i]);
            tokenNames[i] = t.name();
        }

        return tokenNames;
    }
}
