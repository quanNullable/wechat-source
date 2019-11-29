var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
};

!function(t, n) {
    "object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (void 0).finger = n();
}(0, function() {
    var t = function(t) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(t);
    }, e = function(t, e) {
        return "string" == typeof t ? t.charCodeAt(e) : t instanceof Uint8Array ? t[e] : 0;
    }, n = "undefined" != typeof top && top.btoa || function(n) {
        for (var o = [], s = 0, c = n.length, i = 0, r = 0; r < c; ++r) 3 === (s += 1) && (s = 0), 
        i = e(n, r), 0 === s ? o.push(t(63 & (e(n, r - 1) << 2 | i >> 6)), t(63 & i)) : 1 === s ? o.push(t(i >> 2 & 63)) : o.push(t(63 & (e(n, r - 1) << 4 | i >> 4))), 
        r === c - 1 && s > 0 && o.push(t(i << (3 - s << 1) & 63));
        if (s) for (;s < 3; ) s += 1, o.push("=");
        return o.join("");
    }, o = {
        app: 0
    }, s = {
        system: {}
    }, c = function() {
        try {
            wx.getSetting && wx.getSetting({
                success: function(t) {
                    t.authSetting && t.authSetting["scope.userLocation"] && function() {
                        try {
                            wx.getLocation({
                                type: "wgs84",
                                success: function(t) {
                                    s.location = t;
                                }
                            });
                        } catch (t) {}
                    }();
                }
            });
        } catch (t) {}
    }, i = function(t) {
        try {
            wx.getSetting ? wx.getSetting({
                success: function(e) {
                    e.authSetting && e.authSetting["scope.userInfo"] ? r(t) : t && t();
                },
                fail: function() {
                    t && t();
                }
            }) : t && t();
        } catch (e) {
            t && t();
        }
    }, r = function(t) {
        wx.getUserInfo({
            success: function(e) {
                var n = {};
                Object.assign(n, e.userInfo), n.nickName = encodeURIComponent(e.userInfo.nickName), 
                s.userInfo = n, t && t();
            },
            fail: function() {
                t && t();
            }
        });
    };
    return function() {
        try {
            wx.getSystemInfo({
                success: function(t) {
                    Object.assign(s.system, t);
                }
            });
        } catch (t) {}
    }(), function() {
        try {
            wx.getNetworkType({
                success: function(t) {
                    s.system.networkType = t.networkType;
                }
            }), wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(t) {
                s.system.networkType = t.networkType;
            });
        } catch (t) {}
    }(), function() {
        try {
            wx.onAccelerometerChange(function(t) {
                s.system.accelerometer || (s.system.accelerometer = []), s.system.accelerometer.length > 20 && s.system.accelerometer.shift(), 
                s.system.accelerometer.push({
                    x: Number(t.x).toFixed(3),
                    y: Number(t.y).toFixed(3),
                    z: Number(t.z).toFixed(3)
                });
            }), wx.onCompassChange(function(t) {
                s.system.compass || (s.system.compass = []), s.system.compass.length > 20 && s.system.compass.shift(), 
                s.system.compass.push(Number(t.direction).toFixed(3));
            });
        } catch (t) {}
    }(), i(), c(), {
        s: function(t) {
            o.app = t;
        },
        g: function(t) {
            s.app = o.app;
            var e = "WX__1_";
            try {
                if (s.location || c(), s.userInfo) {
                    var r = JSON.stringify(s);
                    e += n(r), t && t(e);
                } else i(function() {
                    var o = JSON.stringify(s);
                    e += n(o), t && t(e);
                });
            } catch (n) {
                t && t(e);
            }
        }
    };
});