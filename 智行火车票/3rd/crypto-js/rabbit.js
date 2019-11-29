var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, r, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], r) : r(o.CryptoJS);
}(void 0, function(e) {
    return function() {
        function o() {
            for (var e = this._X, o = this._C, r = 0; r < 8; r++) n[r] = o[r];
            o[0] = o[0] + 1295307597 + this._b | 0, o[1] = o[1] + 3545052371 + (o[0] >>> 0 < n[0] >>> 0 ? 1 : 0) | 0, 
            o[2] = o[2] + 886263092 + (o[1] >>> 0 < n[1] >>> 0 ? 1 : 0) | 0, o[3] = o[3] + 1295307597 + (o[2] >>> 0 < n[2] >>> 0 ? 1 : 0) | 0, 
            o[4] = o[4] + 3545052371 + (o[3] >>> 0 < n[3] >>> 0 ? 1 : 0) | 0, o[5] = o[5] + 886263092 + (o[4] >>> 0 < n[4] >>> 0 ? 1 : 0) | 0, 
            o[6] = o[6] + 1295307597 + (o[5] >>> 0 < n[5] >>> 0 ? 1 : 0) | 0, o[7] = o[7] + 3545052371 + (o[6] >>> 0 < n[6] >>> 0 ? 1 : 0) | 0, 
            this._b = o[7] >>> 0 < n[7] >>> 0 ? 1 : 0;
            for (r = 0; r < 8; r++) {
                var t = e[r] + o[r], i = 65535 & t, c = t >>> 16, s = ((i * i >>> 17) + i * c >>> 15) + c * c, u = ((4294901760 & t) * t | 0) + ((65535 & t) * t | 0);
                f[r] = s ^ u;
            }
            e[0] = f[0] + (f[7] << 16 | f[7] >>> 16) + (f[6] << 16 | f[6] >>> 16) | 0, e[1] = f[1] + (f[0] << 8 | f[0] >>> 24) + f[7] | 0, 
            e[2] = f[2] + (f[1] << 16 | f[1] >>> 16) + (f[0] << 16 | f[0] >>> 16) | 0, e[3] = f[3] + (f[2] << 8 | f[2] >>> 24) + f[1] | 0, 
            e[4] = f[4] + (f[3] << 16 | f[3] >>> 16) + (f[2] << 16 | f[2] >>> 16) | 0, e[5] = f[5] + (f[4] << 8 | f[4] >>> 24) + f[3] | 0, 
            e[6] = f[6] + (f[5] << 16 | f[5] >>> 16) + (f[4] << 16 | f[4] >>> 16) | 0, e[7] = f[7] + (f[6] << 8 | f[6] >>> 24) + f[5] | 0;
        }
        var r = e, t = r.lib.StreamCipher, i = [], n = [], f = [], c = r.algo.Rabbit = t.extend({
            _doReset: function() {
                for (var e = this._key.words, r = this.cfg.iv, t = 0; t < 4; t++) e[t] = 16711935 & (e[t] << 8 | e[t] >>> 24) | 4278255360 & (e[t] << 24 | e[t] >>> 8);
                var i = this._X = [ e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16 ], n = this._C = [ e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0] ];
                this._b = 0;
                for (t = 0; t < 4; t++) o.call(this);
                for (t = 0; t < 8; t++) n[t] ^= i[t + 4 & 7];
                if (r) {
                    var f = r.words, c = f[0], s = f[1], u = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), a = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), b = u >>> 16 | 4294901760 & a, p = a << 16 | 65535 & u;
                    n[0] ^= u, n[1] ^= b, n[2] ^= a, n[3] ^= p, n[4] ^= u, n[5] ^= b, n[6] ^= a, n[7] ^= p;
                    for (t = 0; t < 4; t++) o.call(this);
                }
            },
            _doProcessBlock: function(e, r) {
                var t = this._X;
                o.call(this), i[0] = t[0] ^ t[5] >>> 16 ^ t[3] << 16, i[1] = t[2] ^ t[7] >>> 16 ^ t[5] << 16, 
                i[2] = t[4] ^ t[1] >>> 16 ^ t[7] << 16, i[3] = t[6] ^ t[3] >>> 16 ^ t[1] << 16;
                for (var n = 0; n < 4; n++) i[n] = 16711935 & (i[n] << 8 | i[n] >>> 24) | 4278255360 & (i[n] << 24 | i[n] >>> 8), 
                e[r + n] ^= i[n];
            },
            blockSize: 4,
            ivSize: 2
        });
        r.Rabbit = t._createHelper(c);
    }(), e.Rabbit;
});