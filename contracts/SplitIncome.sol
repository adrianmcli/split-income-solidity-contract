pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract SplitIncome is Ownable {
  address public payee_1;
  address public payee_2;

  function SplitIncome() public {
    payee_1 = owner;
  }

  function setPayee_1(address _payee) public onlyOwner {
    payee_1 = _payee;
  }

  function setPayee_2(address _payee) public onlyOwner {
    payee_2 = _payee;
  }

  function splitPayment() private {
    uint amount = SafeMath.div(msg.value, 2);
    payee_1.send(amount);
    payee_2.send(amount);
  }

  function() external payable {
    splitPayment();
  }
}
