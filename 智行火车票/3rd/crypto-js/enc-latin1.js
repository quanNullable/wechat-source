var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

!function(e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : o(exports)) ? module.exports = exports = t(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], t) : t(e.CryptoJS);
}(void 0, function(o) {
    return o.enc.Latin1;
});