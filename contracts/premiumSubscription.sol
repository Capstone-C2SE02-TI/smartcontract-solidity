// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./ERC20.sol";

contract premiumSubscription{

    address payable public owner;
    IERC20 public paymenToken;

    struct subcriptionMetadata{
        address supcripter;
        uint256 startTime;
        uint256 endTime;
        bool isValid;
    }
    
    struct premiumMetadata{
        uint256 expriedTime;
        uint24 price;
    }
        // level
    mapping(uint8 => premiumMetadata) public premiumLevel;
    mapping(address => subcriptionMetadata) public premiumUsers;

    constructor(address _paymentToken){
        owner = payable(msg.sender);
        paymenToken = IERC20(_paymentToken);

        premiumLevel[1] = premiumMetadata(30*(1 days), 99);
        premiumLevel[2] = premiumMetadata(180*(1 days), 560);
        premiumLevel[3] = premiumMetadata(360*(1 days), 899);
    }

    modifier onlyOwner(){
        require(msg.sender == owner,'Only owner');
        _;

    }

    function isPremiumUser(address _user) public view returns(bool){
        return premiumUsers[_user].endTime > block.timestamp && premiumUsers[_user].isValid == true;
    }

    function upgradePremium(uint8 _level) public{
        paymenToken.transferFrom(msg.sender, address(this) , premiumLevel[_level].price);

        premiumUsers[msg.sender] = subcriptionMetadata(msg.sender,block.timestamp, block.timestamp + premiumLevel[_level].expriedTime, true);
        
    }

    function updateValidUserStatus(address _user, bool _premiumStatus) public onlyOwner{
        premiumUsers[_user].isValid = _premiumStatus;
    }

    function updateERC20(address _newERC20) public onlyOwner{
        paymenToken = IERC20(_newERC20);
    }

    function updateOwner(address payable _newOwner) public onlyOwner{
        owner = _newOwner;
    }

    function updatePremiumLevel(premiumMetadata memory __newMedata,uint8 _level)public onlyOwner{
        premiumLevel[_level] = __newMedata;
    }

    function getExpriedTime(address _user) public view returns(uint256){
        return premiumUsers[_user].endTime;
    }
}
