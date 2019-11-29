function e(e) {
    return function() {
        var i = e.apply(this, arguments);
        return new t(function(e, r) {
            function a(n, l) {
                try {
                    var s = i[n](l), u = s.value;
                } catch (e) {
                    return void r(e);
                }
                if (!s.done) return t.resolve(u).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(u);
            }
            return a("next");
        });
    };
}

var i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../npm/babel-runtime/regenerator/index.js")), r = require("../../../api/index.js").orderDeliverTime, a = require("../../../utils/object-assign.js"), t = require("../../../npm/promise-polyfill/promise.js"), n = {
    hideArrivalTime: function() {
        this.setData({
            "arrivalTime.show": !1
        });
    },
    onClickArrivalTime: function() {
        var a = this;
        return e(i.default.mark(function e() {
            var t, n, l, s, u, o, c, m, v, d, x, f, p, T, h, _, k, b;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.lxArrivalTimeClick(), e.prev = 1, a.loading(!0), t = a.data.poi_id, e.next = 6, 
                    r({
                        wmPoiId: t,
                        wm_poi_id: t
                    });

                  case 6:
                    n = e.sent, l = n.expected_arrival_timelist, s = a.data.previewData.expected_arrival_info.unixtime, 
                    u = [], o = 0, c = l[0] && l[0].timelist || [], m = [], v = 0, d = l.length;

                  case 14:
                    if (!(v < d)) {
                        e.next = 35;
                        break;
                    }
                    if (x = l[v], f = x.status, p = x.date, T = x.info, h = x.timelist, u.push(p), 0 !== f) {
                        e.next = 31;
                        break;
                    }
                    m.push(h), _ = h.length - 1;

                  case 20:
                    if (!(_ > -1)) {
                        e.next = 29;
                        break;
                    }
                    if ((k = h[_]).unixtime !== s) {
                        e.next = 26;
                        break;
                    }
                    return o = v, c = h, e.abrupt("break", 29);

                  case 26:
                    --_, e.next = 20;
                    break;

                  case 29:
                    e.next = 32;
                    break;

                  case 31:
                    m.push(T);

                  case 32:
                    ++v, e.next = 14;
                    break;

                  case 35:
                    a.expected_arrival_timelist = m, a.setData({
                        "arrivalTime.show": !0,
                        "arrivalTime.days": u,
                        "arrivalTime.dayIndex": o,
                        "arrivalTime.selectedDayIndex": o,
                        "arrivalTime.unixtime": s,
                        "arrivalTime.arrival_timelist": c
                    }), e.next = 43;
                    break;

                  case 39:
                    e.prev = 39, e.t0 = e.catch(1), b = e.t0.message, a.alert({
                        message: b
                    });

                  case 43:
                    a.loading(!1);

                  case 44:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 1, 39 ] ]);
        }))();
    },
    onClickArrivalTimeDay: function(e) {
        var i = e.currentTarget.dataset.index, r = this.expected_arrival_timelist[i], t = {
            "arrivalTime.dayIndex": i,
            "arrivalTime.scrollTop": 0
        };
        "string" == typeof r ? a(t, {
            "arrivalTime.arrival_timelist": null,
            "arrivalTime.info": r
        }) : a(t, {
            "arrivalTime.arrival_timelist": r,
            "arrivalTime.info": null
        }), this.setData(t);
    },
    onClickArrivalTimeItem: function(e) {
        var i = e.currentTarget.dataset.unixtime;
        this.setData({
            "arrivalTime.show": !1,
            formValidState: ""
        }), this.refresh({
            expected_arrival_time: i
        });
    }
};

module.exports = function(e) {
    return e.data.arrivalTime = {
        scrollTop: 0,
        show: !1,
        info: null,
        dayIndex: 0,
        selectedDayIndex: 0,
        unixtime: 0,
        days: [],
        arrival_timelist: []
    }, e.expected_arrival_timelist = [], a(e, n);
};