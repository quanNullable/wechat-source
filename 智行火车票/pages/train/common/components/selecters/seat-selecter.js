Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
};

exports.default = {
    data: {
        showType: "",
        otherTrainsSeatsArr: [],
        otherSeats: [],
        otherSeatStr: "",
        disabledSeat: "",
        disabledSeats: []
    },
    methods: {
        showOtherSeat: function(e, t) {
            var a = this.data.otherTrainsSeatsArr;
            a.forEach(function(r, s) {
                t.indexOf(r.SeatName) >= 0 ? a[s].selected = !0 : a[s].selected = !1, e.indexOf(r.SeatName) >= 0 ? a[s].disabled = !0 : a[s].disabled = !1;
            }), this.setData({
                otherTrainsSeatsArr: a,
                showType: "otherSeats"
            });
        },
        selectSeat: function(e) {
            var t = e.currentTarget.dataset.index, a = this.data.otherTrainsSeatsArr, r = a[t];
            r.SeatName == this.data.disabledSeat || this.data.disabledSeats.indexOf(r.SeatName) > -1 || (r.selected = !r.selected, 
            this.setData({
                otherTrainsSeatsArr: a
            }));
        },
        confirmChooseSeat: function() {
            var e = [];
            this.data.otherTrainsSeatsArr.forEach(function(t) {
                t.selected && e.push(t.SeatName);
            }), this.setData({
                otherSeats: e,
                otherSeatStr: e.join(",")
            }), this.resetPrice && this.resetPrice(), this.hideBackDrop && this.hideBackDrop();
        },
        cancelChooseSeat: function() {
            this.hideBackDrop && this.hideBackDrop();
        },
        getOtherTrainsSeats: function(e, t) {
            var a = function(e, t) {
                e[t.SeatName] ? parseFloat(t.SeatPrice) > e[t.SeatName].SeatPrice && (e[t.SeatName] = {
                    SeatPrice: parseFloat(t.SeatPrice)
                }) : e[t.SeatName] = {
                    SeatPrice: parseFloat(t.SeatPrice)
                };
            };
            return (t ? e.concat(t) : e).map(function(e) {
                return e.SeatList;
            }).reduce(function(e, t) {
                return t.forEach(function(t) {
                    a(e, t);
                }), e;
            }, {});
        },
        getOtherTrainsSeatsArr: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return t.forEach(function(e) {
                a[e] && (a[e].selected = !0);
            }), Object.keys(a).map(function(t) {
                return e({
                    SeatName: t,
                    selected: !1
                }, a[t]);
            });
        }
    }
};