pragma solidity ^0.4.18;

import '../Gifto.sol';


contract MockMultiSigWallet is MultiSigWallet {


    modifier onlyWallet() {
        _;
    }

    function someFunction(uint256 a) public returns (uint) {
        return a * 2;
    }
}
