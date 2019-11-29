function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function i(a, r) {
                try {
                    var c = t[a](r), o = c.value;
                } catch (e) {
                    return void n(e);
                }
                if (!c.done) return Promise.resolve(o).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(o);
            }
            return i("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../npm/babel-runtime/regenerator/index.js")), n = require("../../../utils/object-assign.js"), i = require("../../../api/index.js").getNewUserRedpackInfo, a = {
    _getUserRedpackInfo: function() {
        var n = this;
        return e(t.default.mark(function e() {
            var a, r, c, o, l, s, u, p, k;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, a = n.store.getState(), r = a.user.token, e.next = 4, i({
                        token: r || ""
                    });

                  case 4:
                    if (c = e.sent, o = c.action, l = c.title, s = c.picUrl, u = c.couponList, 3 === o) {
                        e.next = 27;
                        break;
                    }
                    p = !1, 2 === o && u[0].couponValue.toString().length > 3 && (p = !0), k = {
                        hasNewUserRedPack: 2 === o,
                        islogin: 7 !== o,
                        title: l,
                        picUrl: s,
                        coupon: u ? u[0] : null,
                        isCouponValueTooLong: p
                    }, e.t0 = o, e.next = 0 === e.t0 ? 16 : 2 === e.t0 ? 18 : 7 === e.t0 ? 21 : 23;
                    break;

                  case 16:
                    return n.lxNewuserGetRedpackView(), e.abrupt("break", 24);

                  case 18:
                    return n.lxRedpackCheckAllView(), n.lxRedpackUsingCouponView(), e.abrupt("break", 24);

                  case 21:
                    return n.lxNewuserEntryView(), e.abrupt("break", 24);

                  case 23:
                    return e.abrupt("break", 24);

                  case 24:
                    n.setData({
                        newUserRedpackInfo: k
                    }), e.next = 28;
                    break;

                  case 27:
                    n.setData({
                        newUserRedpackInfo: null
                    });

                  case 28:
                    e.next = 33;
                    break;

                  case 30:
                    e.prev = 30, e.t1 = e.catch(0), console.log(e.t1);

                  case 33:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 0, 30 ] ]);
        }))();
    },
    getUrl: function() {
        return "qa" === this.store.getState().dev.env ? "https://market.waimai.test.sankuai.com/gd/wm/330" : "https://market.waimai.meituan.com/gd/wm/39";
    },
    navToRedpackPage: function() {
        var e = wx.getStorageSync("userInfo"), t = e.nickName, n = e.avatarUrl, i = wx.getStorageSync("user"), a = i.token, r = i.user_id, c = i.open_id, o = encodeURI(this.getUrl() + "?nickName=" + t + "&avatarUrl=" + n);
        this.updateWebview({
            loginData: {
                token: a,
                userid: r,
                openid: c
            }
        }), wx.navigateTo({
            url: "/pages/web-view/web-view?isHideShareMenu=1&type=REDIRECT&redirectUrl=" + encodeURIComponent(encodeURIComponent(o))
        });
    },
    onRedpackImgClick: function(e) {
        e.currentTarget.dataset.islogin ? (this.lxNewuserGetRedpackClick(), this.navToRedpackPage()) : (this.lxNewuserEntryClick(), 
        wx.navigateTo({
            url: "../loginV2/login?login_page=3&afterLoginAction=navToRedpackPage"
        }));
    },
    onUsingcoupon: function() {
        this.lxRedpackUsingCouponClick();
        var e = wx.createSelectorQuery();
        e.select(".poi-list-header").boundingClientRect(), e.selectViewport().scrollOffset(), 
        e.exec(function(e) {
            wx.pageScrollTo({
                scrollTop: e[0].top + e[1].scrollTop
            });
        });
    },
    onCheckAllRedpack: function() {
        this.lxRedpackCheckAllClick(), this.navToRedpackPage();
    }
}, r = {
    lxNewuserEntryClick: function() {
        this.lxMge.click({
            val_bid: "b_wat6k1nh"
        });
    },
    lxNewuserEntryView: function() {
        this.lxMge.view({
            val_bid: "b_aur5vx0l"
        });
    },
    lxNewuserGetRedpackClick: function() {
        this.lxMge.click({
            val_bid: "b_vcuacpkz"
        });
    },
    lxNewuserGetRedpackView: function() {
        this.lxMge.view({
            val_bid: "b_f1lbwgh4"
        });
    },
    lxRedpackUsingCouponClick: function() {
        this.lxMge.click({
            val_bid: "b_7co8mr24"
        });
    },
    lxRedpackUsingCouponView: function() {
        this.lxMge.view({
            val_bid: "b_4ogwbwv9"
        });
    },
    lxRedpackCheckAllClick: function() {
        this.lxMge.click({
            val_bid: "b_n120xvxe"
        });
    },
    lxRedpackCheckAllView: function() {
        this.lxMge.view({
            val_bid: "b_bk0ot9m5"
        });
    }
};

module.exports = function(e) {
    return e.data.newUserRedpackInfo = null, n(e, a, r), e;
};