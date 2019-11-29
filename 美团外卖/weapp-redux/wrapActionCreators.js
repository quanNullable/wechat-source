var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : o(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : o(t);
}, n = function(o, t) {
    return function() {
        return t(o.apply(void 0, arguments));
    };
}, r = function(o, r) {
    if ("function" == typeof o) return n(o, r);
    if ("object" !== (void 0 === o ? "undefined" : t(o)) || null === o) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === o ? "null" : void 0 === o ? "undefined" : t(o)) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
    for (var e = Object.keys(o), i = {}, u = 0; u < e.length; u++) {
        var f = e[u], c = o[f];
        "function" == typeof c && (i[f] = n(c, r));
    }
    return i;
};

module.exports = function(o) {
    return function(t) {
        return r(o, t);
    };
};