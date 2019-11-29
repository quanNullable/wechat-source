function e(e) {
    var t = 0;
    return [ "A", "B", "C", "D", "F" ].forEach(function(s) {
        e.row0[s] && t++, e.row1[s] && t++;
    }), t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: {
        seatPositionInfo: {
            currentSeatName: "",
            pasNumber: 0,
            isSecondRowVisible: !1,
            selectedSeats: {
                row0: {
                    A: !1,
                    B: !1,
                    C: !1,
                    D: !1,
                    F: !1
                },
                row1: {
                    A: !1,
                    B: !1,
                    C: !1,
                    D: !1,
                    F: !1
                }
            },
            selectedSeatsArray: [],
            toggleSeatPositionFn: "seatChoose-toggle"
        }
    },
    methods: {
        "seatChoose-toggle": function(t) {
            var s = t.target.dataset.p, o = t.target.dataset.row;
            if (s && o) {
                var a = this.data.seatPositionInfo.selectedSeatsArray, i = {}, n = "row" + o + "." + s, r = !this.data.seatPositionInfo.selectedSeats["row" + o]["" + s];
                if (i["seatPositionInfo.selectedSeats." + n] = r, r) e(this.data.seatPositionInfo.selectedSeats) >= this.data.seatPositionInfo.pasNumber && a.length >= this.data.seatPositionInfo.pasNumber && (i["seatPositionInfo.selectedSeats." + a.splice(0, 1)] = !1), 
                a.push(n); else {
                    var d = a.indexOf(n);
                    d > -1 && a.splice(d, 1);
                }
                i["seatPositionInfo.selectedSeatsArray"] = a, this.setData(i);
            }
        },
        "seatChoose-reset": function() {
            var e = this.data.seatPositionInfo.selectedSeats;
            [ "A", "B", "C", "D", "F" ].forEach(function(t) {
                e.row0[t] = !1, e.row1[t] = !1;
            }), this.setData({
                "seatPositionInfo.selectedSeats": e,
                "seatPositionInfo.selectedSeatsArray": []
            });
        }
    }
};