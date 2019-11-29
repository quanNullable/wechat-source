function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
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
}(), i = (e(require("../pages/group/groupPage")), e(require("../network/network")), 
function() {
    function e(r, i) {
        t(this, e), this.name = "groupShare", this.game = r, this.gameCtrl = this.game.gameCtrl, 
        this.model = this.game.gameModel, this.view = this.game.gameView, this.netWorkCtrl = this.gameCtrl.netWorkCtrl, 
        this.modeCtrl = i;
    }
    return r(e, [ {
        key: "init",
        value: function(e) {
            var t = this;
            this.model.getSessionId() ? this.afterLogin(!0, e) : this.netWorkCtrl.netWorkLogin(function(r) {
                t.afterLogin(r, e);
            });
        }
    }, {
        key: "afterLogin",
        value: function(e, t) {
            var r = this;
            e && !this.gameCtrl.reviewCtrl.isInThisPage && t && t.query && "reviewPage" == t.query.mode && (wx.showLoading(), 
            setTimeout(function() {
                r.gameCtrl.reviewCtrl.init({
                    user_data: {
                        playback_id: t.query.open_playback_id,
                        is_self: !1,
                        headimg: t.query.headimg
                    },
                    onHide: function() {
                        r.modeCtrl.changeMode("singleCtrl");
                    },
                    scene: "home",
                    is_from_share: !0
                });
            }, 500));
        }
    }, {
        key: "destroy",
        value: function() {}
    }, {
        key: "wxOnhide",
        value: function() {}
    } ]), e;
}());

exports.default = i;