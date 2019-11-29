function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new t(function(e, n) {
            function a(i, o) {
                try {
                    var s = r[i](o), u = s.value;
                } catch (e) {
                    return void n(e);
                }
                if (!s.done) return t.resolve(u).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(u);
            }
            return a("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), t = require("../npm/promise-polyfill/promise.js"), n = require("../store.js"), a = require("../utils/object-assign.js"), i = require("../constants.js").VERSION, o = require("./risk-param.js"), s = require("../utils/mtpay.js").isMtpay, u = {
    ORDER_NOT_EXIST: "订单不存在，请稍后再试",
    ORDER_HAS_PAYED: "这个订单已经支付过了，请稍后再试",
    ORDER_HAS_CANCELLED: "订单已取消，请稍后再试",
    ORDER_RISK_ERROR: "抱歉，您本次购买不符合活动规则，详见活动说明(930013)"
};

module.exports = function(t) {
    return function() {
        var d = e(r.default.mark(function e(d) {
            var p, c, l, _, v, m, f, w, x, h, R, A, y, E, P, k, S, g, O, b;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, o(d);

                  case 2:
                    return p = e.sent, d.touchPoint = null, c = n.getState(), l = c.user, _ = l.open_id, 
                    v = l.user_id, m = l.token, f = c.wx, w = f.longitude, x = f.latitude, h = void 0, 
                    R = void 0, A = void 0, y = void 0, E = void 0, e.prev = 10, e.next = 13, t(a({
                        user_id: v,
                        user_token: m,
                        "wxAppAdditionalParams.openid": _,
                        "wxAppAdditionalParams.longitude": w,
                        "wxAppAdditionalParams.latitude": x,
                        "wxAppAdditionalParams.wechatRiskParams": p,
                        version: i
                    }, d));

                  case 13:
                    P = e.sent, h = P.resCode, k = P.wxPayParams, R = void 0 === k ? "{}" : k, S = P.pay_token, 
                    A = void 0 === S ? "" : S, g = P.tradeno, y = void 0 === g ? "" : g, O = P.wm_order_pay_channel, 
                    E = void 0 === O ? 2 : O, e.next = 29;
                    break;

                  case 25:
                    throw e.prev = 25, e.t0 = e.catch(10), e.t0.msg = e.t0.message = "支付异常，请稍后再试", e.t0;

                  case 29:
                    if (0 === h || "PAY_SUCCESS" === h) {
                        e.next = 32;
                        break;
                    }
                    throw b = u.hasOwnProperty(h) ? u[h] : "支付异常，请稍后再试", {
                        code: h,
                        message: b,
                        msg: b
                    };

                  case 32:
                    if (!s(E)) {
                        e.next = 34;
                        break;
                    }
                    return e.abrupt("return", {
                        wm_order_pay_channel: E,
                        pay_token: A,
                        tradeno: y
                    });

                  case 34:
                    return e.abrupt("return", JSON.parse(R));

                  case 35:
                  case "end":
                    return e.stop();
                }
            }, e, void 0, [ [ 10, 25 ] ]);
        }));
        return function(e) {
            return d.apply(this, arguments);
        };
    }();
};