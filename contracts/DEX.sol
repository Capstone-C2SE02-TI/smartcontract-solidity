// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

import "./ERC20.sol";



contract DEX{
    event Bought(address payable buyer, uint256 amount);
    event Sold(address payable seller, uint256 amount);
    
    uint256 public price;
    address payable public owner;
    IERC20 token;


    constructor(address _token, uint256 _price){
        token = IERC20(_token);
        price = 0.001 ether;
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner,'Only owner');
        _;

    }

    receive() payable external{
        
    }


    function buy(uint256 amount) payable public{
        require(amount * price == msg.value,"Not send exactly ETH");
        require(token.balanceOf(address(this)) >= amount, "Don't Enough token to swap");

        token.transfer(msg.sender,amount);
        
        emit Bought(msg.sender,amount);
    }

    function updatePrice(uint256 _newPrice) public onlyOwner{
        price = _newPrice;
    }

    function updateToken(address _newToken) public onlyOwner{
        token = IERC20(_newToken);
    }

    function updateOwner(address _newOwner) public onlyOwner{
        owner = payable(_newOwner);
    }
}