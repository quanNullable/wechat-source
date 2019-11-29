function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = (0, u.objKeySort)(e);
    t = (0, f.default)({}, t, {
        timestamp: e.timestamp
    });
    var s = [];
    for (var n in t) s.push((0, u.format)("{0}:{1}", n, t[n]));
    var a = s.join("");
    return p.default.md5(a);
}

function s(e, s) {
    var n = getApp(), a = new Date().getTime(), c = n.globalData.user_id || "";
    return s.data = (0, f.default)({}, s.data, {
        timestamp: a,
        user_id: c
    }), wx.request({
        url: e,
        data: o({}, s.data, {
            sign: t(o({}, s.data, {
                timestamp: a
            }))
        }),
        method: s.method || "get",
        header: s.header,
        success: function(e) {
            console.log("success", e), 500 != e.statusCode ? (0, u.isFunction)(s.success) && s.success(e) : (0, 
            u.isFunction)(s.fail) && s.fail(e);
        },
        fail: function(e) {
            console.log("fail", e), (0, u.isFunction)(s.fail) && s.fail(e);
        },
        complete: function(e) {
            (0, u.isFunction)(s.complete) && s.complete(e);
        }
    });
}

function n(e, t) {
    s(i.default.apiBase + e, t);
}

function a(e, t) {
    s(i.default.ossBase + e, t);
}

function c(e, t) {
    s(i.default.adBase + e, t);
}

var o = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var s = arguments[t];
        for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (e[n] = s[n]);
    }
    return e;
}, i = e(require("../config/urienum.js")), r = (e(require("./cacheHepler.js")), 
require("./memoryHelper.js")), u = require("./common.js"), l = require("../config/globalenum.js"), p = (require("../config/appsetting.js"), 
e(require("../utils/md5.js"))), f = e(require("../utils/deepAssign.js")), d = {
    httpRequest: s,
    caller: function(e, t) {
        return n(e, Object.assign({}, t, {
            header: {
                "content-type": t.contenttype || l.CONTENT_TYPE.JSON,
                Authorization: ""
            },
            success: function(e) {
                (0, u.isFunction)(t.success) && t.success(e.data);
            }
        }));
    },
    post: function(e, t) {
        return d.caller(e, Object.assign({
            method: "POST"
        }, t));
    },
    del: function(e, t) {
        return d.caller(e, Object.assign({
            method: "DELETE"
        }, t));
    },
    put: function(e, t) {
        return d.caller(e, Object.assign({
            method: "PUT"
        }, t));
    },
    html: function(e, t) {
        var s = getApp();
        return request(e, Object.assign({}, t, {
            header: {
                "content-type": "application/text",
                Authorization: s.globalData.authorization
            }
        }));
    },
    adGet: function(e, t) {
        getApp(), new Date().getTime(), (0, r.getMemoryUser)();
        return c(e, Object.assign({}, t, {
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            data: t.data || {},
            success: function(e) {
                if ("string" == typeof e.data) {
                    if ((0, u.isFunction)(t.success)) try {
                        t.success(JSON.parse(e.data));
                    } catch (e) {
                        console.log("JSON.parse error ", e);
                    }
                } else (0, u.isFunction)(t.success) && t.success(e.data);
            }
        }));
    },
    json: function(e, t) {
        var s = getApp();
        return request(e, Object.assign({}, t, {
            header: {
                "content-type": "application/json",
                Authorization: s.globalData.authorization
            },
            hasSuccessed: !1,
            success: function(e) {
                if ("string" == typeof e.data) {
                    if ((0, u.isFunction)(t.success)) try {
                        t.success(JSON.parse(e.data));
                    } catch (e) {
                        console.log("JSON.parse error ", e);
                    }
                } else (0, u.isFunction)(t.success) && t.success(e.data);
            }
        }));
    },
    ossjson: function(e, t) {
        getApp();
        return a(e, Object.assign({}, t, {
            header: {
                "content-type": "application/json"
            },
            hasSuccessed: !1,
            success: function(e) {
                if ("string" == typeof e.data) {
                    if ((0, u.isFunction)(t.success)) try {
                        t.success(JSON.parse(e.data));
                    } catch (e) {
                        console.log("JSON.parse error ", e);
                    }
                } else (0, u.isFunction)(t.success) && t.success(e.data);
            }
        }));
    },
    osshtml: function(e, t) {
        return a(e, Object.assign({}, t, {
            header: {
                "content-type": "text/html"
            }
        }));
    }
};

module.exports = d;