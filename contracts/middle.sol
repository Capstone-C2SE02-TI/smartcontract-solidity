// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;
import "./ERC20.sol";

contract middle{

    event NativeWithdraw(address to, uint256 amount);
    event Erc20Withdraw(address token,address to, uint256 amount);

    address owner;

    struct buyingMetadata {
        uint256 nativeBalance;
        mapping(address => uint256) tokenAsset;
    }

    mapping(address => buyingMetadata) userBuyingMetadata;

    
    constructor(){
        owner = payable(msg.sender);

    }

    modifier onlyOwner(){
        require(msg.sender == owner,'Only owner');
        _;

    }

    function helperFunction() payable public{
        userBuyingMetadata[msg.sender].nativeBalance = msg.value;
        
    }
    fallback() payable external{
        userBuyingMetadata[msg.sender].nativeBalance = msg.value;
    }

    receive() external payable {
        // custom function code
    }


    function nativeWithdraw(uint _amount) public payable{
        require(_amount <= userBuyingMetadata[msg.sender].nativeBalance, "User exceed Balance");
        require(_amount <= address(this).balance, "Contract Inficent Balance");

        userBuyingMetadata[msg.sender].nativeBalance -= _amount;
        (bool sent, ) = payable(msg.sender).call{value: _amount}("");
        require(sent, "Failed to send Ether");
        
        emit NativeWithdraw(msg.sender,_amount);
    }

    function erc20Withdraw(address _token, uint _amount) public {
        
        IERC20 iToken = IERC20(_token);
        require(userBuyingMetadata[msg.sender].tokenAsset[_token] >= _amount,"User exceed Balance");
        require(iToken.balanceOf(address(this)) >= _amount, "Don't Enough _token to swap");

        iToken.transfer(msg.sender,_amount);
        emit Erc20Withdraw(_token,msg.sender ,_amount);
    }
    
    function copyTrading(address _dex, bytes memory _inputData) public returns(bytes memory){
        bool success;
        bytes memory result;
        (success, result) = _dex.call(_inputData);

        if(!success){
            string memory errorMessage = string(result);
            revert(errorMessage);
        }

        return result;
    }
   
}
