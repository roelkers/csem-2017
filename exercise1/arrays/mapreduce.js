// Exercise: compute an array with words and their weighted word count
// Weighted word count is here defined as:
// Sum of (word occurrences in a doc * weight of the doc)

// The document array contains nested [text,weight] arrays.
const documents = [
  ['Hello world', 3],
  ['Hello foo', 1],
  ['foo bar foo', 5],
];

// Use Array.map() to produce this intermediary result:
// [ [ 3, [ 'Hello', 'world' ] ],
//   [ 1, [ 'Hello', 'foo' ] ],
//   [ 5, [ 'foo', 'bar', 'foo' ] ] ]
let wordArray = documents.map((document) => {
  return [document[1], document[0].split(' ')]
}); // TODO

console.log(wordArray);

// Use Array.map() to transform the previous array into this:
// [ [ [ 'Hello', 3 ], [ 'world', 3 ] ],
//   [ [ 'Hello', 1 ], [ 'foo', 1 ] ],
//   [ [ 'foo', 5 ], [ 'bar', 5 ], [ 'foo', 5 ] ] ]
let wordMap = wordArray.map((wordArray)=>{
  const weight = wordArray[0];
  let words = [];
  wordArray[1].forEach((word)=> words.push([word,weight]));
  return words;
}); // TODO

console.log(wordMap);

// Flatten the array that the last step produced by using Array.reduce()
// and Array.concat()
// The resulting array should look like this:
// [ [ 'Hello', 3 ],
//   [ 'world', 3 ],
//   [ 'Hello', 1 ],
//   [ 'foo', 1 ],
//   [ 'foo', 5 ],
//   [ 'bar', 5 ],
//   [ 'foo', 5 ] ]
let flatWordMap = wordMap.reduce((prev, curr)=>{
  return prev.concat(curr);
})

console.log(flatWordMap);

// Use Array.reduce() to produce this final result:
// { Hello: 4, world: 3, foo: 11, bar: 5 }
let weightedWordCount = flatWordMap.reduce((prev, curr)=>{
  if(!prev.hasOwnProperty(curr[0]))
    prev[curr[0]] = 0;
  prev[curr[0]] = prev[curr[0]] + curr[1];
  return prev;
},{}); // TODO

console.log(weightedWordCount);
