function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function a(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}(), n = function e(t, a, r) {
    null === t && (t = Function.prototype);
    var i = Object.getOwnPropertyDescriptor(t, a);
    if (void 0 === i) {
        var n = Object.getPrototypeOf(t);
        return null === n ? void 0 : e(n, a, r);
    }
    if ("value" in i) return i.value;
    var o = i.get;
    if (void 0 !== o) return o.call(r);
}, o = e(require("./singleCtrl")), s = require("../shareApp"), l = e(require("../pages/player/playerGamePage")), u = e(require("../network/network")), c = e(require("./bottleSkinBaseCtrl")), g = function(e) {
    function g(e, r) {
        t(this, g);
        var i = a(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, e, r));
        return i.name = "player", i.currentPage = null, i.gamePage = new l.default(e), i;
    }
    return r(g, o.default), i(g, [ {
        key: "init",
        value: function() {
            switch (this.model.stage) {
              case "game":
                this.currentPage = this.gamePage, this.currentPage.show();
                break;

              case "singleSettlementPgae":
                this.currentPage = this.gameOverPage;
                break;

              default:
                this.model.setStage(this.gamePage.name), this.currentPage = this.gamePage, this.currentPage.show();
            }
        }
    }, {
        key: "showGameOverPage",
        value: function(e) {
            this.game.seq++, this.gameSocket.sendCommand(this.game.seq, {
                type: -1,
                s: this.game.currentScore
            }), n(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "showGameOverPage", this).call(this, e);
        }
    }, {
        key: "shareObservCard",
        value: function() {
            this.shareObservCardA();
        }
    }, {
        key: "shareObservCardA",
        value: function() {
            this.shareObservCardB();
        }
    }, {
        key: "shareObservCardB",
        value: function() {
            var e = this;
            this.model.setStage("loading");
            var t = c.default.getSelectedSkinId();
            (0, s.shareObserve)({
                bottle_skin_id: t,
                skin_id: this.game.skin_id,
                skin_sn: this.game.skin_sn,
                cb: function(t, a) {
                    t && e.gameCtrl.afterShareObserveCard(a), setTimeout(function() {
                        "loading" == e.model.stage && e.model.setStage("game");
                    }, 50);
                }
            });
        }
    }, {
        key: "gameOverClickReplay",
        value: function() {
            n(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "gameOverClickReplay", this).call(this), 
            this.game.seq++, this.gameSocket.sendCommand(this.game.seq, {
                type: 0,
                seed: this.game.randomSeed
            }), this.game.reporter.rpPlayerClickPlayAgain();
        }
    }, {
        key: "destroy",
        value: function() {
            this.currentPage && this.currentPage.hide(), this.currentPage = null, this.model.setStage(""), 
            this.gameSocket.alive && (u.default.quitGame(), this.gameSocket.close()), this.model.clearGameId(), 
            this.model.clearGameTicket(), this.game.viewer.reset(), this.game.deadTimeout && (clearTimeout(this.game.deadTimeout), 
            this.game.deadTimeout = null), this.game.pendingReset = !1, this.model.adInfo = {
                canShowAd: !this.model.getAdTagInLS(),
                advertisingInfo: {}
            }, this.game.resetScene();
        }
    }, {
        key: "wxOnhide",
        value: function() {
            var e = this;
            "loading" != this.model.stage && "singleSettlementPgae" != this.model.stage && "friendRankList" != this.model.stage && (u.default.quitGame(), 
            this.gameSocket.cleanHeartBeat(), this.gameSocket.close(), setTimeout(function() {
                e.modeCtrl.changeMode("singleCtrl");
            }, 100));
        }
    }, {
        key: "wxOnshow",
        value: function() {}
    } ]), g;
}();

exports.default = g;