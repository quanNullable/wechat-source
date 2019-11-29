function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, i) {
            function a(n, o) {
                try {
                    var s = t[n](o), l = s.value;
                } catch (e) {
                    return void i(e);
                }
                if (!s.done) return r.resolve(l).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(l);
            }
            return a("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), i = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../npm/promise-polyfill/promise.js"), a = require("../../api/index.js").channelPage, n = require("../../weapp-redux/index.js").connect, o = require("../base.js"), s = require("../../components/poi-list/poi-list.js"), l = require("../../components/filter/filter.js"), c = require("../../utils/mix.js"), u = require("../../components/rohr/rohr.js"), d = require("../../utils/object-assign.js"), p = require("../index/log.js"), h = require("../../utils/quick-filter-manager.js").clear, f = require("../../constants.js"), g = f.ACTION_CLICK, x = f.P_POI, _ = f.P_CATEGORY, m = f.B_POILIST, w = n(function(e) {
    var t = e.cart, i = {};
    return Object.keys(t).forEach(function(e) {
        if (t[e].length) {
            for (var r = t[e], a = 0, n = 0, o = r.length; n < o; n++) a += r[n].count;
            i[e] = a;
        }
    }), {
        cartKeys: i
    };
}), v = {
    pageName: "channel-page",
    data: {
        hasMore: !1,
        scrollTop: 0,
        backTopShow: !1,
        isLoading: !0,
        searchHeight: 60,
        showResetFilter: !1
    },
    page_index: 0,
    onScrollBottom: function() {
        this.data.hasMore && this.load(!1);
    },
    onClickPoilistItem: function(e) {
        var t = e.currentTarget.dataset, i = t.id, r = t.index, a = t.poi;
        this.traceTagStart({
            src_page: _,
            src_block: m,
            src_item_index: r,
            src_item_id: i,
            src_item_type: "poi",
            tgt_page: x,
            extra: {
                poi_id: i
            },
            action: g
        }), a.index = r, this.lxChannelPoilistClick(a);
    },
    _poilistLoad: function(i) {
        var r = this;
        return e(t.default.mark(function e() {
            var n, o, s, l, c, u, p;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n = r.page_index, o = d({
                        page_index: i ? 0 : r.page_index,
                        page_size: 20,
                        load_type: 1,
                        trace_tag: r.traceTagEnd({
                            tgt_block: m
                        })
                    }, r.filterParam = r.getFilterParam()), e.next = 4, a(o);

                  case 4:
                    return s = e.sent, l = s.poi_has_next_page, c = s.poilist, u = s.judas_field, o.sort_type ? r.judasParams = {
                        rank_trace_id: ""
                    } : o.page_index || (r.judasParams = u), p = (r.data.poilist || []).length || 0, 
                    (c || []).forEach(function(e, t) {
                        e.index = p + t, r.lxChannelPoilistView(e);
                    }), e.abrupt("return", {
                        poi_has_next_page: l,
                        page_index: i ? 1 : n + 1,
                        poilist: c
                    });

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    },
    reloadPoilist: function() {
        return this.load(!0);
    },
    loadPoilist: function(i) {
        var r = this;
        return e(t.default.mark(function e() {
            var a, n, o, s, l, c, u;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r.data.hasMore || r.loading(!0), r.setData({
                        loadingLogo: !i
                    }), a = 0 !== r.data.poilist.length, e.next = 5, r.poilistLoad(i);

                  case 5:
                    if (n = e.sent, o = n.poi_has_next_page, s = n.page_index, l = n.valid) {
                        e.next = 11;
                        break;
                    }
                    return e.abrupt("return");

                  case 11:
                    r.page_index = s, c = 0 === r.data.poilist.length && (r.filterParam.activity_filter_codes.length > 0 || r.data.filter.selectedPriceRange.length > 0), 
                    u = {
                        loadingLogo: !1,
                        hasMore: o,
                        isLoading: !1,
                        showResetFilter: c
                    }, c && r.lxResetFilterView(), i && a && (0 === r.data.scrollTop && r.setData({
                        scrollTop: 1
                    }), u.scrollTop = 0), r.setData(u), i && r.loading(!1);

                  case 18:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    },
    load: function(i) {
        var r = this;
        return e(t.default.mark(function e() {
            var a;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i && r.loading(!0), r.loadQuickFilter(), e.prev = 2, e.next = 5, r.loadFilter();

                  case 5:
                    return e.next = 7, r.loadPoilist(i);

                  case 7:
                    r.error(), e.next = 14;
                    break;

                  case 10:
                    e.prev = 10, e.t0 = e.catch(2), a = e.t0.message, r.error({
                        message: "您的手机网络好像不太流畅哦~",
                        img: "no-net",
                        textOK: "重新加载",
                        ok: function() {
                            r.load(!0);
                        }
                    });

                  case 14:
                    i && r.loading(!1);

                  case 15:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 2, 10 ] ]);
        }))();
    },
    onLoad: function(e) {
        var t = e.typeCode, i = e.typeName;
        this.initFilter({
            typeCode: t,
            typeName: i
        }), h(this.pageName), this.load(!0), this.setCategoryCode(t), this.lxSearchView(), 
        this.lxFilterView();
    },
    onShow: function() {
        this.lxQuickFilterView();
    },
    getReportData: function() {
        return {
            cid: "c_i5kxn8l"
        };
    },
    onPullDownRefresh: function() {
        this.load(!0).then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        this.onScrollBottom();
    },
    onPageScroll: function(e) {
        var t = e.scrollTop, i = this.store.getState().wx.windowWidth, r = this.data.searchHeight * (i / 750), a = this.data.filter.scrollTop || 0;
        t <= i / 750 * 400 && a <= r && this.setFilterBodyTop(t < r ? t : r);
    },
    onClickResetFilter: function() {
        this.filterClear(), this.reloadPoilist(), this.lxResetFilterClick();
    }
};

(0, i.page)(c(v, w, s, l, o, p, u));