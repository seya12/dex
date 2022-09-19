// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
// Import this file to use console.log
import "hardhat/console.sol";
import "./Token.sol";

contract Tokens {
    Token[] public tokens;

    function createToken(
        string memory name_,
        string memory symbol_,
        uint totalSupply_,
        uint decimals_
    ) public {
        Token token = new Token(name_, symbol_, totalSupply_, decimals_);
        tokens.push(token);
    }

    function getTokens()
        external
        view
        returns (
            address[] memory owners,
            string[] memory names,
            string[] memory symbols,
            uint[] memory totalSupplies,
            uint[] memory decimals,
            address[] memory addresses
        )
    {
        owners = new address[](tokens.length);
        names = new string[](tokens.length);
        symbols = new string[](tokens.length);
        totalSupplies = new uint[](tokens.length);
        decimals = new uint[](tokens.length);
        addresses = new address[](tokens.length);

        for (uint i = 0; i < tokens.length; i++) {
            owners[i] = tokens[i].owner();
            names[i] = tokens[i].name();
            symbols[i] = tokens[i].symbol();
            totalSupplies[i] = tokens[i].totalSupply();
            decimals[i] = tokens[i].decimals();
            addresses[i] = address(tokens[i]);
        }
        return (owners, names, symbols, totalSupplies, decimals, addresses);
    }

    receive() external payable {} // to support receiving ETH by default

    fallback() external payable {}
}
