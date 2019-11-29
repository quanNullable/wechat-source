var a = require("../actions/poi.js"), t = require("../utils/image-scale.js"), u = require("../utils/object-assign.js"), s = require("../utils/find-index.js"), i = require("../utils/cart-cache.js"), o = {
    id: "",
    data: null,
    spuMap: null,
    skuMap: null,
    food_spu_tags: null
};

module.exports = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o, e = arguments[1], n = [ "act17", "act20", "act23" ];
    switch (e.type) {
      case a.POI_REQUEST:
        return u({}, o, {
            id: e.id
        });

      case a.POI_LOADED:
        var p = e.data, c = p && p.food_spu_tags ? p.food_spu_tags : [], _ = p.poi_info.id, d = {}, f = {};
        return u(f, i.sku.get(_)), u(d, i.spu.get(_)), c.forEach(function(a) {
            a.icon = t(a.icon, 0, 0, "o"), a.spus.forEach(function(u) {
                d[u.id] = u, u.picture = t(u.picture, 124), u.skus.forEach(function(t) {
                    t._spu_id = u.id, t.tagBelongTo = -1 !== n.indexOf(a.tag) ? a.tag : u.tag, f[t.id] = t;
                });
            });
        }), p.food_spu_tags = null, u({}, r, {
            id: _,
            data: p,
            spuMap: d,
            skuMap: f,
            food_spu_tags: c
        });

      case a.POI_PRODUCTS:
        var g = e.data, l = g && g.product_tag_id;
        if (!l) return r;
        var O = s(r.food_spu_tags, function(a) {
            return a.tag === l;
        });
        if (-1 === O) return r;
        var E = g.product_spu_list, h = g.has_next_page, M = g.current_page, k = {}, v = {};
        E.forEach(function(a) {
            k[a.id] = a, a.picture = t(a.picture, 124), a.skus.forEach(function(t) {
                t._spu_id = a.id, t.tagBelongTo = -1 !== n.indexOf(l) ? l : a.tag, v[t.id] = t;
            });
        });
        var T = r.food_spu_tags.slice();
        return Object.assign(T[O], {
            spus: T[O].spus.concat(E),
            has_next_page: h,
            current_page: M
        }), u({}, r, {
            spuMap: u(r.spuMap, k),
            skuMap: u(r.skuMap, v),
            food_spu_tags: T
        });

      case a.PRODUCTS_COLLECT:
        var j = {}, x = {};
        return e.data.forEach(function(a) {
            j[a.id] = a, a.picture = t(a.picture, 124), a.skus.forEach(function(t) {
                t._spu_id = a.id, t.tagBelongTo = a.tag, x[t.id] = t;
            });
        }), u({}, r, {
            spuMap: u(j, r.spuMap),
            skuMap: u(x, r.skuMap)
        });

      case a.GET_COUPON:
        var P = e.data, q = P.coupon_status, C = P.index, I = JSON.stringify(r), S = JSON.parse(I);
        return S.data.poi_info.poi_coupon.coupon_list[C].coupon_status = q, u({}, S);

      case a.POI_EXIT:
        return o;

      default:
        return r;
    }
};