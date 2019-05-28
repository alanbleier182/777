# 777
An test ERC777 token

This code produces an error when trying to deploy to ganache... This is what I did:

1. `truffle init`
2. `npm install openzeppelin-solidity`
3. `npm install open zeppelin-test-helpers`
4. Write a simple 777 token:
```
pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC777/ERC777.sol";

contract Test777 is ERC777 {
    constructor(
        string memory name,
        string memory symbol,
        address[] memory defaultOperators
    ) public ERC777(name, symbol, defaultOperators) {
        _mint(msg.sender, msg.sender, 10000 * 10 ** 18, "", "");
    }
}
```
5. Write a simple deploy:
```
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
```
6. `truffle compile` (no errors here)
7. `truffle migrate` produces this output:

```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'ganache'
> Network id:      5777
> Block gas limit: 0x6691b7


2_deploy.js
===========
Error: Error: Cannot find module 'openzeppelin-test-helpers'
    at Object.run (/home/bleier/.nvm/versions/node/v11.9.0/lib/node_modules/truffle/build/webpack:/packages/truffle-migrate/index.js:84:1)
    at processTicksAndRejections (internal/process/next_tick.js:81:5)
Truffle v5.0.19 (core: 5.0.19)
Node v11.9.0

```
