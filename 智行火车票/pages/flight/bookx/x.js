function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = function() {
    function e(e, t) {
        var i = [], a = !0, n = !1, r = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), 
            !t || i.length !== t); a = !0) ;
        } catch (e) {
            n = !0, r = e;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (n) throw r;
            }
        }
        return i;
    }
    return function(t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = require("../../../cwx/cwx"), a = require("../common/model"), n = e(require("../common/cDate")), r = e(require("../common/util")), o = i.cwx.flight;

(0, i.CPage)({
    data: {
        flight: {},
        cabinList: [],
        cabinType: "economy",
        couponInfo: null,
        showCouponDiscountPrice: r.default.showCouponDiscountPrice(),
        refundNodes: "",
        isTransfer: !1,
        departDate: "",
        timeArray: [],
        showType: "",
        isFilterViewAnimation: !1,
        canIUseRichText: wx.canIUse("rich-text"),
        enterTimeMillis: 0
    },
    onLoad: function(e) {
        var i = this;
        console.log(e), console.log(o), this.data.enterTimeMillis = new Date().getTime();
        var a = o.flight, r = o.couponInfo, s = "transfer" === e.flight_type, d = s ? new n.default(a.departTime.split(" ")[0]).format("n月j日") + " " + n.default.weekday(a.departTime.split(" ")[0]) : "", c = null;
        if (s) {
            var l = t(a.subsegments, 2), u = l[0], f = u.departTime, h = u.arriveTime, m = l[1];
            c = [ f, h, m.departTime, m.arriveTime ].map(this.transferTime);
        } else c = [];
        o.isTransfer = s, o.timeArray = c, this.setData({
            flight: a,
            couponInfo: r,
            isTransfer: s,
            timeArray: c,
            departDate: d
        }), s ? (this.rawList = a.cabinList, console.log(this.rawList), 0 === this.rawList.filter(function(e) {
            if ("economy" === i.data.cabinType) return !0 === e.isEconomy;
        }).length && (this.data.cabinType = "buiness"), this.bindList()) : this.loadDate(a);
    },
    loadDate: function(e) {
        var t = this;
        this.isLoading = !0, r.default.showLoading();
        var i = {
            data: {
                flightSegments: [ {
                    airlineCode: e.airlineCode,
                    departCityCode: e.departCityCode,
                    arriveCityCode: e.arriveCityCode,
                    departDate: e.departTime.slice(0, 10),
                    flightNumber: e.flightNumber,
                    price: 0,
                    routeIndex: 0
                } ],
                tripType: 1,
                policyVersion: 1
            }
        };
        (0, a.CabinListModel)(i, function(e) {
            r.default.hideLoading();
            var i = e.data.cabinList;
            t.rawList = i, 0 == t.rawList.filter(function(e) {
                if ("economy" === t.data.cabinType) return !0 === e.isEconomy;
            }).length && (t.data.cabinType = "buiness"), t.bindList();
        });
    },
    filterCabin: function(e) {
        var t = e.currentTarget.dataset.type;
        t !== this.data.cabinType && (this.setData({
            cabinType: t
        }), this.bindList());
    },
    bindList: function() {
        var e = this.filterByType(this.rawList);
        e = i._.sortBy(e, "price"), this.setData({
            cabinType: this.data.cabinType,
            cabinList: e
        });
    },
    filterByType: function(e) {
        var t = this;
        return e.filter(function(e) {
            return "economy" === t.data.cabinType ? !0 === e.isEconomy : !1 === e.isEconomy;
        });
    },
    clickItem: function(e) {
        var t = this;
        if (new Date().getTime() - this.data.enterTimeMillis > 6e5) wx.showModal({
            title: "温馨提示",
            showCancel: !1,
            content: "您在此页面停留过久，将为您重新搜索航班信息",
            success: function(e) {
                e.confirm && t.refreshFlightList(0);
            }
        }); else if (i.cwx.user.isLogin()) {
            var a = e.currentTarget.dataset.index, n = this.data.cabinList[a];
            this.toBookPage(n);
        } else i.cwx.user.login({
            callback: function(i) {
                "0" == i.ReturnCode && t.clickItem(e);
            }
        });
    },
    toBookPage: function(e) {
        var t = this, i = this, n = this.data.isTransfer;
        r.default.showLoading();
        var s = {
            data: {
                flightSegments: {
                    airlineCode: this.data.flight.airlineCode,
                    departCityCode: this.data.flight.departCityCode,
                    arriveCityCode: this.data.flight.arriveCityCode,
                    departDate: this.data.flight.departTime.slice(0, 10),
                    flightNumber: this.data.flight.flightNumber,
                    routeIndex: 0,
                    price: e.price,
                    cabinCode: e.cabinCode,
                    productCode: e.productCode,
                    productType: e.productType,
                    vendorName: e.vendorName,
                    qunarBookingInfo: e.qunarBookingInfo
                }
            }
        };
        n && (s.data.isQueryTranfer = !0), (0, a.CabinDetailModel)(s, function(e) {
            r.default.hideLoading(), o.cabinDetail = {};
            var a = e.resultCode, n = e.resultMessage;
            if (1 == a) {
                for (var d in e.data) o.cabinDetail[d] = e.data[d];
                o.cabinDetail.vendorName = s.data.flightSegments.vendorName, o.cabinDetail.qunarBookingInfo = s.data.flightSegments.qunarBookingInfo, 
                o.cabinDetail.rescheduleRefundRemark = e.data.rescheduleRefundRemark, t.navigateTo({
                    url: "/pages/flight/book/book"
                });
            } else n && wx.showModal({
                showCancel: !1,
                content: n,
                success: function(e) {
                    e.confirm && i.refreshFlightList(2);
                }
            });
        }, function(e) {
            r.default.showWaringDialog("查询失败，请稍候重试");
        }, function() {});
    },
    refreshFlightList: function(e) {
        o.query.cacheUsage = e, o.needRefreshList = !0, wx.navigateBack({
            delta: 1
        });
    },
    showRefundTips: function(e) {
        var t = this, i = e.currentTarget.dataset.index, a = this.data.cabinList[i].rescheduleRefundRemark;
        this.setData({
            refundNodes: a,
            showType: "refund"
        }), setTimeout(function() {
            t.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    showTransferTips: function() {
        var e = this;
        this.setData({
            showType: "transfer"
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    hideTips: function(e) {
        var t = this;
        this.setData({
            isFilterViewAnimation: !0
        }), setTimeout(function() {
            t.setData({
                showType: ""
            });
        });
    },
    transferTime: function(e) {
        if (e) return e.split(" ")[1].slice(0, 5);
    },
    onReady: function() {
        r.default.setTitle(new n.default(this.data.flight.departTime.split(" ")[0]).format("n月j日") + " " + n.default.weekday(this.data.flight.departTime.split(" ")[0]));
    },
    onHide: function() {},
    onUnload: function() {}
});