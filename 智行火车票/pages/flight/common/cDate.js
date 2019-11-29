function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = function() {
    function n(t) {
        e(this, n), this.date = t ? new Date(t) : new Date(), this._DAY1 = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ], 
        this._DAY2 = [ "星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ], this._MAPS = {
            d: function(e, t, n) {
                var r = t.getDate().toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r);
            },
            j: function(e, t, n) {
                return e.replace(new RegExp(n, "mg"), t.getDate());
            },
            N: function(e, t, n) {
                var r = t.getDay();
                return 0 === r && (r = 7), e.replace(new RegExp(n, "mg"), r);
            },
            w: function(e, t, n) {
                var r = t.getDay(), a = this._DAY1[r];
                return e.replace(new RegExp(n, "mg"), a);
            },
            W: function(e, t, n) {
                var r = t.getDay(), a = this._DAY2[r];
                return e.replace(new RegExp(n, "mg"), a);
            },
            m: function(e, t, n) {
                var r = (t.getMonth() + 1).toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r);
            },
            n: function(e, t, n) {
                return e.replace(n, t.getMonth() + 1);
            },
            Y: function(e, t, n) {
                return e.replace(new RegExp(n, "mg"), t.getFullYear());
            },
            y: function(e, t, n) {
                return e.replace(new RegExp(n, "mg"), t.getYear());
            },
            g: function(e, t, n) {
                var r = t.getHours();
                return r >= 12 && (r -= 12), e.replace(new RegExp(n, "mg"), r);
            },
            G: function(e, t, n) {
                return e.replace(new RegExp(n, "mg"), t.getHours());
            },
            h: function(e, t, n) {
                var r = t.getHours();
                return r >= 12 && (r -= 12), (r += "").length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r);
            },
            H: function(e, t, n) {
                var r = t.getHours().toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r);
            },
            i: function(e, t, n) {
                var r = t.getMinutes().toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r);
            },
            s: function(e, t, n) {
                var r = t.getSeconds().toString();
                return r.length < 2 && (r = "0" + r), e.replace(new RegExp(n, "mg"), r);
            },
            I: function(e, t, n) {
                var r = t.getMinutes().toString();
                return e.replace(new RegExp(n, "mg"), r);
            },
            S: function(e, t, n) {
                var r = t.getSeconds().toString();
                return e.replace(new RegExp(n, "mg"), r);
            },
            D: function(e, t, r) {
                var a = n.getServerDate();
                a.setHours(0, 0, 0, 0), (t = new Date(t.valueOf())).setHours(0, 0, 0, 0);
                var u = 864e5, i = "", o = t - a;
                return i = o < u && o > 0 ? "今天" : o < 2 * u && o > u ? "明天" : o < 3 * u && o > 2 * u ? "后天" : (u = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ])[t.getDay()], 
                e.replace(new RegExp(r, "mg"), i);
            }
        };
    }
    return t(n, [ {
        key: "addDay",
        value: function(e) {
            return e = e || 0, this.date.setDate(this.date.getDate() + e), this;
        }
    }, {
        key: "valueOf",
        value: function() {
            return this.date;
        }
    }, {
        key: "getTime",
        value: function() {
            return this.date.valueOf();
        }
    }, {
        key: "format",
        value: function(e) {
            "string" != typeof e && (e = "");
            for (var t in this._MAPS) e = this._MAPS[t].call(this, e, this.date, t);
            return e;
        }
    } ], [ {
        key: "parse",
        value: function(e, t) {
            if (void 0 === e) return new Date();
            if ("string" == typeof e) {
                var r = /^(\d{4})\-?(\d{1,2})\-?(\d{1,2})/i;
                (e = e || "").match(r) && (e = e.replace(r, "$2/$3/$1"));
                var a = Date.parse(e), u = new Date(a || new Date());
                return t ? u : new n(u);
            }
            return "number" == typeof e ? new Date(e) : new Date();
        }
    }, {
        key: "format",
        value: function(e, t) {
            return new n(e).format(t);
        }
    }, {
        key: "weekday",
        value: function(e) {
            return [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ][new Date(e).getDay()];
        }
    }, {
        key: "getServerDate",
        value: function(e) {
            var t = new Date(), n = function(t) {
                return "function" == typeof e ? e(t) : t;
            };
            return function() {
                if ("undefined" == typeof __SERVERDATE__ || !__SERVERDATE__.server) return n(t);
                var e = new Date(__SERVERDATE__.server.valueOf() + (new Date().valueOf() - __SERVERDATE__.local.valueOf()));
                return n(e);
            }();
        }
    } ]), n;
}();

exports.default = n;