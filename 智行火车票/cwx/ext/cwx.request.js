function e() {
    return a++;
}

function t(e) {
    return 0 != e.indexOf("/") || 0 == e.indexOf("http") ? (console.log("警告：请使用相对路径 ", e), 
    e) : "https://m.ctrip.com" + e;
}

function r(e) {
    return e || {};
}

var u = require("./global.js").cwx, s = {}, a = 1, n = 4, o = [], c = [];

s.request = function(s) {
    var a = r(s.header);
    s.header = a, s.data || (s.data = {});
    var i = s.data, d = "";
    u.user && u.user.auth && (d = u.user.auth), s.url = t(s.url), s.method = s.method || "POST", 
    s.requestID = e();
    var l = s.complete || function() {}, h = function e(t) {
        for (var r = 0; r < c.length; r++) if (c[r].requestID == e.requestID) {
            c.splice(r, 1);
            break;
        }
        var a = u.getCurrentPage();
        if (a && a.ubtMetric) {
            var n = {
                name: 100371,
                value: +new Date() - e.startTime
            };
            t && t.statusCode && 1 * t.statusCode < 400 ? n.tag = {
                status: "success",
                url: s.url,
                statusCode: "" + (t && t.statusCode || "na")
            } : n.tag = {
                status: "fail",
                url: s.url,
                statusCode: "" + (t && t.statusCode || "na")
            }, a.ubtMetric(n);
        }
        l && l(t), setTimeout(function() {
            if (o.length > 0) {
                var e = o.splice(0, 1)[0];
                c.push(e), wx.request(e);
            }
        }, 0);
    };
    h.startTime = +new Date(), h.requestID = s.requestID, s.complete = h;
    var f = {
        cid: u.clientID,
        ctok: "",
        cver: "",
        lang: "01",
        sid: "",
        syscode: (u.systemCode || "").toString(),
        auth: d,
        sauth: "",
        appId: u.appId || ""
    };
    return i && i.head && Object.keys(i.head).forEach(function(e) {
        f[e] = i.head[e];
    }), i.head = f, c.length >= n ? o.push(s) : (c.push(s), wx.request(s)), s.requestID;
}, s.cancel = function(e) {
    if (e > 0) for (var t = 0; t < o.length; t++) if (o[t].requestID == e) return o.splice(t, 1), 
    1;
    return 0;
}, module.exports = s;