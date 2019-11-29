var r = require("../npm/promise-polyfill/promise.js");

module.exports = {
    obj: function(n) {
        return function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new r(function(r, o) {
                e.success = r, e.fail = function(r) {
                    r.errMsg && !r.message && (r.message = r.errMsg), console.error(r), o(r);
                }, n(e);
            });
        };
    },
    cb: function(n) {
        return function() {
            for (var e = arguments.length, o = Array(e), s = 0; s < e; s++) o[s] = arguments[s];
            return new r(function(r, e) {
                o.push(function(n, o) {
                    n ? (console.error(n), e(n)) : r(o);
                }), n.apply(void 0, o);
            });
        };
    }
};