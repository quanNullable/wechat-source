function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, i) {
            function r(a, n) {
                try {
                    var o = e[a](n), s = o.value;
                } catch (t) {
                    return void i(t);
                }
                if (!o.done) return Promise.resolve(s).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(s);
            }
            return r("next");
        });
    };
}

function e(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../npm/babel-runtime/regenerator/index.js")), r = require("../utils/object-assign.js"), a = require("../utils/camel-case.js"), n = require("../api/wx.js"), o = n.makePhoneCall, s = n.showNavigationBarLoading, u = n.hideNavigationBarLoading, c = n.showLoading, l = n.hideLoading, h = require("../weapp-redux/index.js").connect, d = require("../utils/mix.js"), f = require("../utils/wx.js").storage.getItem, g = require("../api/index.js"), v = require("../api/analytics.js").pv, p = require("../utils/param.js"), m = g.ready, y = require("../api/wx.js"), _ = y.setNavigationBarTitle, w = y.requestJSON, x = y.navigateTo, S = require("../utils/trace-tag-manager.js"), T = require("../utils/random-item.js"), U = require("../utils/starts-with.js"), k = require("../constants.js").SHARE_MESSAGES, D = require("../utils/lx.js"), q = require("../constants.js"), C = q.bucketname, b = q.clientid, j = q.serverMaxUploadSize, M = q.maxUploadTimeout, L = function(t) {
    return t;
}, P = {
    loading: {
        show: !0,
        catchtouchmove: !1
    },
    toast: {
        show: !1
    },
    alert: {
        show: !1,
        type: "alert"
    },
    confirm: {
        show: !1,
        type: "confirm"
    },
    error: {
        show: !1,
        type: "error"
    },
    spiderError: {
        show: !1,
        type: "error"
    },
    compat: {
        show: !1,
        type: "error"
    },
    actionSheet: {
        show: !1
    },
    verify: {
        show: !1,
        verifyUrl: ""
    },
    iptPhone: {
        show: !1,
        inputValue: "",
        type: "iptPhone",
        isRight: !1,
        error: !1,
        hasValue: !1
    },
    spider_error: {
        show: !1,
        type: "error"
    }
}, O = null;

module.exports = function(n) {
    var y = n.data, q = n.onLoad, N = n.onUnload, A = n.onShow, I = n.onHide, R = n.onShareAppDesc, B = n.getReportData, E = n.mixin, z = n.mapStateToData, K = n.mapDispatchToPage, H = {
        pageHidden: !1,
        pageUnloaded: !1,
        data: r({}, P, y),
        _events: {
            alert_ok: null,
            confirm_cancel: null,
            confirm_ok: null,
            error_ok: null,
            actionSheet_ok: null,
            actionSheet_cancel: null
        },
        onClickBaseActionSheet: function(t) {
            var e = t.currentTarget.dataset, i = e.item, r = e.index, a = this._events, n = a.actionSheet_ok, o = a.actionSheet_cancel;
            a.actionSheet_ok = null, a.actionSheet_cancel = null;
            var s = P.actionSheet;
            this.setData({
                actionSheet: s
            }), i ? n && n(parseInt(r, 10)) : o && o();
        },
        onClickCloseButton: function() {
            this.setData({
                confirm: {
                    show: !1
                }
            });
        },
        preventTapBubble: function() {},
        onTapBackdrop: function() {
            this.setData({
                confirm: {
                    show: !1
                },
                alert: {
                    show: !1
                }
            });
        },
        onClickBaseComponent: function(t) {
            var i = t.currentTarget.dataset, r = i.action, n = i.type, o = i.persist, s = P[a(n)];
            if (s) {
                var u = n + "_" + r, c = this._events, l = c[u];
                o || (c[n + "_ok"] = null, c[n + "_cancel"] = null, this.setData(e({}, n, s))), 
                l && l.call(this);
            }
        },
        alert: function(t) {
            var e = t.title, i = t.message, r = t.messagelist, a = t.ok, n = t.textOK;
            this._events.alert_ok = a, this.setData({
                alert: {
                    show: !0,
                    type: "alert",
                    title: e,
                    message: i,
                    messagelist: r,
                    textOK: n
                }
            });
        },
        confirm: function(t) {
            var e = t.title, i = t.message, r = t.ok, a = t.cancel, n = t.textOK, o = t.textCancel, s = t.showCloseButton;
            this._events.confirm_cancel = a, this._events.confirm_ok = r, this.setData({
                confirm: {
                    show: !0,
                    type: "confirm",
                    title: e,
                    message: i,
                    textOK: n,
                    textCancel: o || "取消",
                    showCloseButton: s
                }
            });
        },
        error: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.ok, i = t.img, r = t.message, a = t.textOK;
            r ? (this._events.error_ok = e, this.setData({
                error: {
                    show: !0,
                    type: "error",
                    img: i,
                    message: r,
                    textOK: a
                }
            })) : this.setData({
                error: P.error
            });
        },
        spiderError: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.ok, i = t.img, r = t.message, a = t.textOK, n = t.customer_ip;
            this._events.spider_error_ok = e, this.setData({
                spiderError: {
                    show: !0,
                    type: "spider_error",
                    img: i,
                    message: r,
                    textOK: a,
                    customer_ip: n
                }
            });
        },
        actionSheet: function(t) {
            var e = t.itemList, i = t.ok, r = t.cancel;
            this._events.actionSheet_ok = i, this._events.actionSheet_cancel = r, this.setData({
                actionSheet: {
                    show: !0,
                    itemList: e
                }
            });
        },
        loading: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            t ? s() : u(), this.setData({
                loading: {
                    show: !!t,
                    catchtouchmove: e
                }
            });
        },
        wxLoading: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            t ? c(e) : l();
        },
        startLazyLoading: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                title: "加载中..."
            };
            this.clearLazyLoading(), this.lazyTimeout = setTimeout(function() {
                t.wxLoading(!0, i);
            }, e >= 0 ? e : 3e3);
        },
        clearLazyLoading: function() {
            this.lazyTimeout && (clearTimeout(this.lazyTimeout), this.lazyTimeout = null), this.wxLoading(!1);
        },
        toastTo: -1,
        toast: function(t) {
            var e = this, i = t.message, r = t.className, a = void 0 === r ? "" : r, n = t.duration, o = void 0 === n ? 3e3 : n;
            this.clearTimeout(this.toastTo), this.toastTo = this.setTimeout(function() {
                e.setData({
                    toast: P.toast
                });
            }, o), this.setData({
                toast: {
                    show: !0,
                    message: i,
                    className: a
                }
            });
        },
        compat: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = Object.assign({}, {
                isTab: !0,
                zIndex: 10001,
                img: "no-poi",
                url: "../../pages/index/index",
                message: "你的微信版本过低，请升级后重新进入。",
                textOK: "返回首页"
            }, t || {}, {
                show: !0,
                type: "compat"
            }), i = e.url, r = e.isTab;
            this._events.compat_ok = function() {
                return r ? wx.switchTab({
                    url: i
                }) : x({
                    url: i
                });
            }, this.setData({
                error: e
            });
        },
        isFunction: function(t) {
            var e = function(t) {
                return "function" == typeof t;
            };
            return Array.isArray(t) ? t.every(e) : t && e(t);
        },
        getMessage: function(t) {
            var e = {
                "001": "入参类型有误，必须是方法",
                "002": function(t) {
                    return t + "不能为空";
                }
            }[t];
            if (!this.isFunction(e)) return e;
            for (var i = arguments.length, r = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) r[a - 1] = arguments[a];
            return e.apply(this, r);
        },
        invariant: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Internal error";
            if (!t) throw new Error(e);
            return this;
        },
        matchUploadSize: function() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0) <= j;
        },
        uploadFile: function(t) {
            var e = t.bucket, i = void 0 === e ? C : e, r = t.clientid, a = void 0 === r ? String(b) : r, n = t.url, o = void 0 === n ? "qa" !== wx.getStorageSync("ENV") ? "https://pic.meituan.com/extrastorage/new/" : "https://extrauploader.inf.test.sankuai.com/extrastorage/new/" : n, s = t.filePath, u = void 0 === s ? "" : s, c = t.name, l = void 0 === c ? "waimai-wxapp-upload-file" : c, h = t.header, d = void 0 === h ? {
                isImage: String(!0),
                isHttps: String(!0)
            } : h, f = t.callback, g = void 0 === f ? L : f, v = t.fallback, p = void 0 === v ? L : v, m = t.errorCallback, y = t.debug, _ = void 0 !== y && y, w = t.progress, x = void 0 !== w && w, S = t.timeout, T = void 0 === S ? M : S;
            i = i || C, a = a || String(b), m = m || p || L, o = "" + o + i, d["client-id"] = a, 
            _ && (this.invariant(this.isFunction([ g, p, m ]), this.getMessage("001")), this.invariant(u, this.getMessage("002", "filePath")));
            var U = (getApp().store.getState() || {}).user || {};
            d.token = U.token || "";
            var k = wx.uploadFile({
                url: o,
                filePath: u,
                name: l,
                header: d,
                success: function(t) {
                    var e = t.data;
                    try {
                        var i = JSON.parse(e);
                        i && i.data && i.success ? g(i.data) : m(i.error);
                    } catch (t) {
                        m(t);
                    }
                },
                fail: function() {
                    p();
                }
            });
            this.isFunction(x) && k.onProgressUpdate(x), setTimeout(function() {
                k.abort();
            }, T || M);
        },
        _toMap: null,
        _toPending: 0,
        _toCount: 0,
        resetToMapIfNeeded: function() {
            (!this._toMap || 0 === this._toPending && this._toCount > 100) && (this._toMap = Object.create(null), 
            this._toCount = 0);
        },
        verify: function(t) {
            var e = t.verifyUrl, i = t.imageUrl;
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: e,
                    imageUrl: i,
                    imageUrlRequest: i,
                    verify_input: ""
                }
            });
        },
        verifyClear: function() {
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: this.data.verify.verifyUrl,
                    imageUrl: this.data.imageUrl,
                    imageUrlRequest: this.data.imageUrlRequest,
                    verify_input: ""
                }
            });
        },
        verifyClose: function() {
            this.setData({
                verify: {
                    show: !1
                }
            });
        },
        verifyChange: function() {
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: this.data.verify.verifyUrl,
                    imageUrl: this.data.verify.imageUrl,
                    imageUrlRequest: this.data.verify.imageUrl + "&t=" + new Date().getTime(),
                    verify_input: ""
                }
            });
        },
        onVerifyInput: function(t) {
            var e = t.detail.value;
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: this.data.verify.verifyUrl,
                    imageUrl: this.data.verify.imageUrl,
                    imageUrlRequest: this.data.verify.imageUrlRequest,
                    verify_input: e
                }
            });
        },
        verifyRequest: function() {
            var e = this;
            return t(i.default.mark(function t() {
                var r, a, n, o, s, u;
                return i.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return r = void 0, t.prev = 1, t.next = 4, f("UUID");

                      case 4:
                        r = t.sent, r = r.data, t.next = 13;
                        break;

                      case 8:
                        t.prev = 8, t.t0 = t.catch(1), a = t.t0.message, r = "", console.log(a);

                      case 13:
                        return n = p({
                            uuid: r,
                            platform: 13,
                            partner: 4,
                            captchacode: e.data.verify.verify_input
                        }), t.next = 16, w({
                            url: e.data.verify.verifyUrl + "&" + n,
                            method: "GET"
                        });

                      case 16:
                        1 === (o = t.sent).status ? (s = "/" + getCurrentPages()[0].route + "?" + p(getCurrentPages()[0].options), 
                        console.log(s), [ "pages/index/index", "pages/orders/orders", "pages/mine/mine" ].indexOf(getCurrentPages()[0].route) >= 0 ? wx.reLaunch({
                            url: s
                        }) : wx.redirectTo({
                            url: s
                        })) : (u = o.error.split(" ")[1].split(":")[1], e.toast({
                            message: u
                        }), e.verifyChange());

                      case 18:
                      case "end":
                        return t.stop();
                    }
                }, t, e, [ [ 1, 8 ] ]);
            }))();
        },
        setTimeout: function(t) {
            function e(e, i) {
                return t.apply(this, arguments);
            }
            return e.toString = function() {
                return t.toString();
            }, e;
        }(function(t, e) {
            var i = this;
            this.resetToMapIfNeeded();
            var r = this._toMap;
            this._toPending += 1, this._toCount += 1;
            var a = setTimeout(function() {
                i._toPending -= 1, r[a] = null, i.resetToMapIfNeeded(), t();
            }, e);
            return r[a] = a, a;
        }),
        clearTimeout: function(t) {
            function e(e) {
                return t.apply(this, arguments);
            }
            return e.toString = function() {
                return t.toString();
            }, e;
        }(function(t) {
            var e = this._toMap;
            e && e[t] && (this._toPending -= 1, e[t] = null, this.resetToMapIfNeeded()), clearTimeout(t);
        }),
        cleanTimeouts: function() {
            var t = this._toMap;
            if (t) {
                for (var e = Object.keys(t), i = e.length - 1; i > -1; --i) {
                    var r = t[e[i]];
                    null !== r && clearTimeout(r);
                }
                this._toMap = null;
            }
        },
        onUnload: function() {
            this.cleanTimeouts(), N && N.call(this), this.pageUnloaded = !0;
        },
        onLoad: function(t) {
            var e = this;
            this.pageUnloaded = !1, this.__pageLoadTime__ = Date.now();
            var i = O;
            O = null;
            var a = t.utm_source, n = t.scene;
            if (a && g.setUTMSource(a), n) {
                var o = decodeURIComponent(n).match(/utm\!\w*/)[0];
                o && o.split("!")[1] && g.setUTMSource(o.split("!")[1]);
            }
            var u = getApp().store.getState().extradata.from;
            "mt" === u ? g.setUTMSource(7777) : "ticket" === u ? g.setUTMSource(7800) : "dianping-wxapp" === u && g.setUTMSource(7858), 
            q && m(function() {
                q.call(e, r(t, i)), e.data.loading.show && s();
            });
        },
        onShow: function() {
            var t = this;
            this.pageHidden = !1, m(A ? function() {
                v(), A.call(t);
            } : v);
        },
        onHide: function() {
            I && I.call(this), this.pageHidden = !0;
        },
        setNavigationBarTitle: function(t) {
            this.pageUnloaded || _(t);
        },
        showPhoneCall: function(t) {
            var e = t.phones, i = t.texts, r = void 0 === i ? e : i;
            this.actionSheet({
                itemList: r,
                ok: function(t) {
                    o({
                        phoneNumber: e[t]
                    });
                }
            });
        },
        traceTagStart: function(t) {
            return S.start(t);
        },
        traceTagGet: function(t) {
            return S.get(t);
        },
        traceTagEnd: function(t) {
            return S.end(t);
        },
        onShareAppDesc: function() {
            return (R ? R.call(this) : "") || T(k);
        },
        getReportData: function() {
            return (B ? B.call(this) : null) || {};
        },
        onClickNavigator: function(t) {
            var e = t.currentTarget.dataset, i = {};
            Object.keys(e).forEach(function(t) {
                if (t.length > 3 && U(t, "arg")) {
                    var r = t.slice(3), a = r.toLowerCase();
                    a !== r && (i[a] = e[t]);
                }
            }), O = i;
        }
    }, F = {
        api: g,
        onShareAppMessage: function() {
            var t = this.pageName || "unknown";
            return {
                title: "美团外卖",
                desc: this.onShareAppDesc(),
                path: "/pages/index/index?from=from_share_" + t
            };
        }
    };
    n.store && (z || K) && console.error("Store already existed");
    var V = r(F, n, H, D), G = V.store ? V : h(z, K)(V);
    return E && E.length ? d(G, E) : G;
};