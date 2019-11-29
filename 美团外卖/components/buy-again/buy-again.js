function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new i(function(t, r) {
            function n(s, a) {
                try {
                    var u = e[s](a), o = u.value;
                } catch (t) {
                    return void r(t);
                }
                if (!u.done) return i.resolve(o).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(o);
            }
            return n("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), r = require("../../actions/cart.js").set, n = require("../../actions/purchase.js").setRecipient, i = require("../../npm/promise-polyfill/promise.js"), s = require("../../api/index.js").getFoodlist, a = function(t) {
    if (!t || 0 === t.length) return [];
    for (var e = t.length, r = [], n = 0; n < e; ++n) {
        var i = t[n], s = i.status, a = i.skus;
        0 === s && a.length > 0 && a.forEach(function(t) {
            if (0 === t.status) {
                var e = t.count, n = t.attrs, i = t.id;
                r.push({
                    count: e,
                    attrs: n,
                    id: i
                });
            }
        });
    }
    return r;
}, u = function(t, e, i, s, u) {
    getApp().restaurantBuyAgain = {
        message: u
    };
    var o = t.store, c = s.caution, d = s.foodlist, f = a(d);
    o.dispatch(r({
        poiID: e,
        cart: f,
        foodlist: d
    })), o.dispatch(n({
        caution: c
    })), wx.navigateTo({
        url: "/pages/restaurant/restaurant?poi_id=" + e + "&hash_id=" + i
    });
}, o = function() {
    var r = t(e.default.mark(function t(r) {
        var n, i, a, o = r.currentTarget.dataset, c = o.id, d = o.poi;
        return e.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.prev = 0, "pages/orders/orders" === this.route && this.lxBuyAgainClick(d), 
                t.next = 4, s({
                    id: c
                });

              case 4:
                n = t.sent, u(this, d, c, n, ""), t.next = 14;
                break;

              case 8:
                t.prev = 8, t.t0 = t.catch(0), i = t.t0.code, n = t.t0.data, a = t.t0.message, 2 === i ? this.alert({
                    message: "商家已下线，无法下单。"
                }) : 3 === i ? this.alert({
                    message: "商家休息中，暂时无法下单。"
                }) : n && n.foodlist ? u(this, d, c, n, a) : this.alert({
                    message: a,
                    textOK: "知道了"
                });

              case 14:
                this.loading(!1);

              case 15:
              case "end":
                return t.stop();
            }
        }, t, this, [ [ 0, 8 ] ]);
    }));
    return function(t) {
        return r.apply(this, arguments);
    };
}();

module.exports = function(t) {
    t.onClickBuyAgain = o;
};