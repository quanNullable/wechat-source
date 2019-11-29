function e(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function t(u, o) {
                try {
                    var i = n[u](o), a = i.value;
                } catch (e) {
                    return void r(e);
                }
                if (!i.done) return Promise.resolve(a).then(function(e) {
                    t("next", e);
                }, function(e) {
                    t("throw", e);
                });
                e(a);
            }
            return t("next");
        });
    };
}

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), r = require("../api/wx.js"), t = r.login, u = r.storage.setItem, o = require("../api/index.js").cachemisscount, i = function() {
    var r = e(n.default.mark(function e() {
        var r, i, a, c, s, d, p, f;
        return n.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r = wx.getStorageSync("user") ? wx.getStorageSync("user").open_id : wx.getStorageSync("_open_id"), 
                i = wx.getStorageSync("_uuid"), a = "", r) {
                    e.next = 9;
                    break;
                }
                return e.next = 6, t();

              case 6:
                c = e.sent, s = c.code, a = s;

              case 9:
                return e.prev = 9, e.next = 12, o({
                    openId: r,
                    code: a,
                    uuid: i
                });

              case 12:
                d = e.sent, p = d.openId, f = d.uuid, p && u("_open_id", p), f && u("_uuid", f), 
                e.next = 22;
                break;

              case 19:
                e.prev = 19, e.t0 = e.catch(9), console.error(e.t0);

              case 22:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 9, 19 ] ]);
    }));
    return function() {
        return r.apply(this, arguments);
    };
}();

module.exports = i;