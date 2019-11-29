var r = function() {
    for (var r, o = [], t = 0; t < 256; t++) {
        r = t;
        for (var n = 0; n < 8; n++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
        o[t] = r;
    }
    return o;
}();

module.exports = function(o, t, n, u) {
    var a = r, e = u + n;
    o ^= -1;
    for (var f = u; f < e; f++) o = o >>> 8 ^ a[255 & (o ^ t[f])];
    return -1 ^ o;
};