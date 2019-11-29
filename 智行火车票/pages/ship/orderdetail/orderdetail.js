var e = require("../../../cwx/cwx.js"), t = require("../api/api"), o = require("../common/utils.js"), r = require("../common/common.js");

(0, e.CPage)({
    pageid: "10320655424",
    data: {
        isError: !1,
        mMessage: "",
        mQuery: {},
        isLoaded: !1,
        mOrder: {},
        mQRinfo: "",
        mLoading: {
            isLoading: !1,
            message: ""
        },
        orderId: "",
        goodsId: "",
        showoperate: !1
    },
    onLoad: function(t) {
        var o = this, r = {}, n = t.orderId;
        return r.oid = t.orderId, o.setData({
            mQuery: r,
            orderId: n
        }), e.cwx.user.isLogin() || e.cwx.user.login({
            callback: function(e) {}
        }), o;
    },
    onUnload: function() {},
    onShow: function() {
        this.getOrderData();
    },
    onReady: function() {},
    thesametimeagain: function() {
        var e = this, t = e.data.mOrder || {}, o = "?fromCity=" + t.fromCityName + "&toCity=" + t.toCityName + "&fromStation=" + t.fromStationName + "&toStation=" + t.toStationName + "&fromDate=" + t.ticketDate + "&fromTime=" + t.ticketFromTime + "&busNo=" + t.busNumber + "&fullPrice=" + t.totalFee;
        e.onBook(o);
    },
    othertimeagain: function() {
        var e = this.data.mOrder || {};
        wx.navigateTo({
            url: o.AppendParams("../list/index", {
                mFrom: e.fromCityName,
                mTo: e.toCityName,
                mDate: e.ticketDate
            }),
            success: function(e) {},
            fail: function(e) {
                console.log("[home-onSearch] :: 跳转列表页失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    checkBookable: function(e, t) {
        var o = this;
        return e = e || {}, e.busNumber = e.busNumber || e.busNo, o.showLoading("正在校验有无票"), 
        mService.checkBookable(e, {
            success: function(e) {
                o.hideLoading(), t.success && t.success(e);
            },
            fail: function(e) {
                o.hideLoading(), t.fail && t.fail(e);
            }
        }), o;
    },
    onBook: function(e) {
        var t = this, r = o.GetQueryParams(e), n = r;
        !mAccount.isLogin() && (r.redirect = 1) && (r.url = "../book/index");
        var a = mAccount.isLogin() ? o.AppendParams("../book/index", r) : o.AppendParams("../accounts/login", n);
        t.checkBookable(r, {
            success: function(e) {
                wx.navigateTo({
                    url: a,
                    success: function(e) {},
                    fail: function(e) {
                        console.log("[list-onBook] :: 跳转订单填写页失败 > " + (JSON.stringify(e) || ""));
                    }
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "提示",
                    content: "您购买的车次已无票，建议您购买其它车次出行",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm;
                    }
                });
            }
        });
    },
    onRefund: function(e) {
        var t = this, o = (this.data, e.target.dataset.id);
        "cancelOrder" == o ? wx.showModal({
            title: "提示",
            content: "您确定取消订单？",
            success: function(e) {
                e.confirm && t.CancelOrderData();
            }
        }) : "pay" == o ? t.gopay() : "refundOrder" == o && wx.showModal({
            title: "提示",
            content: "您确定需要退票？",
            success: function(e) {
                e.confirm && t.RefundOrderData();
            }
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        return e.getOrderData(), e;
    },
    onShowQr: function(e) {
        var t = this, o = (e.currentTarget.dataset || {}).index, r = (t.data.mOrder || {}).fetcherQrCodeInfo[o];
        return this.setData({
            mQRinfo: r
        }), t;
    },
    onHideQr: function(e) {
        var t = this;
        return t.setData({
            mQRinfo: ""
        }), t;
    },
    CancelOrderData: function() {
        var e = this.data.orderId, o = this;
        r.showLoading("加载中"), t.cancelOrder(e, function(e, t) {
            e ? (r.hideLoading(), o.showError("取消订单失败").hideError()) : (r.hideLoading(), o.getOrderData());
        });
    },
    RefundOrderData: function() {
        var e = this.data.orderId, o = this;
        r.showLoading("加载中"), t.RefundOrder(e, function(e, t) {
            e ? (r.hideLoading(), o.showError("申请退票失败").hideError()) : (r.hideLoading(), o.getOrderData());
        });
    },
    showConfirm: function(e, t) {
        var o = this;
        return wx.showModal({
            title: "提示",
            content: e,
            success: function(e) {
                e.confirm ? t.success && t.success() : t.fail && t.fail();
            }
        }), o;
    },
    getOrderData: function() {
        var e = this.data.orderId, o = this;
        r.showLoading("加载中"), t.getOrderDetail(e, function(e, t) {
            e ? (r.hideLoading(), o.afterFetch(!1, e || "获取订单详情失败")) : (r.hideLoading(), o.afterFetch(!0, t));
        });
    },
    beforeFetch: function() {
        var e = this;
        return e.setData({
            isLoaded: !1
        }), e.showLoading("加载中"), e;
    },
    afterFetch: function(e, t) {
        var o = this, t = t || {};
        if (wx.stopPullDownRefresh(), o.hideLoading(), !e) return o.setData({
            isLoaded: !0,
            mOrder: t
        }), o.showError("加载订单详情失败").hideError(), o;
        var r = t.OrderOperate, n = !1;
        return r.length > 0 && (n = !0, 1 == r.length && "orderZixun" == r[0].operate && (n = !1)), 
        o.setData({
            isLoaded: !0,
            mOrder: t,
            showoperate: n
        }), o;
    },
    showSuccess: function(e, t) {
        var o = this;
        return wx.showToast({
            title: e,
            icon: "sueecss",
            duration: 1e3
        }), t && setTimeout(t, 1e3), o;
    },
    showLoading: function(e) {
        var t = this, o = {
            isLoading: !0,
            message: e || "加载中"
        };
        return t.setData({
            mLoading: o
        }), t;
    },
    hideLoading: function() {
        var e = this, t = {
            isLoading: !1,
            message: ""
        };
        return e.setData({
            mLoading: t
        }), e;
    },
    showError: function(e) {
        e = e || "获取数据失败";
        var t = this;
        return t.setData({
            isError: !0,
            mMessage: e
        }), t;
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
    gopay: function() {
        var e = this.data.orderId, o = this.data.mOrder.GoodsId;
        wx.login({
            success: function(r) {
                var n = {
                    goodsId: o,
                    orderId: e,
                    js_code: r.code,
                    paymentType: "weixinapp"
                };
                t.getpayment(n, {
                    success: function(e) {
                        var t = JSON.parse(e.data);
                        wx.requestPayment({
                            timeStamp: t.timeStamp,
                            nonceStr: t.nonceStr,
                            package: t.package,
                            signType: t.signType,
                            paySign: t.paySign,
                            success: function(e) {
                                self.getOrderData();
                            },
                            fail: function(e) {
                                console.log("[book-requestPayment] :: 支付操作取消 > " + (JSON.stringify(e) || ""));
                            }
                        });
                    }
                });
            }
        });
    }
});