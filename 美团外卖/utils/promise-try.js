var e = require("../npm/promise-polyfill/promise.js");

module.exports = function(n) {
    return new e(function(e) {
        for (var r = 0, t = function() {
            (r += 1) === n.length && e();
        }, o = n.length - 1; o > -1; --o) n[o].then(t, t);
    });
};