var n = require("../api/analytics.js").event, t = {
    BID: "入参有误，格式可为以下两种：\n    1.(val_bid = '埋点val_bid', val_lab = {埋点扩展信息})\n    2.({val_bid, ...val_lab})\n  "
}, e = [ "val_bid" ], r = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if (!n) throw new Error(t);
}, i = function(n) {
    return "[object Object]" === Array.prototype.toString.call(n);
}, l = function(l) {
    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", v = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return "string" == typeof a ? n({
        event_type: l,
        val_bid: a,
        val_lab: v
    }) : (r(i(a), t.BID), v = a, a = v.val_bid, n({
        event_type: l,
        val_bid: a,
        val_lab: JSON.parse(JSON.stringify(v), function(n, t) {
            if (-1 === e.indexOf(n)) return t;
        })
    }));
};

module.exports = {
    lxMge: {
        view: function(n, t) {
            return l("view", n, t);
        },
        click: function(n, t) {
            return l("click", n, t);
        },
        order: function(n, t) {
            return l("order", n, t);
        }
    }
};