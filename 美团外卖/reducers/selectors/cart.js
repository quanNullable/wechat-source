module.exports = function(t) {
    var a = t.poi, o = a.id, r = a.skuMap, n = a.spuMap, i = a.data, e = a.food_spu_tags, c = t.cart[o], u = 0, s = 0, h = 0, f = 0, d = 0, p = Object.create(null), l = [], M = {};
    if (i && o && 1 === i.poi_info.status) {
        var v = i.poi_info.min_price;
        if (c) for (var _ = c.length, g = 0; g < _; ++g) {
            var m = c[g], y = m.count, x = m.id, b = m.attrs, C = m.foodid, k = r[x];
            if (k) {
                var j = k._spu_id, E = k.spec, S = k.price, T = k.origin_price, B = k.box_price, N = k.box_num, O = k.status, q = k.activity_stock, w = k.restrict, z = -1 === q ? 1 / 0 : q;
                if (0 === O) {
                    var A = n[j], D = A.name, F = A.activity_type, G = 0, H = 0, I = !1;
                    if (d += y * Math.round(100 * T), 0 === F) G = y * Math.round(100 * S); else if (1 === F) {
                        var J = 0 === w ? 9999 : w, K = -1 === z ? 9999 : z;
                        G = (H = Math.min(y, J, K)) * Math.round(100 * S) + (y - H) * Math.round(100 * T), 
                        I = !I && y === Math.min(w, z) + 1;
                    } else if (2 === F) {
                        if (-1 === q) {
                            var L = Math.floor(y / 2);
                            H = L;
                            var P = Math.floor(S / 2 * 100);
                            G = y * Math.round(100 * S) - L * P;
                        } else if (-1 !== q) {
                            var Q = Math.min(q, Math.floor(y / 2));
                            H = Q, G = Math.round(100 * S) * y - Q * Math.floor(S / 2 * 100);
                        }
                    } else 3 === F && (G = y * Math.round(100 * S));
                    s += G;
                    var R = [];
                    E && R.push(E), b.length > 0 && (R = R.concat(b.map(function(t) {
                        return t.value;
                    })));
                    var U = R.length > 0 ? "+" + R.join("+") : "";
                    l.push({
                        activity_type: F,
                        id: x,
                        count: y,
                        actvCount: H,
                        price: S,
                        origin_price: T,
                        name: D,
                        cents: G,
                        actvStock: z,
                        restrict: w,
                        needToast: I,
                        attrs: b,
                        attrName: U,
                        foodid: C
                    }), h += y * N * Math.round(100 * B), p[j] = (p[j] || 0) + y, u += y;
                }
            }
        }
        s += h, d += h, f = Math.max(0, Math.round(100 * v) - d);
    }
    return 0 !== l.length && 0 !== e.length && (e.forEach(function(t) {
        M[t.tag] = 0;
    }), l.forEach(function(t) {
        var a = r[t.id].tagBelongTo;
        M[a] += t.count;
    })), {
        cart: l,
        count: u,
        cents: s,
        boxCents: h,
        countMap: p,
        needCents: f,
        alreadySelecCount: M
    };
};