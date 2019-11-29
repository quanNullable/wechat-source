var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(n, e) {
    "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) ? module.exports = exports = e(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], e) : e(n.CryptoJS);
}(void 0, function(t) {
    return function() {
        if ("function" == typeof ArrayBuffer) {
            var n = t.lib.WordArray, e = n.init;
            (n.init = function(t) {
                if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), 
                t instanceof Uint8Array) {
                    for (var n = t.byteLength, r = [], o = 0; o < n; o++) r[o >>> 2] |= t[o] << 24 - o % 4 * 8;
                    e.call(this, r, n);
                } else e.apply(this, arguments);
            }).prototype = n;
        }
    }(), t.lib.WordArray;
});