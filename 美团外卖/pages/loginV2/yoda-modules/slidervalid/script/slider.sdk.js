function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        var i = [], n = !0, o = !1, s = void 0;
        try {
            for (var a, r = t[Symbol.iterator](); !(n = (a = r.next()).done) && (i.push(a.value), 
            !e || i.length !== e); n = !0) ;
        } catch (t) {
            o = !0, s = t;
        } finally {
            try {
                !n && r.return && r.return();
            } finally {
                if (o) throw s;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./slider.api.js")), o = require("../../utils/config.js"), s = function() {
    function s(e) {
        var i = e.requestCode, o = e.pageData, a = e.success, r = e.fail;
        t(this, s);
        var u = (n.default.getSystemInfo() || {}).windowWidth, c = void 0 === u ? 375 : u, l = c / 375, d = [ 50 * l, 50 * l ], h = [ 270 * l, 52 * l ], f = [ 50 * l, 50 * l ], v = Date.now(), p = h[0] - d[0], m = this;
        Object.assign(m, {
            requestCode: i,
            windowWidth: c,
            zoom: l,
            btn: d,
            initTime: v,
            slideWidth: p,
            isDone: !1,
            zone: h,
            client: f,
            Timestamp: [ v ],
            count: 0,
            timeout: 0,
            points: null,
            trajectory: [],
            pageData: o,
            success: a,
            fail: r
        });
    }
    return i(s, [ {
        key: "sliderTouchStart",
        value: function(t) {
            var e = this;
            e.Timestamp.push(Date.now()), e.count += 1, e.points = [], e.addPoint(t);
        }
    }, {
        key: "sliderTouchMove",
        value: function(t) {
            var e = this.isDone, i = this.slideWidth;
            if (e) return {
                isDone: e,
                deltaX: i,
                slideWidth: i
            };
            var n = this.addPoint(t);
            return this.getPosition(n);
        }
    }, {
        key: "sliderTouchCancel",
        value: function(t) {
            this.slidEnd();
        }
    }, {
        key: "getPoint",
        value: function(t) {
            var e = t.touches[0] || {};
            return [ e.clientX, e.clientY ];
        }
    }, {
        key: "addPoint",
        value: function(t) {
            var i = this.points, n = this.initTime, o = this.getPoint(t), s = e(o, 2), a = s[0], r = s[1];
            return this.points = i || [], this.points.push([ 0, a, r, Date.now() - n ]), [ a, r ];
        }
    }, {
        key: "getPosition",
        value: function(t) {
            var i = e(t, 2), n = i[0], o = (i[1], this.slideWidth), s = e(this.points, 1)[0], a = this.isDone, r = n - s[1];
            return r < 0 && (r = 0), r >= o && (r = o, this.isDone = !0, this.slidEnd()), {
                deltaX: r,
                slideWidth: o,
                isDone: a
            };
        }
    }, {
        key: "slidEnd",
        value: function() {
            var t = this, e = t.trajectory, i = t.points, s = void 0 === i ? [] : i, a = t.Timestamp, r = t.pageData, u = void 0 === r ? {} : r, c = t.requestCode;
            (e = e.slice(-3, e.length)).push({
                point: s,
                vector: {
                    orientation: "h"
                }
            }), t.trajectory = e, t.points = null, a[a.length - 1] - a[0] > 3e3 && (t.timeout += 1), 
            t.setData();
            var l = u.action, d = u.id, h = {
                action: l,
                id: d,
                requestCode: c,
                behavior: t.behavior
            };
            n.default.verfiySlide(h).then(function(e) {
                var i = getApp().$loginPage, n = i.data.sliderInfo, s = e.data, a = e.status, r = e.error;
                if (1 === a) t.success(s); else if (0 === a && 121048 === r.code) {
                    var u = r.request_code;
                    Object.assign(n, {
                        codeImage: o.baseUrl + "/v2/captcha?request_code=" + t.requestCode + "&action=" + l,
                        validStep: "code"
                    }), i.setData({
                        "sdk.requestCode": u
                    });
                } else wx.showToast({
                    title: r.message || "滑块异常",
                    icon: "none",
                    mask: !0,
                    duration: 2e3,
                    complete: function() {
                        t.fail({
                            status: 0,
                            code: r.code,
                            msg: r.message
                        });
                    }
                });
                i.setData({
                    sliderInfo: n
                });
            }).catch(function(e) {
                wx.showToast({
                    title: "滑块验证异常",
                    icon: "none",
                    mask: !0,
                    duration: 2e3,
                    complete: function() {
                        t.fail({
                            status: 0,
                            code: 0,
                            msg: "请求滑块验证异常"
                        });
                    }
                });
            });
        }
    }, {
        key: "setData",
        value: function() {
            var t = this.zone, e = this.client, i = this.Timestamp, n = this.count, o = this.timeout, s = this.trajectory, a = {
                env: {
                    zone: t,
                    client: e,
                    Timestamp: i.slice(0, 2),
                    count: n,
                    timeout: o
                },
                trajectory: s
            };
            this.behavior = a;
        }
    } ]), s;
}();

exports.default = s;