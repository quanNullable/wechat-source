var r = function(r, n) {
    return r << n | r >>> 32 - n;
}, n = function(r, n) {
    var t, o, e, u, f;
    return e = 2147483648 & r, u = 2147483648 & n, t = 1073741824 & r, o = 1073741824 & n, 
    f = (1073741823 & r) + (1073741823 & n), t & o ? 2147483648 ^ f ^ e ^ u : t | o ? 1073741824 & f ? 3221225472 ^ f ^ e ^ u : 1073741824 ^ f ^ e ^ u : f ^ e ^ u;
}, t = function(r, n, t) {
    return r & n | ~r & t;
}, o = function(r, n, t) {
    return r & t | n & ~t;
}, e = function(r, n, t) {
    return r ^ n ^ t;
}, u = function(r, n, t) {
    return n ^ (r | ~t);
}, f = function(o, e, u, f, i, a, c) {
    return o = n(o, n(n(t(e, u, f), i), c)), n(r(o, a), e);
}, i = function(t, e, u, f, i, a, c) {
    return t = n(t, n(n(o(e, u, f), i), c)), n(r(t, a), e);
}, a = function(t, o, u, f, i, a, c) {
    return t = n(t, n(n(e(o, u, f), i), c)), n(r(t, a), o);
}, c = function(t, o, e, f, i, a, c) {
    return t = n(t, n(n(u(o, e, f), i), c)), n(r(t, a), o);
}, C = function(r) {
    for (var n, t = r.length, o = t + 8, e = 16 * ((o - o % 64) / 64 + 1), u = Array(e - 1), f = 0, i = 0; i < t; ) f = i % 4 * 8, 
    u[n = (i - i % 4) / 4] = u[n] | r.charCodeAt(i) << f, i++;
    return n = (i - i % 4) / 4, f = i % 4 * 8, u[n] = u[n] | 128 << f, u[e - 2] = t << 3, 
    u[e - 1] = t >>> 29, u;
}, g = function(r) {
    var n, t = "", o = "";
    for (n = 0; n <= 3; n++) t += (o = "0" + (r >>> 8 * n & 255).toString(16)).substr(o.length - 2, 2);
    return t;
}, h = function(r) {
    r = r.replace(/\x0d\x0a/g, "\n");
    for (var n = "", t = 0; t < r.length; t++) {
        var o = r.charCodeAt(t);
        o < 128 ? n += String.fromCharCode(o) : o > 127 && o < 2048 ? (n += String.fromCharCode(o >> 6 | 192), 
        n += String.fromCharCode(63 & o | 128)) : (n += String.fromCharCode(o >> 12 | 224), 
        n += String.fromCharCode(o >> 6 & 63 | 128), n += String.fromCharCode(63 & o | 128));
    }
    return n;
};

module.exports.md5 = function(r) {
    var t, o, e, u, d, m, v, S, l, s = Array();
    for (r = h(r), s = C(r), m = 1732584193, v = 4023233417, S = 2562383102, l = 271733878, 
    t = 0; t < s.length; t += 16) o = m, e = v, u = S, d = l, m = f(m, v, S, l, s[t + 0], 7, 3614090360), 
    l = f(l, m, v, S, s[t + 1], 12, 3905402710), S = f(S, l, m, v, s[t + 2], 17, 606105819), 
    v = f(v, S, l, m, s[t + 3], 22, 3250441966), m = f(m, v, S, l, s[t + 4], 7, 4118548399), 
    l = f(l, m, v, S, s[t + 5], 12, 1200080426), S = f(S, l, m, v, s[t + 6], 17, 2821735955), 
    v = f(v, S, l, m, s[t + 7], 22, 4249261313), m = f(m, v, S, l, s[t + 8], 7, 1770035416), 
    l = f(l, m, v, S, s[t + 9], 12, 2336552879), S = f(S, l, m, v, s[t + 10], 17, 4294925233), 
    v = f(v, S, l, m, s[t + 11], 22, 2304563134), m = f(m, v, S, l, s[t + 12], 7, 1804603682), 
    l = f(l, m, v, S, s[t + 13], 12, 4254626195), S = f(S, l, m, v, s[t + 14], 17, 2792965006), 
    v = f(v, S, l, m, s[t + 15], 22, 1236535329), m = i(m, v, S, l, s[t + 1], 5, 4129170786), 
    l = i(l, m, v, S, s[t + 6], 9, 3225465664), S = i(S, l, m, v, s[t + 11], 14, 643717713), 
    v = i(v, S, l, m, s[t + 0], 20, 3921069994), m = i(m, v, S, l, s[t + 5], 5, 3593408605), 
    l = i(l, m, v, S, s[t + 10], 9, 38016083), S = i(S, l, m, v, s[t + 15], 14, 3634488961), 
    v = i(v, S, l, m, s[t + 4], 20, 3889429448), m = i(m, v, S, l, s[t + 9], 5, 568446438), 
    l = i(l, m, v, S, s[t + 14], 9, 3275163606), S = i(S, l, m, v, s[t + 3], 14, 4107603335), 
    v = i(v, S, l, m, s[t + 8], 20, 1163531501), m = i(m, v, S, l, s[t + 13], 5, 2850285829), 
    l = i(l, m, v, S, s[t + 2], 9, 4243563512), S = i(S, l, m, v, s[t + 7], 14, 1735328473), 
    v = i(v, S, l, m, s[t + 12], 20, 2368359562), m = a(m, v, S, l, s[t + 5], 4, 4294588738), 
    l = a(l, m, v, S, s[t + 8], 11, 2272392833), S = a(S, l, m, v, s[t + 11], 16, 1839030562), 
    v = a(v, S, l, m, s[t + 14], 23, 4259657740), m = a(m, v, S, l, s[t + 1], 4, 2763975236), 
    l = a(l, m, v, S, s[t + 4], 11, 1272893353), S = a(S, l, m, v, s[t + 7], 16, 4139469664), 
    v = a(v, S, l, m, s[t + 10], 23, 3200236656), m = a(m, v, S, l, s[t + 13], 4, 681279174), 
    l = a(l, m, v, S, s[t + 0], 11, 3936430074), S = a(S, l, m, v, s[t + 3], 16, 3572445317), 
    v = a(v, S, l, m, s[t + 6], 23, 76029189), m = a(m, v, S, l, s[t + 9], 4, 3654602809), 
    l = a(l, m, v, S, s[t + 12], 11, 3873151461), S = a(S, l, m, v, s[t + 15], 16, 530742520), 
    v = a(v, S, l, m, s[t + 2], 23, 3299628645), m = c(m, v, S, l, s[t + 0], 6, 4096336452), 
    l = c(l, m, v, S, s[t + 7], 10, 1126891415), S = c(S, l, m, v, s[t + 14], 15, 2878612391), 
    v = c(v, S, l, m, s[t + 5], 21, 4237533241), m = c(m, v, S, l, s[t + 12], 6, 1700485571), 
    l = c(l, m, v, S, s[t + 3], 10, 2399980690), S = c(S, l, m, v, s[t + 10], 15, 4293915773), 
    v = c(v, S, l, m, s[t + 1], 21, 2240044497), m = c(m, v, S, l, s[t + 8], 6, 1873313359), 
    l = c(l, m, v, S, s[t + 15], 10, 4264355552), S = c(S, l, m, v, s[t + 6], 15, 2734768916), 
    v = c(v, S, l, m, s[t + 13], 21, 1309151649), m = c(m, v, S, l, s[t + 4], 6, 4149444226), 
    l = c(l, m, v, S, s[t + 11], 10, 3174756917), S = c(S, l, m, v, s[t + 2], 15, 718787259), 
    v = c(v, S, l, m, s[t + 9], 21, 3951481745), m = n(m, o), v = n(v, e), S = n(S, u), 
    l = n(l, d);
    return (g(m) + g(v) + g(S) + g(l)).toLowerCase();
};