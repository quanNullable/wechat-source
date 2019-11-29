function e(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new i(function(e, t) {
            function r(o, a) {
                try {
                    var s = n[o](a), u = s.value;
                } catch (e) {
                    return void t(e);
                }
                if (!s.done) return i.resolve(u).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(u);
            }
            return r("next");
        });
    };
}

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), t = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../actions/user.js"), i = require("../../npm/promise-polyfill/promise.js"), o = require("../../utils/mix.js"), a = require("../../constants.js").CONTACT_PHONE, s = require("./log.js"), u = (a.match(/\d{1,3}/g) || []).join("-"), c = require("../../api/index.js"), l = c.getMyAccount, _ = c.logout, d = require("../base.js"), v = require("../../weapp-redux/index.js").connect, g = require("../../api/index.js").getCouponsList, w = d({
    data: {
        hasLogin: !1,
        avatarurl: "",
        username: "",
        mobile: "",
        contactPhone: u,
        online_service_is_show: !0,
        online_service_url: "",
        invite_reward_is_show: !0,
        invite_reward_url: "",
        couponNum: 0
    },
    onClickAvatar: function() {
        this.data.hasLogin || (this.lxLoginClick(), wx.navigateTo({
            url: "../loginV2/login?login_page=2"
        }));
    },
    onClickLogout: function() {
        var e = this;
        wx.showModal({
            title: "确定退出？",
            content: "退出登录后将无法查看订单，重新登录即可查看",
            cancelColor: "#333333",
            confirmText: "确定",
            confirmColor: "#ffb000",
            success: function(n) {
                if (n.confirm) try {
                    wx.removeStorageSync("wx_set_info"), e.lxLoginOutClick(), e.logout();
                } catch (e) {
                    console.log(e);
                }
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onClickContact: function() {
        this.showPhoneCall({
            phones: [ a ],
            texts: [ "客服电话：" + u ]
        });
    },
    onClickNav: function(e) {
        var n = e.currentTarget.dataset.type;
        if (!this.data.hasLogin && [ "coupons", "address", "invite" ].indexOf(n) > -1) wx.navigateTo({
            url: "../loginV2/login?afterLoginAction=" + n + "&login_page=3"
        }); else switch (n) {
          case "coupons":
            wx.navigateTo({
                url: "../my-coupons/my-coupons"
            });
            break;

          case "address":
            wx.navigateTo({
                url: "../my-address/my-address"
            });
            break;

          case "invite":
            wx.navigateTo({
                url: this.data.invite_reward_url
            });
            break;

          case "online-service":
            wx.navigateTo({
                url: "/pages/web-view/web-view?redirectUrl=" + encodeURIComponent(this.data.online_service_url)
            });
        }
    },
    logout: function() {
        var t = this;
        return e(n.default.mark(function e() {
            var r, i, o;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, e.next = 3, _({
                        token: t.data.token
                    });

                  case 3:
                    t.exitUser(), t.reload(), r = getApp(), (i = r.eventBus).fire("user:logout"), e.next = 13;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e.catch(0), o = e.t0.message, t.alert({
                        message: o
                    });

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 0, 9 ] ]);
        }))();
    },
    reload: function() {
        var t = this;
        return e(n.default.mark(function e() {
            var r, i, o, a, s, u, c, _, d, v, w, p, h, f, m, x, k, b, y;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t.loading(!0), r = {
                        hasLogin: !1,
                        avatarurl: "",
                        username: "",
                        mobile: ""
                    }, e.prev = 2, e.next = 5, l({
                        userToken: t.data.token
                    });

                  case 5:
                    i = e.sent, o = i.code, a = i.avatarurl, s = i.username, u = i.mobile, c = i.online_service_is_show, 
                    _ = i.online_service_url, d = i.invite_reward_is_show, v = i.invite_reward_url, 
                    0 === o ? "" === a || null === a ? t.setData({
                        hasLogin: !0,
                        avatarurl: "/img/icons/my-image-default.png",
                        username: s,
                        mobile: u,
                        online_service_is_show: c,
                        online_service_url: _,
                        invite_reward_is_show: d,
                        invite_reward_url: v
                    }) : t.setData({
                        hasLogin: !0,
                        avatarurl: a,
                        username: s,
                        mobile: u,
                        online_service_is_show: c,
                        online_service_url: _,
                        invite_reward_is_show: d,
                        invite_reward_url: v
                    }) : t.setData(r), e.next = 24;
                    break;

                  case 17:
                    e.prev = 17, e.t0 = e.catch(2), o = e.t0.code, w = e.t0.message, p = e.t0.data, 
                    o && 401 === o ? (h = p.online_service_is_show, f = p.online_service_url, m = p.invite_reward_is_show, 
                    x = p.invite_reward_url, t.setData({
                        online_service_is_show: h,
                        online_service_url: f,
                        invite_reward_is_show: m,
                        invite_reward_url: x
                    })) : o && 0 !== o && 401 !== o ? wx.showToast({
                        title: w,
                        icon: "none",
                        duration: 2e3
                    }) : wx.showToast({
                        title: "网络服务异常，请稍后再试~",
                        icon: "none",
                        duration: 2e3
                    }), t.setData(r);

                  case 24:
                    if (!(k = t.data.hasLogin)) {
                        e.next = 38;
                        break;
                    }
                    return e.prev = 26, e.next = 29, g({
                        status: 1,
                        page_index: 0,
                        page_size: 20
                    });

                  case 29:
                    b = e.sent, y = b.coupon_total_num, t.setData({
                        couponNum: y
                    }), e.next = 38;
                    break;

                  case 34:
                    e.prev = 34, e.t1 = e.catch(26), w = e.t1.message, console.log(w);

                  case 38:
                    t.loading(!1);

                  case 39:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 2, 17 ], [ 26, 34 ] ]);
        }))();
    },
    onLoad: function() {
        var e = this;
        this.reload(), getApp().eventBus.on("user:login", function() {
            e.reload();
        });
    },
    getReportData: function() {
        return {
            cid: "c_ul2elkn"
        };
    },
    onShow: function() {
        var e = getApp(), n = e.afterLoginAction;
        n && (e.afterLoginAction = "", "invite" === n && this.data.invite_reward_url ? wx.navigateTo({
            url: this.data.invite_reward_url
        }) : "coupons" === n ? wx.navigateTo({
            url: "../my-coupons/my-coupons"
        }) : "address" === n && wx.navigateTo({
            url: "../my-address/my-address"
        }));
    }
});

(0, t.page)(o(w, v(function(e) {
    return {
        open_id: e.user.open_id,
        token: e.user.token
    };
}, function(e) {
    return {
        exitUser: function(n) {
            e((0, r.exit)(n));
        }
    };
}), s));