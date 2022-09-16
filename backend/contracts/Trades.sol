// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "./Token.sol";

contract Trades {
    struct TradePartner {
        address participant;
        address tokenAddress;
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
        Token t1 = Token(offerToken);
        TradePartner memory tp1 = TradePartner(
            msg.sender,
            offerToken,
            t1.name(),
            offerAmount
        );

        Token t2 = Token(forToken);
        TradePartner memory tp2 = TradePartner(
            address(0),
            forToken,
            t2.name(),
            forAmount
        );

        trades.push(Trade(tp1, tp2, false));
    }

    function getTrades() public view returns (Trade[] memory) {
        return trades;
    }
}
