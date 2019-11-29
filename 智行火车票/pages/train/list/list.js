function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = require("../../../cwx/cwx"), a = require("../common/model"), i = require("../common/service"), r = t(require("../common/cDate")), n = t(require("../common/util")), s = require("../common/components/toast/toast"), o = e.cwx.train, d = (0, 
s.trainToast)(), u = {
    pageId: "10320660960",
    data: {
        isPrevDisable: !1,
        isNextDisable: !1,
        selectDateStr: "",
        trainList: [],
        filterNoTrain: !1,
        filterTrainType: 1,
        filterTrainTime: 1,
        sortType: "DepartTimeStamp",
        sortAscending: !0,
        isShowFilterView: !1,
        isFilterViewAnimation: !1,
        stations: [],
        isReschedule: !1
    },
    onLoad: function(t) {
        var e = !!t.isReschedule, a = o.query = {};
        a.dStation = t.dstation, a.aStation = t.astation, a.date = t.date, a.isGaotieOnly = t.isGaotieOnly, 
        "true" == a.isGaotieOnly && this.setData({
            filterTrainType: 6
        }), this.setData({
            isReschedule: e
        }), this.loadData(a.date);
    },
    loadData: function(t) {
        var e = t;
        o.selectDate = e, this.updatePage(e);
        var a = this.getTrainList();
        this.getGrabTicketSucRateInfo(a);
    },
    getTrainList: function() {
        var t = this, e = n.default.getDeferred();
        this.showTrainLoading(), this.isLoading = !0;
        var i = {
            DepartStation: o.query.dStation,
            ArriveStation: o.query.aStation,
            DepartDate: o.selectDate
        };
        return (0, a.TrainListModel)(i, function(a) {
            var s = a.ResponseBody.TrainInfoList, o = s;
            if (!(o = n.default.handleTrains(o, i.DepartDate)).length) return t.setData({
                trainList: []
            }), n.default.showModal({
                m: "暂无可售票，请换一天试试。"
            });
            var d = i.DepartDate, u = new Date().getTime();
            o.forEach(function(t) {
                if (-1 !== t.SaleNote.indexOf("列车运行图调整")) return t.isPreSale = !0, void (t.preSaleTimeStr = "列车运行图调整，可预约抢票，开售自动抢");
                var e = r.default.parse(d).addDay(-t.PreSaleDay || 0), a = e.format("Y-m-d") + " " + t.PreSaleTime || "00:00";
                r.default.parse(a).getTime() - u > 0 && (t.isPreSale = !0, t.preSaleTimeStr = e.format("n月j日") + t.PreSaleTime + "开售,可预约抢票,开售自动抢");
            }), t.rawList = o;
            var l = t.getStations(o);
            t.setData({
                stations: l
            }), t.renderFiltered(), t.hideTrainLoading(0), t.isLoading = !1, e.resolve(s);
        }, function(a) {
            t.hideTrainLoading(0), t.isLoading = !1, e.reject(a);
        }, function() {}), e.promise;
    },
    getGrabTicketSucRateInfo: function(t) {
        var e = this;
        (0, i.GetGrabTicketSucRateInfoPromise)({
            DepartureStation: o.query.dStation,
            ArriveStation: o.query.aStation,
            DepartureDate: new r.default(o.selectDate).format("Ymd")
        }).then(function(a) {
            var i = a.ResultCode, r = a.TrainSucRateList;
            0 === i && r.length > 0 && t.then(function(t) {
                if (t && t.length > 0) {
                    var a = e.convertTrainSucRateList(r);
                    e.rawList = t.map(function(t) {
                        return a[t.TrainNumber] && e.isNeedShowGrabSucRate(t) ? Object.assign({}, t, {
                            SucRate: a[t.TrainNumber]
                        }) : t;
                    }), e.renderFiltered();
                }
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    isNeedShowGrabSucRate: function(t) {
        return n.default.isGaoTie(t.TrainNumber) || n.default.isDongChe(t.TrainNumber) ? t.SeatList.some(function(t) {
            return n.default.isSecondClassSeat(t.SeatName) && 0 === t.SeatInventory;
        }) : t.SeatList.some(function(t) {
            return (n.default.isHardSeat(t.SeatName) || n.default.isHardLieSeat(t.SeatName)) && 0 === t.SeatInventory;
        });
    },
    convertTrainSucRateList: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = {}, a = !0, i = !1, r = void 0;
        try {
            for (var n, s = t[Symbol.iterator](); !(a = (n = s.next()).done); a = !0) {
                var o = n.value, d = o.TrainNum, u = o.SeatTypeSucRateList;
                e[d] = u[0].TrainSucRate;
            }
        } catch (t) {
            i = !0, r = t;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (i) throw r;
            }
        }
        return e;
    },
    getStations: function(t) {
        var e = [];
        return t.forEach(function(t) {
            var a = t.DepartStation, i = t.ArriveStation;
            e.findIndex(function(t) {
                return t.name === a;
            }) < 0 && e.push({
                name: a,
                isSelected: !1
            }), e.findIndex(function(t) {
                return t.name === i;
            }) < 0 && e.push({
                name: i,
                isSelected: !1
            });
        }), e;
    },
    sortBy: function(t) {
        var e = t.currentTarget.dataset.type, a = this.data.trainList;
        if (e == this.data.sortType) return this.setData({
            sortAscending: !this.data.sortAscending
        }), void this.render(a);
        this.setData({
            sortType: e,
            sortAscending: !0
        }), this.render(a);
    },
    renderFiltered: function() {
        var t = this.rawList;
        if (t) {
            var e = this.filterByType(t);
            e = this.filterByTime(e), e = this.filterByStation(e, this.data.stations);
            var a = 0 !== t.length && 0 == e.length;
            this.setData({
                filterNoTrain: a
            }), this.render(e);
        }
    },
    render: function(t) {
        var a = this;
        t = e._.sortBy(t, this.data.sortType), this.data.sortAscending || t.reverse();
        try {
            if (t.length >= 200 && (t = t.filter(function(t) {
                return "2" == t.trainType;
            })), t.length > 10) {
                var i = t.slice(0, 10);
                this.setData({
                    trainList: i
                }), setTimeout(function() {
                    a.setData({
                        trainList: t
                    });
                }, 50);
            } else this.setData({
                trainList: t
            });
        } catch (t) {}
    },
    selectTime: function(t) {
        var e = t.currentTarget.dataset.time;
        this.setData({
            filterTrainTime: e ^ this.data.filterTrainTime
        });
    },
    selectType: function(t) {
        var e = t.currentTarget.dataset.type;
        this.setData({
            filterTrainType: e ^ this.data.filterTrainType
        });
    },
    filterByType: function(t) {
        var e = this;
        return t ? t.filter(function(t) {
            return 1 == e.data.filterTrainType || t.trainType & e.data.filterTrainType;
        }) : [];
    },
    filterByTime: function(t) {
        var e = this;
        return t ? t.filter(function(t) {
            return 1 == e.data.filterTrainTime || t.timePeriod & e.data.filterTrainTime;
        }) : [];
    },
    filterByStation: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if (!t) return [];
        var a = e.filter(function(t) {
            return t.isSelected;
        });
        return a.length ? t.filter(function(t) {
            return a.findIndex(function(e) {
                return e.name == t.ArriveStation || e.name == t.DepartStation;
            }) >= 0;
        }) : t;
    },
    selectStation: function(t) {
        var e = this.data.stations, a = e[t.currentTarget.dataset.index];
        a.isSelected = !a.isSelected, this.setData({
            stations: e
        });
    },
    cancelFilter: function() {
        var t = this.prevFilterType, e = this.prevFilterTime;
        this.setData({
            filterTrainType: t,
            filterTrainTime: e
        }), this.hideFilterView();
    },
    resetFilter: function() {
        var t = this.data.stations;
        t.forEach(function(t) {
            return t.isSelected = !1;
        }), this.setData({
            filterTrainType: 1,
            filterTrainTime: 1,
            stations: t
        });
    },
    confirmFilter: function() {
        this.renderFiltered(), this.hideFilterView();
    },
    updatePage: function(t) {
        var e = !1, a = !1, i = new r.default(t), n = new r.default().format("Y-m-d"), s = new r.default(n), d = new r.default(n).addDay(o.preRobDays - 1), u = new r.default(t).format("n月j日") + " " + r.default.weekday(t);
        i.getTime() <= s.getTime() && (e = !0), i.getTime() >= d.getTime() && (a = !0), 
        this.setData({
            isPrevDisable: e,
            isNextDisable: a,
            selectDateStr: u
        });
    },
    onShow: function() {
        if (e.cwx.bookingToDetail) return e.cwx.bookingToDetail = !1, void e.cwx.switchTab({
            url: "/pages/myctrip/list/list"
        });
        var t = this.data.isReschedule ? "（改签）" : "";
        n.default.setTitle(o.query.dStation + " ⇀ " + o.query.aStation + t);
    },
    chooseDate: function(t) {
        var e = t.currentTarget.dataset.type, a = o.selectDate, i = void 0;
        switch (e) {
          case "prev":
            if (this.isLoading || this.data.isPrevDisable) return;
            i = new r.default(a).addDay(-1).format("Y-m-d");
            break;

          case "next":
            if (this.isLoading || this.data.isNextDisable) return;
            i = new r.default(a).addDay(1).format("Y-m-d");
            break;

          case "calendar":
            return i = a, this.goToCalendar(i);
        }
        o.selectDate = i, this.loadData(i);
    },
    goToCalendar: function(t) {
        var a = this, i = new r.default(t).format("Y-n-j"), s = new r.default(), d = new r.default().addDay(o.preRobDays - 1), u = n.default.getCalendarInfo(d.format("Y-n-j"));
        e.cwx.component.calendar({
            choosenDate: i,
            beginDate: s.format("Y-n-j"),
            endDate: d.format("Y-n-j"),
            title: "选择出发日期",
            tips: "当前车票预售期为30天，您可以预约抢票，开售自动抢",
            info: u
        }, function(t) {
            t = r.default.parse(t).format("Y-m-d"), o.selectDate = t, a.loadData(t);
        });
    },
    clickItem: function(t) {
        var a = this;
        if (this.data.isReschedule) {
            var i = this.data.trainList[t.currentTarget.dataset.index];
            if (!e._.some(i.SeatList, function(t) {
                return t.SeatInventory > 0 && t.SeatBookable;
            })) return void n.default.showModal({
                m: "您选择的车次已没有空余座位，请选择别的车次"
            });
            i.ArriveStation !== o.query.aStation || i.DepartStation !== o.query.dStation ? n.default.showModal({
                m: "您的出发站由原来" + o.query.dStation + "变更为" + i.DepartStation + "，到达站由原来的" + o.query.aStation + "更改为" + i.ArriveStation + "，是否继续",
                confirmText: "是",
                showCancel: !0,
                cancelText: "否",
                done: function(e) {
                    e.confirm && a.goBooking(t);
                }
            }) : a.goBooking(t);
        } else a.goBooking(t);
    },
    goBooking: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.trainList[e];
        o.train = {};
        for (var i in a) o.train[i] = a[i];
        this.navigateTo({
            url: "../booking/booking"
        });
    },
    showFilterView: function() {
        var t = this;
        this.setData({
            isShowFilterView: !0
        }), setTimeout(function() {
            t.setData({
                isFilterViewAnimation: !0
            });
        }, 10), this.prevFilterType = this.data.filterTrainType, this.prevFilterTime = this.data.filterTrainTime;
    },
    hideFilterView: function() {
        var t = this;
        this.setData({
            isFilterViewAnimation: !1
        }), setTimeout(function() {
            t.setData({
                isShowFilterView: !1
            });
        }, 300);
    }
};

Object.assign(u.data, d.data), Object.keys(d.methods).forEach(function(t) {
    u[t] = d.methods[t];
}), (0, e.CPage)(u);