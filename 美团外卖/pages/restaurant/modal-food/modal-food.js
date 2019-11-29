var t = function() {
    function t(t, o) {
        var a = [], i = !0, r = !1, e = void 0;
        try {
            for (var n, d = t[Symbol.iterator](); !(i = (n = d.next()).done) && (a.push(n.value), 
            !o || a.length !== o); i = !0) ;
        } catch (t) {
            r = !0, e = t;
        } finally {
            try {
                !i && d.return && d.return();
            } finally {
                if (r) throw e;
            }
        }
        return a;
    }
    return function(o, a) {
        if (Array.isArray(o)) return o;
        if (Symbol.iterator in Object(o)) return t(o, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), o = require("../../../utils/object-assign.js"), a = require("../../../utils/find.js"), i = require("../../../utils/format-price.js"), r = require("../../../utils/attrs-equal.js"), e = function(t) {
    return 0 === t.status && (-1 === t.real_stock || t.real_stock >= t.min_order_count);
};

module.exports = function(n) {
    n.data.modalFood = {
        show: !1,
        spu: null,
        activeAttrs: [],
        activeCount: 0,
        activeSku: 0,
        attrText: "",
        price: "",
        priceOrigin: "",
        lastAction: "init"
    }, o(n, {
        setDataModalFood: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = {};
            Object.keys(t).forEach(function(a) {
                o["modalFood." + a] = t[a];
            }), this.setData(o);
        },
        modalFoodFirstActiveSku: function() {
            for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.modalFood.spu.skus, o = t.length, a = 0; a < o; ++a) {
                var i = t[a];
                if (e(i)) return i;
            }
            return null;
        },
        modalFoodViewData: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.modalFood, o = t.spu, e = t.activeAttrs, n = t.activeSku;
            null === o && this.lxLogWXAppError("NULL", void 0, {
                data: t,
                source: "modalFoodViewData"
            });
            var d = o.skus, s = o.attrs, u = a(d, function(t) {
                return t.id === n;
            }) || d[0], c = u.spec, l = (c ? [ c ] : []).concat(s.map(function(t, o) {
                var i = t.values;
                return (a(i, function(t) {
                    var a = t.id;
                    return e[o] && a === e[o].id;
                }) || i[0]).value;
            })).join(","), v = u.price, h = u.origin_price, f = i(100 * v), F = v !== h ? i(100 * h) : "", p = this.data.cart, m = a(p, function(t) {
                var o = t.id, a = t.attrs;
                return o === n && r(a, e);
            });
            return {
                attrText: l,
                price: f,
                priceOrigin: F,
                activeCount: m ? m.count : 0
            };
        },
        onClickModalFoodBtn: function(t) {
            var o = t.currentTarget.dataset, a = o.type, i = o.id, r = o.attr, e = o.index, n = this.data.modalFood, d = n.activeSku, s = n.activeAttrs;
            "attr" === a ? s[e].id !== r.id && (this.setDataModalFood({
                activeAttrs: s.slice(0, e).concat([ r ], s.slice(e + 1)),
                lastAction: "changeAttr"
            }), this.setDataModalFood(this.modalFoodViewData())) : "sku" === a && d !== i && (this.setDataModalFood({
                activeSku: i,
                lastAction: "changeSku"
            }), this.setDataModalFood(this.modalFoodViewData()));
        },
        onClickModalFoodAdd: function(t) {
            this.onClickAddFood(t, !0), this.LogWhenAddModalFood(t);
            var o = this.modalFoodViewData();
            o.lastAction = "add", this.setDataModalFood(o);
        },
        LogWhenAddModalFood: function(t) {
            var o = t.currentTarget.dataset.item, a = this.data.poiData.poi_info, i = this.data.container_type, r = {
                poi_id: a.id,
                spu_id: o.id,
                container_type: i,
                category_id: o.tag
            };
            this.lxClickAddModalFood(r);
        },
        onClickModalFoodDel: function(t) {
            this.onClickDelFood(t);
            var o = this.modalFoodViewData();
            o.lastAction = "delete", this.setDataModalFood(o);
        },
        showModalFood: function(i) {
            var r = i.name, n = i.attrs, d = i.sku_label, s = i.skus, u = i.tag, c = i.id, l = this.data.cart;
            void 0 === s && this.lxLogWXAppError("UNDEFINED", void 0, {
                source: "showModalFood",
                spu: i
            }), s.forEach(function(t) {
                t._enabled = e(t);
            });
            var v = a(l, function(t) {
                var o = t.id;
                return a(s, function(t) {
                    return o === t.id && e(t);
                });
            }), h = this.modalFoodFirstActiveSku(s), f = v ? v.id : h ? h.id : null, F = null !== f && v ? n.map(function(t) {
                var o = t.values;
                return a(v.attrs, function(t) {
                    var i = t.id;
                    return a(o, function(t) {
                        return t.id === i;
                    });
                }) || o[0];
            }) : n.map(function(o) {
                return t(o.values, 1)[0];
            }), p = {
                show: !0,
                spu: {
                    name: r,
                    attrs: n,
                    sku_label: d,
                    skus: s
                },
                tag: u,
                activeAttrs: F,
                activeSku: f,
                id: c,
                lastAction: "openModal"
            };
            o(p, this.modalFoodViewData(p)), this.setDataModalFood(p);
        },
        hideModalFood: function() {
            var t = {
                show: !1,
                spu: null,
                activeAttrs: [],
                activeCount: 0,
                activeSku: 0,
                attrText: "",
                price: "",
                priceOrigin: "",
                lastAction: "init"
            };
            t.lastAction = "hide", this.setDataModalFood(t);
        }
    });
};