module.exports = function(r, t) {
    r || (r = []);
    for (var e = r.length, n = 0; n < e; ++n) if (t(r[n], n)) return n;
    return -1;
};