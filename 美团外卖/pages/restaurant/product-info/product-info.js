function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, i) {
            function o(r, n) {
                try {
                    var a = e[r](n), s = a.value;
                } catch (t) {
                    return void i(t);
                }
                if (!a.done) return Promise.resolve(s).then(function(t) {
                    o("next", t);
                }, function(t) {
                    o("throw", t);
                });
                t(s);
            }
            return o("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../npm/babel-runtime/regenerator/index.js")), i = require("../../../utils/object-assign.js"), o = require("../../../api/index.js").productInfo, r = require("../../../utils/image-scale.js");

module.exports = function(n) {
    i(n, {
        showProductInfo: function(t) {
            var e = t.currentTarget.dataset.item;
            "modifyFood" !== t.target.dataset.action && (this.loadProductInfo(e), this.LogClickSpu(e));
        },
        LogClickSpu: function(t) {
            var e = this.data, i = e.poiData.poi_info, o = e.activeTypeIndex, r = this.store.getState().poi.food_spu_tags, n = this.data.container_type, a = void 0, s = !1;
            void 0 === r[o] && this.lxLogWXAppError("UNDEFINED ", void 0, {
                food_spu_tags: r,
                activeTypeIndex: o,
                source: "LogClickSpu"
            }), r[o].spus.forEach(function(e, i) {
                e.id === t.id && (a = i, s = !0);
            });
            var u = {
                poi_id: i.id,
                spu_id: t.id,
                category_index: o,
                category_type: r[o].type,
                container_type: n,
                friend_praise: t.friends_praise_content ? 1 : 0,
                product_tag: t.tag,
                product_index: a
            };
            s && this.lxClickSpu(u);
        },
        loadProductInfo: function(i) {
            var n = this;
            return t(e.default.mark(function t() {
                var a, s, u, c, d, p;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.prev = 0, n.loading(!0), t.next = 4, o({
                            spu_id: i.id,
                            sku_id: i.skus[0].id,
                            wm_poi_id: n.poiID,
                            spu_tag: i.tag,
                            activity_tag: i.activity_tag
                        });

                      case 4:
                        a = t.sent, s = n.store.getState(), u = s.poi.data.poi_info, (c = {
                            pictureSmall: i.picture,
                            picture: r(a.skus[0].picture, 0, 0, "o"),
                            name: a.name,
                            price: a.skus[0].price,
                            origin_price: a.skus[0].origin_price,
                            month_saled: i.month_saled,
                            praise_num_new: i.praise_num_new,
                            description: a.description,
                            promotion_info: a.promotion_info,
                            real_stock: a.skus[0].real_stock,
                            product_label_picture_list: a.product_label_picture_list,
                            skus: a.skus,
                            id: i.id,
                            unit: i.unit,
                            attrs: a.attrs,
                            status: a.status,
                            category_type: i.category_type,
                            product_index: i.product_index,
                            tag: i.tag,
                            poi_info: u
                        }).show = !0, n.setData({
                            productInfo: c
                        }), n.loading(!1), t.next = 18;
                        break;

                      case 12:
                        t.prev = 12, t.t0 = t.catch(0), d = t.t0.code, p = t.t0.message, n.loading(!1), 
                        n.alert({
                            message: p
                        });

                      case 18:
                      case "end":
                        return t.stop();
                    }
                }, t, n, [ [ 0, 12 ] ]);
            }))();
        },
        hideProductInfo: function() {
            this.setData({
                productInfo: {
                    show: !1
                }
            });
        }
    });
};