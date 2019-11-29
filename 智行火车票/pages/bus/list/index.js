var t = require("../../../cwx/cwx.js"), e = require("../buscommon/global.js"), a = require("../buscommon/utils.js"), s = require("../buscommon/service.js"), i = require("../../accounts/user.js"), o = new Date(), n = new Date(o.getFullYear(), o.getMonth(), o.getDate()), r = new Date(o.getFullYear(), o.getMonth() + e.CONSTANT.PRESALE_MONTH, o.getDate());

(0, t.CPage)({
    pageid: "10320655422",
    data: {
        isLoaded: !1,
        isError: !1,
        isMin: !1,
        isMax: !1,
        isEnd: !1,
        mMessage: "",
        mPage: 1,
        mQuery: {
            mFrom: "",
            mTo: "",
            mDate2: "",
            mDate: "",
            mWeek: ""
        },
        mLines: [],
        mLoading: {
            isLoading: !1,
            message: ""
        },
        stationlines: [],
        departtimes: [ {
            time: "凌晨 00:00-06:00",
            tid: 1,
            status: !1,
            value: "0|6"
        }, {
            time: "上午 06:00-12:00",
            tid: 2,
            status: !1,
            value: "6|12"
        }, {
            time: "下午 12:00-18:00",
            tid: 3,
            status: !1,
            value: "12|18"
        }, {
            time: "晚上 18:00-24:00",
            tid: 4,
            status: !1,
            value: "18|24"
        } ],
        isshowtime: !1,
        isshowstation: !1,
        isShowMask: !1,
        fromStation: [],
        timeRange: [],
        allStation: !0,
        allTime: !0
    },
    onLoad: function(t) {
        (t = t || {}).mDate && wx.setStorageSync("BUS_QUERY_DATE", t.mDate), t.mFrom && wx.setStorageSync("BUS_QUERY_FROM", t.mFrom), 
        t.mTo && wx.setStorageSync("BUS_QUERY_TO", t.mTo), t.mWeek && wx.setStorageSync("BUS_QUERY_WEEK", t.mWeek);
    },
    onUnload: function() {},
    onShow: function(t) {
        var e = this, s = wx.getStorageSync("BUS_NO_UPDATE"), i = wx.getStorageSync("BUS_QUERY_DATE"), o = a.FormatDate(n, "yyyy-MM-dd");
        if (i < o) {
            var r = a.Date2Alias(o);
            wx.setStorageSync("BUS_QUERY_DATE", o), wx.setStorageSync("BUS_QUERY_WEEK", r);
        }
        return s || (e.setData({
            isEnd: !1,
            mPage: 1,
            mLines: 0
        }), e.reload()), e;
    },
    onReady: function() {
        var t = this;
        wx.setNavigationBarTitle({
            title: t.data.mQuery.mFrom + " - " + t.data.mQuery.mTo
        });
    },
    onPrevDay: function(t) {
        if ((t.currentTarget.dataset || {}).enable) {
            var e = this, a = e.changeDays(-1);
            return e.setData({
                isMin: "isLTmin" == a
            }), e;
        }
    },
    onNextDay: function(t) {
        if ((t.currentTarget.dataset || {}).enable) {
            var e = this, a = e.changeDays(1);
            return e.setData({
                isMax: "isLTmax" == a
            }), e;
        }
    },
    onChangeDate: function() {
        var t = this;
        wx.navigateTo({
            url: a.AppendParams("../calendar/index", {
                choosenDate: t.data.mQuery.mDate
            }),
            success: function(t) {},
            fail: function(t) {
                console.log("[list-onChangeDate] :: 跳转日历选择页失败 > " + (JSON.stringify(t) || ""));
            }
        });
    },
    onScrollEnd: function() {
        var t = this;
        return (t.data || {}).isEnd ? t : (t.beforeFetch("还有更多").fetchBusLines(), t);
    },
    onBook: function(t) {
        var e = t.currentTarget.dataset || {}, a = !!e.pointbus, s = !!e.airbus;
        a ? this.onBook2(t) : s ? this.showError("暂不支持机场巴士").hideError() : this.onBook1(t);
    },
    onBook1: function(e) {
        var s = this, o = e.currentTarget.dataset || {}, n = o.params || "", r = o.enable;
        if (o.symbol && (n = n + "&symbol=" + o.symbol), r) {
            (n = a.GetQueryParams(n)).fromDate = (s.data.mQuery || {}).mDate;
            if (!i.isLogin() && (n.redirect = 1) && (n.url = "../book/index"), t.cwx.user.isLogin()) {
                var u = a.AppendParams("../book/index", n);
                s.checkBookable(n, {
                    success: function(t) {
                        wx.navigateTo({
                            url: u,
                            success: function(t) {},
                            fail: function(t) {
                                console.log("[list-onBook] :: 跳转订单填写页失败 > " + (JSON.stringify(t) || ""));
                            }
                        });
                    },
                    fail: function(t) {
                        s.showError(t || "当前车次不可订").hideError();
                    }
                });
            } else t.cwx.user.login({
                callback: function(t) {}
            });
        }
    },
    onBook2: function(e) {
        var s = this, i = e.currentTarget.dataset || {}, o = i.params || "";
        if (i.enable) {
            (o = a.GetQueryParams(o)).fromDate = (s.data.mQuery || {}).mDate;
            var n = {
                fromCity: o.fromCity,
                toCity: o.toCity,
                fromStation: o.fromStation,
                toStation: o.toStation,
                busNumber: o.busNo,
                fromDate: o.fromDate,
                fromTime: o.fromTime
            };
            if (!t.cwx.user.isLogin() && (n.redirect = 1) && (n.url = "../tourbus/book/index"), 
            t.cwx.user.isLogin()) {
                var r = a.AppendParams("../tourbus/book/index", n);
                s.checkBookable2(n, {
                    success: function(t) {
                        wx.navigateTo({
                            url: r,
                            success: function(t) {},
                            fail: function(t) {
                                console.log("[list-onBook] :: 跳转订单填写页失败 > " + (JSON.stringify(t) || ""));
                            }
                        });
                    },
                    fail: function(t) {
                        s.showError(t || "当前车次不可订").hideError();
                    }
                });
            } else t.cwx.user.login({
                callback: function(t) {}
            });
        }
    },
    onBook3: function(e) {
        var s = this, i = e.currentTarget.dataset || {}, o = i.params || "";
        if (i.enable) {
            (o = a.GetQueryParams(o)).fromDate = (s.data.mQuery || {}).mDate;
            var n = {
                lineNo: o.busNo,
                from: o.fromCity,
                to: o.toCity,
                startSite: o.fromStation,
                endSite: o.toStation,
                beginTime: o.fromTime,
                endTime: o.endTime,
                date: o.fromDate
            };
            if (!t.cwx.user.isLogin() && (n.redirect = 1) && (n.url = "../airbus/book/index"), 
            t.cwx.user.isLogin()) {
                var r = a.AppendParams("../airbus/book/index", n);
                wx.navigateTo({
                    url: r,
                    success: function(t) {},
                    fail: function(t) {
                        console.log("[list-onBook] :: 跳转订单填写页失败 > " + (JSON.stringify(t) || ""));
                    }
                });
            } else t.cwx.user.login({
                callback: function(t) {}
            });
        }
    },
    reload: function() {
        var t = this;
        wx.setNavigationBarTitle({
            title: t.data.mQuery.mFrom + " - " + t.data.mQuery.mTo
        });
        var e = wx.getStorageSync("BUS_QUERY_DATE"), s = wx.getStorageSync("BUS_QUERY_WEEK"), i = wx.getStorageSync("BUS_QUERY_FROM"), o = wx.getStorageSync("BUS_QUERY_TO"), n = a.Date2Alias(e), r = {
            mFrom: i,
            mTo: o,
            mDate: e,
            mDate2: e.substring(e.indexOf("-") + 1),
            mWeek: n || s
        };
        return t.setData({
            mQuery: r,
            isLoaded: !1,
            isEnd: !1,
            mPage: 1
        }), t.beforeFetch().fetchBusLines(), t;
    },
    changeDays: function(t) {
        var e = this, s = "isInRange";
        if (!(t < -1 || t > 1 || 0 == t)) {
            var i = (e.data.mQuery || {}).mDate, o = a.String2Date(i), u = o.getDate(), c = new Date(o.getFullYear(), o.getMonth(), u + t), m = a.FormatDate(c, "yyyy-MM-dd");
            m < a.FormatDate(n, "yyyy-MM-dd") && (m = a.FormatDate(n, "yyyy-MM-dd"), s = "isLTmin"), 
            m > a.FormatDate(r, "yyyy-MM-dd") && (m = a.FormatDate(r, "yyyy-MM-dd"), s = "isGTmax");
            var f = a.Date2Alias(m), d = m.substring(m.indexOf("-") + 1);
            wx.setStorageSync("BUS_QUERY_DATE", m), wx.setStorageSync("BUS_QUERY_WEEK", f);
            var l = e.data.mQuery || {};
            return l.mDate = m, l.mDate2 = d, l.mWeek = f, e.setData({
                mQuery: l,
                isEnd: !1,
                mPage: 1
            }), e.beforeFetch().fetchBusLines(), s;
        }
    },
    fetchBusLines: function() {
        var t = this, e = t.data.mQuery, a = t.data || {}, i = wx.getStorageSync("BUS_WECHAT_UTMSOURCE"), o = {
            fromCity: e.mFrom,
            toCity: e.mTo,
            fromDate: e.mDate,
            sortType: e.sort || "asc",
            pageNum: a.mPage || 1,
            utmsource: i,
            fromStationName: t.data.fromStation || [],
            fromTimeRange: t.data.timeRange || []
        };
        s.getBusLines(o, {
            success: function(e) {
                e = e || {};
                var a = 1, s = [], i = t.data.stationlines || [], o = 1;
                (e.data || []).forEach(function(t) {
                    t._id = a, a++, s.push(t);
                }), t.data.stationlines.length || (e.fromStationNameToFront || []).forEach(function(t) {
                    t.sid = o, o++, t.status = !1, i.push(t);
                }), t.afterFetch(!0, {
                    isEnd: e.pageEnd,
                    mPage: e.pageNum,
                    mLines: s,
                    stationlines: i
                });
            },
            fail: function(e) {
                t.afterFetch(!1, e || "获取线路列表失败");
            }
        });
    },
    beforeFetch: function(t) {
        var e = this;
        return e.showLoading(t || "加载中"), e;
    },
    afterFetch: function(t, e) {
        var a = this, e = e || {}, s = a.data || {}, i = s.mLines || [];
        return a.hideLoading(), t ? (a.setData({
            isLoaded: !0,
            isEnd: e.isEnd,
            mLines: s.mPage <= 1 ? e.mLines : i.concat(e.mLines),
            mPage: s.mPage + 1,
            stationlines: e.stationlines
        }), a) : (a.setData({
            isLoaded: !0,
            isEnd: !1
        }), a.showError("网络异常，请重新尝试").hideError(), a);
    },
    checkBookable: function(t, e) {
        var a = this;
        return t = t || {}, t.busNumber = t.busNumber || t.busNo, a.showLoading("正在校验有无票"), 
        s.checkBookable(t, {
            success: function(t) {
                a.hideLoading(), e.success && e.success(t);
            },
            fail: function(t) {
                a.hideLoading(), e.fail && e.fail(t);
            }
        }), a;
    },
    checkBookable2: function(t, e) {
        var a = this;
        return t = t || {}, t.busNumber = t.busNumber || t.busNo, a.showLoading("正在校验有无票"), 
        s.checkTourBookable(t, {
            success: function(t) {
                a.hideLoading(), e.success && e.success(t);
            },
            fail: function(t) {
                a.hideLoading(), e.fail && e.fail(t);
            }
        }), a;
    },
    showLoading: function(t) {
        var e = this, a = {
            isLoading: !0,
            message: t || "加载中"
        };
        return e.setData({
            mLoading: a
        }), e;
    },
    hideLoading: function() {
        var t = this, e = {
            isLoading: !1,
            message: ""
        };
        return t.setData({
            mLoading: e
        }), t;
    },
    showError: function(t) {
        t = t || "网络异常，请重新尝试";
        var e = this;
        return e.setData({
            isError: !0,
            mMessage: t
        }), e;
    },
    hideError: function() {
        var t = this;
        return setTimeout(function() {
            t.setData({
                isError: !1,
                mMessage: ""
            });
        }, 2e3), t;
    },
    filtratestation: function() {
        var t = this;
        t.setData({
            isShowMask: !0,
            isshowstation: !0,
            isshowtime: !1
        });
        var e = t.data.stationlines || [];
        wx.setStorageSync("OLD_SELECT_STATION", e);
    },
    filtratetime: function() {
        var t = this;
        t.setData({
            isShowMask: !0,
            isshowtime: !0,
            isshowstation: !1
        });
        var e = t.data.departtimes || [];
        wx.setStorageSync("OLD_SELECT_TIME", e);
    },
    onCanceltime: function() {
        var t = this, e = !0, a = wx.getStorageSync("OLD_SELECT_TIME") || [];
        t.data.timeRange.length > 0 && (e = !1), t.setData({
            isshowtime: !1,
            isShowMask: !1,
            isshowstation: !1,
            departtimes: a,
            allTime: e
        });
    },
    onConfirmtime: function() {
        var t = this, e = [];
        t.data.departtimes.forEach(function(t) {
            t.status && e.push(t.value);
        }), t.setData({
            isshowtime: !1,
            isShowMask: !1,
            isshowstation: !1,
            timeRange: e,
            mPage: 1
        }), t.beforeFetch().fetchBusLines();
    },
    onHideMask: function() {
        this.setData({
            isshowtime: !1,
            isShowMask: !1
        });
    },
    selecttime: function(t) {
        var e = this, a = t.currentTarget || {}, s = e.data.departtimes || [], i = [], o = !0, n = (a.dataset || {}).value || "";
        s.forEach(function(t) {
            t.status = t.tid == n ? !t.status : t.status, t.status && (o = !1), i.push(t);
        }), e.setData({
            departtimes: i,
            allTime: o
        });
    },
    onCancelstation: function() {
        var t = this, e = !0, a = wx.getStorageSync("OLD_SELECT_STATION") || [];
        t.data.fromStation.length > 0 && (e = !1), t.setData({
            isshowtime: !1,
            isShowMask: !1,
            isshowstation: !1,
            stationlines: a,
            allStation: e
        });
    },
    onConfirmstation: function() {
        var t = this, e = [];
        t.data.stationlines.forEach(function(t) {
            t.status && e.push(t.name);
        }), t.setData({
            isshowtime: !1,
            isShowMask: !1,
            isshowstation: !1,
            mPage: 1,
            fromStation: e
        }), t.beforeFetch().fetchBusLines();
    },
    selectstation: function(t) {
        var e = this, a = t.currentTarget || {}, s = e.data.stationlines || [], i = [], o = !0, n = (a.dataset || {}).value || "";
        s.forEach(function(t) {
            t.status = t.sid == n ? !t.status : t.status, t.status && (o = !1), i.push(t);
        }), e.setData({
            stationlines: i,
            allStation: o
        });
    },
    selectallstation: function() {
        var t = this, e = [];
        (t.data.stationlines || []).forEach(function(t) {
            t.status = !1, e.push(t);
        }), t.setData({
            stationlines: e,
            allStation: !0
        }), t.beforeFetch().fetchBusLines();
    },
    selectalltime: function() {
        var t = this, e = [];
        (t.data.departtimes || []).forEach(function(t) {
            t.status = !1, e.push(t);
        }), t.setData({
            departtimes: e,
            allTime: !0
        }), t.beforeFetch().fetchBusLines();
    }
});