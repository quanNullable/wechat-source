var t = require("../../../cwx/cwx.js"), a = (require("../api/datahandler.js"), require("../common/utils.js"), 
require("../api/api"));

require("../common/global.js");

(0, t.CPage)({
    pageId: "",
    data: {
        isSearch: !1,
        mLoaded: !0,
        air_allline: [],
        allGroup: {},
        mCurrentV: "position",
        mKeys: [],
        mLoading: {
            isLoading: !1,
            message: ""
        },
        isError: !1,
        mMessage: "",
        IScountry: !0
    },
    onLoad: function(t) {
        var e = this;
        "IScountry" == t.IScountry && e.setData({
            IScountry: !1
        });
        var n = {};
        a.countrylist(n, {
            success: function(t) {
                e.afterFetch(!0, t);
            },
            fail: function(t) {}
        });
    },
    afterFetch: function(t, a) {
        var e = this, n = a.data;
        e.setData({
            air_allline: a.data
        });
        var r = [], o = {};
        n.forEach(function(t) {
            if (e.data.IScountry) {
                a = t.py.charAt(0).toUpperCase();
                t.py && r.indexOf(a) < 0 && (r.push(a), o[a] = o[a] || []), o[a].push(t);
            } else if ("中国大陆" == t.cn || "中国香港" == t.cn || "中国澳门" == t.cn || "中国台湾" == t.cn) ; else {
                var a = t.py.charAt(0).toUpperCase();
                t.py && r.indexOf(a) < 0 && (r.push(a), o[a] = o[a] || []), o[a].push(t);
            }
        }), r = r.sort(), e.setData({
            allGroup: o,
            mKeys: r
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onScrollView: function(t) {
        for (var a = this, e = a.data.mKeys || [], n = a.data.mKeys || [], r = (t.target.dataset || {}).value, o = e.indexOf(r), s = n.length, i = e.length; s <= o && s < i; ) n.push(e[s]), 
        s++;
        a.setData({
            mKeys: n,
            mCurrentV: r
        });
    },
    onSelect: function(t) {
        var a = this, e = t.currentTarget.dataset;
        a.data.IScountry ? (wx.setStorageSync("SHIP_AIR_CN", e.cn), wx.setStorageSync("SHIP_AIR_CODE", +e.code)) : (wx.setStorageSync("Country_CN", e.cn), 
        wx.setStorageSync("Country_Country", e.country)), wx.navigateBack();
    },
    onShareAppMessage: function() {},
    showLoading: function(t) {
        var a = this, e = {
            isLoading: !0,
            message: t || "加载中"
        };
        return a.setData({
            mLoading: e
        }), a;
    },
    hideLoading: function() {
        var t = this, a = {
            isLoading: !1,
            message: ""
        };
        return t.setData({
            mLoading: a
        }), t;
    },
    showError: function(t) {
        t = t || "操作失败";
        var a = this;
        return a.setData({
            isError: !0,
            mMessage: t
        }), a;
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