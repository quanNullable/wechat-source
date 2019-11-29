function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var r = e[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, i, r) {
        return i && t(e.prototype, i), r && t(e, r), e;
    };
}(), i = new (function() {
    function r() {
        t(this, r), this.performance = wx.getPerformance(), this.frame = 0, this.fps = 0, 
        this.fpsList = [], this.isStarted = !1, this.isSampling = !1, this.maxLogTime = 900;
    }
    return e(r, [ {
        key: "startLook",
        value: function() {
            this.isStarted || (this.preFrameTime = Date.now(), this.frame = 0, this.fps = 0, 
            this.fpsList = [], this.isStarted = !0, window.requestAnimationFrame(this.loop));
        }
    }, {
        key: "stopLook",
        value: function() {
            this.isStarted = !1;
        }
    }, {
        key: "smartStart",
        value: function(t) {
            t || (t = 1), Math.random() <= t && (this.isSampling = !0, this.startLook());
        }
    }, {
        key: "smartStop",
        value: function() {
            if (this.isStarted && this.isSampling) {
                this.stopLook();
                var t = this.getFPS();
                if (t) {
                    t >= 120 ? this.report([ {
                        sid: 22,
                        time: 100 * t
                    } ]) : (this.report([ {
                        sid: 21,
                        time: 100 * t
                    } ]), t <= 30 && this.report([ {
                        sid: 23,
                        time: 100 * t
                    } ]));
                }
            }
        }
    }, {
        key: "getFPS",
        value: function() {
            var t = 0;
            this.fpsList.forEach(function(e) {
                t += e;
            });
            var e = 1 * (t / this.fpsList.length).toFixed(2);
            return console.debug("Avg fps:", e), e;
        }
    }, {
        key: "report",
        value: function(t) {
            var e = {
                pid: 415,
                speeds: []
            }, i = !0, r = !1, s = void 0;
            try {
                for (var o, a = t[Symbol.iterator](); !(i = (o = a.next()).done); i = !0) {
                    var n = o.value;
                    e.speeds.push(n.sid + "_" + n.time);
                }
            } catch (t) {
                r = !0, s = t;
            } finally {
                try {
                    !i && a.return && a.return();
                } finally {
                    if (r) throw s;
                }
            }
            e.speeds = e.speeds.join(";"), wx.request({
                url: "https://badjs.weixinbridge.com/frontend/reportspeed",
                method: "GET",
                data: e
            });
        }
    }, {
        key: "loop",
        value: function() {
            var t = i;
            if (t.isStarted) {
                t.frame++;
                var e = Date.now(), r = e - t.preFrameTime;
                r >= 1e3 && (t.fps = 1 * (t.frame / (r / 1e3)).toFixed(2), t.fpsList.push(t.fps), 
                t.frame = 0, t.preFrameTime = e, t.fpsList.length > t.maxLogTime && t.fpsList.splice(0, 30)), 
                window.requestAnimationFrame(t.loop);
            }
        }
    } ]), r;
}())();

exports.default = i;