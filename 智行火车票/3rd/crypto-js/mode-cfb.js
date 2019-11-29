var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], t) : t(o.CryptoJS);
}(void 0, function(e) {
    return e.mode.CFB = function() {
        function o(e, o, t, r) {
            var i = this._iv;
            if (i) {
                c = i.slice(0);
                this._iv = void 0;
            } else var c = this._prevBlock;
            r.encryptBlock(c, 0);
            for (var n = 0; n < t; n++) e[o + n] ^= c[n];
        }
        var t = e.lib.BlockCipherMode.extend();
        return t.Encryptor = t.extend({
            processBlock: function(e, t) {
                var r = this._cipher, i = r.blockSize;
                o.call(this, e, t, i, r), this._prevBlock = e.slice(t, t + i);
            }
        }), t.Decryptor = t.extend({
            processBlock: function(e, t) {
                var r = this._cipher, i = r.blockSize, c = e.slice(t, t + i);
                o.call(this, e, t, i, r), this._prevBlock = c;
            }
        }), t;
    }(), e.mode.CFB;
});