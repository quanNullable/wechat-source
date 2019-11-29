function t(t) {
    return function() {
        var i = t.apply(this, arguments);
        return new r(function(t, e) {
            function n(o, a) {
                try {
                    var s = i[o](a), l = s.value;
                } catch (t) {
                    return void e(t);
                }
                if (!s.done) return r.resolve(l).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(l);
            }
            return n("next");
        });
    };
}

function i(t, i, e) {
    return i in t ? Object.defineProperty(t, i, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = e, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../utils/poi-list-filter.js"), r = require("../../npm/promise-polyfill/promise.js"), o = require("../../utils/object-assign.js"), a = {
    poilistCancelLoading: function() {
        this.poilistBlocking = !1, this.poilistDebounce += 1;
    },
    onClickPoilistActvs: function(t) {
        var e = t.currentTarget.dataset.index, n = this.data.poilist[e]._actvs_expand;
        this.setData(i({}, "poilist[" + e + "]._actvs_expand", !n));
    },
    poilistLoad: function(i) {
        var r = this;
        return t(e.default.mark(function t() {
            var o, a, s, l, u, c, p;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (o = r.poilistDebounce, !(a = r.poilistBlocking)) {
                        t.next = 3;
                        break;
                    }
                    return t.abrupt("return", {
                        valid: !1
                    });

                  case 3:
                    return r.poilistBlocking = !0, s = void 0, t.prev = 5, t.next = 8, r._poilistLoad(i);

                  case 8:
                    s = t.sent, t.next = 16;
                    break;

                  case 11:
                    if (t.prev = 11, t.t0 = t.catch(5), o !== r.poilistDebounce) {
                        t.next = 16;
                        break;
                    }
                    throw r.poilistBlocking = !1, t.t0;

                  case 16:
                    if (o !== r.poilistDebounce) {
                        t.next = 25;
                        break;
                    }
                    return l = s, u = l.poilist, c = i ? n(u) : r.data.poilist.concat(n(u)), s.poilist = c, 
                    s.valid = !0, p = {
                        poilist: c
                    }, r.poilistBlocking = !1, r.setData(p), t.abrupt("return", s);

                  case 25:
                    return t.abrupt("return", {
                        valid: !1
                    });

                  case 26:
                  case "end":
                    return t.stop();
                }
            }, t, r, [ [ 5, 11 ] ]);
        }))();
    }
};

module.exports = function(t) {
    var i = t.data, e = t.onClickPoilistItem;
    return i.poilist = [], t.onClickPoilistItem = function(t) {
        e && e.call(this, t), this.onClickNavigator(t);
    }, t.poilistDebounce = 0, t.poilistBlocking = !1, o(t, a);
};