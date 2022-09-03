// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./Trade.sol";

contract Trades {
    Trade[] public trades;
    int public test;

    constructor() {
        test = 0;
        trades.push(
            new Trade(
                0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9,
                "ABC",
                "TST",
                1,
                2
            )
        );
    }

    function getTrades() public view returns (Trade[] memory) {
        return trades;
    }
}
