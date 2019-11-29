var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

!function(r, t, e) {
    "object" === ("undefined" == typeof exports ? "undefined" : o(exports)) ? module.exports = exports = t(require("./core"), require("./x64-core")) : "function" == typeof define && define.amd ? define([ "./core", "./x64-core" ], t) : t(r.CryptoJS);
}(void 0, function(o) {
    return function(r) {
        var t = o, e = t.lib, i = e.WordArray, n = e.Hasher, h = t.x64.Word, a = t.algo, f = [], c = [], l = [];
        !function() {
            for (var o = 1, r = 0, t = 0; t < 24; t++) {
                f[o + 5 * r] = (t + 1) * (t + 2) / 2 % 64;
                var e = (2 * o + 3 * r) % 5;
                o = r % 5, r = e;
            }
            for (o = 0; o < 5; o++) for (r = 0; r < 5; r++) c[o + 5 * r] = r + (2 * o + 3 * r) % 5 * 5;
            for (var i = 1, n = 0; n < 24; n++) {
                for (var a = 0, s = 0, u = 0; u < 7; u++) {
                    if (1 & i) {
                        var v = (1 << u) - 1;
                        v < 32 ? s ^= 1 << v : a ^= 1 << v - 32;
                    }
                    128 & i ? i = i << 1 ^ 113 : i <<= 1;
                }
                l[n] = h.create(a, s);
            }
        }();
        var s = [];
        !function() {
            for (var o = 0; o < 25; o++) s[o] = h.create();
        }();
        var u = a.SHA3 = n.extend({
            cfg: n.cfg.extend({
                outputLength: 512
            }),
            _doReset: function() {
                for (var o = this._state = [], r = 0; r < 25; r++) o[r] = new h.init();
                this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(o, r) {
                for (var t = this._state, e = this.blockSize / 2, i = 0; i < e; i++) {
                    var n = o[r + 2 * i], h = o[r + 2 * i + 1];
                    n = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8), h = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8), 
                    (B = t[i]).high ^= h, B.low ^= n;
                }
                for (var a = 0; a < 24; a++) {
                    for (z = 0; z < 5; z++) {
                        for (var u = 0, v = 0, g = 0; g < 5; g++) u ^= (B = t[z + 5 * g]).high, v ^= B.low;
                        var p = s[z];
                        p.high = u, p.low = v;
                    }
                    for (z = 0; z < 5; z++) for (var w = s[(z + 4) % 5], y = s[(z + 1) % 5], d = y.high, S = y.low, u = w.high ^ (d << 1 | S >>> 31), v = w.low ^ (S << 1 | d >>> 31), g = 0; g < 5; g++) (B = t[z + 5 * g]).high ^= u, 
                    B.low ^= v;
                    for (var _ = 1; _ < 25; _++) {
                        var b = (B = t[_]).high, m = B.low, x = f[_];
                        if (x < 32) var u = b << x | m >>> 32 - x, v = m << x | b >>> 32 - x; else var u = m << x - 32 | b >>> 64 - x, v = b << x - 32 | m >>> 64 - x;
                        var H = s[c[_]];
                        H.high = u, H.low = v;
                    }
                    var A = s[0], k = t[0];
                    A.high = k.high, A.low = k.low;
                    for (var z = 0; z < 5; z++) for (g = 0; g < 5; g++) {
                        var B = t[_ = z + 5 * g], L = s[_], q = s[(z + 1) % 5 + 5 * g], W = s[(z + 2) % 5 + 5 * g];
                        B.high = L.high ^ ~q.high & W.high, B.low = L.low ^ ~q.low & W.low;
                    }
                    var B = t[0], j = l[a];
                    B.high ^= j.high, B.low ^= j.low;
                }
            },
            _doFinalize: function() {
                var o = this._data, t = o.words, e = (this._nDataBytes, 8 * o.sigBytes), n = 32 * this.blockSize;
                t[e >>> 5] |= 1 << 24 - e % 32, t[(r.ceil((e + 1) / n) * n >>> 5) - 1] |= 128, o.sigBytes = 4 * t.length, 
                this._process();
                for (var h = this._state, a = this.cfg.outputLength / 8, f = a / 8, c = [], l = 0; l < f; l++) {
                    var s = h[l], u = s.high, v = s.low;
                    u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8), v = 16711935 & (v << 8 | v >>> 24) | 4278255360 & (v << 24 | v >>> 8), 
                    c.push(v), c.push(u);
                }
                return new i.init(c, a);
            },
            clone: function() {
                for (var o = n.clone.call(this), r = o._state = this._state.slice(0), t = 0; t < 25; t++) r[t] = r[t].clone();
                return o;
            }
        });
        t.SHA3 = n._createHelper(u), t.HmacSHA3 = n._createHmacHelper(u);
    }(Math), o.SHA3;
});