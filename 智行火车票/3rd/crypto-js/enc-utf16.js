var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
};

!function(t, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : r(exports)) ? module.exports = exports = o(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], o) : o(t.CryptoJS);
}(void 0, function(r) {
    return function() {
        function t(r) {
            return r << 8 & 4278255360 | r >>> 8 & 16711935;
        }
        var o = r, e = o.lib.WordArray, n = o.enc;
        n.Utf16 = n.Utf16BE = {
            stringify: function(r) {
                for (var t = r.words, o = r.sigBytes, e = [], n = 0; n < o; n += 2) {
                    var f = t[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                    e.push(String.fromCharCode(f));
                }
                return e.join("");
            },
            parse: function(r) {
                for (var t = r.length, o = [], n = 0; n < t; n++) o[n >>> 1] |= r.charCodeAt(n) << 16 - n % 2 * 16;
                return e.create(o, 2 * t);
            }
        };
        n.Utf16LE = {
            stringify: function(r) {
                for (var o = r.words, e = r.sigBytes, n = [], f = 0; f < e; f += 2) {
                    var i = t(o[f >>> 2] >>> 16 - f % 4 * 8 & 65535);
                    n.push(String.fromCharCode(i));
                }
                return n.join("");
            },
            parse: function(r) {
                for (var o = r.length, n = [], f = 0; f < o; f++) n[f >>> 1] |= t(r.charCodeAt(f) << 16 - f % 2 * 16);
                return e.create(n, 2 * o);
            }
        };
    }(), r.enc.Utf16;
});