var e = require("../../../cwx/cwx.js"), t = (require("../../../3rd/lodash.core.min.js"), 
require("../models/models.js").GetPackageModel), a = require("../common/business.js"), i = require("../models/stores.js"), r = i.OrderDetailStore(), n = i.PayResultOrderStore(), s = require("../components/getdata.js");

module.exports.CPayPopbox = {
    init: function(e) {
        var t = this;
        wx.showToast({
            title: "支付连接中..",
            icon: "loading",
            mask: !0,
            duration: 1e4
        }), t.originalOrderDetailData = e.data || {}, t.settings = e, t.isDebug = !0, s.getData.call(t, function() {
            t.getPayway(function() {
                wx.showToast({
                    title: "支付提交中..",
                    icon: "loading",
                    mask: !0,
                    duration: 1e4
                }), t.weicatPaysubmit();
            });
        });
    },
    data: {
        weicat: {},
        payData: {}
    },
    modalConfirm: function(e, t) {
        var a = this;
        wx.hideToast(), wx.showModal({
            title: "提示",
            content: e || "",
            success: function(e) {
                if (e.confirm && t) return t.call(a);
            },
            showCancel: !1
        });
    },
    showToast: function(e) {
        var t = setTimeout(function() {
            clearTimeout(t);
        }, 1500);
    },
    toastChange: function() {},
    showLoading: function() {},
    hideLoading: function() {
        try {
            var e = wx.getSystemInfoSync().system || "";
            (e = e.toLowerCase()).indexOf("ios") > -1 && (wx.hideToast(), wx.hideLoading(), 
            wx.hideToast(), wx.hideLoading(), wx.hideToast(), wx.hideLoading(), wx.hideToast(), 
            wx.hideLoading());
        } catch (e) {}
    },
    getBackParams: function(e, t) {
        var a = r.get() || {}, i = n.get() || {}, s = {
            orderID: a.oid || "",
            externalNo: a.extno || "",
            billNo: a.bilno || "",
            payType: i.realpaytype || "",
            busType: a.bustype || "",
            price: a.totalamount || ""
        };
        return void 0 !== t && (s.Status = t), i.realoid && (s.orderID = i.realoid), 2 == e ? (delete s.payType, 
        s.ErrorCode = 888, s.ErrorMessage = "") : 4 == e ? (delete s.payType, s.ErrorCode = a.ErrorCode, 
        s.ErrorMessage = a.ErrorMessage) : 3 == e && delete s.payType, s;
    },
    rePostConfirm: function() {
        this.modalCallback = function() {
            var e = this.getBackParams();
            this.navigateBack({
                type: "sback",
                data: e
            });
        };
    },
    checkReSubmit: function(e) {
        var t = this, a = r.get() || {}, i = n.getAttr("requestid"), s = n.getAttr("realoid"), o = a.requestid, c = a.oid;
        return i == o && s == c ? t.rePostConfirm() : e();
    },
    getParames: function(e) {
        var t = this, a = t.originalOrderDetailData, i = t.data.payData.extParam, r = {}, n = [], s = [], o = 0, c = 0, d = {
            clienttoken: a.token,
            clientextend: a.extend,
            clientsign: a.sign,
            subpay: 0
        };
        if (i.payTypeList && (r.paytypelist = i.payTypeList), i.subPayTypeList && (r.subpaytypelist = i.subPayTypeList), 
        i.payWayWhiteList) {
            for (c = (s = i.payWayWhiteList.split(",")).length; o < c; o++) n.push({
                whiteid: s[o]
            });
            r.whitelist = n;
        }
        if (i.PayWayBlackList) {
            for (n = [], o = 0, c = (s = i.PayWayBlackList.split(",")).length; o < c; o++) n.push({
                blackid: s[o]
            });
            r.blacklist = n;
        }
        d.payrestrict = r;
        for (var l in e) d[l] = e[l];
        return d;
    },
    paywayBack: function(e) {
        var t = this;
        if (t.hideLoading(), !e) return t.failFn();
        e.package && e.paySign && (t.data.weicat = e, t.weicatPay(t.data.weicat));
    },
    getPayway: function() {
        var a = this, i = a.data.payData, r = i.orderDetail, n = (i.extParam, {
            orderId: r.oid,
            en_pa: e.cwx.user.openid,
            flag: 2
        });
        t(n, a.paywayBack.bind(a), a.failFn);
    },
    failFn: function(e) {
        this.hideLoading(), a.clearStore();
    },
    navigateBack: function(e) {
        if (e && e.type) switch (e.type) {
          case "sback":
            this.settings.sbackCallback(e.data);
            break;

          case "rback":
            this.settings && this.settings.rbackCallback(e.data);
            break;

          case "eback":
            if ("current" == this.settings.closeType) break;
            this.settings.ebackCallback(e.data);
            break;

          default:
            this.settings.fromCallback();
        }
    },
    weicatPay: function(e) {
        var t = this;
        wx.requestPayment({
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.package,
            signType: e.signType,
            paySign: e.paySign,
            success: function(e) {
                var i = t.getBackParams();
                n.setAttr("requestid", r.getAttr("requestid")), a.clearStore(), t.navigateBack({
                    type: "sback",
                    data: i
                });
            },
            fail: function(e) {
                var i = t.getBackParams(2);
                a.clearStore(), t.navigateBack({
                    type: "eback",
                    data: i
                });
            },
            complete: function(e) {
                if (e && e.errMsg && "requestPayment:cancel" == e.errMsg) {
                    t.showToast("用户中途取消");
                    var i = t.originalOrderDetailData, r = t.getBackParams(3);
                    i.isHasRback && (a.clearStore(), setTimeout(function() {
                        t.navigateBack({
                            type: "rback",
                            data: r
                        });
                    }, 1e3));
                }
                try {
                    i = t.originalOrderDetailData;
                    Business.exceptionInfoCollect({
                        bustype: 4,
                        excode: "c_e_c03",
                        extype: 1,
                        exdesc: "微信支付SIGN:" + sign + "; BU传递的的Token:" + i.token + ";extend:" + i.extend + ";oid:" + i.oid
                    });
                } catch (e) {}
            }
        });
    },
    paySubmitBack: function(e) {
        var t = this;
        if (t.hideLoading(), 1 != e.rc) {
            if (a.setTempOid(e), e.bilno && r.setAttr("bilno", e.bilno), e.rc && r.setAttr("ErrorCode", e.rc), 
            e.rmsg && r.setAttr("ErrorMessage", e.rmsg), 0 == e.rc) return t.weicatPay(e);
            if (e.rc < 100) {
                if (4 == e.rc) return t.rePostConfirm();
                if (6 == e.rc) ; else {
                    if (8 == e.rc) return t.rePostConfirm();
                    if (9 == e.rc) ; else if (12 == e.rc) {
                        i = t.getBackParams(0, 2);
                        t.navigateBack({
                            type: "sback",
                            data: i
                        });
                    } else if (13 == e.rc) ; else if (14 == e.rc) ; else if (16 != e.rc && 17 != e.rc) return t.showToast(e.rmsg);
                }
            } else {
                var i = t.getBackParams(4);
                t.navigateBack({
                    type: "eback",
                    data: i
                });
            }
        } else t.showToast(e.rmsg);
    },
    requestSubmit: function(e) {
        var t = this, a = t.data.payData, i = a.orderDetail, r = a.extParam, s = t.data.weicat, o = 2 == r.useEType ? "OGP_WechatScanCode" : "WechatScanCode", c = r.paydeadline, d = r.useEType || 1, l = r.IsNeedPreAuth ? 1 : 0, u = r.subPayType || 0, y = !!r.isAutoApplyBill, p = {
            opttype: 1,
            paytype: 4,
            requestid: i.requestid,
            thirdpartyinfo: {
                paymentwayid: o,
                typeid: 0,
                subtypeid: 4,
                typecode: "",
                amount: i.amount,
                brandid: o,
                brandtype: s.brandtype,
                channelid: s.channelid,
                thirdfee: 0
            },
            bustype: i.bustype,
            usetype: d,
            subusetype: l,
            subpay: u,
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
        n.setAttr("realpaytype", p.paytype), c && (p.lastpaytm = c), e && (p.thirdpartyinfo.code = e), 
        p = t.getParames(p);
    },
    getWecatCode: function(t) {
        var a = this;
        e.cwx.login({
            success: function(e) {
                if (e.code) return t(e.code);
                a.showToast("网络不给力1，请稍后再试！");
            }
        });
    },
    weicatPaysubmit: function() {
        var e = this;
        return e.checkReSubmit(function() {
            e.getWecatCode(function(t) {
                return e.weicatPay(e.data.weicat);
            });
        });
    },
    backEnter: function() {
        e.cwx.navigateBack(), a.clearStore();
    },
    onLoad: function(e) {
        var t = this;
        t.originalOrderDetailData = e.data || {}, t.modalCallback = null;
    },
    onReady: function() {
        var e = this;
        s.getData.call(e, function() {
            e.showLoading(), e.getPayway();
        });
    },
    onShow: function() {},
    onHide: function() {}
};