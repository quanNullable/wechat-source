function r(r, o) {
    if (o < 65537 && (r.subarray && e || !r.subarray && t)) return String.fromCharCode.apply(null, n.shrinkBuf(r, o));
    for (var f = "", u = 0; u < o; u++) f += String.fromCharCode(r[u]);
    return f;
}

var n = require("./common.js"), t = !0, e = !0;

try {
    String.fromCharCode.apply(null, [ 0 ]);
} catch (r) {
    t = !1;
}

try {
    String.fromCharCode.apply(null, new Uint8Array(1));
} catch (r) {
    e = !1;
}

for (var o = new n.Buf8(256), f = 0; f < 256; f++) o[f] = f >= 252 ? 6 : f >= 248 ? 5 : f >= 240 ? 4 : f >= 224 ? 3 : f >= 192 ? 2 : 1;

o[254] = o[254] = 1, exports.string2buf = function(r) {
    var t, e, o, f, u, a = r.length, i = 0;
    for (f = 0; f < a; f++) 55296 == (64512 & (e = r.charCodeAt(f))) && f + 1 < a && 56320 == (64512 & (o = r.charCodeAt(f + 1))) && (e = 65536 + (e - 55296 << 10) + (o - 56320), 
    f++), i += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
    for (t = new n.Buf8(i), u = 0, f = 0; u < i; f++) 55296 == (64512 & (e = r.charCodeAt(f))) && f + 1 < a && 56320 == (64512 & (o = r.charCodeAt(f + 1))) && (e = 65536 + (e - 55296 << 10) + (o - 56320), 
    f++), e < 128 ? t[u++] = e : e < 2048 ? (t[u++] = 192 | e >>> 6, t[u++] = 128 | 63 & e) : e < 65536 ? (t[u++] = 224 | e >>> 12, 
    t[u++] = 128 | e >>> 6 & 63, t[u++] = 128 | 63 & e) : (t[u++] = 240 | e >>> 18, 
    t[u++] = 128 | e >>> 12 & 63, t[u++] = 128 | e >>> 6 & 63, t[u++] = 128 | 63 & e);
    return t;
}, exports.buf2binstring = function(n) {
    return r(n, n.length);
}, exports.binstring2buf = function(r) {
    for (var t = new n.Buf8(r.length), e = 0, o = t.length; e < o; e++) t[e] = r.charCodeAt(e);
    return t;
}, exports.buf2string = function(n, t) {
    var e, f, u, a, i = t || n.length, h = new Array(2 * i);
    for (f = 0, e = 0; e < i; ) if ((u = n[e++]) < 128) h[f++] = u; else if ((a = o[u]) > 4) h[f++] = 65533, 
    e += a - 1; else {
        for (u &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && e < i; ) u = u << 6 | 63 & n[e++], 
        a--;
        a > 1 ? h[f++] = 65533 : u < 65536 ? h[f++] = u : (u -= 65536, h[f++] = 55296 | u >> 10 & 1023, 
        h[f++] = 56320 | 1023 & u);
    }
    return r(h, f);
}, exports.utf8border = function(r, n) {
    var t;
    for ((n = n || r.length) > r.length && (n = r.length), t = n - 1; t >= 0 && 128 == (192 & r[t]); ) t--;
    return t < 0 ? n : 0 === t ? n : t + o[r[t]] > n ? t : n;
};