function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
}, n = function() {
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
}(), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../lib/mue/eventcenter")), o = require("../../config"), r = function() {
    function r(t, n, i) {
        e(this, r), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.name = "startPage", this.onMsg = n, this.onSkin = i;
    }
    return n(r, [ {
        key: "show",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.hideRank = this.model.firstBlood, this.full2D && this.full2D.showStartPage(t({}, e, {
                onBottleSkin: this.onSkin.bind(this),
                onMsgBox: this.onMsg.bind(this)
            })), this.model.firstBlood = !1, i.default.emit(o.EVENT.AFTER_SHOWN_START_PAGE, {});
        }
    }, {
        key: "upDateRedPot",
        value: function() {
            this.full2D.updateStartPage();
        }
    }, {
        key: "hide",
        value: function() {
            this.full2D.hide2D();
        }
    } ]), r;
}();

exports.default = r;