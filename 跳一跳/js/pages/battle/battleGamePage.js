function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), i = function() {
    function i(t) {
        e(this, i), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.viewer = this.game.viewer, this.name = "game";
    }
    return t(i, [ {
        key: "show",
        value: function() {
            this.UI.showScore(), this.UI.scoreText.obj.position.y = 21, this.UI.scoreText.obj.position.x = -13, 
            this.UI.scoreText.changeStyle({
                textAlign: "left"
            });
        }
    }, {
        key: "hide",
        value: function() {
            this.UI.hideScore();
        }
    } ]), i;
}();

exports.default = i;