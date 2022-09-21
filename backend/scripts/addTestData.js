// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  if (!hre.tradesContractAddress || !hre.tokensContractAddress) {
    console.log("contracts not set... exit");
    return;
  }
  let tradesContract = await hre.ethers.getContractAt(
    "Trades",
    hre.tradesContractAddress
  );
  let tokensContract = await hre.ethers.getContractAt(
    "Tokens",
    hre.tokensContractAddress
  );
  const signers = await hre.ethers.getSigners();

  await tokensContract.createToken("LS", "LS", 100, 1);
  tokensContract = tokensContract.connect(signers[1]);
  await tokensContract.createToken("MG", "MG", 50, 1);

  console.log("finished adding test data");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
