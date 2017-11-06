// Write a program that calculates the sum
// of all command line arguments that
// are passed in when starting the program.
//
// For example:
// node sum.js 1 2 3
// 6
let sum = 0;

for(let i = 2; i < process.argv.length; i++){
  let p = parseInt(process.argv[i]);
  sum = sum + p;
}
console.log(sum);
