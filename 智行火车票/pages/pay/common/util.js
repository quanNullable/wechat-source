var r = {};

r.transNumToFixedArray = function(r, e, t) {
    if (!(r += "")) return "";
    if (!/^\d*\.*\d+$/.test(r)) return r;
    e = e || 2;
    var n = r.split("."), u = "", a = 0;
    n.length > 1 && (a = n[1].length, u = n[1]);
    for (var i = 0; i < e - a; i++) u += "0";
    return n[1] = u, n;
}, r.appendQuery = function(r, e) {
    return (r + "&" + e || "").replace(/[&?]{1,2}/, "?");
}, module.exports = r;