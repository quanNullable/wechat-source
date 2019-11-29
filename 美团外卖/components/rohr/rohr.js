var e = require("../../api/rohr.js");

module.exports = function(o) {
    return o.onTouchMove = e.handleTouchMove, o.onTap = e.handleTap, o;
};