var r = require("../../../utils/image-scale.js"), e = require("../../../constants.js").PAOTUI_KINGKONG_CODE, t = require("../../../utils/version-compare.js"), n = function(r, e) {
    for (var t = [], n = r.length, u = 0; u < Math.min(n, 20); u += e) t.push(r.slice(u, u + e));
    return t;
};

module.exports = function(u, i) {
    if (!u || 0 === u.length) return [];
    u.forEach(function(e) {
        e.url = r(e.url, 88, 0, 100);
    });
    var s = u.filter(function(r) {
        return !(r.code === e && !t(i, "1.9.0"));
    });
    return n(s, 10);
};