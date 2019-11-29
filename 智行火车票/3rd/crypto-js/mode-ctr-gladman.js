var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, r, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], r) : r(o.CryptoJS);
}(void 0, function(e) {
    return e.mode.CTRGladman = function() {
        function o(e) {
            if (255 == (e >> 24 & 255)) {
                var o = e >> 16 & 255, r = e >> 8 & 255, t = 255 & e;
                255 === o ? (o = 0, 255 === r ? (r = 0, 255 === t ? t = 0 : ++t) : ++r) : ++o, e = 0, 
                e += o << 16, e += r << 8, e += t;
            } else e += 1 << 24;
            return e;
        }
        function r(e) {
            return 0 === (e[0] = o(e[0])) && (e[1] = o(e[1])), e;
        }
        var t = e.lib.BlockCipherMode.extend(), n = t.Encryptor = t.extend({
            processBlock: function(e, o) {
                var t = this._cipher, n = t.blockSize, i = this._iv, c = this._counter;
                i && (c = this._counter = i.slice(0), this._iv = void 0), r(c);
                var u = c.slice(0);
                t.encryptBlock(u, 0);
                for (var f = 0; f < n; f++) e[o + f] ^= u[f];
            }
        });
        return t.Decryptor = n, t;
    }(), e.mode.CTRGladman;
});