var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

!function(i, e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : o(exports)) ? module.exports = exports = e(require("./core"), require("./x64-core")) : "function" == typeof define && define.amd ? define([ "./core", "./x64-core" ], e) : e(i.CryptoJS);
}(void 0, function(o) {
    return function() {
        function i() {
            return n.create.apply(n, arguments);
        }
        var e = o, t = e.lib.Hasher, h = e.x64, n = h.Word, r = h.WordArray, l = e.algo, s = [ i(1116352408, 3609767458), i(1899447441, 602891725), i(3049323471, 3964484399), i(3921009573, 2173295548), i(961987163, 4081628472), i(1508970993, 3053834265), i(2453635748, 2937671579), i(2870763221, 3664609560), i(3624381080, 2734883394), i(310598401, 1164996542), i(607225278, 1323610764), i(1426881987, 3590304994), i(1925078388, 4068182383), i(2162078206, 991336113), i(2614888103, 633803317), i(3248222580, 3479774868), i(3835390401, 2666613458), i(4022224774, 944711139), i(264347078, 2341262773), i(604807628, 2007800933), i(770255983, 1495990901), i(1249150122, 1856431235), i(1555081692, 3175218132), i(1996064986, 2198950837), i(2554220882, 3999719339), i(2821834349, 766784016), i(2952996808, 2566594879), i(3210313671, 3203337956), i(3336571891, 1034457026), i(3584528711, 2466948901), i(113926993, 3758326383), i(338241895, 168717936), i(666307205, 1188179964), i(773529912, 1546045734), i(1294757372, 1522805485), i(1396182291, 2643833823), i(1695183700, 2343527390), i(1986661051, 1014477480), i(2177026350, 1206759142), i(2456956037, 344077627), i(2730485921, 1290863460), i(2820302411, 3158454273), i(3259730800, 3505952657), i(3345764771, 106217008), i(3516065817, 3606008344), i(3600352804, 1432725776), i(4094571909, 1467031594), i(275423344, 851169720), i(430227734, 3100823752), i(506948616, 1363258195), i(659060556, 3750685593), i(883997877, 3785050280), i(958139571, 3318307427), i(1322822218, 3812723403), i(1537002063, 2003034995), i(1747873779, 3602036899), i(1955562222, 1575990012), i(2024104815, 1125592928), i(2227730452, 2716904306), i(2361852424, 442776044), i(2428436474, 593698344), i(2756734187, 3733110249), i(3204031479, 2999351573), i(3329325298, 3815920427), i(3391569614, 3928383900), i(3515267271, 566280711), i(3940187606, 3454069534), i(4118630271, 4000239992), i(116418474, 1914138554), i(174292421, 2731055270), i(289380356, 3203993006), i(460393269, 320620315), i(685471733, 587496836), i(852142971, 1086792851), i(1017036298, 365543100), i(1126000580, 2618297676), i(1288033470, 3409855158), i(1501505948, 4234509866), i(1607167915, 987167468), i(1816402316, 1246189591) ], c = [];
        !function() {
            for (var o = 0; o < 80; o++) c[o] = i();
        }();
        var a = l.SHA512 = t.extend({
            _doReset: function() {
                this._hash = new r.init([ new n.init(1779033703, 4089235720), new n.init(3144134277, 2227873595), new n.init(1013904242, 4271175723), new n.init(2773480762, 1595750129), new n.init(1359893119, 2917565137), new n.init(2600822924, 725511199), new n.init(528734635, 4215389547), new n.init(1541459225, 327033209) ]);
            },
            _doProcessBlock: function(o, i) {
                for (var e = this._hash.words, t = e[0], h = e[1], n = e[2], r = e[3], l = e[4], a = e[5], w = e[6], f = e[7], g = t.high, u = t.low, y = h.high, d = h.low, p = n.high, _ = n.low, v = r.high, m = r.low, S = l.high, b = l.low, H = a.high, x = a.low, A = w.high, B = w.low, k = f.high, q = f.low, z = g, W = u, j = y, C = d, D = p, F = _, J = v, M = m, P = S, R = b, X = H, E = x, G = A, I = B, K = k, L = q, N = 0; N < 80; N++) {
                    var O = c[N];
                    if (N < 16) var Q = O.high = 0 | o[i + 2 * N], T = O.low = 0 | o[i + 2 * N + 1]; else {
                        var U = c[N - 15], V = U.high, Y = U.low, Z = (V >>> 1 | Y << 31) ^ (V >>> 8 | Y << 24) ^ V >>> 7, $ = (Y >>> 1 | V << 31) ^ (Y >>> 8 | V << 24) ^ (Y >>> 7 | V << 25), oo = c[N - 2], io = oo.high, eo = oo.low, to = (io >>> 19 | eo << 13) ^ (io << 3 | eo >>> 29) ^ io >>> 6, ho = (eo >>> 19 | io << 13) ^ (eo << 3 | io >>> 29) ^ (eo >>> 6 | io << 26), no = c[N - 7], ro = no.high, lo = no.low, so = c[N - 16], co = so.high, ao = so.low, Q = (Q = (Q = Z + ro + ((T = $ + lo) >>> 0 < $ >>> 0 ? 1 : 0)) + to + ((T = T + ho) >>> 0 < ho >>> 0 ? 1 : 0)) + co + ((T = T + ao) >>> 0 < ao >>> 0 ? 1 : 0);
                        O.high = Q, O.low = T;
                    }
                    var wo = P & X ^ ~P & G, fo = R & E ^ ~R & I, go = z & j ^ z & D ^ j & D, uo = W & C ^ W & F ^ C & F, yo = (z >>> 28 | W << 4) ^ (z << 30 | W >>> 2) ^ (z << 25 | W >>> 7), po = (W >>> 28 | z << 4) ^ (W << 30 | z >>> 2) ^ (W << 25 | z >>> 7), _o = (P >>> 14 | R << 18) ^ (P >>> 18 | R << 14) ^ (P << 23 | R >>> 9), vo = (R >>> 14 | P << 18) ^ (R >>> 18 | P << 14) ^ (R << 23 | P >>> 9), mo = s[N], So = mo.high, bo = mo.low, Ho = L + vo, xo = (xo = (xo = (xo = K + _o + (Ho >>> 0 < L >>> 0 ? 1 : 0)) + wo + ((Ho = Ho + fo) >>> 0 < fo >>> 0 ? 1 : 0)) + So + ((Ho = Ho + bo) >>> 0 < bo >>> 0 ? 1 : 0)) + Q + ((Ho = Ho + T) >>> 0 < T >>> 0 ? 1 : 0), Ao = po + uo, Bo = yo + go + (Ao >>> 0 < po >>> 0 ? 1 : 0);
                    K = G, L = I, G = X, I = E, X = P, E = R, P = J + xo + ((R = M + Ho | 0) >>> 0 < M >>> 0 ? 1 : 0) | 0, 
                    J = D, M = F, D = j, F = C, j = z, C = W, z = xo + Bo + ((W = Ho + Ao | 0) >>> 0 < Ho >>> 0 ? 1 : 0) | 0;
                }
                u = t.low = u + W, t.high = g + z + (u >>> 0 < W >>> 0 ? 1 : 0), d = h.low = d + C, 
                h.high = y + j + (d >>> 0 < C >>> 0 ? 1 : 0), _ = n.low = _ + F, n.high = p + D + (_ >>> 0 < F >>> 0 ? 1 : 0), 
                m = r.low = m + M, r.high = v + J + (m >>> 0 < M >>> 0 ? 1 : 0), b = l.low = b + R, 
                l.high = S + P + (b >>> 0 < R >>> 0 ? 1 : 0), x = a.low = x + E, a.high = H + X + (x >>> 0 < E >>> 0 ? 1 : 0), 
                B = w.low = B + I, w.high = A + G + (B >>> 0 < I >>> 0 ? 1 : 0), q = f.low = q + L, 
                f.high = k + K + (q >>> 0 < L >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
                var o = this._data, i = o.words, e = 8 * this._nDataBytes, t = 8 * o.sigBytes;
                return i[t >>> 5] |= 128 << 24 - t % 32, i[30 + (t + 128 >>> 10 << 5)] = Math.floor(e / 4294967296), 
                i[31 + (t + 128 >>> 10 << 5)] = e, o.sigBytes = 4 * i.length, this._process(), this._hash.toX32();
            },
            clone: function() {
                var o = t.clone.call(this);
                return o._hash = this._hash.clone(), o;
            },
            blockSize: 32
        });
        e.SHA512 = t._createHelper(a), e.HmacSHA512 = t._createHmacHelper(a);
    }(), o.SHA512;
});