var t = require("../../../cwx/cwx.js"), a = require("../api/api.js"), e = require("../common/utils.js"), n = require("../common/common.js");

(0, t.CPage)({
    data: {
        fromCity: "",
        toCity: "",
        data: {},
        isSearch: !1,
        searchstationlist: [ "大连-旅顺", "青岛-烟台" ],
        mTHandler: null,
        allline: [],
        allGroup: {},
        mKeys: [],
        mLoaded: !0,
        mCurrentV: "position",
        mSearchList: [],
        mtags: [],
        selecttag: "全部",
        datadic: {},
        isError: !1,
        mMessage: ""
    },
    onLoad: function(t) {
        console.log(t);
        var e = this;
        n.showLoading("获取航线列表");
        var o = {};
        a.getShipLine(o, function(t, a) {
            t ? n.hideLoading() : e.afterFetch(!0, a);
        });
    },
    onShow: function() {},
    afterFetch: function(t, a) {
        var e = this, a = a || [], o = [], i = [], r = [ "全部" ];
        for (var s in a) o.push(a[s]);
        o.forEach(function(t) {
            r.push(t.region), t.ship_line.forEach(function(t) {
                i.push(t);
            });
        });
        var c = [], l = {};
        i.forEach(function(t) {
            delete t.line_type, delete t.bookable, delete t.map_info;
            var a = t.from_city_info.station_pinyin.charAt(0).toUpperCase();
            t.from_city_info.station_pinyin && c.indexOf(a) < 0 && (c.push(a), l[a] = l[a] || []), 
            l[a].push(t);
        }), c = c.sort(), e.setData({
            allGroup: l,
            mKeys: c,
            mtags: r,
            selecttag: "全部"
        }), e.setData({
            allline: o,
            datadic: a
        }), n.hideLoading();
    },
    onItemClick: function(t) {
        var a = t.currentTarget.dataset;
        a.from, a.to;
        wx.setStorageSync("SHIP_QUERY_FROM", a.from), wx.setStorageSync("SHIP_QUERY_TO", a.to), 
        wx.navigateBack();
    },
    onSelect: function(t) {
        var a = t.currentTarget.dataset;
        a.from, a.to;
        wx.setStorageSync("SHIP_QUERY_FROM", a.from), wx.setStorageSync("SHIP_QUERY_TO", a.to), 
        wx.navigateBack();
    },
    onSelecttag: function(t) {
        var a = t.currentTarget.dataset.from;
        if ("全部" == a) {
            var e = this.data.datadic;
            this.afterFetch(!0, e);
        } else {
            var n = [];
            this.data.allline.forEach(function(t) {
                t.region == a && (n = t.ship_line);
            });
            var o = [], i = {};
            n.forEach(function(t) {
                delete t.line_type, delete t.bookable, delete t.map_info;
                var a = t.from_city_info.station_pinyin.charAt(0).toUpperCase();
                t.from_city_info.station_pinyin && o.indexOf(a) < 0 && (o.push(a), i[a] = i[a] || []), 
                i[a].push(t);
            }), console.log(o), console.log(i), o = o.sort(), this.setData({
                allGroup: i,
                mKeys: o,
                selecttag: a
            });
        }
    },
    onInput: function(t) {
        var a = this, n = ((t || {}).detail || {}).value, o = a.filterStation(n);
        a.data.mTHandler || a.setData({
            mTHandler: e.Throttle(function(t, e) {
                a.setData({
                    isSearch: t,
                    mSearchList: e
                });
            }, 100)
        }), a.data.mTHandler(n, o);
    },
    onCancel: function(t) {
        var a = this;
        return a.setData({
            mSearch: "",
            isSearch: !1,
            mSearchList: ""
        }), a;
    },
    filterStation: function(t) {
        var a = this, e = a.data.mKeys || [], n = a.data.allGroup || {};
        t = (t || "").toLowerCase();
        var o = [];
        return e.forEach(function(a) {
            (n[a] || []).forEach(function(a) {
                var e = [];
                e = a.city_map_info;
                for (var n = 0; n < e.length; n++) if (e[n].indexOf(t) >= 0) {
                    o.push(a);
                    break;
                }
            });
        }), o;
    },
    onScrollView: function(t) {
        for (var a = this, e = a.data.mKeys || [], n = a.data.mKeys || [], o = (t.target.dataset || {}).value, i = e.indexOf(o), r = n.length, s = e.length; r <= i && r < s; ) n.push(e[r]), 
        r++;
        a.setData({
            mKeys: n,
            mCurrentV: o
        });
    }
});