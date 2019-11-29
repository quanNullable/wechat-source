function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new o(function(e, a) {
            function i(r, s) {
                try {
                    var n = t[r](s), c = n.value;
                } catch (e) {
                    return void a(e);
                }
                if (!n.done) return o.resolve(c).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(c);
            }
            return i("next");
        });
    };
}

var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, r = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), s = require("../../npm/@hfe/mp-owl/lib/index.js"), n = require("../../actions/wx.js"), o = require("../../npm/promise-polyfill/promise.js"), c = require("../base.js"), u = require("../../utils/image-scale.js"), l = require("../../utils/fix-coords.js"), h = require("../../store.js"), d = require("../../utils/wait.js"), g = require("../../utils/promise-try.js"), _ = require("../../utils/mix.js"), p = require("./log.js"), f = require("../../api/wx.js").getLocation, v = function(e) {
    return h.dispatch((0, n.set)(e)), e;
}, y = function(e) {
    for (var t = {}, a = e.length - 1; a > -1; --a) t[e[a]] = 1;
    return Object.keys(t);
}, w = require("../../api/index.js"), m = w.searchHot, k = w.searchSuggestV8, b = w.searchPoi, x = w.getFilterConditions, S = require("../../api/wx.js"), L = S.storage, D = L.setItem, T = L.getItem, C = S.navigateTo, j = {
    poi: 12e3,
    food: 12001,
    search: 12002,
    poiKA: 12003,
    hotword: 12004,
    h5: 12005
}, q = require("../../utils/find-index.js"), A = require("../../constants.js").KEY_HISTORY_LABELS, I = {
    labels: [],
    getAsync: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var i, r;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, T(A);

                  case 2:
                    if (i = t.sent, !((r = i.data) instanceof Array)) {
                        t.next = 7;
                        break;
                    }
                    return e.labels = r, t.abrupt("return", r);

                  case 7:
                    return t.abrupt("return", e.labels);

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    get: function() {
        return this.labels;
    },
    add: function(e) {
        var t = this.labels, a = q(t, function(t) {
            return t.label_name === e.label_name;
        });
        return 0 === a ? t : (t = -1 === a ? [ e ].concat(t) : [ t[a] ].concat(t.slice(0, a), t.slice(a + 1)), 
        D(A, t), this.labels = t, t);
    },
    clear: function() {
        var e = this.labels = [];
        return D(A, e), e;
    }
}, M = function(e, t) {
    for (var a = e, i = []; a; ) {
        for (var r = 1 / 0, s = "", n = t.length - 1; n > -1; --n) {
            var o = t[n], c = a.indexOf(o);
            -1 !== c && c < r && (r = c, s = o);
        }
        if (s) {
            var u = s.length, l = a.slice(0, r), h = a.slice(r, r + u);
            l && i.push({
                name: l,
                highLight: !1
            }), i.push({
                name: h,
                highLight: !0
            }), a = a.slice(r + u);
        } else i.push({
            name: a,
            highLight: !1
        }), a = "";
    }
    return i;
}, V = function() {
    function t() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = a.inputDelay, r = a.onInput, s = a.onSuggest;
        e(this, t), this.state = "init", this.keyword = "", this.to = -1, this.inputDelay = 100, 
        this.onInput = null, this.onSuggest = null, this.onInput = r, this.inputDelay = i, 
        this.onSuggest = s;
    }
    return r(t, [ {
        key: "input",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            if (clearTimeout(this.to), !(t = (t || "").replace(/\s/g, "")) || t !== this.keyword) return this.keyword = t, 
            this.to = setTimeout(function() {
                e.onSuggest();
            }, this.inputDelay), t ? void 0 : t;
        }
    }, {
        key: "search",
        value: function(e) {
            clearTimeout(this.to), this.state = "search", this.keyword = e;
        }
    }, {
        key: "reset",
        value: function() {
            this.state = "init", this.keyword = "";
        }
    }, {
        key: "getKeyword",
        value: function() {
            return this.keyword;
        }
    }, {
        key: "getState",
        value: function() {
            return this.state;
        }
    }, {
        key: "destroy",
        value: function() {
            clearTimeout(this.to);
        }
    } ]), t;
}(), E = function() {
    function t() {
        e(this, t), this.t = 0;
    }
    return r(t, [ {
        key: "get",
        value: function() {
            return this.add();
        }
    }, {
        key: "valid",
        value: function(e) {
            return this.t === e;
        }
    }, {
        key: "add",
        value: function() {
            var e = this.t, t = e + 1;
            return t === e && (t = 0), this.t = t, t;
        }
    }, {
        key: "cancel",
        value: function() {
            return this.add();
        }
    } ]), t;
}(), K = function() {
    var e = String(Date.now()).substr(4);
    try {
        var t = wx.getStorageSync("UUID");
        return t ? "" + e + t : e;
    } catch (t) {
        return e;
    }
}, P = {
    data: {
        hotLabels: [],
        historyLabels: I.get(),
        inputShowClear: !1,
        keywordValue: "",
        keywordLabel: "",
        pageState: "hot",
        suggest: [],
        terms: [],
        search_poi_list: [],
        recommend_poi_list: [],
        poilistActvsShown: {},
        productShown: {},
        has_next_page: !1,
        inputFocus: !0
    },
    page_index: 0,
    is_scroll_loading: !1,
    category_type: 0,
    suggest_global_id: K(),
    suggestTicket: null,
    searchTicket: null,
    locationObtain: function() {
        var e = this;
        return t(a.default.mark(function t() {
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, g([ f(), d(1e3) ]);

                  case 2:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    onLoad: function(e) {
        var i = this, r = e.category_type, s = void 0 === r ? 0 : r, n = e.keyword, o = void 0 === n ? "" : n, c = e.auto_search, u = void 0 !== c && c, h = e.wxParamData, d = void 0 === h ? "" : h, g = e.loc_auth, _ = void 0 === g ? "1" : g;
        if (d) {
            d = decodeURIComponent(d);
            var p = JSON.parse(d);
            if (p.slot_list.forEach(function(e) {
                "name" === e.key && (o = e.value);
            }), u = !0, p.longitude && p.latitude) {
                var f = l(p), y = {
                    latitude: f.latitude,
                    longitude: f.longitude,
                    orig_latitude: p.latitude,
                    orig_longitude: p.longitude
                };
                v(y);
            }
        }
        "1" !== _ && wx.getLocation({
            success: function() {
                C({
                    url: "../search/search?keyword=" + o + "&auto_search=true"
                });
            },
            fail: function(e) {
                var r = wx.openSetting;
                e && e.errMsg && -1 !== e.errMsg.toLowerCase().indexOf("auth") && r && wx.openSetting({
                    success: function() {
                        var e = t(a.default.mark(function e(t) {
                            var r = t.authSetting["scope.userLocation"];
                            return a.default.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    if (!r) {
                                        e.next = 4;
                                        break;
                                    }
                                    return e.next = 3, i.locationObtain();

                                  case 3:
                                    C({
                                        url: "../search/search?keyword=" + o + "&auto_search=true"
                                    });

                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            }, e, i);
                        }));
                        return function(t) {
                            return e.apply(this, arguments);
                        };
                    }()
                });
            }
        }), this.category_type = s, this.loadHotLabel(), this.loadHistory(), this.setData({
            keywordLabel: o
        }), this.suggestTicket = new E(), this.searchTicket = new E();
        var w = this.searchManager = new V({
            onInput: function() {
                i.setData({
                    inputShowClear: Boolean(w.getKeyword()),
                    pageState: "hot"
                });
            },
            onSuggest: function() {
                i.setData({
                    inputShowClear: Boolean(w.getKeyword())
                }), i.loadSuggest();
            }
        });
        u && this.onClickSearch();
    },
    onUnload: function() {
        this.searchTicket.cancel(), this.suggestTicket.cancel(), this.searchManager.destroy();
    },
    loadFilter: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var i, r, s, n, o;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, x({
                        first_category_type: 0,
                        second_category_type: 0,
                        navigate_type: e.navigateType
                    });

                  case 3:
                    i = t.sent, r = i.category_filter_list, s = i.sort_type_list, n = i.activity_filter_list, 
                    s.forEach(function(e, t) {
                        "销量最高" !== e.name && "速度最快" !== e.name || s.splice(t, 1), e.icon_url = u(e.icon_url, 0, 0, "o"), 
                        e.icon_url_click = u(e.icon_url_click, 0, 0, "o");
                    }), n.forEach(function(e) {
                        for (var t = e.display_style, a = e.items, i = a.length - 1; i > -1; --i) {
                            var r = a[i];
                            r.icon = u(r.icon, 0, 0, "o"), "美团专送" !== r.name || r.icon || (r._filterMeituan = !0);
                        }
                        if (0 === t) {
                            var s = a.length % 3;
                            if (0 !== s) for (var n = s; n < 3; ++n) a.push({
                                empty: !0
                            });
                        }
                    }), e.setData({
                        categoryFilterList: r,
                        sortTypeList: s,
                        activityFilterList: n
                    }), t.next = 16;
                    break;

                  case 12:
                    t.prev = 12, t.t0 = t.catch(0), o = t.t0.message, console.error(o);

                  case 16:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 12 ] ]);
        }))();
    },
    naviatePoi: function(e) {
        C({
            url: "../restaurant/restaurant?poi_id=" + e
        });
    },
    loadSearch: function(e) {
        var i = this;
        return t(a.default.mark(function t() {
            var r, s, n, o, c, u, l, h, d, g, _, p, f, v, w, m, k, x;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i.loading(!0), i.is_scroll_loading = !0, e && (i.data.search_poi_list = [], 
                    i.data.recommend_poi_list = [], i.page_index = 0), r = i.data.keywordLabel, s = i.searchManager, 
                    n = i.searchTicket, o = i.suggestTicket, c = n.get(), u = (i.data.search_poi_list || []).length || 0, 
                    o.cancel(), t.prev = 7, t.next = 10, b({
                        keyword: s.getKeyword() || r,
                        page_index: i.page_index
                    });

                  case 10:
                    l = t.sent, h = l.search_poi_list, d = l.terms, g = l.non_delivery_poi_info, _ = l.recommend_poi_list, 
                    p = l.has_next_page, f = l.tgt_stids, v = l.search_log_Id, n.valid(c) && (w = y(d), 
                    h.forEach(function(e) {
                        e.name = M(e.name, w), e.product_list.forEach(function(e) {
                            e.product_name = M(e.product_name, w);
                        }), e.primitiveDistance = 0;
                    }), _.forEach(function(e) {
                        e.name = M(e.name, w), e.product_list.forEach(function(e) {
                            e.product_name = M(e.product_name, w);
                        }), e.primitiveDistance = 0;
                    }), g.is_show_nondelivery && (m = g.poi_nondelivery_context, g.poi_nondelivery_context = M(m, w)), 
                    k = s.getKeyword() || r, (h || []).forEach(function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], a = e.search_result_type, r = e.product_list, s = void 0 === r ? [] : r, n = {
                            keyword: k,
                            index: t + u,
                            tgt_stids: f,
                            search_log_Id: v
                        };
                        e.tgt_stids = f, e.search_log_Id = v, i.isAcurrateShop(a) ? (i.lxAcurrateShopView(e, n), 
                        s.forEach(function(t) {
                            i.lxAcurrateShopFoodView(t, e, n);
                        })) : i.isRelativeShop(a) && (i.lxRelativeShopView(e, n), s.forEach(function(t) {
                            i.lxRelativeShopFoodView(t, e, n);
                        }));
                    }), i.setData({
                        pageState: "search",
                        has_next_page: p,
                        search_poi_list: i.data.search_poi_list.concat(h),
                        recommend_poi_list: i.data.recommend_poi_list.concat(_),
                        non_delivery_poi_info: g,
                        keywordValue: k,
                        inputShowClear: !0
                    }), i.is_scroll_loading = !1, i.lxSearchResultView({
                        tgt_stids: f,
                        keyword: k
                    })), t.next = 25;
                    break;

                  case 21:
                    t.prev = 21, t.t0 = t.catch(7), x = t.t0.message, console.error(x);

                  case 25:
                    i.loading(!1);

                  case 26:
                  case "end":
                    return t.stop();
                }
            }, t, i, [ [ 7, 21 ] ]);
        }))();
    },
    onClickPoilistItem: function(e) {
        var t = e.currentTarget, a = (void 0 === t ? {} : t).dataset, i = void 0 === a ? {} : a, r = i.poi, s = void 0 === r ? {} : r, n = i.index, o = void 0 === n ? 0 : n, c = i.stid, u = void 0 === c ? "" : c, l = i.logid, h = void 0 === l ? "" : l, d = s.search_result_type, g = this.data.keywordLabel, _ = {
            keyword: this.searchManager.getKeyword() || g,
            index: o,
            tgt_stids: u,
            search_log_Id: h
        };
        this.isAcurrateShop(d) ? this.lxAcurrateShopClick(s, _) : this.isRelativeShop(d) && this.lxRelativeShopClick(s, _);
    },
    onClickPoiProduct: function(e) {
        var t = e.currentTarget, a = (void 0 === t ? {} : t).dataset, i = void 0 === a ? {} : a, r = i.poi, s = void 0 === r ? {} : r, n = i.index, o = void 0 === n ? 0 : n, c = i.product, u = void 0 === c ? {} : c, l = s.tgt_stids, h = void 0 === l ? "" : l, d = s.search_log_Id, g = void 0 === d ? "" : d, _ = s.search_result_type, p = void 0 === _ ? "" : _, f = this.data.keywordLabel, v = {
            keyword: this.searchManager.getKeyword() || f,
            index: o,
            tgt_stids: h,
            search_log_Id: g
        }, y = u.wm_poi_id, w = u.product_spu_id;
        this.isAcurrateShop(p) ? this.lxAcurrateShopFoodClick(u, s, v) : this.isRelativeShop(p) && this.lxRelativeShopFoodClick(u, s, v), 
        C({
            url: "../restaurant/restaurant?poi_id=" + y + "&spu_id=" + w
        });
    },
    onClickMoreProduct: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.productShown;
        a[t] = !a[t], this.setData({
            productShown: a
        });
    },
    onClickHot: function(e) {
        var t = e.currentTarget.dataset, a = t.item, i = t.history, r = a.label_type, s = a.wm_poi_id, n = a.search_keyword;
        switch (r) {
          case j.poi:
          case j.poiKA:
            this.naviatePoi(s);
            break;

          case j.food:
          case j.hotword:
          case j.search:
          case j.h5:
          default:
            this.setData({
                keywordValue: n,
                inputShowClear: !0
            }), this.searchManager.search(n), this.setLabelType(r), this.search();
        }
        var o = this.data.historyLabels, c = I.add(a);
        c !== o && this.setData({
            historyLabels: c
        }), i ? this.lxHisClick(a) : this.lxHotClick(a);
    },
    setLabelType: function(e) {
        this.label_type = e;
    },
    onClickSuggestWord: function(e) {
        var t = e.currentTarget.dataset, a = t.suggest, i = t.index, r = t.item;
        this.setData({
            keywordValue: r,
            inputShowClear: !0
        }), this.searchManager.search(r), this.setLabelType(j.search), this.search(), this.lxSugClick(a, i);
        var s = this.data.historyLabels, n = I.add({
            label_type: j.search,
            search_keyword: r,
            label_name: r
        });
        n !== s && this.setData({
            historyLabels: n
        });
    },
    onClickSuggestShop: function(e) {
        var t = this, a = e.currentTarget.dataset, i = a.suggest, r = a.index, s = a.item, n = a.id, o = this.data.historyLabels, c = I.add({
            label_type: j.poi,
            search_keyword: s,
            label_name: s,
            wm_poi_id: n
        });
        c !== o && this.setData({
            historyLabels: c
        }), this.lxSugClick(i, r), setTimeout(function() {
            t.naviatePoi(n);
        }, 80);
    },
    loadHotLabel: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var i, r, s, n, o, c, u;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, i = e.category_type, t.next = 4, m({
                        entrance_id: i,
                        category_type: i,
                        wm_poi_id_list: "[]",
                        page_index: 0,
                        need_region: "[1]"
                    });

                  case 4:
                    r = t.sent, s = r.labels, n = r.labels_tgt_stids, o = r.scene_type, (c = s.filter(function(e) {
                        return e.label_type !== j.h5;
                    })).forEach(e.lxHotView.bind(e, {
                        scene_type: o,
                        labels_tgt_stids: n
                    })), e.setData({
                        hotLabels: c,
                        labels_tgt_stids: n,
                        scene_type: o
                    }), t.next = 17;
                    break;

                  case 13:
                    t.prev = 13, t.t0 = t.catch(0), u = t.t0.message, e.toast({
                        message: u
                    });

                  case 17:
                    e.loading(!1);

                  case 18:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 13 ] ]);
        }))();
    },
    onClickDelete: function() {
        var e = this;
        this.confirm({
            message: "清除历史记录？",
            ok: function() {
                e.setData({
                    historyLabels: I.clear()
                });
            }
        });
    },
    loadHistory: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var i;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, I.getAsync();

                  case 3:
                    i = t.sent, e.setData({
                        historyLabels: i
                    }), i.forEach(e.lxHisView), t.next = 11;
                    break;

                  case 8:
                    t.prev = 8, t.t0 = t.catch(0), console.error(t.t0);

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 8 ] ]);
        }))();
    },
    onSearchInput: function(e) {
        var t = e.detail.value;
        return t || (this.suggest_global_id = K()), this.searchManager.input(t);
    },
    loadSuggest: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var r, s, n, o, c, u, l, h, d, g, _, p, f, v;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, r = e.searchTicket, s = e.suggestTicket, r.cancel(), n = s.get(), 
                    o = e.suggest_global_id, e.searchManager.getKeyword()) {
                        t.next = 8;
                        break;
                    }
                    return e.setData({
                        pageState: "hot",
                        suggest: []
                    }), t.abrupt("return");

                  case 8:
                    return t.next = 10, k({
                        keyword: e.searchManager.getKeyword(),
                        category_type: 0,
                        entrance_id: 0,
                        suggest_global_id: o
                    });

                  case 10:
                    c = t.sent, u = c.terms, l = c.suggest, h = c.tgt_stids, d = c.log_field, e.setData({
                        tgt_stids: h
                    }), s.valid(n) && (g = y(u), p = (_ = d || {}).suggest_log_id, l && l.length > 0 && e.lxSugResultView({
                        suggest_global_id: o,
                        suggest_log_id: p
                    }, {
                        tgt_stids: h
                    }), (f = (l && l instanceof Array ? l : []).filter(function(e) {
                        return 2 !== e.type;
                    }).map(function(t, a) {
                        var r = t.type, s = t.content, n = t.poi_addition_info, c = t.query_addition_info, l = n || {}, d = l.wm_poi_id, _ = void 0 === d ? "" : d, f = l.status, v = l.status_desc, y = l.shipping_time_info, w = l.label_info, m = l.delivery_type, k = l.distance, b = l.shipping_fee_tip, x = l.min_price_tip, S = y || {}, L = S.in_shipping_time, D = S.reservation_status, T = S.status_content, C = S.desc_content, j = (w && w[0] || {}).content, q = c || {}, A = q.type, I = q.resultNum, V = void 0 === I ? "" : I, E = i({}, t, {
                            suggest_global_id: o,
                            suggest_log_id: p
                        }), K = M(s, g), P = {}, R = "";
                        if ((j || 1 === m) && (R = "80%"), j || 1 === m || (R = "90%"), j && 1 === m && (R = "66%"), 
                        e.lxSugView(i({}, E, {
                            wm_poi_id: _
                        }), a, {
                            terms: u,
                            tgt_stids: h
                        }), 0 === r) {
                            var F = "";
                            return 1 === f && (F = 1 === L ? "deliverying" : 1 === D ? "only" : "booking"), 
                            3 === f && (F = "breaking"), P = {
                                status: F,
                                min_price_tip: x,
                                shipping_fee_tip: b,
                                distance: k,
                                status_content: T,
                                desc_content: 3 === f ? v : C
                            }, i({}, E, {
                                orign: s,
                                wm_poi_id: _,
                                wm_poi_name: K,
                                wm_poi_discount: j || "",
                                delivery_type: m,
                                wm_poi_business_status: P,
                                wm_poi_name_width_percent_style: R
                            });
                        }
                        return i({}, E, {
                            orign: s,
                            type: A,
                            query: K,
                            result_num: V,
                            wm_poi_query_width_percent_style: V ? "70%" : "90%"
                        });
                    })).length > 0 ? e.setData({
                        pageState: "suggest",
                        suggest: f,
                        terms: u
                    }) : e.setData({
                        pageState: "hot",
                        suggest: []
                    })), t.next = 24;
                    break;

                  case 19:
                    t.prev = 19, t.t0 = t.catch(0), v = t.t0.message, e.setData({
                        pageState: "hot",
                        suggest: []
                    }), console.error(v);

                  case 24:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 19 ] ]);
        }))();
    },
    onClickSearch: function() {
        var e = this.data, t = e.historyLabels, a = e.keywordLabel, i = e.inputShowClear, r = this.searchManager;
        if (i || a) {
            var s = r.getKeyword(), n = s || a, o = I.add({
                label_type: j.search,
                search_keyword: n,
                label_name: n
            }), c = {
                inputFocus: !1
            };
            s && (c.keywordValue = s), o !== t && (c.historyLabels = o), this.setData(c), this.setLabelType(j.search), 
            this.search(), this.lxSearchClick(n, s);
        }
    },
    onClickPoilistActvs: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.poilistActvsShown;
        a[t] = !a[t], this.setData({
            poilistActvsShown: a
        });
    },
    onScrollBottom: function() {
        this.is_scroll_loading || this.data.has_next_page && (this.page_index = this.page_index + 1, 
        this.loadSearch(!1));
    },
    onDeleteKey: function() {
        this.searchManager.reset(), this.searchTicket.cancel(), this.suggestTicket.cancel(), 
        this.setData({
            pageState: "hot",
            keywordValue: "",
            inputFocus: !0,
            inputShowClear: !1
        });
    },
    search: function() {
        this.loadSearch(!0);
    },
    getReportData: function() {
        var e = this.data.keywordLabel;
        return {
            cid: "c_nfqbfvw",
            val: {
                label_word: e,
                keyword: e
            }
        };
    }
};

(0, s.page)(_(P, c, p));