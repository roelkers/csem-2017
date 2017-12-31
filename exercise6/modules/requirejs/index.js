// TODO
/*

*/
requirejs.config({
    baseUrl: '../lib/amd',
    paths: {
        /*jquery: 'require-jquery.js',*/
        lib: 'lib'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.

require(['jquery','lib'], function($,lib) {
    $("#test").html("<h2>AMD + Require.js is " + lib.rating(2) + ", too.</h2>");
});