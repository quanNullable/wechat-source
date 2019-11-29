module.exports = function(r, t) {
    for (var e = r[0], n = r[1], o = !1, u = 0, l = t.length - 1; u < t.length; l = u++) {
        var s = t[u][0], a = t[u][1], c = t[l][0], f = t[l][1];
        a > n != f > n && e < (c - s) * (n - a) / (f - a) + s && (o = !o);
    }
    return o;
};