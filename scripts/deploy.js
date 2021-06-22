// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  await hre.run('compile');

  // ethers is avaialble in the global scope
  const [tokenRecipient, timelockAdmin, guardian] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await tokenRecipient.getAddress()
  );

  console.log("Account balance:", (await tokenRecipient.getBalance()).toString());

  // This gets the contract from 
  const Token = await ethers.getContractFactory("Comp");
  const token = await Token.deploy(tokenRecipient.address);
  await token.deployed();
  await token.deployTransaction.wait();

   // Deploy Timelock
   const delay = 172800;
  
   const Timelock = await ethers.getContractFactory("Timelock");
   const timelock = await Timelock.deploy(timelockAdmin.address, delay);
   await timelock.deployed();
   await timelock.deployTransaction.wait();

   // Deploy Governance
   const Gov = await ethers.getContractFactory("GovernorAlpha");
   const gov = await Gov.deploy(timelock.address, token.address, guardian.address);
   await gov.deployed();
   await gov.deployTransaction.wait();


   console.log(`Token deployed to: ${token.address}`);
   console.log(`TimeLock deployed to: ${timelock.address}`);
   console.log(`GovernorAlpha deployed to: ${gov.address}`)

  const initialBalance = await token.balanceOf(tokenRecipient.address);
  console.log(`${initialBalance / 1e18} tokens transfered to ${tokenRecipient.address}`);


  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token, gov);
}

function saveFrontendFiles(token, gov) {
  const fs = require("fs");
  const abisDir = __dirname + "/../src/abis";
  const addressesDir = __dirname + "/../src/addresses";

  if (!fs.existsSync(abisDir)) {
    fs.mkdirSync(abisDir);
  }

  if (!fs.existsSync(addressesDir)) {
    fs.mkdirSync(addressesDir);
  }

  
  fs.writeFileSync(
    addressesDir + "/index.js",
    "export const Addresses = {COMP: '" + token.address + "', GOVERNOR: '" + gov.address + "'}"
  );

  const TokenArtifact = artifacts.readArtifactSync("Comp");
  const GovArtifact = artifacts.readArtifactSync("GovernorAlpha");

  fs.writeFileSync(
    abisDir + "/Comp.json",
    JSON.stringify(TokenArtifact, null, 2)
  );

  fs.writeFileSync(
    abisDir + "/Governor.json",
    JSON.stringify(GovArtifact, null, 2)
  );
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
