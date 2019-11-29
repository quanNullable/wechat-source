function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new a(function(e, t) {
            function n(o, i) {
                try {
                    var s = r[o](i), u = s.value;
                } catch (e) {
                    return void t(e);
                }
                if (!s.done) return a.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }
            return n("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), t = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, n = require("../../npm/@hfe/mp-owl/lib/index.js"), a = require("../../npm/promise-polyfill/promise.js"), o = require("../../components/rohr/rohr.js"), i = require("../../components/buy-again/buy-again.js"), s = require("../../utils/mix.js"), u = require("../../api/index.js"), c = u.orders, l = u.orderConfirmReceive, d = u.pay, g = require("../../api/wx.js").requestPayment, f = require("../../utils/mtpay.js"), h = f.mtpay, p = f.isMtpay, v = require("../../weapp-redux/index.js").connect, x = require("../../constants.js"), m = x.ACTION_CLICK, w = x.P_ORDER, _ = x.P_POI, k = x.B_POI, b = x.PAOTUI_CODE, y = x.PAOTUI_APPID, L = require("../../utils/format-time.js"), D = require("../../utils/fix-price.js"), P = require("../../utils/image-scale.js"), T = require("../base.js"), j = require("./log.js"), q = require("../../utils/version-compare.js"), C = function(e, r) {
    if (!e || !r) return !0;
    for (var t = [ "pay_status", "logistics_status", "status", "hash_id", "comment_status" ], n = t.length - 1; n > -1; --n) {
        var a = t[n];
        if (e[a] !== r[a]) return !0;
    }
    return !1;
}, O = function(e) {
    for (var r = e.length - 1; r > -1; --r) {
        var t = e[r];
        t._order_time = L(t.order_time), t.poi_pic = P(t.poi_pic, 168), t._total = D(t.total);
    }
    return e;
}, M = "", B = {
    pageName: "orders",
    data: {
        ordersList: [],
        hasMore: !0,
        hasLogin: !0,
        hasNet: !0,
        poi_coupon: {},
        resultModalShown: !1,
        showPaoTui: !1
    },
    cursor: "",
    loadingDebounce: 0,
    loadingBlocking: !1,
    cancelLoading: function() {
        this.loadingBlocking = !1, this.loadingDebounce += 1;
    },
    onClickRefreshPage: function() {
        this.load(!0);
    },
    onClickPay: function(n) {
        var a = this, o = n.currentTarget.dataset.id, i = n.detail, s = i.x, u = i.y;
        return e(r.default.mark(function e() {
            var n, i, c;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.loading(!0), e.prev = 1, e.next = 4, d({
                        wm_order_id_view: o,
                        touchPoint: s + "," + u
                    });

                  case 4:
                    if (n = e.sent, a.loading(!1), !p(n)) {
                        e.next = 10;
                        break;
                    }
                    return e.next = 9, h(t({}, n, {
                        pay_success_url: "/pages/order-info/order-info?view_id=" + o + "&share_coupon_pop=true&activity_way=true" || ""
                    }));

                  case 9:
                    return e.abrupt("return");

                  case 10:
                    return e.next = 12, g(n);

                  case 12:
                    a.alert({
                        message: "支付成功",
                        ok: function() {
                            wx.navigateTo({
                                url: "../order-info/order-info?view_id=" + o + "&share_coupon_pop=true&activity_way=true"
                            });
                        }
                    }), e.next = 21;
                    break;

                  case 15:
                    e.prev = 15, e.t0 = e.catch(1), i = e.t0.code, c = e.t0.message, a.loading(!1), 
                    a.alert({
                        message: c
                    });

                  case 21:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 1, 15 ] ]);
        }))();
    },
    onClickOrderHeader: function(e) {
        var r = e.currentTarget.dataset, t = r.poi, n = r.order, a = r.index;
        this.lxToRestaurantClick(t), this.traceTagStart({
            src_page: w,
            src_block: k,
            src_item_index: a,
            src_item_id: n,
            tgt_page: _,
            extra: {
                poi_id: t,
                order_id: n
            },
            action: m
        }), this.onClickNavigator(e);
    },
    onClickConfirmTake: function(t) {
        var n = this, a = t.currentTarget.dataset.id;
        this.confirm({
            message: "确认商品已送达？",
            ok: function() {
                var t = e(r.default.mark(function e() {
                    var t, o, i, s, u;
                    return r.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return n.loading(!0), e.prev = 1, e.next = 4, l({
                                hash_id: a
                            });

                          case 4:
                            t = e.sent, o = t.lottery_tip, i = t.poi_coupon, n.loading(!1), o ? n.alert({
                                message: o
                            }) : i ? (i.view_id = a, n.showModal({
                                poi_coupon: i
                            }), n.refresh()) : (n.toast({
                                message: "订单已完成，快去评价吧"
                            }), n.refresh()), e.next = 16;
                            break;

                          case 10:
                            e.prev = 10, e.t0 = e.catch(1), s = e.t0.message, u = e.t0.msg, n.loading(!1), n.alert({
                                message: s || u || "未知异常"
                            });

                          case 16:
                          case "end":
                            return e.stop();
                        }
                    }, e, n, [ [ 1, 10 ] ]);
                }));
                return function() {
                    return t.apply(this, arguments);
                };
            }()
        });
    },
    showModal: function(e) {
        var r = e.poi_coupon;
        this.setData({
            poi_coupon: r,
            resultModalShown: !0
        });
    },
    confirmReultModal: function(e) {
        var r = e.currentTarget.dataset.viewid;
        this.setData({
            poi_coupon: {},
            resultModalShown: !1
        }), wx.navigateTo({
            url: "../order-info/order-info?view_id=" + r
        });
    },
    onReachBottom: function() {
        this.load();
    },
    onPullDownRefresh: function() {
        var t = this;
        return e(r.default.mark(function e() {
            var n, a, o;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (n = t.store.getState(), a = n.user.token) {
                        e.next = 4;
                        break;
                    }
                    return wx.stopPullDownRefresh(), e.abrupt("return");

                  case 4:
                    return t.cancelLoading(), t.loading(!0), e.prev = 6, e.next = 9, t.load(!0);

                  case 9:
                    e.next = 15;
                    break;

                  case 11:
                    e.prev = 11, e.t0 = e.catch(6), o = e.t0.message, t.toast({
                        message: o
                    });

                  case 15:
                    t.loading(!1), wx.stopPullDownRefresh();

                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 6, 11 ] ]);
        }))();
    },
    onClickAvatar: function() {
        this.lxOrdersLoginClick(), wx.navigateTo({
            url: "../loginV2/login?login_page=1"
        });
    },
    showLogin: function() {
        this.data.hasLogin && this.setData({
            hasLogin: !1
        });
    },
    hideLogin: function() {
        this.data.hasLogin || this.setData({
            hasLogin: !0
        });
    },
    refresh: function() {
        var t = this;
        return e(r.default.mark(function e() {
            var n, a, o, i, s, u, l, d, g, f, h, p, v, x, m, w, _, k;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, n = t.store.getState(), a = n.user.token, o = n.wx.SDKVersion, a) {
                        e.next = 6;
                        break;
                    }
                    return t.setData({
                        ordersList: []
                    }), t.showLogin(), e.abrupt("return");

                  case 6:
                    if (t.hideLogin(), i = t.loadingDebounce, !(s = t.loadingBlocking)) {
                        e.next = 10;
                        break;
                    }
                    return e.abrupt("return");

                  case 10:
                    return t.loadingBlocking = !0, t.loading(!0), e.next = 14, c({
                        type: 0,
                        category: 0,
                        cursor: ""
                    });

                  case 14:
                    if (u = e.sent, l = u.digestlist, d = u.cursor, g = u.hasmore, f = u.list_types, 
                    i !== t.loadingDebounce) {
                        e.next = 39;
                        break;
                    }
                    if (h = t.data.ordersList, p = !1, !(l.length > h.length)) {
                        e.next = 26;
                        break;
                    }
                    p = !0, e.next = 36;
                    break;

                  case 26:
                    v = l.length - 1;

                  case 27:
                    if (!(v > -1)) {
                        e.next = 36;
                        break;
                    }
                    if (x = l[v], m = h[v], !(p = C(x, m))) {
                        e.next = 33;
                        break;
                    }
                    return e.abrupt("break", 36);

                  case 33:
                    --v, e.next = 27;
                    break;

                  case 36:
                    w = !1, q(o, "1.9.0") && (w = f.filter(function(e) {
                        return e.code === b;
                    }).length > 0, _ = t.data.showPaoTui, w !== _ && (p = !0)), p && (t.cursor = d, 
                    k = O(l), t.setData({
                        ordersList: k,
                        hasMore: Boolean(1 === g && d),
                        showPaoTui: w
                    }), t.lxOrderMV(k));

                  case 39:
                    e.next = 44;
                    break;

                  case 41:
                    e.prev = 41, e.t0 = e.catch(0), console.error(e.t0);

                  case 44:
                    t.loading(!1), t.loadingBlocking = !1;

                  case 46:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 0, 41 ] ]);
        }))();
    },
    load: function() {
        var t = this, n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return e(r.default.mark(function e() {
            var a, o, i, s, u, l, d, g, f, h, p, v;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, t.setData({
                        error: {
                            show: !1,
                            type: "error"
                        }
                    }), a = t.store.getState(), o = a.user.token, i = a.wx.SDKVersion, o) {
                        e.next = 7;
                        break;
                    }
                    return t.loading(!1), t.showLogin(), e.abrupt("return");

                  case 7:
                    if (t.hideLogin(), s = t.data.hasMore, u = t.loadingDebounce, l = t.loadingBlocking, 
                    n || s) {
                        e.next = 11;
                        break;
                    }
                    return e.abrupt("return");

                  case 11:
                    if (!l) {
                        e.next = 13;
                        break;
                    }
                    return e.abrupt("return");

                  case 13:
                    return t.loadingBlocking = !0, t.loading(!0), d = n ? "" : t.cursor, e.next = 18, 
                    c({
                        type: 0,
                        category: 0,
                        cursor: d
                    });

                  case 18:
                    g = e.sent, u === t.loadingDebounce && (t.cursor = g.cursor, f = O(g.digestlist), 
                    h = g.list_types, t.setData({
                        ordersList: n ? f : t.data.ordersList.concat(f),
                        hasMore: Boolean(1 === g.hasmore && g.cursor),
                        hasNet: !0,
                        showPaoTui: q(i, "1.9.0") && h.filter(function(e) {
                            return e.code === b;
                        }).length > 0
                    }), t.lxOrderMV(f), t.loading(!1), t.loadingBlocking = !1), e.next = 33;
                    break;

                  case 22:
                    if (e.prev = 22, e.t0 = e.catch(0), p = e.t0.code, v = e.t0.message, t.loading(!1), 
                    t.loadingBlocking = !1, 10 !== p && 401 !== p) {
                        e.next = 31;
                        break;
                    }
                    return t.showLogin(), e.abrupt("return");

                  case 31:
                    t.hideLogin(), t.error({
                        message: v
                    });

                  case 33:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 0, 22 ] ]);
        }))();
    },
    lxOrderMV: function() {
        var e = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        Array.isArray(r) && r.length > 0 && r.forEach(function(r) {
            var t = r.button_list, n = r.product_list, a = r.wm_poi_id;
            t && Array.isArray(t) && t.length > 0 && t.forEach(function(r) {
                return 1001 === r.code && e.lxBuyAgainView(a);
            }), n && Array.isArray(n) && n.length > 0 && e.lxOrderItemView(a);
        });
    },
    onClickOrderDetail: function(e) {
        var r = e.currentTarget.dataset.poi;
        this.lxOrderItemClick(r);
    },
    onShow: function() {
        this.data.ordersList.length > 0 && this.refresh();
    },
    onClickOrderConfirm: function() {
        this.confirm({
            message: "确认商品已送达？",
            ok: function() {}
        });
    },
    onLoad: function() {
        var e = this;
        this.load(!0);
        var r = getApp().eventBus;
        r.on("user:login", function() {
            e.load(!0);
        }), r.on("user:logout", function() {
            e.showLogin(), e.setData({
                showPaoTui: !1
            });
        }), r.on("city:changed", function(e) {
            M = e;
        });
    },
    getReportData: function() {
        return {
            cid: "c_48pltlz"
        };
    },
    onPaoTuiClicked: function() {
        if (wx.canIUse && wx.canIUse("navigateToMiniProgram")) {
            var e = this.store.getState(), r = e.recipient, t = r.longitude, n = r.latitude, a = e.wx, o = a.longitude, i = a.latitude, s = e.user, u = s.token, c = s.user_id, l = e.dev.env;
            wx.navigateToMiniProgram({
                appId: y,
                path: "/pages/orderList/orderList?channel=wx_wmorderlist_miniPrograms&lng=" + (t || o) + "&lat=" + (n || i) + "&cityname=" + M + "&mtuserid=" + c + "&token=" + u,
                envVersion: "qa" === l ? "trial" : "release"
            });
        }
    }
};

(0, n.page)(s(B, v(), i, T, o, j));