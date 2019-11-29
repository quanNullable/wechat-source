var h = {
    winSize: 1024,
    maxMatches: 63,
    minMatches: 3,
    encode: function(e, t) {
        function r(e, t) {
            for (var r = 0, n = 0; n < h.minMatches; n++) r = 131 * r + e[t + n];
            return r;
        }
        t = t || {};
        for (var n = {
            b: [],
            h: [],
            hh: {}
        }, i = [], s = 0; s < e.length; s++) i.push(e.charCodeAt(s));
        for (var a, c, o, f = 0, u = -1, l = []; f < i.length; ) {
            if (f < i.length - h.minMatches + 1) {
                var g = r(i, f);
                if (c = 0, o = 0, n.hh.hasOwnProperty(g)) {
                    for (var p = n.hh[g], s = p, v = f; s < n.b.length && v < i.length && !(n.b[s] != i[v] || v - f >= h.maxMatches); s++, 
                    v++) ;
                    s - p >= o && s - p >= h.minMatches && (o = s - p, c = p);
                }
                if (o) {
                    if (f += o, u = -1, l.push(o), 127 >= (a = n.b.length - (c + o))) l.push(a); else {
                        for (var b = []; a > 0; ) b.push(127 & a), a >>= 7;
                        for (s = b.length - 1; s >= 0; s--) l.push(128 | b[s]);
                        l[l.length - 1] &= 127;
                    }
                    continue;
                }
                !function(e) {
                    if (n.b.push(e), n.b.length > h.winSize && (n.b.shift(), delete n.hh[n.h.shift()]), 
                    n.b.length >= h.minMatches) {
                        var t = n.b.length - h.minMatches;
                        n.hh[n.h[t] = r(n.b, t)] = t;
                    }
                }(i[f]);
            }
            (-1 == u || 255 == l[u]) && (l.push(128), u = l.length - 1), l.push(i[f++]), l[u]++;
        }
        return t.charCodeArray ? l : cwx.util.cc2str(l);
    },
    decode: function(e, t) {
        var r;
        if ((t = t || {}).charCodeArray) r = e; else {
            r = [];
            for (g = 0; g < e.length; g++) r.push(e.charCodeAt(g));
        }
        for (var n, i, s = [], a = 0, c = 0, o = 0, f = [], u = 0; u < r.length; u++) if (128 & (n = r[u])) for (var l = 127 & n, g = 0; l > g; g++) i = r[++u], 
        s[a++ % h.winSize] = i, f.push(i); else {
            var p, v = 0;
            do {
                v = v << 7 | 127 & (p = r[++u]);
            } while (128 & p);
            for (c = a - n - v, o = a - v; o > c; ) f.push(s[c++ % h.winSize]);
        }
        return cwx.util.cc2str(f);
    }
};

module.exports = h;