var t = Math.sin, a = Math.cos, h = Math.sqrt, o = Math.asin;

module.exports = function(r, s, M, n) {
    var e = .01745329251994329, i = r * e, p = s * e, u = M * e, c = n * e, w = t(i), v = t(p), d = a(i), f = a(p), l = t(u), m = t(c), q = a(u), x = d * f, b = d * v, g = q * a(c), j = q * m, k = h(Math.pow(x - g, 2) + Math.pow(b - j, 2) + Math.pow(w - l, 2));
    return 12742001.5798544 * o(k / 2);
};