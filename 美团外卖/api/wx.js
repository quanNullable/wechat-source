var e = require("../actions/wx.js"), t = require("../store.js"), n = require("../npm/promise-polyfill/promise.js"), o = require("../utils/fix-coords.js"), r = require("../utils/wx.js"), i = require("../utils/object-assign.js"), u = r.getUserInfo, s = r.getSystemInfo, c = r.getNetworkType, a = r.getLocation, g = function(n) {
    return t.dispatch((0, e.set)(n)), n;
}, f = {
    onAccelerometerChange: function() {
        return new n(function(e, t) {
            setTimeout(t, 500), wx.onAccelerometerChange(e);
        });
    },
    onCompassChange: function() {
        return new n(function(e, t) {
            setTimeout(t, 500), wx.onCompassChange(e);
        });
    },
    getUserInfo: u,
    getSystemInfo: s,
    getNetworkType: c
}, l = Object.keys(f).reduce(function(e, t) {
    var n = f[t];
    return e[t] = function(e) {
        return n(e).then(g);
    }, e;
}, {});

l.getLocation = function() {
    return a({
        type: "gcj02"
    }).then(function(e) {
        var t = o(e), n = t.latitude, r = t.longitude, u = i(e, {
            latitude: n,
            longitude: r,
            orig_latitude: e.latitude,
            orig_longitude: e.longitude
        });
        return g(u), u;
    });
}, "undefined" != typeof top && setTimeout(function() {
    try {
        var e = top.navigator.userAgent;
        g({
            ua: e
        });
    } catch (e) {
        console.error(e);
    }
}), module.exports = i({}, r, l);