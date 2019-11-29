var t = require("../../../cwx/cwx.js"), e = require("../buscommon/global.js"), a = require("../buscommon/utils.js");

(0, t.CPage)({
    pageid: "10320655427",
    data: {
        mWeek: [ "日", "一", "二", "三", "四", "五", "六" ],
        mMonth: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
        mData: [],
        mOptions: {},
        mFrom: "",
        mTo: "",
        utmsource: ""
    },
    onLoad: function(t) {
        var e = this, a = {}, o = t.mFrom, n = t.mTo, r = t.utmsource;
        t.choosenDate && (a.choosenDate = t.choosenDate), t.beginDate && (a.beginDate = t.beginDate), 
        t.endDate && (a.endDate = t.endDate), e.setData({
            mOptions: a,
            mFrom: o,
            mTo: n,
            utmsource: r
        });
        var s = e.createDate(e.data.mOptions);
        e.setData({
            mData: s
        });
    },
    onUnload: function() {},
    onShow: function() {
        var t = this;
        return wx.setStorageSync("BUS_NO_UPDATE", 1), t;
    },
    onReady: function() {},
    onSelect: function(t) {
        var e = this, o = t.currentTarget.dataset || {}, n = o.value, r = o.alias, s = o.enable;
        wx.setStorageSync("BUS_NO_UPDATE", 0), void 0 !== e.data.mFrom ? wx.redirectTo({
            url: a.AppendParams("../list/index", {
                mFrom: e.data.mFrom,
                mTo: e.data.mTo,
                mDate: o.value,
                utmsource: e.data.utmsource
            }),
            success: function(t) {},
            fail: function(t) {
                console.log("[home-onSearch] :: 跳转列表页失败 > " + (JSON.stringify(t) || ""));
            }
        }) : s && e.onBack(n, r);
    },
    onBack: function(t, e) {
        t && wx.setStorageSync("BUS_QUERY_DATE", t), wx.setStorageSync("BUS_QUERY_WEEK", e || ""), 
        wx.navigateBack();
    },
    createDate: function(t) {
        var e = this, o = (t = t || {}).choosenDate, n = t.beginDate, r = t.endDate, s = a.FormatDate(new Date(), "yyyy-MM-dd");
        o = o < (n = n < s ? s : n) ? n : o;
        for (var D = a.String2Date(n) || new Date(), i = D.getFullYear(), m = D.getMonth(), u = D.getDate(), c = a.String2Date(r) || new Date(i, m + 2, u), d = c.getFullYear(), y = c.getMonth(), g = (c.getDate(), 
        a.String2Date(o) || new Date()), h = [], l = i, S = m, f = 12 * (d - i) + (y - m) + 1; f--; ) h.push({
            ID: "m_" + l + "_" + (S + 1),
            Name: l + "年" + e.data.mMonth[S],
            Dates: e.getMonthDateAttrs(l, S, g, D, c)
        }), 11 == S ? (l++, S = 0) : S++;
        return h;
    },
    getMonthDateAttrs: function(t, o, n, r, s) {
        for (var D = new Date(t, o, 1), i = new Date(), m = a.FormatDate(r, "yyyy-MM-dd"), u = a.FormatDate(s, "yyyy-MM-dd"), c = a.FormatDate(n, "yyyy-MM-dd"), d = a.FormatDate(i, "yyyy-MM-dd"), y = [], g = function(n) {
            var r = !1, s = new Date(t, o, n), D = a.FormatDate(s, "yyyy-MM-dd");
            m && D < m && (r = !0), u && D > u && (r = !0);
            var i = !1;
            e.HOLIDAYS.forEach(function(t) {
                t[0] == D && (i = t[1]);
            }), y.push({
                isChoosen: D == c,
                value: D,
                date: n,
                isDisable: r,
                isToday: D == d,
                holiday: i
            });
        }, h = D.getDay(), l = 0; l < h; l++) y.push({
            date: null
        });
        for (var S = 1; S <= 28; S++) g(S);
        for (D.setDate(S); D.getMonth() == o; ) g(S), D.setDate(++S);
        return y;
    }
});