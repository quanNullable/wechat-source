function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new p(function(e, o) {
            function n(i, a) {
                try {
                    var r = t[i](a), s = r.value;
                } catch (e) {
                    return void o(e);
                }
                if (!r.done) return p.resolve(s).then(function(e) {
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
}(require("../../npm/babel-runtime/regenerator/index.js")), o = require("../../npm/@hfe/mp-owl/lib/index.js"), n = require("../../api/index.js"), i = n.poiShare, a = n.foodComment, r = n.grabPoiCouponByPhone, s = n.poiShareFood, u = require("../../api/analytics.js").event, p = require("../../npm/promise-polyfill/promise.js"), c = require("../../weapp-redux/index.js").connect, d = require("../base.js"), _ = c()(d({
    data: {
        poi_id: 0,
        wm_poi_view_id: 0,
        user_id: 0,
        poi_share: null,
        food_comment: null,
        discount_info_show: !1,
        poi_coupons: null,
        poiFood: null,
        userphoneInput: null,
        tip_show: !1,
        from_act_id: 0
    },
    load: function() {
        var o = this;
        return e(t.default.mark(function e() {
            var n, r, u, p, c, d, _, h, f;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o.loading(!0), e.prev = 1, e.next = 4, i({
                        wm_poi_id: o.data.wm_poi_view_id,
                        from_act_id: o.data.from_act_id
                    });

                  case 4:
                    return n = e.sent, o.setData({
                        poi_share: n,
                        wm_poi_view_id: n.poi_info.wm_poi_view_id,
                        poi_id: n.poi_info.poi_id
                    }), o.data.poi_share.user_phone && "null" !== o.data.poi_share.user_phone && n.couponActVo && 0 !== n.couponActVo.credit && o.grabCoupons(o.data.poi_share.user_phone), 
                    e.prev = 7, e.next = 10, s({
                        wm_poi_id: o.data.wm_poi_view_id
                    });

                  case 10:
                    r = e.sent, o.setData({
                        poi_food: r
                    }), e.next = 18;
                    break;

                  case 14:
                    e.prev = 14, e.t0 = e.catch(7), u = e.t0.message, console.log(u);

                  case 18:
                    return e.prev = 18, e.next = 21, a({
                        wmpoiid: o.data.wm_poi_view_id,
                        userid: o.data.user_id
                    });

                  case 21:
                    0 === (p = e.sent).comments.length && p.comments.push({
                        comment: "咱们点这个吧，感觉不错哦~"
                    }), o.setData({
                        food_comment: p
                    }), e.next = 30;
                    break;

                  case 26:
                    e.prev = 26, e.t1 = e.catch(18), u = e.t1.message, console.log(u);

                  case 30:
                    o.loading(!1), e.next = 39;
                    break;

                  case 33:
                    e.prev = 33, e.t2 = e.catch(1), c = e.t2.code, u = e.t2.message, 1 === c ? (d = 0, 
                    o.error({
                        ok: function() {
                            clearInterval(d), wx.switchTab({
                                url: "/pages/index/index"
                            });
                        },
                        textOK: "回到首页",
                        message: "链接已失效"
                    }), _ = o.data.error, h = 3, _.textOK = "回到首页" + h, o.setData({
                        error: _
                    }), f = o, d = setInterval(function() {
                        h -= 1, _.textOK = "回到首页" + h, h <= 0 && (clearInterval(d), wx.switchTab({
                            url: "/pages/index/index"
                        })), f.setData({
                            error: _
                        });
                    }, 1e3), o.loading(!1)) : o.error({
                        message: u
                    }), o.loading(!1);

                  case 39:
                  case "end":
                    return e.stop();
                }
            }, e, o, [ [ 1, 33 ], [ 7, 14 ], [ 18, 26 ] ]);
        }))();
    },
    showDiscount: function() {
        this.setData({
            discount_info_show: !this.data.discount_info_show
        });
    },
    grabButton: function() {
        /^[0-9]{11}$/.test(this.data.userphoneInput) ? this.grabCoupons(this.data.userphoneInput) : this.toast({
            message: "请填写正确的手机号"
        });
    },
    onShareButton: function() {
        this.toast({
            message: "点击右上角分享给小伙伴吧"
        });
    },
    navigateToLogin: function() {
        var e = "../login/login?afterLoginAction=" + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "");
        wx.navigateTo({
            url: e
        });
    },
    onUserphoneInput: function(e) {
        var t = e.detail.value;
        this.setData({
            userphoneInput: t
        });
    },
    grabCoupons: function(o) {
        var n = this;
        return e(t.default.mark(function e() {
            var i, a, s;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i = void 0, e.prev = 1, e.next = 4, r({
                        poi_id: n.data.wm_poi_view_id,
                        user_phone: o,
                        channel_key: "",
                        sms_code: ""
                    });

                  case 4:
                    i = e.sent, n.setData({
                        poi_coupons: i
                    }), e.next = 13;
                    break;

                  case 8:
                    e.prev = 8, e.t0 = e.catch(1), a = e.t0.code, s = e.t0.data, 1 === a ? n.setData({
                        poi_coupons: s
                    }) : 20 === a ? n.navigateToLogin("grabCoupons") : n.toast("领取红包失败");

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 1, 8 ] ]);
        }))();
    },
    openTip: function() {
        this.setData({
            tip_show: !0
        });
    },
    closeTip: function(e) {
        e.currentTarget.id === e.target.id && this.setData({
            tip_show: !1
        });
    },
    onShow: function() {
        var o = this;
        return e(t.default.mark(function e() {
            var n, a, r;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (n = getApp(), !(a = n.afterLoginAction)) {
                        e.next = 9;
                        break;
                    }
                    if (n.afterLoginAction = "", "grabCoupons" !== a) {
                        e.next = 9;
                        break;
                    }
                    return e.next = 7, i({
                        wm_poi_id: o.data.wm_poi_view_id,
                        from_act_id: o.data.from_act_id
                    });

                  case 7:
                    r = e.sent, o.grabCoupons(r.user_phone);

                  case 9:
                  case "end":
                    return e.stop();
                }
            }, e, o);
        }))();
    },
    onLoad: function(e) {
        var t = e.poi_id, o = void 0 === t ? "" : t, n = e.user_id, i = void 0 === n ? "" : n, a = e.from_act_id, r = void 0 === a ? "" : a;
        this.setData({
            wm_poi_view_id: o,
            poi_id: o,
            user_id: i,
            from_act_id: r
        }), this.load();
    },
    onClickRestaurant: function() {
        u({
            event_type: "click",
            val_bid: "b_SikqD"
        });
    },
    onClickPoiFood: function() {
        u({
            event_type: "click",
            val_bid: "b_FhlKj"
        });
    },
    getReportData: function() {
        var e = this.data;
        return {
            val: {
                poi_id: e.poi_id,
                user_id: e.user_id
            }
        };
    },
    onShareAppMessage: function() {
        var e = this.onShareAppDesc(), t = this.data, o = t.wm_poi_view_id, n = t.from_act_id, i = this.store.getState().user.user_id;
        return {
            title: "美团外卖",
            desc: e,
            path: "/pages/external/poi?poi_id=" + encodeURIComponent(o) + "&user_id=" + encodeURIComponent(i) + "&from_act_id=" + encodeURIComponent(n) + "&from=from_share_external_poi"
        };
    }
}));

(0, o.page)(_);