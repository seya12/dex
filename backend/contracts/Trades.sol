// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "hardhat/console.sol";
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
        uint id;
    }

    Trade[] public trades;
    uint tradesCounter;

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

        trades.push(Trade(tp1, tp2, true, tradesCounter));
        tradesCounter++;
    }

    function swap(uint index) public returns (bool) {
        require(trades[index].open == true, "Trade must be open");

        Trade storage t = trades[index];
        t.open = false;
        t.buyer.participant = msg.sender;

        Token seller = Token(t.seller.tokenAddress);
        Token buyer = Token(t.buyer.tokenAddress);

        seller.transferFrom(
            t.seller.participant,
            t.buyer.participant,
            t.seller.amount
        );
        buyer.transferFrom(
            t.buyer.participant,
            t.seller.participant,
            t.buyer.amount
        );

        return true;
    }

    function getTrades() public view returns (Trade[] memory) {
        return trades;
    }

    fallback() external {}
}
