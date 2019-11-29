var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = o(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], o) : o(t.CryptoJS);
}(void 0, function(e) {
    !function() {
        var t = e, o = t.lib.Base, i = t.enc.Utf8;
        t.algo.HMAC = o.extend({
            init: function(e, t) {
                e = this._hasher = new e.init(), "string" == typeof t && (t = i.parse(t));
                var o = e.blockSize, n = 4 * o;
                t.sigBytes > n && (t = e.finalize(t)), t.clamp();
                for (var r = this._oKey = t.clone(), s = this._iKey = t.clone(), f = r.words, c = s.words, u = 0; u < o; u++) f[u] ^= 1549556828, 
                c[u] ^= 909522486;
                r.sigBytes = s.sigBytes = n, this.reset();
            },
            reset: function() {
                var e = this._hasher;
                e.reset(), e.update(this._iKey);
            },
            update: function(e) {
                return this._hasher.update(e), this;
            },
            finalize: function(e) {
                var t = this._hasher, o = t.finalize(e);
                return t.reset(), t.finalize(this._oKey.clone().concat(o));
            }
        });
    }();
});