var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o, r, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core"), require("./x64-core"), require("./sha512"), require("./sha384"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./x64-core", "./sha512", "./sha384", "./hmac" ], r) : r(o.CryptoJS);
}(void 0, function(e) {
    return e.HmacSHA384;
});