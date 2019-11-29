function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), n = function() {
    function n(t) {
        e(this, n), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.name = "loading";
    }
    return t(n, [ {
        key: "show",
        value: function(e) {
            this.full2D.showRelayRoom({
                players: [],
                imgdata: "",
                game_status: 0,
                my_seat_no: e ? 1 : 0,
                room_owner_seat: 1
            });
        }
    }, {
        key: "hide",
        value: function() {
            this.full2D.hide2D();
        }
    } ]), n;
}();

exports.default = n;