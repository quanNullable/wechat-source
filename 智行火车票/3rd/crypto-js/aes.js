var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, r, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], r) : r(o.CryptoJS);
}(void 0, function(e) {
    return function() {
        var o = e, r = o.lib.BlockCipher, t = o.algo, i = [], n = [], c = [], f = [], s = [], u = [], y = [], d = [], p = [], l = [];
        !function() {
            for (var e = [], o = 0; o < 256; o++) e[o] = o < 128 ? o << 1 : o << 1 ^ 283;
            for (var r = 0, t = 0, o = 0; o < 256; o++) {
                var a = t ^ t << 1 ^ t << 2 ^ t << 3 ^ t << 4;
                a = a >>> 8 ^ 255 & a ^ 99, i[r] = a, n[a] = r;
                var h = e[r], v = e[h], _ = e[v], k = 257 * e[a] ^ 16843008 * a;
                c[r] = k << 24 | k >>> 8, f[r] = k << 16 | k >>> 16, s[r] = k << 8 | k >>> 24, u[r] = k;
                k = 16843009 * _ ^ 65537 * v ^ 257 * h ^ 16843008 * r;
                y[a] = k << 24 | k >>> 8, d[a] = k << 16 | k >>> 16, p[a] = k << 8 | k >>> 24, l[a] = k, 
                r ? (r = h ^ e[e[e[_ ^ h]]], t ^= e[e[t]]) : r = t = 1;
            }
        }();
        var a = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], h = t.AES = r.extend({
            _doReset: function() {
                if (!this._nRounds || this._keyPriorReset !== this._key) {
                    for (var e = this._keyPriorReset = this._key, o = e.words, r = e.sigBytes / 4, t = 4 * ((this._nRounds = r + 6) + 1), n = this._keySchedule = [], c = 0; c < t; c++) if (c < r) n[c] = o[c]; else {
                        u = n[c - 1];
                        c % r ? r > 6 && c % r == 4 && (u = i[u >>> 24] << 24 | i[u >>> 16 & 255] << 16 | i[u >>> 8 & 255] << 8 | i[255 & u]) : (u = i[(u = u << 8 | u >>> 24) >>> 24] << 24 | i[u >>> 16 & 255] << 16 | i[u >>> 8 & 255] << 8 | i[255 & u], 
                        u ^= a[c / r | 0] << 24), n[c] = n[c - r] ^ u;
                    }
                    for (var f = this._invKeySchedule = [], s = 0; s < t; s++) {
                        c = t - s;
                        if (s % 4) u = n[c]; else var u = n[c - 4];
                        f[s] = s < 4 || c <= 4 ? u : y[i[u >>> 24]] ^ d[i[u >>> 16 & 255]] ^ p[i[u >>> 8 & 255]] ^ l[i[255 & u]];
                    }
                }
            },
            encryptBlock: function(e, o) {
                this._doCryptBlock(e, o, this._keySchedule, c, f, s, u, i);
            },
            decryptBlock: function(e, o) {
                r = e[o + 1];
                e[o + 1] = e[o + 3], e[o + 3] = r, this._doCryptBlock(e, o, this._invKeySchedule, y, d, p, l, n);
                var r = e[o + 1];
                e[o + 1] = e[o + 3], e[o + 3] = r;
            },
            _doCryptBlock: function(e, o, r, t, i, n, c, f) {
                for (var s = this._nRounds, u = e[o] ^ r[0], y = e[o + 1] ^ r[1], d = e[o + 2] ^ r[2], p = e[o + 3] ^ r[3], l = 4, a = 1; a < s; a++) {
                    var h = t[u >>> 24] ^ i[y >>> 16 & 255] ^ n[d >>> 8 & 255] ^ c[255 & p] ^ r[l++], v = t[y >>> 24] ^ i[d >>> 16 & 255] ^ n[p >>> 8 & 255] ^ c[255 & u] ^ r[l++], _ = t[d >>> 24] ^ i[p >>> 16 & 255] ^ n[u >>> 8 & 255] ^ c[255 & y] ^ r[l++], k = t[p >>> 24] ^ i[u >>> 16 & 255] ^ n[y >>> 8 & 255] ^ c[255 & d] ^ r[l++];
                    u = h, y = v, d = _, p = k;
                }
                var h = (f[u >>> 24] << 24 | f[y >>> 16 & 255] << 16 | f[d >>> 8 & 255] << 8 | f[255 & p]) ^ r[l++], v = (f[y >>> 24] << 24 | f[d >>> 16 & 255] << 16 | f[p >>> 8 & 255] << 8 | f[255 & u]) ^ r[l++], _ = (f[d >>> 24] << 24 | f[p >>> 16 & 255] << 16 | f[u >>> 8 & 255] << 8 | f[255 & y]) ^ r[l++], k = (f[p >>> 24] << 24 | f[u >>> 16 & 255] << 16 | f[y >>> 8 & 255] << 8 | f[255 & d]) ^ r[l++];
                e[o] = h, e[o + 1] = v, e[o + 2] = _, e[o + 3] = k;
            },
            keySize: 8
        });
        o.AES = r._createHelper(h);
    }(), e.AES;
});