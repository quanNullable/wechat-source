function i(i, e, t) {
    return e in i ? Object.defineProperty(i, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : i[e] = t, i;
}

var e, t, d = require("../../utils/object-assign.js"), o = {
    poi: 12e3,
    food: 12001,
    search: 12002,
    poiKA: 12003,
    hotword: 12004,
    h5: 12005
}, _ = (e = {}, i(e, o.poi, 11e3), i(e, o.food, 11001), i(e, o.search, 11002), e), l = (t = {}, 
i(t, o.h5, 1), i(t, o.hotword, 2), t), s = {
    hasProdList: function(i) {
        return i && i.length ? 1 : 0;
    },
    isAcurrateShop: function(i) {
        return 0 === i;
    },
    isRelativeShop: function(i) {
        return 1 === i;
    },
    getQwTypeId: function(i) {
        return _[i] || i;
    },
    getWordType: function(i) {
        return l[i] || 3;
    },
    getActId: function(i) {
        return JSON.stringify(i.map(function(i) {
            return i.type || "";
        }));
    },
    lxRelativeShopFoodClick: function(i, e, t) {
        return this.lxAcurrateShopFoodView(i, e, t, "b_U41Mv", "click");
    },
    lxRelativeShopFoodView: function(i, e, t) {
        return this.lxAcurrateShopFoodView(i, e, t, "b_HN5XY");
    },
    lxRelativeShopClick: function(i, e) {
        return this.lxAcurrateShopView(i, e, "b_U41Mv", "click");
    },
    lxRelativeShopView: function(i, e) {
        return this.lxAcurrateShopView(i, e, "b_ddZz3");
    },
    lxAcurrateShopFoodClick: function(i, e, t) {
        return this.lxAcurrateShopFoodView(i, e, t, "b_IDNii", "click");
    },
    lxAcurrateShopFoodView: function(i, e, t) {
        var d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "b_GTOR0", o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "view", _ = i.product_spu_id, l = void 0 === _ ? "" : _, s = i.wm_poi_id, r = void 0 === s ? "" : s, a = e.delivery_type, v = void 0 === a ? "" : a, n = t.index, p = void 0 === n ? 0 : n, c = t.keyword, u = void 0 === c ? "" : c, g = t.tgt_stids, w = void 0 === g ? "" : g, h = t.search_log_Id, y = void 0 === h ? "" : h, b = this.label_type, x = void 0 === b ? "" : b;
        this.lxMge[o]({
            val_bid: d,
            label_word: u,
            search_log_id: y,
            poi_index: p,
            keyword: u,
            ship_type: v,
            poi_id: r,
            qw_type_id: this.getQwTypeId(x),
            stid: w,
            spu_id: l,
            template_type: 0,
            is_filter_result: 0
        });
    },
    lxAcurrateShopClick: function(i, e) {
        return this.lxAcurrateShopView(i, e, "b_KOXis", "click");
    },
    lxAcurrateShopView: function(i, e) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "b_IPU0P", d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "view", o = i.discounts2, _ = void 0 === o ? [] : o, l = i.delivery_type, s = void 0 === l ? "" : l, r = i.mt_poi_id, a = void 0 === r ? "" : r, v = i.id, n = void 0 === v ? "" : v, p = e.index, c = void 0 === p ? 0 : p, u = e.keyword, g = void 0 === u ? "" : u, w = e.tgt_stids, h = void 0 === w ? "" : w, y = e.search_log_Id, b = void 0 === y ? "" : y, x = this.label_type, k = void 0 === x ? "" : x;
        this.lxMge[d]({
            val_bid: t,
            is_have_sku: this.hasProdList(i.product_list),
            label_word: g,
            index: c,
            search_log_id: b,
            poi_act_id: this.getActId(_),
            keyword: g,
            ship_type: s,
            poi_id: a || n,
            qw_type_id: this.getQwTypeId(k),
            stid: h
        });
    },
    lxSearchResultView: function(i) {
        var e = i.tgt_stids, t = void 0 === e ? "" : e, d = i.keyword, o = void 0 === d ? "" : d, _ = this.category_type, l = this.label_type, s = void 0 === l ? "" : l;
        this.lxMge.view({
            val_bid: "b_oLsKJ",
            qw_type_id: this.getQwTypeId(s),
            stid: t,
            keyword: o,
            label_word: o,
            cat_id: _
        });
    },
    lxSugClick: function(i, e) {
        var t = i.type, d = void 0 === t ? "" : t, o = i.wm_poi_id, _ = void 0 === o ? "" : o, l = i.suggest_global_id, s = void 0 === l ? "" : l, r = i.suggest_log_id, a = void 0 === r ? "" : r, v = this.data, n = v.tgt_stids, p = void 0 === n ? "" : n, c = v.terms, u = (void 0 === c ? [] : c)[0] || "";
        this.lxMge.click({
            val_bid: "b_HPP0w",
            stid: p,
            poi_id: _,
            keyword: u,
            qw_type_id: this.getQwTypeId(d),
            suggest_global_id: s,
            suggest_log_id: a,
            word_index: e || 0,
            input_word: u
        });
    },
    lxSugView: function(i, e, t) {
        var d = i.type, o = void 0 === d ? "" : d, _ = i.wm_poi_id, l = void 0 === _ ? "" : _, s = i.suggest_global_id, r = void 0 === s ? "" : s, a = i.suggest_log_id, v = void 0 === a ? "" : a, n = t.tgt_stids, p = void 0 === n ? "" : n, c = t.terms, u = (void 0 === c ? [] : c)[0] || "";
        this.lxMge.view({
            val_bid: "b_4zRnQ",
            stid: p,
            poi_id: l,
            keyword: u,
            qw_type_id: this.getQwTypeId(o),
            suggest_global_id: r,
            suggest_log_id: v,
            word_index: e || 0,
            input_word: u
        });
    },
    lxSugResultView: function(i, e) {
        var t = i.suggest_global_id, d = void 0 === t ? "" : t, o = i.suggest_log_id, _ = void 0 === o ? "" : o, l = e.tgt_stids, s = void 0 === l ? "" : l;
        this.lxMge.view({
            val_bid: "b_vGD4S",
            stid: s,
            suggest_global_id: d,
            suggest_log_id: _
        });
    },
    lxHisClick: function(i) {
        var e = i.label_type, t = void 0 === e ? "" : e, d = i.search_keyword, o = void 0 === d ? "" : d, _ = i.wm_poi_id, l = void 0 === _ ? 0 : _;
        this.lxMge.click({
            val_bid: "b_0ugD5",
            qw_type_id: this.getQwTypeId(t),
            keyword: o,
            poi_id: l
        });
    },
    lxHisView: function(i) {
        var e = i.label_type, t = void 0 === e ? "" : e, d = i.search_keyword, o = void 0 === d ? "" : d, _ = i.wm_poi_id, l = void 0 === _ ? 0 : _;
        this.lxMge.view({
            val_bid: "b_0uLTG",
            qw_type_id: this.getQwTypeId(t),
            keyword: o,
            poi_id: l
        });
    },
    lxHotClick: function(i) {
        var e = this.data, t = e.scene_type, d = void 0 === t ? "" : t, o = e.labels_tgt_stids, _ = void 0 === o ? "" : o, l = i.search_keyword, s = void 0 === l ? "" : l, r = i.wm_poi_id, a = void 0 === r ? 0 : r, v = i.label_type, n = void 0 === v ? "" : v, p = i.label_name, c = void 0 === p ? "" : p;
        this.lxMge.view({
            val_bid: "b_ycerp",
            label_word: c,
            stid: _,
            keyword: s,
            word_type: this.getWordType(n),
            poi_id: a,
            is_travel: d
        });
    },
    lxHotView: function(i, e) {
        var t = i.scene_type, d = void 0 === t ? "" : t, o = i.labels_tgt_stids, _ = void 0 === o ? "" : o, l = e.search_keyword, s = void 0 === l ? "" : l, r = e.wm_poi_id, a = void 0 === r ? 0 : r, v = e.label_type, n = void 0 === v ? "" : v, p = e.label_name, c = void 0 === p ? "" : p;
        this.lxMge.view({
            val_bid: "b_xVaXG",
            label_word: c,
            stid: _,
            keyword: s,
            word_type: this.getWordType(n),
            poi_id: a,
            is_travel: d
        });
    },
    lxSearchClick: function(i) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", t = this.data, d = t.keywordLabel, l = t.labels_tgt_stids, s = t.scene_type;
        this.lxMge.click({
            val_bid: "b_G73OZ",
            label_word: d,
            qw_type_id: _[o.search],
            label_type: i ? "-999" : "",
            keyword: e || d,
            default_stid: l || "",
            is_travel: s || ""
        });
    }
};

module.exports = function(i) {
    return d(i, s), i;
};