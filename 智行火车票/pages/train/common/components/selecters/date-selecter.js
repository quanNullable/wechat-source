function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../cDate")), a = t(require("../../util"));

exports.default = {
    data: {
        showType: "",
        otherDates: [],
        otherTrainDates: [],
        otherDateStr: "",
        disabledDate: "",
        disabledDates: []
    },
    methods: {
        getOtherTrainDates: function(t) {
            for (var a = new e.default(t), r = [], o = [], s = 0; s < 2; s++) {
                var i = a.getTime() - 864e5 * (s + 1);
                if ((i = new Date(i)) <= new Date().getTime()) {
                    var n = a.getTime() + 864e5 * (s + 1), d = new e.default(n), h = d.format("n月j日");
                    o.push({
                        millinSeconds: n,
                        monthDayStr: h,
                        dayStr: d.format("Y-m-d"),
                        weekDay: d.format("D") || d.format("w")
                    });
                } else {
                    var D = a.getTime() + 864e5 * (s + 1), f = new e.default(D), c = f.format("n月j日"), m = a.getTime() - 864e5 * (s + 1), l = new e.default(m), u = l.format("n月j日");
                    o.push({
                        millinSeconds: D,
                        monthDayStr: c,
                        dayStr: f.format("Y-m-d"),
                        weekDay: f.format("D") || f.format("w")
                    }), r.push({
                        millinSeconds: m,
                        monthDayStr: u,
                        dayStr: l.format("Y-m-d"),
                        weekDay: l.format("D") || l.format("w")
                    });
                }
            }
            r = r.reverse();
            var y = {
                millinSeconds: a.getTime(),
                monthDayStr: a.format("n月j日"),
                dayStr: a.format("Y-m-d"),
                weekDay: a.format("D") || a.format("w")
            };
            return r.concat(y).concat(o);
        },
        showOtherDates: function(t, e) {
            var a = this.data.otherTrainDates;
            a.forEach(function(r, o) {
                e.indexOf(r.dayStr) >= 0 ? a[o].selected = !0 : a[o].selected = !1, t.indexOf(r.monthDayStr) >= 0 ? a[o].disabled = !0 : a[o].disabled = !1;
            }), this.setData({
                showType: "otherDates",
                otherTrainDates: a
            });
        },
        selectDate: function(t) {
            var e = this.data.otherTrainDates, r = e[t.currentTarget.dataset.index];
            if (!(r.monthDayStr == this.data.disabledDate || this.data.disabledDates.indexOf(r.monthDayStr) > -1)) {
                var o = this.data.otherTrainDates.filter(function(t) {
                    return t.selected;
                });
                !r.selected && o.length > 2 ? a.default.showModal({
                    m: "最多可选3天"
                }) : (r.selected = !r.selected, this.setData({
                    otherTrainDates: e
                }));
            }
        },
        confirmChooseDate: function() {
            var t = [], e = [];
            this.data.otherTrainDates.forEach(function(a) {
                a.selected && (t.push(a.dayStr), e.push(a.monthDayStr));
            }), this.setData({
                otherDates: t,
                otherDateStr: e.toString()
            }), this.hideBackDrop && this.hideBackDrop();
        },
        cancelChooseDate: function() {
            var t = this.data.otherDates;
            this.data.otherTrainDates.forEach(function(e) {
                t.indexOf(e.dayStr) ? e.selected = !0 : e.selected = !1;
            }), this.hideBackDrop && this.hideBackDrop();
        }
    }
};