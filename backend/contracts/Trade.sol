// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Trade {
    struct TradePartner {
        address participant;
        string token;
        int amount;
    }

    TradePartner t1;
    TradePartner t2;
    bool open;

    constructor(
        address addressFrom,
        string memory tokenFrom,
        string memory tokenTo,
        int amountFrom,
        int amountTo
    ) {
        t1 = TradePartner(addressFrom, tokenFrom, amountFrom);
        t2 = TradePartner(address(0), tokenTo, amountTo);
        open = false;
    }
}
