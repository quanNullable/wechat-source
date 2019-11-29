var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, r, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], r) : r(t.CryptoJS);
}(void 0, function(e) {
    return function(t) {
        var r = e, o = r.lib.CipherParams, n = r.enc.Hex;
        r.format.Hex = {
            stringify: function(e) {
                return e.ciphertext.toString(n);
            },
            parse: function(e) {
                var t = n.parse(e);
                return o.create({
                    ciphertext: t
                });
            }
        };
    }(), e.format.Hex;
});