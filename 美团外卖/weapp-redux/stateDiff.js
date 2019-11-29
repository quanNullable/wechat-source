var r = Object.prototype.hasOwnProperty;

module.exports = function(t, e) {
    if (t === e) return null;
    for (var l = {}, n = Object.keys(t), o = n.length, u = !1, a = 0; a < o; ++a) {
        var c = n[a], s = t[c];
        r.call(e, c) && s === e[c] || (l[c] = s, u = !0);
    }
    return u ? l : null;
};