var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

!function(e, r, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : o(exports)) ? module.exports = exports = r(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], r) : r(e.CryptoJS);
}(void 0, function(o) {
    return o.pad.Iso10126 = {
        pad: function(e, r) {
            var t = 4 * r, n = t - e.sigBytes % t;
            e.concat(o.lib.WordArray.random(n - 1)).concat(o.lib.WordArray.create([ n << 24 ], 1));
        },
        unpad: function(o) {
            var e = 255 & o.words[o.sigBytes - 1 >>> 2];
            o.sigBytes -= e;
        }
    }, o.pad.Iso10126;
});