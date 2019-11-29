function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, r) {
            function n(o, u) {
                try {
                    var i = e[o](u), a = i.value;
                } catch (t) {
                    return void r(t);
                }
                if (!i.done) return Promise.resolve(a).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(a);
            }
            return n("next");
        });
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../npm/babel-runtime/regenerator/index.js")), n = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
}, o = require("../npm/@hfe/mp-owl/lib/index.js"), u = require("../utils/promisify.js").obj, i = require("../utils/param.js"), a = require("../utils/object-assign.js"), s = u(o.request), c = require("../store.js"), m = require("../utils/deal-region-set.js").setUrl, d = {
    online: "https://activity.waimai.meituan.com/",
    st: "https://activity.waimai.meituan.com/",
    release: "https://activity.waimai.meituan.com/",
    qa: "https://activity.waimai.meituan.com/",
    beta: "https://activity.waimai.meituan.com/"
}, l = require("../reducers/selectors/common-param.js"), f = function() {
    var e = t(r.default.mark(function t(e) {
        var o, u, f, p, y, v;
        return r.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (!(o = e.data) || "object" !== (void 0 === o ? "undefined" : n(o))) {
                    t.next = 18;
                    break;
                }
                return u = c.getState(), f = l(u), f.wm_appversion = "6.4.0", p = a(f, o), e.method = e.method ? e.method : "POST", 
                "GET" === e.method ? e.url = e.url + "?" + i(p) : e.data = i(p), t.prev = 8, t.next = 11, 
                m(e.url);

              case 11:
                e.url = t.sent, t.next = 17;
                break;

              case 14:
                t.prev = 14, t.t0 = t.catch(8), e.url = e.url + "?" + i(p);

              case 17:
                e.header = {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest"
                };

              case 18:
                return y = c.getState(), v = y.dev.env, v = v || "online", e.domain ? e.url = e.domain + e.url : e.url = d[v] + e.url, 
                t.abrupt("return", s(e));

              case 23:
              case "end":
                return t.stop();
            }
        }, t, void 0, [ [ 8, 14 ] ]);
    }));
    return function(t) {
        return e.apply(this, arguments);
    };
}(), p = function(t) {
    return f(t).then(function(e) {
        var r = e.statusCode, n = e.errMsg, o = e.data, u = void 0 === t.successCode ? 1 : t.successCode;
        if ("200" !== String(r)) {
            var i = "Status code not 200[" + r + "]: " + n;
            throw {
                code: -r,
                data: o,
                msg: i,
                message: i
            };
        }
        if (o.code !== u) throw {
            code: o.code,
            data: o,
            msg: o.msg,
            message: o.msg
        };
        return o;
    }).catch(function(t) {
        throw t;
    });
}, y = function() {
    var e = t(r.default.mark(function t(e) {
        var n, o;
        return r.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.next = 2, p(e);

              case 2:
                return n = t.sent, o = n.data, t.abrupt("return", o);

              case 5:
              case "end":
                return t.stop();
            }
        }, t, void 0);
    }));
    return function(t) {
        return e.apply(this, arguments);
    };
}();

module.exports = {
    request: y
};