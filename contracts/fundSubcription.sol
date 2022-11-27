// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/EnumerableSet.sol";
contract premiumSubsription{

    event Bought(address payable buyer, uint256 amount);

    uint256 public premiumPrice;
    address payable public owner;
    IERC20 public paymenToken;

    struct subcriptionMetadata{
        address supcripter;
        uint256 startTime;
        uint256 endTime;
    }
    
    mapping(address => subcriptionMetadata) public isPremiumUser;

    constructor(address _paymentToken, uint256 _premiumPrice){
        owner = msg.sender;
        paymenToken = IERC20(_paymentToken);
        premiumPrice = _premiumPrice;
    }
    

    modifier onlyOwner(){
        require(msg.sender == owner,'Only owner');
        _;

    }

    function upgradePremium()payable public{
        
        paymenToken.transferFrom(msg.sender, address(this) , premiumPrice);

        isPremiumUser[msg.sender] = true;
    }

    function setPremiumUserStatus(address user, bool premiumStatus) public onlyOwner{
        isPremiumUser[user] = premiumStatus;
    }

    function updateERC20(address _newERC20) public onlyOwner{
        paymenToken = IERC20(_newERC20);
    }

    function updateOwner(address payable _newOwner) public onlyOwner{
        owner = _newOwner;
    }

    function updatePrice(uint256 _newPrice) public onlyOwner{
        premiumPrice = _newPrice;
    }
}
