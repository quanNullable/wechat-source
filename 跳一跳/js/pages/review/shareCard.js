function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, i) {
        for (var o = 0; o < i.length; o++) {
            var t = i[o];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(i, o, t) {
        return o && e(i.prototype, o), t && e(i, t), i;
    };
}(), o = (require("../pages2d/base"), require("../../lib/animation"), require("../../config"), 
function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (i[o] = e[o]);
    i.default = e;
}(require("../../lib/three")), function() {
    function o(i) {
        var t = i.game, a = i.onShare, n = i.week_best_score, r = i.onSave, s = i.headimg, h = i.onCloseSharePage, u = i.maxBonusScore, c = void 0 === u ? 1 : u, l = i.succeedTime, f = void 0 === l ? 0 : l;
        e(this, o), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.onShare = a, this.onSave = r, this.week_best_score = n, 
        this.headimg = s, this.name = "reviewSharePage", this.maxBonusScore = c, this.succeedTime = f, 
        this.onCloseSharePage = h;
    }
    return i(o, [ {
        key: "show",
        value: function(e) {
            var i = this, o = e.qrcode, t = void 0 === o ? "" : o, a = e.open_playback_id, n = void 0 === a ? "" : a;
            this.game.full2D.showRecordSharePage({
                headimg: this.headimg,
                score: this.week_best_score,
                combo: this.maxBonusScore,
                blocks: this.succeedTime,
                qrcode: t,
                onClose: function() {
                    i.game.full2D.hide2D(), i.onCloseSharePage();
                },
                onSave: function(e) {
                    i.onSave(e);
                },
                onShare: function() {
                    i.onShare(n);
                }
            });
        }
    }, {
        key: "hide",
        value: function() {
            this.stopAnimation(), this.game.full2D.hide2D(), this.hide3D();
        }
    } ]), o;
}());

exports.default = o;