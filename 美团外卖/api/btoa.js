var e = function(e) {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e);
}, t = "undefined" != typeof top && top.btoa || function(t) {
    for (var r = [], o = 0, a = t.length, s = 0, u = 0; u < a; ++u) {
        switch (3 === (o += 1) && (o = 0), s = t.charCodeAt(u), o) {
          case 1:
            r.push(e(s >> 2 & 63));
            break;

          case 2:
            r.push(e(63 & (t.charCodeAt(u - 1) << 4 | s >> 4)));
            break;

          case 0:
            r.push(e(63 & (t.charCodeAt(u - 1) << 2 | s >> 6)), e(63 & s));
        }
        u === a - 1 && o > 0 && r.push(e(s << (3 - o << 1) & 63));
    }
    if (o) for (;o < 3; ) o += 1, r.push("=");
    return r.join("");
};

module.exports = t;