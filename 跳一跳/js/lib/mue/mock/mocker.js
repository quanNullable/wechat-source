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
}(), n = require("../util"), r = function() {
    function r() {
        e(this, r), this.opt = {}, this.rules = [], this.origFn = null;
    }
    return t(r, [ {
        key: "config",
        value: function(e) {
            this.opt = e || {};
        }
    }, {
        key: "enable",
        value: function() {
            this.origFn || !!this._hook && this._hook();
        }
    }, {
        key: "addRule",
        value: function(e) {
            this.rules.push(e);
        }
    }, {
        key: "applyCallback",
        value: function(e, t, r) {
            for (var i = arguments.length, a = Array(i > 3 ? i - 3 : 0), o = 3; o < i; o++) a[o - 3] = arguments[o];
            if (e && t) {
                var u = r;
                "[object Function]" === (0, n.getTypeOf)(r) && (u = r()), a || (a = []), "[object Undefined]" !== (0, 
                n.getTypeOf)(u) && a.unshift(u), t.apply(e, a);
            }
        }
    }, {
        key: "testMatch",
        value: function(e, t) {
            var r = (0, n.getTypeOf)(e), i = (0, n.getTypeOf)(t);
            switch (r) {
              case "[object Array]":
                if (r !== i) return !1;
                if (0 === e.length) {
                    if (e.length !== t.length) return !1;
                } else for (var a = 0; a < e.length; a++) if (!this.testMatch(e[a], t[a])) return !1;
                break;

              case "[object Object]":
                if (r !== i) return !1;
                if (0 === Object.keys(e).length) {
                    if (0 !== Object.keys(t).length) return !1;
                } else for (var o in e) if (!this.testMatch(e[o], t[o])) return !1;
                break;

              case "[object String]":
              case "[object Number]":
              case "[object Boolean]":
                if (r !== i) return !1;
                if (e !== t) return !1;
                break;

              case "[object RegExp]":
                if (!e.test(t)) return !1;
                break;

              case "[object Function]":
                if (!1 === e.call(e, t)) return !1;
            }
            return !0;
        }
    } ]), r;
}();

exports.default = r;