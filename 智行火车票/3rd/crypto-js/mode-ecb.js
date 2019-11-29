var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], t) : t(o.CryptoJS);
}(void 0, function(e) {
    return e.mode.ECB = function() {
        var o = e.lib.BlockCipherMode.extend();
        return o.Encryptor = o.extend({
            processBlock: function(e, o) {
                this._cipher.encryptBlock(e, o);
            }
        }), o.Decryptor = o.extend({
            processBlock: function(e, o) {
                this._cipher.decryptBlock(e, o);
            }
        }), o;
    }(), e.mode.ECB;
});