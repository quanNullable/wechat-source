function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(a, i) {
                try {
                    var s = r[a](i), o = s.value;
                } catch (e) {
                    return void t(e);
                }
                if (!s.done) return Promise.resolve(o).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(o);
            }
            return n("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), t = require("./promisify.js").obj, n = t(wx.getStorage), a = t(wx.setStorage), i = {
    getItem: function(e) {
        return n({
            key: e
        });
    },
    setItem: function(e, r) {
        return a({
            key: e,
            data: r
        });
    }
}, s = require("./change-url-arg.js");

module.exports = {
    setUrl: function() {
        var t = e(r.default.mark(function e(t) {
            var n, a, o, u, c, f;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, e.next = 3, i.getItem("wx_set_info");

                  case 3:
                    return n = e.sent, a = n.data, e.next = 7, i.getItem("user");

                  case 7:
                    if (o = e.sent, u = o.data, c = a.split("=")[0], f = a.split("=")[1], !(c.length > 0 && c === String(u.user_id))) {
                        e.next = 17;
                        break;
                    }
                    t = s(t, "ui", c), t = s(t, "region_id", f.split(",")[0]), t = s(t, "region_version", f.split(",")[1]), 
                    e.next = 18;
                    break;

                  case 17:
                    throw new Error("header中userid和本地storage中userid不一致");

                  case 18:
                    e.next = 24;
                    break;

                  case 20:
                    e.prev = 20, e.t0 = e.catch(0), t = t.indexOf("?") > -1 ? t.split("?")[0] : t, console.log(e.t0);

                  case 24:
                    return e.abrupt("return", t);

                  case 25:
                  case "end":
                    return e.stop();
                }
            }, e, void 0, [ [ 0, 20 ] ]);
        }));
        return function(e) {
            return t.apply(this, arguments);
        };
    }(),
    responseHeaderSet: function(e) {
        var r = JSON.parse(e.X_RegionInfo), t = r.ri, n = r.rv, a = r.s, i = r.ui;
        switch (a) {
          case 0:
            break;

          case 1:
            wx.setStorage({
                key: "wx_set_info",
                data: i + "=" + t + "," + n
            });
            break;

          case 2:
            wx.removeStorage({
                key: "wx_set_info"
            });
        }
    }
};