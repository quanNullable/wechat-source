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
}(), n = function() {
    function n(t) {
        var i = t.game, o = t.onReturn, r = t.onShare, s = t.onShareSkin, a = t.bottle_skin, h = void 0 === a ? {} : a;
        e(this, n), this.game = i, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.onShare = r, this.onReturn = o, this.bottle_skin = h, 
        this.onShareSkin = s;
    }
    return t(n, [ {
        key: "show",
        value: function(e, t) {
            this.full2D.showGetNewSkin({
                poster: this.bottle_skin.poster,
                desc: this.bottle_skin.desc,
                onReturn: this.onReturn,
                onShareGift: this.onShare,
                onShareSkin: this.onShareSkin
            });
        }
    }, {
        key: "hide",
        value: function() {
            this.game.full2D.hide2D();
        }
    } ]), n;
}();

exports.default = n;