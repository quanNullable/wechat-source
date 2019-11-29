var r = require("./random-id.js"), e = 0, t = "";

module.exports = function() {
    var n = Date.now();
    return (!t || e < n - 18e5) && (e = n, t = r()), t;
};