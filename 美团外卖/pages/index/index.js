function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new D(function(e, a) {
            function n(r, i) {
                try {
                    var o = t[r](i), s = o.value;
                } catch (e) {
                    return void a(e);
                }
                if (!o.done) return D.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }
            return n("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../npm/@hfe/mp-owl/lib/index.js"), n = require("../../actions/recipient.js"), r = require("../../actions/web-view.js"), i = require("../../api/analytics.js").event, o = require("../../utils/cachemisscount.js"), s = require("../../activity/airdrop-coupon/airdrop-coupon.js"), c = require("../../api/mta.js"), l = require("../../components/rohr/rohr.js"), u = require("../../components/filter/filter.js"), d = require("../../components/header-index/header-index.js"), p = require("../../utils/object-assign.js"), f = require("../../constants.js"), g = f.P_POI, h = f.P_HOMEPAGE, _ = f.P_OUTER, v = f.P_CATEGORY, m = f.B_OUTER, x = f.B_CATEGORY, w = f.B_POILIST, b = f.B_VIEW_MORE, k = f.B_PULL_DOWN, y = f.ACTION_PULL_DOWN, P = f.ACTION_CLICK, T = f.PAOTUI_KINGKONG_CODE, S = f.PAOTUI_APPID, D = require("../../npm/promise-polyfill/promise.js"), L = require("../../utils/wait.js"), O = require("../../utils/promise-try.js"), C = require("../../utils/version-compare.js"), j = require("../../utils/mix.js"), R = require("./log.js"), q = require("../../utils/get-nearest-address.js"), I = require("./primary-filter/primary-filter.js"), E = require("./newuser-redpack-entry/newuser-redpack-entry.js"), K = require("../../api/index.js"), F = K.poiFilter, V = K.posname, B = K.homeHead, A = K.bannerInfo, M = K.addrGet, G = require("../../api/wx.js"), N = G.getLocation, U = G.navigateTo, z = require("../base.js"), W = require("../../components/poi-list/poi-list.js"), H = "", Q = (0, 
require("../../weapp-redux/index.js").connect)(function(e) {
    var t = e.cart, a = e.recipient.address, n = e.user.token, r = {};
    return Object.keys(t).forEach(function(e) {
        if (t[e].length) {
            for (var a = t[e], n = 0, i = 0, o = a.length; i < o; i++) n += a[i].count;
            r[e] = n;
        }
    }), {
        cartKeys: r,
        locName: a,
        hasLogin: Boolean(n)
    };
}, function(e) {
    return {
        setRecipient: function(t) {
            return e((0, n.set)(t));
        },
        partialRecipient: function(t) {
            return e((0, n.partial)(t));
        },
        updateWebview: function(t) {
            return e((0, r.updateWebview)(t));
        }
    };
}), Y = {
    pageName: "index",
    data: {
        hasMore: !1,
        locState: "loading",
        locationEnabled: !0,
        locationRetrying: !1,
        filterPages: null,
        filterPagesCurrent: 0,
        recommended_search_keyword: {},
        loadingLogo: !1,
        empty: !1,
        mtTopShow: !1,
        showFilterPages: !0,
        bnrImgs: [],
        SDKVersion: 0,
        showAirDropLayer: !1,
        showResetFilter: !1
    },
    entree_from: null,
    page_index: 0,
    onLocTap: function() {
        wx.navigateTo({
            url: "../loc-select/loc-select"
        });
    },
    onReachBottom: function() {
        this.data.hasMore && this.load();
    },
    onPageScroll: function(e) {
        var t = e.scrollTop;
        this.headerIndexOnScroll(t), this.filterOnPageScroll(t);
    },
    preventD: function() {},
    onClickPoilistItem: function(e) {
        var t = e.currentTarget.dataset, a = t.id, n = t.index, r = t.poi;
        this.traceTagStart({
            src_page: h,
            src_block: w,
            src_item_index: n,
            src_item_id: a,
            src_item_type: "poi",
            tgt_page: g,
            extra: {
                poi_id: a
            },
            action: P
        }), r.index = n, this.lxPoilistClick(r);
    },
    onClickTypeIcon: function(e) {
        var t = e.currentTarget.dataset, a = t.code, n = t.index, r = t.name;
        if (a === T) {
            if (wx.canIUse && wx.canIUse("navigateToMiniProgram")) {
                var i = this.store.getState(), o = i.recipient, s = o.longitude, c = o.latitude, l = i.wx, u = l.longitude, d = l.latitude, p = i.user, f = p.token, g = p.user_id, _ = i.dev.env;
                wx.navigateToMiniProgram({
                    appId: S,
                    path: "/pages/index/index?channel=wx_wmjg_miniPrograms&lng=" + (s || u) + "&lat=" + (c || d) + "&cityname=" + H + "&mtuserid=" + g + "&token=" + f,
                    envVersion: "qa" === _ ? "trial" : "release"
                });
            }
        } else wx.navigateTo({
            url: "/pages/channel-page/channel-page?typeCode=" + a + "&typeName=" + r
        });
        this.traceTagStart({
            src_page: h,
            src_block: x,
            src_item_index: n,
            src_item_id: a,
            tgt_page: v,
            action: P
        }), this.lxKingkongClick({
            cat_id: a,
            index: n
        });
    },
    onClickJumpMore: function() {
        this.traceTagStart({
            src_page: h,
            src_block: b,
            tgt_page: v,
            action: P
        });
    },
    onPullDownRefresh: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var n, r;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if ("fail" !== (n = a.data.locState)) {
                        e.next = 4;
                        break;
                    }
                    return wx.stopPullDownRefresh(), e.abrupt("return");

                  case 4:
                    return a.poilistCancelLoading(), a.loading(!0), a.traceTagStart({
                        action: y,
                        src_page: h,
                        src_block: k,
                        tgt_page: h
                    }), a.setData({
                        ifOnPullDownRefresh: !0
                    }), e.prev = 8, e.next = 11, a.load(!0, !0);

                  case 11:
                    e.next = 17;
                    break;

                  case 13:
                    e.prev = 13, e.t0 = e.catch(8), r = e.t0.message, a.toast({
                        message: r
                    });

                  case 17:
                    a.loading(!1), wx.stopPullDownRefresh();

                  case 19:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 8, 13 ] ]);
        }))();
    },
    _poilistLoad: function(a) {
        var n = this;
        return e(t.default.mark(function e() {
            var r, i, o, s, c, l, u;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r = n.page_index, i = p({
                        page_index: a ? 0 : r,
                        page_size: 20,
                        load_type: 1,
                        trace_tag: n.traceTagEnd({
                            tgt_block: w
                        })
                    }, n.filterParam = n.getFilterParam()), e.next = 4, F(i);

                  case 4:
                    return o = e.sent, s = o.poi_has_next_page, c = o.poilist, l = o.judas_field, i.sort_type ? n.judasParams = {
                        rank_trace_id: ""
                    } : i.page_index || (n.judasParams = l), u = (n.data.poilist || []).length || 0, 
                    (c || []).forEach(function(e, t) {
                        e.index = u + t, n.lxPoilistView(e);
                    }), e.abrupt("return", {
                        poi_has_next_page: s,
                        page_index: a ? 1 : r + 1,
                        poilist: c
                    });

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, n);
        }))();
    },
    reloadPoilist: function() {
        return this.poilistCancelLoading(), this.loadPoilist(!0);
    },
    loadPoilist: function(a) {
        var n = this, r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return e(t.default.mark(function e() {
            var i, o, s, c, l, u, d;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, n.setData({
                        loadingLogo: !a
                    }), a && n.loading(!0, !0), e.next = 5, n.poilistLoad(a);

                  case 5:
                    if (i = e.sent, o = i.poi_has_next_page, s = i.page_index, c = i.valid) {
                        e.next = 11;
                        break;
                    }
                    return e.abrupt("return");

                  case 11:
                    n.page_index = s, l = 0 === n.data.poilist.length && (n.filterParam.activity_filter_codes.length > 0 || n.data.filter.selectedPriceRange.length > 0), 
                    n.setData({
                        loadingLogo: !1,
                        hasMore: o,
                        empty: 0 === n.data.poilist.length,
                        showResetFilter: l
                    }), n.error(), l && n.lxResetFilterView(), e.next = 23;
                    break;

                  case 18:
                    e.prev = 18, e.t0 = e.catch(0), u = e.t0.code, d = e.t0.message, 2 === u ? (n.error({
                        message: "附近暂无商家, 请确认您的地址~",
                        img: "no-poi",
                        textOK: "设置地址",
                        ok: function() {
                            U({
                                url: "../loc-select/loc-select"
                            });
                        }
                    }), n.setData({
                        poilist: []
                    })) : a && !r ? (n.error({
                        message: "您的手机网络好像不太流畅哦~",
                        img: "no-net",
                        textOK: "重新加载",
                        ok: function() {
                            n.loadPoilist(!0);
                        }
                    }), n.setData({
                        poilist: []
                    })) : n.toast({
                        message: "网络异常, 请重试"
                    });

                  case 23:
                    a && n.loading(!1);

                  case 24:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 0, 18 ] ]);
        }))();
    },
    loadHead: function(a) {
        var n = this;
        return e(t.default.mark(function e() {
            var r, i, o, s, c, l, u;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, r = n.data.filterPages, !a && r) {
                        e.next = 12;
                        break;
                    }
                    return e.next = 5, B({
                        trace_tag: n.traceTagGet({
                            tgt_block: x
                        }),
                        need_regions: "2,7"
                    });

                  case 5:
                    i = e.sent, o = i.primary_filter, s = i.recommended_search_keyword, c = n.store.getState(), 
                    l = c.wx.SDKVersion, (u = I(o, l)).length > 0 && n.lxKingkongView(u[0], 0), n.setData({
                        showFilterPages: u.length > 0,
                        filterPages: u,
                        filterPagesCurrent: 0,
                        recommended_search_keyword: s
                    });

                  case 12:
                    e.next = 18;
                    break;

                  case 14:
                    e.prev = 14, e.t0 = e.catch(0), n.setData({
                        showFilterPages: !1
                    }), console.error(e.t0);

                  case 18:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 0, 14 ] ]);
        }))();
    },
    loadAirDropConpon: function(a) {
        var n = this;
        return e(t.default.mark(function e() {
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, n.data.ifOnPullDownRefresh) {
                        e.next = 4;
                        break;
                    }
                    return e.next = 4, n.requestAirDrop(a);

                  case 4:
                    e.next = 9;
                    break;

                  case 6:
                    e.prev = 6, e.t0 = e.catch(0), console.log(e.t0);

                  case 9:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 0, 6 ] ]);
        }))();
    },
    load: function(a) {
        var n = this, r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return e(t.default.mark(function e() {
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n.loadHead(a), n.loadQuickFilter(), e.prev = 2, e.next = 5, n.loadFilter(a);

                  case 5:
                    e.next = 10;
                    break;

                  case 7:
                    e.prev = 7, e.t0 = e.catch(2), console.error(e.t0);

                  case 10:
                    return e.next = 12, n.loadPoilist(a, r);

                  case 12:
                    return e.next = 14, n.loadAirDropConpon(a);

                  case 14:
                    a && n.filterGetClientRect();

                  case 15:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 2, 7 ] ]);
        }))();
    },
    _onLoad: function() {
        var a = this;
        return e(t.default.mark(function n() {
            var r, o, s, c, l, u, d, p, f, g, v, x, w, b, k, y;
            return t.default.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    if (r = getApp(), o = r.eventBus, s = function() {
                        var n = e(t.default.mark(function e() {
                            return t.default.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    return a.loading(!0), e.next = 3, a.load(!0);

                                  case 3:
                                    a.loading(!1);

                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            }, e, a);
                        }));
                        return function() {
                            return n.apply(this, arguments);
                        };
                    }(), console.log("reload", s), o.on("user:logout", s), o.on("user:login", s), o.on("location:changed", e(t.default.mark(function e() {
                        return t.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return a.setData({
                                    locState: "done"
                                }), e.next = 3, a.filterClear();

                              case 3:
                                s();

                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, a);
                    }))), o.on("city:changed", function(e) {
                        H = e;
                    }), a.traceTagStart({
                        src_page: _,
                        src_block: m,
                        tgt_page: h,
                        action: P
                    }), c = a.store.getState(), l = c.wx, u = l.latitude, d = l.longitude, a.loading(!0), 
                    p = a.data, f = p.hasLogin, g = p.locName, v = Boolean(g), x = f ? 1 : 0, v || !f) {
                        n.next = 26;
                        break;
                    }
                    return w = null, n.prev = 15, n.next = 18, M({
                        type: 1
                    });

                  case 18:
                    b = n.sent, w = q(u, d, b), n.next = 25;
                    break;

                  case 22:
                    n.prev = 22, n.t0 = n.catch(15), console.error(n.t0);

                  case 25:
                    w && (a.setRecipient(w), v = !0);

                  case 26:
                    if (i({
                        event_type: "view",
                        val_bid: "b_z2ze2",
                        val_lab: {
                            custom: {
                                login: x,
                                set: v ? 1 : 0
                            }
                        }
                    }), v) {
                        n.next = 41;
                        break;
                    }
                    return k = "", n.prev = 29, n.next = 32, V();

                  case 32:
                    y = n.sent, k = y.result, n.next = 39;
                    break;

                  case 36:
                    n.prev = 36, n.t1 = n.catch(29), console.error(n.t1);

                  case 39:
                    k && (a.partialRecipient({
                        address: k,
                        latitude: u,
                        longitude: d
                    }), v = !0), i({
                        event_type: "view",
                        val_bid: "b_hFcrr",
                        val_lab: {
                            custom: {
                                login: x,
                                set: k ? 1 : 0
                            }
                        }
                    });

                  case 41:
                    if (!v) {
                        n.next = 48;
                        break;
                    }
                    return a.setData({
                        locState: "done"
                    }), a.initFilter(), n.next = 46, a.load(!0);

                  case 46:
                    n.next = 50;
                    break;

                  case 48:
                    a.setData({
                        locState: "fail"
                    }), a.error({
                        message: "无法获取地址，请手动定位",
                        textOK: "设置地址",
                        ok: function() {
                            i({
                                event_type: "click",
                                val_bid: "b_nyW8A"
                            }), U({
                                url: "../loc-select/loc-select"
                            });
                        }
                    });

                  case 50:
                    a.loading(!1);

                  case 51:
                  case "end":
                    return n.stop();
                }
            }, n, a, [ [ 15, 22 ], [ 29, 36 ] ]);
        }))();
    },
    locationRetrying: !1,
    locationError: function() {
        var a = this, n = this.locationRetrying, r = this.data.locationEnabled, o = this.store.getState().wx, s = o.latitude, c = o.longitude;
        if (r && 0 !== s && 0 !== c) this.error(); else {
            var l = this.onClickTryLocaton;
            l || (this.onClickTryLocaton = l = function() {
                var n = e(t.default.mark(function e() {
                    return t.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return i({
                                event_type: "click",
                                val_bid: "b_Rww4V"
                            }), e.next = 3, a.locationObtain();

                          case 3:
                            a.onShow();

                          case 4:
                          case "end":
                            return e.stop();
                        }
                    }, e, a);
                }));
                return function() {
                    return n.apply(this, arguments);
                };
            }()), this.error({
                message: n ? "正在尝试获取地址..." : "无法获取地理位置，请选择收货地址",
                textOK: n ? "正在获取地址" : "搜索地址",
                ok: function() {
                    wx.navigateTo({
                        url: "../loc-select/loc-select"
                    });
                }
            });
        }
    },
    locationPrompting: !1,
    getLocationTimeOut: function() {
        var a = this;
        this.locationPrompting && (this.locationPrompting = !1, c("send", "wx_app_get_location_fail", {
            duration: 5e3
        }), this.confirm({
            message: "定位失败，请检查一下网络环境",
            textOK: "重新定位",
            textCancel: "搜索地址",
            ok: function() {
                var n = e(t.default.mark(function e() {
                    return t.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.next = 2, a.locationObtain();

                          case 2:
                            a.onShow();

                          case 3:
                          case "end":
                            return e.stop();
                        }
                    }, e, a);
                }));
                return function() {
                    return n.apply(this, arguments);
                };
            }(),
            cancel: function() {
                wx.navigateTo({
                    url: "../loc-select/loc-select"
                });
            }
        }));
    },
    locationPrompt: function(a) {
        var n = this;
        if (!this.locationPrompting) {
            this.locationPrompting = !0;
            var r = +new Date(), o = this, s = setTimeout(function() {
                o.getLocationTimeOut();
            }, 5e3);
            wx.getLocation({
                success: function() {
                    clearTimeout(s), n.locationPrompting = !1;
                    var e = +new Date();
                    c("send", "wx_app_get_location_success", {
                        duration: e - r
                    }), a && "function" == typeof a && a();
                },
                fail: function(o) {
                    if (!0 === n.locationPrompting) {
                        clearTimeout(s);
                        var l = wx.openSetting, u = o && o.errMsg && -1 !== o.errMsg.toLowerCase().indexOf("auth"), d = u ? "deny" : "fail";
                        i({
                            event_type: "view",
                            val_lab: {
                                custom: {
                                    reason: d,
                                    openSetting: l ? 1 : 0
                                }
                            },
                            val_bid: "b_zTKH5"
                        });
                        var p = +new Date();
                        c("send", "wx_app_get_location_fail", {
                            duration: p - r
                        }), u ? (n.setData({
                            locState: n.data.locationEnabled ? "done" : "fail"
                        }), l ? n.confirm({
                            message: "外卖送餐需要您的地理位置",
                            textOK: "去开启",
                            ok: function() {
                                i({
                                    event_type: "click",
                                    val_lab: {
                                        custom: {
                                            reason: d,
                                            type: 1
                                        }
                                    },
                                    val_bid: "b_b4ztz"
                                }), n.locationPrompting = !1, l({
                                    success: function() {
                                        var a = e(t.default.mark(function e(a) {
                                            var r = a.authSetting["scope.userLocation"];
                                            return t.default.wrap(function(e) {
                                                for (;;) switch (e.prev = e.next) {
                                                  case 0:
                                                    if (i({
                                                        event_type: "view",
                                                        val_lab: {
                                                            custom: {
                                                                auth: r ? 1 : 0
                                                            }
                                                        },
                                                        val_bid: "b_Ed4Im"
                                                    }), n.setData({
                                                        locState: "loading"
                                                    }), !r) {
                                                        e.next = 6;
                                                        break;
                                                    }
                                                    return e.next = 5, n.locationObtain();

                                                  case 5:
                                                    n.onShow();

                                                  case 6:
                                                  case "end":
                                                    return e.stop();
                                                }
                                            }, e, n);
                                        }));
                                        return function(e) {
                                            return a.apply(this, arguments);
                                        };
                                    }()
                                });
                            },
                            cancel: function() {
                                i({
                                    event_type: "click",
                                    val_lab: {
                                        custom: {
                                            reason: d,
                                            type: 0
                                        }
                                    },
                                    val_bid: "b_b4ztz"
                                }), n.locationPrompting = !1, a && "function" == typeof a && a();
                            }
                        }) : n.alert({
                            message: "检测到您没打开美团外卖的定位权限，请到设置启用：点击右上角按钮，进入小程序介绍页，再次点击右上角按钮，进入设置页面，打开定位权限",
                            ok: function() {
                                i({
                                    event_type: "click",
                                    val_lab: {
                                        custom: {
                                            reason: d,
                                            type: -1
                                        }
                                    },
                                    val_bid: "b_b4ztz"
                                }), n.locationPrompting = !1;
                            }
                        })) : (n.locationPrompting = !1, n.setData({
                            locState: "fail"
                        }));
                    }
                }
            });
        }
    },
    locationTest: function() {
        var e = this.store.getState(), t = e.wx, a = t.latitude, n = t.longitude, r = e.recipient, i = r.longitude, o = r.latitude, s = 0 !== a && 0 !== n || "" !== i && "" !== o;
        s || (this.hasGuideLocation = !0, this.locationPrompt()), this.setData({
            locationEnabled: s
        });
    },
    locationObtain: function() {
        var a = this;
        return e(t.default.mark(function e() {
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.locationRetrying = !0, a.locationError(), e.next = 4, O([ N(), L(1e3) ]);

                  case 4:
                    a.locationRetrying = !1, a.locationTest(), a.locationError();

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    navgaiToMT: function(e) {
        var t = e.currentTarget.dataset.tag;
        "mt" === this.entree_from && wx.navigateBackMiniProgram({
            extraData: {
                tab: t,
                from: "waimai"
            }
        });
    },
    setMtTop: function() {
        this.setNavigationBarTitle({
            title: "美团生活"
        }), this.setData({
            mtTopShow: !0
        });
    },
    hasCallOnLoad: !1,
    hasGuideLocation: !1,
    _getBanner: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var n, r;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, A({
                        need_regions: 1
                    });

                  case 2:
                    n = e.sent, r = n.top_banner_list, a.setData({
                        bnrImgs: r
                    }), r[0] && a.reportBannerView(r[0]);

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    bannerChange: function(e) {
        var t = e.detail.current;
        this.reportBannerView(this.data.bnrImgs[t]);
    },
    reportBannerView: function(e) {
        var t = void 0;
        try {
            t = e.h5_url.match(/activity_id=[^&]*/)[0].split("=")[1];
        } catch (e) {
            t = "";
        }
        i({
            event_type: "view",
            val_bid: "b_qE09x",
            val_lab: {
                custom: {
                    activity_id: t,
                    ad: "",
                    banner_id: e.banner_act_id
                }
            }
        });
    },
    onShow: function() {
        var e = getApp(), t = e.store.getState().extradata.from;
        if (t && "dianping-wxapp" !== t && this.setMtTop(), this.entree_from = t, this.locationTest(), 
        !this.data.locationEnabled) return this.loading(!1), void this.locationError();
        this.hasCallOnLoad ? this._onShow && this._onShow() : (i({
            event_type: "view",
            val_bid: "b_2E9x4",
            val_lab: {
                custom: {
                    recover: this.hasGuideLocation ? 1 : 0
                }
            }
        }), this._onLoad()), this.hasCallOnLoad = !0, this.lxFilterView(), "navToRedpackPage" === e.afterLoginAction ? (this.navToRedpackPage(), 
        e.afterLoginAction = "") : this._getUserRedpackInfo(), this.lxFilterFastestSpeedView(), 
        C(this.SDKVersion, "1.7.1") && this._getBanner(), this.lxSearchView({
            spread: this.data.filter.activeTab || this.data.headerIndex.hideLoc ? "1" : "0"
        }), this.lxQuickFilterView();
    },
    onLoad: function() {
        var e = this, t = this.store.getState().dev.env;
        t && this.toast({
            message: "当前环境" + t
        }), this.locationTest(), setTimeout(function() {
            c("send", "rootpage");
        }, 2e3), o(), wx.getSystemInfo({
            success: function(t) {
                e.SDKVersion = t.SDKVersion;
            }
        });
    },
    getReportData: function() {
        return {
            cid: "c_m84bv26"
        };
    },
    onKingkongPageChange: function(e) {
        var t = e.detail.current, a = this.data.filterPages;
        this.lxKingkongView(a[t], t);
    },
    openWebview: function(e) {
        var t = e.currentTarget.dataset, a = t.viewurl, n = t.index;
        this.reportBannerClick(this.data.bnrImgs[n]);
        var r = this.store, i = r.getState().wx, o = i.latitude, s = i.longitude, c = r.getState().user, l = c.open_id, u = c.user_id, d = c.token;
        a = (a = /\?/.test(a) ? a + "&latitude=" + o + "&longitude=" + s : a + "?latitude=" + o + "&longitude=" + s) + "&open_id=" + l + "&user_id=" + u + "&token=" + d, 
        /https:\/\/wxapp/.test(a) ? (a = a.split("https://wxapp")[1], U({
            url: a
        })) : U({
            url: "/pages/web-view/web-view?redirectUrl=" + encodeURIComponent(a)
        });
    },
    reportBannerClick: function(e) {
        var t = void 0;
        try {
            t = e.h5_url.match(/activity_id=[^&]*/)[0].split("=")[1];
        } catch (e) {
            t = "";
        }
        i({
            event_type: "click",
            val_bid: "b_Fjxks",
            val_lab: {
                custom: {
                    activity_id: t,
                    ad: "",
                    banner_id: e.banner_act_id
                }
            }
        });
    },
    onClickResetFilter: function() {
        this.filterClear(), this.reloadPoilist(), this.lxResetFilterClick();
    }
};

(0, a.page)(j(Y, E, Q, W, s, u, d, z, R, l));