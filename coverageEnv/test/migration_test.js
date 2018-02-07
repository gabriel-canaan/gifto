const Migrations = artifacts.require("Migrations");

let lastCompleted, owner;

contract("Migrations", function(accounts) {

   const addressGifto = accounts[0];
   const addressCommunity = accounts[1];

   beforeEach(async () => {
       migrations = await Migrations.new({ from: addressGifto });
   });

   it("upgrade()", async () => {
       owner = await migrations.owner();
       assert.equal(owner, addressGifto);

       await migrations.setCompleted(6);
       lastCompleted = await migrations.last_completed_migration();
       assert.equal(6, lastCompleted.toNumber());

       await migrations.upgrade(migrations.address);    // TODO: how to access child contracts?  Migrations.sol

   });

});
