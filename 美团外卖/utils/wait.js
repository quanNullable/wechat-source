var e = require("../npm/promise-polyfill/promise.js");

module.exports = function(r) {
    return new e(function(e) {
        return setTimeout(e, r);
    });
};