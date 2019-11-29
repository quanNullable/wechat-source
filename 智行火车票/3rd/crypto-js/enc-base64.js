var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
};

!function(e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : r(exports)) ? module.exports = exports = t(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], t) : t(e.CryptoJS);
}(void 0, function(r) {
    return function() {
        function e(r, e, t) {
            for (var n = [], f = 0, i = 0; i < e; i++) if (i % 4) {
                var a = t[r.charCodeAt(i - 1)] << i % 4 * 2, c = t[r.charCodeAt(i)] >>> 6 - i % 4 * 2;
                n[f >>> 2] |= (a | c) << 24 - f % 4 * 8, f++;
            }
            return o.create(n, f);
        }
        var t = r, o = t.lib.WordArray;
        t.enc.Base64 = {
            stringify: function(r) {
                var e = r.words, t = r.sigBytes, o = this._map;
                r.clamp();
                for (var n = [], f = 0; f < t; f += 3) for (var i = (e[f >>> 2] >>> 24 - f % 4 * 8 & 255) << 16 | (e[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255) << 8 | e[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255, a = 0; a < 4 && f + .75 * a < t; a++) n.push(o.charAt(i >>> 6 * (3 - a) & 63));
                var c = o.charAt(64);
                if (c) for (;n.length % 4; ) n.push(c);
                return n.join("");
            },
            parse: function(r) {
                var t = r.length, o = this._map, n = this._reverseMap;
                if (!n) {
                    n = this._reverseMap = [];
                    for (var f = 0; f < o.length; f++) n[o.charCodeAt(f)] = f;
                }
                var i = o.charAt(64);
                if (i) {
                    var a = r.indexOf(i);
                    -1 !== a && (t = a);
                }
                return e(r, t, n);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
    }(), r.enc.Base64;
});