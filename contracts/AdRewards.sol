pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/math/SafeMath.sol";
import "https://github.com/MyBlokchainGuru/RewardsPointsApp/blob/main/contracts/AdRewardsToken.sol";

contract AdRewards {
  using SafeMath for uint256;

  address public owner;
  AdRewardsToken public token;
  mapping(address => uint256) public rewards;

  constructor(address tokenAddress) public {
    owner = msg.sender;
    token = AdRewardsToken(tokenAddress);
  }

  function sign(bytes32 transaction) public view returns (bytes memory) {
    return keccak256(abi.encodePacked(transaction, msg.sender));
  }

  function claimRewards(
    string memory name,
    string memory address,
    address wallet
  ) public payable {
    require(rewards[msg.sender] > 0, "You don't have any rewards to claim.");
    require(verifySignature(sign(name), wallet), "Invalid signature.");

    rewards[msg.sender] = rewards[msg.sender].sub(1);
    token.transfer(wallet, 1);
  }

  function verifySignature(bytes memory sig, address signer) internal view returns (bool) {
    return address(uint(keccak256(abi.encodePacked(sig)))).eq(signer);
  }
}
