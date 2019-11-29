function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = require("../../../cwx/cwx"), i = require("../common/model"), r = require("../../train/common/model.js"), o = require("../common/model.js"), s = e(require("../common/cDate")), d = e(require("../common/util")), n = a.cwx.flight;

n.flightPreSaleDays = 180, (0, a.CPage)({
    pageId: "10650001974",
    data: {
        isPrevDisable: !1,
        isNextDisable: !1,
        selectDateStr: "",
        flightList: [],
        couponInfo: null,
        showCouponDiscountPrice: d.default.showCouponDiscountPrice(),
        filterNoFlight: !1,
        filterFlightTime: 1,
        filterFlightPrice: 1,
        sortType: "Price",
        isShowFilterView: !1,
        isFilterViewAnimation: !1,
        chooseDateType: "",
        lowestPriceList: [],
        preLowPrice: "",
        currentLowPrice: "",
        nextLowPrice: "",
        arrivalCityName: "",
        departureCityName: "",
        flightLowestPrice: "",
        trainDescription: "",
        arrivalCityCode: "",
        departureCityCode: "",
        departureDate: "",
        isNearbyRecommend: 1,
        showNearby: 0,
        hasTransferGroup: !1,
        transferList: []
    },
    onLoad: function(e) {
        if (console.log("FLIGHT LIST onLoad begin:"), console.log(e), console.log("FLIGHT LIST onLoad end"), 
        e.scene) {
            var t = e.scene;
            t.length >= 16 && (e.departCityCode = t.slice(0, 3), e.arriveCityCode = t.slice(4, 7), 
            e.departDate = t.slice(8, 12) + "-" + t.slice(12, 14) + "-" + t.slice(14, 16));
        }
        var a = n.query = {};
        a.departCity = e.departCity, a.departCityCode = e.departCityCode, a.arriveCity = e.arriveCity, 
        a.arriveCityCode = e.arriveCityCode, a.cacheUsage = null === e.cacheUsage ? "0" : e.cacheUsage, 
        n.selectDate = e.departDate, this.setData({
            isNearbyRecommend: "0" === e.isNearbyRecommend ? 0 : 1
        }), this.loadData(n.selectDate);
    },
    onShow: function() {
        n.needRefreshList && (this.loadData(n.selectDate), n.needRefreshList = !1);
    },
    loadData: function(e) {
        var r = this;
        this.isLoading = !0, d.default.showLoading();
        var o = e, s = this.data.isNearbyRecommend;
        n.selectDate = o, this.updatePage(o);
        var l = {
            data: t({
                departCityCode: n.query.departCityCode,
                arriveCityCode: n.query.arriveCityCode,
                departDate: o,
                cacheUsage: n.query.cacheUsage,
                hasChild: !1,
                hasBaby: !1,
                hasEconomyClass: !0,
                isRoundTrip: !1,
                nextDepartDate: null,
                routeIndex: 0,
                searchType: 0,
                orderid: "",
                queryVendorSource: 1,
                isQueryTranfer: !0,
                queryGrabPrice: !0
            }, "nextDepartDate", null)
        };
        n.query.cacheUsage = 0, this.queryParams = l, (0, i.FlightListV2Model)(l, function(e) {
            var t = e.data.productGroupList, i = e.data.transferRecommendProductList;
            console.log("queryshared", n), r.data.couponInfo = "", t = d.default.handleFlights(t), 
            i = a._.sortBy(d.default.handleFlights(i), r.data.sortType), r.rawList = t, r.render(t);
            var o = 0 === t.length;
            r.setData({
                couponInfo: r.data.couponInfo,
                filterNoFlight: o,
                hasTransferGroup: 0 !== i.length,
                transferList: i
            }), r.dateMap || r.getLowestPrice(), 1 === s ? r.isLoading ? r.isLoading = !1 : d.default.hideLoading() : (r.isLoading = !1, 
            d.default.hideLoading());
        }, function(e) {
            d.default.hideLoading(), r.isLoading = !1, r.setData({
                flightList: [],
                filterNoFlight: !0
            });
        }), this.refreshLowestPrice();
    },
    updatePage: function(e) {
        var t = !1, a = !1, i = new s.default(e), r = new s.default(), o = new s.default().addDay(n.flightPreSaleDays - 1), d = new s.default(e).format("n月j日") + " " + s.default.weekday(e);
        i.getTime() <= r.getTime() && (t = !0), i.getTime() >= o.getTime() && (a = !0), 
        this.setData({
            isPrevDisable: t,
            isNextDisable: a,
            selectDateStr: d
        });
    },
    getLowestPrice: function() {
        var e = this, t = {
            data: {
                departCityCode: n.query.departCityCode,
                arriveCityCode: n.query.arriveCityCode
            }
        };
        (0, r.FlightLowestPriceModel)(t, function(t) {
            t && t.data && t.data.length && (e.dateMap = {}, t.data.forEach(function(t) {
                e.dateMap[t.flightDate.split(" ")[0]] = t.price;
            }), e.refreshLowestPrice());
        }, function(e) {});
    },
    refreshLowestPrice: function() {
        var e = this.data.isNearbyRecommend;
        if (this.dateMap) {
            var t = this.dateMap[new s.default(n.selectDate).addDay(-1).format("Y-m-d")], a = this.dateMap[n.selectDate], i = this.dateMap[new s.default(n.selectDate).addDay(1).format("Y-m-d")];
            this.setData({
                preLowPrice: t || "",
                currentLowPrice: a || "",
                nextLowPrice: i || ""
            }), 1 === e && this.getNearbyRecommend(a);
        }
    },
    chooseDate: function(e) {
        var t = this, a = e.currentTarget.dataset.type, i = n.selectDate, r = void 0;
        switch (a) {
          case "prev":
            if (this.isLoading || this.data.isPrevDisable) return;
            r = new s.default(i).addDay(-1).format("Y-m-d");
            break;

          case "next":
            if (this.isLoading || this.data.isNextDisable) return;
            r = new s.default(i).addDay(1).format("Y-m-d");
            break;

          case "calendar":
            r = i, this.goToCalendar(r);
        }
        this.setData({
            chooseDateType: a
        }), setTimeout(function() {
            t.setData({
                chooseDateType: ""
            });
        }, 300), n.selectDate = r, this.loadData(r);
    },
    goToCalendar: function(e) {
        var t = this, i = new s.default(e).format("Y-n-j"), r = new s.default(), o = new s.default().addDay(n.flightPreSaleDays - 1);
        a.cwx.component.calendar({
            choosenDate: i,
            beginDate: r.format("Y-n-j"),
            endDate: o.format("Y-n-j"),
            title: "请选择出发日期",
            flight: !0,
            queryParams: this.queryParams
        }, function(e) {
            e = s.default.parse(e).format("Y-m-d"), n.selectDate = e, t.loadData(e);
        });
    },
    clickItem: function(e) {
        n.flight = {}, n.couponInfo = {};
        var t = e.currentTarget.dataset.index, a = "transfer" === e.currentTarget.dataset.type ? "transfer" : "straight";
        if ("transfer" === a) {
            var i = this.data.transferList[t];
            for (var r in i) n.flight[r] = i[r];
        } else {
            var o = this.data.flightList[t];
            for (var s in o) n.flight[s] = o[s];
            var d = this.data.couponInfo;
            for (var l in d) n.couponInfo[l] = d[l];
        }
        this.navigateTo({
            url: "/pages/flight/bookx/x?flight_type=" + a
        });
    },
    getNearbyRecommend: function(e) {
        var t = this, a = {
            data: {
                departureCityCode: n.query.departCityCode,
                arrivalCityCode: n.query.arriveCityCode,
                departureDate: n.selectDate,
                tripType: 0,
                lowestPrice: e,
                transType: 1
            }
        };
        console.log("推荐request", a), (0, o.getNearbyAirportRecommend)(a, function(e) {
            var a = e.data.lowestPriceFlightRoutes[0];
            if (a) {
                var i = a.arrivalCityName, r = a.departureCityName, o = a.lowestPrice, s = a.trainDescription, n = a.arrivalCityCode, l = a.departureCityCode, c = a.departureDate;
                t.setData({
                    arrivalCityName: i,
                    departureCityName: r,
                    flightLowestPrice: o,
                    trainDescription: s,
                    arrivalCityCode: n,
                    departureCityCode: l,
                    departureDate: c,
                    showNearby: 1
                });
            } else t.setData({
                showNearby: 0
            });
            t.isLoading ? t.isLoading = !1 : d.default.hideLoading();
        });
    },
    clickToNearby: function(e) {
        console.log("to approach airport list");
        var t = {
            dStation: this.data.departureCityName,
            dStationCode: this.data.departureCityCode,
            aStation: this.data.arrivalCityName,
            aStationCode: this.data.arrivalCityCode,
            date: this.data.departureDate,
            isShow: 0,
            isGaotieOnly: !1
        };
        this.navigateTo({
            url: "/pages/flight/list/list?departCity=" + t.dStation + "&departCityCode=" + t.dStationCode + "&arriveCity=" + t.aStation + "&arriveCityCode=" + t.aStationCode + "&departDate=" + t.date + "&isNearbyRecommend=" + t.isShow
        });
    },
    sortBy: function(e) {
        var t = e.currentTarget.dataset.type, a = this.data.flightList;
        t !== this.data.sortType && (this.setData({
            sortType: t
        }), this.render(a));
    },
    render: function(e) {
        var t = this;
        e = a._.sortBy(e, this.data.sortType);
        try {
            if (e.length >= 10) {
                var i = e.slice(0, 10);
                this.setData({
                    flightList: i
                }), setTimeout(function() {
                    t.setData({
                        flightList: e
                    });
                }, 100);
            } else this.setData({
                flightList: e
            });
        } catch (e) {}
    },
    onReady: function() {
        n.query.departCity && n.query.arriveCity ? d.default.setTitle(n.query.departCity + " ⇀ " + n.query.arriveCity) : d.default.setTitle("航班列表");
    },
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {
        var e = "机票预订", t = n.query;
        return t.departCity && t.arriveCity && (e = t.departCity + "->" + t.arriveCity + " 机票"), 
        {
            bu: "train",
            title: e,
            desc: "安全预订，品质飞行！【智行旅行】",
            path: "/pages/flight/list/list?departCity=" + t.departCity + "&departCityCode=" + t.departCityCode + "&arriveCity=" + t.arriveCity + "&arriveCityCode=" + t.arriveCityCode + "&departDate=" + n.selectDate
        };
    }
});