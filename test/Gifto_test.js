const assertFail = require("./helpers/assertFail");
// const Gifto = artifacts.require("./helpers/MockMultiSigWallet");
const Gifto = artifacts.require("Gifto");
const MSW = artifacts.require("MultiSigWallet");
const utils = require("./helpers/Utils");
const BigNumber = require("bignumber.js");

let giftoDeployed,
  mswDeployed,
  deployer,
  _totalSupply,
  approvedInvestorList,
  _allowed,
  _spender,
  remaining,
  allowed,
  _owner

contract("Gifto Tests", async function([deployer, investor, vandal, wallet]) {
  beforeEach(async () => {
    giftoDeployed = await Gifto.new();
    mswDeployed = await MSW.new([wallet], 1);
  });

  it("Can’t purchase gifto for less than the minimum buy amount", async () => {
    await assertFail(async () => {
      await giftoDeployed.MultiSigWallet(0x0, 1, {
        from: investor,
        value: web3.toWei(0.1, "ether")
      });
    });
  });

  it("Users can be added to investor list", async () => {
    await giftoDeployed.addInvestorList([investor], {from: deployer});
    assert.equal(await giftoDeployed.isApprovedInvestor(investor), true);
    assert.equal(await giftoDeployed.isApprovedInvestor(vandal), false);
  });

  it("Functions from Gifto()", async () => {
    assert.isOk(await giftoDeployed.turnOnSale({from: deployer}));
    assert.isOk(await giftoDeployed.totalSupply({from: deployer}));
  });

  it("Gets the balance of an address", async () => {
    await giftoDeployed.transfer(investor, 10);
    assert.equal(await giftoDeployed.balanceOf(investor), 10)
  });

  it('Allows _spender to withdraw _amount from your account', async () => {
    await giftoDeployed.approve(investor, 500);
    let allowance = await giftoDeployed.allowance.call(deployer, investor);
    assert.equal(allowance, 500);
  });
      // not working
  // it("Transfers tokens from an approved address to another address", async () => {
  //   await giftoDeployed.approve(investor, 10);
  //   await giftoDeployed.transferFrom(vandal, deployer, 10, {from: investor});
  //   assert.equal(await giftoDeployed.balanceOf(deployer), 10)
  // });

  it('verifies that an approval fires an Approval event', async () => {
    let res = await giftoDeployed.approve(investor, 500);
    assert(res.logs.length > 0 && res.logs[0].event == 'Approval');
  });

  it('verifies that an approve fires an Approval event', async () => {
    let res = await giftoDeployed.approve(investor, 500);
    assert.equal(res.logs[0].event, 'Approval');
    assert.equal(res.logs[0].args._owner, deployer);
    assert.equal(res.logs[0].args._spender, investor);
    assert.equal(res.logs[0].args._value, 500);
  });

  it('should fail when attempting to transfer from another account more than the allowance', async () => {
    await giftoDeployed.approve(investor, 100);
    assertFail(async () => {
      await giftoDeployed.transferFrom(deployer, vandal, 200, {from: investor});
    })
  });

  it("Transfer fails if funds are insufficient", async () => {
    assertFail(async () => {
      await giftoDeployed.transfer(vandal, balances[msg.sender] + 1);
    })
  })

  it('verifies that an transfer fires an Transfer event', async () => {
    // watcher = giftoDeployed.Transfer();
    let res = await giftoDeployed.transfer(investor, 500);
    // logs = watcher.get();
    assert.equal(res.logs[0].event, 'Transfer');
    assert.equal(res.logs[0].args._from, deployer);
    assert.equal(res.logs[0].args._to, investor);
    assert.equal(res.logs[0].args._value, 500);
  });

  it("Removes an investor from the list", async () => {
    await giftoDeployed.addInvestorList([vandal], {from: deployer});
    assert.equal(await giftoDeployed.isApprovedInvestor(vandal), true);
    await giftoDeployed.removeInvestorList([vandal], {from: deployer});
    assert.equal(await giftoDeployed.isApprovedInvestor(vandal), false);
  })

  it('Initialising the Gifto contract should trigger a transfer event which generates the tokens', async function() {
    let event = giftoDeployed.Transfer({});
    event.watch(function(err, res) {
      if (!err) {
        assert.equal(res['event'], 'Transfer');
        event.stopWatching();
      }
    });
  });

  it('Fallback functions ', async () => {
    let y = await web3.eth.getBalance(mswDeployed.address);
    assert.isOk(await mswDeployed.sendTransaction({from: vandal, to: deployer, value: 10}));
    let x = await web3.eth.getBalance(mswDeployed.address);
    assert.equal(y.toNumber() + 10, x.toNumber());
  })

  it("Function from MultiSigWallet()", async () => {
    assert.isOk(await mswDeployed.getOwners({from: deployer}));
  });

  it('returns the total supply', async () => {
    let x = await giftoDeployed.totalSupply();
    assert.equal(x, 10 ** 14)
  })

  it('checks address is approved investor', async () => {
    await giftoDeployed.addInvestorList([deployer]);
    assert.equal(await giftoDeployed.isApprovedInvestor(deployer), true)
  })

  // not mine
  it("withdraw()", async () => {
    await giftoDeployed.turnOnSale();

    assert.equal(web3.eth.getBalance(giftoDeployed.address), 0);
    await giftoDeployed.addInvestorList([investor], {from: deployer});
    let original_balance = (web3.eth.getBalance(deployer)).toNumber();
    await giftoDeployed.buyGifto({
      from: investor,
      value: web3.toWei(1, 'ether')
    });
    let new_balance = (web3.eth.getBalance(deployer)).toNumber();
    assert.equal(new_balance > original_balance, true);
    await assertFail(async () => {
      await giftoDeployed.withdraw({from: vandal});
    });
    await giftoDeployed.withdraw({from: deployer});
    assert.equal((web3.eth.getBalance(deployer)).toNumber() < new_balance, true);
  });

});
