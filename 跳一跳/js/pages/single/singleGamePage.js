function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var o = i[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(i, t, o) {
        return t && e(i.prototype, t), o && e(i, o), i;
    };
}(), t = function() {
    function t(i) {
        e(this, t), this.game = i, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.viewer = this.game.viewer, this.name = "game";
    }
    return i(t, [ {
        key: "show",
        value: function(e) {
            var i = this.model.is_from_wn, t = this.model.firstBlood;
            i || this.game.guider || (t ? this.viewer.lookers.showLookers({
                avaImg: !1,
                icon: !0,
                wording: !0
            }) : this.viewer.open()), this.UI.showScore(), this.UI.scoreText.obj.position.y = 21, 
            this.UI.scoreText.obj.position.x = -13, this.UI.scoreText.changeStyle({
                textAlign: "left"
            }), e && e.usingProp && this.UI.showProp(e.usingProp);
        }
    }, {
        key: "hide",
        value: function() {
            this.viewer.close(), this.UI.hideScore(), this.UI.hideProp(), this.UI.hideAdAvator();
        }
    }, {
        key: "hideLookersShare",
        value: function() {
            this.model.firstBlood && (this.model.setFirstBlood(!1), this.viewer.open());
        }
    } ]), t;
}();

exports.default = t;