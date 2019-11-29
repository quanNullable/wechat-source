function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = require("../ext/global.js").cwx || {}, a = function() {}, s = 0, r = {};

n.clientID && n.clientID.length;

var o = {
    _data_: {},
    now: function() {
        return new Date().getTime();
    },
    isNStr: function(t) {
        var e = void 0 === t ? "undefined" : i(t);
        return t && ("number" === e || "string" === e || "boolean" === e);
    },
    isNumeric: function(t) {
        var e = void 0 === t ? "undefined" : i(t);
        return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
    },
    makeSlice: function(t, e) {
        for (var i = [], n = 0; n < t; n++) i[n] = e;
        return i;
    },
    hash: function(t) {
        var e = 1, i = 0;
        if (t) {
            e = 0;
            for (var n = t.length - 1; n >= 0; n--) e = 0 != (i = 266338304 & (e = (e << 6 & 268435455) + (i = t.charCodeAt(n)) + (i << 14))) ? e & i >> 21 : e;
        }
        return e;
    },
    random: function() {
        return ("" + Math.random()).slice(-8);
    },
    uniqueID: function() {
        return o.random() ^ 2147483647 & o.now();
    },
    check_tags: function(t) {
        var e = Object.keys(t), n = e.length;
        if (n > 8) return 8;
        for (var a = 0; a < n; a++) {
            var s = t[e[a]], r = void 0 === s ? "undefined" : i(s);
            if ("string" == typeof s) t[e[a]] = s.substring(0, 300); else if ("number" != r && "boolean" != r) return 110;
        }
        return 1;
    },
    encode: function(t) {
        return encodeURIComponent(t);
    },
    store: function(t, e, n) {
        "object" == (void 0 === e ? "undefined" : i(e)) && (e = JSON.stringify(e));
        try {
            wx.setStorageSync(t, e);
        } catch (t) {}
        n(1);
    },
    getStore: function(t, e) {
        var i = wx.getStorageSync(t);
        return e(i ? JSON.parse(i) : "");
    }
}, u = function() {
    function t() {
        "object" == ("undefined" == typeof wx ? "undefined" : i(wx)) && (wx.getNetworkType({
            success: function(t) {
                s.networkType = t.networkType;
            }
        }), wx.getSystemInfo({
            success: function(t) {
                "getSystemInfo:ok" == t.errMsg && (s.language = t.language, s.version = t.version, 
                s.model = t.model, s.pixelRatio = t.pixelRatio, s.windowWidth = t.windowWidth, s.windowHeight = t.windowHeight, 
                s.system = t.system, s.platform = t.platform, s.ver = t.SDKVersion);
            }
        }));
    }
    function e(t) {
        if (t && t.data) try {
            s.ctripcity = t.data.CityEntities[0].CityName;
        } catch (t) {}
    }
    function a() {
        if ("object" == (void 0 === n ? "undefined" : i(n)) && (s.clientID = n.clientID || "", 
        s.user = n.user, n.mkt && n.mkt.getUnion(function(t) {
            t = t || {}, s.allianceid = t.allianceid, s.alliancesid = t.sid, s.allianceouid = t.ouid, 
            s.sourceid = t.sourceid, s.exmktid = t.exmktid;
        }), n.locate)) {
            var t = n.locate.getCachedGeoPoint(), a = n.locate.getCachedCtripCity();
            a && e(a), t && (s.geo = {
                latitude: t.latitude || 0,
                "longitude ": t.longitude || 0
            });
        }
    }
    var s = {};
    return "object" == (void 0 === n ? "undefined" : i(n)) && (s.clientID = n.clientID || "", 
    s.user = n.user), {
        get: function(t, e) {
            return s[t] || e;
        },
        init: function() {
            t(), a();
        }
    };
}(), d = function() {
    function t() {
        i = !1;
        var n = e.shift();
        (1 == s ? r.request : wx.request)({
            url: "https://m.ctrip.com/framework/ubt/bf.gif?" + n,
            header: {
                "Content-Type": "image/gif"
            },
            dataType: "image",
            complete: function(n) {
                e.length < 1 ? i = !0 : setTimeout(function() {
                    t();
                }, 50);
            }
        });
    }
    var e = [], i = !0;
    return {
        add: function(n, a) {
            return "string" == typeof n && (a ? e.unshift(n) : e.push(n), i && t(), e.length);
        },
        length: function() {
            return e.length;
        }
    };
}(), c = function() {
    function s(e, i, n) {
        t(this, s), this.queue = [], this.ts = o.now(), this.isfirst = n, this.status = {
            newsid: 0,
            newvid: 0,
            ready: 0
        }, this.data = {
            url: "",
            orderid: "",
            abtest: "",
            pid: 0,
            vid: "",
            sid: 0,
            pvid: 0,
            tid: "",
            ppv: 0,
            ppi: 0
        }, this.user = u.get("user", {}), this.callback = "function" == typeof i ? i : a, 
        this.init(e);
    }
    return e(s, [ {
        key: "setOptions",
        value: function(t) {
            "object" == (void 0 === t ? "undefined" : i(t)) && (void 0 !== t.pageId && (this.data.pid = t.pageId, 
            this.status.ready += 1), "string" == typeof t.url && (this.data.url = t.url), "string" != typeof t.orderid && "number" != typeof t.orderid || (this.data.orderid = t.orderid), 
            t.tid && (this.data.tid = t.tid), this.data.isBack = t.isBack ? 1 : 0), this.checkSend();
        }
    }, {
        key: "init",
        value: function(t) {
            var e = this;
            this.setOptions(t);
            var n = function() {
                e.status.ready += 1, e.checkSend();
            };
            o.getStore("CTRIP_UBT_M", function(t) {
                var a = o.now();
                t && "object" == (void 0 === t ? "undefined" : i(t)) ? (a - 1 * t.ts > 18e5 ? (e.status.newsid = 1, 
                t.sid = 1 * t.sid + 1, e.data.ppi = 0, e.data.ppv = 0) : (e.data.ppi = t.pid, e.data.ppv = t.pvid), 
                t.pvid = 1 * t.pvid + 1, t.ts = a) : (t = {
                    vid: a + "." + o.uniqueID().toString(36),
                    sid: 1,
                    pvid: 1,
                    ts: a,
                    create: a
                }, e.status.newvid = 1, e.status.newsid = 1), e.update(t, n);
            });
        }
    }, {
        key: "update",
        value: function(t, e) {
            t.pid = this.data.pid, this.data.vid = t.vid, this.data.sid = t.sid, this.data.pvid = t.pvid, 
            o.store("CTRIP_UBT_M", t, e);
        }
    }, {
        key: "isLogin",
        value: function() {
            return this.user.duid && this.user.isLogin && this.user.isLogin();
        }
    }, {
        key: "isReady",
        value: function() {
            return 10 == this.status.ready;
        }
    }, {
        key: "getCommon",
        value: function() {
            return [ this.data.pid, this.data.vid, this.data.sid, this.data.pvid, this.data.tid, this.getABtest(), "", "3.1.0", "", "", n.appId || "" ];
        }
    }, {
        key: "getABtest",
        value: function() {
            return "";
        }
    }, {
        key: "isSampled",
        value: function(t) {
            if (t >= 100) return !0;
            var e = o.hash(this.data.vid);
            return e && e % 100 > 100 - 1 * t;
        }
    }, {
        key: "makeData",
        value: function() {
            var t = o.makeSlice(36, "");
            return t[0] = 13, t[1] = this.data.ppi, t[2] = this.data.ppv, t[3] = this.data.url, 
            t[4] = u.get("windowWidth", 0), t[5] = u.get("windowHeight", 0), t[7] = u.get("language", "zh_CN"), 
            t[11] = this.getABtest(), t[12] = this.status.newvid, t[13] = this.isLogin(), t[14] = u.get("nickName", ""), 
            t[18] = u.get("allianceid", ""), t[19] = u.get("alliancesid", ""), t[20] = u.get("allianceouid", ""), 
            t[21] = o._data_.orderid || this.data.orderid, t[22] = this.user.duid, t[26] = u.get("clientID", ""), 
            t[28] = JSON.stringify({
                version: u.get("version", ""),
                ver: u.get("ver", ""),
                net: u.get("networkType", "None"),
                platform: u.get("platform", "")
            }), t[29] = "weixin", t[30] = u.get("pixelRatio", 1), t[31] = this.status.newsid, 
            t[32] = JSON.stringify({
                isBack: this.data.isBack,
                system: u.get("system", ""),
                model: u.get("model", ""),
                city: u.get("ctripcity", ""),
                geo: u.get("geo", {}),
                openid: n.cwx_mkt && n.cwx_mkt.openid || "",
                sourceid: u.get("sourceid", ""),
                launch: this.isfirst
            }), t[34] = n.scene || "", t;
        }
    }, {
        key: "checkSend",
        value: function() {
            if (this.status.ready > 1) {
                this.status.ready = 10, u.init(), this.sendData("uinfo", this.makeData(), 99);
                for (var t = 0; t < this.queue.length; t++) this._send_by_http(this.queue[t]);
                "function" == typeof this.callback && this.callback(1);
            }
        }
    }, {
        key: "sendData",
        value: function(t, e, i) {
            var n = {
                dataType: t,
                priority: i || 0,
                d: e
            };
            this.isReady() ? this._send_by_http(n) : this.queue.length < 50 && this.queue.push(n);
        }
    }, {
        key: "_send_by_http",
        value: function(t) {
            var e, i = "";
            switch (t.dataType) {
              case "matrix":
              case "useraction":
                e = [ [ 1, t.dataType ], this.getCommon(), [ t.d ] ], i = "ac=a&d=";
                break;

              default:
                (e = {
                    c: this.getCommon(),
                    d: {}
                }).d[t.dataType] = t.d, i = "ac=g&d=";
            }
            i += n.util.lz77.encodeURIComponent(JSON.stringify(e)) + "&c=1&v=3.1.0", d.add(i, t.priority);
        }
    }, {
        key: "tracklog",
        value: function(t, e, n) {
            var s = 0;
            "object" == (void 0 === t ? "undefined" : i(t)) && (e = t.value || "", n = t.callback || a, 
            t = t.name || ""), o.isNStr(t) && o.isNStr(e) && (this.sendData("t", [ 7, t, e, this.user.duid, u.get("clientID", ""), "weixin" ]), 
            s = 1), "function" == typeof n && n(s);
        }
    }, {
        key: "trackMetric",
        value: function(t) {
            var e = 0;
            if ("object" == (void 0 === t ? "undefined" : i(t))) {
                var n = Object.assign({
                    name: "",
                    tag: {},
                    value: 0,
                    ts: o.now(),
                    callback: a,
                    sample: 100
                }, t);
                this.isSampled(n.sample) && o.isNStr(n.name) && o.isNumeric(n.value) && 1 == (e = o.check_tags(n.tag)) && this.sendData("matrix", {
                    name: n.name,
                    tags: n.tag,
                    value: n.value,
                    ts: n.ts
                }), "function" == typeof n.callback && n.callback(e);
            }
            return e;
        }
    }, {
        key: "trackError",
        value: function(t, e) {
            for (var i = [ "version", "message", "line", "file", "category", "framework", "time", "repeat", "islogin", "name", "column" ], n = [ 7, "", 0, "", "", "", o.now() - this.ts, 1, this.isLogin(), "", 0 ], a = 0, s = i.length; a < s; a++) {
                var r = i[a];
                if (t[r]) {
                    var u = t[r] + "";
                    switch (r) {
                      case "message":
                      case "file":
                        u = u.substring(0, 500);
                        break;

                      case "category":
                      case "framework":
                      case "name":
                        u = u.substring(0, 100);
                        break;

                      case "time":
                      case "column":
                        u = parseInt(u, 10);
                        break;

                      default:
                        u = parseInt(u, 10) || 0;
                    }
                    n[a] = u;
                }
            }
            var d = "";
            t.stack && Array.isArray(t.stack) && (d = t.stack.join("")), d = d.slice(n.join("").length - 2e3), 
            n.push(d), this.sendData("error", n);
        }
    }, {
        key: "send",
        value: function(t, e) {
            if (!t) return this;
            switch (t) {
              case "pv":
                if (this.isReady()) return new s(e);
                this.setOptions(e);
                break;

              case "tracelog":
                this.tracklog(e);
                break;

              case "metric":
                this.trackMetric(e);
                break;

              case "error":
                this.trackError(e);
                break;

              case "useraction":
                this.sendData(t, e);
            }
            return this;
        }
    } ]), s;
}();

c.__data__ = [], c.first_pv = !0, c.instance = !1, module.exports = {
    createPV: function(t, e) {
        if (t = t || {}, e = e || a, c.instance = new c(t, e, c.first_pv), c.first_pv) {
            c.first_pv = !1, u.init();
            for (var i = 0; i < c.__data__.length; i++) c.instance.trackMetric(c.__data__[i]);
            c.__data__ = [], setTimeout(function() {
                var t = {}, e = u.get("exmktid", "");
                if (e) try {
                    e = "string" == typeof e ? JSON.parse(e) : e, t.openid = e.openid || "", t.unionid = e.unionid || "";
                } catch (t) {}
                t.allianceid = u.get("allianceid", ""), t.alliancesid = u.get("alliancesid", ""), 
                t.allianceouid = u.get("allianceouid", ""), t.sdkver = u.get("ver", ""), c.instance.send("metric", {
                    name: "wxxcx_launch",
                    tag: t,
                    value: 1
                });
            }, 300);
        }
        return c.instance;
    },
    ubtMetric: function(t) {
        c.instance ? c.instance.send("metric", t) : c.__data__.push(t);
    },
    set: function(t, e) {
        o._data_[t] = e;
    }
};