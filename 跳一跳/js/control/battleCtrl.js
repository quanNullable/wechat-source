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

var a = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), i = e(require("../pages/battle/battlePkPage")), o = e(require("../pages/battle/battleGamePage")), n = e(require("../network/network")), r = function() {
    function e(a, n) {
        t(this, e), this.name = "battlePage", this.game = a, this.gameCtrl = this.game.gameCtrl, 
        this.model = this.game.gameModel, this.view = this.game.gameView, this.modeCtrl = n, 
        this.netWorkCtrl = this.gameCtrl.netWorkCtrl, this.currentPage = null, this.pkPage = new i.default(a), 
        this.gamePage = new o.default(a), this.shareTicket = "", this.pkId = "", this.shareInfoTimeout = null, 
        this.battleScore = void 0;
    }
    return a(e, [ {
        key: "init",
        value: function(e) {
            var t = this.model.getSessionId();
            this.shareTicket = e.shareTicket, this.pkId = e.query.pkId, this.model.setStage(""), 
            wx.showLoading(), t ? this.afterLogin(!0) : this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this));
        }
    }, {
        key: "afterLogin",
        value: function(e) {
            var t = this;
            e ? (this.setShareInfoTimeout(), wx.getShareInfo({
                shareTicket: this.shareTicket,
                success: function(e) {
                    null != t.shareInfoTimeout && (t.clearShareInfoTimeout(), t.model.setShareTicket(e.rawData), 
                    t.gotoBattlePage(), t.gameCtrl.loginBattle(1));
                },
                fail: function(e) {
                    null != t.shareInfoTimeout && (t.clearShareInfoTimeout(), t.gotoBattlePage(), t.gameCtrl.loginBattle(0));
                }
            })) : this.goToBattleFail();
        }
    }, {
        key: "gotoBattlePage",
        value: function() {
            n.default.getBattleData(this.gotoBattlePageAfterHaveData.bind(this), this.pkId);
        }
    }, {
        key: "gotoBattlePageAfterHaveData",
        value: function(e, t) {
            if (wx.hideLoading(), e) {
                var a = [];
                t.data.challenger.length && t.data.challenger.forEach(function(e) {
                    a.push({
                        headimg: e.headimg,
                        is_self: e.is_self ? 1 : 0,
                        nickname: e.nickname,
                        score_info: [ {
                            score: e.score
                        } ]
                    });
                }, this), a.sort(function(e, t) {
                    return t.score_info[0].score - e.score_info[0].score;
                });
                var i = {
                    organizerInfo: {
                        headimg: t.data.owner.headimg,
                        nickname: t.data.owner.nickname,
                        score_info: [ {
                            score: t.data.owner.score
                        } ],
                        left_time: t.data.left_time,
                        is_self: t.data.is_owner ? 1 : 0
                    },
                    pkListInfo: a,
                    gg_score: this.battleScore
                };
                this.currentPage && this.currentPage.hide(), this.pkPage.show(i), this.model.setStage(this.pkPage.name), 
                this.currentPage = this.pkPage, this.gameCtrl.showPkPage(t.data.owner.score);
            } else this.goToBattleFail();
        }
    }, {
        key: "goToBattleFail",
        value: function() {
            this.view.showGoToBattleFail(), this.modeCtrl.changeMode("singleCtrl");
        }
    }, {
        key: "setShareInfoTimeout",
        value: function() {
            this.shareInfoTimeout = setTimeout(this.handleShareInfoTimeout.bind(this), 5e3);
        }
    }, {
        key: "clearShareInfoTimeout",
        value: function() {
            null != this.shareInfoTimeout && (clearTimeout(this.shareInfoTimeout), this.shareInfoTimeout = null);
        }
    }, {
        key: "handleShareInfoTimeout",
        value: function() {
            this.clearShareInfoTimeout(), this.goToBattleFail();
        }
    }, {
        key: "destroy",
        value: function() {
            this.currentPage && this.currentPage.hide(), this.model.setStage(""), wx.hideLoading(), 
            this.shareTicket = "", this.pkId = "", this.clearShareInfoTimeout(), this.model.clearShareTicket(), 
            this.game.resetScene(), this.battleScore = void 0;
        }
    }, {
        key: "battlePlay",
        value: function(e) {
            e ? (this.currentPage && this.currentPage.hide(), this.gamePage.show(), this.game.replayGame(), 
            this.model.setStage(this.gamePage.name), this.currentPage = this.gamePage) : (this.modeCtrl.directPlaySingleGame(), 
            this.gameCtrl.battleToSingle());
        }
    }, {
        key: "showGameOverPage",
        value: function() {
            this.currentPage && this.currentPage.hide(), this.model.setStage(""), this.currentPage = null;
            var e = this.model.currentScore;
            this.battleScore = e, wx.showLoading(), n.default.updatepkinfo(this.gotoBattlePageAgain.bind(this), this.pkId, e);
        }
    }, {
        key: "gotoBattlePageAgain",
        value: function(e) {
            e || this.view.showUploadPkScoreFail(), this.gotoBattlePage();
        }
    }, {
        key: "wxOnhide",
        value: function() {}
    } ]), e;
}();

exports.default = r;