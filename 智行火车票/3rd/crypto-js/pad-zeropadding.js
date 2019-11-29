var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], t) : t(o.CryptoJS);
}(void 0, function(e) {
    return e.pad.ZeroPadding = {
        pad: function(e, o) {
            var t = 4 * o;
            e.clamp(), e.sigBytes += t - (e.sigBytes % t || t);
        },
        unpad: function(e) {
            for (var o = e.words, t = e.sigBytes - 1; !(o[t >>> 2] >>> 24 - t % 4 * 8 & 255); ) t--;
            e.sigBytes = t + 1;
        }
    }, e.pad.ZeroPadding;
});