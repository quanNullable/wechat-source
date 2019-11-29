var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
}, o = require("../actions/web-view.js"), n = require("../components/webview/const.js"), r = require("../utils/object-assign.js"), i = require("../utils/filter-action.js"), a = function(t) {
    return t && "object" === (void 0 === t ? "undefined" : e(t)) && !Object.keys(t).length;
};

module.exports = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n.defaultState, e = arguments[1];
    switch (e.type) {
      case o.UPDATE_WEB_VIEW:
        var u = i(n.defaultState, e), l = t.loginData, s = void 0 === l ? null : l, c = t.shareConfig, f = void 0 === c ? null : c, y = t.baseData, b = void 0 === y ? {} : y, d = t.webviewUrl, p = void 0 === d ? "" : d;
        return a(u.loginData) && (u.loginData = null), p && u.webviewUrl !== p && t.stack.push({
            loginData: s,
            baseData: b,
            shareConfig: f,
            webviewUrl: p
        }), r({}, t, u);

      case o.CLEAR_WEB_VIEW:
        return r({}, n.defaultState, {
            CONST: t.CONST
        });

      case o.UPDATE_WEB_VIEW_CONST:
        var v = e.wvType, S = t.CONST;
        return Array.isArray(v) ? v.forEach(function(t) {
            S[t] = t;
        }) : "string" == typeof v && (S[v] = v), r({}, n.defaultState, {
            CONST: S
        });

      case o.ROLLBACK_WEB_VIEW:
        if (t.stack.length) {
            var m = t.stack.pop();
            return r({}, t, m);
        }
        return t;

      default:
        return t;
    }
};