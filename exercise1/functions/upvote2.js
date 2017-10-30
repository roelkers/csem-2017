// Build a closure that lets users upvote
// under these two constraints:
//   1. voters have a certain amount of karma that they can spend on upvotes
//   2. voters cannot upvote too quickly, i.e.,
//      not within 5 seconds after a previous upvote

// In addition to the previous upvote closure, voters can recharge
// their karma with a recharge(number) method

function up(karma) {
  let karmaLeft = karma;
  let lastVoteMillis = 0;

  return {
    vote: function(upvote){
      nowMillis = Date.now();
      if( nowMillis - lastVoteMillis < 5000)
        return 'you are upvoting too early';
      if(karmaLeft < 0)
        return 'not enough karma';
      lastVoteMillis = nowMillis;
      karmaLeft = karmaLeft - upvote;
      return 'upvote: '+ upvote + ' ,karma left: '+karmaLeft;
    },
    recharge: function(number){
      if(number < 0)
       return 'can only recharge by a positive amount';
      karmaLeft = karmaLeft + number;
      return number + ' recharged.Total karma now: ' + karmaLeft;
    }
  }
}



let voter1 = up(100);
console.log(voter1.vote(90)); // upvote: 90, karma left: 10
console.log(voter1.recharge(20)); // 20 recharged. Total karma now: 30
// call after 5 sec
console.log(voter1.vote(15)); // upvote: 15, karma left: 15
