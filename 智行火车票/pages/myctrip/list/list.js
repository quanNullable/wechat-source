var t = require("../../../cwx/cwx"), e = require("../../train/common/model"), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../train/common/util")), i = require("../../flight/common/model"), a = t.cwx.flight;

(0, t.CPage)({
    data: {
        orderType: "train",
        pageId: 10320613208,
        userInfo: {
            userName: ""
        },
        orderItems: [],
        isFailed: !1,
        isNoneOrder: !1,
        flightOrderItems: [],
        flightPageIndex: 0,
        flightMoreOrderHidden: !0,
        busOrderItems: [],
        shipOrderItems: []
    },
    onLoad: function(e) {
        t.cwx.user.isLogin() || this.login();
    },
    onShow: function() {
        this.getUserInfo(), t.cwx.user.isLogin() && (a.switchType && a.switchType.length > 0 && (this.setData({
            orderType: a.switchType
        }), a.switchType = ""), this.getOrderList(0));
    },
    onPullDownRefresh: function() {
        this.getOrderList(0);
    },
    getOrderList: function(e) {
        t.cwx.user.isLogin() ? "train" == this.data.orderType ? this.getTrainOrderListData() : "flight" == this.data.orderType ? this.getFlightOrderListData(e) : "bus" == this.data.orderType ? this.getBusOrderListData() : this.getShipOrderListData() : this.login();
    },
    login: function() {
        var e = this;
        t.cwx.user.login({
            callback: function(t) {
                0 == t.ReturnCode && (e.getUserInfo(), e.getOrderList());
            }
        });
    },
    getTrainOrderListData: function() {
        var i = this;
        r.default.showLoading();
        var a = {
            partnerName: t.cwx.config.partner
        };
        (0, e.OrderListModel)(a, function(t) {
            if (t.resultCode) {
                if (!t.orderInfos.length) return i.setData({
                    isNoneOrder: !0
                });
                i.setData({
                    isNoneOrder: !1
                }), i.setOrderStatus(t.orderInfos);
            }
        }, function(t) {
            i.setData({
                isFailed: !0
            });
        }, function() {
            r.default.hideLoading(), wx.stopPullDownRefresh();
        });
    },
    setOrderStatus: function(e) {
        t._.each(e, function(t) {
            t.statusName = t.orderStatus;
        }), this.setData({
            orderItems: e
        });
    },
    getUserInfo: function() {
        this.setData({
            "userInfo.userName": t.cwx.user.userName || ""
        });
    },
    cardClick: function(t) {
        var e = t.currentTarget.dataset.oid || "", r = t.currentTarget.dataset.index, i = this.data.orderItems[r];
        wx.navigateTo({
            url: "../../train/orderdetail/orderdetail?oid=" + e + (i && i.isNewProcess && !i.hasTicket ? "&jlview=1" : "")
        });
    },
    retry: function() {
        this.getTrainOrderListData();
    },
    logout: function() {
        var e = this;
        r.default.showModal({
            m: "确定退出登录吗",
            confirmText: "退出登录",
            showCancel: !0,
            done: function(r) {
                r.confirm && t.cwx.user.logout(function() {
                    e.setData({
                        orderItems: [],
                        flightPageIndex: 0,
                        flightMoreOrderHidden: !0,
                        flightOrderItems: [],
                        busOrderItems: [],
                        shipOrderItems: []
                    }), t.cwx.switchTab({
                        url: "/pages/train/index/index"
                    });
                });
            }
        });
    },
    trainOrder: function() {
        this.setData({
            orderType: "train"
        }), 0 == this.data.orderItems.length && this.getOrderList();
    },
    flightOrder: function() {
        this.setData({
            orderType: "flight"
        }), 0 == this.data.flightOrderItems.length && this.getOrderList();
    },
    busOrder: function() {
        this.setData({
            orderType: "bus"
        }), 0 == this.data.busOrderItems.length && this.getOrderList();
    },
    shipOrder: function() {
        this.setData({
            orderType: "ship"
        }), 0 == this.data.shipOrderItems.length && this.getOrderList();
    },
    getFlightOrderListData: function(t) {
        var e = this;
        0 == t && this.setData({
            flightPageIndex: 0,
            flightOrderItems: []
        }), r.default.showLoading();
        var a = {
            data: {
                sortType: "0",
                pageIndex: this.data.flightPageIndex
            }
        };
        (0, i.FlightOrderListModel)(a, function(t) {
            if (1 == t.resultCode) {
                if (!t.data) return e.setData({
                    isNoneOrder: !0
                });
                var r = e.data.flightOrderItems;
                t.data.forEach(function(t) {
                    r.push(t);
                }), e.setData({
                    flightOrderItems: r
                }), 10 == t.data.length ? e.setData({
                    flightMoreOrderHidden: !1
                }) : e.setData({
                    flightMoreOrderHidden: !0
                });
            }
        }, function(t) {
            e.setData({
                isFailed: !0
            });
        }, function() {
            r.default.hideLoading(), wx.stopPullDownRefresh();
        });
    },
    flightcCardClick: function(e) {
        var a = this, s = e.currentTarget.dataset.oid;
        if (s && 0 != s.length) {
            r.default.showLoading("正在获取订单详情");
            var n = {
                data: {
                    orderNumber: s
                }
            };
            (0, i.FlightOrderDetailModel)(n, function(t) {
                t && t.data ? (console.log(t.data), a.navigateTo({
                    data: {
                        order: t.data,
                        oid: s
                    },
                    url: "../../flight/detail/detail"
                })) : r.default.showModal({
                    t: "温馨提示",
                    m: "该订单已失效"
                });
            }, function(e) {
                t.cwx.showToast("请求错误，请重试"), console.log(e);
            }, function() {
                r.default.hideLoading();
            });
        }
    },
    moreOrder: function() {
        this.setData({
            flightPageIndex: this.data.flightPageIndex + 1
        }), this.getFlightOrderListData();
    },
    makeCall: function() {
        t.cwx.makePhoneCall({
            phoneNumber: "tieyou" === t.cwx.config.partner ? "02122268888" : "02160420000"
        });
    },
    getBusOrderListData: function() {
        r.default.showLoading("加载中");
        var e = this, i = {
            Channel: "WX",
            ClientVersion: "1.2",
            PageSize: 20,
            BizTypes: "QiChe",
            OrderStatusClassify: "All",
            PageIndex: 1
        };
        require("../../bus/buscommon/service.js").getBusOrders(i, {
            success: function(t) {
                t = t || {}, r.default.hideLoading(), wx.stopPullDownRefresh();
                var i = [];
                (t.OrderEnities || []).forEach(function(t) {
                    (t.OrderStatusName || "").indexOf("取消") >= 0 && (t.isCancel = 1), i.push(t);
                }), e.setData({
                    busOrderItems: i
                });
            },
            fail: function(e) {
                t.cwx.showToast("请求错误，请重试"), r.default.hideLoading(), wx.stopPullDownRefresh(), 
                console.log("[orders-getBusOrders] :: 获取订单列表失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    getShipOrderListData: function() {
        r.default.showLoading("加载中");
        var t = this;
        require("../../ship/api/account.js").getOrderList(1, function(e, r) {
            wx.stopPullDownRefresh(), e || t.setData({
                shipOrderItems: t.dataFormat(r)
            });
        });
    },
    dataFormat: function(t) {
        var e = this;
        return t.forEach(function(t) {
            t.Shipfromdate = e.dateFormat(t.ShipOrderItems[0].DepartureDate);
        }), t;
    },
    dateFormat: function(t) {
        var e = t.slice(t.indexOf("(") + 1, t.indexOf("+"));
        return (e = new Date(parseInt(e))).format("MM-dd hh:mm");
    },
    buscardClick: function(t) {
        var e = t.currentTarget.dataset.oid || "";
        wx.navigateTo({
            url: "../../bus/order/index?oid=" + e
        });
    },
    shipcardClick: function(t) {
        var e = t.currentTarget.dataset.oid || "";
        wx.navigateTo({
            url: "../../ship/orderdetail/orderdetail?orderId=" + e
        });
    }
});