function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new o(function(t, a) {
            function r(i, n) {
                try {
                    var s = e[i](n), c = s.value;
                } catch (t) {
                    return void a(t);
                }
                if (!s.done) return o.resolve(c).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(c);
            }
            return r("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
    }
    return t;
}, r = require("../../npm/@hfe/mp-owl/lib/index.js"), i = require("../../actions/cart.js"), o = require("../../npm/promise-polyfill/promise.js"), n = require("../../utils/promise-try.js"), s = require("../../api/analytics.js").event, c = require("../../activity/share-coupon/index.js"), u = require("../../api/index.js"), d = u.pay, l = u.orderDetail, p = u.orderStatus, h = u.orderCancel, _ = u.orderConfirmReceive, f = u.orderHistoryStatus, w = u.cancelRefundComplaints, m = u.getMyAccount, v = require("../../utils/mtpay.js"), g = v.mtpay, x = v.isMtpay, b = require("../../utils/wx.js").storage.getItem, y = require("../../api/wx.js").getUserInfo, k = require("../../api/activity-api.js").request, S = require("../../components/privacy_protection/privacy_protection.js"), D = require("../../components/buy-again/buy-again.js"), C = require("../../constants.js").CONTACT_PHONE, M = require("../../utils/format-price.js"), T = require("../../utils/fix-price.js"), I = require("../../utils/mix.js"), P = require("./log.js"), R = require("../../weapp-redux/index.js").connect, O = require("../../api/wx.js"), q = O.makePhoneCall, j = O.navigateTo, F = O.requestPayment, U = require("../../utils/wait.js"), H = require("../../utils/format-time.js"), V = require("../../utils/order-status-bottom.js"), A = require("../../utils/image-scale.js"), L = require("../base.js"), B = {
    pageName: "order-info",
    data: {
        currentPanel: "status",
        statusData: {},
        statusStreamDetail: {},
        detailOrderInfo: {},
        foodListCopy: [],
        foodToggleWord: "展开更多",
        moreFoodImgClass: "",
        reminderToastHidden: !0,
        activeIcon: "",
        activeIndex: 0,
        modalHidden: !0,
        showMoreButton: !1,
        btns: [],
        orderHistoryStatus: [],
        status_bottom_text: "",
        status_bottom_text_strong: "",
        showMap: 0,
        mapdata: {},
        status_operate_area: null,
        rider_operate_area: null,
        refund_area: null,
        poi_coupon: {},
        resultModalShown: !1,
        historyShow: !1,
        canUseClipbord: !!wx.setClipboardData,
        expected_arrival_time: "",
        disableReload: !1,
        operator_countdown_time: "",
        countDownTimer: null,
        activitySwitch: !1,
        ifFirstGiftEntry: !0,
        share_coupon_pop: !1,
        share_switch: !1,
        share_tip: {}
    },
    phone_list: [],
    id: "",
    mapSwtich: 0,
    swiperTo: -1,
    pageScrollY: 0,
    mapHeight: -1,
    isHide: !1,
    getMapHeight: function() {
        var t = this;
        wx.canIUse && wx.canIUse("createSelectorQuery") && wx.createSelectorQuery().select("#map").fields({
            size: !0
        }, function(e) {
            t.mapHeight = e.height;
        }).exec();
    },
    onClick_pay: function(r) {
        var i = this, o = r.detail, n = o.x, s = o.y;
        return t(e.default.mark(function t() {
            var r, o, c, u, l;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i.loading(!0), t.prev = 1, t.next = 4, d({
                        wm_order_id_view: i.view_id,
                        touchPoint: n + "," + s
                    });

                  case 4:
                    if (r = t.sent, i.loading(!1), !x(r)) {
                        t.next = 10;
                        break;
                    }
                    return t.next = 9, g(a({}, r, {
                        pay_success_url: "/pages/order-info/order-info?view_id=" + i.view_id + "&share_coupon_pop=" + (i.data.share_coupon_pop || !1) || ""
                    }));

                  case 9:
                    return t.abrupt("return");

                  case 10:
                    return t.next = 12, F(r);

                  case 12:
                    o = getApp().store.getState(), c = o.poi.id, i.clearFood({
                        poiID: c
                    }), i.reload(), i.alert({
                        message: "支付成功"
                    }), t.next = 24;
                    break;

                  case 18:
                    t.prev = 18, t.t0 = t.catch(1), u = t.t0.code, l = t.t0.message, i.loading(!1), 
                    i.alert({
                        message: l
                    });

                  case 24:
                  case "end":
                    return t.stop();
                }
            }, t, i, [ [ 1, 18 ] ]);
        }))();
    },
    onClick_cancelrefund: function() {
        var a = this;
        return t(e.default.mark(function r() {
            return e.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    a.confirm({
                        message: "取消退款后，当前退款流程将结束，确定取消退款吗？",
                        ok: function() {
                            var r = t(e.default.mark(function t() {
                                var r;
                                return e.default.wrap(function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                      case 0:
                                        return a.loading(!0), t.prev = 1, t.next = 4, w({
                                            hash_id: a.view_id
                                        });

                                      case 4:
                                        return a.loading(!1), t.next = 7, a.reload();

                                      case 7:
                                        1 === a.data.showMap && a.setData({
                                            showMap: 0,
                                            disableReload: !0
                                        }), a.alert({
                                            message: "取消退款成功",
                                            ok: function() {
                                                a.setData({
                                                    showMap: a.mapSwtich,
                                                    disableReload: !1
                                                }), a.lxMapView(a.mapSwtich);
                                            }
                                        }), t.next = 16;
                                        break;

                                      case 11:
                                        t.prev = 11, t.t0 = t.catch(1), r = t.t0.message, a.loading(!1), a.alert({
                                            message: r
                                        });

                                      case 16:
                                      case "end":
                                        return t.stop();
                                    }
                                }, t, a, [ [ 1, 11 ] ]);
                            }));
                            return function() {
                                return r.apply(this, arguments);
                            };
                        }()
                    });

                  case 1:
                  case "end":
                    return r.stop();
                }
            }, r, a);
        }))();
    },
    onClick_comment: function() {
        wx.navigateTo({
            url: "../poi-comment/poi-comment?poi_id=" + this.data.detailOrderInfo.wm_poi_id + "&hash_id=" + this.view_id + "&from=order-info"
        });
    },
    onClick_confirm: function() {
        var a = this;
        1 === this.data.showMap && this.setData({
            showMap: 0,
            disableReload: !0
        }), this.confirm({
            message: "确认商品已送达？",
            ok: function() {
                var r = t(e.default.mark(function t() {
                    var r, i, o, n;
                    return e.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return a.setData({
                                showMap: a.mapSwtich,
                                disableReload: !1
                            }), a.lxMapView(a.mapSwtich), a.loading(!0), t.prev = 3, t.next = 6, _({
                                hash_id: a.view_id
                            });

                          case 6:
                            r = t.sent, i = r.lottery_tip, o = r.poi_coupon, a.loading(!1), a.reload(), i ? a.alert({
                                message: i
                            }) : o ? a.showModal({
                                poi_coupon: o
                            }) : a.toast({
                                message: "订单已完成，快去评价吧"
                            }), t.next = 18;
                            break;

                          case 13:
                            t.prev = 13, t.t0 = t.catch(3), n = t.t0.message, a.loading(!1), a.alert({
                                message: n
                            });

                          case 18:
                          case "end":
                            return t.stop();
                        }
                    }, t, a, [ [ 3, 13 ] ]);
                }));
                return function() {
                    return r.apply(this, arguments);
                };
            }(),
            cancel: function() {
                a.setData({
                    showMap: a.mapSwtich,
                    disableReload: !1
                }), a.lxMapView(a.mapSwtich);
            }
        });
    },
    showModal: function(t) {
        var e = t.poi_coupon;
        this.setData({
            poi_coupon: e,
            resultModalShown: !0
        });
    },
    confirmReultModal: function() {
        this.setData({
            poi_coupon: {},
            resultModalShown: !1
        });
    },
    cancelOrder: function() {
        var a = this;
        return t(e.default.mark(function r() {
            var i, o, n, s;
            return e.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return a.loading(!0), r.prev = 1, r.next = 4, h({
                        hash_id: a.view_id
                    });

                  case 4:
                    a.loading(!1), a.reload(), 1 === a.data.showMap && a.setData({
                        showMap: 0,
                        disableReload: !0
                    }), a.alert({
                        message: "取消成功",
                        ok: function() {
                            a.setData({
                                showMap: a.mapSwtich,
                                disableReload: !1
                            }), a.lxMapView(a.mapSwtich);
                        }
                    }), r.next = 18;
                    break;

                  case 10:
                    r.prev = 10, r.t0 = r.catch(1), i = r.t0.message, o = r.t0.msg, n = r.t0.data, a.loading(!1), 
                    (s = n && n.poi_phone || "") ? (1 === a.data.showMap && a.setData({
                        showMap: 0,
                        disableReload: !0
                    }), a.confirm({
                        message: n.failure_descriptiom,
                        ok: function() {
                            var r = t(e.default.mark(function t() {
                                var r;
                                return e.default.wrap(function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                      case 0:
                                        if (t.prev = 0, a.lxMapView(a.mapSwtich), !(r = a.data.privacy.usingPrivacy)) {
                                            t.next = 7;
                                            break;
                                        }
                                        a.fetchPrivacy("SHOPPER"), t.next = 10;
                                        break;

                                      case 7:
                                        return a.setData({
                                            showMap: a.mapSwtich,
                                            disableReload: !1
                                        }), t.next = 10, q({
                                            phoneNumber: s
                                        });

                                      case 10:
                                        t.next = 16;
                                        break;

                                      case 12:
                                        t.prev = 12, t.t0 = t.catch(0), a.setData({
                                            showMap: 0
                                        }), a.alert({
                                            message: "请拨打商家电话：" + s,
                                            ok: function() {
                                                a.setData({
                                                    showMap: a.mapSwtich,
                                                    disableReload: !1
                                                }), a.lxMapView(a.mapSwtich);
                                            }
                                        });

                                      case 16:
                                      case "end":
                                        return t.stop();
                                    }
                                }, t, a, [ [ 0, 12 ] ]);
                            }));
                            return function() {
                                return r.apply(this, arguments);
                            };
                        }(),
                        cancel: function() {
                            a.setData({
                                showMap: a.mapSwtich,
                                disableReload: !1
                            }), a.lxMapView(a.mapSwtich);
                        },
                        textOK: "联系商家",
                        textCancel: "再等等"
                    })) : a.alert({
                        message: i || o
                    });

                  case 18:
                  case "end":
                    return r.stop();
                }
            }, r, a, [ [ 1, 10 ] ]);
        }))();
    },
    onClick_cancel: function() {
        var t = this, e = this.data.statusData.pay_status, a = 0 === e ? "确定取消订单" : "取消订单后，款项将原路退回到您的支付账户;详情请查看退款进度", r = 0 === e ? "" : "取消订单并退款";
        1 === this.data.showMap && this.setData({
            showMap: 0,
            disableReload: !0
        }), this.confirm({
            title: r,
            message: a,
            textOK: "取消订单",
            textCancel: "先等等",
            ok: function() {
                t.setData({
                    showMap: t.mapSwtich,
                    disableReload: !1
                }), t.lxMapView(t.mapSwtich), t.cancelOrder();
            },
            cancel: function() {
                t.setData({
                    showMap: t.mapSwtich,
                    disableReload: !1
                }), t.lxMapView(t.mapSwtich);
            }
        });
    },
    onClick_appeal: function() {
        var t = this;
        1 === this.data.showMap && this.setData({
            showMap: 0,
            disableReload: !0
        }), this.confirm({
            title: "建议联系商家",
            message: "提前联系商家可以提高退款效率哦",
            textOK: "联系商家",
            textCancel: "申请退款",
            showCloseButton: !0,
            ok: function() {
                t.lxMapView(t.mapSwtich), t.data.privacy.usingPrivacy ? t.fetchPrivacy("SHOPPER") : (t.setData({
                    showMap: t.mapSwtich,
                    disableReload: !1
                }), t.onClickContactPoi());
            },
            cancel: function() {
                t.setData({
                    showMap: t.mapSwtich,
                    disableReload: !1
                }), t.lxMapView(t.mapSwtich), wx.navigateTo({
                    url: "../refund-apply/refund-apply?view_id=" + t.view_id
                });
            }
        });
    },
    onClick_refund_process: function() {
        wx.navigateTo({
            url: "../refund-progress/refund-progress?view_id=" + this.view_id + "&from=order-info"
        });
    },
    onClickPhoneCall: function() {
        for (var t = this.phone_list, e = t.length, a = [], r = [], i = 0; i < e; ++i) {
            var o = t[i], n = o.phone, s = o.title;
            a.push(n), r.push(s + "：" + n);
        }
        a.push(C), r.push("客服电话：" + C), this.showPhoneCall({
            phones: a,
            texts: r
        });
    },
    onClickContact: function(t) {
        var e = t.currentTarget.dataset.phone;
        this.data.privacy.usingPrivacy ? this.fetchPrivacy("RUNNER") : this.showPhoneCall({
            phones: [ e ],
            texts: [ "骑手电话：" + e ]
        });
    },
    onClickContactPoi: function() {
        var t = this.data.privacy.usingPrivacy, e = [];
        for (var a in this.data.detailOrderInfo.phone_list) e.push(this.data.detailOrderInfo.phone_list[a].phone);
        var r = e.map(function(t) {
            return "商家电话：" + t;
        });
        t ? this.fetchPrivacy("SHOPPER") : this.showPhoneCall({
            phones: e,
            texts: r
        });
    },
    onClickStatusText: function(t) {
        var e = t.currentTarget.dataset, a = e.action, r = e.val;
        if ("refund-detail" === a) {
            var i = this.view_id;
            j({
                url: "../refund-detail/refund-detail?hash_id=" + i + "&refund_no=" + r
            });
        } else "call" === a && this.showPhoneCall({
            phones: [ r ],
            texts: [ "拨打电话：" + r ]
        });
    },
    copyFoodList: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1];
        return t = e > 0 ? t.slice(0, e) : t;
    },
    onClickFoodToggle: function() {
        var t = this.data, e = t.detailOrderInfo.foodlist, a = t.foodListCopy, r = e.length > a.length;
        r || wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        }), this.setData({
            foodToggleWord: r ? "点击收起" : "展示更多",
            moreFoodImgClass: r ? "trans" : ""
        });
        var i = this.copyFoodList(e, r ? -1 : 3);
        this.setData({
            foodListCopy: i
        });
    },
    onClickShop: function() {
        this.lxOrderShopClick(), wx.navigateTo({
            url: "/pages/restaurant/restaurant?poi_id=" + this.data.detailOrderInfo.wm_poi_id + "&from=order_info"
        });
    },
    onClickFoodToShop: function(t) {
        var e = t.currentTarget.dataset.spuid;
        this.lxOrderFoodListClick(), wx.navigateTo({
            url: "/pages/restaurant/restaurant?poi_id=" + this.data.detailOrderInfo.wm_poi_id + "&spu_id=" + e + "&from=order_info"
        });
    },
    loadOrderDetail: function() {
        var r = this;
        return t(e.default.mark(function t() {
            var i, o, n, s, c, u, d, p, h, _, f, w, m, v, g, x, b, y, k, S, D, C, I, P;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!(i = r.data.detailOrderInfo).id) {
                        t.next = 3;
                        break;
                    }
                    return t.abrupt("return");

                  case 3:
                    return r.loading(!0), o = r.view_id, t.prev = 5, t.next = 8, l({
                        id: o
                    });

                  case 8:
                    for ((n = t.sent).poi_icon = A(n.poi_icon, 36), s = n.discounts, c = n.foodlist, 
                    u = s.length - 1; u > -1; --u) (d = s[u]).icon_url = A(d.icon_url, 0, 0, "o");
                    for (p = c.length - 1; p > -1; --p) h = c[p], _ = h.original_price, f = h.count, 
                    w = h.icon_url, m = h.spec, v = h.attrs, g = h.picture, h.icon_url = A(w, 32), h.picture = A(g), 
                    h._sub_original_price = M(Math.round(100 * _) * f), x = [], m && x.push(m), v.length > 0 && (x = x.concat(v.map(function(t) {
                        return t.value;
                    }))), h.attrInfo = x;
                    n._order_time = H(n.order_time), r.phone_list = n.phone_list, r.wm_poi_id = n.wm_poi_id, 
                    r.lxOrderShopView(), b = n.original_price, y = n.total, k = n.box_total_price, S = n.shipping_fee, 
                    D = Math.round(100 * b) - Math.round(100 * y), n._discountPrice = D > 0 ? M(D) : "", 
                    n.id = o, n._box_total_price = T(k), n._shipping_fee = T(S), n._total = T(y), C = r.copyFoodList(c, 3), 
                    r.setData({
                        detailOrderInfo: a({}, n, {
                            idTrim: (n.id || "").replace(/\s/g, "").replace(/(.{4})/g, "$1 ")
                        }),
                        foodListCopy: C
                    }), t.next = 33;
                    break;

                  case 28:
                    t.prev = 28, t.t0 = t.catch(5), I = t.t0.code, P = t.t0.message, I && 0 !== I ? r.alert({
                        message: P
                    }) : r.alert({
                        message: "网络服务异常，请稍后再试~"
                    });

                  case 33:
                    r.loading(!1);

                  case 34:
                  case "end":
                    return t.stop();
                }
            }, t, r, [ [ 5, 28 ] ]);
        }))();
    },
    statusBottomTo: 0,
    renderStatusBottom: function(a) {
        var r = this;
        return t(e.default.mark(function t() {
            var i, o, n, s, c, u, d, l, p, h, _, f, w, m;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    i = r.statusBottomTo + 1, r.statusBottomTo = i, o = Date.now();

                  case 3:
                    if (i === r.statusBottomTo && !r.pageUnloaded) {
                        t.next = 6;
                        break;
                    }
                    return t.abrupt("return");

                  case 6:
                    if (n = {
                        status_bottom_text: "",
                        status_bottom_text_strong: ""
                    }, "status" === (s = r.data.currentPanel)) {
                        t.next = 11;
                        break;
                    }
                    return r.setData(n), t.abrupt("return");

                  case 11:
                    if (c = Date.now(), u = V(a, {
                        start: o,
                        now: c
                    })) {
                        t.next = 16;
                        break;
                    }
                    return r.setData(n), t.abrupt("return");

                  case 16:
                    if (d = u.text, l = void 0 === d ? "" : d, p = u.strong, h = void 0 === p ? "" : p, 
                    _ = u.shouldCallLater, f = void 0 !== _ && _, w = u.shouldReload, m = void 0 !== w && w, 
                    n.status_bottom_text = l, n.status_bottom_text_strong = h, r.setData(n), !m) {
                        t.next = 23;
                        break;
                    }
                    return r.reload(), t.abrupt("return");

                  case 23:
                    if (f) {
                        t.next = 25;
                        break;
                    }
                    return t.abrupt("return");

                  case 25:
                    return t.next = 27, U(1e3);

                  case 27:
                    t.next = 3;
                    break;

                  case 29:
                  case "end":
                    return t.stop();
                }
            }, t, r);
        }))();
    },
    loadHistoryStatus: function() {
        var a = this;
        return t(e.default.mark(function t() {
            var r, i;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a.loading(!0), t.prev = 1, 1 === a.data.showMap && a.setData({
                        showMap: 0,
                        disableReload: !0
                    }), t.next = 5, f({
                        order_view_id: a.view_id
                    });

                  case 5:
                    r = t.sent, a.setData({
                        orderHistoryStatus: r.status_list,
                        historyShow: !0
                    }), t.next = 13;
                    break;

                  case 9:
                    t.prev = 9, t.t0 = t.catch(1), i = t.t0.message, a.alert({
                        message: i,
                        ok: function() {
                            a.setData({
                                showMap: a.mapSwtich,
                                disableReload: !1
                            });
                        }
                    });

                  case 13:
                    a.loading(!1);

                  case 14:
                  case "end":
                    return t.stop();
                }
            }, t, a, [ [ 1, 9 ] ]);
        }))();
    },
    loadOrderStatus: function(r) {
        var i = this, o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return t(e.default.mark(function t() {
            var n, s, c, u, d, l, h, _, f, w, m, v;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return o && i.loading(!0), t.prev = 1, n = i.view_id, t.next = 5, p({
                        order_view_id: n
                    });

                  case 5:
                    s = t.sent, c = s.use_privacy, u = new Date(1e3 * s.delivery_time).getMinutes(), 
                    u = u < 10 ? "0" + u : u, d = new Date(1e3 * s.delivery_time).getHours() + ":" + u, 
                    s.status_operate_area.delivery_time = d, 3 === s.status_operate_area.operator_time_type ? (l = s.status_operate_area.operator_time / 60, 
                    h = "", l > 60 ? (h += Math.floor(l / 60) + "小时", h += l % 60 == 0 ? "" : parseInt(l % 60, 10) + "分钟") : h = parseInt(s.status_operate_area.operator_time / 60, 10) + "分钟", 
                    s.status_operate_area.snd_desc = s.status_operate_area.snd_desc.replace(/\{\}/g, "" + h)) : (i.setData({
                        operator_countdown_time: i.countDownTime(s.status_operate_area.operator_time)
                    }), _ = function t() {
                        i.data.status_operate_area.operator_time <= 0 || (i.data.status_operate_area.operator_time = i.data.status_operate_area.operator_time - 1, 
                        i.setData({
                            operator_countdown_time: i.countDownTime(i.data.status_operate_area.operator_time)
                        }), i.countDownTimer = setTimeout(function() {
                            t();
                        }, 1e3));
                    }, i.countDownTimer = setTimeout(function() {
                        _();
                    }, 1e3)), (f = s.status_operate_area.button_list).length > 3 && (s.status_operate_area.show_button_list = f.slice(0, 2), 
                    s.status_operate_area.more_button_list = f.slice(2, f.length)), w = r ? i.data.showMap : s.emotion_area.show_map_flag, 
                    i.setData({
                        status_operate_area: s.status_operate_area,
                        rider_operate_area: s.rider_operate_area ? s.rider_operate_area : null,
                        refund_area: s.refund_area ? s.refund_area : null,
                        showMap: w,
                        expected_arrival_time: s.expected_arrival_time,
                        statusData: {
                            order_status: s.order_status,
                            pay_status: s.pay_status
                        },
                        privacy: a({}, i.data.privacy, {
                            usingPrivacy: c
                        })
                    }), i.mapSwtich = s.emotion_area.show_map_flag, i.setMapData(s.emotion_area, s.status_operate_area), 
                    i.mapSwtich && setTimeout(function() {
                        i.getMapHeight();
                    }, 0), t.next = 26;
                    break;

                  case 21:
                    t.prev = 21, t.t0 = t.catch(1), m = t.t0.code, v = t.t0.message, m && 0 !== m ? i.alert({
                        message: v
                    }) : i.alert({
                        message: "网络服务异常，请稍后再试~"
                    });

                  case 26:
                    i.loading(!1);

                  case 27:
                  case "end":
                    return t.stop();
                }
            }, t, i, [ [ 1, 21 ] ]);
        }))();
    },
    countDownTime: function(t) {
        var e = "";
        e += Math.floor(t / 60) + ":";
        var a = t % 60;
        return a < 10 && (a = "0" + a), e += a;
    },
    click_operate_area_button: function(t) {
        var e = t.currentTarget.dataset.code;
        if (1001 === e && this.data.detailOrderInfo) this.lxOneMoreAgainClick(), this.onClickBuyAgain({
            currentTarget: {
                dataset: {
                    id: this.view_id,
                    poi: this.data.detailOrderInfo.wm_poi_id
                }
            }
        }); else if (2001 === e) {
            var a = getApp().store.getState().poi.id;
            this.clearFood({
                poiID: a
            }), this.onClick_pay(t);
        } else 2002 === e ? this.onClick_cancel() : 2003 === e ? this.onClick_appeal() : 2005 === e ? this.onClick_confirm() : 2007 === e ? this.onClick_cancelrefund() : 2009 === e ? this.onClick_appeal() : 2010 === e ? this.onClick_comment() : 2012 === e ? wx.switchTab({
            url: "/pages/index/index"
        }) : 2019 === e && wx.navigateTo({
            url: "/pages/refund-apply/refund-apply?view_id=" + this.view_id
        });
    },
    onClickHistory: function() {
        this.setData({
            historyShow: !1
        }), this.setData({
            showMap: this.mapSwtich,
            disableReload: !1
        }), this.lxMapView(this.mapSwtich);
    },
    clickMoreButton: function() {
        this.setData({
            showMoreButton: !this.data.showMoreButton
        });
    },
    onClickCopyViewID: function(t) {
        var e = this, a = t.currentTarget.dataset.id, r = !0;
        wx.getSystemInfo({
            success: function(t) {
                var i = t.SDKVersion.split(".");
                i[0] && "1" === i[0] && (r = !1), wx.setClipboardData({
                    data: a,
                    success: function() {
                        r || e.toast({
                            message: "订单号码已复制"
                        });
                    },
                    fail: function() {
                        r || e.toast({
                            message: "订单号码复制失败"
                        });
                    }
                });
            }
        });
    },
    setMapData: function(t, e) {
        var a = [];
        if (0 !== t.poi_latitude && ("" !== e.operator_tip ? a.push({
            iconPath: "../../img/icons/default_shop.png",
            width: 40,
            height: 53,
            longitude: t.poi_longitude / 1e6,
            latitude: t.poi_latitude / 1e6,
            callout: {
                content: e.operator_tip,
                fontSize: 12,
                bgColor: "#FFFFFF",
                color: "#333333",
                display: "ALWAYS",
                padding: 15,
                borderRadius: 53
            }
        }) : a.push({
            iconPath: "../../img/icons/default_shop.png",
            width: 40,
            height: 53,
            longitude: t.poi_longitude / 1e6,
            latitude: t.poi_latitude / 1e6
        })), 0 !== t.rider_latitude) {
            var r = t.rider_msg;
            "" !== t.rider_arrive_time && (r += " | " + t.rider_arrive_time), a.push({
                iconPath: "../../img/icons/meituan_rider.png",
                width: 60,
                height: 75,
                longitude: t.rider_longitude / 1e6,
                latitude: t.rider_latitude / 1e6,
                callout: {
                    content: r,
                    fontSize: 12,
                    bgColor: "#FFFFFF",
                    color: "#333333",
                    display: "ALWAYS",
                    padding: 15,
                    borderRadius: 75
                }
            });
        }
        0 !== t.user_latitude && a.push({
            iconPath: "../../img/icons/map-user.png",
            width: 50,
            height: 60,
            longitude: t.user_longitude / 1e6,
            latitude: t.user_latitude / 1e6
        });
        var i = {};
        1 === a.length ? i = {
            longitude: a[0].longitude,
            latitude: a[0].latitude,
            scale: 15,
            markers: a
        } : a.length >= 2 && (i = {
            longitude: (a[0].longitude + a[1].longitude) / 2,
            latitude: (a[0].latitude + a[1].latitude) / 2,
            scale: 12,
            markers: a
        }), this.setData({
            mapdata: i
        });
    },
    loadActivitySwitch: function() {
        var a = this;
        return t(e.default.mark(function t() {
            var r, i, o, n, c, u, d, l, p, h, _, f, w, m;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, 3 === (r = a.data.statusData.pay_status)) {
                        t.next = 4;
                        break;
                    }
                    return t.abrupt("return");

                  case 4:
                    return i = getApp().store.getState(), o = i.user, n = o.user_id, c = o.open_id, 
                    a.user_id = n, a.open_id = c, t.next = 9, k({
                        url: "activity/gold/switch",
                        method: "GET",
                        data: {
                            userId: a.user_id,
                            orderId: a.view_id,
                            entrance: a.data.share_coupon_pop ? 0 : 1
                        }
                    });

                  case 9:
                    u = t.sent, d = u.activitySwitch, l = u.windowStatus, p = u.buttonContext, h = u.descContext, 
                    _ = u.popupIconUrl, f = u.tipIconUrl, w = u.nextUrl, a._activitySwitch = d, a._windowStatus = l, 
                    a._buttonContext = p, a._descContext = h, a._popupIconUrl = _, a._tipIconUrl = f, 
                    a._nextUrl = w, d && s({
                        event_type: "view",
                        val_bid: "b_4e6fo7lx",
                        val_lab: {
                            custom: {
                                order_id: a.view_id
                            }
                        }
                    }), t.next = 30;
                    break;

                  case 27:
                    t.prev = 27, t.t0 = t.catch(0), m = t.t0.message;

                  case 30:
                  case "end":
                    return t.stop();
                }
            }, t, a, [ [ 0, 27 ] ]);
        }))();
    },
    onClickGiftEntrance: function() {
        var a = this;
        return t(e.default.mark(function t() {
            var r, i, o, n, c, u, d, l, p;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return s(a.data.windowStatus ? {
                        event_type: "click",
                        val_bid: "b_5ykk8c95",
                        val_lab: {}
                    } : {
                        event_type: "click",
                        val_bid: "b_q2uqika6",
                        val_lab: {}
                    }), t.next = 3, y();

                  case 3:
                    return r = t.sent, i = r.userInfo, o = getApp().store.getState(), n = o.user.token, 
                    t.next = 8, m({
                        userToken: n
                    });

                  case 8:
                    return c = t.sent, u = c.mobile, d = a, l = void 0, t.prev = 12, t.next = 15, b("UUID");

                  case 15:
                    l = t.sent, t.next = 21;
                    break;

                  case 18:
                    t.prev = 18, t.t0 = t.catch(12), p = t.t0.message;

                  case 21:
                    wx.navigateTo({
                        url: "/sub_pages/wx-gift-new/wx-gift?orderId=" + d.view_id + "&userId=" + d.user_id + "&nextUrl=" + d._nextUrl + "&username=" + i.nickName + "&avatar=" + i.avatarUrl + "&uuid=" + l + "&openid=" + d.open_id + "&phone=" + u + "&type=0"
                    });

                  case 22:
                  case "end":
                    return t.stop();
                }
            }, t, a, [ [ 12, 18 ] ]);
        }))();
    },
    onClickGiftClose: function() {
        this.setData({
            activitySwitch: !0,
            windowStatus: !1
        });
    },
    onClickMap: function() {
        this.lxMapClick(), getApp().mapdata = this.data.mapdata, wx.navigateTo({
            url: "../order-info/order-info-map"
        });
    },
    reload: function() {
        var a = this, r = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return t(e.default.mark(function t() {
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a.countDownTimer && clearTimeout(a.countDownTimer), t.next = 3, a.loadOrderStatus(r);

                  case 3:
                    return t.next = 5, a.loadOrderDetail();

                  case 5:
                    return t.next = 7, n([ a.loadShareCouponSwitch(), a.loadActivitySwitch() ]);

                  case 7:
                    a.setData({
                        activitySwitch: a._activitySwitch,
                        windowStatus: a._windowStatus,
                        buttonContext: a._buttonContext || "点击领取",
                        descContext: a._descContext || "赠您一笔奖励金",
                        popupIconUrl: a._popupIconUrl || "http://p0.meituan.net/codeman/2dcc5aa831bb186dd922b434467d31fc60871.png",
                        tipIconUrl: a._tipIconUrl || "http://p1.meituan.net/codeman/3e93fff53f5b86d6d72225c471e72d9018713.png"
                    }), a.setData({
                        share_tip: a._share_tip,
                        share_switch: a._share_switch
                    }), a.data.share_coupon_pop && a.data.share_switch && !a.data.activitySwitch ? a.setData({
                        showMap: 0,
                        disableReload: !0
                    }) : a.data.activitySwitch && a.data.windowStatus && a.data.share_coupon_pop && a.setData({
                        showMap: 0,
                        disableReload: !0
                    }), s(a.data.windowStatus ? {
                        event_type: "view",
                        val_bid: "b_rfcf6fbn",
                        val_lab: {}
                    } : {
                        event_type: "view",
                        val_bid: "b_o2t8dykl",
                        val_lab: {}
                    });

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    onUnload: function() {
        this.countDownTimer && clearTimeout(this.countDownTimer);
    },
    onPullDownRefresh: function() {
        var a = this;
        return t(e.default.mark(function t() {
            var r;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (a.loading(!0), t.prev = 1, a.data.disableReload) {
                        t.next = 5;
                        break;
                    }
                    return t.next = 5, a.reload();

                  case 5:
                    t.next = 11;
                    break;

                  case 7:
                    t.prev = 7, t.t0 = t.catch(1), r = t.t0.message, a.toast({
                        message: r
                    });

                  case 11:
                    a.loading(!1), wx.stopPullDownRefresh();

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t, a, [ [ 1, 7 ] ]);
        }))();
    },
    onShow: function() {
        this.reload(this.isHide), this.wm_poi_id && this.lxOrderShopView();
    },
    onHide: function() {
        this.isHide = !0;
    },
    onLoad: function(t) {
        var e = t.view_id, a = t.share_coupon_pop, r = void 0 !== a && a;
        this.view_id = e, this.setData({
            share_coupon_pop: r
        });
    },
    onPageScroll: function(t) {
        var e = t.scrollTop;
        this.pageScrollY = e;
    },
    getReportData: function() {
        return {
            cid: "c_hgowsqb"
        };
    },
    closeGiftEntrance: function() {
        this.setData({
            ifFirstGiftEntry: !1,
            showMap: this.mapSwtich
        });
    },
    genPrivacyReqParam: function() {
        var t = this.data.detailOrderInfo, e = t.id, a = t.phone_list, r = t.recipient_phone, i = (a || []).map(function(t) {
            return t.phone;
        });
        return {
            order_view_id: e,
            third_party_phone: JSON.stringify(i),
            user_phone: r
        };
    }
};

(0, r.page)(I(B, c, D, R(function(t) {
    return {
        poi_id: t.poi.id
    };
}, function(t) {
    return {
        clearFood: function(e) {
            t((0, i.clear)(e));
        }
    };
}), L, P, S));