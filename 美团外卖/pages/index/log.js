function i(i) {
    if (Array.isArray(i)) {
        for (var e = 0, t = Array(i.length); e < i.length; e++) t[e] = i[e];
        return t;
    }
    return Array.from(i);
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(i) {
    return typeof i;
} : function(i) {
    return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
}, t = function() {
    function i(i, e) {
        var t = [], o = !0, n = !1, r = void 0;
        try {
            for (var a, l = i[Symbol.iterator](); !(o = (a = l.next()).done) && (t.push(a.value), 
            !e || t.length !== e); o = !0) ;
        } catch (i) {
            n = !0, r = i;
        } finally {
            try {
                !o && l.return && l.return();
            } finally {
                if (n) throw r;
            }
        }
        return t;
    }
    return function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return i(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(i) {
    return void 0 === i ? "undefined" : e(i);
} : function(i) {
    return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : void 0 === i ? "undefined" : e(i);
}, n = require("../../utils/object-assign.js"), r = {
    ACCPET_RESERVATION: 0,
    RESERVATION_ONLY: 1
}, a = {
    AVAILABLE: 1,
    REST: 3
};

Object.entries || (Object.entries = function(i) {
    for (var e = Object.keys(i), t = e.length, o = new Array(t); t--; ) o[t] = [ e[t], i[e[t]] ];
    return o;
});

var l = {
    getStatus: function(i, e) {
        var t = e.reservation_status, o = e.in_shipping_time;
        return 1 === o ? i === a.REST ? 0 : i : 0 === o ? t === r.ACCPET_RESERVATION ? 2 : 3 : i;
    },
    setCategoryCode: function() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.category_code || (this.category_code = i);
    },
    getChannelParam: function() {
        var i = this.category_code, e = void 0 === i ? 0 : i, t = this.fstCateId, o = this.secCateId;
        return {
            category_code: e,
            fst_cate_id: t || e,
            sec_cate_id: o
        };
    },
    lxChannelPoilistClick: function(i) {
        return this.lxPoilistView(i, "b_ZesFe", "click", this.getChannelParam());
    },
    lxChannelPoilistView: function(i) {
        return this.lxPoilistView(i, "b_GcYmX", "view", this.getChannelParam());
    },
    lxPoilistClick: function(i) {
        return this.lxPoilistView(i, "b_habt1", "click");
    },
    lxPoilistView: function(i) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b_6I0WA", t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "view", n = arguments[3], r = i.index, a = void 0 === r ? 0 : r, l = i.id, s = void 0 === l ? "" : l, d = i.status, c = void 0 === d ? "" : d, _ = i.shipping_time_info, v = void 0 === _ ? {} : _, h = i.distance, u = void 0 === h ? "" : h, f = i.min_price_tip, y = void 0 === f ? "" : f, b = i.delivery_time_tip, p = void 0 === b ? "" : b, g = i.shipping_fee_tip, x = void 0 === g ? "" : g, m = i.origin_shipping_fee_tip, w = void 0 === m ? "" : m, C = this.judasParams, k = this.filterParam.activity_filter_codes, S = this.data, M = S.cartKeys, P = S.filter.sortTypeCode, V = C.rank_trace_id, A = {
            val_bid: e,
            index: a,
            poi_id: s,
            rank_trace_id: void 0 === V ? "" : V,
            sort: P,
            filter: k,
            poi_status: this.getStatus(c, v),
            has_ordered_food: M[s] > 0 ? 1 : 0,
            delivery_time: p,
            distance: u,
            min_total: y,
            delivery_fee: x,
            original_delivery_fee: w
        };
        "object" === (void 0 === n ? "undefined" : o(n)) && Object.assign(A, n), this.lxMge[t](A);
    },
    lxSearchClick: function(i) {
        var e = i.currentTarget.dataset.recommend;
        if ("index" === this.pageName) {
            var t = e.scene_type, o = void 0 === t ? "" : t, n = e.search_keyword, r = void 0 === n ? "" : n, a = e.view_keyword, l = void 0 === a ? "" : a, s = e.type, d = void 0 === s ? "" : s, c = e.tgt_stids, _ = void 0 === c ? "" : c;
            this.lxMge.click({
                val_bid: "b_UDdde",
                label_word: l,
                keyword: r,
                default_stid: _,
                word_type: d,
                is_travel: o,
                has_word: l ? "1" : "0"
            });
        } else "channel-page" === this.pageName && this.lxMge.click({
            val_bid: "b_aZbuD",
            cat_id: this.options.typeCode || ""
        });
    },
    lxSearchView: function() {
        var i = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).spread, e = void 0 === i ? "1" : i;
        if ("index" === this.pageName) {
            var t = this.data.recommended_search_keyword, o = t.scene_type, n = void 0 === o ? "" : o, r = t.type, a = void 0 === r ? "" : r, l = t.view_keyword, s = void 0 === l ? "" : l, d = t.search_keyword, c = void 0 === d ? "" : d, _ = t.tgt_stids, v = void 0 === _ ? "" : _;
            this.lxMge.view({
                val_bid: "b_dmKcT",
                label_word: s,
                keyword: c,
                default_stid: v,
                word_type: a,
                is_travel: n,
                spread: e,
                has_word: s ? "1" : "0"
            });
        } else this.pageName;
    },
    lxFilterView: function() {
        "index" === this.pageName ? this.lxMge.view({
            val_bid: "b_QEGEq"
        }) : "channel-page" === this.pageName && this.lxMge.view({
            val_bid: "b_ge94y",
            cat_id: this.options.typeCode || ""
        });
    },
    lxKingkongView: function(i, e) {
        var t = this, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10;
        i && i.forEach(function(i, n) {
            t.lxMge.view({
                val_bid: "b_fwSD2",
                cat_id: i.code,
                index: e * o + n
            });
        });
    },
    lxKingkongClick: function(i) {
        var e = i.cat_id, t = i.index;
        this.lxMge.view({
            val_bid: "b_DbEN0",
            cat_id: e,
            index: t
        });
    },
    lxFilterClick: function(e) {
        var o = this.data.filter.selectedCodes, n = "";
        if (e) {
            var r = Object.entries(o);
            r.length > 0 && (n = r.reduce(function(e, o) {
                var n = t(o, 2), r = n[0];
                return n[1] ? [].concat(i(e), [ r ]) : e;
            }, []).join(","));
        }
        "index" === this.pageName ? this.lxMge.click({
            val_bid: "b_21NTG",
            codes: n,
            type: e ? "2" : "1"
        }) : "channel-page" === this.pageName && this.lxMge.click({
            val_bid: "b_U7ZI3",
            cat_id: this.options.typeCode || "",
            codes: n,
            type: e ? "2" : "1"
        });
    },
    lxChannelTypeHorizonView: function() {
        this.lxMge.view({
            val_bid: "b_5efpo8qz",
            cat_id: this.options.typeCode || ""
        });
    },
    lxChannelTypeHorizonClick: function() {
        this.lxMge.click({
            val_bid: "b_532wtq51",
            cat_id: this.options.typeCode || ""
        });
    },
    lxChannelCategoryView: function() {
        this.lxMge.view({
            val_bid: "b_7bm17vo8",
            cat_id: this.options.typeCode || ""
        });
    },
    lxChannelCategoryClick: function() {
        this.lxMge.click({
            val_bid: "b_b7a4oneb",
            cat_id: this.options.typeCode || ""
        });
    },
    lxQuickFilterView: function() {
        this.lxMge.view({
            val_bid: "b_ybw8lavi",
            status: 0,
            codes: this.filterParam ? this.filterParam.activity_filter_codes : ""
        });
    },
    lxQuickFilterClick: function(i) {
        var e = this.filterParam ? this.filterParam.activity_filter_codes.split(",") : "";
        this.lxMge.click({
            val_bid: "b_50970nu2",
            status: 0,
            click_status: -1 !== e.indexOf(i) ? 1 : 0,
            codes: this.filterParam ? this.filterParam.activity_filter_codes : ""
        });
    },
    lxResetFilterView: function() {
        this.lxMge.view({
            val_bid: "b_ggc9n7wh"
        });
    },
    lxResetFilterClick: function() {
        this.lxMge.click({
            val_bid: "b_e4z3iz3u"
        });
    },
    lxFilterFastestSpeedView: function() {
        this.lxMge.view({
            val_bid: "b_48ckidwc"
        });
    },
    lxFilterFastestSpeedClick: function() {
        this.lxMge.view({
            val_bid: "b_hl4vm9uw"
        });
    }
};

module.exports = function(i) {
    return n(i, l), i;
};