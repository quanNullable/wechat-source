var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = o(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], o) : o(t.CryptoJS);
}(void 0, function(e) {
    return function() {
        var t = e, o = t.lib, n = o.WordArray, r = o.Hasher, i = [], s = t.algo.SHA1 = r.extend({
            _doReset: function() {
                this._hash = new n.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
            },
            _doProcessBlock: function(e, t) {
                for (var o = this._hash.words, n = o[0], r = o[1], s = o[2], c = o[3], a = o[4], f = 0; f < 80; f++) {
                    if (f < 16) i[f] = 0 | e[t + f]; else {
                        var u = i[f - 3] ^ i[f - 8] ^ i[f - 14] ^ i[f - 16];
                        i[f] = u << 1 | u >>> 31;
                    }
                    var l = (n << 5 | n >>> 27) + a + i[f];
                    l += f < 20 ? 1518500249 + (r & s | ~r & c) : f < 40 ? 1859775393 + (r ^ s ^ c) : f < 60 ? (r & s | r & c | s & c) - 1894007588 : (r ^ s ^ c) - 899497514, 
                    a = c, c = s, s = r << 30 | r >>> 2, r = n, n = l;
                }
                o[0] = o[0] + n | 0, o[1] = o[1] + r | 0, o[2] = o[2] + s | 0, o[3] = o[3] + c | 0, 
                o[4] = o[4] + a | 0;
            },
            _doFinalize: function() {
                var e = this._data, t = e.words, o = 8 * this._nDataBytes, n = 8 * e.sigBytes;
                return t[n >>> 5] |= 128 << 24 - n % 32, t[14 + (n + 64 >>> 9 << 4)] = Math.floor(o / 4294967296), 
                t[15 + (n + 64 >>> 9 << 4)] = o, e.sigBytes = 4 * t.length, this._process(), this._hash;
            },
            clone: function() {
                var e = r.clone.call(this);
                return e._hash = this._hash.clone(), e;
            }
        });
        t.SHA1 = r._createHelper(s), t.HmacSHA1 = r._createHmacHelper(s);
    }(), e.SHA1;
});