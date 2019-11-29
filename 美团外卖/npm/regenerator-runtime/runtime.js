var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(r) {
    function e(t, r, e, n) {
        var i = r && r.prototype instanceof o ? r : o, a = Object.create(i.prototype), c = new p(n || []);
        return a._invoke = f(t, e, c), a;
    }
    function n(t, r, e) {
        try {
            return {
                type: "normal",
                arg: t.call(r, e)
            };
        } catch (t) {
            return {
                type: "throw",
                arg: t
            };
        }
    }
    function o() {}
    function i() {}
    function a() {}
    function c(t) {
        [ "next", "throw", "return" ].forEach(function(r) {
            t[r] = function(t) {
                return this._invoke(r, t);
            };
        });
    }
    function u(r) {
        function e(o, i, a, c) {
            var u = n(r[o], r, i);
            if ("throw" !== u.type) {
                var f = u.arg, h = f.value;
                return h && "object" == (void 0 === h ? "undefined" : t(h)) && g.call(h, "__await") ? Promise.resolve(h.__await).then(function(t) {
                    e("next", t, a, c);
                }, function(t) {
                    e("throw", t, a, c);
                }) : Promise.resolve(h).then(function(t) {
                    f.value = t, a(f);
                }, c);
            }
            c(u.arg);
        }
        var o;
        this._invoke = function(t, r) {
            function n() {
                return new Promise(function(n, o) {
                    e(t, r, n, o);
                });
            }
            return o = o ? o.then(n, n) : n();
        };
    }
    function f(t, r, e) {
        var o = j;
        return function(i, a) {
            if (o === S) throw new Error("Generator is already running");
            if (o === k) {
                if ("throw" === i) throw a;
                return d();
            }
            for (e.method = i, e.arg = a; ;) {
                var c = e.delegate;
                if (c) {
                    var u = h(c, e);
                    if (u) {
                        if (u === G) continue;
                        return u;
                    }
                }
                if ("next" === e.method) e.sent = e._sent = e.arg; else if ("throw" === e.method) {
                    if (o === j) throw o = k, e.arg;
                    e.dispatchException(e.arg);
                } else "return" === e.method && e.abrupt("return", e.arg);
                o = S;
                var f = n(t, r, e);
                if ("normal" === f.type) {
                    if (o = e.done ? k : O, f.arg === G) continue;
                    return {
                        value: f.arg,
                        done: e.done
                    };
                }
                "throw" === f.type && (o = k, e.method = "throw", e.arg = f.arg);
            }
        };
    }
    function h(t, r) {
        var e = t.iterator[r.method];
        if (e === v) {
            if (r.delegate = null, "throw" === r.method) {
                if (t.iterator.return && (r.method = "return", r.arg = v, h(t, r), "throw" === r.method)) return G;
                r.method = "throw", r.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return G;
        }
        var o = n(e, t.iterator, r.arg);
        if ("throw" === o.type) return r.method = "throw", r.arg = o.arg, r.delegate = null, 
        G;
        var i = o.arg;
        return i ? i.done ? (r[t.resultName] = i.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", 
        r.arg = v), r.delegate = null, G) : i : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), 
        r.delegate = null, G);
    }
    function s(t) {
        var r = {
            tryLoc: t[0]
        };
        1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), 
        this.tryEntries.push(r);
    }
    function l(t) {
        var r = t.completion || {};
        r.type = "normal", delete r.arg, t.completion = r;
    }
    function p(t) {
        this.tryEntries = [ {
            tryLoc: "root"
        } ], t.forEach(s, this), this.reset(!0);
    }
    function y(t) {
        if (t) {
            var r = t[L];
            if (r) return r.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
                var e = -1, n = function r() {
                    for (;++e < t.length; ) if (g.call(t, e)) return r.value = t[e], r.done = !1, r;
                    return r.value = v, r.done = !0, r;
                };
                return n.next = n;
            }
        }
        return {
            next: d
        };
    }
    function d() {
        return {
            value: v,
            done: !0
        };
    }
    var v, m = Object.prototype, g = m.hasOwnProperty, w = "function" == typeof Symbol ? Symbol : {}, L = w.iterator || "@@iterator", x = w.asyncIterator || "@@asyncIterator", b = w.toStringTag || "@@toStringTag", E = "object" == ("undefined" == typeof module ? "undefined" : t(module)), _ = r.regeneratorRuntime;
    if (_) E && (module.exports = _); else {
        (_ = r.regeneratorRuntime = E ? module.exports : {}).wrap = e;
        var j = "suspendedStart", O = "suspendedYield", S = "executing", k = "completed", G = {}, N = {};
        N[L] = function() {
            return this;
        };
        var P = Object.getPrototypeOf, F = P && P(P(y([])));
        F && F !== m && g.call(F, L) && (N = F);
        var T = a.prototype = o.prototype = Object.create(N);
        i.prototype = T.constructor = a, a.constructor = i, a[b] = i.displayName = "GeneratorFunction", 
        _.isGeneratorFunction = function(t) {
            var r = "function" == typeof t && t.constructor;
            return !!r && (r === i || "GeneratorFunction" === (r.displayName || r.name));
        }, _.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, a) : (t.__proto__ = a, b in t || (t[b] = "GeneratorFunction")), 
            t.prototype = Object.create(T), t;
        }, _.awrap = function(t) {
            return {
                __await: t
            };
        }, c(u.prototype), u.prototype[x] = function() {
            return this;
        }, _.AsyncIterator = u, _.async = function(t, r, n, o) {
            var i = new u(e(t, r, n, o));
            return _.isGeneratorFunction(r) ? i : i.next().then(function(t) {
                return t.done ? t.value : i.next();
            });
        }, c(T), T[b] = "Generator", T[L] = function() {
            return this;
        }, T.toString = function() {
            return "[object Generator]";
        }, _.keys = function(t) {
            var r = [];
            for (var e in t) r.push(e);
            return r.reverse(), function e() {
                for (;r.length; ) {
                    var n = r.pop();
                    if (n in t) return e.value = n, e.done = !1, e;
                }
                return e.done = !0, e;
            };
        }, _.values = y, p.prototype = {
            constructor: p,
            reset: function(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = v, this.done = !1, this.delegate = null, 
                this.method = "next", this.arg = v, this.tryEntries.forEach(l), !t) for (var r in this) "t" === r.charAt(0) && g.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = v);
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
            },
            dispatchException: function(t) {
                function r(r, n) {
                    return i.type = "throw", i.arg = t, e.next = r, n && (e.method = "next", e.arg = v), 
                    !!n;
                }
                if (this.done) throw t;
                for (var e = this, n = this.tryEntries.length - 1; n >= 0; --n) {
                    var o = this.tryEntries[n], i = o.completion;
                    if ("root" === o.tryLoc) return r("end");
                    if (o.tryLoc <= this.prev) {
                        var a = g.call(o, "catchLoc"), c = g.call(o, "finallyLoc");
                        if (a && c) {
                            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                        } else if (a) {
                            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                        } else {
                            if (!c) throw new Error("try statement without catch or finally");
                            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function(t, r) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var n = this.tryEntries[e];
                    if (n.tryLoc <= this.prev && g.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                        var o = n;
                        break;
                    }
                }
                o && ("break" === t || "continue" === t) && o.tryLoc <= r && r <= o.finallyLoc && (o = null);
                var i = o ? o.completion : {};
                return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o.finallyLoc, 
                G) : this.complete(i);
            },
            complete: function(t, r) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), 
                G;
            },
            finish: function(t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var e = this.tryEntries[r];
                    if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), l(e), G;
                }
            },
            catch: function(t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var e = this.tryEntries[r];
                    if (e.tryLoc === t) {
                        var n = e.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            l(e);
                        }
                        return o;
                    }
                }
                throw new Error("illegal catch attempt");
            },
            delegateYield: function(t, r, e) {
                return this.delegate = {
                    iterator: y(t),
                    resultName: r,
                    nextLoc: e
                }, "next" === this.method && (this.arg = v), G;
            }
        };
    }
}(function() {
    return this;
}() || Function("return this")());