function e(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new r(function(e, t) {
            function i(o, u) {
                try {
                    var a = n[o](u), c = a.value;
                } catch (e) {
                    return void t(e);
                }
                if (!a.done) return r.resolve(c).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(c);
            }
            return i("next");
        });
    };
}

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), r = require("../npm/promise-polyfill/promise.js"), t = require("../utils/promise-try.js"), i = require("../store.js"), o = require("./wx.js"), u = o.getNetworkType, a = o.login, c = o.getUserInfo, s = o.getSystemInfo, d = o.onAccelerometerChange, p = o.onCompassChange, l = function() {
    return t([ u(), a().then(function() {
        return c();
    }), s(), d(), p() ]);
}, f = 0;

module.exports = function() {
    var r = e(n.default.mark(function e(r) {
        var t, o, u, a, c, s, d, p, g, w, m, v, y, h, x, _, j, k, q, b, C, N, U, z, H;
        return n.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (!((t = Date.now()) - f > 3e3)) {
                    e.next = 5;
                    break;
                }
                return f = t, e.next = 5, l();

              case 5:
                return o = i.getState(), u = o.wx, a = u.x, c = u.y, s = u.z, d = u.direction, p = u.orig_latitude, 
                g = u.orig_longitude, w = u.speed, m = u.accuracy, v = u.model, y = u.pixelRatio, 
                h = u.windowWidth, x = u.windowHeight, _ = u.language, j = u.version, k = u.nickName, 
                q = u.avatarUrl, b = u.gender, C = u.province, N = u.city, U = u.country, z = u.ua, 
                H = o.user.open_id, e.abrupt("return", {
                    x: a,
                    y: c,
                    z: s,
                    direction: d,
                    latitude: p,
                    longitude: g,
                    speed: w,
                    accuracy: m,
                    model: v,
                    pixelRatio: y,
                    windowWidth: h,
                    windowHeight: x,
                    language: _,
                    version: j,
                    nickName: k,
                    avatarUrl: q,
                    gender: b,
                    province: C,
                    city: N,
                    country: U,
                    open_id: H,
                    app_name: "group",
                    user_type: "wx",
                    openid: H,
                    ua: z,
                    touchPoint: r ? r.touchPoint || "" : ""
                });

              case 7:
              case "end":
                return e.stop();
            }
        }, e, void 0);
    }));
    return function(e) {
        return r.apply(this, arguments);
    };
}();