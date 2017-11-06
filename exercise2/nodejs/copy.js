const fs = require('fs');

// Enter the file path as first argument, e.g.,
// $ node copy.js /path/to/dummy.txt
let f = process.argv[2];

// TODO: Create a readable stream from file f
let fileToRead = fs.createReadStream(f);

// TODO: Create a writable stream that creates a
// new file with the original file path f
// plus the ending '-copy'
let newF = `${f}-copy`;
let fileToWrite = fs.createWriteStream(newF);
// TODO: Copy the content from f to f-copy
fileToRead.pipe(fileToWrite);
