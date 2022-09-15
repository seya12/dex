// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Trades {
    struct TradePartner {
        address participant;
        address token;
        string tokenSymbol;
        uint amount;
    }

    struct Trade {
        TradePartner seller;
        TradePartner buyer;
        bool open;
    }

    Trade[] public trades;

    function addTrade(
        address offerToken,
        uint offerAmount,
        address forToken,
        uint forAmount
    ) external {
        TradePartner memory tp1 = TradePartner(
            msg.sender,
            offerToken,
            "",
            offerAmount
        );
        TradePartner memory tp2 = TradePartner(
            address(0),
            forToken,
            "",
            forAmount
        );

        trades.push(Trade(tp1, tp2, false));
    }

    function getTrades() public view returns (Trade[] memory) {
        return trades;
    }
}
