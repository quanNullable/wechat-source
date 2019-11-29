function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./konan.js")), n = require("../../utils/config.js"), a = function() {
    function a() {
        e(this, a);
    }
    return t(a, null, [ {
        key: "getSystemInfo",
        value: function() {
            return wx.getSystemInfoSync();
        }
    }, {
        key: "getPageData",
        value: function(e) {
            var t = {
                requestCode: e,
                feVersion: "0.1.0",
                source: "13"
            };
            return t._token = n.rohr.r(t), new Promise(function(e, r) {
                wx.request({
                    url: n.baseUrl + "/v2/ext_api/page_data",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: t,
                    success: function(t) {
                        var r = t.data.data || {};
                        e({
                            action: r.action,
                            id: r.type,
                            request_code: r.request_code
                        });
                    },
                    fail: function(e) {
                        r(e);
                    }
                });
            });
        }
    }, {
        key: "verfiySlide",
        value: function(e) {
            var t = e.action, a = e.id, o = e.requestCode, i = e.behavior, u = void 0 === i ? null : i, c = e.captchacode, d = void 0 === c ? "" : c, s = {
                id: a,
                request_code: o,
                fingerprint: ""
            };
            return u && (s.behavior = r.default.Kaito(JSON.stringify(u), o)), d && (s.captchacode = d), 
            s._token = n.rohr.r(s), new Promise(function(e, r) {
                wx.request({
                    url: n.baseUrl + "/v2/ext_api/" + t + "/verify?id=" + a,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: s,
                    success: function(t) {
                        var r = t.data, n = r.data, a = r.status, o = r.error;
                        e({
                            status: a,
                            error: o,
                            data: n
                        });
                    },
                    fail: function(e) {
                        r(e);
                    }
                });
            });
        }
    }, {
        key: "verfiyCode",
        value: function(e) {
            var t = e.action, r = e.id, n = e.requestCode, a = e.captchacode;
            return this.verfiySlide({
                action: t,
                id: r,
                requestCode: n,
                captchacode: a
            });
        }
    } ]), a;
}();

exports.default = a;