module.exports = function(e, r, o, t) {
    for (var u = 65535 & e | 0, i = e >>> 16 & 65535 | 0, n = 0; 0 !== o; ) {
        o -= n = o > 2e3 ? 2e3 : o;
        do {
            i = i + (u = u + r[t++] | 0) | 0;
        } while (--n);
        u %= 65521, i %= 65521;
    }
    return u | i << 16 | 0;
};