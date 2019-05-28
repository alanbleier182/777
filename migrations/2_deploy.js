const ERC777 = artifacts.require("Test777");

require('openzeppelin-test-helpers/configure')({ web3 });

const { singletons } = require('openzeppelin-test-helpers');

const name = "Test 777 Token";
const symbol = "TTN"
const defaultOperators = [];

module.exports = async function(deployer, accounts) {
    const erc1820 = await singletons.ERC1820Registry(accounts[0]);

  deployer.deploy(ERC777, name, symbol, defaultOperators);
};
