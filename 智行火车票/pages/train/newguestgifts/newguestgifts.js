var t = require("../../../cwx/cwx"), e = require("../common/service"), i = require("../common/components/toast/toast"), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../common/util")), o = (0, i.trainToast)(), s = {
    pageId: "10650002316",
    data: {
        isLogin: !1,
        isOnline: !1,
        flight: 0,
        intelFlight: 0,
        train: 0,
        hotel: 0,
        classList: [ "qiangwan", "chenggong", "lingqu" ],
        isTieyou: t.cwx.config.isTieyou
    },
    onLoad: function(t) {
        t.type && 1 == t.type && (this.sourceType = 0, this.setData({
            isOnline: !0
        })), t.type && 3 == t.type && (this.sourceType = 1, this.setData({
            isOnline: !0
        })), (!t.type || 1 != t.type && 3 != t.type) && (this.sourceType = 2, this.setData({
            isOnline: !1
        }));
    },
    onShow: function(e) {
        t.cwx.user.isLogin() ? (this.setData({
            isLogin: !0
        }), this.getNewGuestCoupon(this.sourceType)) : this.setData({
            isLogin: !1
        });
    },
    toLogin: function() {
        t.cwx.user.login({
            callback: function(t) {
                t.ReturnCode && 0 == t.ReturnCode && (this.setData({
                    isLogin: !0
                }), this.getNewGuestCoupon(this.sourceType));
            }
        });
    },
    getNewGuestCoupon: function(t) {
        var i = this, n = {
            source: t
        };
        (0, e.GetWechatAppNewGuestCouponPromise)({
            data: n
        }).then(function(t) {
            t.resultCode && 1 === t.resultCode && (t.flight && i.setData({
                flight: t.flight
            }), t.intelFlight && i.setData({
                intelFlight: t.intelFlight
            }), t.train && i.setData({
                train: t.train
            }), t.hotel && i.setData({
                hotel: t.hotel
            }));
        }).catch(function() {
            i.showTrainToast("获取新客大礼包失败，请重试", "txt");
        });
    },
    clickCoupon: function(t) {
        var e = t.currentTarget.dataset.type;
        0 !== this.data[e] && ("train" === e ? this.gotoIndexPage(0) : "flight" === e ? this.gotoIndexPage(1) : this.showModal());
    },
    gotoIndexPage: function(e) {
        t.cwx.reLaunch({
            url: "/pages/train/index/index?flight=" + e
        });
    },
    showModal: function() {
        n.default.showModal({
            title: "温馨提示",
            m: "该优惠券仅限APP内使用，点击【确定】复制下载链接，打开浏览器粘贴链接即可下载。",
            done: function(e) {
                var i = t.cwx.config.isTieyou ? "t.ctrip.cn/erfn3b" : "suanya.cn/train";
                e.confirm && t.cwx.setClipboardData({
                    data: i,
                    success: function() {}
                });
            }
        });
    }
};

Object.assign(s.data, o.data), Object.keys(o.methods).forEach(function(t) {
    s[t] = o.methods[t];
}), (0, t.CPage)(s);