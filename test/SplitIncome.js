const SplitIncome = artifacts.require('./SplitIncome.sol')

contract('SplitIncome', (accounts) => {
  it(`should instantiate with the deployer's account as owner`, async () => {
    const contract = await SplitIncome.deployed()
    const payee_1 = await contract.payee_1.call()
    assert.equal(payee_1, accounts[0], `The first account is not set as payee_1`)
  })
  it(`should set payee_1 as the second account`, async () => {
    const contract = await SplitIncome.deployed()
    await contract.setPayee_1(accounts[1], { from: accounts[0] })
    const payee_1 = await contract.payee_1.call()
    assert.equal(payee_1, accounts[1], `The second account is not set as payee_1`)
  })
  it(`should set payee_2 as the third account`, async () => {
    const contract = await SplitIncome.deployed()
    await contract.setPayee_2(accounts[2], { from: accounts[0] })
    const payee_2 = await contract.payee_2.call()
    assert.equal(payee_2, accounts[2], `The third account is not set as payee_1`)
  })
  it(`should make sure that payee_1 and payee_2 is properly assigned to 2nd and 3rd accounts`, async () => {
    const contract = await SplitIncome.deployed()
    const payee_1 = await contract.payee_1.call()
    const payee_2 = await contract.payee_2.call()
    assert.equal(payee_1, accounts[1], `The second account is not set as payee_1`)
    assert.equal(payee_2, accounts[2], `The third account is not set as payee_1`)
  })
  it(`should properly split the amount paid to the contract`, async () => {
    const contract = await SplitIncome.deployed()

    const getBalance = (account) => {
      const amountInWei = web3.eth.getBalance(account).toNumber()
      return web3.fromWei(amountInWei)
    }

    const prevBalance_1 = getBalance(accounts[1])
    const prevBalance_2 = getBalance(accounts[2])
    
    const amount = web3.toWei("5", "ether")
    await contract.sendTransaction({ from: accounts[0], value: amount })

    const diff_1 = getBalance(accounts[1]) - prevBalance_1
    const diff_2 = getBalance(accounts[2]) - prevBalance_2

    assert.equal(diff_1, 2.5, `The first account did not get half of 5 ETH`)
    assert.equal(diff_2, 2.5, `The second account did not get half of 5 ETH`)
  })
})