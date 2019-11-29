Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = void 0, e = function() {
    return r = (9301 * r + 49297) % 233280, Math.floor(r / 233280 * 100) / 100;
};

exports.setRandomSeed = function(e) {
    r = e;
}, exports.random = function() {
    if (0 === arguments.length) return e();
    if (1 === arguments.length) {
        var r = arguments[0];
        return Math.floor(e() * r);
    }
    var t = arguments[0], o = arguments[1];
    return Math.floor(e() * (o - t)) + t;
};