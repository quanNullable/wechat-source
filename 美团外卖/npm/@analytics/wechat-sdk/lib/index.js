function t(t, n) {
    return (void 0 === t ? "undefined" : S(t)) === n;
}

function n(n) {
    return t(n, "number");
}

function e() {
    return 65535 * Math.random();
}

function r() {
    return Math.ceil(e()).toString(16);
}

function i() {
    return x.now().toString(16) + "-" + r() + "-" + r();
}

function o(t, n) {
    wx.setStorageSync(D + t, n);
}

function a(t) {
    return wx.getStorageSync(D + t);
}

function u(t) {
    wx.removeStorageSync(D + t);
}

function c() {
    return new Promise(function(t) {
        var n = wx.getSystemInfoSync(), e = "MicroMessengerWXA (" + n.model + "; " + n.system + "; " + n.pixelRatio + "dpr; language/" + n.language + ") " + n.platform + "/" + n.version + " NetType/";
        k.ct = n.platform, k.sc = n.screenWidth + "*" + n.screenHeight, k.ua = e;
        var r = a("wxid"), i = a("wxunionid");
        r && (k.wxid = r), i && (k.wxunionid = i), wx.getNetworkType({
            success: function(n) {
                k.net = n.networkType.toUpperCase(), k.ua = k.ua.replace(/(NetType\/).*/, "$1" + n.networkType.toUpperCase()), 
                t(k);
            },
            fail: function() {
                t(k);
            }
        });
    });
}

function s(t, n) {
    "category" === t && (n = "data_sdk_" + n), "wxid" !== t && "wxunionid" !== t || o(t, n), 
    k[t] = n;
}

function f(t) {
    return t ? t && k[t] : k;
}

function l() {
    var t = [], n = x.now();
    return t.push(n.toString(16)), t.push(r()), t.push(r()), t.push(r()), t.join("-");
}

function d(t, n) {
    if (!W || n == I && n == Z) {
        if (B >= R) return R++, void setTimeout(function() {
            h(t, b, n);
        }, X(R));
        if (n == I) try {
            u(G);
        } catch (t) {}
        R = 0, clearTimeout(L), L = null, Q.length && v(t), W = !1, J = [];
    }
}

function p(t, n, e) {
    if (x.isArray(n) && n.length) {
        var r = f(), i = [ Object.assign({
            evs: n
        }, r) ];
        wx.request({
            method: "POST",
            url: t,
            data: i,
            success: function(n) {
                if (400 > n.statusCode) {
                    if (e == I) try {
                        u(G);
                    } catch (t) {}
                    J = [], R = 0, clearTimeout(L), L = null, Q.length && v(t), W = !1;
                } else d(t, e);
            },
            fail: function() {
                d(t, e);
            },
            complete: function(t) {}
        });
    }
}

function h(t, n, e) {
    n ? (R = 0, p(t, n, e)) : (J = J.concat(Q), Q = [], p(t, J, e));
}

function m(t, n) {
    if (!H) {
        try {
            H = a(G) || [];
        } catch (t) {}
        H && H.length && (J = H, L = !0, h(t, J));
    }
    if (n) {
        if (Q.push(n), n.nm == Z && !W) return J = J.concat(Q), Q = [], W = !0, void h(t, J, n.nm);
        if (n.nm == I) {
            J = J.concat(Q), Q = [], W = !0;
            try {
                o(G, J);
            } catch (t) {}
            return void h(t, J, n.nm);
        }
        L || W || v(t);
    }
}

function v(t) {
    L = setTimeout(function() {
        Q.length && (J = J.concat(Q), Q = [], h(t, J));
    }, E);
}

function y() {
    var t = this;
    c().then(function(t) {}), t._opts = {}, M = i();
}

function g(t) {
    var n = a($);
    n || (n = []), n.length >= z && n.shift(), n.push({
        seq: t.seq,
        category: f().category,
        cid: nt,
        bid: t.val_bid,
        val_lab: t.val_lab || {}
    }), o($, n);
}

function _(t, n, e, r, i) {
    var o = {
        nm: t,
        tm: x.now(),
        nt: N,
        seq: Y++,
        isauto: F,
        req_id: n
    };
    if (o = x.extend(o || {}, rt), rt = {}, nt) o.val_cid = nt; else {
        var u = getCurrentPages();
        u && u.length && (o.val_cid = u[u.length - 1].__route__);
    }
    return e && (o.val_lab = e), et && (o.val_ref = et), r && (o.val_bid = r), T && (o.refer_req_id = T), 
    t == P && i && !0 === i.sf && g(o), (t == q || t == U || t == V) && a($) && (o.s_from = a($)), 
    o;
}

var w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, S = "function" == typeof Symbol && "symbol" == w(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : w(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : w(t);
}, b = void 0, x = {}, O = Object.prototype, j = O.toString, A = O.hasOwnProperty, D = "_lx_sdk_";

x.isStr = function(n) {
    return n && t(n, "string");
}, x.isObj = function(t) {
    return t && "[object Object]" === j.call(t);
}, x.now = function() {
    return new Date() - 0;
}, x.isArray = Array.isArray || function(t) {
    return "[object Array]" === j.call(t);
}, x.isArrayLike = function(t) {
    if (!t) return !1;
    var e = t.length;
    return !!x.isArray(t) || !!(t && n(e) && e >= 0) && (!x.isObj(t) || !(e > 1) || e - 1 in t);
}, x.each = function(t, n, e) {
    if (t) {
        var r, i, o;
        if (x.isArrayLike(t)) for (i = 0, o = t.length; i < o && !1 !== n.call(e, t[i], i, t); i++) ; else for (r in t) if (A.call(t, r) && !1 === n.call(e, t[r], r, t)) break;
    }
}, x.extend = function t(n, e, r) {
    var i, o = !0 === n;
    return o || (r = e, e = n), e && x.isObj(e) || (e = {}), r && x.isObj(r) || (r = {}), 
    x.each(r, function(n, a) {
        o && x.isObj(r[a]) ? (i = e[a] = {}, t(o, i, r[a])) : e[a] = r[a];
    }), e;
};

var k = {
    sdk_ver: "1.4.2",
    ch: "weixin",
    lch: "wx"
};

k.lxcuid = function(t) {
    function n(t, n) {
        var e, r = 0;
        for (e = 0; e < n.length; e++) r |= f[e] << 8 * e;
        return t ^ r;
    }
    var e = a("lxcuid");
    if (e) return e;
    var r, i, u = function() {
        for (var t = 1 * new Date(), n = 0; t === 1 * new Date() && n < 200; ) n++;
        return t.toString(16) + n.toString(16);
    }, c = +(Math.random() + "").slice(2), s = t.ua || "", f = [], l = 0;
    for (r = 0; r < s.length; r++) i = s.charCodeAt(r), f.unshift(255 & i), f.length >= 4 && (l = n(l, f), 
    f = []);
    f.length > 0 && (l = n(l, f)), s = l;
    var d = 0;
    t.sc && (d = t.sc.split("*"), d = +d[0] * +d[1]);
    var p = [ u(), c, s, d, u() ].map(function(t) {
        return t.toString(16);
    }).join("-");
    return o("lxcuid", p), p;
}(k);

var M, T, C, I = "AQ", q = "PV", Z = "PD", P = "MC", U = "BO", V = "BP", N = 3, B = 3, E = 500, L = null, W = !1, G = "lx_send_cache_data", H = b, J = [], Q = [], R = 0, X = function(t) {
    var n = Math;
    return n.ceil(n.min(1e3 * (.5 + n.random()) * n.pow(2, t), 15e3));
}, $ = "lx_cache_sf", z = 500, F = 7, K = Date.now(), Y = 1, tt = Date.now(), nt = b, et = b, rt = {}, it = y.prototype;

it.init = function(t, n) {
    var e = this, r = e._opts;
    r.reportUrl = t;
    var i = n.appnm, o = n.category;
    i || console, o || (n.category = i), n.appnm = i, x.each(n || {}, function(t, n) {
        if (!x.isStr(n) || b === t) return r[n];
        e.set(n, t), r[n] = t;
    });
}, it.setUTM = function(t) {
    if (t) {
        var n = this, e = t || {}, r = e.query || {}, i = e.referrerInfo || {}, o = [ "utm_source", "utm_medium", "utm_term", "utm_content", "utm_campaign" ], a = {};
        if ("clear" === e) return void delete env.utm;
        if (r && x.each(o, function(t) {
            x.isStr(r[t]) && (a[t] = r[t]);
        }), i.extraData) {
            var u = i.extraData;
            if (x.isStr(u)) try {
                u = JSON.parse(u);
            } catch (t) {
                u = {};
            }
            x.each(o, function(t) {
                x.isStr(u[t]) && (a[t] = u[t]);
            });
        }
        x.each(o, function(t) {
            x.isStr(e[t]) && (a[t] = e[t]);
        }), a.utm_source || 1037 != e.scene && 1038 != e.scene || e.referrerInfo && e.referrerInfo.appId && (a.utm_source = e.referrerInfo.appId, 
        a.utm_medium = "otherApp"), Object.keys(a).length > 0 && n.set("utm", a);
    }
}, it.set = function(t, n) {
    s(t, n);
}, it.get = function(t) {
    return f(t);
}, it.start = function(t) {
    var t = x.isObj(t) ? t : b;
    tt = Date.now(), C = i(), M = null, Y = 1, s("msid", l()), u($), nt = b;
    var n = _("AS", C, t);
    n.isauto = 6, this.send(n);
}, it.quit = function(t) {
    var t = x.isObj(t) ? t : {}, n = Date.now() - tt;
    t = x.extend({
        duration: "" + n
    }, t);
    var e = _(I, C, t);
    e.isauto = 6, this.send(e);
}, it.pageView = function(t, n) {
    M || nt ? (!M || nt && nt !== t) && (et = nt, T = M, M = i()) : (et = t, M = i()), 
    nt = t;
    var e = _(q, M, n);
    this.send(e);
}, it.pageDisappear = function(t) {
    var n = _(Z, M, t);
    this.send(n);
}, it.moduleView = function(t, n) {
    var e = _("MV", M, n, t);
    this.send(e);
}, it.systemCheck = function(t, n) {
    var e = _("SC", M, n, t);
    this.send(e);
}, it.moduleClick = function(t, n, e) {
    var r = _(P, M, n, t, e);
    this.send(r);
}, it.moduleEdit = function(t, n) {
    var e = _("ME", M, n, t);
    this.send(e);
}, it.order = function(t, n, e) {
    e = x.extend(e || {}, {
        order_id: n
    });
    var r = _(U, M, e, t);
    this.send(r);
}, it.pay = function(t, n, e) {
    e = x.extend(e || {}, {
        order_id: n
    });
    var r = _(V, M, e, t);
    this.send(r);
}, it.send = function(t) {
    18e5 < Date.now() - K && (s("msid", l()), u($)), K = Date.now();
    var n = this._opts.reportUrl;
    n && m(n, t);
}, it.presetGeolocation = function(t, n) {
    return t && (rt.lng = t), n && (rt.lat = n), this;
}, it.turnOnValidate = function() {
    var t = "", n = parseInt("10000000", 36), e = parseInt("ZZZZZZZZ", 36);
    return t = parseInt(Math.random() * (e - n) + n).toString(36).toUpperCase(), s("_lx_validcode", t), 
    t;
};

var ot = new y();

module.exports = ot;