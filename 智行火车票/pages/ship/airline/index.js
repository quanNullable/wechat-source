var a = require("../../../cwx/cwx.js"), e = (require("../api/datahandler.js"), require("../common/utils.js"), 
require("../api/api"));

require("../common/global.js");

(0, a.CPage)({
    pageId: "",
    data: {
        from_station_name: "",
        to_station_name: "",
        isSearch: !1,
        mLoaded: !0,
        website: "",
        air_allline: [],
        allGroup: {},
        mCurrentV: "position",
        mKeys: [],
        mLoading: {
            isLoading: !1,
            message: ""
        },
        isError: !1,
        mMessage: ""
    },
    onLoad: function(a) {
        var t = this, n = {
            from_station_name: a.from_station_name,
            to_station_name: a.to_station_name,
            website: a.website
        };
        e.getairline(n, {
            success: function(a) {
                t.afterFetch(!0, a);
            },
            fail: function(a) {}
        });
    },
    afterFetch: function(a, e) {
        var t = this, n = e.data;
        t.setData({
            air_allline: e.data
        });
        var i = [], o = {};
        n.forEach(function(a) {
            var e = a.prefix.charAt(0).toUpperCase();
            a.prefix && i.indexOf(e) < 0 && (i.push(e), o[e] = o[e] || []), o[e].push(a);
        }), i = i.sort(), t.setData({
            allGroup: o,
            mKeys: i
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onScrollView: function(a) {
        for (var e = this, t = e.data.mKeys || [], n = e.data.mKeys || [], i = (a.target.dataset || {}).value, o = t.indexOf(i), r = n.length, s = t.length; r <= o && r < s; ) n.push(t[r]), 
        r++;
        e.setData({
            mKeys: n,
            mCurrentV: i
        });
    },
    onSelect: function(a) {
        var e = a.currentTarget.dataset;
        wx.setStorageSync("SHIP_AIR_COMPANY_NAME", e.name), wx.setStorageSync("SHIP_AIR_COMPANY_PREFIX", e.prefix), 
        wx.navigateBack();
    },
    onShareAppMessage: function() {},
    showLoading: function(a) {
        var e = this, t = {
            isLoading: !0,
            message: a || "加载中"
        };
        return e.setData({
            mLoading: t
        }), e;
    },
    hideLoading: function() {
        var a = this, e = {
            isLoading: !1,
            message: ""
        };
        return a.setData({
            mLoading: e
        }), a;
    },
    showError: function(a) {
        a = a || "操作失败";
        var e = this;
        return e.setData({
            isError: !0,
            mMessage: a
        }), e;
    },
    hideError: function() {
        var a = this;
        return setTimeout(function() {
            a.setData({
                isError: !1,
                mMessage: ""
            });
        }, 2e3), a;
    }
});