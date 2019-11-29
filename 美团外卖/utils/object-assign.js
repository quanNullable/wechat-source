var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : o(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : o(t);
};

module.exports = function(o) {
    for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), e = 1; e < n; e++) r[e - 1] = arguments[e];
    for (var y = r.length, f = 0; f < y; ++f) {
        var u = r[f];
        if (u && "object" === (void 0 === u ? "undefined" : t(u))) for (var i = Object.keys(u), l = i.length - 1; l > -1; --l) {
            var b = i[l];
            o[b] = u[b];
        }
    }
    return o;
};