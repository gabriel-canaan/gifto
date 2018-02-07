it("withdraw()", async () => {
   await giftoDeployed.turnOnSale();

   assert.equal(web3.eth.getBalance(giftoDeployed.address), 0);
   await giftoDeployed.addInvestorList([investor], { from: deployer });
   let original_balance = (web3.eth.getBalance(deployer)).toNumber();
   await giftoDeployed.buyGifto({
     from: investor,
     value: web3.toWei(1, 'ether')
   });
   let new_balance = (web3.eth.getBalance(deployer)).toNumber();
   assert.equal(new_balance > original_balance, true);

   await assertFail(async () => {
     await giftoDeployed.withdraw({ from: vandal });
   });
   await giftoDeployed.withdraw({ from: deployer });
   assert.equal((web3.eth.getBalance(deployer)).toNumber() < new_balance, true);
 });
