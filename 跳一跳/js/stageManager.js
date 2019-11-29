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
    function n() {
        e(this, n), this._stages = {}, this._current = null;
    }
    return t(n, [ {
        key: "navigatorTo",
        value: function(e, t) {
            this._current && this._pages[e] ? (this._current.destroyStage(), this._current = this._pages[e], 
            this._current.initStage(t)) : console.warn("StageManager navigator fail");
        }
    }, {
        key: "register",
        value: function(e, t) {
            "function" == typeof t.destroyStage && "function" == typeof t.initStage ? this._stages[e] = t : consoel.warn("StageManager ");
        }
    } ]), n;
}();

exports.default = n;