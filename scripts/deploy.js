const hre = require("hardhat");

async function main() {
  const WhistleBlower = await hre.ethers.getContractFactory("WhistleBlower");
  const contract = await WhistleBlower.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
