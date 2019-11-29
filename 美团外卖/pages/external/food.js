function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, n) {
            function o(i, a) {
                try {
                    var s = t[i](a), u = s.value;
                } catch (e) {
                    return void n(e);
                }
                if (!s.done) return r.resolve(u).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(u);
            }
            return o("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../npm/@hfe/mp-owl/lib/index.js"), o = require("../../api/index.js"), i = o.foodShare, a = o.grabPoiCouponByPhone, s = require("../../api/analytics.js").event, r = require("../../npm/promise-polyfill/promise.js"), u = require("../base.js"), p = (0, 
require("../../weapp-redux/index.js").connect)()(u({
    data: {
        poi_id: null,
        spu_id: null,
        user_id: null,
        food_share: null,
        description_show: !1,
        discount_info_show: !1,
        poi_coupons: null,
        userphoneInput: null,
        tip_show: !1,
        goodRate: "0%"
    },
    load: function() {
        var n = this;
        return e(t.default.mark(function e() {
            var o, a, s, r;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n.loading(!0), e.prev = 1, e.next = 4, i({
                        wm_poi_id: n.data.wm_poi_view_id,
                        spu_id: n.data.spu_id
                    });

                  case 4:
                    o = e.sent, n.setData({
                        food_share: o,
                        poi_id: o.poi_id
                    }), a = o.skuList[0].praise_num_new + o.skuList[0].tread_num, s = o.skuList[0].praise_num_new / a * 100, 
                    s = parseInt(s, 10), s += "%", n.setData({
                        goodRate: s
                    }), n.data.food_share.user_phone && "null" !== n.data.food_share.user_phone && o.couponActVo && 0 !== o.couponActVo.credit && n.grabCoupons(n.data.food_share.user_phone), 
                    n.loading(!1), e.next = 20;
                    break;

                  case 15:
                    e.prev = 15, e.t0 = e.catch(1), r = e.t0.message, n.error({
                        message: r
                    }), n.loading(!1);

                  case 20:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 1, 15 ] ]);
        }))();
    },
    showDescription: function() {
        this.setData({
            description_show: !this.data.description_show
        });
    },
    showDiscount: function() {
        this.setData({
            discount_info_show: !this.data.discount_info_show
        });
    },
    grabCoupons: function(n) {
        var o = this;
        return e(t.default.mark(function e() {
            var i, s, r;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i = void 0, e.prev = 1, e.next = 4, a({
                        poi_id: o.data.wm_poi_view_id,
                        user_phone: n,
                        channel_key: "",
                        sms_code: ""
                    });

                  case 4:
                    i = e.sent, o.setData({
                        poi_coupons: i
                    }), e.next = 13;
                    break;

                  case 8:
                    e.prev = 8, e.t0 = e.catch(1), s = e.t0.code, r = e.t0.data, 1 === s ? o.setData({
                        poi_coupons: r
                    }) : 20 === s ? o.navigateToLogin("grabCoupons") : o.toast("领取红包失败");

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, o, [ [ 1, 8 ] ]);
        }))();
    },
    navigateToLogin: function() {
        var e = "../login/login?afterLoginAction=" + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "");
        wx.navigateTo({
            url: e
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
        var n = this;
        return e(t.default.mark(function e() {
            var o, a, s;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (o = getApp(), !(a = o.afterLoginAction)) {
                        e.next = 9;
                        break;
                    }
                    if (o.afterLoginAction = "", "grabCoupons" !== a) {
                        e.next = 9;
                        break;
                    }
                    return e.next = 7, i({
                        wm_poi_id: n.data.wm_poi_view_id,
                        spu_id: n.data.spu_id
                    });

                  case 7:
                    (s = e.sent).user_phone && n.grabCoupons(s.user_phone);

                  case 9:
                  case "end":
                    return e.stop();
                }
            }, e, n);
        }))();
    },
    onUserphoneInput: function(e) {
        var t = e.detail.value;
        this.setData({
            userphoneInput: t
        });
    },
    onLoad: function(e) {
        var t = e.poi_id, n = void 0 === t ? "" : t, o = e.spu_id, i = void 0 === o ? "" : o, a = e.user_id, s = void 0 === a ? "" : a;
        this.setData({
            wm_poi_view_id: n,
            poi_id: n,
            user_id: s,
            spu_id: i
        }), this.load();
    },
    onClickRestaurant: function() {
        s({
            event_type: "click",
            val_bid: "b_kX0n7"
        });
    },
    getReportData: function() {
        var e = this.data;
        return {
            val: {
                poi_id: e.poi_id,
                user_id: e.user_id,
                spu_id: e.spu_id
            }
        };
    },
    onShareAppMessage: function() {
        var e = this.onShareAppDesc(), t = this.data, n = t.wm_poi_view_id, o = t.spu_id, i = this.store.getState().user.user_id;
        return {
            title: "美团外卖",
            desc: e,
            path: "/pages/external/food?poi_id=" + encodeURIComponent(n) + "&spu_id=" + encodeURIComponent(o) + "&user_id=" + encodeURIComponent(i) + "&from=from_share_external_food"
        };
    }
}));

(0, n.page)(p);