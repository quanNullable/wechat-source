function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../lib/mue/eventcenter")), i = require("../../config"), r = function() {
    function r(t) {
        e(this, r), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.name = "startPage";
    }
    return t(r, [ {
        key: "show",
        value: function(e) {
            this.full2D.showRelayBeginner();
        }
    }, {
        key: "hide",
        value: function() {
            n.default.emitSync(i.EVENT.SKIP_RELAY_GUIDE), this.full2D.hide2D();
        }
    } ]), r;
}();

exports.default = r;