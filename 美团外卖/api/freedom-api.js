function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function r(o, i) {
                try {
                    var a = e[o](i), u = a.value;
                } catch (t) {
                    return void n(t);
                }
                if (!a.done) return Promise.resolve(u).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(u);
            }
            return r("next");
        });
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../npm/babel-runtime/regenerator/index.js")), r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
}, o = require("../npm/@hfe/mp-owl/lib/index.js"), i = require("../utils/deal-region-set.js").setUrl, a = require("../utils/promisify.js").obj, u = require("../utils/param.js"), c = require("../store.js"), s = a(o.request), m = {
    online: "https://activity.waimai.meituan.com/",
    st: "https://activity.waimai.meituan.com/",
    release: "https://activity.waimai.meituan.com/",
    qa: "https://activity.waimai.meituan.com/"
}, l = function() {
    var e = t(n.default.mark(function t(e) {
        var o, a, l;
        return n.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return (o = e.data) && "object" === (void 0 === o ? "undefined" : r(o)) && (e.method = e.method ? e.method : "POST", 
                "GET" === e.method ? e.url = e.url + "?" + u(o) : e.data = u(o), e.header = {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest"
                }), a = c.getState(), l = a.dev.env, l = l || "online", e.domain ? Object.keys(m).forEach(function(t) {
                    m[t] = e.domain;
                }) : (m = {
                    online: "https://activity.waimai.meituan.com/",
                    st: "https://activity.waimai.meituan.com/",
                    release: "https://activity.waimai.meituan.com/",
                    qa: "https://activity.waimai.meituan.com/"
                }, console.log("默认域名: https://activity.waimai.meituan.com/")), e.url = m[l] + e.url, 
                t.prev = 7, t.next = 10, i(e.url);

              case 10:
                e.url = t.sent, t.next = 17;
                break;

              case 13:
                t.prev = 13, t.t0 = t.catch(7), console.log(t.t0), e.url = m[l] + e.url;

              case 17:
                return t.abrupt("return", s(e));

              case 18:
              case "end":
                return t.stop();
            }
        }, t, void 0, [ [ 7, 13 ] ]);
    }));
    return function(t) {
        return e.apply(this, arguments);
    };
}(), f = function(t) {
    return l(t).then(function(t) {
        var e = t.statusCode, n = t.errMsg, r = t.data;
        if ("200" !== String(e)) {
            var o = "Status code not 200[" + e + "]: " + n;
            throw {
                code: -e,
                data: r,
                msg: o,
                message: o
            };
        }
        if (0 !== r.code) throw {
            code: r.code,
            data: r,
            msg: r.msg,
            message: r.msg
        };
        return r;
    }).catch(function(t) {
        throw t;
    });
}, d = function() {
    var e = t(n.default.mark(function t(e) {
        var r, o;
        return n.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.next = 2, f(e);

              case 2:
                return r = t.sent, o = r.data, t.abrupt("return", o);

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
    request: d
};