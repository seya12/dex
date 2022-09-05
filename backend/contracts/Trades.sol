// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Trades {
    struct TradePartner {
        address participant;
        string token;
        int amount;
    }

    struct Trade {
        TradePartner seller;
        TradePartner buyer;
        bool open;
    }

    Trade[] public trades;

    function addTrade(Trade memory trade) external {
        trades.push(trade);
    }

    function getTrades() public view returns (Trade[] memory) {
        return trades;
    }
}
