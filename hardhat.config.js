// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
// };


require("@nomiclabs/hardhat-waffle");
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    // console.log(" ******** ");
    // console.log(" Account Address : " + account.address);
    // console.log(" ******** ");
    // console.log(account);
    // console.log(account.address);
    const address = await account.getAddress();
    const balance = await account.getBalance();
    console.log("   ::: Address =>     " + address + " : " + hre.ethers.utils.formatEther(balance) + "     <= Balances :::   ");
  }
});

const ALCHEMY_API_KEY = "S2TOD1a90UZUb6Wd0LjOBhSt_JyKW8rK";
const SEPOLIA_PRIVATE_KEY = "7c4656154595e21b62ab50cd64e1cc3c818c6c6bca2cfa1b5c1b3ccbb48af709";

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    // url: "https://mainnet.infura.io/v3/ad1da45b44b2460b91a62db3cba969f1",
    // goerli: {
    //   url: "https://goerli.infura.io/v3/5a8e9776d97245e5afacfd4e9761e847",
    //   account: ["7c4656154595e21b62ab50cd64e1cc3c818c6c6bca2cfa1b5c1b3ccbb48af709"]
    // }
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};