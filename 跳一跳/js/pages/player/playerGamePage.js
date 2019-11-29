function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var o = t[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, i, o) {
        return i && e(t.prototype, i), o && e(t, o), t;
    };
}(), i = function() {
    function i(t) {
        e(this, i), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.viewer = this.game.viewer, this.name = "game";
    }
    return t(i, [ {
        key: "show",
        value: function(e) {
            this.UI.showScore(), this.UI.scoreText.obj.position.y = 21, this.UI.scoreText.obj.position.x = -13, 
            this.UI.scoreText.changeStyle({
                textAlign: "left"
            }), this.viewer.open(), e && e.usingProp && this.UI.showProp(e.usingProp);
        }
    }, {
        key: "hide",
        value: function() {
            this.viewer.close(), this.UI.hideProp(), this.UI.hideAdAvator(), this.UI.hideScore();
        }
    } ]), i;
}();

exports.default = i;