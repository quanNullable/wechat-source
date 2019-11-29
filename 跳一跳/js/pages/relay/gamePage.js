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
        e(this, i), this.game = t, this.name = "game", this.full2D = this.game.full2D, this.UI = this.game.UI;
    }
    return t(i, [ {
        key: "show",
        value: function() {
            this.UI.scoreText.obj.position.x = -13.8, this.UI.scoreText.obj.position.y = 26, 
            this.UI.scoreText.obj.scale.set(.8, .8, .8), this.UI.scoreText.changeStyle({
                textAlign: "left"
            }), this.UI.showScore();
        }
    }, {
        key: "hide",
        value: function() {
            this.full2D.hide2D(), this.UI.hideScore(), this.UI.scoreText.obj.position.y = 21, 
            this.UI.scoreText.obj.position.x = -13, this.UI.scoreText.obj.scale.set(1, 1, 1), 
            this.UI.scoreText.changeStyle({
                textAlign: "left"
            });
        }
    }, {
        key: "hideScore",
        value: function() {
            this.UI.hideScore(), this.UI.scoreText.obj.position.y = 21, this.UI.scoreText.obj.position.x = -13, 
            this.UI.scoreText.changeStyle({
                textAlign: "left"
            });
        }
    } ]), i;
}();

exports.default = i;