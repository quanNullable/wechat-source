function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, n) {
            function o(a, u) {
                try {
                    var i = t[a](u), s = i.value;
                } catch (e) {
                    return void n(e);
                }
                if (!i.done) return r.resolve(s).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(s);
            }
            return o("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = function() {
    function e(e, t) {
        var n = [], o = !0, r = !1, a = void 0;
        try {
            for (var u, i = e[Symbol.iterator](); !(o = (u = i.next()).done) && (n.push(u.value), 
            !t || n.length !== t); o = !0) ;
        } catch (e) {
            r = !0, a = e;
        } finally {
            try {
                !o && i.return && i.return();
            } finally {
                if (r) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), o = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../npm/promise-polyfill/promise.js"), a = require("../base.js"), u = require("../../utils/split-float.js"), i = require("../../api/index.js").getCouponsList, s = a({
    data: {
        empty: !1,
        more: !0,
        coupon_total_num: 0,
        coupons: []
    },
    index: 0,
    load: function() {
        var o = this;
        return e(t.default.mark(function e() {
            var r, a, s, c, l, p, f, d, m, h, g, x, v, y, _, b, w;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o.loading(!0), e.prev = 1, r = o.index, a = o.data.coupons, e.next = 5, i({
                        status: 1,
                        page_index: r,
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
                    for (f = 1 === c, d = p.length - 1; d > -1; --d) m = p[d], h = m.amount, g = u(h), 
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
                    o.index = r + 1, o.setData({
                        empty: !1,
                        coupon_total_num: l,
                        coupons: v,
                        more: f
                    }), o.error({}), e.next = 26;
                    break;

                  case 21:
                    e.prev = 21, e.t0 = e.catch(1), y = e.t0.code, _ = e.t0.message, 0 === o.data.coupons.length ? (b = "no-coupon" !== y ? "重试" : "", 
                    w = "no-coupon" !== y ? "您的手机网络不太顺畅哦" : _, o.error({
                        img: "no-coupon",
                        message: w,
                        textOK: b,
                        ok: function() {
                            o.index = 0, o.load();
                        }
                    }), o.setData({
                        empty: !0
                    })) : o.toast({
                        message: _
                    });

                  case 26:
                    o.loading(!1);

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, e, o, [ [ 1, 21 ] ]);
        }))();
    },
    onSelectCoupon: function() {},
    onLoad: function() {
        this.load();
    },
    onScrollBottom: function() {
        this.data.more && this.load();
    }
});

(0, o.page)(s);