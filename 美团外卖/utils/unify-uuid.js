function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function n(a, u) {
                try {
                    var i = t[a](u), s = i.value;
                } catch (e) {
                    return void r(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }
            return n("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), r = require("../actions/dev.js"), n = require("../actions/user.js"), a = require("../api/wx.js"), u = a.login, i = a.storage, s = i.setItem, c = i.getItem, o = require("../api/index.js").Muuid, d = require("../store.js"), p = require("./random-id.js"), f = require("../pages/loginV2/finger.js"), v = function() {
    var n = e(t.default.mark(function e(n) {
        var a, u, i;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, c("UUID");

              case 3:
                if (a = e.sent, !(u = a.data)) {
                    e.next = 9;
                    break;
                }
                return d.dispatch((0, r.loadedUUID)({
                    uuid: u
                })), n.setEnv("uuid", u), e.abrupt("return", u);

              case 9:
                e.next = 14;
                break;

              case 11:
                e.prev = 11, e.t0 = e.catch(0), console.error(e.t0);

              case 14:
                return i = p(), d.dispatch((0, r.loadedUUID)({
                    uuid: i
                })), e.next = 18, s("UUID", i);

              case 18:
                return n.setEnv("uuid", i), e.abrupt("return", i);

              case 20:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 11 ] ]);
    }));
    return function(e) {
        return n.apply(this, arguments);
    };
}(), l = function() {
    var a = e(t.default.mark(function e(a) {
        var u, i, c, p, f, v, l, x = a.uuid, g = a.code, h = a.rawData, w = void 0 === h ? "" : h, D = a.signature, U = void 0 === D ? "" : D, k = a.encryptedData, m = void 0 === k ? "" : k, b = a.iv, y = void 0 === b ? "" : b, j = a.res, I = a.lx, q = a.callback;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, o({
                    uuid: x,
                    code: g,
                    rawData: w,
                    signature: U,
                    encryptedData: m,
                    iv: y,
                    wechatFingePrint: j
                });

              case 3:
                if (u = e.sent, i = u.open_id, c = u.user_id, p = u.token, !(f = u.uuid)) {
                    e.next = 17;
                    break;
                }
                return e.next = 11, s("UUID", f);

              case 11:
                d.dispatch((0, r.loadedUUID)({
                    uuid: f
                })), I.setEnv("uuid", f), v = getApp().store.getState().user, l = Object.assign({}, v, {
                    user_id: c || v.user_id,
                    token: p || v.token,
                    open_id: i || v.open_id
                }), d.dispatch((0, n.store)(l)), q && q(f);

              case 17:
                e.next = 23;
                break;

              case 19:
                e.prev = 19, e.t0 = e.catch(0), console.error(e.t0), q && q(x);

              case 23:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 19 ] ]);
    }));
    return function(e) {
        return a.apply(this, arguments);
    };
}(), x = function() {
    var n = e(t.default.mark(function e(n, a) {
        var i, s, c, o;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, v(n);

              case 2:
                return i = e.sent, s = wx.getStorageSync("ENV"), d.dispatch((0, r.loadedENV)({
                    env: s
                })), e.next = 7, u();

              case 7:
                c = e.sent, o = c.code, wx.getUserInfo({
                    complete: function(e) {
                        var t = e.rawData, r = e.signature, u = e.encryptedData, s = e.iv;
                        f.g(function(e) {
                            l({
                                uuid: i,
                                code: o,
                                rawData: t,
                                signature: r,
                                encryptedData: u,
                                iv: s,
                                res: e,
                                lx: n,
                                callback: a
                            });
                        });
                    }
                });

              case 10:
              case "end":
                return e.stop();
            }
        }, e, void 0);
    }));
    return function(e, t) {
        return n.apply(this, arguments);
    };
}();

module.exports = x;