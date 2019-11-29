function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function o(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
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

var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), a = function e(t, o, n) {
    null === t && (t = Function.prototype);
    var c = Object.getOwnPropertyDescriptor(t, o);
    if (void 0 === c) {
        var r = Object.getPrototypeOf(t);
        return null === r ? void 0 : e(r, o, n);
    }
    if ("value" in c) return c.value;
    var a = c.get;
    if (void 0 !== a) return a.call(n);
}, l = (require("../util"), e(require("./mocker"))), i = e(require("./sockettask")), u = function(e) {
    function u() {
        t(this, u);
        var e = o(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this));
        return e.opt.delay = 0, e;
    }
    return n(u, l.default), r(u, [ {
        key: "addRule",
        value: function(e) {
            e.connectSocket || (e.connectSocket = {}), a(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "addRule", this).call(this, e);
        }
    }, {
        key: "_hook",
        value: function() {
            this.origFn || (this.origFn = wx.connectSocket, wx.connectSocket = this._connectSocket.bind(this));
        }
    }, {
        key: "_isMatchedConnectSocket",
        value: function(e, t) {
            return !(t.connectSocket.url && !this.testMatch(t.connectSocket.url, e.url)) && !(t.connectSocket.method && !this.testMatch(t.connectSocket.method));
        }
    }, {
        key: "_connectSocket",
        value: function(e) {
            var t = this, o = !0, n = !1, r = void 0;
            try {
                e: for (var a, l = this.rules[Symbol.iterator](); !(o = (a = l.next()).done); o = !0) {
                    var u = function() {
                        var o = a.value;
                        if (t._isMatchedConnectSocket(e, o)) {
                            var n = new i.default(t, o);
                            return o.connectSocket.success ? (t.applyCallback(wx, e.success, o.connectSocket.success), 
                            o.onOpen && setTimeout(function() {
                                t.applyCallback(n, n._cb.onOpen, o.onOpen.res);
                            }, o.onOpen.delay > 0 ? 1 * o.onOpen.delay : t.opt.delay)) : o.connectSocket.fail && t.applyCallback(wx, e.fail, o.connectSocket.fail), 
                            t.applyCallback(wx, e.complete, o.connectSocket.complete), {
                                v: n
                            };
                        }
                    }();
                    switch (u) {
                      case "break":
                        break e;

                      default:
                        if ("object" === (void 0 === u ? "undefined" : c(u))) return u.v;
                    }
                }
            } catch (e) {
                n = !0, r = e;
            } finally {
                try {
                    !o && l.return && l.return();
                } finally {
                    if (n) throw r;
                }
            }
            return this.origFn.call(wx, e);
        }
    }, {
        key: "_send",
        value: function(e) {
            var t = this, o = e._userOpt, n = !0, c = !1, r = void 0;
            try {
                for (var a, l = e._rule.send[Symbol.iterator](); !(n = (a = l.next()).done) && "break" !== function() {
                    var n = a.value;
                    if (t.testMatch(n.data, o.data)) return setTimeout(function() {
                        n.success ? t.applyCallback(e, o.success, n.success) : n.fail && t.applyCallback(e, o.fail, n.fail), 
                        t.applyCallback(e, o.complete, n.complete), n.after && n.after.call(t, e);
                    }, n.delay > 0 ? 1 * n.delay : t.opt.delay), "break";
                }(); n = !0) ;
            } catch (e) {
                c = !0, r = e;
            } finally {
                try {
                    !n && l.return && l.return();
                } finally {
                    if (c) throw r;
                }
            }
        }
    }, {
        key: "_close",
        value: function(e) {
            var t = this, o = e._userOpt, n = e._rule.close;
            n && setTimeout(function() {
                n.success ? t.applyCallback(e, o.success, n.success) : n.fail && t.applyCallback(e, o.fail, n.fail), 
                t.applyCallback(e, o.complete, n.complete);
            }, n.delay > 0 ? 1 * n.delay : this.opt.delay);
        }
    } ]), u;
}();

exports.default = u;