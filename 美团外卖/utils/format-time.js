var n = function(n) {
    return ("00" + n).slice(-2);
}, t = {
    yyyy: function(n) {
        return n.getFullYear();
    },
    MM: function(t) {
        return n(t.getMonth() + 1);
    },
    dd: function(t) {
        return n(t.getDate());
    },
    hh: function(t) {
        return n(t.getHours());
    },
    mm: function(t) {
        return n(t.getMinutes());
    },
    ss: function(t) {
        return n(t.getSeconds());
    }
}, e = /(?:yyyy|MM|dd|hh|mm|ss)/g;

module.exports = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd hh:mm:ss";
    n = n > 1e12 ? n : 1e3 * n;
    var u = new Date(n);
    return r.replace(e, function(n) {
        return t[n](u);
    });
};