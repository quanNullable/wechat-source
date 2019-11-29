function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
}, n = require("./config.js");

exports.default = function t() {
    e(this, t), this.getPageData = function(e, t) {
        var o = {
            requestCode: e,
            feVersion: n.feVersion[t] || "0.1.0",
            source: n.source
        };
        return o._token = encodeURIComponent(n.rohr.r(o)), new Promise(function(e, t) {
            wx.request({
                method: "POST",
                url: n.baseUrl + "/v2/ext_api/page_data",
                data: o,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(o) {
                    var n = o.data, r = n.status, a = n.data, i = n.error;
                    200 === o.statusCode ? e({
                        status: r,
                        data: a,
                        error: i
                    }) : t(o);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    }, this.sendInfo = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.request_code, r = e.type, a = e.action, i = void 0 === a ? "" : a, u = e.options, s = void 0 === u ? null : u, c = {
            request_code: t
        };
        if (s && "object" === (void 0 === s ? "undefined" : o(s))) for (var d in s) s.hasOwnProperty(d) && (c[d] = s[d]);
        return c._token = encodeURIComponent(n.rohr.r(c)), new Promise(function(e, t) {
            wx.request({
                url: n.baseUrl + "/v2/ext_api/" + i + "/info?id=" + r,
                method: "POST",
                data: c,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(o) {
                    var n = o.data, r = n.status, a = n.data, i = n.error;
                    200 === o.statusCode ? e({
                        status: r,
                        data: a,
                        error: i
                    }) : t("");
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    }, this.verify = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.request_code, r = e.type, a = e.action, i = void 0 === a ? "" : a, u = e.options, s = void 0 === u ? null : u, c = {
            request_code: t
        };
        if (s && "object" === (void 0 === s ? "undefined" : o(s))) for (var d in s) s.hasOwnProperty(d) && (c[d] = s[d]);
        return c._token = encodeURIComponent(n.rohr.r(c)), new Promise(function(e, t) {
            wx.request({
                url: n.baseUrl + "/v2/ext_api/" + i + "/verify?id=" + r,
                method: "POST",
                data: c,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(o) {
                    var n = o.data, r = n.status, a = n.data, i = n.error;
                    200 === o.statusCode ? e({
                        status: r,
                        data: a,
                        error: i
                    }) : t();
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    };
};