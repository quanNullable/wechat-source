var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], t) : t(o.CryptoJS);
}(void 0, function(e) {
    return e.mode.OFB = function() {
        var o = e.lib.BlockCipherMode.extend(), t = o.Encryptor = o.extend({
            processBlock: function(e, o) {
                var t = this._cipher, r = t.blockSize, i = this._iv, n = this._keystream;
                i && (n = this._keystream = i.slice(0), this._iv = void 0), t.encryptBlock(n, 0);
                for (var c = 0; c < r; c++) e[o + c] ^= n[c];
            }
        });
        return o.Decryptor = t, o;
    }(), e.mode.OFB;
});