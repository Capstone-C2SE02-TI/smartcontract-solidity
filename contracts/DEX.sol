// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

import "./ERC20.sol";



contract DEX{
    event Bought(uint256 amount);
    event Sold(uint256 amount);

    IERC20 token;


    constructor(address _token){
        token = IERC20(_token);
    }
}