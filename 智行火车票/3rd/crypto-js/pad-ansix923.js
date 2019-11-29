var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, t, n) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], t) : t(o.CryptoJS);
}(void 0, function(e) {
    return e.pad.AnsiX923 = {
        pad: function(e, o) {
            var t = e.sigBytes, n = 4 * o, r = n - t % n, i = t + r - 1;
            e.clamp(), e.words[i >>> 2] |= r << 24 - i % 4 * 8, e.sigBytes += r;
        },
        unpad: function(e) {
            var o = 255 & e.words[e.sigBytes - 1 >>> 2];
            e.sigBytes -= o;
        }
    }, e.pad.Ansix923;
});