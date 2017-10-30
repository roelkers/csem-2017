// Build a closure that lets users upvote
// under these two constraints:
//   1. voters have a certain amount of karma that they can spend on upvotes
//   2. voters cannot upvote too quickly, i.e.,
//      not within 5 seconds after a previous upvote

function up(karma) {
  let karmaLeft = karma;
  let lastVoteMillis = 0;

  return function(upvote){
    nowMillis = Date.now();
    if( nowMillis - lastVoteMillis < 5000)
      return 'you are upvoting too early';
    if(karmaLeft < 0)
      return 'not enough karma';
    lastVoteMillis = nowMillis;
    karmaLeft = karmaLeft - upvote;
    return 'upvote: '+ upvote + ' ,karma left: '+karmaLeft;
  }
}

let voter1 = up(100);
console.log(voter1(90)); // upvote: 90, karma left: 10
console.log(voter1(15)); // you are upvoting too quickly
// call after 5 sec
console.log(voter1(15)); // not eough karma: 10
