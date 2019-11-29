exports.__esModule = !0, exports.default = function() {
    for (var r = arguments.length, t = Array(r), e = 0; e < r; e++) t[e] = arguments[e];
    return 0 === t.length ? function(r) {
        return r;
    } : 1 === t.length ? t[0] : t.reduce(function(r, t) {
        return function() {
            return r(t.apply(void 0, arguments));
        };
    });
};