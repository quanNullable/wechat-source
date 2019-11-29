var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(r, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) ? module.exports = exports = o(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], o) : o(r.CryptoJS);
}(void 0, function(t) {
    return function(r) {
        function o(t, r, o, e, n, i, a) {
            var s = t + (r & o | ~r & e) + n + a;
            return (s << i | s >>> 32 - i) + r;
        }
        function e(t, r, o, e, n, i, a) {
            var s = t + (r & e | o & ~e) + n + a;
            return (s << i | s >>> 32 - i) + r;
        }
        function n(t, r, o, e, n, i, a) {
            var s = t + (r ^ o ^ e) + n + a;
            return (s << i | s >>> 32 - i) + r;
        }
        function i(t, r, o, e, n, i, a) {
            var s = t + (o ^ (r | ~e)) + n + a;
            return (s << i | s >>> 32 - i) + r;
        }
        var a = t, s = a.lib, c = s.WordArray, f = s.Hasher, u = a.algo, h = [];
        !function() {
            for (var t = 0; t < 64; t++) h[t] = 4294967296 * r.abs(r.sin(t + 1)) | 0;
        }();
        var l = u.MD5 = f.extend({
            _doReset: function() {
                this._hash = new c.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
            },
            _doProcessBlock: function(t, r) {
                for (var a = 0; a < 16; a++) {
                    var s = r + a, c = t[s];
                    t[s] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
                }
                var f = this._hash.words, u = t[r + 0], l = t[r + 1], y = t[r + 2], d = t[r + 3], p = t[r + 4], v = t[r + 5], _ = t[r + 6], m = t[r + 7], b = t[r + 8], S = t[r + 9], x = t[r + 10], D = t[r + 11], H = t[r + 12], M = t[r + 13], g = t[r + 14], w = t[r + 15], B = f[0], j = f[1], k = f[2], q = f[3];
                j = i(j = i(j = i(j = i(j = n(j = n(j = n(j = n(j = e(j = e(j = e(j = e(j = o(j = o(j = o(j = o(j, k = o(k, q = o(q, B = o(B, j, k, q, u, 7, h[0]), j, k, l, 12, h[1]), B, j, y, 17, h[2]), q, B, d, 22, h[3]), k = o(k, q = o(q, B = o(B, j, k, q, p, 7, h[4]), j, k, v, 12, h[5]), B, j, _, 17, h[6]), q, B, m, 22, h[7]), k = o(k, q = o(q, B = o(B, j, k, q, b, 7, h[8]), j, k, S, 12, h[9]), B, j, x, 17, h[10]), q, B, D, 22, h[11]), k = o(k, q = o(q, B = o(B, j, k, q, H, 7, h[12]), j, k, M, 12, h[13]), B, j, g, 17, h[14]), q, B, w, 22, h[15]), k = e(k, q = e(q, B = e(B, j, k, q, l, 5, h[16]), j, k, _, 9, h[17]), B, j, D, 14, h[18]), q, B, u, 20, h[19]), k = e(k, q = e(q, B = e(B, j, k, q, v, 5, h[20]), j, k, x, 9, h[21]), B, j, w, 14, h[22]), q, B, p, 20, h[23]), k = e(k, q = e(q, B = e(B, j, k, q, S, 5, h[24]), j, k, g, 9, h[25]), B, j, d, 14, h[26]), q, B, b, 20, h[27]), k = e(k, q = e(q, B = e(B, j, k, q, M, 5, h[28]), j, k, y, 9, h[29]), B, j, m, 14, h[30]), q, B, H, 20, h[31]), k = n(k, q = n(q, B = n(B, j, k, q, v, 4, h[32]), j, k, b, 11, h[33]), B, j, D, 16, h[34]), q, B, g, 23, h[35]), k = n(k, q = n(q, B = n(B, j, k, q, l, 4, h[36]), j, k, p, 11, h[37]), B, j, m, 16, h[38]), q, B, x, 23, h[39]), k = n(k, q = n(q, B = n(B, j, k, q, M, 4, h[40]), j, k, u, 11, h[41]), B, j, d, 16, h[42]), q, B, _, 23, h[43]), k = n(k, q = n(q, B = n(B, j, k, q, S, 4, h[44]), j, k, H, 11, h[45]), B, j, w, 16, h[46]), q, B, y, 23, h[47]), k = i(k, q = i(q, B = i(B, j, k, q, u, 6, h[48]), j, k, m, 10, h[49]), B, j, g, 15, h[50]), q, B, v, 21, h[51]), k = i(k, q = i(q, B = i(B, j, k, q, H, 6, h[52]), j, k, d, 10, h[53]), B, j, x, 15, h[54]), q, B, l, 21, h[55]), k = i(k, q = i(q, B = i(B, j, k, q, b, 6, h[56]), j, k, w, 10, h[57]), B, j, _, 15, h[58]), q, B, M, 21, h[59]), k = i(k, q = i(q, B = i(B, j, k, q, p, 6, h[60]), j, k, D, 10, h[61]), B, j, y, 15, h[62]), q, B, S, 21, h[63]), 
                f[0] = f[0] + B | 0, f[1] = f[1] + j | 0, f[2] = f[2] + k | 0, f[3] = f[3] + q | 0;
            },
            _doFinalize: function() {
                var t = this._data, o = t.words, e = 8 * this._nDataBytes, n = 8 * t.sigBytes;
                o[n >>> 5] |= 128 << 24 - n % 32;
                var i = r.floor(e / 4294967296), a = e;
                o[15 + (n + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), 
                o[14 + (n + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), 
                t.sigBytes = 4 * (o.length + 1), this._process();
                for (var s = this._hash, c = s.words, f = 0; f < 4; f++) {
                    var u = c[f];
                    c[f] = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8);
                }
                return s;
            },
            clone: function() {
                var t = f.clone.call(this);
                return t._hash = this._hash.clone(), t;
            }
        });
        a.MD5 = f._createHelper(l), a.HmacMD5 = f._createHmacHelper(l);
    }(Math), t.MD5;
});