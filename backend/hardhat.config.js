const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

task("init", "Initially deploy contracts").setAction(async () => {
  await hre.run("run", { script: "scripts/deployTrades.js" });
  await hre.run("run", { script: "scripts/deployTokens.js" });
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
};
