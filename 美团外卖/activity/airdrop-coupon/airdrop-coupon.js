function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, o) {
            function a(n, r) {
                try {
                    var i = e[n](r), s = i.value;
                } catch (t) {
                    return void o(t);
                }
                if (!i.done) return Promise.resolve(s).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(s);
            }
            return a("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), o = require("../../utils/object-assign.js"), a = require("../../reducers/selectors/common-param.js"), n = require("../../api/freedom-api.js").request, r = require("../../api/analytics.js").event, i = {
    requestAirDrop: function() {
        var o = this;
        return t(e.default.mark(function t() {
            var i, s, u, p, c, l;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = a(getApp().store.getState()), i.openId = getApp().store.getState().user.open_id, 
                    o.data.ifReadyRequestAirDrop && (i.isJustLogin = o.data.ifAirDropJustLogin), t.prev = 3, 
                    t.next = 6, n({
                        domain: "https://marketing.waimai.meituan.com/",
                        url: "o/wxapp/coupon/getTianJiang",
                        method: "POST",
                        data: i
                    });

                  case 6:
                    if (s = t.sent, !((u = 1 !== s.code && 103 !== s.code && 104 !== s.code) && s.toast && s.hasActivity)) {
                        t.next = 11;
                        break;
                    }
                    return o.toast({
                        message: s.toast
                    }), t.abrupt("return");

                  case 11:
                    s.hasCoupon = !(null == s.coupons || 0 === Object.keys(s.coupons).length), o.setData({
                        airDropCouponData: s,
                        showAirDropLayer: s.hasCoupon || s.needLogin,
                        ifReadyRequestAirDrop: !0,
                        ifAirDropJustLogin: s.needLogin
                    }), s.hasActivity && r({
                        event_type: "view",
                        val_bid: "b_peh14nk5"
                    }), s.hasCoupon && (r({
                        event_type: "view",
                        val_bid: "b_752hxzjb"
                    }), o.moneyShow()), p = s.tianJiangUi, (c = p && p.tjButtonTextColor && p.tjButtonDirectLink && p.tjButtonColor && p.tjButtonText) && r({
                        event_type: "view",
                        val_bid: "b_tfzq2821"
                    }), t.next = 24;
                    break;

                  case 20:
                    t.prev = 20, t.t0 = t.catch(3), l = t.t0.message, console.log({
                        message: l
                    });

                  case 24:
                  case "end":
                    return t.stop();
                }
            }, t, o, [ [ 3, 20 ] ]);
        }))();
    },
    moneyShow: function() {
        var t = this;
        this.data.airDropCouponData.coupons.forEach(function(e, o) {
            var a = ("" + e.couponAmountOrDiscount).split("."), n = a[0], r = 0;
            a.length > 1 && n <= 100 && (r = "." + a[1]), e.intMoney = n, e.pointMoney = r, 
            t.data.airDropCouponData.coupons[o] = e;
            var i = Object.assign({}, t.data.airDropCouponData);
            t.setData({
                airDropCouponData: i
            }), console.log("newAirDrop", t.data.airDropCouponData);
        });
    },
    onClickAirdropLogin: function() {
        console.log("onClickAirdropLogin"), wx.navigateTo({
            url: "../login/login"
        }), this.setData({
            hasLogin: !0
        });
    },
    goToUse: function() {
        r({
            event_type: "click",
            val_bid: "b_6vrhwg5y"
        }), this.jumpUrl(this.data.airDropCouponData.tianJiangUi.tjButtonDirectLink);
    },
    onClickUseCoupon: function(t) {
        var e = t.currentTarget.dataset.url;
        e ? (this.jumpUrl(e), r({
            event_type: "click",
            val_bid: "b_hxich1se"
        })) : this.setData({
            showAirDropLayer: !1
        });
    },
    jumpUrl: function(t) {
        this.setData({
            showAirDropLayer: !1
        }), t.match("index") || t.match("order") || t.match("mine") ? wx.switchTab({
            url: t
        }) : wx.navigateTo({
            url: t
        });
    },
    closeLayer: function() {
        var t = this;
        this.data.airDropCouponData.showHideAnimate = !0;
        var e = Object.assign({}, this.data.airDropCouponData);
        this.setData({
            airDropCouponData: e
        }), setTimeout(function() {
            t.setData({
                showAirDropLayer: !1
            });
        }, 300), r({
            event_type: "click",
            val_bid: "b_0o5mwhu9"
        });
    }
};

module.exports = function(t) {
    return t = o(t, i);
};