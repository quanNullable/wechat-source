function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = exports.MueEvent = function() {
    function n(t) {
        e(this, n), this.type = t, this.defaultPrevented = !1, this.timeStamp = Date.now();
    }
    return t(n, [ {
        key: "preventDefault",
        value: function() {
            this.defaultPrevented = !0;
        }
    } ]), n;
}(), i = new (exports.EventCenter = function() {
    function i() {
        e(this, i), this.listener = {};
    }
    return t(i, [ {
        key: "emit",
        value: function(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
            this._emit.apply(this, [ !1, e ].concat(n));
        }
    }, {
        key: "emitSync",
        value: function(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
            this._emit.apply(this, [ !0, e ].concat(n));
        }
    }, {
        key: "_emit",
        value: function(e, t) {
            for (var i = arguments.length, r = Array(i > 2 ? i - 2 : 0), a = 2; a < i; a++) r[a - 2] = arguments[a];
            var o = this;
            if ("CHECK_GAME" != t && "SEND_CHECK_GAME" != t && "SEND_REALTIME_MSG_TO_CTRL" != t && "SEND_REALTIME_MSG" != t && console.log("触发事件", t), 
            this.listener[t]) {
                var l = new n(t), s = function() {
                    for (var e in o.listener[t]) {
                        var n = !0, i = !1, a = void 0;
                        try {
                            for (var s, u = o.listener[t][e][Symbol.iterator](); !(n = (s = u.next()).done); n = !0) {
                                var f = s.value;
                                f.call.apply(f, [ f, l ].concat(r));
                            }
                        } catch (e) {
                            i = !0, a = e;
                        } finally {
                            try {
                                !n && u.return && u.return();
                            } finally {
                                if (i) throw a;
                            }
                        }
                    }
                    o.listener[t].one = [];
                };
                e ? s.call(this) : this._async(s);
            }
        }
    }, {
        key: "on",
        value: function(e, t) {
            this._addListener(e, "on", t);
        }
    }, {
        key: "one",
        value: function(e, t) {
            this._addListener(e, "one", t);
        }
    }, {
        key: "off",
        value: function(e, t) {
            var n = this;
            this.listener[e] && this._async(function() {
                if (t) {
                    var i = t.toString();
                    for (var r in n.listener[e]) for (var a = 0; ;) {
                        if (a >= n.listener[e][r].length) break;
                        i === n.listener[e][r][a].toString() && (n.listener[e][r].splice(a, 1), a--), a++;
                    }
                } else n.listener[e] = {
                    on: [],
                    one: []
                }, delete n.listener[e];
            });
        }
    }, {
        key: "_addListener",
        value: function(e, t, n) {
            this.listener[e] || (this.listener[e] = {
                on: [],
                one: []
            }), this.listener[e][t].push(n);
        }
    }, {
        key: "_async",
        value: function(e) {
            var t = this;
            setTimeout(function() {
                e.call(t);
            }, 0);
        }
    } ]), i;
}())();

exports.default = i;