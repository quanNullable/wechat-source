var t = require("../constants.js").LOC_FACTOR;

module.exports = function(u) {
    var e = u.longitude, r = u.latitude;
    return {
        longitude: Math.round(e * t),
        latitude: Math.round(r * t)
    };
};