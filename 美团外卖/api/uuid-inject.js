function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new n(function(e, t) {
            function u(a, i) {
                try {
                    var s = r[a](i), o = s.value;
                } catch (e) {
                    return void t(e);
                }
                if (!s.done) return n.resolve(o).then(function(e) {
                    u("next", e);
                }, function(e) {
                    u("throw", e);
                });
                e(o);
            }
            return u("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), t = require("../actions/dev.js"), n = require("../npm/promise-polyfill/promise.js"), u = require("../utils/random-id.js"), a = require("../store.js"), i = require("./wx.js").storage.getItem, s = require("../constants.js").KEY_UUID;

module.exports = function(n) {
    return e(r.default.mark(function e() {
        var o, c, d, p, f, v, l, x, b, m, h, g, U, j, k, q;
        return r.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (o = a.getState(), !(c = o.dev.uuid)) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return", c);

              case 3:
                return e.prev = 3, e.next = 6, i(s);

              case 6:
                if (d = e.sent, !(p = d.data) || "string" != typeof p) {
                    e.next = 11;
                    break;
                }
                return a.dispatch((0, t.loadedUUID)({
                    uuid: p
                })), e.abrupt("return", p);

              case 11:
                e.next = 16;
                break;

              case 13:
                e.prev = 13, e.t0 = e.catch(3), console.error(e.t0);

              case 16:
                return f = a.getState(), v = f.wx, l = v.model, x = v.version, e.prev = 17, e.next = 20, 
                n({
                    model: l,
                    version: x
                });

              case 20:
                if (b = e.sent, m = JSON.parse(b), h = m.uuid, g = a.getState(), U = g.dev.uuid) {
                    e.next = 27;
                    break;
                }
                if (!h || "string" != typeof h) {
                    e.next = 27;
                    break;
                }
                return a.dispatch((0, t.storeUUID)({
                    uuid: h
                })), e.abrupt("return", h);

              case 27:
                return e.abrupt("return", U);

              case 30:
                e.prev = 30, e.t1 = e.catch(17), console.error(e.t1);

              case 33:
                if (j = a.getState(), k = j.dev.uuid) {
                    e.next = 38;
                    break;
                }
                return q = u(), a.dispatch((0, t.storeUUID)({
                    uuid: q
                })), e.abrupt("return", q);

              case 38:
                return e.abrupt("return", k);

              case 39:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 3, 13 ], [ 17, 30 ] ]);
    }));
};