var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], t) : t(o.CryptoJS);
}(void 0, function(e) {
    return e.mode.CTR = function() {
        var o = e.lib.BlockCipherMode.extend(), t = o.Encryptor = o.extend({
            processBlock: function(e, o) {
                var t = this._cipher, r = t.blockSize, n = this._iv, i = this._counter;
                n && (i = this._counter = n.slice(0), this._iv = void 0);
                var c = i.slice(0);
                t.encryptBlock(c, 0), i[r - 1] = i[r - 1] + 1 | 0;
                for (var f = 0; f < r; f++) e[o + f] ^= c[f];
            }
        });
        return o.Decryptor = t, o;
    }(), e.mode.CTR;
});