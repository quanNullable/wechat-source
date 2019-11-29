function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new o(function(e, n) {
            function r(a, i) {
                try {
                    var u = t[a](i), s = u.value;
                } catch (e) {
                    return void n(e);
                }
                if (!u.done) return o.resolve(s).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(s);
            }
            return r("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = function() {
    function e(e, t) {
        var n = [], r = !0, o = !1, a = void 0;
        try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            o = !0, a = e;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (o) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = require("../../npm/@hfe/mp-owl/lib/index.js"), o = require("../../npm/promise-polyfill/promise.js"), a = require("../base.js"), i = require("../../utils/split-float.js"), u = require("../../api/index.js").getCouponsList, s = a({
    data: {
        empty: !1,
        more: !0,
        coupon_total_num: 0,
        coupons: []
    },
    index: 0,
    load: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var o, a, s, c, l, p, d, f, m, h, g, x, v, y, _, b, w;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r.loading(!0), e.prev = 1, o = r.index, a = r.data.coupons, e.next = 5, u({
                        status: 5,
                        page_index: o,
                        page_size: 20
                    });

                  case 5:
                    if (s = e.sent, c = s.has_more, l = s.coupon_total_num, p = s.coupon_list) {
                        e.next = 11;
                        break;
                    }
                    throw {
                        code: "error",
                        message: "啊哦, 出错了, 请重试"
                    };

                  case 11:
                    for (d = 1 === c, f = p.length - 1; f > -1; --f) m = p[f], h = m.amount, g = i(h), 
                    x = n(g, 2), m.amount = x[0], m.tail = x[1];
                    if (0 !== (v = a.concat(p)).length) {
                        e.next = 16;
                        break;
                    }
                    throw {
                        code: "no-coupon",
                        message: "您当前没有红包哦~"
                    };

                  case 16:
                    r.index = o + 1, r.setData({
                        empty: !1,
                        coupon_total_num: l,
                        coupons: v,
                        more: d
                    }), r.error({}), e.next = 26;
                    break;

                  case 21:
                    e.prev = 21, e.t0 = e.catch(1), y = e.t0.code, _ = e.t0.message, 0 === r.data.coupons.length ? (b = "no-coupon" !== y ? "重试" : "", 
                    w = "no-coupon" !== y ? "您的手机网络不太顺畅哦" : _, r.error({
                        img: "no-coupon",
                        message: w,
                        textOK: b,
                        ok: function() {
                            r.index = 0, r.load();
                        }
                    }), r.setData({
                        empty: !0
                    })) : r.toast({
                        message: _
                    });

                  case 26:
                    r.loading(!1);

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 1, 21 ] ]);
        }))();
    },
    onLoad: function() {
        this.load();
    },
    onScrollBottom: function() {
        this.data.more && this.load();
    }
});

(0, r.page)(s);