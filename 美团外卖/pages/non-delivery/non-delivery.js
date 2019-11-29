function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new a(function(e, t) {
            function n(i, o) {
                try {
                    var s = r[i](o), u = s.value;
                } catch (e) {
                    return void t(e);
                }
                if (!s.done) return a.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }
            return n("next");
        });
    };
}

function r(e, r, t) {
    return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../npm/@hfe/mp-owl/lib/index.js"), i = require("../../api/index.js").nonDelivery, a = require("../../npm/promise-polyfill/promise.js"), o = require("../base.js")({
    data: {
        keyword: "",
        poilist: []
    },
    onClickPoilistActvs: function(e) {
        var t = e.currentTarget.dataset.index, n = this.data.poilist[t]._actvs_expand;
        this.setData(r({}, "poilist[" + t + "]._actvs_expand", !n));
    },
    load: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var n, a, o;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, e.next = 3, i({
                        keyword: r.keyword,
                        page_index: 0,
                        page_size: 20
                    });

                  case 3:
                    n = e.sent, (a = n.poi_nondelivery_list).forEach(function(e) {
                        e.primitiveDistance = 0;
                    }), 0 !== a.length ? r.setData({
                        poilist: a
                    }) : r.error({
                        message: "暂无结果"
                    }), e.next = 13;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e.catch(0), o = e.t0.message, r.error({
                        message: o
                    });

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 0, 9 ] ]);
        }))();
    },
    onLoad: function(e) {
        var r = e.keyword;
        this.keyword = r, console.log("搜索词" + r), this.load(), this.loading(!1);
    }
});

(0, n.page)(o);