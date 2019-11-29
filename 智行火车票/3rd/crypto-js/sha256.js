var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = o(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], o) : o(t.CryptoJS);
}(void 0, function(e) {
    return function(t) {
        var o = e, r = o.lib, n = r.WordArray, i = r.Hasher, s = o.algo, c = [], f = [];
        !function() {
            function e(e) {
                return 4294967296 * (e - (0 | e)) | 0;
            }
            for (var o = 2, r = 0; r < 64; ) (function(e) {
                for (var o = t.sqrt(e), r = 2; r <= o; r++) if (!(e % r)) return !1;
                return !0;
            })(o) && (r < 8 && (c[r] = e(t.pow(o, .5))), f[r] = e(t.pow(o, 1 / 3)), r++), o++;
        }();
        var a = [], u = s.SHA256 = i.extend({
            _doReset: function() {
                this._hash = new n.init(c.slice(0));
            },
            _doProcessBlock: function(e, t) {
                for (var o = this._hash.words, r = o[0], n = o[1], i = o[2], s = o[3], c = o[4], u = o[5], l = o[6], h = o[7], y = 0; y < 64; y++) {
                    if (y < 16) a[y] = 0 | e[t + y]; else {
                        var p = a[y - 15], d = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3, _ = a[y - 2], m = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10;
                        a[y] = d + a[y - 7] + m + a[y - 16];
                    }
                    var v = r & n ^ r & i ^ n & i, S = (r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22), b = h + ((c << 26 | c >>> 6) ^ (c << 21 | c >>> 11) ^ (c << 7 | c >>> 25)) + (c & u ^ ~c & l) + f[y] + a[y];
                    h = l, l = u, u = c, c = s + b | 0, s = i, i = n, n = r, r = b + (S + v) | 0;
                }
                o[0] = o[0] + r | 0, o[1] = o[1] + n | 0, o[2] = o[2] + i | 0, o[3] = o[3] + s | 0, 
                o[4] = o[4] + c | 0, o[5] = o[5] + u | 0, o[6] = o[6] + l | 0, o[7] = o[7] + h | 0;
            },
            _doFinalize: function() {
                var e = this._data, o = e.words, r = 8 * this._nDataBytes, n = 8 * e.sigBytes;
                return o[n >>> 5] |= 128 << 24 - n % 32, o[14 + (n + 64 >>> 9 << 4)] = t.floor(r / 4294967296), 
                o[15 + (n + 64 >>> 9 << 4)] = r, e.sigBytes = 4 * o.length, this._process(), this._hash;
            },
            clone: function() {
                var e = i.clone.call(this);
                return e._hash = this._hash.clone(), e;
            }
        });
        o.SHA256 = i._createHelper(u), o.HmacSHA256 = i._createHmacHelper(u);
    }(Math), e.SHA256;
});