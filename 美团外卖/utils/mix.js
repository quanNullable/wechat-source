module.exports = function(r) {
    for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) e[n - 1] = arguments[n];
    for (var o = r, a = e.length - 1; a > -1; --a) {
        var u = (0, e[a])(o);
        u && (o = u);
    }
    return o;
};