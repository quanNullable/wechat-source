var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
};

!function() {
    function t(t) {
        for (var e = t.length; --e >= 0; ) t[e] = 0;
    }
    function a(t, e, a, n, r) {
        this.static_tree = t, this.extra_bits = e, this.extra_base = a, this.elems = n, 
        this.max_length = r, this.has_stree = t && t.length;
    }
    function n(t, e) {
        this.dyn_tree = t, this.max_code = 0, this.stat_desc = e;
    }
    function r(t) {
        return t < 256 ? bt[t] : bt[256 + (t >>> 7)];
    }
    function i(t, e) {
        t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255;
    }
    function s(t, e, a) {
        t.bi_valid > it - a ? (t.bi_buf |= e << t.bi_valid & 65535, i(t, t.bi_buf), t.bi_buf = e >> it - t.bi_valid, 
        t.bi_valid += a - it) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += a);
    }
    function h(t, e, a) {
        s(t, a[2 * e], a[2 * e + 1]);
    }
    function o(t, e) {
        var a = 0;
        do {
            a |= 1 & t, t >>>= 1, a <<= 1;
        } while (--e > 0);
        return a >>> 1;
    }
    function l(t) {
        16 === t.bi_valid ? (i(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, 
        t.bi_buf >>= 8, t.bi_valid -= 8);
    }
    function _(t, e) {
        var a, n, r, i, s, h, o = e.dyn_tree, l = e.max_code, _ = e.stat_desc.static_tree, d = e.stat_desc.has_stree, u = e.stat_desc.extra_bits, f = e.stat_desc.extra_base, c = e.stat_desc.max_length, p = 0;
        for (i = 0; i <= rt; i++) t.bl_count[i] = 0;
        for (o[2 * t.heap[t.heap_max] + 1] = 0, a = t.heap_max + 1; a < nt; a++) (i = o[2 * o[2 * (n = t.heap[a]) + 1] + 1] + 1) > c && (i = c, 
        p++), o[2 * n + 1] = i, n > l || (t.bl_count[i]++, s = 0, n >= f && (s = u[n - f]), 
        h = o[2 * n], t.opt_len += h * (i + s), d && (t.static_len += h * (_[2 * n + 1] + s)));
        if (0 !== p) {
            do {
                for (i = c - 1; 0 === t.bl_count[i]; ) i--;
                t.bl_count[i]--, t.bl_count[i + 1] += 2, t.bl_count[c]--, p -= 2;
            } while (p > 0);
            for (i = c; 0 !== i; i--) for (n = t.bl_count[i]; 0 !== n; ) (r = t.heap[--a]) > l || (o[2 * r + 1] !== i && (t.opt_len += (i - o[2 * r + 1]) * o[2 * r], 
            o[2 * r + 1] = i), n--);
        }
    }
    function d(t, e, a) {
        var n, r, i = new Array(rt + 1), s = 0;
        for (n = 1; n <= rt; n++) i[n] = s = s + a[n - 1] << 1;
        for (r = 0; r <= e; r++) {
            var h = t[2 * r + 1];
            0 !== h && (t[2 * r] = o(i[h]++, h));
        }
    }
    function u() {
        var t, e, n, r, i, s = new Array(rt + 1);
        for (n = 0, r = 0; r < Z - 1; r++) for (mt[r] = n, t = 0; t < 1 << dt[r]; t++) vt[n++] = r;
        for (vt[n - 1] = r, i = 0, r = 0; r < 16; r++) for (wt[r] = i, t = 0; t < 1 << ut[r]; t++) bt[i++] = r;
        for (i >>= 7; r < et; r++) for (wt[r] = i << 7, t = 0; t < 1 << ut[r] - 7; t++) bt[256 + i++] = r;
        for (e = 0; e <= rt; e++) s[e] = 0;
        for (t = 0; t <= 143; ) pt[2 * t + 1] = 8, t++, s[8]++;
        for (;t <= 255; ) pt[2 * t + 1] = 9, t++, s[9]++;
        for (;t <= 279; ) pt[2 * t + 1] = 7, t++, s[7]++;
        for (;t <= 287; ) pt[2 * t + 1] = 8, t++, s[8]++;
        for (d(pt, tt + 1, s), t = 0; t < et; t++) gt[2 * t + 1] = 5, gt[2 * t] = o(t, 5);
        yt = new a(pt, dt, $ + 1, tt, rt), kt = new a(gt, ut, 0, et, rt), zt = new a(new Array(0), ft, 0, at, st);
    }
    function f(t) {
        var e;
        for (e = 0; e < tt; e++) t.dyn_ltree[2 * e] = 0;
        for (e = 0; e < et; e++) t.dyn_dtree[2 * e] = 0;
        for (e = 0; e < at; e++) t.bl_tree[2 * e] = 0;
        t.dyn_ltree[2 * ht] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0;
    }
    function c(t) {
        t.bi_valid > 8 ? i(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), 
        t.bi_buf = 0, t.bi_valid = 0;
    }
    function p(t, e, a, n) {
        c(t), n && (i(t, a), i(t, ~a)), q.arraySet(t.pending_buf, t.window, e, a, t.pending), 
        t.pending += a;
    }
    function g(t, e, a, n) {
        var r = 2 * e, i = 2 * a;
        return t[r] < t[i] || t[r] === t[i] && n[e] <= n[a];
    }
    function b(t, e, a) {
        for (var n = t.heap[a], r = a << 1; r <= t.heap_len && (r < t.heap_len && g(e, t.heap[r + 1], t.heap[r], t.depth) && r++, 
        !g(e, n, t.heap[r], t.depth)); ) t.heap[a] = t.heap[r], a = r, r <<= 1;
        t.heap[a] = n;
    }
    function v(t, e, a) {
        var n, i, o, l, _ = 0;
        if (0 !== t.last_lit) do {
            n = t.pending_buf[t.d_buf + 2 * _] << 8 | t.pending_buf[t.d_buf + 2 * _ + 1], i = t.pending_buf[t.l_buf + _], 
            _++, 0 === n ? h(t, i, e) : (o = vt[i], h(t, o + $ + 1, e), 0 !== (l = dt[o]) && (i -= mt[o], 
            s(t, i, l)), n--, o = r(n), h(t, o, a), 0 !== (l = ut[o]) && (n -= wt[o], s(t, n, l)));
        } while (_ < t.last_lit);
        h(t, ht, e);
    }
    function m(t, e) {
        var a, n, r, i = e.dyn_tree, s = e.stat_desc.static_tree, h = e.stat_desc.has_stree, o = e.stat_desc.elems, l = -1;
        for (t.heap_len = 0, t.heap_max = nt, a = 0; a < o; a++) 0 !== i[2 * a] ? (t.heap[++t.heap_len] = l = a, 
        t.depth[a] = 0) : i[2 * a + 1] = 0;
        for (;t.heap_len < 2; ) i[2 * (r = t.heap[++t.heap_len] = l < 2 ? ++l : 0)] = 1, 
        t.depth[r] = 0, t.opt_len--, h && (t.static_len -= s[2 * r + 1]);
        for (e.max_code = l, a = t.heap_len >> 1; a >= 1; a--) b(t, i, a);
        r = o;
        do {
            a = t.heap[1], t.heap[1] = t.heap[t.heap_len--], b(t, i, 1), n = t.heap[1], t.heap[--t.heap_max] = a, 
            t.heap[--t.heap_max] = n, i[2 * r] = i[2 * a] + i[2 * n], t.depth[r] = (t.depth[a] >= t.depth[n] ? t.depth[a] : t.depth[n]) + 1, 
            i[2 * a + 1] = i[2 * n + 1] = r, t.heap[1] = r++, b(t, i, 1);
        } while (t.heap_len >= 2);
        t.heap[--t.heap_max] = t.heap[1], _(t, e), d(i, l, t.bl_count);
    }
    function w(t, e, a) {
        var n, r, i = -1, s = e[1], h = 0, o = 7, l = 4;
        for (0 === s && (o = 138, l = 3), e[2 * (a + 1) + 1] = 65535, n = 0; n <= a; n++) r = s, 
        s = e[2 * (n + 1) + 1], ++h < o && r === s || (h < l ? t.bl_tree[2 * r] += h : 0 !== r ? (r !== i && t.bl_tree[2 * r]++, 
        t.bl_tree[2 * ot]++) : h <= 10 ? t.bl_tree[2 * lt]++ : t.bl_tree[2 * _t]++, h = 0, 
        i = r, 0 === s ? (o = 138, l = 3) : r === s ? (o = 6, l = 3) : (o = 7, l = 4));
    }
    function y(t, e, a) {
        var n, r, i = -1, o = e[1], l = 0, _ = 7, d = 4;
        for (0 === o && (_ = 138, d = 3), n = 0; n <= a; n++) if (r = o, o = e[2 * (n + 1) + 1], 
        !(++l < _ && r === o)) {
            if (l < d) do {
                h(t, r, t.bl_tree);
            } while (0 != --l); else 0 !== r ? (r !== i && (h(t, r, t.bl_tree), l--), h(t, ot, t.bl_tree), 
            s(t, l - 3, 2)) : l <= 10 ? (h(t, lt, t.bl_tree), s(t, l - 3, 3)) : (h(t, _t, t.bl_tree), 
            s(t, l - 11, 7));
            l = 0, i = r, 0 === o ? (_ = 138, d = 3) : r === o ? (_ = 6, d = 3) : (_ = 7, d = 4);
        }
    }
    function k(t) {
        var e;
        for (w(t, t.dyn_ltree, t.l_desc.max_code), w(t, t.dyn_dtree, t.d_desc.max_code), 
        m(t, t.bl_desc), e = at - 1; e >= 3 && 0 === t.bl_tree[2 * ct[e] + 1]; e--) ;
        return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e;
    }
    function z(t, e, a, n) {
        var r;
        for (s(t, e - 257, 5), s(t, a - 1, 5), s(t, n - 4, 4), r = 0; r < n; r++) s(t, t.bl_tree[2 * ct[r] + 1], 3);
        y(t, t.dyn_ltree, e - 1), y(t, t.dyn_dtree, a - 1);
    }
    function x(t) {
        var e, a = 4093624447;
        for (e = 0; e <= 31; e++, a >>>= 1) if (1 & a && 0 !== t.dyn_ltree[2 * e]) return F;
        if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return G;
        for (e = 32; e < $; e++) if (0 !== t.dyn_ltree[2 * e]) return G;
        return F;
    }
    function A(t, e, a, n) {
        s(t, (Q << 1) + (n ? 1 : 0), 3), p(t, e, a, !0);
    }
    function S(t, e) {
        return t.msg = Dt[e], e;
    }
    function B(t) {
        return (t << 1) - (t > 4 ? 9 : 0);
    }
    function C(t) {
        for (var e = t.length; --e >= 0; ) t[e] = 0;
    }
    function T(t) {
        var e = t.state, a = e.pending;
        a > t.avail_out && (a = t.avail_out), 0 !== a && (q.arraySet(t.output, e.pending_buf, e.pending_out, a, t.next_out), 
        t.next_out += a, e.pending_out += a, t.total_out += a, t.avail_out -= a, e.pending -= a, 
        0 === e.pending && (e.pending_out = 0));
    }
    function D(t, e) {
        St._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), 
        t.block_start = t.strstart, T(t.strm);
    }
    function j(t, e) {
        t.pending_buf[t.pending++] = e;
    }
    function I(t, e) {
        t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e;
    }
    function E(t, e, a, n) {
        var r = t.avail_in;
        return r > n && (r = n), 0 === r ? 0 : (t.avail_in -= r, q.arraySet(e, t.input, t.next_in, r, a), 
        1 === t.state.wrap ? t.adler = Bt(t.adler, e, r, a) : 2 === t.state.wrap && (t.adler = Tt(t.adler, e, r, a)), 
        t.next_in += r, t.total_in += r, r);
    }
    function U(t, e) {
        var a, n, r = t.max_chain_length, i = t.strstart, s = t.prev_length, h = t.nice_match, o = t.strstart > t.w_size - qt ? t.strstart - (t.w_size - qt) : 0, l = t.window, _ = t.w_mask, d = t.prev, u = t.strstart + Yt, f = l[i + s - 1], c = l[i + s];
        t.prev_length >= t.good_match && (r >>= 2), h > t.lookahead && (h = t.lookahead);
        do {
            if (a = e, l[a + s] === c && l[a + s - 1] === f && l[a] === l[i] && l[++a] === l[i + 1]) {
                i += 2, a++;
                do {} while (l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && i < u);
                if (n = Yt - (u - i), i = u - Yt, n > s) {
                    if (t.match_start = e, s = n, n >= h) break;
                    f = l[i + s - 1], c = l[i + s];
                }
            }
        } while ((e = d[e & _]) > o && 0 != --r);
        return s <= t.lookahead ? s : t.lookahead;
    }
    function O(t) {
        var e, a, n, r, i, s = t.w_size;
        do {
            if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= s + (s - qt)) {
                q.arraySet(t.window, t.window, s, s, 0), t.match_start -= s, t.strstart -= s, t.block_start -= s, 
                e = a = t.hash_size;
                do {
                    n = t.head[--e], t.head[e] = n >= s ? n - s : 0;
                } while (--a);
                e = a = s;
                do {
                    n = t.prev[--e], t.prev[e] = n >= s ? n - s : 0;
                } while (--a);
                r += s;
            }
            if (0 === t.strm.avail_in) break;
            if (a = E(t.strm, t.window, t.strstart + t.lookahead, r), t.lookahead += a, t.lookahead + t.insert >= Xt) for (i = t.strstart - t.insert, 
            t.ins_h = t.window[i], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[i + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[i + Xt - 1]) & t.hash_mask, 
            t.prev[i & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead + t.insert < Xt)); ) ;
        } while (t.lookahead < qt && 0 !== t.strm.avail_in);
    }
    function R(t, e) {
        for (var a, n; ;) {
            if (t.lookahead < qt) {
                if (O(t), t.lookahead < qt && e === jt) return Qt;
                if (0 === t.lookahead) break;
            }
            if (a = 0, t.lookahead >= Xt && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Xt - 1]) & t.hash_mask, 
            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
            0 !== a && t.strstart - a <= t.w_size - qt && (t.match_length = U(t, a)), t.match_length >= Xt) if (n = St._tr_tally(t, t.strstart - t.match_start, t.match_length - Xt), 
            t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= Xt) {
                t.match_length--;
                do {
                    t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Xt - 1]) & t.hash_mask, 
                    a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
                } while (0 != --t.match_length);
                t.strstart++;
            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], 
            t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask; else n = St._tr_tally(t, 0, t.window[t.strstart]), 
            t.lookahead--, t.strstart++;
            if (n && (D(t, !1), 0 === t.strm.avail_out)) return Qt;
        }
        return t.insert = t.strstart < Xt - 1 ? t.strstart : Xt - 1, e === It ? (D(t, !0), 
        0 === t.strm.avail_out ? $t : te) : t.last_lit && (D(t, !1), 0 === t.strm.avail_out) ? Qt : Zt;
    }
    function V(t, e) {
        for (var a, n, r; ;) {
            if (t.lookahead < qt) {
                if (O(t), t.lookahead < qt && e === jt) return Qt;
                if (0 === t.lookahead) break;
            }
            if (a = 0, t.lookahead >= Xt && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Xt - 1]) & t.hash_mask, 
            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
            t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = Xt - 1, 
            0 !== a && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - qt && (t.match_length = U(t, a), 
            t.match_length <= 5 && (t.strategy === Rt || t.match_length === Xt && t.strstart - t.match_start > 4096) && (t.match_length = Xt - 1)), 
            t.prev_length >= Xt && t.match_length <= t.prev_length) {
                r = t.strstart + t.lookahead - Xt, n = St._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - Xt), 
                t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                do {
                    ++t.strstart <= r && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + Xt - 1]) & t.hash_mask, 
                    a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
                } while (0 != --t.prev_length);
                if (t.match_available = 0, t.match_length = Xt - 1, t.strstart++, n && (D(t, !1), 
                0 === t.strm.avail_out)) return Qt;
            } else if (t.match_available) {
                if ((n = St._tr_tally(t, 0, t.window[t.strstart - 1])) && D(t, !1), t.strstart++, 
                t.lookahead--, 0 === t.strm.avail_out) return Qt;
            } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (n = St._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), 
        t.insert = t.strstart < Xt - 1 ? t.strstart : Xt - 1, e === It ? (D(t, !0), 0 === t.strm.avail_out ? $t : te) : t.last_lit && (D(t, !1), 
        0 === t.strm.avail_out) ? Qt : Zt;
    }
    function H(t, e) {
        for (var a, n, r, i, s = t.window; ;) {
            if (t.lookahead <= Yt) {
                if (O(t), t.lookahead <= Yt && e === jt) return Qt;
                if (0 === t.lookahead) break;
            }
            if (t.match_length = 0, t.lookahead >= Xt && t.strstart > 0 && (r = t.strstart - 1, 
            (n = s[r]) === s[++r] && n === s[++r] && n === s[++r])) {
                i = t.strstart + Yt;
                do {} while (n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && r < i);
                t.match_length = Yt - (i - r), t.match_length > t.lookahead && (t.match_length = t.lookahead);
            }
            if (t.match_length >= Xt ? (a = St._tr_tally(t, 1, t.match_length - Xt), t.lookahead -= t.match_length, 
            t.strstart += t.match_length, t.match_length = 0) : (a = St._tr_tally(t, 0, t.window[t.strstart]), 
            t.lookahead--, t.strstart++), a && (D(t, !1), 0 === t.strm.avail_out)) return Qt;
        }
        return t.insert = 0, e === It ? (D(t, !0), 0 === t.strm.avail_out ? $t : te) : t.last_lit && (D(t, !1), 
        0 === t.strm.avail_out) ? Qt : Zt;
    }
    function N(t, e) {
        for (var a; ;) {
            if (0 === t.lookahead && (O(t), 0 === t.lookahead)) {
                if (e === jt) return Qt;
                break;
            }
            if (t.match_length = 0, a = St._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, 
            t.strstart++, a && (D(t, !1), 0 === t.strm.avail_out)) return Qt;
        }
        return t.insert = 0, e === It ? (D(t, !0), 0 === t.strm.avail_out ? $t : te) : t.last_lit && (D(t, !1), 
        0 === t.strm.avail_out) ? Qt : Zt;
    }
    function J(t, e, a, n, r) {
        this.good_length = t, this.max_lazy = e, this.nice_length = a, this.max_chain = n, 
        this.func = r;
    }
    function L(t) {
        t.window_size = 2 * t.w_size, C(t.head), t.max_lazy_match = xt[t.level].max_lazy, 
        t.good_match = xt[t.level].good_length, t.nice_match = xt[t.level].nice_length, 
        t.max_chain_length = xt[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, 
        t.insert = 0, t.match_length = t.prev_length = Xt - 1, t.match_available = 0, t.ins_h = 0;
    }
    function M() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, 
        this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, 
        this.method = Nt, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, 
        this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, 
        this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, 
        this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, 
        this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, 
        this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, 
        this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new q.Buf16(2 * Kt), 
        this.dyn_dtree = new q.Buf16(2 * (2 * Mt + 1)), this.bl_tree = new q.Buf16(2 * (2 * Pt + 1)), 
        C(this.dyn_ltree), C(this.dyn_dtree), C(this.bl_tree), this.l_desc = null, this.d_desc = null, 
        this.bl_desc = null, this.bl_count = new q.Buf16(Wt + 1), this.heap = new q.Buf16(2 * Lt + 1), 
        C(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new q.Buf16(2 * Lt + 1), 
        C(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, 
        this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, 
        this.bi_valid = 0;
    }
    function P(t) {
        var e;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = Ht, e = t.state, 
        e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? Ft : Gt, 
        t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = jt, St._tr_init(e), Et) : S(t, Ut);
    }
    function K(t) {
        var e = P(t);
        return e === Et && L(t.state), e;
    }
    function W(t, e, a, n, r, i) {
        if (!t) return Ut;
        var s = 1;
        if (e === Ot && (e = 6), n < 0 ? (s = 0, n = -n) : n > 15 && (s = 2, n -= 16), r < 1 || r > Jt || a !== Nt || n < 8 || n > 15 || e < 0 || e > 9 || i < 0 || i > Vt) return S(t, Ut);
        8 === n && (n = 9);
        var h = new M();
        return t.state = h, h.strm = t, h.wrap = s, h.gzhead = null, h.w_bits = n, h.w_size = 1 << h.w_bits, 
        h.w_mask = h.w_size - 1, h.hash_bits = r + 7, h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, 
        h.hash_shift = ~~((h.hash_bits + Xt - 1) / Xt), h.window = new q.Buf8(2 * h.w_size), 
        h.head = new q.Buf16(h.hash_size), h.prev = new q.Buf16(h.w_size), h.lit_bufsize = 1 << r + 6, 
        h.pending_buf_size = 4 * h.lit_bufsize, h.pending_buf = new q.Buf8(h.pending_buf_size), 
        h.d_buf = 1 * h.lit_bufsize, h.l_buf = 3 * h.lit_bufsize, h.level = e, h.strategy = i, 
        h.method = a, K(t);
    }
    function X(t, e) {
        if (e < 65537 && (t.subarray && ne || !t.subarray && ae)) return String.fromCharCode.apply(null, q.shrinkBuf(t, e));
        for (var a = "", n = 0; n < e; n++) a += String.fromCharCode(t[n]);
        return a;
    }
    function Y(t) {
        if (!(this instanceof Y)) return new Y(t);
        this.options = q.assign({
            level: _e,
            method: ue,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: de,
            to: ""
        }, t || {});
        var e = this.options;
        e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16), 
        this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new he(), 
        this.strm.avail_out = 0;
        var a = ee.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
        if (a !== le) throw new Error(Dt[a]);
        if (e.header && ee.deflateSetHeader(this.strm, e.header), e.dictionary) {
            var n;
            if (n = "string" == typeof e.dictionary ? se.string2buf(e.dictionary) : "[object ArrayBuffer]" === oe.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, 
            (a = ee.deflateSetDictionary(this.strm, n)) !== le) throw new Error(Dt[a]);
            this._dict_set = !0;
        }
    }
    var q = function(t, e) {
        return e = {
            exports: {}
        }, t(e, e.exports), e.exports;
    }(function(t, a) {
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        a.assign = function(t) {
            for (var a = Array.prototype.slice.call(arguments, 1); a.length; ) {
                var n = a.shift();
                if (n) {
                    if ("object" != (void 0 === n ? "undefined" : e(n))) throw new TypeError(n + "must be non-object");
                    for (var r in n) n.hasOwnProperty(r) && (t[r] = n[r]);
                }
            }
            return t;
        }, a.shrinkBuf = function(t, e) {
            return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t);
        };
        var r = {
            arraySet: function(t, e, a, n, r) {
                if (e.subarray && t.subarray) t.set(e.subarray(a, a + n), r); else for (var i = 0; i < n; i++) t[r + i] = e[a + i];
            },
            flattenChunks: function(t) {
                var e, a, n, r, i, s;
                for (n = 0, e = 0, a = t.length; e < a; e++) n += t[e].length;
                for (s = new Uint8Array(n), r = 0, e = 0, a = t.length; e < a; e++) i = t[e], s.set(i, r), 
                r += i.length;
                return s;
            }
        }, i = {
            arraySet: function(t, e, a, n, r) {
                for (var i = 0; i < n; i++) t[r + i] = e[a + i];
            },
            flattenChunks: function(t) {
                return [].concat.apply([], t);
            }
        };
        a.setTyped = function(t) {
            t ? (a.Buf8 = Uint8Array, a.Buf16 = Uint16Array, a.Buf32 = Int32Array, a.assign(a, r)) : (a.Buf8 = Array, 
            a.Buf16 = Array, a.Buf32 = Array, a.assign(a, i));
        }, a.setTyped(n);
    }), F = 0, G = 1, Q = 0, Z = 29, $ = 256, tt = $ + 1 + Z, et = 30, at = 19, nt = 2 * tt + 1, rt = 15, it = 16, st = 7, ht = 256, ot = 16, lt = 17, _t = 18, dt = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 ], ut = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ], ft = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7 ], ct = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ], pt = new Array(2 * (tt + 2));
    t(pt);
    var gt = new Array(2 * et);
    t(gt);
    var bt = new Array(512);
    t(bt);
    var vt = new Array(256);
    t(vt);
    var mt = new Array(Z);
    t(mt);
    var wt = new Array(et);
    t(wt);
    var yt, kt, zt, xt, At = !1, St = {
        _tr_init: function(t) {
            At || (u(), At = !0), t.l_desc = new n(t.dyn_ltree, yt), t.d_desc = new n(t.dyn_dtree, kt), 
            t.bl_desc = new n(t.bl_tree, zt), t.bi_buf = 0, t.bi_valid = 0, f(t);
        },
        _tr_stored_block: A,
        _tr_flush_block: function(t, e, a, n) {
            var r, i, h = 0;
            t.level > 0 ? (2 === t.strm.data_type && (t.strm.data_type = x(t)), m(t, t.l_desc), 
            m(t, t.d_desc), h = k(t), r = t.opt_len + 3 + 7 >>> 3, (i = t.static_len + 3 + 7 >>> 3) <= r && (r = i)) : r = i = a + 5, 
            a + 4 <= r && -1 !== e ? A(t, e, a, n) : 4 === t.strategy || i === r ? (s(t, 2 + (n ? 1 : 0), 3), 
            v(t, pt, gt)) : (s(t, 4 + (n ? 1 : 0), 3), z(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, h + 1), 
            v(t, t.dyn_ltree, t.dyn_dtree)), f(t), n && c(t);
        },
        _tr_tally: function(t, e, a) {
            return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, 
            t.pending_buf[t.l_buf + t.last_lit] = 255 & a, t.last_lit++, 0 === e ? t.dyn_ltree[2 * a]++ : (t.matches++, 
            e--, t.dyn_ltree[2 * (vt[a] + $ + 1)]++, t.dyn_dtree[2 * r(e)]++), t.last_lit === t.lit_bufsize - 1;
        },
        _tr_align: function(t) {
            s(t, 2, 3), h(t, ht, pt), l(t);
        }
    }, Bt = function(t, e, a, n) {
        for (var r = 65535 & t | 0, i = t >>> 16 & 65535 | 0, s = 0; 0 !== a; ) {
            a -= s = a > 2e3 ? 2e3 : a;
            do {
                i = i + (r = r + e[n++] | 0) | 0;
            } while (--s);
            r %= 65521, i %= 65521;
        }
        return r | i << 16 | 0;
    }, Ct = function() {
        for (var t, e = [], a = 0; a < 256; a++) {
            t = a;
            for (var n = 0; n < 8; n++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
            e[a] = t;
        }
        return e;
    }(), Tt = function(t, e, a, n) {
        var r = Ct, i = n + a;
        t ^= -1;
        for (var s = n; s < i; s++) t = t >>> 8 ^ r[255 & (t ^ e[s])];
        return -1 ^ t;
    }, Dt = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }, jt = 0, It = 4, Et = 0, Ut = -2, Ot = -1, Rt = 1, Vt = 4, Ht = 2, Nt = 8, Jt = 9, Lt = 286, Mt = 30, Pt = 19, Kt = 2 * Lt + 1, Wt = 15, Xt = 3, Yt = 258, qt = Yt + Xt + 1, Ft = 42, Gt = 113, Qt = 1, Zt = 2, $t = 3, te = 4;
    xt = [ new J(0, 0, 0, 0, function(t, e) {
        var a = 65535;
        for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5); ;) {
            if (t.lookahead <= 1) {
                if (O(t), 0 === t.lookahead && e === jt) return Qt;
                if (0 === t.lookahead) break;
            }
            t.strstart += t.lookahead, t.lookahead = 0;
            var n = t.block_start + a;
            if ((0 === t.strstart || t.strstart >= n) && (t.lookahead = t.strstart - n, t.strstart = n, 
            D(t, !1), 0 === t.strm.avail_out)) return Qt;
            if (t.strstart - t.block_start >= t.w_size - qt && (D(t, !1), 0 === t.strm.avail_out)) return Qt;
        }
        return t.insert = 0, e === It ? (D(t, !0), 0 === t.strm.avail_out ? $t : te) : (t.strstart > t.block_start && (D(t, !1), 
        t.strm.avail_out), Qt);
    }), new J(4, 4, 8, 4, R), new J(4, 5, 16, 8, R), new J(4, 6, 32, 32, R), new J(4, 4, 16, 16, V), new J(8, 16, 32, 32, V), new J(8, 16, 128, 128, V), new J(8, 32, 128, 256, V), new J(32, 128, 258, 1024, V), new J(32, 258, 258, 4096, V) ];
    var ee = {
        deflateInit: function(t, e) {
            return W(t, e, Nt, 15, 8, 0);
        },
        deflateInit2: W,
        deflateReset: K,
        deflateResetKeep: P,
        deflateSetHeader: function(t, e) {
            return t && t.state ? 2 !== t.state.wrap ? Ut : (t.state.gzhead = e, Et) : Ut;
        },
        deflate: function(t, e) {
            var a, n, r, i;
            if (!t || !t.state || e > 5 || e < 0) return t ? S(t, Ut) : Ut;
            if (n = t.state, !t.output || !t.input && 0 !== t.avail_in || 666 === n.status && e !== It) return S(t, 0 === t.avail_out ? -5 : Ut);
            if (n.strm = t, a = n.last_flush, n.last_flush = e, n.status === Ft) if (2 === n.wrap) t.adler = 0, 
            j(n, 31), j(n, 139), j(n, 8), n.gzhead ? (j(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), 
            j(n, 255 & n.gzhead.time), j(n, n.gzhead.time >> 8 & 255), j(n, n.gzhead.time >> 16 & 255), 
            j(n, n.gzhead.time >> 24 & 255), j(n, 9 === n.level ? 2 : n.strategy >= 2 || n.level < 2 ? 4 : 0), 
            j(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (j(n, 255 & n.gzhead.extra.length), 
            j(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = Tt(t.adler, n.pending_buf, n.pending, 0)), 
            n.gzindex = 0, n.status = 69) : (j(n, 0), j(n, 0), j(n, 0), j(n, 0), j(n, 0), j(n, 9 === n.level ? 2 : n.strategy >= 2 || n.level < 2 ? 4 : 0), 
            j(n, 3), n.status = Gt); else {
                var s = Nt + (n.w_bits - 8 << 4) << 8;
                s |= (n.strategy >= 2 || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6, 
                0 !== n.strstart && (s |= 32), s += 31 - s % 31, n.status = Gt, I(n, s), 0 !== n.strstart && (I(n, t.adler >>> 16), 
                I(n, 65535 & t.adler)), t.adler = 1;
            }
            if (69 === n.status) if (n.gzhead.extra) {
                for (r = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > r && (t.adler = Tt(t.adler, n.pending_buf, n.pending - r, r)), 
                T(t), r = n.pending, n.pending !== n.pending_buf_size)); ) j(n, 255 & n.gzhead.extra[n.gzindex]), 
                n.gzindex++;
                n.gzhead.hcrc && n.pending > r && (t.adler = Tt(t.adler, n.pending_buf, n.pending - r, r)), 
                n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73);
            } else n.status = 73;
            if (73 === n.status) if (n.gzhead.name) {
                r = n.pending;
                do {
                    if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > r && (t.adler = Tt(t.adler, n.pending_buf, n.pending - r, r)), 
                    T(t), r = n.pending, n.pending === n.pending_buf_size)) {
                        i = 1;
                        break;
                    }
                    i = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, 
                    j(n, i);
                } while (0 !== i);
                n.gzhead.hcrc && n.pending > r && (t.adler = Tt(t.adler, n.pending_buf, n.pending - r, r)), 
                0 === i && (n.gzindex = 0, n.status = 91);
            } else n.status = 91;
            if (91 === n.status) if (n.gzhead.comment) {
                r = n.pending;
                do {
                    if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > r && (t.adler = Tt(t.adler, n.pending_buf, n.pending - r, r)), 
                    T(t), r = n.pending, n.pending === n.pending_buf_size)) {
                        i = 1;
                        break;
                    }
                    i = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, 
                    j(n, i);
                } while (0 !== i);
                n.gzhead.hcrc && n.pending > r && (t.adler = Tt(t.adler, n.pending_buf, n.pending - r, r)), 
                0 === i && (n.status = 103);
            } else n.status = 103;
            if (103 === n.status && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && T(t), 
            n.pending + 2 <= n.pending_buf_size && (j(n, 255 & t.adler), j(n, t.adler >> 8 & 255), 
            t.adler = 0, n.status = Gt)) : n.status = Gt), 0 !== n.pending) {
                if (T(t), 0 === t.avail_out) return n.last_flush = -1, Et;
            } else if (0 === t.avail_in && B(e) <= B(a) && e !== It) return S(t, -5);
            if (666 === n.status && 0 !== t.avail_in) return S(t, -5);
            if (0 !== t.avail_in || 0 !== n.lookahead || e !== jt && 666 !== n.status) {
                var h = 2 === n.strategy ? N(n, e) : 3 === n.strategy ? H(n, e) : xt[n.level].func(n, e);
                if (h !== $t && h !== te || (n.status = 666), h === Qt || h === $t) return 0 === t.avail_out && (n.last_flush = -1), 
                Et;
                if (h === Zt && (1 === e ? St._tr_align(n) : 5 !== e && (St._tr_stored_block(n, 0, 0, !1), 
                3 === e && (C(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, 
                n.insert = 0))), T(t), 0 === t.avail_out)) return n.last_flush = -1, Et;
            }
            return e !== It ? Et : n.wrap <= 0 ? 1 : (2 === n.wrap ? (j(n, 255 & t.adler), j(n, t.adler >> 8 & 255), 
            j(n, t.adler >> 16 & 255), j(n, t.adler >> 24 & 255), j(n, 255 & t.total_in), j(n, t.total_in >> 8 & 255), 
            j(n, t.total_in >> 16 & 255), j(n, t.total_in >> 24 & 255)) : (I(n, t.adler >>> 16), 
            I(n, 65535 & t.adler)), T(t), n.wrap > 0 && (n.wrap = -n.wrap), 0 !== n.pending ? Et : 1);
        },
        deflateEnd: function(t) {
            var e;
            return t && t.state ? (e = t.state.status) !== Ft && 69 !== e && 73 !== e && 91 !== e && 103 !== e && e !== Gt && 666 !== e ? S(t, Ut) : (t.state = null, 
            e === Gt ? S(t, -3) : Et) : Ut;
        },
        deflateSetDictionary: function(t, e) {
            var a, n, r, i, s, h, o, l, _ = e.length;
            if (!t || !t.state) return Ut;
            if (a = t.state, 2 === (i = a.wrap) || 1 === i && a.status !== Ft || a.lookahead) return Ut;
            for (1 === i && (t.adler = Bt(t.adler, e, _, 0)), a.wrap = 0, _ >= a.w_size && (0 === i && (C(a.head), 
            a.strstart = 0, a.block_start = 0, a.insert = 0), l = new q.Buf8(a.w_size), q.arraySet(l, e, _ - a.w_size, a.w_size, 0), 
            e = l, _ = a.w_size), s = t.avail_in, h = t.next_in, o = t.input, t.avail_in = _, 
            t.next_in = 0, t.input = e, O(a); a.lookahead >= Xt; ) {
                n = a.strstart, r = a.lookahead - (Xt - 1);
                do {
                    a.ins_h = (a.ins_h << a.hash_shift ^ a.window[n + Xt - 1]) & a.hash_mask, a.prev[n & a.w_mask] = a.head[a.ins_h], 
                    a.head[a.ins_h] = n, n++;
                } while (--r);
                a.strstart = n, a.lookahead = Xt - 1, O(a);
            }
            return a.strstart += a.lookahead, a.block_start = a.strstart, a.insert = a.lookahead, 
            a.lookahead = 0, a.match_length = a.prev_length = Xt - 1, a.match_available = 0, 
            t.next_in = h, t.input = o, t.avail_in = s, a.wrap = i, Et;
        },
        deflateInfo: "pako deflate (from Nodeca project)"
    }, ae = !0, ne = !0;
    try {
        String.fromCharCode.apply(null, [ 0 ]);
    } catch (t) {
        ae = !1;
    }
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t) {
        ne = !1;
    }
    for (var re = new q.Buf8(256), ie = 0; ie < 256; ie++) re[ie] = ie >= 252 ? 6 : ie >= 248 ? 5 : ie >= 240 ? 4 : ie >= 224 ? 3 : ie >= 192 ? 2 : 1;
    re[254] = re[254] = 1;
    var se = {
        string2buf: function(t) {
            var e, a, n, r, i, s = t.length, h = 0;
            for (r = 0; r < s; r++) 55296 == (64512 & (a = t.charCodeAt(r))) && r + 1 < s && 56320 == (64512 & (n = t.charCodeAt(r + 1))) && (a = 65536 + (a - 55296 << 10) + (n - 56320), 
            r++), h += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
            for (e = new q.Buf8(h), i = 0, r = 0; i < h; r++) 55296 == (64512 & (a = t.charCodeAt(r))) && r + 1 < s && 56320 == (64512 & (n = t.charCodeAt(r + 1))) && (a = 65536 + (a - 55296 << 10) + (n - 56320), 
            r++), a < 128 ? e[i++] = a : a < 2048 ? (e[i++] = 192 | a >>> 6, e[i++] = 128 | 63 & a) : a < 65536 ? (e[i++] = 224 | a >>> 12, 
            e[i++] = 128 | a >>> 6 & 63, e[i++] = 128 | 63 & a) : (e[i++] = 240 | a >>> 18, 
            e[i++] = 128 | a >>> 12 & 63, e[i++] = 128 | a >>> 6 & 63, e[i++] = 128 | 63 & a);
            return e;
        },
        buf2binstring: function(t) {
            return X(t, t.length);
        },
        binstring2buf: function(t) {
            for (var e = new q.Buf8(t.length), a = 0, n = e.length; a < n; a++) e[a] = t.charCodeAt(a);
            return e;
        },
        buf2string: function(t, e) {
            var a, n, r, i, s = e || t.length, h = new Array(2 * s);
            for (n = 0, a = 0; a < s; ) if ((r = t[a++]) < 128) h[n++] = r; else if ((i = re[r]) > 4) h[n++] = 65533, 
            a += i - 1; else {
                for (r &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && a < s; ) r = r << 6 | 63 & t[a++], 
                i--;
                i > 1 ? h[n++] = 65533 : r < 65536 ? h[n++] = r : (r -= 65536, h[n++] = 55296 | r >> 10 & 1023, 
                h[n++] = 56320 | 1023 & r);
            }
            return X(h, n);
        },
        utf8border: function(t, e) {
            var a;
            for ((e = e || t.length) > t.length && (e = t.length), a = e - 1; a >= 0 && 128 == (192 & t[a]); ) a--;
            return a < 0 ? e : 0 === a ? e : a + re[t[a]] > e ? a : e;
        }
    }, he = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, 
        this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, 
        this.data_type = 2, this.adler = 0;
    }, oe = Object.prototype.toString, le = 0, _e = -1, de = 0, ue = 8;
    Y.prototype.push = function(t, e) {
        var a, n, r = this.strm, i = this.options.chunkSize;
        if (this.ended) return !1;
        n = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? r.input = se.string2buf(t) : "[object ArrayBuffer]" === oe.call(t) ? r.input = new Uint8Array(t) : r.input = t, 
        r.next_in = 0, r.avail_in = r.input.length;
        do {
            if (0 === r.avail_out && (r.output = new q.Buf8(i), r.next_out = 0, r.avail_out = i), 
            1 !== (a = ee.deflate(r, n)) && a !== le) return this.onEnd(a), this.ended = !0, 
            !1;
            0 !== r.avail_out && (0 !== r.avail_in || 4 !== n && 2 !== n) || ("string" === this.options.to ? this.onData(se.buf2binstring(q.shrinkBuf(r.output, r.next_out))) : this.onData(q.shrinkBuf(r.output, r.next_out)));
        } while ((r.avail_in > 0 || 0 === r.avail_out) && 1 !== a);
        return 4 === n ? (a = ee.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, 
        a === le) : 2 !== n || (this.onEnd(le), r.avail_out = 0, !0);
    }, Y.prototype.onData = function(t) {
        this.chunks.push(t);
    }, Y.prototype.onEnd = function(t) {
        t === le && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = q.flattenChunks(this.chunks)), 
        this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    var fe = function(t, e) {
        var a = new Y(e);
        if (a.push(t, !0), a.err) throw a.msg || Dt[a.err];
        return a.result;
    }, ce = function(t) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(t);
    }, pe = "undefined" != typeof top && top.btoa || function(t) {
        for (var e = [], a = 0, n = t.length, r = 0, i = 0; i < n; ++i) 3 === (a += 1) && (a = 0), 
        r = t.charCodeAt(i), 0 === a ? e.push(ce(63 & (t.charCodeAt(i - 1) << 2 | r >> 6)), ce(63 & r)) : 1 === a ? e.push(ce(r >> 2 & 63)) : e.push(ce(63 & (t.charCodeAt(i - 1) << 4 | r >> 4))), 
        i === n - 1 && a > 0 && e.push(ce(r << (3 - a << 1) & 63));
        if (a) for (;a < 3; ) a += 1, e.push("=");
        return e.join("");
    }, ge = function(t) {
        var e = fe(JSON.stringify(t), {
            to: "string"
        });
        return pe(e);
    }, be = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, ve = function(t) {
        var e = [];
        return Object.keys(t).sort().forEach(function(a) {
            var n = t[a];
            "_token" !== a && (n && "object" === (void 0 === n ? "undefined" : be(n)) && (n = JSON.stringify(n)), 
            e.push(a + "=" + n));
        }), ge(e.join("&"));
    }, me = {
        f: 0,
        r: 0,
        w: 0,
        h: 0
    }, we = {
        rId: 0,
        ts: 0,
        cts: 0,
        brVD: [],
        brR: [],
        bI: [],
        mT: [],
        kT: [],
        aT: [],
        tT: [],
        sign: ""
    }, ye = function() {
        if (we.rId = me.f, 0 === we.ts && (we.ts = Date.now()), 0 === we.brVD.length || 0 === we.brVD[0] || 0 === we.brVD[1]) {
            var t = me.r, e = me.w, a = me.h, n = [ e, a ], r = [ Math.round(t * e), Math.round(t * a) ], i = r;
            we.brVD = n, we.brR = [ r, i, 24, 24 ];
        }
    };
    try {
        wx.getSystemInfo({
            success: function(t) {
                var e = t.pixelRatio, a = t.windowWidth, n = t.windowHeight;
                me.r = e, me.w = a, me.h = n;
            }
        });
    } catch (t) {}
    var ke = {
        i: function(t) {
            me.f = t;
        },
        m: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.touches, a = t.changedTouches, n = a && a[0] || e && e[0];
            if (n) {
                var r = n.clientX, i = void 0 === r ? 0 : r, s = n.clientY, h = void 0 === s ? 0 : s, o = e && e.length || a && a.length || 0;
                we.mT = [ i + "," + h ].concat(we.mT.slice(0, 29)), we.tT = [ i + "," + h + "," + o ].concat(we.tT.slice(0, 29));
            }
        },
        t: function() {
            var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).detail, e = t && t.x || 0, a = t && t.y || 0;
            we.aT = [ e + "," + a + ",view" ].concat(we.aT.slice(0, 29));
        },
        r: function(t) {
            ye();
            var e = "", a = "";
            try {
                var n = getCurrentPages(), r = n.length;
                e = n[r - 1].__route__, r > 1 && (a = n[r - 2].__route__);
            } catch (t) {}
            var i = "";
            try {
                i = ve(t);
            } catch (t) {}
            we.sign = i, we.cts = Date.now(), we.bI = [ e, a ];
            try {
                return ge(we);
            } catch (t) {
                return "";
            }
        }
    };
    module.exports = ke;
}();