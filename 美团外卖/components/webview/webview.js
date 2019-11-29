function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
}, o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
}, i = e(require("../../store.js")), n = e(require("../../reducers/selectors/common-param.js")), s = require("./const.js"), a = e(require("../../utils/object-assign.js")), l = s.CONST.KEY_WEBVIEW_SHARE, u = s.CONST.SHARE;

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        wmSrc: {
            type: String,
            value: s.middlePageUrl,
            observer: function() {
                var e = this.data.inited, t = this.properties.wmData.redirectUrl;
                e && this.resolveUrl(!!t);
            }
        },
        wmData: {
            type: Object,
            value: s.defaultState
        }
    },
    data: {
        minVersion: "1.7.1",
        canUseWebview: wx.canIUse("web-view"),
        showWebView: !1,
        showSlot: !1,
        inited: !1,
        url: ""
    },
    methods: {
        compareVersion: function(e, t) {
            var r = void 0, o = void 0, i = void 0;
            e = e.split("."), t = t.split(".");
            for (var n = Math.max(e.length, t.length); e.length < n; ) e.push("0");
            for (;t.length < n; ) t.push("0");
            for (i = 0; i < n; i++) {
                if (r = parseInt(e[i], 10), o = parseInt(t[i], 10), r > o) return 1;
                if (r < o) return -1;
            }
            return 0;
        },
        onMessageWebview: function(e) {
            var t = e.detail;
            if (t && t.data) {
                var r = t.data[0] || {};
                this.resolveShareConfig(r);
            }
        },
        resolveShareConfig: function(e) {
            var t = e.type, r = void 0 === t ? "" : t, o = (0, s.getState)();
            r === u && (o[l] = e);
        },
        getHash: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = "", o = e.indexOf("#");
            return -1 !== o && (r = e.substr(o), e = e.substring(0, o)), t && (this.hash = encodeURIComponent(r) || ""), 
            {
                url: e,
                hash: r
            };
        },
        serialize: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = "", n = -1 !== e.indexOf("?") ? "&" : "?", a = this.getHash(e), l = a.url, u = a.hash, h = void 0 === u ? "" : u;
            return "object" === (void 0 === t ? "undefined" : o(t)) && (r.other && Object.assign(t, s.otherParams), 
            i = (i = Object.keys(t).reduce(function(e, r) {
                var i = t[r];
                return i && "object" === (void 0 === i ? "undefined" : o(i)) && (i = JSON.stringify(i)), 
                "" + e + r + "=" + encodeURIComponent(i) + "&";
            }, "")) ? "" + n + i.substring(0, i.length - 1) : ""), "" + l + i + h + (r.hash ? this.hash : "");
        },
        getCommonParam: function() {
            var e = {}, t = {};
            try {
                e = wx.getStorageSync("userInfo"), t = wx.getStorageSync("user");
            } catch (e) {
                var r = e.message;
                console.log(r);
            }
            var o = i.default.getState(), s = (0, n.default)(o);
            return (0, a.default)({}, s, e, t);
        },
        resolveUrl: function(e) {
            var t = this.properties, o = t.wmData, i = o.loginData, n = o.baseData, a = o.webviewUrl, l = o.redirectUrl, u = t.wmSrc, h = this.getHash(a, !0), c = h.url, d = (h.hash, 
            s.defaultState.CONST), f = (d.DIRECT, d.REDIRECT, this.getCommonParam());
            if (!i) return this.setData({
                url: this.serialize(u, n, {
                    other: !0
                }),
                showWebView: !0,
                showSlot: !1
            });
            var v = Object.assign({}, r({}, f, {
                logindata: i || {},
                redirecturl: this.serialize(c, n, {
                    other: !0
                })
            })), m = this.serialize(e && l || u, v, {
                hash: !0
            });
            console.log(m), this.setData({
                url: m,
                showWebView: !0,
                showSlot: !1
            });
        }
    },
    attached: function() {
        var e = wx.getSystemInfoSync(), t = this.data, r = t.minVersion, o = t.canUseWebview, i = e.SDKVersion;
        (!o || this.compareVersion(i, r) < 0) && this.setData({
            showWebView: !1,
            showSlot: !0
        });
    },
    ready: function() {
        this.resolveUrl(), this.setData({
            inited: !0
        }), wx.hideNavigationBarLoading();
    }
});