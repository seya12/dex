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
    event Swap(address indexed seller, address indexed buyer);

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

        Trade storage trade = trades[index];
        trade.open = false;
        trade.buyer.participant = msg.sender;

        Token seller = Token(trade.seller.tokenAddress);
        Token buyer = Token(trade.buyer.tokenAddress);

        seller.transferFrom(
            trade.seller.participant,
            trade.buyer.participant,
            trade.seller.amount
        );
        buyer.transferFrom(
            trade.buyer.participant,
            trade.seller.participant,
            trade.buyer.amount
        );
        emit Swap(trade.seller.participant, trade.buyer.participant);
        return true;
    }

    function getTrades() public view returns (Trade[] memory) {
        return trades;
    }

    fallback() external {}
}
