var r = require("./find-index.js");

module.exports = function(e, n) {
    var u = r(e, n);
    return -1 === u ? null : e[u];
};