function o(o, t) {
    return function() {
        return t(o.apply(void 0, arguments));
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

exports.__esModule = !0, exports.default = function(e, n) {
    if ("function" == typeof e) return o(e, n);
    if ("object" != (void 0 === e ? "undefined" : t(e)) || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : void 0 === e ? "undefined" : t(e)) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
    for (var r = Object.keys(e), i = {}, f = 0; f < r.length; f++) {
        var u = r[f], c = e[u];
        "function" == typeof c && (i[u] = o(c, n));
    }
    return i;
};