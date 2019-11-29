module.exports = function(t, n) {
    var r = -1, u = null, e = null, l = function() {
        t.apply(u, e);
    };
    return function() {
        for (var t = arguments.length, o = Array(t), i = 0; i < t; i++) o[i] = arguments[i];
        e = o, u = this, clearTimeout(r), r = setTimeout(l, n);
    };
};