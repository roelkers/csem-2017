// TODO import common-js style
var lib = require('../lib/cjs/lib');
var $ = require('jquery');

$("#test").html("<h2>CJS + Browserify is a " + lib.rating(3) + " experience.</h2>");
