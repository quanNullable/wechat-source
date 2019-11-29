var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

!function(e, t, n) {
    "object" === ("undefined" == typeof exports ? "undefined" : o(exports)) ? module.exports = exports = t(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], t) : t(e.CryptoJS);
}(void 0, function(o) {
    return o.pad.Iso97971 = {
        pad: function(e, t) {
            e.concat(o.lib.WordArray.create([ 2147483648 ], 1)), o.pad.ZeroPadding.pad(e, t);
        },
        unpad: function(e) {
            o.pad.ZeroPadding.unpad(e), e.sigBytes--;
        }
    }, o.pad.Iso97971;
});