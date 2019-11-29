var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
    }
    return e;
}, t = require("../../npm/@hfe/mp-owl/lib/index.js"), i = require("../../components/webview/const.js"), n = require("../../actions/web-view.js"), a = require("../../components/rohr/rohr.js"), r = require("../../utils/mix.js"), o = require("../../api/wx.js").navigateBack, s = require("../base.js"), u = {
    LOGIN: "afterLoginAction"
}, c = [ "loginData", "redirectUrl" ], d = function() {}, l = function(e) {
    return "function" == typeof e;
}, w = (0, require("../../weapp-redux/index.js").connect)(function(e) {
    var t = e.user, i = void 0 === t ? {} : t, n = e.webview, a = n.CONST, r = n.loginData, o = n.baseData, s = n.shareConfig, u = n.webviewUrl;
    return {
        hasLogin: Boolean(i.token),
        CONST: a,
        shareConfig: s,
        webviewUrl: u,
        user: i,
        webviewData: {
            loginData: r,
            baseData: o,
            webviewUrl: u
        }
    };
}, function(e) {
    return {
        updateWebview: function(t) {
            return e((0, n.updateWebview)(t));
        },
        rollbackWebview: function(t) {
            return e((0, n.rollbackWebview)(t));
        }
    };
}), h = {
    pageName: "web-view",
    data: {
        type: null,
        _type: null,
        loaded: !1,
        scenes: null,
        canUseWebview: wx.canIUse("web-view")
    },
    onTouchMove: function() {},
    onTap: function() {},
    onShareAppMessage: function() {
        var t = (0, i.getState)()[i.CONST.KEY_WEBVIEW_SHARE], n = this.data, a = n.shareConfig, r = n.webviewData, o = r.webviewUrl;
        if (t) return this.updateWebview(e({}, r, {
            shareConfig: t
        })), t;
        /%/.test(o) || (o = encodeURIComponent(o));
        var s = Object.assign({}, {
            path: "/pages/web-view/web-view?redirectUrl=" + o
        }, a || {});
        return this.updateWebview(e({}, r, {
            shareConfig: s
        })), s;
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    showLoading: function() {
        wx.showLoading({
            title: "加载中"
        });
    },
    hideLoading: function() {
        wx.hideLoading();
    },
    delayBack: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        this.toast({
            message: e
        }), setTimeout(function() {
            o();
        }, t);
    },
    catchLoadError: function() {
        var e = this;
        setTimeout(function() {
            var t = e.data, i = t.type, n = t.CONST, a = t.webviewData;
            return t.webviewUrl || a.webviewUrl ? (i && i in n || (e.hideLoading(), e.setData({
                type: n.REDIRECT
            })), e) : e.delayBack("需要配置url", 2e3);
        }, 3e3);
    },
    updatePartData: function(e) {
        var t = this.data, i = t.webviewData, n = t.CONST.REDIRECT, a = JSON.parse(JSON.stringify(i), function(e, t) {
            if (-1 === c.indexOf(e)) return t;
        });
        e !== n || a.loginData || this.updateLoginData(a), this.updateWebview(a);
    },
    resolveLoginTag: function() {
        var t = getApp(), n = t[u.LOGIN], a = this.data, r = a.webviewData, o = a.CONST.REDIRECT, s = a._type;
        if (!n) return this.setData({
            type: s
        });
        var c = "", d = wx.getStorageSync("webviewUrl") || r.webviewUrl, l = d.indexOf("#"), w = -1 !== d.indexOf("?") ? "&" : "?";
        return t[u.LOGIN] = null, -1 !== l && (c = d.substr(l), d = d.substring(0, l)), 
        Object.assign(r, {
            webviewUrl: "" + d + w + u.LOGIN + "=" + n + c
        }), this.updateLoginData(r, wx.getStorageSync("user")), this.setData({
            type: o,
            webviewData: e({}, r, {
                redirectUrl: i.middlePageUrl
            })
        });
    },
    decodeUrl: function(e) {
        return decodeURIComponent(decodeURIComponent(e));
    },
    needStoreUrl: function(e) {
        return e && -1 === e.indexOf(u.LOGIN);
    },
    isValidUrl: function(e) {
        return e && /^http/.test(e);
    },
    storeDataIfNeed: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d, i = this.data.webviewData.webviewUrl;
        l(e) && (t = e, e = this.data.type), i && this.needStoreUrl(i) && wx.setStorageSync("webviewUrl", i), 
        this.updatePartData(e), l(t) && t.call(this);
    },
    checkSceneToHome: function() {
        var e = this.data.scenes, t = void 0 === e ? null : e, i = String(wx.getStorageSync("wx_scene") || 0);
        i && t && t.length && -1 !== t.indexOf(i) && wx.switchTab({
            url: "/pages/index/index"
        });
    },
    setScene: function(e) {
        if (e) try {
            e = e.split(/\s*,\s*/), this.setData({
                scenes: e
            });
        } catch (t) {
            this.delayBack("场景值：" + e + "有误", 2e3, t);
        }
    },
    updateLoginData: function(e, t) {
        var n = (0, i.getState)() || {}, a = t = t || n.user || {}, r = a.open_id, o = void 0 === r ? "" : r, s = a.token, u = void 0 === s ? "" : s, c = a.user_id, d = void 0 === c ? "" : c;
        return e.loginData = {
            openid: o,
            token: u,
            userid: d
        }, e;
    },
    onLoad: function(e) {
        var t = void 0, i = e.type, n = void 0 === i ? null : i, a = e.scenes, r = void 0 === a ? null : a, o = this.data.webviewData, s = this.data, u = s.canUseWebview, c = s.CONST, d = c.DIRECT, l = c.REDIRECT, w = o.loginData, h = e.redirectUrl, v = void 0 === h ? null : h, f = e.isHideShareMenu;
        if ((void 0 === f ? null : f) && wx.hideShareMenu(), r = r || null, this.setScene(r), 
        !u) return this.loading(!1), this.compat();
        if (v) {
            if (t = this.decodeUrl(v), o.webviewUrl = t, !this.isValidUrl(t)) return this.delayBack("跳转链接：" + t + "有误", 2e3);
            this.setData({
                webviewData: o
            });
        }
        return this.catchLoadError(), n ? (n !== l || w && w.token || (o = this.updateLoginData(o)), 
        this.storeDataIfNeed(n)) : n = w ? l : d, this.setData({
            webviewData: o,
            _type: n,
            type: n
        });
    },
    clearState: function() {
        (0, i.getState)()[i.CONST.KEY_WEBVIEW_SHARE] = null;
    },
    checkEntry: function() {
        try {
            var e = Number(wx.getStorageSync("wx_scene"));
            e && 1 === getCurrentPages().length && (1001 !== e && 1019 !== e && 1089 !== e || wx.switchTab({
                url: "/pages/index/index"
            }));
        } catch (e) {
            console.log(e);
        }
    },
    onShow: function() {
        this.data.loaded ? (this.checkSceneToHome(), this.resolveLoginTag()) : this.setData({
            loaded: !0
        });
    },
    onReady: function() {},
    onHide: function() {
        var e = this;
        this.storeDataIfNeed(function() {
            e.setData({
                type: null
            });
        });
    },
    onUnload: function() {
        this.clearState(), this.rollbackWebview();
    },
    getReportData: function() {
        return {};
    }
};

(0, t.page)(r(h, w, s, a));