// CommonJS style

module.exports = function rating(stars) {
    if (stars > 3) {
        return "great";
    } else {
        return "nice";
    }
}
