// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
// Import this file to use console.log
import "hardhat/console.sol";
import "./IERC20.sol";

contract Token is IERC20 {
    address private _owner;

    string private _name;
    string private _symbol;

    uint private _totalSupply;
    uint private _decimals;

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
        _owner = tx.origin;
        _balances[_owner] = _totalSupply;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function decimals() public view override returns (uint) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint) {
        return _balances[account];
    }

    function transfer(address recipient, uint amount)
        public
        override
        returns (bool)
    {
        require(_balances[msg.sender] >= amount);

        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);

        return true;
    }

    function allowance(address owner, address spender)
        public
        view
        override
        returns (uint)
    {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint amount)
        public
        override
        returns (bool)
    {
        _allowances[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /*
    used for allowances: sender of transaction must be allowed to transfer this amount
    */
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) public override returns (bool) {
        require(_balances[sender] >= amount);
        require(_allowances[sender][msg.sender] >= amount);

        _balances[sender] -= amount;
        _balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);
        return true;
    }
}
