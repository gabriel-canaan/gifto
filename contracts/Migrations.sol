<<<<<<< HEAD
pragma solidity ^0.4.17;
=======
pragma solidity ^0.4.4;
>>>>>>> 277891d51ee45eeb250f8a32a3c32b9ed1aafa21

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

<<<<<<< HEAD
  function Migrations() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
=======
  function Migrations() {
    owner = msg.sender;
  }

  function setCompleted(uint completed) restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) restricted {
>>>>>>> 277891d51ee45eeb250f8a32a3c32b9ed1aafa21
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
