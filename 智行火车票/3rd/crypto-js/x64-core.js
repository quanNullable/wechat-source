var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

!function(t, e) {
    "object" === ("undefined" == typeof exports ? "undefined" : o(exports)) ? module.exports = exports = e(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], e) : e(t.CryptoJS);
}(void 0, function(o) {
    return function(t) {
        var e = o, n = e.lib, r = n.Base, i = n.WordArray, s = e.x64 = {};
        s.Word = r.extend({
            init: function(o, t) {
                this.high = o, this.low = t;
            }
        }), s.WordArray = r.extend({
            init: function(o, t) {
                o = this.words = o || [], this.sigBytes = void 0 != t ? t : 8 * o.length;
            },
            toX32: function() {
                for (var o = this.words, t = o.length, e = [], n = 0; n < t; n++) {
                    var r = o[n];
                    e.push(r.high), e.push(r.low);
                }
                return i.create(e, this.sigBytes);
            },
            clone: function() {
                for (var o = r.clone.call(this), t = o.words = this.words.slice(0), e = t.length, n = 0; n < e; n++) t[n] = t[n].clone();
                return o;
            }
        });
    }(), o;
});