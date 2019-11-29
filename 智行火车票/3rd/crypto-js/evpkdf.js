var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, o, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = o(require("./core"), require("./sha1"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./sha1", "./hmac" ], o) : o(t.CryptoJS);
}(void 0, function(e) {
    return function() {
        var t = e, o = t.lib, r = o.Base, n = o.WordArray, i = t.algo, f = i.MD5, c = i.EvpKDF = r.extend({
            cfg: r.extend({
                keySize: 4,
                hasher: f,
                iterations: 1
            }),
            init: function(e) {
                this.cfg = this.cfg.extend(e);
            },
            compute: function(e, t) {
                for (var o = this.cfg, r = o.hasher.create(), i = n.create(), f = i.words, c = o.keySize, u = o.iterations; f.length < c; ) {
                    a && r.update(a);
                    var a = r.update(e).finalize(t);
                    r.reset();
                    for (var s = 1; s < u; s++) a = r.finalize(a), r.reset();
                    i.concat(a);
                }
                return i.sigBytes = 4 * c, i;
            }
        });
        t.EvpKDF = function(e, t, o) {
            return c.create(o).compute(e, t);
        };
    }(), e.EvpKDF;
});