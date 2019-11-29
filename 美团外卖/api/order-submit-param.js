function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new t(function(e, n) {
            function i(u, o) {
                try {
                    var a = r[u](o), d = a.value;
                } catch (e) {
                    return void n(e);
                }
                if (!a.done) return t.resolve(d).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(d);
            }
            return i("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), t = require("../npm/promise-polyfill/promise.js"), n = require("../utils/object-assign.js"), i = require("../store.js"), u = require("../reducers/selectors/cart-foodlist.js"), o = require("./risk-param.js");

module.exports = function() {
    var t = e(r.default.mark(function e() {
        var t, a, d, s, c, p, _, l, f, m, h, v, g, b, j, w, x, q, y, k = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return r.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, o(k);

              case 2:
                return t = e.sent, k.touchPoint = null, a = i.getState(), d = a.poi.id, s = a.user.user_id, 
                c = a.recipient, p = a.purchase, _ = p.prefer ? p : c, l = _.id, f = _.phone, m = _.name, 
                h = _.address, v = _.house_number, g = _.gender, b = _.latitude, j = _.longitude, 
                w = _.caution, x = void 0 === w ? "" : w, q = p.token, y = u(a), e.abrupt("return", n(k, {
                    wxapp_base_data: t,
                    data: n({
                        addr_longitude: j,
                        addr_latitude: b,
                        wm_poi_id: d,
                        user_id: s,
                        foodlist: y,
                        wm_order_pay_type: "2",
                        poi_discount_coupon_id: "-1",
                        recipient_name: m,
                        recipient_gender: g,
                        recipient_address: h,
                        recipient_phone: f,
                        house_number: v,
                        digest: "",
                        addr_id: l,
                        caution: x,
                        token: q,
                        coupon_code: "",
                        discount_coupon_id: "-1"
                    }, k.data)
                }));

              case 10:
              case "end":
                return e.stop();
            }
        }, e, void 0);
    }));
    return function() {
        return t.apply(this, arguments);
    };
}();