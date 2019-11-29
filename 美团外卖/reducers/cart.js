function t(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t;
}

var e = require("../actions/cart.js"), r = require("../utils/find-index.js"), u = require("../utils/object-assign.js"), i = require("../utils/attrs-equal.js"), n = require("../utils/cart-cache.js");

module.exports = function() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.create(null), s = arguments[1], c = s.poiID, o = s.skuID, d = s.attrs, l = s.real_stock, f = void 0 === l ? -1 : l, p = s.min;
    ("number" != typeof p || p <= 0) && (p = 1);
    var v = -1 === f ? 1 / 0 : f;
    switch (s.type) {
      case e.CART_ADD:
        var h = a[c] || [], m = r(h, function(t) {
            var e = t.id, r = t.attrs;
            return e === o && i(d, r);
        }), _ = getApp().store.getState().poi, g = _.skuMap[o], A = _.spuMap[g._spu_id];
        n.sku.setItem(c, g), n.spu.setItem(c, A);
        var b = A.id;
        if (-1 === m) return u({}, a, t({}, c, h.concat([ {
            id: o,
            count: Math.min(p, v),
            attrs: d,
            foodid: b
        } ])));
        var j = h[m].count;
        return u({}, a, t({}, c, h.slice(0, m).concat([ {
            id: o,
            count: Math.min(Math.max(p, j + 1), v),
            attrs: d,
            foodid: b
        } ], h.slice(m + 1))));

      case e.CART_DEL:
        var T = a[c] || [], k = r(T, function(t) {
            var e = t.id, r = t.attrs;
            return e === o && i(d, r);
        });
        if (-1 === k) return a;
        var I = T[k], C = I.count, E = I.foodid, R = C - 1;
        return R < p ? u({}, a, t({}, c, T.slice(0, k).concat(T.slice(k + 1)))) : u({}, a, t({}, c, T.slice(0, k).concat([ {
            id: o,
            count: R,
            attrs: d,
            foodid: E
        } ], T.slice(k + 1))));

      case e.CART_SET_SKUS:
        for (var q = s.skus, D = a[c] || [], S = Object.create(null), y = q.length - 1; y > -1; --y) {
            var M = q[y], O = M.id, x = M.count;
            S[O] = x;
        }
        for (var L = [], w = D.length, B = 0; B < w; ++B) {
            var K = D[B], P = S[K.id];
            "number" == typeof P ? P > 0 && L.push(u({}, K, {
                count: P
            })) : L.push(K);
        }
        return u({}, a, t({}, c, L));

      case e.CART_SET:
        return s.foodlist.forEach(function(t) {
            t.skus.forEach(function(e) {
                e._spu_id = t.id, e.tagBelongTo = t.tag, n.sku.setItem(c, e);
            }), n.spu.setItem(c, t);
        }), u({}, a, t({}, c, s.cart));

      case e.CART_CLEAR:
        return a[c] ? Object.keys(a).reduce(function(t, e) {
            return e !== "" + c && (t[e] = a[e]), t;
        }, {}) : a;

      case e.CART_VALIDATE:
        var U = s.data.skuIds, V = a[c];
        return V ? u({}, a, t({}, c, V.filter(function(t) {
            return -1 !== U.indexOf(String(t.id));
        }))) : a;

      default:
        return a;
    }
};