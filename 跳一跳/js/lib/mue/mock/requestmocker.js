function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), o = (require("../util"), function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./mocker"))), a = function(a) {
    function u() {
        e(this, u);
        var r = t(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this));
        return r.opt.delay = 100, r;
    }
    return r(u, o.default), n(u, [ {
        key: "_hook",
        value: function() {
            var e = this;
            this.origFn || (this.origFn = wx.request, wx.request = function(t) {
                if (0 !== e.rules.length) {
                    var r = !1, n = !0, o = !1, a = void 0;
                    try {
                        for (var u, i = e.rules[Symbol.iterator](); !(n = (u = i.next()).done) && "break" !== function() {
                            var n = u.value;
                            if (e._isMatched(t, n)) return setTimeout(function() {
                                n.success ? e.applyCallback(wx, t.success, n.success, n.statusCode || 200, n.header || {}) : n.fail && e.applyCallback(wx, t.fail, n.fail), 
                                e.applyCallback(wx, t.complete, n.complete);
                            }, n.delay > 0 ? 1 * n.delay : e.opt.delay), r = !0, "break";
                        }(); n = !0) ;
                    } catch (e) {
                        o = !0, a = e;
                    } finally {
                        try {
                            !n && i.return && i.return();
                        } finally {
                            if (o) throw a;
                        }
                    }
                    r || e.origFn.call(wx, t);
                }
            });
        }
    }, {
        key: "_isMatched",
        value: function(e, t) {
            return !(t.url && !this.testMatch(t.url, e.url)) && !(t.data && !this.testMatch(t.data, e.data));
        }
    } ]), u;
}();

exports.default = a;