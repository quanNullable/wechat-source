function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var a = t[o];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, o, a) {
        return o && e(t.prototype, o), a && e(t, a), t;
    };
}(), o = function() {
    function o(t) {
        e(this, o), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.name = "relayRoom";
    }
    return t(o, [ {
        key: "show",
        value: function(e) {
            var t = {
                players: e.playerlist,
                imgdata: e.room_wxa_code || "",
                game_status: e.game_status || 0,
                my_seat_no: e.my_seat_no,
                room_owner_seat: e.room_owner_seat,
                game_level: e.game_level || 0
            };
            console.log("显示房间数据"), this.full2D.showRelayRoom(t);
        }
    }, {
        key: "hide",
        value: function() {
            ((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).hide2D || !1) && this.full2D.hide2D();
        }
    } ]), o;
}();

exports.default = o;