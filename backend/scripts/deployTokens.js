// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { writeContractAddress } = require("./fileUtils.js");

async function main() {
  const token = await hre.ethers.getContractFactory("Tokens");
  const tokensContract = await token.deploy();

  await tokensContract.deployed();
  console.log("tokens deployed to: ", tokensContract.address);
  writeContractAddress("Tokens", tokensContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
