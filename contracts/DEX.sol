// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

import "./ERC20.sol";



contract DEX{
    event Bought(address payable buyer, uint256 amount);
    event Sold(address payable seller, uint256 amount);
    
    uint256 price;
    address payable owner;
    ERC20 token;


    constructor(address _token, uint256 _price){
        token = ERC20(_token);
        price = _price;
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

        (bool success,) = address(token).call(
            abi.encodeWithSelector(ERC20.transfer.selector,msg.sender,amount)
            
        );

        require(success,"Revert");
    }

    function updateToken(address _newToken) public onlyOwner{
        token = ERC20(_newToken);
    }

    function updateOwner(address _newOwner) public onlyOwner{
        owner = payable(_newOwner);
    }
}