function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new h(function(e, a) {
            function n(i, r) {
                try {
                    var o = t[i](r), s = o.value;
                } catch (e) {
                    return void a(e);
                }
                if (!o.done) return h.resolve(s).then(function(e) {
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

var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, i = function() {
    function e(e, t) {
        var a = [], n = !0, i = !1, r = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (a.push(o.value), 
            !t || a.length !== t); n = !0) ;
        } catch (e) {
            i = !0, r = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (i) throw r;
            }
        }
        return a;
    }
    return function(t, a) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = require("../../npm/@hfe/mp-owl/lib/index.js"), o = require("../../actions/addr-edit.js"), s = require("../../actions/purchase.js"), c = require("../../actions/cart.js"), d = require("../../constants.js"), u = d.ACTION_CLICK, p = d.P_SUBMIT_ORDER, l = d.P_ORDERDETAIL, f = d.B_ORDERSTATUS, _ = d.B_SUBMIT, h = require("../../npm/promise-polyfill/promise.js"), v = require("../../utils/mtpay.js"), g = v.mtpay, m = v.isMtpay, w = require("../../utils/format-time.js"), x = require("../../utils/split-float.js"), y = require("../../utils/mix.js"), b = require("./picker/arrival-time.js"), k = require("../../api/index.js"), S = k.orderSubmit, C = k.orderUpdate, D = k.pay, T = k.addrGet, A = k.getUserPoiCoupon, P = k.getValidCoupons, L = k.couponDisableReason, I = k.getCouponsList, O = require("../../api/analytics.js").event, j = require("./log.js"), M = function(e) {
    return e.missingfoods || (e.length ? e : []);
}, E = require("../../api/wx.js"), F = E.navigateTo, q = E.requestPayment, R = require("../base.js"), U = require("../../weapp-redux/index.js").connect, K = require("../../utils/object-assign.js"), z = require("../../utils/image-scale.js"), V = require("../../utils/format-price.js"), B = require("../../utils/fix-price.js"), H = function(e) {
    return e.forEach(function(e) {
        var t = e.amount, a = x(t), n = i(a, 2);
        e.amount = n[0], e.tail = n[1];
    }), e;
}, N = {
    pageName: "preview",
    data: {
        mtpayFlag: !1,
        inited: !1,
        index: 0,
        foodlistCopy: [],
        foodToggleWord: "展开更多",
        moreFoodImgClass: "",
        submiting: !1,
        isTipLengthOverTwo: !1,
        scrollTop: 0,
        pay_info: [],
        payType: 2,
        previewErrorMsg: "",
        previewData: {},
        address_info: {},
        formValidState: "",
        addressSelectShow: !1,
        addresses: [],
        tip: "",
        poi_coupon_info: null,
        coupon_info: null,
        poiCouponModalShown: !1,
        poiCouponlist: {},
        couponlist: {},
        couponDisableReasons: {},
        expiredCoupons: null,
        expiredCouponCount: 0,
        diners_option_value: "",
        diners_count: 0,
        dinnerOption: {
            show: !1,
            tableware_advocate_tip: ""
        },
        hasUndoneAddr: !1,
        canNotShippingAddr: !1,
        privacy: {
            support: !1,
            title: "号码保护",
            icon: "",
            openTitle: "对商家、骑手隐藏您的真实手机号，保护您的隐私",
            offTitle: "对商家、骑手隐藏您的真实手机号，保护您的隐私",
            using: 0,
            showIntro: !1
        },
        isIpx: /iPhone X/.test(wx.getSystemInfoSync().model)
    },
    getSelectedAddr: function() {
        var e = this.data.previewData, t = e.address_type, a = e.address_info;
        return 1 === t ? a : null;
    },
    addressInclude: !1,
    refreshAddresses: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, i, r, o, s, c;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = e.data.poi_id, e.addressInclude = !1, t.next = 4, T({
                        type: 2,
                        wm_poi_id: n
                    });

                  case 4:
                    i = t.sent, r = !!i.filter(function(e) {
                        return e.bind_type < 11;
                    }).length, o = !!i.filter(function(e) {
                        return 1 !== e.can_shipping;
                    }).length, e.setData({
                        addresses: i,
                        hasUndoneAddr: r,
                        canNotShippingAddr: o
                    }), s = e.data.previewData.address_info, i.forEach(function(t) {
                        e.data.previewData.address_info && t.id === e.data.previewData.address_info.id && t.can_shipping && (K(s, t), 
                        e.addressInclude = !0);
                    }), c = {}, Object.keys({
                        address_info: s
                    }).forEach(function(t) {
                        c["previewData." + t] = e.addressInclude ? s : {};
                    }), e.setData(c);

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onTapSwitchPrivacyService: function() {
        var e = this.data.privacy;
        this.lxPrivacySwitchStatusClick(), this.setData({
            privacy: n({}, e, {
                using: 1 === e.using ? 0 : 1
            })
        });
    },
    onTapPrivacyServiceHelp: function() {
        this.setData({
            privacy: n({}, this.data.privacy, {
                showIntro: !0
            })
        });
    },
    onTapClosePrivacyServiceHelp: function() {
        this.setData({
            privacy: n({}, this.data.privacy, {
                showIntro: !1
            })
        });
    },
    onClickSelectAddr: function(e) {
        var n = this;
        return t(a.default.mark(function t() {
            var i, r, o, s, c, d, u;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n.lxAddrClick(e), n.loading(!0), t.prev = 2, t.next = 5, n.refreshAddresses();

                  case 5:
                    for (i = n.data, r = i.addresses, o = i.poi_id, s = 0, c = r.length - 1; c > -1; --c) 1 === (d = r[c].can_shipping) && (s += 1);
                    if (0 !== s) {
                        t.next = 13;
                        break;
                    }
                    return t.next = 11, F({
                        url: "../addr-add/addr-add?from=preview&poi_id=" + o
                    });

                  case 11:
                    t.next = 14;
                    break;

                  case 13:
                    n.setData({
                        addressSelectShow: !0
                    });

                  case 14:
                    t.next = 20;
                    break;

                  case 16:
                    t.prev = 16, t.t0 = t.catch(2), u = t.t0.message, n.toast({
                        message: u
                    });

                  case 20:
                    n.loading(!1);

                  case 21:
                  case "end":
                    return t.stop();
                }
            }, t, n, [ [ 2, 16 ] ]);
        }))();
    },
    onClickAddressMask: function() {
        this.setData({
            addressSelectShow: !1,
            addresses: []
        });
    },
    onClickAddress: function(e) {
        for (var t = e.currentTarget.dataset.id, a = this.data.addresses, n = null, i = a.length - 1; i > -1; --i) {
            var r = a[i];
            if (String(r.id) === String(t)) {
                n = r;
                break;
            }
        }
        n && (this.setRecipient(n), this.setData({
            addressSelectShow: !1,
            addresses: [],
            formValidState: ""
        }), this.refresh({
            selectedAddr: n
        }));
    },
    onClickAddressEdit: function(e) {
        var n = this, i = e.currentTarget.dataset.id;
        return t(a.default.mark(function e() {
            var t, r, o, s, c, d;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    t = n.data, r = t.poi_id, o = t.addresses, s = null, c = o.length - 1;

                  case 3:
                    if (!(c > -1)) {
                        e.next = 11;
                        break;
                    }
                    if (d = o[c], String(d.id) !== String(i)) {
                        e.next = 8;
                        break;
                    }
                    return s = d, e.abrupt("break", 11);

                  case 8:
                    --c, e.next = 3;
                    break;

                  case 11:
                    if (!s) {
                        e.next = 15;
                        break;
                    }
                    return n.dispatchAddrEdit(s), e.next = 15, F({
                        url: "../addr-add/addr-add?from=preview&action=edit&addr_id=" + i + "&poi_id=" + r
                    });

                  case 15:
                  case "end":
                    return e.stop();
                }
            }, e, n);
        }))();
    },
    orderSubmitArgs: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = this.submitTouchPoint, a = this.data, n = a.coupon_info, i = a.poi_coupon_info, r = a.previewData, o = r.foodlist, s = r.original_price, c = r.ahead_discount_time, d = a.privacy.using, u = (this.data.previewData.expected_arrival_info || {}).unixtime || 0, p = e.payType, l = void 0 === p ? this.data.payType : p, f = e.selectedAddr, _ = void 0 === f ? this.getSelectedAddr() : f, h = e.coupon_view_id, v = void 0 === h ? n && n.selected_coupon_view_id || "-1" : h, g = e.poicoupon_view_id, m = void 0 === g ? i && i.selected_coupon_view_id || "0" : g, w = e.expected_arrival_time, x = void 0 === w ? u : w, y = e.submit_once_again, b = void 0 === y ? 0 : y, k = e.hash_id, S = void 0 === k ? "" : k, C = {
            data: {
                wm_order_pay_type: l,
                expected_arrival_time: x,
                foodlist: (o || []).map(function(e) {
                    var t = e.spu_id, a = e.id, n = e.count, i = e.cart_id, r = e.attrs, o = e.activity_tag;
                    return {
                        spu_id: t,
                        id: a,
                        count: n,
                        cart_id: i,
                        attrs: (r || []).map(function(e) {
                            return e.id;
                        }),
                        activity_tag: o
                    };
                }),
                poicoupon_view_id: m,
                coupon_view_id: v,
                original_price: s,
                ahead_discount_time: c,
                confirm_submit: 0,
                diners_count: this.data.diners_count ? this.data.diners_count : 0,
                submit_once_again: b,
                hash_id: S,
                privacy_selected: d
            },
            touchPoint: t
        };
        return _ && K(C.data, {
            addr_id: _.id || 0,
            addr_longitude: _.longitude || 0,
            addr_latitude: _.latitude || 0,
            recipient_name: _.name || "",
            recipient_gender: _.gender || "",
            recipient_address: _.address || "",
            recipient_phone: _.phone || "",
            house_number: _.house_number || ""
        }), C;
    },
    stockFromMissingFoods: function(e) {
        for (var t = M(e), a = this.data.previewData.foodlist, n = Object.create(null), i = a.length - 1; i > -1; --i) {
            var r = a[i], o = r.id, s = r.count;
            n[o] = s;
        }
        return t.map(function(e) {
            var t = e.id, a = e.stock;
            return {
                id: t,
                count: Math.max(0, Math.min(n[t], a))
            };
        });
    },
    dealSubmitError: function(e) {
        var n = this, i = e.code, r = e.message, o = e.data, s = getApp();
        5 === i ? (this.setToken({
            token: o.order_token
        }), this.alert({
            message: r,
            textOK: "知道了",
            ok: function() {
                wx.navigateBack();
            }
        })) : 8 === i ? this.confirm({
            message: r,
            textOK: "继续添加",
            textCancel: "不用了",
            ok: function() {
                wx.navigateBack();
            }
        }) : 10 === i || 401 === i ? wx.redirectTo({
            url: "../loginV2/login?login_page=3"
        }) : 3 === i ? this.alert({
            message: r,
            textOK: "知道了",
            ok: function() {
                var e = n.data.poi_id, t = n.stockFromMissingFoods(o);
                n.setSKUs({
                    poiID: e,
                    skus: t
                }), s.showCart = !0, wx.navigateBack();
            }
        }) : 17 === i ? this.alert({
            message: r,
            textOK: "知道了",
            ok: function() {
                var e = n.data.poi_id, t = n.stockFromMissingFoods(o);
                n.setSKUs({
                    poiID: e,
                    skus: t
                }), s.showCart = !0, wx.navigateBack();
            }
        }) : 12 === i ? this.confirm({
            message: r,
            textCancel: "重新选择",
            textOK: "继续下单",
            cancel: function() {
                s.showCart = !0, wx.navigateBack();
            },
            ok: function() {
                var e = t(a.default.mark(function e() {
                    return a.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.next = 2, n.refresh();

                          case 2:
                            return e.next = 4, n.onClickSubmit();

                          case 4:
                          case "end":
                            return e.stop();
                        }
                    }, e, n);
                }));
                return function() {
                    return e.apply(this, arguments);
                };
            }()
        }) : 18 === i ? this.confirm({
            message: r,
            textCancel: "重新选择",
            textOK: "继续下单",
            cancel: function() {
                var e = n.data.poi_id, t = n.stockFromMissingFoods(o);
                n.setSKUs({
                    poiID: e,
                    skus: t
                }), s.showCart = !0, wx.navigateBack();
            },
            ok: function() {
                var e = t(a.default.mark(function e() {
                    var t, i;
                    return a.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return t = n.data.poi_id, i = n.stockFromMissingFoods(o), n.setSKUs({
                                poiID: t,
                                skus: i
                            }), e.next = 5, n.refresh();

                          case 5:
                            return e.next = 7, n.onClickSubmit();

                          case 7:
                          case "end":
                            return e.stop();
                        }
                    }, e, n);
                }));
                return function() {
                    return e.apply(this, arguments);
                };
            }()
        }) : this.alert({
            message: r,
            ok: function() {
                o && 1 === o.refresh && n.refresh(), n.data.mtpayFlag && (n.clearMealInfo(), wx.navigateBack());
            }
        });
    },
    submitTouchPoint: "",
    handleSubmitState: function(e) {
        this.setData({
            submiting: e
        });
    },
    startSubmit: function() {
        this.handleSubmitState(!0);
    },
    endSubmit: function() {
        this.handleSubmitState(!1);
    },
    setHashId: function(e) {
        this.hash_id = e;
    },
    clearMealInfo: function() {
        this.clearFood({
            poiID: this.data.poi_id
        }), this.clearHashId();
    },
    clearHashId: function() {
        this.hash_id = void 0;
    },
    refreshPay: function() {
        this.refresh({
            hash_id: this.hash_id,
            submit_once_again: 1
        });
    },
    onClickSubmit: function(e) {
        var i = this;
        return t(a.default.mark(function r() {
            var o, s, c, d, h, v, w, x, y, b, k, C, T, A, P, L, I;
            return a.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    if (!i.data.submiting) {
                        r.next = 2;
                        break;
                    }
                    return r.abrupt("return");

                  case 2:
                    if (i.startSubmit(), i.lxSubmitClick(), O({
                        event_type: "click",
                        val_bid: "b_zXoJH"
                    }), e && (o = e.detail, s = o.x, c = o.y, i.submitTouchPoint = s + "," + c), d = i.data.previewData.expected_arrival_info.unixtime, 
                    h = i.getSelectedAddr()) {
                        r.next = 13;
                        break;
                    }
                    return i.setData({
                        formValidState: "no-address"
                    }), i.lxNoAddrView(), i.endSubmit(), r.abrupt("return");

                  case 13:
                    if (2 !== parseInt(i.recommend_type, 10)) {
                        r.next = 16;
                        break;
                    }
                    return i.confirm({
                        message: "是否确定配送到 " + h.address + " " + h.house_number,
                        textCancel: "取消",
                        textOK: "确定",
                        cancel: function() {
                            i.endSubmit();
                        },
                        ok: function() {
                            var e = t(a.default.mark(function e() {
                                return a.default.wrap(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        return i.endSubmit(), i.recommend_type = 1, e.next = 4, i.onClickSubmit();

                                      case 4:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e, i);
                            }));
                            return function() {
                                return e.apply(this, arguments);
                            };
                        }()
                    }), r.abrupt("return");

                  case 16:
                    if (-1 !== d) {
                        r.next = 20;
                        break;
                    }
                    return i.setData({
                        formValidState: "no-time"
                    }), i.endSubmit(), r.abrupt("return");

                  case 20:
                    return i.setData({
                        formValidState: ""
                    }), i.loading(!0), v = i.data.poi_id, i.traceTagStart({
                        src_page: p,
                        src_block: _,
                        tgt_page: l,
                        extra: {
                            poi_id: v
                        },
                        action: u
                    }), w = null, r.prev = 25, x = i.orderSubmitArgs(), K(x.data, {
                        check_shipping_area: 1,
                        info: {
                            code: "20000012"
                        }
                    }), x.trace_tag = i.traceTagEnd({
                        tgt_block: f
                    }), y = getApp().store.getState(), b = y.user.open_id, K(x.data, {
                        wx_pay_params: {
                            openid: b,
                            app_id: "wx2c348cf579062e56"
                        }
                    }), i.startLazyLoading(), r.next = 34, S(x);

                  case 34:
                    w = r.sent, r.next = 44;
                    break;

                  case 37:
                    return r.prev = 37, r.t0 = r.catch(25), i.loading(!1), i.dealSubmitError(r.t0), 
                    i.clearLazyLoading(), i.endSubmit(), r.abrupt("return");

                  case 44:
                    if (k = w, C = k.wm_order_pay_type, T = k.hash_id, i.setHashId(T), O({
                        nm: "order",
                        event_type: "order",
                        val_bid: "c_bROZP",
                        val_lab: {
                            order_id: T
                        }
                    }), 2 !== C) {
                        r.next = 75;
                        break;
                    }
                    return r.prev = 48, A = i.submitTouchPoint, r.next = 52, D({
                        wm_order_id_view: T,
                        touchPoint: A
                    });

                  case 52:
                    if (P = r.sent, i.clearLazyLoading(), i.loading(!1), !m(P)) {
                        r.next = 58;
                        break;
                    }
                    return i.setData({
                        mtpayFlag: !0
                    }, function() {
                        i.endSubmit(), g(n({}, P, {
                            pay_success_url: "/pages/order-info/order-info?view_id=" + T + "&share_coupon_pop=true" || ""
                        }));
                    }), r.abrupt("return");

                  case 58:
                    return r.next = 60, q(P);

                  case 60:
                    i.endSubmit(), i.clearFood({
                        poiID: i.data.poi_id
                    }), i.clearHashId(), console.log("clear all meal"), r.next = 75;
                    break;

                  case 66:
                    return r.prev = 66, r.t1 = r.catch(48), L = r.t1.code, I = r.t1.message, i.loading(!1), 
                    i.clearLazyLoading(), i.endSubmit(), L ? i.alert({
                        message: I,
                        ok: function() {
                            this.refreshPay();
                        }
                    }) : "您已取消支付" === I && i.refreshPay(), r.abrupt("return");

                  case 75:
                    i.clearLazyLoading(), wx.redirectTo({
                        url: "../order-info/order-info?view_id=" + T + "&share_coupon_pop=true"
                    });

                  case 77:
                  case "end":
                    return r.stop();
                }
            }, r, i, [ [ 25, 37 ], [ 48, 66 ] ]);
        }))();
    },
    onClickHiddenModal: function() {
        this.setData({
            previewErrorMsg: ""
        });
    },
    onClickPayType: function() {
        var e = this, n = this.data.pay_info, i = n.map(function(e) {
            return 1 === e.payment_type ? "货到付款" : "在线支付";
        });
        this.actionSheet({
            itemList: i,
            ok: function() {
                var i = t(a.default.mark(function t(i) {
                    var r, o;
                    return a.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return r = n[i].payment_type, e.lxPayTypeClick(1 === r ? 2 : 1), t.prev = 2, t.next = 5, 
                            e.refresh({
                                payType: r
                            });

                          case 5:
                            t.next = 11;
                            break;

                          case 7:
                            t.prev = 7, t.t0 = t.catch(2), o = t.t0.message, e.toast({
                                message: o
                            });

                          case 11:
                          case "end":
                            return t.stop();
                        }
                    }, t, e, [ [ 2, 7 ] ]);
                }));
                return function(e) {
                    return i.apply(this, arguments);
                };
            }()
        });
    },
    updatePreviewData: function(e) {
        var i = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
        return t(a.default.mark(function t() {
            var o, s, c, d, u, p, l, f, _, h, v, g, m, w, x, y, b, k, S, C, D, A, P, L, I;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (o = i.data.hasUndoneAddr || !1, s = i.data.canNotShippingAddr || !1, t.prev = 2, 
                    e.foodlist.forEach(function(e) {
                        var t = e.sub_total_price, a = e.original_price, n = e.count, i = e.food_label_url, r = e.spec, o = e.attrs;
                        e._sub_total_price = B(t), e._sub_original_price = V(Math.round(100 * a) * n), e.food_label_url = z(i, 0, 0, "o");
                        var s = [];
                        r && s.push(r), o.length > 0 && (s = s.concat(o.map(function(e) {
                            return e.value;
                        }))), e.attrInfo = s.length > 0 ? "+" + s.join("+") : "";
                    }), e.discounts.forEach(function(e) {
                        e.icon_url = z(e.icon_url, 0, 0, "o");
                    }), e._box_total_price = B(e.box_total_price), e._total = B(e.total), e._shipping_fee = B(e.shipping_fee), 
                    e._original_price = B(e.original_price), c = Math.round(100 * e.original_price) - Math.round(100 * e.total), 
                    e._discountCents = V(c), e._discountPrice = V(c), i.loading(!0), t.prev = 13, 2 !== e.address_type) {
                        t.next = 27;
                        break;
                    }
                    return d = i.data.poi_id, i.startLazyLoading(), t.next = 19, T({
                        type: 2,
                        wm_poi_id: d
                    });

                  case 19:
                    u = t.sent, o = !!u.filter(function(e) {
                        return e.bind_type < 11;
                    }).length, s = !!u.filter(function(e) {
                        return 1 !== e.can_shipping;
                    }).length, i.clearLazyLoading(), 0 === (p = u.filter(function(e) {
                        return 1 === e.can_shipping;
                    }).length) && (i.lx_address_type = e.address_type, e.address_type = 0), t.next = 28;
                    break;

                  case 27:
                    i.lx_address_type = e.address_type;

                  case 28:
                    t.next = 33;
                    break;

                  case 30:
                    t.prev = 30, t.t0 = t.catch(13), i.clearLazyLoading();

                  case 33:
                    for (l = e.payment_info.filter(function(e) {
                        var t = e.display_switch, a = e.payment_type;
                        return 1 === t && (1 === a || 2 === a);
                    }), f = [], _ = l.length - 1; _ > -1; --_) h = l[_].payment_type, f.push(h);
                    if (v = 2, v = 0 === f.length || -1 !== f.indexOf(2) ? 2 : f[0], g = -1 !== f.indexOf(r) ? r : v, 
                    m = e.privacy_service, w = void 0 === m ? {} : m, x = w || {}, y = x.privacy_title, 
                    b = x.show, k = x.privacy_icon, S = x.privacy_selected, C = x.privacy_open_desc, 
                    D = x.privacy_close_desc, A = {
                        hasUndoneAddr: o,
                        canNotShippingAddr: s,
                        previewData: e,
                        pay_info: l,
                        payType: g,
                        inited: !0,
                        privacy: n({}, i.data.privacy, {
                            title: y,
                            support: b,
                            icon: k,
                            using: S,
                            openTitle: C,
                            offTitle: D
                        })
                    }, e.coupon_info_list.forEach(function(e) {
                        var t = e.type;
                        0 === t ? A.coupon_info = e : 1 === t && (A.poi_coupon_info = e);
                    }), e.remind_infos.length) for (P = e.remind_infos.length - 1; P > -1; --P) 2 === e.remind_infos[P].behavior_type ? (A.tip = e.remind_infos[P].remind_content, 
                    A.isTipLengthOverTwo = i.calcTwoLineTip(A.tip)) : 1 === e.remind_infos[P].behavior_type ? i.alert({
                        message: e.remind_infos[P].remind_content
                    }) : i.toast({
                        message: e.remind_infos[P].remind_content
                    });
                    i.copyFoodList(e.foodlist, 3), i.recommend_type = e.address_info.recommend_type || 1, 
                    i.setData(A), i.lxAllView(A), b && i.lxPrivacySwitchStatusView(A), t.next = 57;
                    break;

                  case 51:
                    t.prev = 51, t.t1 = t.catch(2), L = t.t1.code, I = t.t1.message, 1 === L ? i.toast({
                        message: I
                    }) : i.toast({
                        message: "服务器异常，请稍后"
                    }), i.setData({
                        inited: !0
                    });

                  case 57:
                    i.loading(!1);

                  case 58:
                  case "end":
                    return t.stop();
                }
            }, t, i, [ [ 2, 51 ], [ 13, 30 ] ]);
        }))();
    },
    refresh: function(e) {
        var n = this;
        return t(a.default.mark(function t() {
            var i, r, o, s, c, d, u;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, n.loading(!0), !n.data.addressSelectShow) {
                        t.next = 5;
                        break;
                    }
                    return t.next = 5, n.refreshAddresses();

                  case 5:
                    return i = n.orderSubmitArgs(e), r = i.data, o = r.wm_order_pay_type, -1 === (s = r.expected_arrival_time) && (i.data.expected_arrival_time = 0), 
                    c = getApp().store.getState(), d = c.user.open_id, K(i.data, {
                        wx_pay_params: {
                            openid: d,
                            app_id: "wx2c348cf579062e56"
                        }
                    }), n.startLazyLoading(), t.next = 13, C(i);

                  case 13:
                    u = t.sent, n.clearLazyLoading(), n.setToken({
                        token: u.token
                    }), "no-address" === n.data.formValidState && u.address_info.address && n.setData({
                        formValidState: ""
                    }), n.updatePreviewData(u, o), t.next = 26;
                    break;

                  case 20:
                    return t.prev = 20, t.t0 = t.catch(0), n.loading(!1), n.clearLazyLoading(), n.dealSubmitError(t.t0), 
                    t.abrupt("return");

                  case 26:
                    n.loading(!1);

                  case 27:
                  case "end":
                    return t.stop();
                }
            }, t, n, [ [ 0, 20 ] ]);
        }))();
    },
    changePoiCoupon: function() {
        var e = this.data.poiCouponModalShown;
        this.setData({
            poiCouponModalShown: !e
        });
    },
    onClickGrabPoiCoupon: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, i, r, o, s;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.lxShopCouponClick(), e.loading(!0), t.prev = 2, n = e.getSelectedAddr(), 
                    i = {
                        wm_poi_id: e.data.poi_id,
                        can_use_coupon_price: e.data.previewData.can_use_coupon_price
                    }, n && K(i, {
                        phone: n.phone || "",
                        number: n.house_number || ""
                    }), t.next = 8, A(i);

                  case 8:
                    r = t.sent, o = {}, r.forEach(function(t) {
                        1 === t.poi_coupon_valid ? o.validPoiCoupon = e.processPoiCoupon(t.poi_coupon_info_list) : 2 === t.poi_coupon_valid && (o.invalidPoiCoupon = e.processPoiCoupon(t.poi_coupon_info_list));
                    }), e.setData({
                        poiCouponlist: o
                    }), e.changePoiCoupon(), t.next = 19;
                    break;

                  case 15:
                    t.prev = 15, t.t0 = t.catch(2), s = t.t0.message, e.toast({
                        message: s
                    });

                  case 19:
                    e.loading(!1);

                  case 20:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 2, 15 ] ]);
        }))();
    },
    processPoiCoupon: function(e) {
        return e.forEach(function(e) {
            e.deadline = w(e.deadline);
        }), e;
    },
    calcTwoLineTip: function(e) {
        var t = Math.ceil(654 / 28);
        return e.replace(/,\.\/\\!'":/g, "").length > t;
    },
    onSelectPoiCoupon: function(e) {
        var t = e.currentTarget.dataset.couponid || "-1";
        this.changePoiCoupon(), this.refresh({
            poicoupon_view_id: t
        });
    },
    changeCoupon: function() {
        var e = this.data.couponModalShown;
        this.setData({
            couponModalShown: !e
        });
    },
    loadDisableReason: function(n, i) {
        var r = this;
        return t(a.default.mark(function t() {
            var o, s, c, d, u, p, l, f, _, h;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return o = r.data, s = o.poi_id, c = o.previewData, d = c.can_use_coupon_price, 
                    u = c.total, p = c.original_price, l = c.token, f = r.getSelectedAddr(), r.loading(!0), 
                    t.prev = 3, t.next = 6, L({
                        wm_poi_id: s,
                        phone: f && f.phone || "",
                        total: u,
                        original_price: p,
                        can_use_coupon_price: d,
                        order_token: l,
                        coupon_view_id: n
                    });

                  case 6:
                    _ = t.sent, r.setData(e({}, "couponDisableReasons[" + i + "]", _)), t.next = 14;
                    break;

                  case 10:
                    t.prev = 10, t.t0 = t.catch(3), h = t.t0.message, r.toast({
                        message: h
                    });

                  case 14:
                    r.loading(!1);

                  case 15:
                  case "end":
                    return t.stop();
                }
            }, t, r, [ [ 3, 10 ] ]);
        }))();
    },
    onClickToggleReason: function(t) {
        var a = t.currentTarget.dataset, n = a.couponid, i = a.key;
        this.data.couponDisableReasons[i] ? this.setData(e({}, "couponDisableReasons[" + i + "]", null)) : this.loadDisableReason(n, i);
    },
    onSelectCoupon: function(e) {
        var t = e.currentTarget.dataset.couponid || "-1";
        this.changeCoupon(), this.refresh({
            coupon_view_id: t
        });
    },
    onClickGrabCoupon: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, i, r, o, s, c, d, u, p, l, f, _;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.lxRedpackClick(), e.loading(!0), t.prev = 2, n = e.data, i = n.poi_id, 
                    r = n.previewData, o = r.can_use_coupon_price, s = r.total, c = r.original_price, 
                    d = r.token, u = e.getSelectedAddr(), p = {
                        wm_poi_id: i,
                        phone: u && u.phone || "",
                        total: s,
                        original_price: c,
                        can_use_coupon_price: o,
                        order_token: d
                    }, t.next = 8, P(p);

                  case 8:
                    l = t.sent, f = {}, l.forEach(function(e) {
                        1 === e.coupon_valid ? f.valid = H(e.coupon_info_list) : 2 === e.coupon_valid && (f.invalid = H(e.coupon_info_list));
                    }), e.setData({
                        couponDisableReasons: {},
                        expiredCoupons: null,
                        couponlist: f
                    }), e.changeCoupon(), t.next = 19;
                    break;

                  case 15:
                    t.prev = 15, t.t0 = t.catch(2), _ = t.t0.message, e.toast({
                        message: _
                    });

                  case 19:
                    e.loading(!1);

                  case 20:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 2, 15 ] ]);
        }))();
    },
    onClickExpireCoupons: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, i, r, o;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.loading(!0), t.prev = 1, t.next = 4, I({
                        status: 5,
                        page_index: 0,
                        page_size: 20
                    });

                  case 4:
                    if (n = t.sent, i = n.coupon_list, r = n.coupon_total_num, i) {
                        t.next = 9;
                        break;
                    }
                    throw new Error("啊哦, 出错了, 请重试");

                  case 9:
                    i.length > 0 ? e.setData({
                        expiredCoupons: H(i),
                        expiredCouponCount: r
                    }) : e.toast({
                        message: "您的账号没有无效券~"
                    }), t.next = 16;
                    break;

                  case 12:
                    t.prev = 12, t.t0 = t.catch(1), o = t.t0.message, e.toast({
                        message: o
                    });

                  case 16:
                    e.loading(!1);

                  case 17:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 1, 12 ] ]);
        }))();
    },
    onClickCaution: function() {
        this.lxRemindClick();
        var e = this.data.previewData.remark_field;
        getApp().remark_field = e, wx.navigateTo({
            url: "/pages/preview/caution"
        });
    },
    onClickDinersOption: function() {
        this.setData({
            dinnerOption: {
                show: !0,
                tableware_advocate_tip: this.data.previewData.tableware_advocate_tip,
                diners_option: this.data.previewData.diners_option
            }
        });
    },
    copyFoodList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
        e = t > 0 ? e.slice(0, t) : e, this.setData({
            foodlistCopy: e
        });
    },
    onClickFoodToggle: function() {
        var e = this.data, t = e.previewData.foodlist, a = e.foodlistCopy, n = t.length > a.length;
        n ? this.lxFoodToggleOpenClick() : (this.setData({
            scrollTop: 0
        }), this.lxFoodToggleCloseClick()), this.setData({
            foodToggleWord: n ? "点击收起" : "展示更多",
            moreFoodImgClass: n ? "trans" : ""
        }), this.copyFoodList(t, n ? -1 : 3);
    },
    hideOption: function() {
        this.setData({
            dinnerOption: {
                show: !1,
                tableware_advocate_tip: this.data.previewData.tableware_advocate_tip,
                diners_option: this.data.previewData.diners_option
            }
        });
    },
    changeDinerOption: function(e) {
        var t = e.currentTarget.dataset.item;
        this.lxDinnerClick(t.count), this.setData({
            diners_option_value: t.description,
            diners_count: t.count
        }), this.hideOption();
    },
    onShowCalled: !1,
    onShow: function() {
        var e = this;
        return t(a.default.mark(function t() {
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (e.onShowCalled) {
                        t.next = 3;
                        break;
                    }
                    return e.onShowCalled = !0, t.abrupt("return");

                  case 3:
                    if (!e.data.mtpayFlag) {
                        t.next = 8;
                        break;
                    }
                    return t.next = 6, e.refreshPay();

                  case 6:
                    t.next = 10;
                    break;

                  case 8:
                    return t.next = 10, e.refresh();

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onLoad: function(e) {
        var t = e.hash_id;
        this.hash_id = t;
        var a = getApp(), n = a.previewData;
        a.previewData = null, n ? (1 === n.pre_order && n.expected_arrival_info && (n.expected_arrival_info.unixtime = -1), 
        this.updatePreviewData(n, 2)) : this.alert({
            message: "获取数据失败"
        });
    },
    getReportData: function() {
        return {
            cid: "c_ykhs39e",
            val: {
                poi_id: this.data.poi_id,
                order_id: this.hash_id
            }
        };
    }
};

(0, r.page)(y(N, b, U(function(e) {
    return {
        poi_id: e.poi.id,
        cautionValue: e.purchase.caution
    };
}, function(e) {
    return {
        setToken: function(t) {
            return e((0, s.setToken)(t));
        },
        dispatchAddrEdit: function(t) {
            return e((0, o.set)(t));
        },
        setRecipient: function(t) {
            return e((0, s.setRecipient)(t));
        },
        setSKUs: function(t) {
            return e((0, c.setSKUs)(t));
        },
        clearFood: function(t) {
            e((0, c.clear)(t));
        }
    };
}), R, j));