
pragma solidity ^0.4.0;

import "../Gifto.sol";


contract MultiSigWalletMock is MultiSigWallet {
    function MultiSigWalletMock(address[] _owners, uint _required) MultiSigWallet(_owners, _required) {}
      
    modifier onlyWallet() {
        _;
    }
}
