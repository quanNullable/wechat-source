var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(r, t, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], t) : t(r.CryptoJS);
}(void 0, function(e) {
    return function() {
        function r() {
            for (var e = this._S, r = this._i, t = this._j, o = 0, i = 0; i < 4; i++) {
                t = (t + e[r = (r + 1) % 256]) % 256;
                var n = e[r];
                e[r] = e[t], e[t] = n, o |= e[(e[r] + e[t]) % 256] << 24 - 8 * i;
            }
            return this._i = r, this._j = t, o;
        }
        var t = e, o = t.lib.StreamCipher, i = t.algo, n = i.RC4 = o.extend({
            _doReset: function() {
                for (var e = this._key, r = e.words, t = e.sigBytes, o = this._S = [], i = 0; i < 256; i++) o[i] = i;
                for (var i = 0, n = 0; i < 256; i++) {
                    var c = i % t, f = r[c >>> 2] >>> 24 - c % 4 * 8 & 255;
                    n = (n + o[i] + f) % 256;
                    var s = o[i];
                    o[i] = o[n], o[n] = s;
                }
                this._i = this._j = 0;
            },
            _doProcessBlock: function(e, t) {
                e[t] ^= r.call(this);
            },
            keySize: 8,
            ivSize: 0
        });
        t.RC4 = o._createHelper(n);
        var c = i.RC4Drop = n.extend({
            cfg: n.cfg.extend({
                drop: 192
            }),
            _doReset: function() {
                n._doReset.call(this);
                for (var e = this.cfg.drop; e > 0; e--) r.call(this);
            }
        });
        t.RC4Drop = o._createHelper(c);
    }(), e.RC4;
});