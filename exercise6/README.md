# Exercise 6

Submission deadline: 10.01.2018, end of day

## Build automation and JavaScript modules (40%)

### Write AMD, CommonJS, and UMD modules (20%)

In folder _modules/lib/_ you find 4 subdirectories: _amd_, _cjs_, _es6_, and _umd_. Only subdirectory _es6_ contains a _lib.js_ file with module code. Please write the missing 3 modules in AMD, CommonJS, and UMD syntax. Each module should contain the same functionality.

### Complete the missing module loader/bundler code (20%)

Please complete the missing source code in the following folders:

- _requirejs_: The _index.js_ and _index.html_ files are not complete. Fill out the missing code.
- _browserify_: The _main.js_ file is incomplete. Import the missing dependencies using CommonJS style. Add an npm script 'b' to the _modules/package.json_ file that allows users to create bundles with browserify via typing `npm run b`. Using that command, create a bundle.js payload file with browserify. Then add the missing script tag in _index.html_.
- _webpack_: Add an npm script 'w' to the _modules/package.json_ file that allows users to create bundles with webpack via typing `npm run w`. Create a bundle.js with webpack and add then missing script tag in _index.html_.

## Test automation (60%)

The directory _tbdd_ contains test files that can be executed with the Mocha unit testing framework via `npm test`.

1. Run the tests and check if they all pass or if tests fail. The "Array Methods #map()" test should fail. Why does it fail and how can it be fixed? Please fix the test and write your answer in the _answers.txt_ file in the main directory.
2. The current test file _tbdd/array.spec.js_ uses the Chai assert style. Please change the TDD assert statements to BDD expect statements.
3. In the empty test file _test/hotel.spec.js_, please write a unit test for the `save()` method in _app/hotel.js_.
4. If we assume that the `save()` method in _test/hotel.spec.js_ makes a database call to MongoDB, and sometimes these database calls can time out or fail for other reasons, what would you do so that all unit tests always pass? Please write a short answer in the _answers.txt_ file.