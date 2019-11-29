function t(t, e) {
    var n = 0, r = void 0, o = void 0, i = void 0;
    if ("utf-16" === (e = e ? e.toLowerCase() : "") || "utf16" === e) for (o = 0, i = t.length; o < i; o++) n += (r = t.charCodeAt(o)) <= 65535 ? 2 : 4; else for (o = 0, 
    i = t.length; o < i; o++) n += (r = t.charCodeAt(o)) <= 127 ? 1 : r <= 2047 ? 2 : r <= 65535 ? 3 : 4;
    return n;
}

function e(t) {
    var e = [];
    for (var n in t) t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
    return e.join("&");
}

function n(t) {
    if (t && w.push(t), !(w.length > 1 && t)) {
        var e = w[0], r = e.complete;
        e.complete = function(t) {
            w.shift(), w.length && n(), r && r.call(this, t);
        }, wx.request(e);
    }
}

function r() {
    return 65535 * Math.random();
}

function o() {
    return Math.ceil(r()).toString(16);
}

function i() {
    var t = [], e = new Date().getTime();
    return t.push(e.toString(16)), t.push(o()), t.push(o()), t.push(o()), t.join("-");
}

function a(t, n) {
    var r = t.wxAppVersion, o = void 0 === r ? "Unknown" : r, i = n.wxVersion, a = void 0 === i ? "Unknown" : i, s = n.wxLibVersion;
    return e({
        wxVersion: a,
        wxLibVersion: void 0 === s ? "Unknown" : s,
        wxAppVersion: o
    });
}

function s(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function u(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function c() {
    var t = getCurrentPages() || [];
    return t.length ? t[t.length - 1].__route__ : "";
}

function f() {
    return wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(t) {
        j.network = t.networkType;
    }), new Promise(function(t, e) {
        wx.getNetworkType({
            success: function(e) {
                t(e.networkType);
            },
            fail: function() {
                t("unknown");
            }
        }), setTimeout(function() {
            t("unknown");
        }, 2e3);
    });
}

function l() {
    return new Promise(function(t, e) {
        wx.getSystemInfo({
            success: function(e) {
                var n = e.system, r = void 0 === n ? "" : n, o = e.version, i = void 0 === o ? "Unknown" : o, a = e.SDKVersion, s = void 0 === a ? "Unknown" : a, u = r.toLowerCase().match(/ios/) ? "iOS" : "Android";
                t({
                    os: u,
                    wxVersion: i,
                    wxLibVersion: s
                });
            },
            fail: function() {
                t("unknown");
            }
        });
    });
}

function p() {
    var t = c();
    return new Promise(function(e, n) {
        Object.keys(j).length ? e(Object.assign({
            pageUrl: t
        }, j)) : Promise.all([ f(), l() ]).then(function(n) {
            var r = b(n, 2), o = r[0], i = r[1];
            j = Object.assign({}, i, {
                network: o
            }), e(Object.assign({}, j, {
                pageUrl: t
            }));
        }).catch(function() {
            e({});
        });
    });
}

function h(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function v(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function d(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function g(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var w = [], y = function t(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "https://catfront.dianping.com";
    if (s(this, t), this.env = "pro", Object.assign(this, e), !this.unionId) {
        var r = wx.getStorageSync("CATWXMPSDK-unionId");
        r ? this.unionId = r : (this.unionId = i(), wx.setStorage({
            key: "CATWXMPSDK-unionId",
            data: this.unionId
        }));
    }
    this.reportUrl = n;
}, m = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), k = function() {
    function t(e) {
        u(this, t), this.config = e, this.tags = {}, this.kvs = {};
    }
    return m(t, [ {
        key: "setTags",
        value: function(t) {
            this.tags = Object.assign(this.tags, t);
        }
    }, {
        key: "getTags",
        value: function(t) {
            return t ? this.tags[t] : this.tags;
        }
    }, {
        key: "setMetric",
        value: function(t, e) {
            "string" == typeof t && "number" == typeof e && (this.kvs[t] || (this.kvs[t] = []), 
            this.kvs[t].push(e));
        }
    }, {
        key: "getMetric",
        value: function(t) {
            return t ? this.kvs[t] : this.kvs;
        }
    }, {
        key: "clearMetric",
        value: function() {
            this.tags = {};
        }
    }, {
        key: "_rollbackMetric",
        value: function(t) {
            this.tags = t || {};
        }
    }, {
        key: "report",
        value: function() {
            var t = this;
            if ("dev" !== this.config.env) {
                var e = this.config, r = e.reportUrl, o = e.project;
                if (this.kvs && 0 !== Object.keys(this.kvs).length) {
                    var i = {
                        kvs: this.kvs,
                        tags: this.tags,
                        ts: parseInt(+new Date() / 1e3)
                    }, a = this.tags;
                    this.clearMetric(), n({
                        url: r + "/api/metric?v=1&p=" + o,
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: "data=" + encodeURIComponent(JSON.stringify(i)),
                        fail: function() {
                            t._rollbackMetric(a);
                        }
                    });
                }
            }
        }
    } ]), t;
}(), b = function() {
    function t(t, e) {
        var n = [], r = !0, o = !1, i = void 0;
        try {
            for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), 
            !e || n.length !== e); r = !0) ;
        } catch (t) {
            o = !0, i = t;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (o) throw i;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), j = {}, C = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), x = function() {
    function t(e) {
        h(this, t), this.config = e, this.error = [];
    }
    return C(t, [ {
        key: "pushError",
        value: function(t, e) {
            var n = this, r = this.config, o = r.project, i = r.unionId;
            p().then(function(r) {
                var a = r.pageUrl, s = r.os, u = r.network, c = Object.assign({
                    pageUrl: a,
                    os: s,
                    network: u,
                    timestamp: Date.now(),
                    project: o,
                    unionId: i
                }, t);
                n.error.push(c), e && n.report();
            });
        }
    }, {
        key: "onError",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "jsError", n = t.replace("thirdScriptError", "").split(";");
            n = (n = n.length ? n[0] : "").replace(/\t|\n/g, ""), this.pushError({
                content: t,
                category: e,
                sec_category: n,
                level: "error"
            });
        }
    }, {
        key: "report",
        value: function() {
            var t = this;
            if ("dev" !== this.config.env) {
                var e = this;
                e.error.length && p().then(function(r) {
                    n({
                        url: t.config.reportUrl + "/api/log?v=1&" + a(e.config, r),
                        data: "c=" + encodeURIComponent(JSON.stringify(t.error)),
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded;"
                        },
                        success: function() {
                            e.error = [];
                        }
                    });
                });
            }
        }
    } ]), t;
}(), O = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), S = function() {
    function t(e) {
        v(this, t), this.config = e, this.data = "";
    }
    return O(t, [ {
        key: "pushRequest",
        value: function(t) {
            var e = this, n = t.requestbyte, r = void 0 === n ? "" : n, o = t.responsebyte, i = void 0 === o ? "" : o, a = t.statusCode, s = void 0 === a ? "" : a, u = t.resourceUrl, c = void 0 === u ? "" : u, f = t.responsetime, l = void 0 === f ? "" : f, h = t.firstCategory, v = void 0 === h ? "" : h, d = t.secondCategory, g = void 0 === d ? "" : d, w = t.logContent, y = void 0 === w ? "" : w, m = Date.now(), k = this.config, b = k.project, j = k.unionId;
            p().then(function(t) {
                var n = t.network, o = t.os, a = t.pageUrl;
                e.data += "S\t\t\t" + n + "\t\t" + o + "\t" + j + "\n      " + c + "\t" + m + "\t" + r + "\t" + i + "\t" + l + "\t" + b + "\t" + a + "\t" + s + "\t" + v + "\t" + g + "\t" + y + "\n";
            });
        }
    }, {
        key: "report",
        value: function() {
            var t = this.config, e = t.env, r = t.reportUrl;
            if ("dev" !== e) {
                var o = this, i = this.data;
                i && p().then(function(t) {
                    n({
                        url: r + "/api/batch?v=1&" + a(o.config, t),
                        data: {
                            c: i
                        },
                        header: {
                            "content-type": "application/x-www-form-urlencoded;"
                        },
                        method: "POST",
                        success: function() {
                            this.data = "";
                        }
                    });
                });
            }
        }
    } ]), t;
}(), U = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), T = function() {
    function t(e) {
        d(this, t), this.config = e, this.speed = {};
    }
    return U(t, [ {
        key: "pushSpeed",
        value: function(t, e, n) {
            var r = this.speed, o = this.config;
            r[t] || (r[t] = {}, r[t].customspeed = []), p().then(function(i) {
                var a = i;
                a.pageurl = t || a.pageUrl, delete a.pageUrl;
                var s = o.project, u = o.unionId, c = o.wxAppVersion;
                Object.assign(r[t], a, {
                    project: s,
                    timestamp: Date.now(),
                    unionId: u,
                    speed: "0|0|0",
                    wxAppVersion: c
                }), r[t].customspeed[e] = n;
            });
        }
    }, {
        key: "start",
        value: function(t, e) {
            this["start-" + t + "-" + e] = Date.now();
        }
    }, {
        key: "end",
        value: function(t, e) {
            var n = this["start-" + t + "-" + e], r = this["start-app-0"];
            r && (delete this["start-app-0"], this.pushSpeed("app", 0, Date.now() - r)), n && this.pushSpeed(t, e, Date.now() - n);
        }
    }, {
        key: "appLaunch",
        value: function() {
            this.start("app", 0);
        }
    }, {
        key: "pageLoad",
        value: function() {
            this.start(c(), 0);
        }
    }, {
        key: "pageReady",
        value: function() {
            this.end(c(), 0);
        }
    }, {
        key: "report",
        value: function() {
            if ("dev" !== this.config.env) {
                var t = this.speed, r = this.config.reportUrl;
                Object.keys(t).map(function(o) {
                    var i = Object.assign({}, t[o]);
                    i.customspeed = i.customspeed.join("|"), n({
                        url: r + "/api/speed?v=1&" + e(i),
                        header: {
                            "content-type": "application/x-www-form-urlencoded;"
                        },
                        method: "GET",
                        success: function() {
                            delete t[o];
                        }
                    });
                });
            }
        }
    } ]), t;
}(), E = function(t, r) {
    if (t && r && !(Math.random() > .01)) {
        var o = {
            v: 1,
            rate: .01,
            project: t,
            version: "v_0.0.6",
            pageurl: encodeURIComponent("app"),
            count: 1
        }, i = r.reportUrl + "/api/version?" + e(o);
        setTimeout(function() {
            n({
                method: "GET",
                url: i
            });
        }, 1500);
    }
}, I = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), P = void 0, M = void 0, D = void 0, L = function() {
    function t(e, n) {
        g(this, t), this.config = new y(e, n), this.error = P = new x(this.config), this.resource = M = new S(this.config), 
        this.pageSpeed = D = new T(this.config), E("cat-sdk-wxmp", this.config);
    }
    return I(t, [ {
        key: "newMetric",
        value: function() {
            return new k(this.config);
        }
    }, {
        key: "report",
        value: function() {
            this.error.report(), this.resource.report();
        }
    } ]), t;
}();

exports.Owl = L, exports.page = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Page, n = t.onLoad, r = t.onReady;
    t.onLoad = function(t) {
        D.pageLoad(), n && n.call(this, t);
    }, t.imageError = function(t) {
        P.pushError({
            content: t.detail && t.detail.errMsg,
            category: "jsError",
            sec_category: "image error",
            level: "error"
        });
    }, t.onReady = function(t) {
        D.pageReady(), r && r.call(this, t);
    }, e(t);
}, exports.app = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : App, n = t.onLaunch, r = t.onError, o = t.onHide;
    t.onLaunch = function(t) {
        D.appLaunch(), n.call(this, t);
    }, t.onError = function(t) {
        P.onError(t), r && r.call(this, t);
    }, t.onHide = function() {
        P.report(), M.report(), D.report(), o && o.call(this);
    }, e(t);
}, exports.request = function(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : wx.request, r = e.url, o = e.data, i = e.complete, a = e.reportError, s = Date.now();
    e.complete = function(e) {
        var n = e.statusCode, u = e.errMsg, c = void 0 === u ? "request:ok" : u, f = t(JSON.stringify(o || ""), "utf-8"), l = t(JSON.stringify(e || ""), "utf-8"), p = Date.now() - s, h = {};
        if (a && "request:fail" !== c) {
            var v = a(e) || {}, d = v.log, g = void 0 === d ? "" : d, w = v.code, y = void 0 === w ? 200 : w, m = v.name, k = void 0 === m ? "" : m, b = "";
            (g || k) && (b = "ajaxError"), h = {
                statusCode: n + "|" + y,
                logContent: g,
                firstCategory: b,
                secondCategory: k
            };
        }
        M.pushRequest(Object.assign({
            timestamp: s,
            requestbyte: f,
            responsebyte: l,
            statusCode: n,
            resourceUrl: r,
            responsetime: p
        }, h)), i && i.call(this, e);
    }, n(e);
};