var r = require("./_Symbol.js"), t = Object.prototype, e = t.hasOwnProperty, o = t.toString, a = r ? r.toStringTag : void 0;

module.exports = function(r) {
    var t = e.call(r, a), c = r[a];
    try {
        r[a] = void 0;
        var i = !0;
    } catch (r) {}
    var l = o.call(r);
    return i && (t ? r[a] = c : delete r[a]), l;
};