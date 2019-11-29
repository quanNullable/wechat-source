var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(n, t, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = t(require("./core"), require("./x64-core"), require("./sha512")) : "function" == typeof define && define.amd ? define([ "./core", "./x64-core", "./sha512" ], t) : t(n.CryptoJS);
}(void 0, function(e) {
    return function() {
        var n = e, t = n.x64, o = t.Word, i = t.WordArray, r = n.algo, c = r.SHA512, f = r.SHA384 = c.extend({
            _doReset: function() {
                this._hash = new i.init([ new o.init(3418070365, 3238371032), new o.init(1654270250, 914150663), new o.init(2438529370, 812702999), new o.init(355462360, 4144912697), new o.init(1731405415, 4290775857), new o.init(2394180231, 1750603025), new o.init(3675008525, 1694076839), new o.init(1203062813, 3204075428) ]);
            },
            _doFinalize: function() {
                var e = c._doFinalize.call(this);
                return e.sigBytes -= 16, e;
            }
        });
        n.SHA384 = c._createHelper(f), n.HmacSHA384 = c._createHmacHelper(f);
    }(), e.SHA384;
});