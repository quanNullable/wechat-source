var t = require("./_baseGetTag.js"), e = require("./_getPrototype.js"), r = require("./isObjectLike.js"), o = "[object Object]", c = Function.prototype, n = Object.prototype, u = c.toString, i = n.hasOwnProperty, s = u.call(Object);

module.exports = function(c) {
    if (!r(c) || t(c) != o) return !1;
    var n = e(c);
    if (null === n) return !0;
    var a = i.call(n, "constructor") && n.constructor;
    return "function" == typeof a && a instanceof a && u.call(a) == s;
};