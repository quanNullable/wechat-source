module.exports = function(t) {
    var i = t.poi, r = i.id, u = i.skuMap, a = t.cart[r], s = [];
    if (a) for (var n = a.length - 1; n > -1; --n) {
        var c = a[n], d = c.count, o = c.id, p = c.attrs, e = u[o];
        if (e) {
            var f = e._spu_id;
            0 === e.status && s.push({
                spu_id: f,
                id: o,
                count: d,
                attrs: (p || []).map(function(t) {
                    return t.id;
                }),
                cart_id: 0,
                activity_tag: "discount"
            });
        }
    }
    return s;
};