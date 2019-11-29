var e = require("../../../cwx/cwx.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../train/common/cDate.js")), a = (require("../common/date.js"), e.cwx.train);

a.preSaleDays = 30, a.preRobDays = 60;

var n = require("../api/api.js"), o = require("../common/utils.js"), i = require("../common/common.js"), r = new Date();

new Date(r.getFullYear(), r.getMonth(), r.getDate());

(0, e.CPage)({
    data: {
        list: [],
        notice: "",
        mfrom: "",
        to: "",
        date: "",
        prevEnable: !0,
        nextEnable: !0,
        week: "",
        querylod: !1
    },
    onLoad: function(e) {
        e.mDate && wx.setStorageSync("SHIP_QUERY_DATE", e.mDate), e.mFrom && wx.setStorageSync("SHIP_QUERY_FROM", e.mFrom), 
        e.mTo && wx.setStorageSync("SHIP_QUERY_TO", e.mTo);
        var t = wx.getStorageSync("SHIP_QUERY_DATE") || self.data.date, a = {
            mfrom: wx.getStorageSync("SHIP_QUERY_FROM") || self.data.mfrom,
            to: wx.getStorageSync("SHIP_QUERY_TO") || self.data.to,
            date: t
        };
        this.setData(a), this._setDate(t), this.listLoad();
    },
    onReady: function() {
        this.setTitle();
    },
    onShow: function() {
        this.setTitle();
    },
    listLoad: function() {
        var e = this, t = this.data, a = {
            from: t.mfrom,
            to: t.to,
            date: t.date
        };
        i.showLoading("加载中"), n.getShipList(a, function(t, a, n) {
            t ? (i.hideLoading(), console.log(t)) : (i.hideLoading(), e.notice = n, e.setData({
                list: a,
                querylod: !0
            }));
        });
    },
    setTitle: function() {
        var e = this.data || {};
        if (e) {
            var t = {
                title: e.mfrom + " - " + e.to
            };
            wx.setNavigationBarTitle(t);
        }
    },
    _setDate: function(e) {
        var t = new Date().getTime(), a = new Date().addDays(59).getTime(), n = new Date(e.replace(/\-/g, "/")).getTime() >= t, o = new Date(e.replace(/\-/g, "/")).getTime() <= a, i = new Date(e.replace(/\-/g, "/")).getWeekText();
        this.setData({
            date: e,
            prevEnable: n,
            nextEnable: o,
            week: i
        });
    },
    showCalendar: function(n) {
        var o = this, i = this.data.date, r = t.default.format(i, "Y-n-j"), s = t.default.format("", "Y-n-j"), d = new t.default().addDay(a.preRobDays - 1).format("Y-n-j"), m = {};
        e.cwx.component.calendar({
            choosenDate: r,
            beginDate: s,
            endDate: d,
            title: "选择出发日期",
            flight: !1,
            queryParams: m,
            info: void 0
        }, function(e) {
            var a = t.default.parse(e).format("Y-m-d"), n = (t.default.parse(e).format("n月j日"), 
            t.default.parse(e).format("D") || t.default.weekday(a)), i = new Date().getTime(), r = new Date().addDays(59).getTime();
            new Date(e.replace(/\-/g, "/")).getTime(), new Date(e.replace(/\-/g, "/")).getTime();
            o.setData({
                date: a,
                week: n
            }), o.listLoad();
        });
    },
    onListTap: function(e) {
        var t = e.currentTarget.dataset;
        if ("index" in t) {
            var a = t.index, n = this.data.list[a];
            if (1 == n.is_bookable) {
                var i = {
                    from_city_name: n.from_city_name,
                    to_city_name: n.to_city_name,
                    from_date: n.from_date,
                    from_time: n.from_time,
                    ship_name: n.ship_name,
                    from_station_name: n.from_station_name,
                    to_station_name: n.to_station_name,
                    vendor: n.vendor
                };
                wx.navigateTo({
                    url: o.AppendParams("../x/x", i),
                    success: function(e) {},
                    fail: function(e) {
                        console.log("[book]跳转填写页失败");
                    }
                });
            }
        }
    },
    onChangeDayTap: function(e) {
        this.setData({
            querylod: !1
        });
        var t = 1 * e.currentTarget.dataset.day;
        if (-1 == t && !this.data.prevEnable) return !1;
        if (1 == t && !this.data.nextEnable) return !1;
        var a = this.data.date.replace(/\-/g, "/"), n = new Date(a).addDays(t).format("yyyy-MM-dd");
        this._setDate(n), this.listLoad();
    },
    onDateTap: function() {
        this.showCalendar();
    }
});