function r(r) {
    if (Array.isArray(r)) {
        for (var t = 0, e = Array(r.length); t < r.length; t++) e[t] = r[t];
        return e;
    }
    return Array.from(r);
}

var t = require("../../../cwx/cwx"), e = require("../common/model"), i = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("../common/util")), n = t.cwx.train, a = {
    data: {
        primeRecommendTrainList: [],
        primeOtherTrainList: [],
        chooseTrainNumberList: [],
        isTieyou: t.cwx.config.isTieyou
    },
    onLoad: function(r) {
        this.TrainNumber = r.TrainNumber, this.data.isTieyou ? i.default.setNavigationBarColor({
            backgroundColor: "#fc6351",
            frontColor: "#ffffff"
        }) : i.default.setNavigationBarColor({
            backgroundColor: "#5495e6",
            frontColor: "#ffffff"
        }), this.setData({
            chooseTrainNumberList: n.chosenTrainList || []
        });
        var t = this.getGrabTicketRecommendTrainList(r);
        this.getGrabTicketTrainList(r, t);
    },
    getGrabTicketTrainList: function(t, n) {
        var a = this, o = t.DepartStation, s = void 0 === o ? "" : o, u = t.ArriveStation, c = void 0 === u ? "" : u, m = t.DepartureDate, d = void 0 === m ? "" : m;
        i.default.showLoading();
        var f = {
            DepartStation: s,
            ArriveStation: c,
            DepartDate: d
        };
        (0, e.TrainListModel)(f, function(t) {
            var e = t.ResponseBody.TrainInfoList, o = e = i.default.handleTrains(e, f.DepartDate), s = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1], i = arguments[2], n = t.map(function(r) {
                    return r.TrainNumber;
                }), o = [].concat(r(n), r(e.split(","))), s = i.filter(function(r) {
                    return !(o.indexOf(r.TrainNumber) > -1);
                });
                s.forEach(function(r) {
                    r.current = a.hasTrain(a.data.chooseTrainNumberList, r);
                });
                var u = function() {
                    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = {}, e = !0, i = !1, n = void 0;
                    try {
                        for (var a, o = r[Symbol.iterator](); !(e = (a = o.next()).done); e = !0) {
                            var s = a.value, u = s.TrainNumber, c = s.SeatList;
                            t[u] = c;
                        }
                    } catch (r) {
                        i = !0, n = r;
                    } finally {
                        try {
                            !e && o.return && o.return();
                        } finally {
                            if (i) throw n;
                        }
                    }
                    return t;
                }(i);
                t.forEach(function(r) {
                    u[r.TrainNumber] && (r.SeatList = u[r.TrainNumber]);
                }), a.setData({
                    primeOtherTrainList: s,
                    primeRecommendTrainList: t
                });
            };
            n.then(function() {
                s(a.data.primeRecommendTrainList, a.TrainNumber, o);
            }).catch(function(r) {
                s(a.data.primeRecommendTrainList, a.TrainNumber, o);
            });
        }, function(r) {}, function() {
            i.default.hideLoading();
        });
    },
    confirm: function() {
        var r = this.data.chooseTrainNumberList;
        n.chosenTrainList = r, this.navigateBack();
    },
    getGrabTicketRecommendTrainList: function(r) {
        var n = this, a = r.DepartStation, o = void 0 === a ? "" : a, s = r.ArriveStation, u = void 0 === s ? "" : s, c = r.DepartureDates, m = void 0 === c ? "" : c, d = r.TrainNumber, f = void 0 === d ? "" : d, T = r.SeatName, h = void 0 === T ? "" : T, l = i.default.getDeferred(), L = {
            DepartStation: o,
            ArriveStation: u,
            DepartDates: m,
            TrainNumbers: f,
            SeatNames: h,
            Channel: "ctriph5",
            FromType: 0
        };
        return (0, e.GrabTicketRecommendTrainListModel)(L, function(r) {
            1 == r.RetCode && t._.isArray(r.RecommendTrainList) ? (r.RecommendTrainList.forEach(function(r) {
                r.current = n.hasTrain(n.data.chooseTrainNumberList, r);
            }), n.setData({
                primeRecommendTrainList: r.RecommendTrainList
            }), l.resolve(r.RecommendTrainList)) : l.resolve([]);
        }, function(r) {
            console.log(r), l.reject(r);
        }, function() {}), l.promise;
    },
    hasTrain: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
        return r.map(function(r) {
            return r.TrainNumber;
        }).indexOf(t.TrainNumber) > -1;
    },
    toggleRecommendTrain: function(r) {
        var t = r.currentTarget.dataset.index, e = this.data.primeRecommendTrainList, n = e[t];
        if (!n.current && this.data.chooseTrainNumberList.length >= 11) return i.default.showToast("最多选择11个");
        n.current = !n.current, this.setData({
            chooseTrainNumberList: this.toggleList(this.data.chooseTrainNumberList, n),
            primeRecommendTrainList: e
        });
    },
    toggleOtherTrain: function(r) {
        var t = r.currentTarget.dataset.index, e = this.data.primeOtherTrainList, n = e[t];
        if (!n.current && this.data.chooseTrainNumberList.length >= 11) return i.default.showToast("最多选择11个");
        n.current = !n.current, this.setData({
            chooseTrainNumberList: this.toggleList(this.data.chooseTrainNumberList, n),
            primeOtherTrainList: e
        });
    },
    toggleList: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], e = t.TrainNumber, i = (t.SeatList, 
        r.map(function(r) {
            return r.TrainNumber;
        }).indexOf(e));
        return -1 !== i ? r.splice(i, 1) : r.push(t), r;
    }
};

(0, t.CPage)(a);