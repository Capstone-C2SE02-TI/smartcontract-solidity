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
        bool isValid;
    }
    
    mapping(address => subcriptionMetadata) public premiumUsers;
    constructor(address _paymentToken, uint256 _premiumPrice){
        owner = payable(msg.sender);
        paymenToken = IERC20(_paymentToken);
        premiumPrice = 0.001 ether;

        expriedTime[1] = 30  * (1 days);
        expriedTime[2] = 180 * (1 days);
        expriedTime[3] = 360 * (1 days);
    }
// Level subcription => expried time
    mapping(uint8 => uint256) expriedTime;
    modifier onlyOwner(){
        require(msg.sender == owner,'Only owner');
        _;

    }

    function isPremiumUser(address _user) public view returns(bool){
        return premiumUsers[_user].endTime > block.timestamp && premiumUsers[_user].isValid == true;
    }

    function upgradePremium(uint8 _level) payable public{
        
        paymenToken.transferFrom(msg.sender, address(this) , premiumPrice);

        premiumUsers[msg.sender] = subcriptionMetadata(msg.sender,block.timestamp, expriedTime[_level], true);
        
    }

    function setPremiumUserStatus(address _user, bool _premiumStatus) public onlyOwner{
        premiumUsers[_user].isValid = _premiumStatus;
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

    function getExpriedTime(address _user) public view returns(uint256){
        return premiumUsers[_user].endTime;
    }
}
