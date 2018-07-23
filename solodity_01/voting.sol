pragma solidity ^0.4.24;
/*
投票智能合约
*/
contract Voting {

  //人员名单数组
  bytes32[] candidates = new bytes32[](5);
  //票数字典
  mapping (bytes32 => uint) candidatesVotingCount;


  //初始化
  function Voting(bytes32[] _candidates) public {

    for (uint i = 0 ; i < _candidates.length; i++){

      candidates[i] = _candidates[i];

    }

  }
  //开始投票
  function votingToPerson(bytes32 person) public {

    assert(isValidToPerson(person));//断言真假


    candidatesVotingCount[person] +=1;
  }

  //查询投票数量
  function votingTotalToPerson(bytes32 person) constant returns (uint) {

    require(isValidToPerson(person));//断言真假

    return candidatesVotingCount[person];
  }
  //检验是否有这个人
  function isValidToPerson(bytes32 person) constant public returns (bool) {
    for (uint i = 0; i < candidates.length; i++){
      if ( candidates[i] == person){
          return true;
      }
    }

    return false;
  }


}
