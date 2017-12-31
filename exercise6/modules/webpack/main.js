var lib = require('../lib/umd/lib.js');
var $ = require('jquery');

$("#test").html("<h2>UMD + Webpack is a " + lib.rating(4) + " experience.</h2>");
