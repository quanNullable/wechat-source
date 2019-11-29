var e = require("../../../cwx/cwx.js"), r = require("../buscommon/service.js"), t = require("../../accounts/user.js");

require("../../../cwx/component/utils.js");

(0, e.CPage)({
    pageid: "10320655424",
    data: {
        isError: !1,
        mMessage: "",
        mQuery: {},
        isLoaded: !1,
        showPriceDetail: !1,
        mOrder: {},
        mQRinfo: "",
        mLoading: {
            isLoading: !1,
            message: ""
        }
    },
    onLoad: function(e) {
        var r = this, t = {};
        return t.oid = e.oid, r.setData({
            mQuery: t
        }), r.fetchOrder(), r;
    },
    onUnload: function() {},
    onShow: function() {
        return this;
    },
    onReady: function() {},
    onPay: function(e) {
        var r = this, n = {};
        t.getUserCode({}, {
            success: function(e) {
                n.order_number = +r.data.mQuery.oid, n.js_code = e, r.callPayment(n);
            },
            fail: function(e) {}
        });
    },
    onCancel: function(e) {
        var r = this;
        return r.showConfirm("确定取消订单吗？", {
            success: r.callCancel,
            fail: function(e) {}
        }), r;
    },
    onRefund: function(e) {
        var r = this, t = (this.data || {}).mOrder || {}, n = t.refundTicketType || "";
        if (!n && t.stationCanRefund && t.refundErrorMessage) r.showError(t.refundErrorMessage).hideError(); else if (1 == n || 2 == n) {
            r.showConfirm("申请退票后，该订单内所有乘客都会退票，退票手续费以实际退票结果为准。确认退票吗？", {
                success: r.callRefund,
                fail: function() {}
            });
        }
    },
    onPullDownRefresh: function() {
        var e = this;
        return e.fetchOrder(), e;
    },
    onShowQr: function(e) {
        var r = this, t = (e.currentTarget.dataset || {}).index, n = (r.data.mOrder || {}).fetcherQrCodeInfo[t];
        return this.setData({
            mQRinfo: n
        }), r;
    },
    onHideQr: function(e) {
        var r = this;
        return r.setData({
            mQRinfo: ""
        }), r;
    },
    callCancel: function() {
        var e = this, t = {};
        return t.orderNumber = +e.data.mQuery.oid, r.cancelOrder(t, {
            success: function(r) {
                e.showSuccess("订单已取消", e.fetchOrder);
            },
            fail: function(r) {
                e.showError("订单取消失败").hideError();
            }
        }), e;
    },
    callPayment: function(e) {
        var t = this;
        e = e || {}, r.getPaymentData(e, {
            success: function(e) {
                e = e || {}, wx.requestPayment({
                    timeStamp: e.timeStamp,
                    nonceStr: e.nonceStr,
                    package: e.package,
                    signType: e.signType,
                    paySign: e.paySign,
                    success: function(e) {
                        t.showSuccess("订单支付成功", t.fetchOrder);
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            },
            fail: function(e) {}
        });
    },
    callRefund: function() {
        var e = this, t = {}, n = (e.data || {}).mOrder || {}, i = [];
        return (n.ticketInfo || []).forEach(function(e) {
            i.push(e.ticketId);
        }), t.orderNumber = n.orderNumber, t.ticketId = i.join(","), e.showLoading("提交退单申请"), 
        r.refundOrder(t, {
            success: function(r) {
                e.hideLoading().showSuccess("退单申请已提交", e.fetchOrder);
            },
            fail: function(r) {
                e.hideLoading().showWarn("退单申请提交失败");
            }
        }), e;
    },
    showConfirm: function(e, r) {
        var t = this;
        return wx.showModal({
            title: "提示",
            content: e,
            success: function(e) {
                e.confirm ? r.success && r.success() : r.fail && r.fail();
            }
        }), t;
    },
    fetchOrder: function(e) {
        var t = this, n = {
            orderNumber: +t.data.mQuery.oid
        };
        t.beforeFetch(), r.getOrder(n, {
            success: function(e) {
                e = e || {}, t.afterFetch(!0, e);
            },
            fail: function(e) {
                t.afterFetch(!1, e || "订单详情失败");
            }
        });
    },
    beforeFetch: function() {
        var e = this;
        return e.setData({
            isLoaded: !1
        }), e.showLoading("加载中"), e;
    },
    afterFetch: function(e, r) {
        var t = this, r = r || {};
        if (wx.stopPullDownRefresh(), t.hideLoading(), !e) return t.setData({
            isLoaded: !0,
            mOrder: r
        }), t.showError("加载订单详情失败").hideError(), t;
        var n = (r.messageBox || {}).msg;
        if (r._msg = n.replace(/<[^>]*>/g, ""), (r.fetcherQrCodeInfo || []).length > 0) {
            var i = r.takeInfoOther.takeOrderNum ? r.takeInfoOther.takeOrderNum.split("，") : [];
            (r.fetcherQrCodeInfo || []).forEach(function(e, r) {
                var t = "data:image/png;base64,";
                (e.fetcher_qrcode || "").indexOf(t) < 0 && (e.fetcher_qrcode = t + e.fetcher_qrcode, 
                e._num = i[r] || i[0]);
            });
        }
        return t.setData({
            isLoaded: !0,
            mOrder: r
        }), t;
    },
    showSuccess: function(e, r) {
        var t = this;
        return wx.showToast({
            title: e,
            icon: "sueecss",
            duration: 1e3
        }), r && setTimeout(r, 1e3), t;
    },
    showLoading: function(e) {
        var r = this, t = {
            isLoading: !0,
            message: e || "加载中"
        };
        return r.setData({
            mLoading: t
        }), r;
    },
    hideLoading: function() {
        var e = this, r = {
            isLoading: !1,
            message: ""
        };
        return e.setData({
            mLoading: r
        }), e;
    },
    showError: function(e) {
        e = e || "获取数据失败";
        var r = this;
        return r.setData({
            isError: !0,
            mMessage: e
        }), r;
    },
    hideError: function() {
        var e = this;
        return setTimeout(function() {
            e.setData({
                isError: !1,
                mMessage: ""
            });
        }, 2e3), e;
    },
    showPriceDetail: function(e) {
        this.setData({
            showPriceDetail: !0
        });
    },
    hidePriceDetail: function(e) {
        this.setData({
            showPriceDetail: !1
        });
    }
});