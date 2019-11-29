function r(r, f) {
    return void 0 === r || null === r || 0 === r.length ? r : (r = t(r), f = t(f), e(a(n(r, !0), o(n(f, !1))), !1));
}

function t(r) {
    if (/^[\x00-\x7f]*$/.test(r)) return r;
    for (var t = [], e = r.length, n = 0, o = 0; n < e; ++n, ++o) {
        var a = r.charCodeAt(n);
        if (a < 128) t[o] = r.charAt(n); else if (a < 2048) t[o] = String.fromCharCode(192 | a >> 6, 128 | 63 & a); else if (a < 55296 || a > 57343) t[o] = String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | 63 & a); else if (n + 1 < e) {
            var f = r.charCodeAt(n + 1);
            if (a < 56320 && 56320 <= f && f <= 57343) {
                var i = 65536 + ((1023 & a) << 10 | 1023 & f);
                t[o] = String.fromCharCode(240 | i >> 18 & 63, 128 | i >> 12 & 63, 128 | i >> 6 & 63, 128 | 63 & i), 
                ++n;
                continue;
            }
        }
    }
    return t.join("");
}

function e(r, t) {
    var e = r.length, n = e << 2;
    if (t) {
        var o = r[e - 1];
        if (n -= 4, o < n - 3 || o > n) return null;
        n = o;
    }
    for (var a = 0; a < e; a++) r[a] = String.fromCharCode(255 & r[a], r[a] >>> 8 & 255, r[a] >>> 16 & 255, r[a] >>> 24 & 255);
    var f = r.join("");
    return t ? f.substring(0, n) : f;
}

function n(r, t) {
    var e = r.length, n = e >> 2;
    0 != (3 & e) && ++n;
    var o;
    t ? (o = new Array(n + 1))[n] = e : o = new Array(n);
    for (var a = 0; a < e; ++a) o[a >> 2] |= r.charCodeAt(a) << ((3 & a) << 3);
    return o;
}

function o(r) {
    return r.length < 4 && (r.length = 4), r;
}

function a(r, t) {
    var e, n, o, a, f, i, u = r.length, h = u - 1;
    for (n = r[h], o = 0, i = 0 | Math.floor(6 + 52 / u); i > 0; --i) {
        for (a = (o = o + 2654435769 & 4294967295) >>> 2 & 3, f = 0; f < h; ++f) e = r[f + 1], 
        n = r[f] = r[f] + ((n >>> 5 ^ e << 2) + (e >>> 3 ^ n << 4) ^ (o ^ e) + (t[3 & f ^ a] ^ n)) & 4294967295;
        e = r[0], n = r[h] = r[h] + ((n >>> 5 ^ e << 2) + (e >>> 3 ^ n << 4) ^ (o ^ e) + (t[3 & h ^ a] ^ n)) & 4294967295;
    }
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var f = function() {
    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    return function(t) {
        var e, n, o, a, f, i, u;
        for (n = o = 0, a = t.length, i = (a -= f = a % 3) / 3 << 2, f > 0 && (i += 4), 
        e = new Array(i); n < a; ) u = t.charCodeAt(n++) << 16 | t.charCodeAt(n++) << 8 | t.charCodeAt(n++), 
        e[o++] = r[u >> 18] + r[u >> 12 & 63] + r[u >> 6 & 63] + r[63 & u];
        return 1 == f ? (u = t.charCodeAt(n++), e[o++] = r[u >> 2] + r[(3 & u) << 4] + "==") : 2 == f && (u = t.charCodeAt(n++) << 8 | t.charCodeAt(n++), 
        e[o++] = r[u >> 10] + r[u >> 4 & 63] + r[(15 & u) << 2] + "="), e.join("");
    };
}(), i = {};

i.Kaito = function(t, e) {
    return f(r(t, e));
}, exports.default = i;