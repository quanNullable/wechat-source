function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new o(function(e, t) {
            function n(a, u) {
                try {
                    var s = r[a](u), i = s.value;
                } catch (e) {
                    return void t(e);
                }
                if (!s.done) return o.resolve(i).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(i);
            }
            return n("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), t = require("../actions/user.js"), n = require("../constants.js").KEY_USER_INFO, a = require("../store.js"), u = {
    "main-domain": "wx.waimai.meituan.com",
    "market-domain": "marketing.waimai.meituan.com"
}, o = require("../npm/promise-polyfill/promise.js"), s = require("./urls.js")(u), i = require("./wx.js"), c = require("../utils/promise-try.js"), d = i.requestJSON, l = i.getNetworkType, m = i.getSystemInfo, p = i.getLocation, f = i.reLaunch, g = require("../utils/object-assign.js"), v = require("./uuid-inject.js"), h = require("./pay-inject.js"), j = require("./user-storage.js"), x = require("./env.js"), q = require("../reducers/selectors/common-param.js"), b = require("./rohr.js"), y = "", k = require("../utils/wx.js").storage.getItem, w = require("../utils/param.js"), U = require("../utils/deal-region-set.js").setUrl, S = {
    poiFilter: 1,
    poiFood: 1,
    poiInfo: 1,
    channelPage: 1,
    poiQualification: 1
}, _ = Object.keys(s).reduce(function(t, u) {
    var o = s[u], i = function() {
        var t = e(r.default.mark(function e(t) {
            var s, i, c, l, m, p, v, h, j, x, _, P, O, C, I, M;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return s = a.getState(), i = q(s), i.utm_source = y, c = void 0, e.prev = 4, e.next = 7, 
                    k(n);

                  case 7:
                    c = e.sent, c = c.data, e.next = 15;
                    break;

                  case 11:
                    e.prev = 11, e.t0 = e.catch(4), l = e.t0.message, console.log(l);

                  case 15:
                    return m = void 0, e.prev = 16, e.next = 19, k("UUID");

                  case 19:
                    m = e.sent, m = m.data, e.next = 28;
                    break;

                  case 23:
                    e.prev = 23, e.t1 = e.catch(16), l = e.t1.message, m = "", console.log(l);

                  case 28:
                    return p = void 0, e.prev = 29, e.next = 32, k("user");

                  case 32:
                    p = e.sent, p = p.data.open_id, e.next = 41;
                    break;

                  case 36:
                    e.prev = 36, e.t2 = e.catch(29), l = e.t2.message, p = "", console.log(l);

                  case 41:
                    return v = {
                        open_id: p,
                        uuid: m,
                        platform: 13,
                        partner: 4,
                        riskLevel: 1
                    }, h = g(i, c, v, t), j = s.dev.env, 1 === S[u] && (h._token = b.reload(h)), console.log(h), 
                    x = j ? {
                        "x-env": j
                    } : {}, _ = m ? {
                        uuid: m
                    } : {}, console.log(s), e.prev = 49, e.next = 52, U(o);

                  case 52:
                    o = e.sent, e.next = 58;
                    break;

                  case 55:
                    e.prev = 55, e.t3 = e.catch(49), console.log(e.t3);

                  case 58:
                    return e.next = 60, d({
                        url: o,
                        data: h,
                        header: Object.assign({}, x, _),
                        method: "POST"
                    });

                  case 60:
                    if (P = e.sent, console.log(P), "string" == typeof P && (P = JSON.parse(P)), 406 !== P.code) {
                        e.next = 66;
                        break;
                    }
                    throw getCurrentPages()[0].verify({
                        imageUrl: P.customData.imageUrl,
                        verifyUrl: P.customData.verifyUrl
                    }), {
                        message: "出错啦"
                    };

                  case 66:
                    if (O = P, C = O.code, I = O.data, M = O.msg, 200100 !== C) {
                        e.next = 70;
                        break;
                    }
                    throw getCurrentPages()[0].spiderError({
                        message: "暂时无法访问，切换地址后仍然无法使用可联系客服10109777解决",
                        textOK: "重新加载",
                        ok: function() {
                            var e = "/" + getCurrentPages()[0].route + "?" + w(getCurrentPages()[0].options);
                            console.log(e), f({
                                url: e
                            });
                        },
                        customer_ip: I.customer_ip
                    }), {
                        message: "暂时无法访问，切换地址后仍然无法使用可联系客服10109777解决"
                    };

                  case 70:
                    if (0 === C) {
                        e.next = 72;
                        break;
                    }
                    throw {
                        code: C,
                        data: I,
                        msg: M,
                        message: M
                    };

                  case 72:
                    return e.abrupt("return", I);

                  case 73:
                  case "end":
                    return e.stop();
                }
            }, e, void 0, [ [ 4, 11 ], [ 16, 23 ], [ 29, 36 ], [ 49, 55 ] ]);
        }));
        return function(e) {
            return t.apply(this, arguments);
        };
    }();
    return t[u] = i, t;
}, {}), P = _.orderPreview, O = _.orderSubmit, C = _.orderUpdate, I = _.addrGet, M = _.uuid, N = _.pay, T = require("./order-submit-param.js");

_.addrGet = function(e) {
    return I(e).then(function(e) {
        return a.dispatch((0, t.setAddresses)({
            addresses: e
        })), e;
    });
}, _.orderPreview = function(e) {
    return T(e).then(function(e) {
        return P(e);
    });
}, _.orderSubmit = function(e) {
    return T(e).then(function(e) {
        return O(e);
    });
}, _.orderUpdate = function(e) {
    return T(e).then(function(e) {
        return C(e);
    });
}, _.getCaptchaUrl = function() {
    var e = a.getState().dev.uuid;
    return "https://" + u["main-domain"] + "/getcaptcha?uuid=" + e + "&_=" + Math.random();
}, _.uuid = v(M), _.pay = h(N);

var D = !1, E = !1, F = [], L = !0;

_.ready = function(e) {
    var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    if (!1 === L && !0 === r && (D = !1, F = []), L = r, D) e(); else if (F.push(e), 
    !E) {
        E = !0;
        var t = [];
        t = r ? [ m(), l(), p(), j(), x() ] : [ m(), l(), j(), x() ], c(t).then(function() {
            return _.uuid();
        }).then(function() {
            var e = F, r = e.length;
            D = !0, F = null, E = !1;
            for (var t = 0; t < r; ++t) (0, e[t])();
        });
    }
}, _.setUTMSource = function(e) {
    y = e;
}, _.getUTMSource = function() {
    return y;
}, _.domain = u, module.exports = _;