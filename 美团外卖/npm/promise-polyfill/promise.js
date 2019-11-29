var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(n) {
    function t() {}
    function o(e, n) {
        return function() {
            e.apply(n, arguments);
        };
    }
    function i(n) {
        if ("object" != e(this)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof n) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], 
        l(n, this);
    }
    function r(e, n) {
        for (;3 === e._state; ) e = e._value;
        0 !== e._state ? (e._handled = !0, i._immediateFn(function() {
            var t = 1 === e._state ? n.onFulfilled : n.onRejected;
            if (null !== t) {
                var o;
                try {
                    o = t(e._value);
                } catch (e) {
                    return void f(n.promise, e);
                }
                u(n.promise, o);
            } else (1 === e._state ? u : f)(n.promise, e._value);
        })) : e._deferreds.push(n);
    }
    function u(n, t) {
        try {
            if (t === n) throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == (void 0 === t ? "undefined" : e(t)) || "function" == typeof t)) {
                var r = t.then;
                if (t instanceof i) return n._state = 3, n._value = t, void c(n);
                if ("function" == typeof r) return void l(o(r, t), n);
            }
            n._state = 1, n._value = t, c(n);
        } catch (t) {
            f(n, t);
        }
    }
    function f(e, n) {
        e._state = 2, e._value = n, c(e);
    }
    function c(e) {
        2 === e._state && 0 === e._deferreds.length && i._immediateFn(function() {
            e._handled || i._unhandledRejectionFn(e._value);
        });
        for (var n = 0, t = e._deferreds.length; n < t; n++) r(e, e._deferreds[n]);
        e._deferreds = null;
    }
    function s(e, n, t) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, 
        this.promise = t;
    }
    function l(e, n) {
        var t = !1;
        try {
            e(function(e) {
                t || (t = !0, u(n, e));
            }, function(e) {
                t || (t = !0, f(n, e));
            });
        } catch (e) {
            if (t) return;
            t = !0, f(n, e);
        }
    }
    var d = setTimeout;
    i.prototype.catch = function(e) {
        return this.then(null, e);
    }, i.prototype.then = function(e, n) {
        var o = new this.constructor(t);
        return r(this, new s(e, n, o)), o;
    }, i.all = function(n) {
        var t = Array.prototype.slice.call(n);
        return new i(function(n, o) {
            function i(u, f) {
                try {
                    if (f && ("object" == (void 0 === f ? "undefined" : e(f)) || "function" == typeof f)) {
                        var c = f.then;
                        if ("function" == typeof c) return void c.call(f, function(e) {
                            i(u, e);
                        }, o);
                    }
                    t[u] = f, 0 == --r && n(t);
                } catch (e) {
                    o(e);
                }
            }
            if (0 === t.length) return n([]);
            for (var r = t.length, u = 0; u < t.length; u++) i(u, t[u]);
        });
    }, i.resolve = function(n) {
        return n && "object" == (void 0 === n ? "undefined" : e(n)) && n.constructor === i ? n : new i(function(e) {
            e(n);
        });
    }, i.reject = function(e) {
        return new i(function(n, t) {
            t(e);
        });
    }, i.race = function(e) {
        return new i(function(n, t) {
            for (var o = 0, i = e.length; o < i; o++) e[o].then(n, t);
        });
    }, i._immediateFn = "function" == typeof setImmediate && function(e) {
        setImmediate(e);
    } || function(e) {
        d(e, 0);
    }, i._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e);
    }, i._setImmediateFn = function(e) {
        i._immediateFn = e;
    }, i._setUnhandledRejectionFn = function(e) {
        i._unhandledRejectionFn = e;
    }, "undefined" != typeof module && module.exports ? module.exports = i : n.Promise || (n.Promise = i);
}(void 0);