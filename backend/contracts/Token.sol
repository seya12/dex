// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
// Import this file to use console.log
import "hardhat/console.sol";
import "./IERC20.sol";

abstract contract Token is IERC20 {
    string private _name;
    string private _symbol;

    uint private _totalSupply;
    uint private _decimals;

    address private _owner;

    mapping(address => uint) private _balances;
    mapping(address => mapping(address => uint)) private _allowances;

    constructor(
        string memory name_,
        string memory symbol_,
        uint totalSupply_,
        uint decimals_
    ) {
        _name = name_;
        _symbol = symbol_;
        _totalSupply = totalSupply_;
        _decimals = decimals_;
        _owner = msg.sender;
        _balances[_owner] = _totalSupply;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view override returns (uint) {
        return _totalSupply;
    }

    function decimals() public view override returns (uint) {
        return _decimals;
    }
}
