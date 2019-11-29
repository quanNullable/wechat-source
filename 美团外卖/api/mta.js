function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
        return o;
    }
    return Array.from(t);
}

function e(t) {
    this.url = t, this.method = "POST";
}

function o(t) {
    this._config = Object.assign({
        sampleRate: 100,
        beacon: "https://frep.meituan.net/_.gif",
        autotags: !0,
        useCombo: !0
    }, t || {}), this._beacon = new e(this._config.beacon), this._queue = [], this._app = "593e7f89afa8062a5ca3c5de", 
    this._tags = u(), this.visitorCode = r();
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : n(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : n(t);
}, a = require("../store.js"), r = function() {
    return Math.round(2147483647 * Math.random());
}, s = function() {
    var t = {}, e = {}, o = "", n = "", i = 0;
    try {
        var a = getCurrentPages(), r = a.length, s = a[r - 1];
        o = s.__route__;
        var c = s.__pageLoadTime__, u = void 0 === c ? 0 : c;
        t = s.getReportData(), i = Date.now() - u;
        var l = a[r - 2];
        r > 1 && (n = l.__route__, e = l.getReportData());
    } catch (t) {
        console.error(t);
    }
    return [ i, t, e, o, n ];
}, c = null, u = function() {
    if (c) return c;
    var t = a.getState(), e = t.wx, o = e.system, n = e.windowWidth, i = e.windowHeight, r = e.model, s = e.networkType, u = t.dev.uuid, l = /^(.*)\s((?:\d+\.)+\d+)$/.exec(o), f = "ios" === (l ? l[1] : "").toLowerCase() ? "iphone" : "android", d = o.replace(/\s+/g, "_");
    return c = {
        sr: n + "x" + i,
        vp: n + "x" + i,
        uuid: u,
        ct: f,
        os: d,
        model: r.replace(/\s+/g, "_"),
        networkType: s
    };
}, l = function(t) {
    if (!t) return "";
    var e = [];
    return Object.keys(t).forEach(function(o) {
        var n = t[o];
        n = "object" === (void 0 === n ? "undefined" : i(n)) ? JSON.stringify(n) : n, e.push(encodeURIComponent(o) + "=" + encodeURIComponent(n));
    }), e.join("&");
};

e.MAX_URL_LENGTH = 2083, e.prototype = {
    config: function(t) {
        this.url = t;
    },
    send: function(t) {
        t.version = "0.6.0-beta1", "GET" === this.method && (this.url.indexOf("?") >= 0 ? this.url += "&" + l(t) : this.url += "?" + l(t)), 
        Object.keys(t).forEach(function(e) {
            t[e] = "string" == typeof t[e] ? t[e].replace(/\s+/g, "_") : t[e];
        }), wx.request({
            url: this.url,
            method: this.method,
            data: t
        });
    }
}, o.Plugins = {}, o.addPlugin = function(t, e) {
    "function" != typeof e.data && console.error("cannot add plugin: " + t), o.Plugins[t] = e;
}, o.addPlugin("rootpage", {
    type: "timer",
    data: function() {
        try {
            var t = top.performance;
            if (!t) return null;
            var e = t.timing, o = e.navigationStart, n = e.domainLookupStart, i = e.connectStart, a = e.connectEnd, r = e.fetchStart, s = e.domainLookupEnd, c = e.responseStart, u = e.requestStart, l = e.responseEnd, f = e.loadEventEnd, d = e.loadEventStart, h = e.domComplete, g = e.domLoading;
            return {
                redirect: r - o,
                dns: s - n,
                connect: a - i,
                network: a - o,
                send: c - u,
                receive: l - c,
                backend: l - u,
                render: f - d,
                dom: h - g,
                frontend: f - g,
                load: f - o,
                domReady: e.domContentLoadedEventStart - o,
                interactive: e.domInteractive - o,
                ttf: r - o,
                ttr: u - o,
                ttdns: n - o,
                ttconnect: i - o,
                ttfb: c - o
            };
        } catch (t) {
            return console.log(t), {};
        }
    }
}), o.prototype = {
    push: function() {
        for (var e = Array.prototype.slice, o = 0, n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
        for (var r = i.length, s = 0; s < r; s++) try {
            var c = i[s];
            if ("function" == typeof c) i[s](this); else {
                var u;
                (u = this[(c = e.call(c, 0))[0]]).call.apply(u, [ this ].concat(t(c.slice(1))));
            }
        } catch (e) {
            o += 1;
        }
        return o;
    },
    create: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        this._app = t, this._config = Object.assign(this._config, e), this._config.sampleRate = 5;
    },
    config: function(t, e) {
        if (void 0 !== e) switch (t) {
          case "sampleRate":
            "number" == typeof e && (this._config.sampleRate = e);
            break;

          case "beaconImage":
            this._beacon.config(this._config.beacon = e);
            break;

          case "useCombo":
            "boolean" == typeof e && (this._config.useCombo = e);
            break;

          case "autotags":
            "boolean" == typeof e && (this._config.autotags = e);
        }
    },
    tag: function(t, e) {
        "string" == typeof t && t.length && (void 0 !== e ? this._tags[t] = e : void 0 !== this._tags[t] && delete this._tags[t]);
    },
    send: function(t, e, n, i) {
        if (t) {
            var a = o.Plugins[t];
            a && (e = a.data(), i = a.type);
            var r = {};
            e && (r[t] = e, this._push(i || "timer", r, n));
            var s = this;
            this._timer && (clearTimeout(this._timer), this._timer = null), this._timer = setTimeout(function() {
                s._send.call(s);
            }, 100);
        }
    },
    timing: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        this.send(t, e, o, "timer");
    },
    count: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        this.send(t, e, o, "counter");
    },
    gauge: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        this.send(t, e, o, "gauge");
    },
    _push: function(t, e) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._tags;
        this._queue.push({
            type: t,
            data: e,
            tags: o
        });
    },
    _send: function() {
        if (this._isSampleHit()) {
            var t = this._config.useCombo, e = u(), o = s()[3], n = {
                app: this._app,
                type: "combo",
                url: "https://wx.waimai.meituan.com/wxapp/" + o,
                autotags: this._config.autotags
            };
            if (n = Object.assign(n, e), this._queue.length) if (t) 1 === this._queue.length ? (n = Object.assign(n, this._queue[0]), 
            this._beacon.send(n)) : (n.data = this._queue, this._beacon.send(n)); else for (var i = 0, a = this._queue.length; i < a; i++) n = Object.assign(n, this._queue[i]), 
            this._beacon.send(n);
            this._queue = [];
        }
    },
    _isSampleHit: function() {
        return !0;
    }
}, module.exports = function(t) {
    for (var e = getApp(), n = arguments.length, i = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) i[a - 1] = arguments[a];
    if (e && e.mta && e.mta instanceof o) if (t && e.mta[t]) {
        var r;
        (r = e.mta[t]).call.apply(r, [ e.mta ].concat(i));
    } else console.log("mta function method method not allowed!"); else {
        var s = new o();
        if (e.mta = s, t && s[t]) {
            var c;
            (c = s[t]).call.apply(c, [ s ].concat(i));
        } else console.log("mta function method method not allowed!");
    }
};