var e = require("../constants.js"), t = e.LOC_FACTOR, r = e.LOC_ADDR_DISTANCE, n = require("./calc-line-distance.js");

module.exports = function(e, i, u) {
    for (var a = r, l = null, s = e / t, c = i / t, o = Math.min(u.length, 50), d = 0; d < o; ++d) {
        var C = u[d], v = C.latitude, A = C.longitude, D = n(v / t, A / t, s, c);
        D < a && (a = D, l = C);
    }
    return l;
};