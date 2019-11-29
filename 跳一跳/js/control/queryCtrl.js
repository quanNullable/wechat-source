function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var i = t[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, r, i) {
        return r && e(t.prototype, r), i && e(t, i), t;
    };
}(), r = function() {
    function r(t) {
        e(this, r), this.game = t, this.model = this.game.gameModel, this.gameCtrl = this.game.gameCtrl, 
        this.gameView = this.game.gameView;
    }
    return t(r, [ {
        key: "identifyMode",
        value: function(e) {
            if (e.query && e.query.hasOwnProperty("mode")) switch (e.query.mode) {
              case "groupShare":
                e.shareTicket ? this.model.setMode("groupShare") : (this.gameCtrl.identifyModeErr("获取群信息失败"), 
                this.model.setMode("single"));
                break;

              case "battle":
                e.query.pkId ? this.model.setMode("battle") : (this.gameCtrl.identifyModeErr("获取PK信息失败"), 
                this.model.setMode("single"));
                break;

              case "observe":
                e.query.gameId ? this.model.setMode("observe") : (this.gameCtrl.identifyModeErr("获取围观信息失败"), 
                this.model.setMode("single"));
                break;

              case "relay":
                e.query.room_id && e.query.router_id && e.query.version ? this.model.setMode("relay") : this.model.setMode("single");
                break;

              case "reviewPage":
                e.query.open_playback_id ? this.model.setMode("reviewPage") : this.model.setMode("single");
                break;

              case "getGiftPage":
                e.query.id ? (this.model.setMode("getGiftPage"), this.game.reporter.rpClickComeInSkinShare()) : this.model.setMode("single");
                break;

              default:
                this.model.setMode("single");
            } else this.model.setMode("single");
        }
    } ]), r;
}();

exports.default = r;