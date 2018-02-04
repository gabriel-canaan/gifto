pragma solidity ^0.4.11;

import '../Gifto.sol';

// @dev SITMock mocks current block number

contract MockMultiSigWallet is MultiSigWallet {

  modifier onlyWallet() {
      _;
  }

}
