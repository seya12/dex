// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function addTrades(tradesContract) {
  const partners = [
    {
      participant: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      token: "TEST",
      amount: 1,
    },
    {
      participant: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      token: "COUNTER",
      amount: 10,
    },
  ];
  const trade = {
    seller: partners[0],
    buyer: partners[1],
    open: true,
  };
  const tx = await tradesContract.addTrade(trade);
  await tx.wait();
  console.log("added dummy transactions");
}

async function main() {
  const trades = await hre.ethers.getContractFactory("Trades");
  const tradesContract = await trades.deploy();

  await tradesContract.deployTransaction.wait();
  console.log("trades deployed to: ", tradesContract.address);

  addTrades(tradesContract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
