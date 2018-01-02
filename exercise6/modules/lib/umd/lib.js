// UMD
// based on this template:
// https://github.com/umdjs/umd/blob/master/templates/returnExports.js


// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('lib', factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {


  var lib = {};

  function rating(stars) {
      if (stars > 3) {
          return "great";
      } else {
          return "nice";
      }
  }

  lib.rating = rating;

  return lib;

}));
