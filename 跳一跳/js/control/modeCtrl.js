function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function r(t, r) {
    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, r) {
        for (var e = 0; e < r.length; e++) {
            var n = r[e];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(r, e, n) {
        return e && t(r.prototype, e), n && t(r, n), r;
    };
}(), n = t(require("./singleCtrl")), i = t(require("./groupShareCtrl")), l = t(require("./battleCtrl")), s = t(require("./observeCtrl")), a = t(require("./playerCtrl")), u = t(require("./relayCtrl")), h = t(require("./reviewPageCtrl")), c = t(require("./getGiftPageCtrl")), o = t(require("../lib/mue/eventcenter")), C = require("../config"), y = function() {
    function t(e) {
        r(this, t), this.game = e, this.singleCtrl = new n.default(e, this), this.groupShareCtrl = new i.default(e, this), 
        this.battleCtrl = new l.default(e, this), this.observeCtrl = new s.default(e, this), 
        this.playerCtrl = new a.default(e, this), this.relayCtrl = new u.default(e, this), 
        this.reviewPageCtrl = new h.default(e, this), this.getGiftPageCtrl = new c.default(e, this), 
        this.model = e.gameModel, this.gameCtrl = e.gameCtrl, this.currentCtrl = null, o.default.on(C.EVENT.GOSTARTPAGE, this.goToSingleStartPage.bind(this));
    }
    return e(t, [ {
        key: "initFirstPage",
        value: function(t) {
            var r = this.model.getMode();
            switch (console.log("init???", t, r), r) {
              case "single":
                this.currentCtrl = this.singleCtrl, this.singleCtrl.init(t), this.gameCtrl.netWorkLogin();
                break;

              case "groupShare":
                this.currentCtrl = this.groupShareCtrl, this.groupShareCtrl.init(t);
                break;

              case "battle":
                this.currentCtrl = this.battleCtrl, this.battleCtrl.init(t);
                break;

              case "observe":
                this.currentCtrl = this.observeCtrl, this.observeCtrl.init(t);
                break;

              case "relay":
                this.currentCtrl = this.relayCtrl, this.currentCtrl.init(t);
                break;

              case "reviewPage":
                this.currentCtrl = this.reviewPageCtrl, this.currentCtrl.init(t);
                break;

              case "getGiftPage":
                this.currentCtrl = this.getGiftPageCtrl, console.log("getGiftPage", this.getGiftPageCtrl), 
                this.currentCtrl.init(t);
                break;

              default:
                this.currentCtrl = this.singleCtrl, this.model.setMode("single"), this.singleCtrl.init(t), 
                this.gameCtrl.netWorkLogin();
            }
        }
    }, {
        key: "reInitFirstPage",
        value: function(t) {
            var r = this;
            this.currentCtrl && (this.currentCtrl.destroy(), this.gameCtrl.reviewCtrl.destroy(), 
            this.currentCtrl = null), this.gameCtrl.queryCtrl.identifyMode(t), setTimeout(function() {
                r.initFirstPage(t);
            }, 500);
        }
    }, {
        key: "clickStart",
        value: function() {
            this.currentCtrl && this.currentCtrl.clickStart && this.currentCtrl.clickStart();
        }
    }, {
        key: "showGameOverPage",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.showGameOverPage && this.currentCtrl.showGameOverPage(t);
        }
    }, {
        key: "gameOverClickReplay",
        value: function() {
            this.currentCtrl && (this.currentCtrl.gameOverClickReplay ? this.currentCtrl.gameOverClickReplay() : this.game.handleWxOnError({
                message: "cannot Find this.currentCtrl.gameOverClickReplay",
                stack: this.game.mode + "" + this.game.stage
            }));
        }
    }, {
        key: "showFriendRank",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.showFriendRank && this.currentCtrl.showFriendRank(t);
        }
    }, {
        key: "showStartPage",
        value: function() {
            this.currentCtrl && this.currentCtrl.showStartPage && this.currentCtrl.showStartPage();
        }
    }, {
        key: "friendRankReturn",
        value: function() {
            this.currentCtrl && this.currentCtrl.friendRankReturn && this.currentCtrl.friendRankReturn();
        }
    }, {
        key: "shareGroupRank",
        value: function() {
            this.currentCtrl && this.currentCtrl.shareGroupRank && this.currentCtrl.shareGroupRank();
        }
    }, {
        key: "showGroupRankPage",
        value: function() {
            this.currentCtrl && this.currentCtrl.showGroupRankPage && this.currentCtrl.showGroupRankPage();
        }
    }, {
        key: "clickRank",
        value: function() {
            this.currentCtrl && this.currentCtrl.clickRank && this.currentCtrl.clickRank();
        }
    }, {
        key: "shareBattleCard",
        value: function() {
            this.currentCtrl && this.currentCtrl.shareBattleCard && this.currentCtrl.shareBattleCard();
        }
    }, {
        key: "changeMode",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.destroy && (this.currentCtrl.destroy(), this.gameCtrl.reviewCtrl.destroy()), 
            this.model.setMode(this[t].name), this.currentCtrl = this[t], "singleCtrl" === t && o.default.emit(C.EVENT.GOTOSINGLESTARTPAGE, {}), 
            this[t].init();
        }
    }, {
        key: "singleChangeToPlayer",
        value: function() {
            this.model.setMode(this.playerCtrl.name), this.currentCtrl = this.playerCtrl, this.playerCtrl.init();
        }
    }, {
        key: "groupPlayGame",
        value: function() {
            this.currentCtrl && this.currentCtrl.groupPlayGame && this.currentCtrl.groupPlayGame();
        }
    }, {
        key: "directPlaySingleGame",
        value: function() {
            this.currentCtrl && this.currentCtrl.destroy(), this.model.setMode(this.singleCtrl.name), 
            this.currentCtrl = this.singleCtrl, this.singleCtrl.clickStart();
        }
    }, {
        key: "battlePlay",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.battlePlay && this.currentCtrl.battlePlay(t);
        }
    }, {
        key: "shareObservCard",
        value: function() {
            this.currentCtrl && this.currentCtrl.shareObservCard && this.currentCtrl.shareObservCard();
        }
    }, {
        key: "socketJoinSuccess",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.socketJoinSuccess && this.currentCtrl.socketJoinSuccess(t);
        }
    }, {
        key: "showPlayerGG",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.showPlayerGG && this.currentCtrl.showPlayerGG(t);
        }
    }, {
        key: "showPlayerWaiting",
        value: function() {
            this.currentCtrl && this.currentCtrl.showPlayerWaiting && this.currentCtrl.showPlayerWaiting();
        }
    }, {
        key: "onPlayerOut",
        value: function() {
            this.currentCtrl && (this.currentCtrl.onPlayerOut ? this.currentCtrl.onPlayerOut() : this.game.handleWxOnError({
                message: "cannot Find this.currentCtrl.onPlayerOut",
                stack: this.game.mode + "" + this.game.stage
            }));
        }
    }, {
        key: "onViewerStart",
        value: function() {
            this.currentCtrl && this.currentCtrl.onViewerStart && this.currentCtrl.onViewerStart();
        }
    }, {
        key: "appealNotify",
        value: function() {
            this.currentCtrl && this.currentCtrl.appealNotify && this.currentCtrl.appealNotify();
        }
    }, {
        key: "onSocketOpen",
        value: function() {
            this.currentCtrl && this.currentCtrl.onSocketOpen && this.currentCtrl.onSocketOpen();
        }
    }, {
        key: "gotoRelayMode",
        value: function() {
            this.currentCtrl && this.currentCtrl.gotoRelayMode && this.currentCtrl.gotoRelayMode();
        }
    }, {
        key: "outRelay1",
        value: function() {
            this.currentCtrl && this.currentCtrl.outRelay1 && this.currentCtrl.outRelay1();
        }
    }, {
        key: "outRelay2",
        value: function() {
            this.currentCtrl && this.currentCtrl.outRelay2 && this.currentCtrl.outRelay2();
        }
    }, {
        key: "startRelay",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.startRelay && this.currentCtrl.startRelay(t);
        }
    }, {
        key: "watchRelay",
        value: function() {
            this.currentCtrl && this.currentCtrl.watchRelay && this.currentCtrl.watchRelay();
        }
    }, {
        key: "replayRelay",
        value: function() {
            this.currentCtrl && this.currentCtrl.replayRelay && this.currentCtrl.replayRelay();
        }
    }, {
        key: "shareRelay",
        value: function() {
            this.currentCtrl && this.currentCtrl.shareRelay && this.currentCtrl.shareRelay();
        }
    }, {
        key: "onSocketCloseErr",
        value: function() {
            this.currentCtrl && this.currentCtrl.onSocketCloseErr && this.currentCtrl.onSocketCloseErr();
        }
    }, {
        key: "touchProp",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.touchProp && this.currentCtrl.touchProp(t);
        }
    }, {
        key: "goToSingleStartPage",
        value: function(t) {
            this.currentCtrl == this.singleCtrl && this.game.reporter.singleBackStart(), this.changeMode("singleCtrl");
        }
    }, {
        key: "skipRelayBeginner",
        value: function() {
            this.currentCtrl && this.currentCtrl.skipRelayBeginner && this.currentCtrl.skipRelayBeginner();
        }
    }, {
        key: "handleAd",
        value: function(t) {
            this.currentCtrl && this.currentCtrl.handleAd && this.currentCtrl.handleAd(t);
        }
    }, {
        key: "afterShownStartPage",
        value: function() {
            this.currentCtrl && this.currentCtrl.afterShownStartPage && this.currentCtrl.afterShownStartPage();
        }
    }, {
        key: "wxOnShow",
        value: function() {
            this.currentCtrl && this.currentCtrl.wxOnShow && this.currentCtrl.wxOnShow();
        }
    }, {
        key: "wxOnhide",
        value: function() {
            this.currentCtrl && this.currentCtrl.wxOnhide && this.currentCtrl.wxOnhide();
        }
    } ]), t;
}();

exports.default = y;