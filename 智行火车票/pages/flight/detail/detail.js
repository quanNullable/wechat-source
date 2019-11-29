function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../../cwx/cwx"), n = require("../common/model"), a = e(require("../common/cDate")), i = e(require("../common/util"));

(0, t.CPage)({
    pageId: "10650001978",
    data: {
        order: {},
        appendProductInfo: {},
        isOrderInfoOpen: !1,
        isETicketOpen: !1,
        isPriceDetailOpen: !1
    },
    onLoad: function(e) {
        this.oid = e.data.oid, this.isValidOrderFromList = this.handleOrderData(e.data.order), 
        this.isValidOrderFromList && this.setData({
            order: e.data.order
        });
    },
    onShow: function() {
        this.isValidOrderFromList ? this.isValidOrderFromList = !1 : this.getFlightDetail();
    },
    onPullDownRefresh: function() {
        this.getFlightDetail();
    },
    onRule: function(e) {
        var t = e.currentTarget.dataset.value, n = this.data.order.flightSegments[t].flightSegmentInfo.retAndResRules;
        n = n.slice(0, n.length - 4) || "", i.default.showModal({
            t: "退改详情",
            m: n.replace(/\<br\/\>/g, "\n").replace(/\<b\>/g, "").replace(/\<\/b\>/g, "")
        });
    },
    onOrderInfoOpenSwitch: function() {
        this.setData({
            isOrderInfoOpen: !this.data.isOrderInfoOpen
        });
    },
    onRefund: function() {
        var e = this;
        if (this.data.order.refundFlag) {
            if (!i.default.isFastDoubleClick()) {
                i.default.showLoading("正在查询退票条件");
                var t = {
                    data: {
                        orderNumber: this.oid
                    }
                };
                (0, n.FlightRefundConditionModel)(t, function(t) {
                    t.data.oid = e.oid, e.refundInfo = t.data;
                }, function(e) {}, function() {
                    i.default.hideLoading();
                    var t = e.data.order.flightSegments.map(function(e) {
                        return e.flightSegmentInfo.retAndResRules;
                    });
                    e.navigateTo({
                        data: {
                            refundInfo: e.refundInfo,
                            refundRuleArr: t
                        },
                        url: "../refund/refund"
                    });
                });
            }
        } else i.default.showModal({
            t: "温馨提示",
            m: "该订单暂时不能退票"
        });
    },
    onETicket: function() {
        this.setData({
            isETicketOpen: !this.data.isETicketOpen
        });
    },
    onAppendProduct: function(e) {
        var t = this, n = e.target.dataset.value, a = this.data.order.appendProducts[n].productRemarkUrl.match(/\d*$/);
        !a || a.length <= 0 || (a = a[0], i.default.getAppendProductInfo(a, function(e) {
            e && t.setData({
                isAppendProductInfoOpen: !0,
                appendProductInfo: e
            });
        }));
    },
    onCloseMask: function() {
        this.setData({
            isAppendProductInfoOpen: !1
        });
    },
    onContinue: function() {
        wx.switchTab({
            url: "/pages/train/index/index"
        });
    },
    onPriceDetail: function() {
        this.setData({
            isPriceDetailOpen: !this.data.isPriceDetailOpen
        });
    },
    onCancel: function() {
        if (!i.default.isFastDoubleClick()) {
            i.default.showLoading("正在取消订单");
            var e = {
                data: {
                    orderNumber: this.oid,
                    reason: "点击取消按钮"
                }
            }, t = this;
            (0, n.FlightCancelOrderModel)(e, function(e) {}, function(e) {}, function() {
                i.default.hideLoading(), t.getFlightDetail();
            });
        }
    },
    onPay: function() {
        if (!i.default.isFastDoubleClick()) {
            var e = this;
            i.default.showLoading("正在获取支付信息");
            var a = {
                data: {
                    orderNumber: this.oid,
                    payType: "weixin",
                    payTarget: 0,
                    wxId: t.cwx.user.openid
                }
            };
            (0, n.GetOrderPayInfo)(a, function(t) {
                t.resultMessage;
                1 == t.resultCode && e.weChatPay(t.data.weixinPayInfo);
            }, function(e) {
                i.default.showWaringDialog(e);
            }, function() {
                i.default.hideLoading();
            });
        }
    },
    weChatPay: function(e) {
        var t = this;
        console.log(e), wx.requestPayment({
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.prepayId,
            signType: "MD5",
            paySign: e.sign,
            success: function(e) {
                console.log("success"), console.log(e), shared.switchType = "flight";
            },
            fail: function(e) {
                console.log("fail"), console.log(e), e && e.err_desc && i.default.showWaringDialog(e.err_desc);
            },
            complete: function(e) {
                console.log("complete"), console.log(e), e && e.errMsg && "requestPayment:cancel" == e.errMsg && i.default.showToast("用户中途取消"), 
                t.getFlightDetail();
            }
        });
    },
    getFlightDetail: function() {
        var e = this;
        i.default.showLoading("正在获取订单详情");
        var t = {
            data: {
                orderNumber: this.oid
            }
        };
        (0, n.FlightOrderDetailModel)(t, function(t) {
            e.handleOrderData(t.data);
            var n = t.data;
            e.setData({
                order: n
            });
        }, function(e) {}, function() {
            i.default.hideLoading(), wx.stopPullDownRefresh();
        });
    },
    handleOrderData: function(e) {
        return !(!e || 0 == Object.keys(e).length) && (e.showPackage = e.appendProducts && e.appendProducts.length > 0, 
        e.eTickets = [], e.flightSegments.forEach(function(t, n) {
            t.index = n, e.eTickets.push({
                airlineInfo: t.flightSegmentInfo.airCompanyName + " " + t.flightSegmentInfo.flightNumber,
                ticketInfo: t.passengerTicketInfos
            });
            var i = new a.default(t.flightSegmentInfo.departDateTime.replace(/-/g, "/"));
            t.flightSegmentInfo.departDate_display = i.format("Y-m-d D"), t.flightSegmentInfo.departTime_display = i.format("H:i");
            var o = new a.default(t.flightSegmentInfo.arriveDateTime.replace(/-/g, "/"));
            t.flightSegmentInfo.arriveTime_display = o.format("H:i");
            d = t.passengerTicketInfos.map(function(e) {
                return e.passengerName;
            });
            t.passNameArr_display = d.join(", ");
            var r = t.refundInfo;
            if (r && r.refundPassengers && 0 != r.refundPassengers.length) {
                t.showRefund = !0;
                var s = t.refundInfo.refundPassengers.map(function(e) {
                    return e.passengerName;
                });
                t.refundPassNameArr_display = s.join(", "), t.refundStatus_display = r.refundStatus;
            } else t.showRefund = !1;
            if (t.flightChangeInfo) {
                t.showFlightChange = !0;
                var d = t.passengerTicketInfos.map(function(e) {
                    return e.passengerName;
                });
                t.flightChangePassNameArr_display = d.join(", ");
            } else t.showFlightChange = !1;
            t.showRebook = t.rebookInfos && t.rebookInfos.length > 0, t.rebookInfos.forEach(function(e) {
                var t = e.rebookPassengers.map(function(e) {
                    return e.passengerName;
                });
                e.passNameArr_display = t.join(", "), e.rebookStatus_display = e.rebookStatus;
            });
        }), !0);
    }
});