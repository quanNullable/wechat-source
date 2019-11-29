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
    for (var n = Object.keys(o), e = [], r = n.length - 1; r > -1; --r) {
        var y = n[r], i = o[y];
        if ("" !== i && void 0 !== i && null !== i) {
            var u = void 0 === i ? "undefined" : t(i);
            i && "object" === u && (i = JSON.stringify(i)), e.push(encodeURIComponent(y) + "=" + encodeURIComponent(i));
        }
    }
    return e.join("&");
};