pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/token/ERC20/ERC20.sol";

contract AdRewardsToken is ERC20 {
  using SafeMath for uint256;

  address public owner;
  mapping(address => uint256) public balances;
  uint256 public totalSupply;

  constructor() public {
    owner = msg.sender;
    totalSupply = 999999999;
    balances[owner] = totalSupply;
  }

  function mint(uint256 amount) public {
    require(msg.sender == owner, "Only the owner can mint tokens.");
    require(amount > 0, "Invalid amount.");

    totalSupply = totalSupply.add(amount);
    balances[owner] = balances[owner].add(amount);
  }

  function transfer(address recipient, uint256 amount) public {
    require(balances[owner] >= amount, "Insufficient balance.");
    require(recipient != address(0), "Invalid recipient address.");

    balances[owner] = balances[owner].sub(amount);
    balances[recipient] = balances[recipient].add(amount);
  }
}
