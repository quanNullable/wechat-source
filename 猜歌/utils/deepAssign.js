function r(r) {
    if (null === r || void 0 === r) throw new TypeError("Cannot convert undefined or null to object");
    return Object(r);
}

function t(r, t, l) {
    var c = t[l];
    if (void 0 !== c && null !== c) {
        if (n.call(r, l) && (void 0 === r[l] || null === r[l])) throw new TypeError("Cannot convert undefined or null to object (" + l + ")");
        n.call(r, l) && (0, o.isObject)(c) ? r[l] = e(Object(r[l]), t[l]) : r[l] = c;
    }
}

function e(r, e) {
    if (r === e) return r;
    e = Object(e);
    for (var o in e) n.call(e, o) && t(r, e, o);
    if (Object.getOwnPropertySymbols) for (var c = Object.getOwnPropertySymbols(e), u = 0; u < c.length; u++) l.call(e, c[u]) && t(r, e, c[u]);
    return r;
}

var o = require("../utils/common.js"), n = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable;

module.exports = function(t) {
    t = r(t);
    for (var o = 1; o < arguments.length; o++) e(t, arguments[o]);
    return t;
};