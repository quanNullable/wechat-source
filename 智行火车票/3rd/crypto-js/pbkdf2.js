var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, r, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core"), require("./sha1"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./sha1", "./hmac" ], r) : r(t.CryptoJS);
}(void 0, function(e) {
    return function() {
        var t = e, r = t.lib, o = r.Base, n = r.WordArray, i = t.algo, f = i.SHA1, c = i.HMAC, a = i.PBKDF2 = o.extend({
            cfg: o.extend({
                keySize: 4,
                hasher: f,
                iterations: 1
            }),
            init: function(e) {
                this.cfg = this.cfg.extend(e);
            },
            compute: function(e, t) {
                for (var r = this.cfg, o = c.create(r.hasher, e), i = n.create(), f = n.create([ 1 ]), a = i.words, s = f.words, u = r.keySize, y = r.iterations; a.length < u; ) {
                    var d = o.update(t).finalize(f);
                    o.reset();
                    for (var p = d.words, l = p.length, h = d, m = 1; m < y; m++) {
                        h = o.finalize(h), o.reset();
                        for (var b = h.words, S = 0; S < l; S++) p[S] ^= b[S];
                    }
                    i.concat(d), s[0]++;
                }
                return i.sigBytes = 4 * u, i;
            }
        });
        t.PBKDF2 = function(e, t, r) {
            return a.create(r).compute(e, t);
        };
    }(), e.PBKDF2;
});