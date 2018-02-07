const assertFail = require("./helpers/assertFail");
// const Gifto = artifacts.require("./helpers/MockMultiSigWallet");
const Gifto = artifacts.require("Gifto");
const MSW = artifacts.require("MultiSigWallet");
const utils = require("./helpers/Utils");
const BigNumber = require("bignumber.js");

let giftoDeployed,
  mswDeployed;

contract("Gifto Tests", async function([deployer, investor, vandal, wallet]) {
  beforeEach(async () => {
    giftoDeployed = await Gifto.new();
    mswDeployed = await MSW.new([wallet], 1, {gas: 4700000});
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

  it("Transfer fails if funds are insufficient", async () => {
    assertFail(async () => {
      await giftoDeployed.transfer(vandal, balances[msg.sender] + 1);
    })
  })

  it("Transfers tokens from an approved address to another address", async () => {
    assert.isOk(await giftoDeployed.transferFrom(vandal, investor, 10));
    await giftoDeployed.transfer(investor, 10);
    assertFail(async () => {
      await giftoDeployed.transfer(investor, 10,{from: deployer});
    })
    assert.equal(await giftoDeployed.balanceOf(investor), 10)
  });

//   it("transferfrom more than balance", function() {
//   var value = new BigNumber(180);
//   return giftoDeployed.transferFrom(accounts[8], accounts[7], value, {from:accounts[9]}).then(function(){
//       assert.fail("transfer should fail");
//   }).catch(function(error){
//       assert( Helpers.throwErrorMessage(error), "expected throw got " + error);
//   });
// });

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
    console.log('y: ' + y);
    assert.isOk(await mswDeployed.sendTransaction({from: vandal, to: deployer, value: 10}));
    let x = await web3.eth.getBalance(mswDeployed.address);
    assert.equal(y.toNumber() + 10, x.toNumber());
  })

  it("Function from MultiSigWallet()", async () => {
    assert.isOk(await mswDeployed.getOwners({from: deployer}));
  });


  it("Adds an new owner", async () => {
    await mswDeployed.addOwner(deployer);

  })





























});
