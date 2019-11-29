function t(t, a) {
    return t.msg = B[a], a;
}

function a(t) {
    return (t << 1) - (t > 4 ? 9 : 0);
}

function e(t) {
    for (var a = t.length; --a >= 0; ) t[a] = 0;
}

function s(t) {
    var a = t.state, e = a.pending;
    e > t.avail_out && (e = t.avail_out), 0 !== e && (z.arraySet(t.output, a.pending_buf, a.pending_out, e, t.next_out), 
    t.next_out += e, a.pending_out += e, t.total_out += e, t.avail_out -= e, a.pending -= e, 
    0 === a.pending && (a.pending_out = 0));
}

function i(t, a) {
    b._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, a), 
    t.block_start = t.strstart, s(t.strm);
}

function r(t, a) {
    t.pending_buf[t.pending++] = a;
}

function n(t, a) {
    t.pending_buf[t.pending++] = a >>> 8 & 255, t.pending_buf[t.pending++] = 255 & a;
}

function h(t, a, e, s) {
    var i = t.avail_in;
    return i > s && (i = s), 0 === i ? 0 : (t.avail_in -= i, z.arraySet(a, t.input, t.next_in, i, e), 
    1 === t.state.wrap ? t.adler = x(t.adler, a, i, e) : 2 === t.state.wrap && (t.adler = y(t.adler, a, i, e)), 
    t.next_in += i, t.total_in += i, i);
}

function l(t, a) {
    var e, s, i = t.max_chain_length, r = t.strstart, n = t.prev_length, h = t.nice_match, l = t.strstart > t.w_size - tt ? t.strstart - (t.w_size - tt) : 0, _ = t.window, d = t.w_mask, o = t.prev, u = t.strstart + $, g = _[r + n - 1], f = _[r + n];
    t.prev_length >= t.good_match && (i >>= 2), h > t.lookahead && (h = t.lookahead);
    do {
        if (e = a, _[e + n] === f && _[e + n - 1] === g && _[e] === _[r] && _[++e] === _[r + 1]) {
            r += 2, e++;
            do {} while (_[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && r < u);
            if (s = $ - (u - r), r = u - $, s > n) {
                if (t.match_start = a, n = s, s >= h) break;
                g = _[r + n - 1], f = _[r + n];
            }
        }
    } while ((a = o[a & d]) > l && 0 != --i);
    return n <= t.lookahead ? n : t.lookahead;
}

function _(t) {
    var a, e, s, i, r, n = t.w_size;
    do {
        if (i = t.window_size - t.lookahead - t.strstart, t.strstart >= n + (n - tt)) {
            z.arraySet(t.window, t.window, n, n, 0), t.match_start -= n, t.strstart -= n, t.block_start -= n, 
            a = e = t.hash_size;
            do {
                s = t.head[--a], t.head[a] = s >= n ? s - n : 0;
            } while (--e);
            a = e = n;
            do {
                s = t.prev[--a], t.prev[a] = s >= n ? s - n : 0;
            } while (--e);
            i += n;
        }
        if (0 === t.strm.avail_in) break;
        if (e = h(t.strm, t.window, t.strstart + t.lookahead, i), t.lookahead += e, t.lookahead + t.insert >= Z) for (r = t.strstart - t.insert, 
        t.ins_h = t.window[r], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[r + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[r + Z - 1]) & t.hash_mask, 
        t.prev[r & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = r, r++, t.insert--, !(t.lookahead + t.insert < Z)); ) ;
    } while (t.lookahead < tt && 0 !== t.strm.avail_in);
}

function d(t, a) {
    for (var e, s; ;) {
        if (t.lookahead < tt) {
            if (_(t), t.lookahead < tt && a === j) return _t;
            if (0 === t.lookahead) break;
        }
        if (e = 0, t.lookahead >= Z && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Z - 1]) & t.hash_mask, 
        e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
        0 !== e && t.strstart - e <= t.w_size - tt && (t.match_length = l(t, e)), t.match_length >= Z) if (s = b._tr_tally(t, t.strstart - t.match_start, t.match_length - Z), 
        t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= Z) {
            t.match_length--;
            do {
                t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Z - 1]) & t.hash_mask, 
                e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
            } while (0 != --t.match_length);
            t.strstart++;
        } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], 
        t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask; else s = b._tr_tally(t, 0, t.window[t.strstart]), 
        t.lookahead--, t.strstart++;
        if (s && (i(t, !1), 0 === t.strm.avail_out)) return _t;
    }
    return t.insert = t.strstart < Z - 1 ? t.strstart : Z - 1, a === I ? (i(t, !0), 
    0 === t.strm.avail_out ? ot : ut) : t.last_lit && (i(t, !1), 0 === t.strm.avail_out) ? _t : dt;
}

function o(t, a) {
    for (var e, s, r; ;) {
        if (t.lookahead < tt) {
            if (_(t), t.lookahead < tt && a === j) return _t;
            if (0 === t.lookahead) break;
        }
        if (e = 0, t.lookahead >= Z && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Z - 1]) & t.hash_mask, 
        e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
        t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = Z - 1, 
        0 !== e && t.prev_length < t.max_lazy_match && t.strstart - e <= t.w_size - tt && (t.match_length = l(t, e), 
        t.match_length <= 5 && (t.strategy === N || t.match_length === Z && t.strstart - t.match_start > 4096) && (t.match_length = Z - 1)), 
        t.prev_length >= Z && t.match_length <= t.prev_length) {
            r = t.strstart + t.lookahead - Z, s = b._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - Z), 
            t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
            do {
                ++t.strstart <= r && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Z - 1]) & t.hash_mask, 
                e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
            } while (0 != --t.prev_length);
            if (t.match_available = 0, t.match_length = Z - 1, t.strstart++, s && (i(t, !1), 
            0 === t.strm.avail_out)) return _t;
        } else if (t.match_available) {
            if ((s = b._tr_tally(t, 0, t.window[t.strstart - 1])) && i(t, !1), t.strstart++, 
            t.lookahead--, 0 === t.strm.avail_out) return _t;
        } else t.match_available = 1, t.strstart++, t.lookahead--;
    }
    return t.match_available && (s = b._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), 
    t.insert = t.strstart < Z - 1 ? t.strstart : Z - 1, a === I ? (i(t, !0), 0 === t.strm.avail_out ? ot : ut) : t.last_lit && (i(t, !1), 
    0 === t.strm.avail_out) ? _t : dt;
}

function u(t, a) {
    for (var e, s, r, n, h = t.window; ;) {
        if (t.lookahead <= $) {
            if (_(t), t.lookahead <= $ && a === j) return _t;
            if (0 === t.lookahead) break;
        }
        if (t.match_length = 0, t.lookahead >= Z && t.strstart > 0 && (r = t.strstart - 1, 
        (s = h[r]) === h[++r] && s === h[++r] && s === h[++r])) {
            n = t.strstart + $;
            do {} while (s === h[++r] && s === h[++r] && s === h[++r] && s === h[++r] && s === h[++r] && s === h[++r] && s === h[++r] && s === h[++r] && r < n);
            t.match_length = $ - (n - r), t.match_length > t.lookahead && (t.match_length = t.lookahead);
        }
        if (t.match_length >= Z ? (e = b._tr_tally(t, 1, t.match_length - Z), t.lookahead -= t.match_length, 
        t.strstart += t.match_length, t.match_length = 0) : (e = b._tr_tally(t, 0, t.window[t.strstart]), 
        t.lookahead--, t.strstart++), e && (i(t, !1), 0 === t.strm.avail_out)) return _t;
    }
    return t.insert = 0, a === I ? (i(t, !0), 0 === t.strm.avail_out ? ot : ut) : t.last_lit && (i(t, !1), 
    0 === t.strm.avail_out) ? _t : dt;
}

function g(t, a) {
    for (var e; ;) {
        if (0 === t.lookahead && (_(t), 0 === t.lookahead)) {
            if (a === j) return _t;
            break;
        }
        if (t.match_length = 0, e = b._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, 
        t.strstart++, e && (i(t, !1), 0 === t.strm.avail_out)) return _t;
    }
    return t.insert = 0, a === I ? (i(t, !0), 0 === t.strm.avail_out ? ot : ut) : t.last_lit && (i(t, !1), 
    0 === t.strm.avail_out) ? _t : dt;
}

function f(t, a, e, s, i) {
    this.good_length = t, this.max_lazy = a, this.nice_length = e, this.max_chain = s, 
    this.func = i;
}

function c(t) {
    t.window_size = 2 * t.w_size, e(t.head), t.max_lazy_match = k[t.level].max_lazy, 
    t.good_match = k[t.level].good_length, t.nice_match = k[t.level].nice_length, t.max_chain_length = k[t.level].max_chain, 
    t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = Z - 1, 
    t.match_available = 0, t.ins_h = 0;
}

function p() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, 
    this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, 
    this.method = O, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, 
    this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, 
    this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, 
    this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, 
    this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, 
    this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, 
    this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new z.Buf16(2 * X), this.dyn_dtree = new z.Buf16(2 * (2 * V + 1)), 
    this.bl_tree = new z.Buf16(2 * (2 * W + 1)), e(this.dyn_ltree), e(this.dyn_dtree), 
    e(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new z.Buf16(Y + 1), 
    this.heap = new z.Buf16(2 * U + 1), e(this.heap), this.heap_len = 0, this.heap_max = 0, 
    this.depth = new z.Buf16(2 * U + 1), e(this.depth), this.l_buf = 0, this.lit_bufsize = 0, 
    this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, 
    this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}

function m(a) {
    var e;
    return a && a.state ? (a.total_in = a.total_out = 0, a.data_type = M, e = a.state, 
    e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? et : ht, 
    a.adler = 2 === e.wrap ? 0 : 1, e.last_flush = j, b._tr_init(e), C) : t(a, D);
}

function w(t) {
    var a = m(t);
    return a === C && c(t.state), a;
}

function v(a, e, s, i, r, n) {
    if (!a) return D;
    var h = 1;
    if (e === K && (e = 6), i < 0 ? (h = 0, i = -i) : i > 15 && (h = 2, i -= 16), r < 1 || r > P || s !== O || i < 8 || i > 15 || e < 0 || e > 9 || n < 0 || n > J) return t(a, D);
    8 === i && (i = 9);
    var l = new p();
    return a.state = l, l.strm = a, l.wrap = h, l.gzhead = null, l.w_bits = i, l.w_size = 1 << l.w_bits, 
    l.w_mask = l.w_size - 1, l.hash_bits = r + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, 
    l.hash_shift = ~~((l.hash_bits + Z - 1) / Z), l.window = new z.Buf8(2 * l.w_size), 
    l.head = new z.Buf16(l.hash_size), l.prev = new z.Buf16(l.w_size), l.lit_bufsize = 1 << r + 6, 
    l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new z.Buf8(l.pending_buf_size), 
    l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = e, l.strategy = n, 
    l.method = s, w(a);
}

var k, z = require("../utils/common.js"), b = require("./trees.js"), x = require("./adler32.js"), y = require("./crc32.js"), B = require("./messages.js"), j = 0, S = 1, q = 3, I = 4, A = 5, C = 0, R = 1, D = -2, E = -3, H = -5, K = -1, N = 1, F = 2, G = 3, J = 4, L = 0, M = 2, O = 8, P = 9, Q = 15, T = 8, U = 286, V = 30, W = 19, X = 2 * U + 1, Y = 15, Z = 3, $ = 258, tt = $ + Z + 1, at = 32, et = 42, st = 69, it = 73, rt = 91, nt = 103, ht = 113, lt = 666, _t = 1, dt = 2, ot = 3, ut = 4, gt = 3;

k = [ new f(0, 0, 0, 0, function(t, a) {
    var e = 65535;
    for (e > t.pending_buf_size - 5 && (e = t.pending_buf_size - 5); ;) {
        if (t.lookahead <= 1) {
            if (_(t), 0 === t.lookahead && a === j) return _t;
            if (0 === t.lookahead) break;
        }
        t.strstart += t.lookahead, t.lookahead = 0;
        var s = t.block_start + e;
        if ((0 === t.strstart || t.strstart >= s) && (t.lookahead = t.strstart - s, t.strstart = s, 
        i(t, !1), 0 === t.strm.avail_out)) return _t;
        if (t.strstart - t.block_start >= t.w_size - tt && (i(t, !1), 0 === t.strm.avail_out)) return _t;
    }
    return t.insert = 0, a === I ? (i(t, !0), 0 === t.strm.avail_out ? ot : ut) : (t.strstart > t.block_start && (i(t, !1), 
    t.strm.avail_out), _t);
}), new f(4, 4, 8, 4, d), new f(4, 5, 16, 8, d), new f(4, 6, 32, 32, d), new f(4, 4, 16, 16, o), new f(8, 16, 32, 32, o), new f(8, 16, 128, 128, o), new f(8, 32, 128, 256, o), new f(32, 128, 258, 1024, o), new f(32, 258, 258, 4096, o) ], 
exports.deflateInit = function(t, a) {
    return v(t, a, O, Q, T, L);
}, exports.deflateInit2 = v, exports.deflateReset = w, exports.deflateResetKeep = m, 
exports.deflateSetHeader = function(t, a) {
    return t && t.state ? 2 !== t.state.wrap ? D : (t.state.gzhead = a, C) : D;
}, exports.deflate = function(i, h) {
    var l, _, d, o;
    if (!i || !i.state || h > A || h < 0) return i ? t(i, D) : D;
    if (_ = i.state, !i.output || !i.input && 0 !== i.avail_in || _.status === lt && h !== I) return t(i, 0 === i.avail_out ? H : D);
    if (_.strm = i, l = _.last_flush, _.last_flush = h, _.status === et) if (2 === _.wrap) i.adler = 0, 
    r(_, 31), r(_, 139), r(_, 8), _.gzhead ? (r(_, (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)), 
    r(_, 255 & _.gzhead.time), r(_, _.gzhead.time >> 8 & 255), r(_, _.gzhead.time >> 16 & 255), 
    r(_, _.gzhead.time >> 24 & 255), r(_, 9 === _.level ? 2 : _.strategy >= F || _.level < 2 ? 4 : 0), 
    r(_, 255 & _.gzhead.os), _.gzhead.extra && _.gzhead.extra.length && (r(_, 255 & _.gzhead.extra.length), 
    r(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (i.adler = y(i.adler, _.pending_buf, _.pending, 0)), 
    _.gzindex = 0, _.status = st) : (r(_, 0), r(_, 0), r(_, 0), r(_, 0), r(_, 0), r(_, 9 === _.level ? 2 : _.strategy >= F || _.level < 2 ? 4 : 0), 
    r(_, gt), _.status = ht); else {
        var f = O + (_.w_bits - 8 << 4) << 8;
        f |= (_.strategy >= F || _.level < 2 ? 0 : _.level < 6 ? 1 : 6 === _.level ? 2 : 3) << 6, 
        0 !== _.strstart && (f |= at), f += 31 - f % 31, _.status = ht, n(_, f), 0 !== _.strstart && (n(_, i.adler >>> 16), 
        n(_, 65535 & i.adler)), i.adler = 1;
    }
    if (_.status === st) if (_.gzhead.extra) {
        for (d = _.pending; _.gzindex < (65535 & _.gzhead.extra.length) && (_.pending !== _.pending_buf_size || (_.gzhead.hcrc && _.pending > d && (i.adler = y(i.adler, _.pending_buf, _.pending - d, d)), 
        s(i), d = _.pending, _.pending !== _.pending_buf_size)); ) r(_, 255 & _.gzhead.extra[_.gzindex]), 
        _.gzindex++;
        _.gzhead.hcrc && _.pending > d && (i.adler = y(i.adler, _.pending_buf, _.pending - d, d)), 
        _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = it);
    } else _.status = it;
    if (_.status === it) if (_.gzhead.name) {
        d = _.pending;
        do {
            if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > d && (i.adler = y(i.adler, _.pending_buf, _.pending - d, d)), 
            s(i), d = _.pending, _.pending === _.pending_buf_size)) {
                o = 1;
                break;
            }
            o = _.gzindex < _.gzhead.name.length ? 255 & _.gzhead.name.charCodeAt(_.gzindex++) : 0, 
            r(_, o);
        } while (0 !== o);
        _.gzhead.hcrc && _.pending > d && (i.adler = y(i.adler, _.pending_buf, _.pending - d, d)), 
        0 === o && (_.gzindex = 0, _.status = rt);
    } else _.status = rt;
    if (_.status === rt) if (_.gzhead.comment) {
        d = _.pending;
        do {
            if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > d && (i.adler = y(i.adler, _.pending_buf, _.pending - d, d)), 
            s(i), d = _.pending, _.pending === _.pending_buf_size)) {
                o = 1;
                break;
            }
            o = _.gzindex < _.gzhead.comment.length ? 255 & _.gzhead.comment.charCodeAt(_.gzindex++) : 0, 
            r(_, o);
        } while (0 !== o);
        _.gzhead.hcrc && _.pending > d && (i.adler = y(i.adler, _.pending_buf, _.pending - d, d)), 
        0 === o && (_.status = nt);
    } else _.status = nt;
    if (_.status === nt && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && s(i), 
    _.pending + 2 <= _.pending_buf_size && (r(_, 255 & i.adler), r(_, i.adler >> 8 & 255), 
    i.adler = 0, _.status = ht)) : _.status = ht), 0 !== _.pending) {
        if (s(i), 0 === i.avail_out) return _.last_flush = -1, C;
    } else if (0 === i.avail_in && a(h) <= a(l) && h !== I) return t(i, H);
    if (_.status === lt && 0 !== i.avail_in) return t(i, H);
    if (0 !== i.avail_in || 0 !== _.lookahead || h !== j && _.status !== lt) {
        var c = _.strategy === F ? g(_, h) : _.strategy === G ? u(_, h) : k[_.level].func(_, h);
        if (c !== ot && c !== ut || (_.status = lt), c === _t || c === ot) return 0 === i.avail_out && (_.last_flush = -1), 
        C;
        if (c === dt && (h === S ? b._tr_align(_) : h !== A && (b._tr_stored_block(_, 0, 0, !1), 
        h === q && (e(_.head), 0 === _.lookahead && (_.strstart = 0, _.block_start = 0, 
        _.insert = 0))), s(i), 0 === i.avail_out)) return _.last_flush = -1, C;
    }
    return h !== I ? C : _.wrap <= 0 ? R : (2 === _.wrap ? (r(_, 255 & i.adler), r(_, i.adler >> 8 & 255), 
    r(_, i.adler >> 16 & 255), r(_, i.adler >> 24 & 255), r(_, 255 & i.total_in), r(_, i.total_in >> 8 & 255), 
    r(_, i.total_in >> 16 & 255), r(_, i.total_in >> 24 & 255)) : (n(_, i.adler >>> 16), 
    n(_, 65535 & i.adler)), s(i), _.wrap > 0 && (_.wrap = -_.wrap), 0 !== _.pending ? C : R);
}, exports.deflateEnd = function(a) {
    var e;
    return a && a.state ? (e = a.state.status) !== et && e !== st && e !== it && e !== rt && e !== nt && e !== ht && e !== lt ? t(a, D) : (a.state = null, 
    e === ht ? t(a, E) : C) : D;
}, exports.deflateSetDictionary = function(t, a) {
    var s, i, r, n, h, l, d, o, u = a.length;
    if (!t || !t.state) return D;
    if (s = t.state, 2 === (n = s.wrap) || 1 === n && s.status !== et || s.lookahead) return D;
    for (1 === n && (t.adler = x(t.adler, a, u, 0)), s.wrap = 0, u >= s.w_size && (0 === n && (e(s.head), 
    s.strstart = 0, s.block_start = 0, s.insert = 0), o = new z.Buf8(s.w_size), z.arraySet(o, a, u - s.w_size, s.w_size, 0), 
    a = o, u = s.w_size), h = t.avail_in, l = t.next_in, d = t.input, t.avail_in = u, 
    t.next_in = 0, t.input = a, _(s); s.lookahead >= Z; ) {
        i = s.strstart, r = s.lookahead - (Z - 1);
        do {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[i + Z - 1]) & s.hash_mask, s.prev[i & s.w_mask] = s.head[s.ins_h], 
            s.head[s.ins_h] = i, i++;
        } while (--r);
        s.strstart = i, s.lookahead = Z - 1, _(s);
    }
    return s.strstart += s.lookahead, s.block_start = s.strstart, s.insert = s.lookahead, 
    s.lookahead = 0, s.match_length = s.prev_length = Z - 1, s.match_available = 0, 
    t.next_in = l, t.input = d, t.avail_in = h, s.wrap = n, C;
}, exports.deflateInfo = "pako deflate (from Nodeca project)";