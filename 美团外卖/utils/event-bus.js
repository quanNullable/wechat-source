function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var i = n[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(n, t, i) {
        return t && e(n.prototype, t), i && e(n, i), n;
    };
}(), t = require("./find-index.js"), i = function() {
    function i() {
        e(this, i), this.listeners = {}, this.nextListeners = {};
    }
    return n(i, [ {
        key: "ensureCanMutateNextListeners",
        value: function(e) {
            var n = this.listeners[e], t = this.nextListeners, i = t[e];
            if (i && i === n) {
                var r = n.slice();
                t[e] = r;
            }
        }
    }, {
        key: "on",
        value: function(e, n) {
            this.ensureCanMutateNextListeners(e);
            var t = this.nextListeners, i = t[e];
            i || (t[e] = i = []), i.push(n);
        }
    }, {
        key: "off",
        value: function(e, n) {
            this.ensureCanMutateNextListeners(e);
            var i = this.nextListeners, r = i[e];
            if (r) {
                var s = t(r, function(e) {
                    return e === n;
                });
                -1 !== s && (r.splice(s, 1), 0 === r.length && (i[e] = null));
            }
        }
    }, {
        key: "fire",
        value: function(e, n) {
            var t = this.nextListeners[e];
            if (this.listeners[e] = t, t) for (var i = t.length, r = 0; r < i; ++r) (0, t[r])(n);
        }
    } ]), i;
}();

module.exports = i;