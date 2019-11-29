function e(e) {
    for (var t = e.length; --t >= 0; ) e[t] = 0;
}

function t(e, t, n, _, r) {
    this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = _, 
    this.max_length = r, this.has_stree = e && e.length;
}

function n(e, t) {
    this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
}

function _(e) {
    return e < 256 ? Z[e] : Z[256 + (e >>> 7)];
}

function r(e, t) {
    e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
}

function a(e, t, n) {
    e.bi_valid > M - n ? (e.bi_buf |= t << e.bi_valid & 65535, r(e, e.bi_buf), e.bi_buf = t >> M - e.bi_valid, 
    e.bi_valid += n - M) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
}

function i(e, t, n) {
    a(e, n[2 * t], n[2 * t + 1]);
}

function l(e, t) {
    var n = 0;
    do {
        n |= 1 & e, e >>>= 1, n <<= 1;
    } while (--t > 0);
    return n >>> 1;
}

function d(e) {
    16 === e.bi_valid ? (r(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, 
    e.bi_buf >>= 8, e.bi_valid -= 8);
}

function f(e, t) {
    var n, _, r, a, i, l, d = t.dyn_tree, f = t.max_code, o = t.stat_desc.static_tree, b = t.stat_desc.has_stree, s = t.stat_desc.extra_bits, u = t.stat_desc.extra_base, c = t.stat_desc.max_length, p = 0;
    for (a = 0; a <= L; a++) e.bl_count[a] = 0;
    for (d[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < K; n++) (a = d[2 * d[2 * (_ = e.heap[n]) + 1] + 1] + 1) > c && (a = c, 
    p++), d[2 * _ + 1] = a, _ > f || (e.bl_count[a]++, i = 0, _ >= u && (i = s[_ - u]), 
    l = d[2 * _], e.opt_len += l * (a + i), b && (e.static_len += l * (o[2 * _ + 1] + i)));
    if (0 !== p) {
        do {
            for (a = c - 1; 0 === e.bl_count[a]; ) a--;
            e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[c]--, p -= 2;
        } while (p > 0);
        for (a = c; 0 !== a; a--) for (_ = e.bl_count[a]; 0 !== _; ) (r = e.heap[--n]) > f || (d[2 * r + 1] !== a && (e.opt_len += (a - d[2 * r + 1]) * d[2 * r], 
        d[2 * r + 1] = a), _--);
    }
}

function o(e, t, n) {
    var _, r, a = new Array(L + 1), i = 0;
    for (_ = 1; _ <= L; _++) a[_] = i = i + n[_ - 1] << 1;
    for (r = 0; r <= t; r++) {
        var d = e[2 * r + 1];
        0 !== d && (e[2 * r] = l(a[d]++, d));
    }
}

function b() {
    var e, n, _, r, a, i = new Array(L + 1);
    for (_ = 0, r = 0; r < F - 1; r++) for (ee[r] = _, e = 0; e < 1 << T[r]; e++) $[_++] = r;
    for ($[_ - 1] = r, a = 0, r = 0; r < 16; r++) for (te[r] = a, e = 0; e < 1 << U[r]; e++) Z[a++] = r;
    for (a >>= 7; r < I; r++) for (te[r] = a << 7, e = 0; e < 1 << U[r] - 7; e++) Z[256 + a++] = r;
    for (n = 0; n <= L; n++) i[n] = 0;
    for (e = 0; e <= 143; ) X[2 * e + 1] = 8, e++, i[8]++;
    for (;e <= 255; ) X[2 * e + 1] = 9, e++, i[9]++;
    for (;e <= 279; ) X[2 * e + 1] = 7, e++, i[7]++;
    for (;e <= 287; ) X[2 * e + 1] = 8, e++, i[8]++;
    for (o(X, H + 1, i), e = 0; e < I; e++) Y[2 * e + 1] = 5, Y[2 * e] = l(e, 5);
    ne = new t(X, T, G + 1, H, L), _e = new t(Y, U, 0, I, L), re = new t(new Array(0), V, 0, J, N);
}

function s(e) {
    var t;
    for (t = 0; t < H; t++) e.dyn_ltree[2 * t] = 0;
    for (t = 0; t < I; t++) e.dyn_dtree[2 * t] = 0;
    for (t = 0; t < J; t++) e.bl_tree[2 * t] = 0;
    e.dyn_ltree[2 * O] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
}

function u(e) {
    e.bi_valid > 8 ? r(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), 
    e.bi_buf = 0, e.bi_valid = 0;
}

function c(e, t, n, _) {
    u(e), _ && (r(e, n), r(e, ~n)), j.arraySet(e.pending_buf, e.window, t, n, e.pending), 
    e.pending += n;
}

function p(e, t, n, _) {
    var r = 2 * t, a = 2 * n;
    return e[r] < e[a] || e[r] === e[a] && _[t] <= _[n];
}

function h(e, t, n) {
    for (var _ = e.heap[n], r = n << 1; r <= e.heap_len && (r < e.heap_len && p(t, e.heap[r + 1], e.heap[r], e.depth) && r++, 
    !p(t, _, e.heap[r], e.depth)); ) e.heap[n] = e.heap[r], n = r, r <<= 1;
    e.heap[n] = _;
}

function v(e, t, n) {
    var r, l, d, f, o = 0;
    if (0 !== e.last_lit) do {
        r = e.pending_buf[e.d_buf + 2 * o] << 8 | e.pending_buf[e.d_buf + 2 * o + 1], l = e.pending_buf[e.l_buf + o], 
        o++, 0 === r ? i(e, l, t) : (i(e, (d = $[l]) + G + 1, t), 0 !== (f = T[d]) && a(e, l -= ee[d], f), 
        i(e, d = _(--r), n), 0 !== (f = U[d]) && a(e, r -= te[d], f));
    } while (o < e.last_lit);
    i(e, O, t);
}

function y(e, t) {
    var n, _, r, a = t.dyn_tree, i = t.stat_desc.static_tree, l = t.stat_desc.has_stree, d = t.stat_desc.elems, b = -1;
    for (e.heap_len = 0, e.heap_max = K, n = 0; n < d; n++) 0 !== a[2 * n] ? (e.heap[++e.heap_len] = b = n, 
    e.depth[n] = 0) : a[2 * n + 1] = 0;
    for (;e.heap_len < 2; ) a[2 * (r = e.heap[++e.heap_len] = b < 2 ? ++b : 0)] = 1, 
    e.depth[r] = 0, e.opt_len--, l && (e.static_len -= i[2 * r + 1]);
    for (t.max_code = b, n = e.heap_len >> 1; n >= 1; n--) h(e, a, n);
    r = d;
    do {
        n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], h(e, a, 1), _ = e.heap[1], e.heap[--e.heap_max] = n, 
        e.heap[--e.heap_max] = _, a[2 * r] = a[2 * n] + a[2 * _], e.depth[r] = (e.depth[n] >= e.depth[_] ? e.depth[n] : e.depth[_]) + 1, 
        a[2 * n + 1] = a[2 * _ + 1] = r, e.heap[1] = r++, h(e, a, 1);
    } while (e.heap_len >= 2);
    e.heap[--e.heap_max] = e.heap[1], f(e, t), o(a, b, e.bl_count);
}

function x(e, t, n) {
    var _, r, a = -1, i = t[1], l = 0, d = 7, f = 4;
    for (0 === i && (d = 138, f = 3), t[2 * (n + 1) + 1] = 65535, _ = 0; _ <= n; _++) r = i, 
    i = t[2 * (_ + 1) + 1], ++l < d && r === i || (l < f ? e.bl_tree[2 * r] += l : 0 !== r ? (r !== a && e.bl_tree[2 * r]++, 
    e.bl_tree[2 * P]++) : l <= 10 ? e.bl_tree[2 * Q]++ : e.bl_tree[2 * R]++, l = 0, 
    a = r, 0 === i ? (d = 138, f = 3) : r === i ? (d = 6, f = 3) : (d = 7, f = 4));
}

function g(e, t, n) {
    var _, r, l = -1, d = t[1], f = 0, o = 7, b = 4;
    for (0 === d && (o = 138, b = 3), _ = 0; _ <= n; _++) if (r = d, d = t[2 * (_ + 1) + 1], 
    !(++f < o && r === d)) {
        if (f < b) do {
            i(e, r, e.bl_tree);
        } while (0 != --f); else 0 !== r ? (r !== l && (i(e, r, e.bl_tree), f--), i(e, P, e.bl_tree), 
        a(e, f - 3, 2)) : f <= 10 ? (i(e, Q, e.bl_tree), a(e, f - 3, 3)) : (i(e, R, e.bl_tree), 
        a(e, f - 11, 7));
        f = 0, l = r, 0 === d ? (o = 138, b = 3) : r === d ? (o = 6, b = 3) : (o = 7, b = 4);
    }
}

function m(e) {
    var t;
    for (x(e, e.dyn_ltree, e.l_desc.max_code), x(e, e.dyn_dtree, e.d_desc.max_code), 
    y(e, e.bl_desc), t = J - 1; t >= 3 && 0 === e.bl_tree[2 * W[t] + 1]; t--) ;
    return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
}

function w(e, t, n, _) {
    var r;
    for (a(e, t - 257, 5), a(e, n - 1, 5), a(e, _ - 4, 4), r = 0; r < _; r++) a(e, e.bl_tree[2 * W[r] + 1], 3);
    g(e, e.dyn_ltree, t - 1), g(e, e.dyn_dtree, n - 1);
}

function A(e) {
    var t, n = 4093624447;
    for (t = 0; t <= 31; t++, n >>>= 1) if (1 & n && 0 !== e.dyn_ltree[2 * t]) return z;
    if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return S;
    for (t = 32; t < G; t++) if (0 !== e.dyn_ltree[2 * t]) return S;
    return z;
}

function k(e, t, n, _) {
    a(e, (C << 1) + (_ ? 1 : 0), 3), c(e, t, n, !0);
}

var j = require("../utils/common.js"), q = 4, z = 0, S = 1, B = 2, C = 0, D = 1, E = 2, F = 29, G = 256, H = G + 1 + F, I = 30, J = 19, K = 2 * H + 1, L = 15, M = 16, N = 7, O = 256, P = 16, Q = 17, R = 18, T = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 ], U = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ], V = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7 ], W = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ], X = new Array(2 * (H + 2));

e(X);

var Y = new Array(2 * I);

e(Y);

var Z = new Array(512);

e(Z);

var $ = new Array(256);

e($);

var ee = new Array(F);

e(ee);

var te = new Array(I);

e(te);

var ne, _e, re, ae = !1;

exports._tr_init = function(e) {
    ae || (b(), ae = !0), e.l_desc = new n(e.dyn_ltree, ne), e.d_desc = new n(e.dyn_dtree, _e), 
    e.bl_desc = new n(e.bl_tree, re), e.bi_buf = 0, e.bi_valid = 0, s(e);
}, exports._tr_stored_block = k, exports._tr_flush_block = function(e, t, n, _) {
    var r, i, l = 0;
    e.level > 0 ? (e.strm.data_type === B && (e.strm.data_type = A(e)), y(e, e.l_desc), 
    y(e, e.d_desc), l = m(e), r = e.opt_len + 3 + 7 >>> 3, (i = e.static_len + 3 + 7 >>> 3) <= r && (r = i)) : r = i = n + 5, 
    n + 4 <= r && -1 !== t ? k(e, t, n, _) : e.strategy === q || i === r ? (a(e, (D << 1) + (_ ? 1 : 0), 3), 
    v(e, X, Y)) : (a(e, (E << 1) + (_ ? 1 : 0), 3), w(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, l + 1), 
    v(e, e.dyn_ltree, e.dyn_dtree)), s(e), _ && u(e);
}, exports._tr_tally = function(e, t, n) {
    return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, 
    e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, 
    t--, e.dyn_ltree[2 * ($[n] + G + 1)]++, e.dyn_dtree[2 * _(t)]++), e.last_lit === e.lit_bufsize - 1;
}, exports._tr_align = function(e) {
    a(e, D << 1, 3), i(e, O, X), d(e);
};