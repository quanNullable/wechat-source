var t = require("../../../cwx/cwx"), e = (require("../../../3rd/lodash.core.min.js"), 
require("../models/models.js").GetPackageModel), a = require("../common/business.js"), i = require("../models/stores.js"), n = i.OrderDetailStore(), r = i.PayResultOrderStore(), o = require("../components/getdata.js");

(0, t.CPage)({
    data: {
        motto: "支付首页",
        weicat: {},
        userInfo: {},
        modalContent: "",
        toastContent: "",
        payNameText: "支付",
        introButtonShow: !1,
        modalHidden: !0,
        toastHidden: !0,
        loadingHidden: !0,
        payHidden: !0,
        submitButtonLoading: !1,
        payData: {},
        instructionsHidden: !0,
        introText: "",
        toggleFlag: !0
    },
    openInstructionsBox: function() {
        this.setData({
            instructionsHidden: !1
        });
    },
    closeInstructionsBox: function() {
        this.setData({
            instructionsHidden: !0
        });
    },
    modalConfirm: function() {
        var t = this;
        if (t.setData({
            modalContent: "",
            modalHidden: !0
        }), t.modalCallback) return t.modalCallback.call(t);
        t.navigateBack({
            type: "from",
            data: null
        });
    },
    showToast: function(t) {
        var e = this;
        e.setData({
            toastContent: t || "网络不给力2，请稍候重试",
            toastHidden: !1,
            submitButtonLoading: !1
        });
        var a = setTimeout(function() {
            e.setData({
                toastHidden: !e.data.toastHidden
            }), clearTimeout(a);
        }, 1500);
    },
    toastChange: function() {
        this.setData({
            toastContent: "",
            toastHidden: !0
        });
    },
    showLoading: function() {
        this.setData({
            loadingHidden: !1
        });
    },
    hideLoading: function() {
        this.setData({
            loadingHidden: !0
        });
    },
    getBackParams: function(t, e) {
        var a = n.get() || {}, i = r.get() || {}, o = {
            orderID: a.oid || "",
            externalNo: a.extno || "",
            billNo: a.bilno || "",
            payType: i.realpaytype || "",
            busType: a.bustype || "",
            price: a.totalamount || ""
        };
        return void 0 !== e && (o.Status = e), i.realoid && (o.orderID = i.realoid), 2 == t ? (delete o.payType, 
        o.ErrorCode = 888, o.ErrorMessage = "") : 4 == t ? (delete o.payType, o.ErrorCode = a.ErrorCode, 
        o.ErrorMessage = a.ErrorMessage) : 3 == t && delete o.payType, o;
    },
    rePostConfirm: function() {
        var t = this;
        t.modalCallback = function() {
            var t = this.getBackParams();
            this.navigateBack({
                type: "sback",
                data: t
            });
        }, t.setData({
            modalContent: "订单已提交－8888",
            modalHidden: !1
        });
    },
    checkReSubmit: function(t) {
        var e = this, a = n.get() || {}, i = r.getAttr("requestid"), o = r.getAttr("realoid"), s = a.requestid, d = a.oid;
        return i == s && o == d ? e.rePostConfirm() : t();
    },
    getParames: function(t) {
        var e = this, a = e.originalOrderDetailData, i = e.data.payData.extParam, n = {}, r = [], o = [], s = 0, d = 0, c = {
            clienttoken: a.token,
            clientextend: a.extend,
            clientsign: a.sign,
            subpay: 0
        };
        if (i.payTypeList && (n.paytypelist = i.payTypeList), i.subPayTypeList && (n.subpaytypelist = i.subPayTypeList), 
        i.payWayWhiteList) {
            for (d = (o = i.payWayWhiteList.split(",")).length; s < d; s++) r.push({
                whiteid: o[s]
            });
            n.whitelist = r;
        }
        if (i.PayWayBlackList) {
            for (r = [], s = 0, d = (o = i.PayWayBlackList.split(",")).length; s < d; s++) r.push({
                blackid: o[s]
            });
            n.blacklist = r;
        }
        c.payrestrict = n;
        for (var u in t) c[u] = t[u];
        return c;
    },
    paywayBack: function(t) {
        var e = this;
        if (e.hideLoading(), !t) return e.failFn();
        t.package && t.paySign ? e.setData({
            weicat: t,
            payHidden: !1
        }) : e.setData({
            toggleFlag: !1
        });
    },
    getPayway: function() {
        var a = this, i = a.data.payData, n = i.orderDetail, r = (i.extParam, {
            orderId: n.oid,
            en_pa: t.cwx.user.openid,
            flag: 2
        });
        e(r, a.paywayBack.bind(a), a.failFn);
    },
    failFn: function(t) {
        this.hideLoading(), this.setData({
            modalContent: "网络不给力3，请稍候重试",
            modalHidden: !1
        }), a.clearStore();
    },
    weicatPay: function(t) {
        var e = this;
        wx.requestPayment({
            timeStamp: t.timeStamp,
            nonceStr: t.nonceStr,
            package: t.package,
            signType: t.signType,
            paySign: t.paySign,
            success: function(t) {
                var i = e.getBackParams();
                r.setAttr("requestid", n.getAttr("requestid")), a.clearStore(), e.navigateBack({
                    type: "sback",
                    data: i
                });
            },
            fail: function(t) {
                var i = e.getBackParams(2);
                a.clearStore(), e.navigateBack({
                    type: "eback",
                    data: i
                });
            },
            complete: function(t) {
                if (t && t.errMsg && "requestPayment:cancel" == t.errMsg) {
                    e.showToast("用户中途取消");
                    var i = e.originalOrderDetailData, n = e.getBackParams(3);
                    i.isHasRback && (a.clearStore(), setTimeout(function() {
                        e.navigateBack({
                            type: "rback",
                            data: n
                        });
                    }, 1e3));
                }
                try {
                    i = e.originalOrderDetailData;
                    Business.exceptionInfoCollect({
                        bustype: 4,
                        excode: "c_e_c03",
                        extype: 1,
                        exdesc: "微信支付SIGN:" + sign + "; BU传递的的Token:" + i.token + ";extend:" + i.extend + ";oid:" + i.oid
                    });
                } catch (t) {}
            }
        });
    },
    paySubmitBack: function(t) {
        var e = this;
        if (e.hideLoading(), 1 != t.rc) {
            if (e.setData({
                submitButtonLoading: !1
            }), a.setTempOid(t), t.bilno && n.setAttr("bilno", t.bilno), t.rc && n.setAttr("ErrorCode", t.rc), 
            t.rmsg && n.setAttr("ErrorMessage", t.rmsg), 0 == t.rc) return e.weicatPay(t);
            if (t.rc < 100) {
                if (4 == t.rc) return e.rePostConfirm();
                if (6 == t.rc) ; else {
                    if (8 == t.rc) return e.rePostConfirm();
                    if (9 == t.rc) ; else if (12 == t.rc) {
                        i = e.getBackParams(0, 2);
                        e.navigateBack({
                            type: "sback",
                            data: i
                        });
                    } else if (13 == t.rc) ; else if (14 == t.rc) ; else if (16 != t.rc && 17 != t.rc) return e.showToast(t.rmsg);
                }
            } else {
                var i = e.getBackParams(4);
                e.navigateBack({
                    type: "eback",
                    data: i
                });
            }
        } else e.showToast(t.rmsg);
    },
    requestSubmit: function(t) {
        var e = this, a = e.data.payData, i = a.orderDetail, n = a.extParam, o = e.data.weicat, s = 2 == n.useEType ? "OGP_WechatScanCode" : "WechatScanCode", d = n.paydeadline, c = n.useEType || 1, u = n.IsNeedPreAuth ? 1 : 0, l = n.subPayType || 0, y = !!n.isAutoApplyBill, p = {
            opttype: 1,
            paytype: 4,
            requestid: i.requestid,
            thirdpartyinfo: {
                paymentwayid: s,
                typeid: 0,
                subtypeid: 4,
                typecode: "",
                amount: i.amount,
                brandid: s,
                brandtype: o.brandtype,
                channelid: o.channelid,
                thirdfee: 0
            },
            bustype: i.bustype,
            usetype: c,
            subusetype: u,
            subpay: l,
            forcardfee: 0,
            forcardcharg: 0,
            stype: 0,
            oinfo: {
                bustype: i.bustype,
                oid: i.oid,
                odesc: i.title,
                currency: i.currency,
                oamount: i.amount,
                oidex: i.oid,
                displayCurrency: i.displayCurrency,
                displayAmount: i.displayAmount,
                extno: i.extno,
                notify: i.paymentnotifyurl,
                autoalybil: y,
                recall: i.recall
            }
        };
        r.setAttr("realpaytype", p.paytype), d && (p.lastpaytm = d), t && (p.thirdpartyinfo.code = t), 
        p = e.getParames(p);
    },
    getWecatCode: function(e) {
        var a = this;
        t.cwx.login({
            success: function(t) {
                if (t.code) return e(t.code);
                a.showToast("网络不给力4，请稍后再试！");
            }
        });
    },
    weicatPaysubmit: function() {
        var t = this;
        return t.checkReSubmit(function() {
            t.setData({
                submitButtonLoading: !0
            }), t.getWecatCode(function(e) {
                return t.weicatPay(t.data.weicat);
            });
        });
    },
    backEnter: function() {
        t.cwx.navigateBack(), a.clearStore();
    },
    onLoad: function(t) {
        var e = this;
        e.originalOrderDetailData = t.data || {}, e.modalCallback = null;
    },
    onReady: function() {
        var t = this;
        o.getData.call(t, function() {
            t.showLoading(), t.getPayway();
        });
    },
    onShow: function() {},
    onHide: function() {}
});