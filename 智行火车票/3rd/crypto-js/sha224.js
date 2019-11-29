var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, t, n) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./sha256")) : "function" == typeof define && define.amd ? define([ "./core", "./sha256" ], t) : t(o.CryptoJS);
}(void 0, function(e) {
    return function() {
        var o = e, t = o.lib.WordArray, n = o.algo, r = n.SHA256, i = n.SHA224 = r.extend({
            _doReset: function() {
                this._hash = new t.init([ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ]);
            },
            _doFinalize: function() {
                var e = r._doFinalize.call(this);
                return e.sigBytes -= 4, e;
            }
        });
        o.SHA224 = r._createHelper(i), o.HmacSHA224 = r._createHmacHelper(i);
    }(), e.SHA224;
});