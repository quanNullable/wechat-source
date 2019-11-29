var e = require("./_Symbol.js"), r = require("./_getRawTag.js"), t = require("./_objectToString.js"), i = "[object Null]", o = "[object Undefined]", n = e ? e.toStringTag : void 0;

module.exports = function(e) {
    return null == e ? void 0 === e ? o : i : n && n in Object(e) ? r(e) : t(e);
};