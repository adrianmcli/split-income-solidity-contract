const SplitIncome = artifacts.require("./SplitIncome.sol");

module.exports = function(deployer) {
  deployer.deploy(SplitIncome);
};
