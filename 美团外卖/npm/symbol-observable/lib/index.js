Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e, d = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./ponyfill.js"));

e = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof module ? module : Function("return this")();

var n = (0, d.default)(e);

exports.default = n;