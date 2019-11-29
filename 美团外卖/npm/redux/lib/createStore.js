function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, u, c) {
    function f() {
        h === b && (h = b.slice());
    }
    function s() {
        return l;
    }
    function a(e) {
        if ("function" != typeof e) throw new Error("Expected listener to be a function.");
        var t = !0;
        return f(), h.push(e), function() {
            if (t) {
                t = !1, f();
                var o = h.indexOf(e);
                h.splice(o, 1);
            }
        };
    }
    function p(e) {
        if (!(0, n.default)(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
        if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
        if (v) throw new Error("Reducers may not dispatch actions.");
        try {
            v = !0, l = y(l, e);
        } finally {
            v = !1;
        }
        for (var t = b = h, o = 0; o < t.length; o++) (0, t[o])();
        return e;
    }
    var d;
    if ("function" == typeof u && void 0 === c && (c = u, u = void 0), void 0 !== c) {
        if ("function" != typeof c) throw new Error("Expected the enhancer to be a function.");
        return c(t)(e, u);
    }
    if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
    var y = e, l = u, b = [], h = b, v = !1;
    return p({
        type: i.INIT
    }), d = {
        dispatch: p,
        subscribe: a,
        getState: s,
        replaceReducer: function(e) {
            if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
            y = e, p({
                type: i.INIT
            });
        }
    }, d[r.default] = function() {
        var e, t = a;
        return e = {
            subscribe: function(e) {
                function n() {
                    e.next && e.next(s());
                }
                if ("object" != (void 0 === e ? "undefined" : o(e))) throw new TypeError("Expected the observer to be an object.");
                return n(), {
                    unsubscribe: t(n)
                };
            }
        }, e[r.default] = function() {
            return this;
        }, e;
    }, d;
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.__esModule = !0, exports.ActionTypes = void 0, exports.default = t;

var n = e(require("../../lodash/isPlainObject.js")), r = e(require("../../symbol-observable/index.js")), i = exports.ActionTypes = {
    INIT: "@@redux/INIT"
};