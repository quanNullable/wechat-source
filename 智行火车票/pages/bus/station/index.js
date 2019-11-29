var t = require("../../../cwx/cwx.js"), e = require("../buscommon/service.js"), a = require("../buscommon/utils.js"), n = require("../buscommon/global.js");

(0, t.CPage)({
    pageid: "10320655426",
    data: {
        mFrom: "上海",
        mTo: "北京",
        isFrom: !0,
        isError: !1,
        mLoaded: !1,
        mSearch: "",
        mMessage: "",
        isSearch: !1,
        mCurrent: {},
        mHisList: [],
        mKeys: [],
        mHotList: [],
        mStations: [],
        mSearchList: [],
        mCurrentV: "position",
        mTHandler: null,
        mLoading: {
            isLoading: !1,
            message: ""
        }
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            mLoaded: !1,
            isFrom: !!t.isFrom,
            mFrom: t.from || e.data.mFrom,
            mTo: t.to || e.data.mTo
        });
        var a = t.isFrom ? wx.getStorageSync("BUS_HIS_FROM") || [] : wx.getStorageSync("BUS_HIS_TO") || [];
        if (e.setData({
            mHisList: a
        }), t.isFrom) {
            var r = new Date().getTime(), o = wx.getStorageSync("BUS_FROM_SAVE_TIME") || 0;
            (!o || o <= 0) && wx.setStorageSync("BUS_STATIONS_FROM", ""), o > 0 && 1 * r - 1 * o > 1 * n.CONSTANT.STATION_EXPIRE && wx.setStorageSync("BUS_STATIONS_FROM", "");
        }
        t.isFrom ? e.fetchFrom() : e.fetchTo(e.data.mFrom);
    },
    onUnload: function() {},
    onShow: function() {},
    onReady: function() {},
    onSelectLoc: function(t) {
        var e = this, a = t.target.dataset || {};
        e.onBack(a.name);
    },
    onSelectHis: function(t) {
        var e = this, a = t.target.dataset || {};
        e.onBack(a.name);
    },
    onSelectHot: function(t) {
        var e = this, a = t.target.dataset || {};
        e.onBack(a.name);
    },
    onSelect: function(t) {
        var e = this, a = t.target.dataset || {};
        e.onBack(a.name);
    },
    onSelect2: function(t) {
        var e = this, a = t.target.dataset || {};
        e.onBack(a.name);
    },
    onBack: function(t) {
        var e = this;
        if (t) {
            if (e.data.isFrom) {
                var a = wx.getStorageSync("BUS_HIS_FROM") || [];
                a.indexOf(t) < 0 && a.unshift(t), wx.setStorageSync("BUS_QUERY_FROM", t), wx.setStorageSync("BUS_HIS_FROM", a.slice(0, 8));
            } else {
                var n = wx.getStorageSync("BUS_HIS_TO") || [];
                n.indexOf(t) < 0 && n.unshift(t), wx.setStorageSync("BUS_QUERY_TO", t), wx.setStorageSync("BUS_HIS_TO", n.slice(0, 8));
            }
            wx.navigateBack();
        } else wx.navigateBack();
    },
    onScrollView: function(t) {
        for (var e = this, a = e.data.mSrcKeys || [], n = e.data.mKeys || [], r = (t.target.dataset || {}).value, o = a.indexOf(r), s = n.length, i = a.length; s <= o && s < i; ) n.push(a[s]), 
        s++;
        e.setData({
            mKeys: n,
            mCurrentV: r
        });
    },
    onScrollEnd: function(t) {
        var e = this, a = e.data.mKeys || [];
        a.length < e.data.mSrcKeys.length && a.push(e.data.mSrcKeys[a.length]), e.setData({
            mKeys: a
        });
    },
    onInput: function(t) {
        var e = this, n = ((t || {}).detail || {}).value, r = e.filterStation(n);
        e.data.mTHandler || e.setData({
            mTHandler: a.Throttle(function(t, a) {
                e.setData({
                    isSearch: t,
                    mSearchList: a
                });
            }, 100)
        }), e.data.mTHandler(n, r);
    },
    onCancel: function(t) {
        var e = this;
        return e.setData({
            mSearch: "",
            isSearch: !1,
            mSearchList: ""
        }), e;
    },
    filterStation: function(t) {
        var e = this, a = e.data.mSrcKeys || [], n = e.data.mStations || {};
        t = (t || "").toLowerCase();
        var r = [];
        return a.forEach(function(e) {
            (n[e] || []).forEach(function(e) {
                ((e.py || "").indexOf(t) >= 0 || e.nm.indexOf(t) >= 0 || e.sp.indexOf(t) >= 0) && r.push(e);
            });
        }), r;
    },
    fetchFrom: function() {
        var t = this, a = wx.getStorageSync("BUS_STATIONS_FROM") || [];
        if (t.beforeFetch(), a.length > 0) return t.afterFetch(!0, a);
        e.getFromStations(null, {
            success: function(e) {
                (e || []).length > 0 && (wx.setStorageSync("BUS_STATIONS_FROM", e), wx.setStorageSync("BUS_FROM_SAVE_TIME", new Date().getTime())), 
                t.afterFetch(!0, e || []);
            },
            fail: function(e) {
                t.afterFetch(!1, e || "获取城市列表失败");
            }
        });
    },
    fetchTo: function(t) {
        var a = this;
        t = t || a.data.mFrom, a.beforeFetch(), e.getToStations({
            fromCity: t
        }, {
            success: function(t) {
                var e = [];
                (t || []).forEach(function(t) {
                    var a = {
                        nm: t.name,
                        cs: t.citySort,
                        py: t.pinyin,
                        sp: t.shortPinyin,
                        gd: t.grade
                    };
                    a.nm && a.py && e.push(a);
                }), a.afterFetch(!0, e || []);
            },
            fail: function(t) {
                a.afterFetch(!1, t || "获取城市列表失败");
            }
        });
    },
    beforeFetch: function() {
        var t = this;
        return t.setData({
            isLoaded: !1
        }), t.showLoading("正在加载"), t;
    },
    afterFetch: function(t, e) {
        var a = this, n = [], e = e || [];
        a.hideLoading(), t || a.showError(e || "服务异常").hideError(), e.forEach(function(t) {
            1 == t.gd && n.push(t);
        });
        var r = [], o = {};
        e.forEach(function(t) {
            delete t.sl, delete t.cs, delete t.gd;
            var e = t.py.charAt(0).toUpperCase();
            t.py && r.indexOf(e) < 0 && (r.push(e), o[e] = o[e] || []), o[e].push(t);
        }), r = r.sort();
        var s = a.calcFirstGlance(r, o);
        a.setData({
            mLoaded: !0,
            mSrcKeys: r,
            mKeys: s,
            mCurrent: "上海",
            mHotList: n,
            mStations: o
        });
    },
    calcFirstGlance: function(t, e) {
        t = t || [], e = e || {};
        var a = [], n = 0;
        return t.forEach(function(t) {
            n < 20 && (n += (e[t] || []).length || 0, a.push(t));
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
        t = t || "服务异常";
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
    }
});