function e(e, t, s) {
    a.request({
        url: "/restapi/soa2/10398/json/LBSLocateCity",
        method: "POST",
        data: {
            Latitude: e,
            Longitude: t,
            Language: "CN"
        },
        success: function(e) {
            (i = e).cachedDate = new Date(), s && s(e);
        },
        fail: function() {
            if (s) {
                var e = {};
                e.error = "Request_Ctrip_City_Failed", s(e);
            }
            console.log("fail for ctrip city");
        }
    });
}

function t(e) {
    if (d) e.fail && e.fail({
        errMsg: "getLocation:fail auth deny"
    }); else if (l) u.push(e); else {
        l = !0;
        var t = e.success, a = e.fail, s = e.complete, r = function(e) {
            for (var t = 0; t < u.length; t++) {
                var a = u[t];
                a && a.success && a.success(e);
            }
        }, o = function(e) {
            for (var t = 0; t < u.length; t++) {
                var a = u[t];
                a && a.fail && a.fail(e);
            }
        }, c = function(e) {
            for (var t = 0; t < u.length; t++) {
                var a = u[t];
                a && a.complete && a.complete(e);
            }
            u.splice(0, u.length);
        };
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                (n = e).cachedDate = new Date(), t && t(e), r(e);
            },
            fail: function(e) {
                console.log("res = ", e), e && "getLocation:fail auth deny" === e.errMsg && (d = !0);
                var t = {};
                t.error = "GET_GEO_FAILED", a && a(t), o(e);
            },
            complete: function(e) {
                l = !1, s && s(e), c(e);
            }
        });
    }
}

var a = require("./global.js").cwx, s = {}, r = 120, o = 600, n = null, c = null, i = null, u = [], l = !1, d = !1;

s.startGetGeoPoint = t, s.startGetAddress = function(e) {
    var s = {};
    t({
        type: "wgs84",
        success: function(t) {
            var r = t.latitude, o = t.longitude;
            t.speed, t.accuracy, s.latitude = r, s.longitude = o;
            var n = {
                Location: r + "," + o,
                pois: 1,
                CoordType: "wgs84ll"
            };
            a.request({
                url: "/restapi/soa2/12378/json/reverseAddress",
                method: "POST",
                data: n,
                success: function(t) {
                    var a = t.data;
                    200 == t.statusCode && a ? a.ResponseStatus && "Success" === a.ResponseStatus.Ack ? (s.address = a.formattedAddress, 
                    s.location = a.location, (c = s).cachedDate = new Date()) : s.error = "Request_Address_Error(" + status + ")" : s.error = "Request_Address_Error(HTTP_" + t.statusCode + ")", 
                    e && e(s);
                },
                fail: function() {
                    s.error = "Request_Address_Failed", e && e(s);
                }
            });
        },
        fail: function() {
            s.error = "Read_GeoPoint_Failed", e && e(s);
        }
    });
}, s.startGetCtripCity = function(a) {
    var s = {};
    t({
        type: "wgs84",
        success: function(t) {
            e(t.latitude, t.longitude, a);
        },
        fail: function() {
            s.error = "Read_GeoPoint_Failed", a && a(s);
        }
    });
}, s.getCachedGeoPoint = function() {
    return n && n.cachedDate && new Date().getTime() / 1e3 - n.cachedDate.getTime() / 1e3 < r ? n : null;
}, s.getCachedAddress = function() {
    return c && c.cachedDate && new Date().getTime() / 1e3 - c.cachedDate.getTime() / 1e3 < r ? c : null;
}, s.getCachedCtripCity = function() {
    return i && i.cachedDate && new Date().getTime() / 1e3 - i.cachedDate.getTime() / 1e3 < o ? i : null;
}, module.exports = s;