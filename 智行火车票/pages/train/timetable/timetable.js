var t = require("../../../cwx/cwx"), a = require("../common/model"), i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../common/util")), o = (t.cwx.train, {
    data: {
        stopList: [],
        train: {},
        fromStation: "",
        toStation: ""
    },
    onLoad: function(t) {
        var a = t.data, o = a.fromStation, e = void 0 === o ? "" : o, d = a.toStation, n = void 0 === d ? "" : d, r = a.date, u = void 0 === r ? "" : r, s = a.TrainNumber, c = void 0 === s ? "" : s;
        this.setData({
            fromStation: e,
            toStation: n,
            date: u,
            TrainNumber: c
        }), this.loadData(), i.default.setTitle(c + " 时刻表");
    },
    loadData: function() {
        var t = this;
        i.default.showLoading();
        var o = {
            checi: this.data.TrainNumber,
            date: this.data.date
        };
        (0, a.TrainStopModel)(o, function(a) {
            i.default.hideLoading(), 200 == a.code && t.setData({
                stopList: a.data.stations,
                loadingHidden: !0
            });
        }, function(t) {
            i.default.hideLoading();
        });
    }
});

(0, t.CPage)(o);