// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./Trade.sol";

contract Trades {
    struct test {
        uint number;
        string text;
    }

    uint[] public arr;
    Trade[] public trades;
    test[] public t;

    constructor() {
        trades.push(
            new Trade(
                0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9,
                "ABC",
                "TST",
                1,
                2
            )
        );
        arr.push(1);
        arr.push(2);
        t.push(test(1, "test"));
    }

    function getTrades() public view returns (Trade[] memory) {
        return trades;
    }

    function getArr() public view returns (uint[] memory) {
        return arr;
    }

    function getStruct() public view returns (test[] memory) {
        return t;
    }
}
