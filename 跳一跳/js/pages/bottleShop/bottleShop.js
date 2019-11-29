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
}(), n = (require("../../lib/animation"), function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    t.default = e;
}(require("../../lib/three")), function() {
    function n(t) {
        var i = t.game, r = t.onClickUse, o = t.onReturn;
        e(this, n), this.game = i, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.onReturn = o, this.onClickUse = r;
    }
    return t(n, [ {
        key: "show",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], n = {
                id: 0,
                img: "res/defaultBottlePoster.png",
                type: 0,
                unlock_wording: "",
                use_status: 1,
                property: {}
            };
            e.find(function(e) {
                return 0 === e.id;
            }) || (e = [ n ].concat(e)), this.full2D.showSkin({
                id: t,
                skin_list: e,
                onClickUse: this.onClickUse,
                onReturn: this.onReturn
            });
        }
    }, {
        key: "setSelectSkin",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            this.full2D.updateSkin && this.full2D.updateSkin({
                id: e
            });
        }
    }, {
        key: "hide",
        value: function() {
            this.game.full2D.hide2D();
        }
    } ]), n;
}());

exports.default = n;