function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../../cwx/cwx"), a = e(require("../common/util")), o = e(require("../common/unionPay")), i = require("../common/model"), n = t.cwx.train, s = [ "mobile", "smsCode", "credential", "cvn", "expire", "cvn2" ];

(0, t.CPage)({
    pageId: "10320663449",
    data: function(e, t, a) {
        return t in e ? Object.defineProperty(e, t, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = a, e;
    }({
        train: {},
        orderNumber: 0,
        totalPrice: 0,
        tabIndex: 0,
        cardNo: "",
        mobile: "",
        smsCode: "",
        cvnCode: "",
        credential: "",
        expire: "",
        showTabs: {
            ismobile: !1,
            issmsCode: !1
        },
        isSendcodeDisabled: !1,
        isCheckCard: !1,
        smsCountDown: 0
    }, "isSendcodeDisabled", !1),
    onLoad: function(e) {
        var t = n.train, a = e.data, o = a.orderNumber, i = a.totalPrice;
        this.setData({
            train: t,
            orderNumber: o,
            totalPrice: i,
            isCheckCard: !1
        }), this.invokeCallback(), this.getPayform(0);
    },
    paySubmitNotify: function() {
        var e = {
            orderNumber: this.data.orderNumber
        };
        (0, i.PaySubmitNotifyModel)(e, function(e) {}, function(e) {});
    },
    payResultNotify: function(e) {
        var t = {
            orderNumber: this.data.orderNumber,
            result: e ? "success" : "fail"
        };
        (0, i.PayResultNotifyModel)(t, function(e) {}, function(e) {});
    },
    getPayform: function(e) {
        var t = {
            orderNumber: this.data.orderNumber,
            payType: "unionpay"
        }, n = this;
        a.default.showLoading(), (0, i.GetGoPayInfoModel)(t, function(t) {
            if (2 === t.resultCode) if (e < 50) {
                var i = t.frequency || 1;
                setTimeout(function() {
                    n.getPayform(++e);
                }, 1e3 * i);
            } else a.default.showModal({
                m: "网络异常，请稍后再试"
            }), setTimeout(function() {
                n.onError();
            }, 1500); else if (1 === t.resultCode) {
                var s = o.default.parseForm(t.goPayInfo);
                console.log(t.goPayInfo), o.default.loadZgyLRailTransReq(s, function(e, t) {
                    e && (console.log(e), a.default.showModal({
                        m: "系统异常，请至订单详情页重新支付！"
                    }), setTimeout(function() {
                        n.onError();
                    }, 1500));
                });
            } else a.default.showModal({
                m: "系统异常，请至订单详情页重新支付！"
            }), setTimeout(function() {
                n.onError();
            }, 1500);
        }, function(e) {
            e ? (a.default.showModal({
                m: "系统异常，请至订单详情页重新支付！"
            }), setTimeout(function() {
                n.onError();
            }, 1500)) : a.default.hideLoading();
        }, function() {});
    },
    onError: function() {
        this.navigateBack();
    },
    pay: function() {
        a.default.showLoading(), Math.random() > .5 ? wx.redirectTo({
            url: "../orderdetail/orderdetail?oid=" + this.data.orderNumber
        }) : a.default.showModal({
            m: "支付失败，由于铁路局规定，网上购票需使用乘车人的银行卡支付。请使用乘客asdfasdf的银行卡支付。如若没有符合条件的银行卡，建议前往APP使用送票上门服务",
            confirmText: "换卡"
        }), a.default.hideLoading();
    },
    getShareImage: function() {
        wx.getImageInfo({
            src: "http://images3.c-ctrip.com/zt/share/zx.png",
            success: function(e) {
                console.log(e), wx.saveImageToPhotosAlbum({
                    filePath: e.path,
                    success: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    getsmscode: function() {
        this.data.isSendcodeDisabled || (this.data.mobile ? (this.startSmsCountDown(), o.default.unionPaySendSMS({
            payInfo: {
                mobile: this.data.mobile
            }
        }, function(e, t) {})) : a.default.showToast("请输入手机号码"));
    },
    startSmsCountDown: function() {
        var e = this, t = 60, a = void 0;
        this.setData({
            isSendcodeDisabled: !0
        });
        !function o() {
            0 == t ? (e.setData({
                isSendcodeDisabled: !1
            }), t = -1) : (e.setData({
                smsCountDown: t
            }), t--), t >= 0 ? a = setTimeout(o, 1e3) : a && clearTimeout(a);
        }();
    },
    smsInput: function(e) {
        this.setData({
            smsCode: e.detail.value
        });
    },
    cvnInput: function(e) {
        this.setData({
            cvnCode: e.detail.value
        });
    },
    credentialInput: function(e) {
        this.setData({
            credential: e.detail.value
        });
    },
    expireInput: function(e) {
        this.setData({
            expire: e.detail.value
        });
    },
    mobileInput: function(e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    cardInput: function(e) {
        this.setData({
            cardNo: e.detail.value
        });
    },
    onpay: function() {
        if (this.validatePay()) {
            var e = this, t = {
                smsCode: this.data.smsCode,
                mobile: this.data.mobile
            };
            this.data.cvnCode && (t.cvn2 = this.data.cvnCode), this.data.password && (t.password = this.data.password), 
            this.data.expire && (t.expire = this.data.expire), this.paySubmitNotify(), o.default.unionPayConfirm({
                payInfo: t
            }, function(t, o) {
                console.log(o);
                var i = !t;
                e.payResultNotify(i), t || setTimeout(function() {
                    e.navigateBack();
                }, 1e3), t && (a.default.hideLoading(), a.default.showModal({
                    title: "支付失败请重试",
                    m: t.message
                }));
            }, function(t) {
                e.onError();
            });
        }
    },
    checkCardInfo: function() {
        this.data.cardNo ? o.default.checkCardInfo({
            cardNo: this.data.cardNo
        }, function(e, t) {
            if (!e && t.ruleList) {
                var a = {};
                t.ruleList.forEach(function(e) {
                    s.indexOf(e.key) >= 0 && (a["is" + e.key] = !0);
                }), this.setData({
                    showTabs: a,
                    isCheckCard: !0
                });
            }
        }.bind(this)) : a.default.showToast("请输入卡号");
    },
    validatePay: function() {
        var e = this.data.showTabs, t = e.ismobile, o = (e.issmsCode, e.iscvn), i = e.iscvn2, n = e.isexpire, s = e.iscredential, d = this.data, r = (d.cardNo, 
        d.mobile), u = d.cvnCode, c = d.expire, l = d.credential, f = d.smsCode;
        return t && !r ? (a.default.showToast("请输入手机号码"), !1) : !o && !i || u ? n && !c ? (a.default.showToast("请输入有效期"), 
        !1) : s && !l ? (a.default.showToast("请输入预留证件号码"), !1) : !(t && !f) || (a.default.showToast("请输入验证码"), 
        !1) : (a.default.showToast("请输入CVN码"), !1);
    }
});