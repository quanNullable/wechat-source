module.exports = function(r, t) {
    if (!r != !t) return !1;
    if (!r) return !0;
    var e = r.length;
    if (e !== t.length) return !1;
    for (var n = e - 1; n > -1; --n) if (r[n].id !== t[n].id) return !1;
    return !0;
};