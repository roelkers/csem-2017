// CommonJS style

var lib = {};

function rating(stars) {
    if (stars > 3) {
        return "great";
    } else {
        return "nice";
    }
}

lib.rating = rating;

module.exports = lib;
