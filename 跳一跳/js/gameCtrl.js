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

var r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
}, o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), i = e(require("./control/queryCtrl")), a = e(require("./control/modeCtrl")), s = e(require("./control/networkCtrl")), n = e(require("./control/reviewCtrl")), l = e(require("./control/bottleSkinBaseCtrl")), h = (require("./lib/animation"), 
require("./config")), c = e(require("./store/session")), u = e(require("./lib/mue/eventcenter")), d = e(require("./pages/single/bottleSkinSharePage")), m = require("./shareApp"), p = e(require("./control/propertyCtrl")), f = function() {
    function e(r) {
        t(this, e), this.game = r;
    }
    return o(e, [ {
        key: "init",
        value: function() {
            this.gameView = this.game.gameView, this.queryCtrl = new i.default(this.game), this.netWorkCtrl = new s.default(this.game), 
            this.reviewCtrl = new n.default(this.game), this.modeCtrl = new a.default(this.game), 
            this.model = this.game.gameModel, this.reporter = this.game.reporter, this.historyTimes = this.game.historyTimes, 
            this.viewer = this.game.viewer, this.reUpLoadShowOverPage = !0, u.default.on(h.EVENT.TRIGGER_EGG, this.handleAd.bind(this)), 
            u.default.on(h.EVENT.AFTER_SHOWN_START_PAGE, this.afterShownStartPage.bind(this));
        }
    }, {
        key: "firstInitGame",
        value: function(e) {
            this.queryCtrl.identifyMode(e), this.modeCtrl.initFirstPage(e);
        }
    }, {
        key: "identifyModeErr",
        value: function(e) {
            this.gameView.showIdentifyModeErr(e);
        }
    }, {
        key: "onLoginSuccess",
        value: function() {
            this.reporter.setTimer(h.REPORTERTIMEOUT), "single" != this.game.mode && p.default.getProps(), 
            this.checkLaterUpLoad();
        }
    }, {
        key: "clickStart",
        value: function() {
            this.modeCtrl.clickStart(), this.reporter.rpClickSingleStartPage();
        }
    }, {
        key: "showFriendRank",
        value: function() {
            this.reporter.clickStartPageRankBtn(), this.modeCtrl.showFriendRank();
        }
    }, {
        key: "initReview",
        value: function(e) {
            var t = this;
            this.reviewCtrl.init(r({}, e, {
                is_from_share: !1,
                onHide: function() {
                    t.modeCtrl.changeMode("singleCtrl");
                }
            }));
        }
    }, {
        key: "quitReview",
        value: function() {
            this.reviewCtrl.reviewPage.onClickHide();
        }
    }, {
        key: "onReturnTo",
        value: function(e) {
            "group" == e ? this.modeCtrl.changeMode("singleCtrl") : "friends" == e ? this.modeCtrl.showFriendRank(!0) : "home" == e && this.modeCtrl.showStartPage();
        }
    }, {
        key: "clickRank",
        value: function() {
            this.reporter.clickSingleSettlementPageRankBtn(), this.modeCtrl.clickRank();
        }
    }, {
        key: "gameOver",
        value: function(e) {
            if ("relay" != this.model.mode) {
                if (this.reviewCtrl.isInThisPage || this.model.setScore(e), "observe" != this.model.mode) {
                    var t = this.model.getHighestScore();
                    this.netWorkCtrl.requestMmpayTimeout(), this.historyTimes.addOne();
                    var r = this.historyTimes.getTimes();
                    p.default.checkUsingProp();
                    this.reporter.playGameReport(e, t, r), this.netWorkCtrl.upDateFriendsScoreList(), 
                    this.netWorkCtrl.updateUserInfo(), l.default.syncSelectBottleSkin();
                }
                "player" == this.model.mode && this.reporter.playAudienceReport(), "battle" == this.model.mode && this.reporter.playPKReport(e), 
                this.reporter.sendReport(), l.default.getSelectedBottleSkinResource().then(function() {}, function() {});
            }
        }
    }, {
        key: "gameOverShowPage",
        value: function() {
            var e = this;
            if ("relay" != this.model.mode) if (this.reUpLoadShowOverPage = !0, "observe" == this.model.mode) this.modeCtrl.showGameOverPage(); else {
                this.model.getHighestScore();
                var t = this.model.weekBestScore, r = this.model.currentScore;
                r < t ? (this.modeCtrl.showGameOverPage(), this.historyTimes.checkUp()) : function() {
                    var t = {
                        seed: e.game.randomSeed,
                        time_seed: e.game.time_seed,
                        action: e.game.actionList,
                        musicList: e.game.musicList,
                        touchList: e.game.touchList,
                        steps: e.game.touchMoveList,
                        timestamp: e.game.touchStartTime,
                        version: h.VERSION,
                        use_wangzhe: e.game.use_wangzhe,
                        use_mmpaybase: e.game.use_mmpaybase,
                        mmpay_status: e.game.mmpay_status,
                        mmpay_checksum: e.game.mmpay_checksum,
                        succ_property_list: p.default.getSuccPropList() || []
                    };
                    e.game.bottle.skinId && (t.bottle_skin = {
                        item_id: e.game.bottle.skinId
                    }), void 0 !== e.game.skin_id && (t.skin_id = e.game.skin_id, t.skin_sn = e.game.skin_sn, 
                    console.log(JSON.stringify(t)));
                    var o = e.historyTimes.getTimes();
                    e.model.upLoadScoreData = {
                        currentScore: r,
                        gameTimes: o,
                        verifyData: t
                    }, e.netWorkCtrl.requestSettlement(r, o, e.afterRequestSettlement.bind(e), t);
                }(), p.default.handleGameOver({
                    seed: e.game.randomSeed,
                    time_seed: e.game.time_seed,
                    action: e.game.actionList,
                    musicList: e.game.musicList,
                    touchList: e.game.touchList,
                    steps: e.game.touchMoveList,
                    timestamp: e.game.touchStartTime,
                    version: h.VERSION,
                    use_wangzhe: e.game.use_wangzhe,
                    use_mmpaybase: e.game.use_mmpaybase,
                    mmpay_status: e.game.mmpay_status,
                    mmpay_checksum: e.game.mmpay_checksum
                }, r);
            }
        }
    }, {
        key: "afterRequestSettlement",
        value: function(e, t, o) {
            function i(e, t) {
                a.modeCtrl.showGameOverPage(r({}, e, t, {
                    onClickBottleSkin: function() {
                        s.show(), a.reporter.rpGetSkinSettleClickSkin();
                    }
                }));
            }
            var a = this, s = new d.default(r({}, t, o, {
                game: this.game,
                onReturn: function() {
                    i(t);
                },
                onShare: function() {
                    (0, m.shareGiftCard)(o.gift_id), a.reporter.rpGetSkinShareGoods(), console.log("onShare", o.gift_id);
                },
                onShareSkin: function() {
                    a.reporter.rpGetSkinShowOff();
                    var e = o.bottle_skin && o.bottle_skin.share_poster;
                    (0, m.shareSkin)(e);
                }
            }));
            if (e) {
                if (this.reUpLoadShowOverPage && i(t, o), o && o.bottle_skin && o.bottle_skin.item_id && o.bottle_skin.expire_time && l.default.updateSkinExpire(o.bottle_skin.item_id, o.bottle_skin.expire_time), 
                this.historyTimes.afterUpload(!0), "observe" == this.model.mode) return;
                var n = this.model.upLoadScoreData.currentScore;
                if (void 0 == n || t && t.banType) return;
                n >= this.model.weekBestScore && (this.model.weekBestScore = n, this.model.saveWeekBestScore(n), 
                n > this.model.getHighestScore() && this.model.saveHeighestScore(this.model.currentScore), 
                o && o.playback_id && l.default.setRankDataTolocalStorage({
                    playback_id: o.playback_id
                }));
            } else this.netWorkCtrl.sendServerError(), this.showReUpLoadScoreModel(t);
        }
    }, {
        key: "showReUpLoadScoreModel",
        value: function(e) {
            var t = this;
            wx.showModal({
                title: "提示",
                content: "分数上传失败,请检查网络状态后重试(" + e + ")",
                confirmText: "重试",
                cancelText: "延后上传",
                success: function(r) {
                    r.confirm ? t.reUploadScore() : r.cancel ? t.reUpLoadShowOverPage && t.showOverPage(!0) : t.showReUpLoadScoreModel(e);
                },
                fail: function() {
                    t.reUpLoadShowOverPage && t.showOverPage(!1);
                }
            });
        }
    }, {
        key: "showOverPage",
        value: function(e) {
            if (this.modeCtrl.showGameOverPage(), e && "observe" != this.model.mode) {
                if (!this.model.upLoadScoreData.verifyData || !this.model.upLoadScoreData.currentScore) return;
                var t = this.model.getActionData(), r = this.model.upLoadScoreData.verifyData, o = this.model.upLoadScoreData.currentScore;
                t && t.ts > Date.now() && t.score >= o || this.model.saveLaterUpLoadScore(o, r);
            }
        }
    }, {
        key: "reUploadScore",
        value: function() {
            var e = this;
            c.default.sessionId ? this.reUploadScore2() : this.netWorkCtrl.requestLogin(function(t) {
                t ? e.reUploadScore2() : e.showReUpLoadScoreModel("n0");
            });
        }
    }, {
        key: "reUploadScore2",
        value: function() {
            var e = this.model.upLoadScoreData, t = e.currentScore, r = e.gameTimes, o = e.verifyData;
            this.netWorkCtrl.requestSettlement(t, r, this.afterRequestSettlement.bind(this), o);
        }
    }, {
        key: "clickReplay",
        value: function() {
            this.reporter.playAudienceReportStart(), this.reporter.rpSingleSettlePlayAgain(), 
            this.modeCtrl.gameOverClickReplay();
        }
    }, {
        key: "friendRankReturn",
        value: function() {
            this.modeCtrl.friendRankReturn();
        }
    }, {
        key: "netWorkLogin",
        value: function() {
            this.netWorkCtrl.netWorkLogin();
        }
    }, {
        key: "shareGroupRank",
        value: function() {
            this.modeCtrl.shareGroupRank();
        }
    }, {
        key: "afterShareGroupRank",
        value: function(e, t) {
            this.reporter.shareGroupReport(t);
        }
    }, {
        key: "shareBattleCard",
        value: function() {
            this.modeCtrl.shareBattleCard(), this.reporter.rpClickShareBattle();
        }
    }, {
        key: "afterShareBattle",
        value: function(e, t) {
            e && this.reporter.sharePKReport(t);
        }
    }, {
        key: "groupPlayGame",
        value: function() {
            this.modeCtrl.groupPlayGame();
        }
    }, {
        key: "loginBattle",
        value: function(e) {
            this.reporter.joinPKReport(e), this.reporter.playPKReportStart(e);
        }
    }, {
        key: "showPkPage",
        value: function(e) {
            this.reporter.playPKScore(e);
        }
    }, {
        key: "onBattlePlay",
        value: function(e) {
            this.modeCtrl.battlePlay(e);
        }
    }, {
        key: "battleToSingle",
        value: function() {
            this.reporter.resetPKReport();
        }
    }, {
        key: "shareObservCard",
        value: function() {
            this.modeCtrl.shareObservCard(), this.reporter.rpClickObserveShare();
        }
    }, {
        key: "socketJoinSuccess",
        value: function(e) {
            this.modeCtrl.socketJoinSuccess(e), "observe" == this.model.mode ? e ? (this.game.socketFirstSync = !0, 
            this.reporter.joinAudienceReportStart()) : this.reporter.joinAudienceReport() : e && this.reporter.playAudienceReportStart();
        }
    }, {
        key: "afterShareObserveCard",
        value: function(e) {
            this.reporter.shareAudienceReport(e);
        }
    }, {
        key: "showPlayerGG",
        value: function(e) {
            this.modeCtrl.showPlayerGG(e);
        }
    }, {
        key: "showPlayerWaiting",
        value: function() {
            this.modeCtrl.showPlayerWaiting();
        }
    }, {
        key: "onPlayerOut",
        value: function() {
            this.modeCtrl.onPlayerOut();
        }
    }, {
        key: "onViewerStart",
        value: function() {
            this.game.audioManager.scale_intro.stop(), this.game.deadTimeout && (clearTimeout(this.game.deadTimeout), 
            this.game.deadTimeout = null), this.game.pendingReset = !1, this.modeCtrl.onViewerStart(), 
            this.reporter.joinAudienceReport();
        }
    }, {
        key: "wxOnShow",
        value: function(e) {
            var t = this;
            this.netWorkCtrl.requestServerInit(), this.netWorkCtrl.requestMmpayTimeout(), this.reporter.setTimer(h.REPORTERTIMEOUT), 
            l.default.getSelectedBottleSkinResource().then(function() {}, function() {}), setTimeout(function() {
                e.query && e.query.hasOwnProperty("mode") ? (t.reUpLoadShowOverPage = !1, t.modeCtrl.reInitFirstPage(e), 
                t.game.guider = !1) : "single" != t.model.mode && "player" != t.model.mode && "battle" != t.model.mode && "relay" != t.model.mode ? (t.reUpLoadShowOverPage = !1, 
                t.modeCtrl.changeMode("singleCtrl"), t.game.guider = !1) : t.reviewCtrl.isInThisPage ? t.reviewCtrl.continue() : t.modeCtrl.wxOnShow();
            }, 300);
        }
    }, {
        key: "wxOnhide",
        value: function() {
            this.reporter.quitReport(), "observe" == this.model.mode ? this.reporter.joinAudienceReport() : this.reviewCtrl.isInThisPage && this.reviewCtrl.pausePlay(), 
            this.netWorkCtrl.clearServerInit(), this.netWorkCtrl.clearMmpayTimeout(), this.reporter.clearTimer(), 
            this.reporter.sendReport(), this.modeCtrl.wxOnhide();
        }
    }, {
        key: "onReplayGame",
        value: function() {
            "observe" != this.model.mode && (this.reporter.playGameReportStart(), this.reporter.gameBeginReport());
        }
    }, {
        key: "onPeopleCome",
        value: function(e) {
            0 == e.audience_cmd ? (this.viewer.peopleCome(e), this.reporter.playAudienceReportMaxPeople(this.viewer.num)) : 1 == e.audience_cmd && this.viewer.peopleOut(e);
        }
    }, {
        key: "onServerConfigForbid",
        value: function() {}
    }, {
        key: "onSocketCloseErr",
        value: function() {
            "relay" === this.game.mode ? this.modeCtrl.onSocketCloseErr() : (this.gameView.showSocketCloseErr(), 
            this.modeCtrl.changeMode("singleCtrl"));
        }
    }, {
        key: "appealNotify",
        value: function() {
            this.modeCtrl.appealNotify();
        }
    }, {
        key: "checkLaterUpLoad",
        value: function(e) {
            var t = this, r = this.model.getActionData();
            if (r && r.ts > Date.now() && r.score) {
                var o = r.score, i = r.data, a = this.historyTimes.getTimes();
                e ? this.netWorkCtrl.requestSettlement(o, a, this.afterCheckLaterUpLoad.bind(this, o), i) : wx.showModal({
                    title: "提示",
                    content: "当前有分数未上传成功，是否重试",
                    confirmText: "重试",
                    cancelText: "取消",
                    success: function(e) {
                        e.confirm ? t.netWorkCtrl.requestSettlement(o, a, t.afterCheckLaterUpLoad.bind(t, o), i) : e.cancel ? t.model.clearLaterUpLoadScore() : t.checkLaterUpLoad();
                    },
                    fail: function() {
                        t.checkLaterUpLoad();
                    }
                });
            }
        }
    }, {
        key: "touchProp",
        value: function(e) {
            this.modeCtrl.touchProp(e);
        }
    }, {
        key: "afterCheckLaterUpLoad",
        value: function(e, t, r) {
            var o = this;
            if (t) return wx.showToast({
                title: "分数上传成功",
                icon: "success",
                duration: 1e3
            }), this.model.clearLaterUpLoadScore(), e > this.model.weekBestScore && (this.model.weekBestScore = e, 
            this.model.saveWeekBestScore(e)), void (e > this.model.highestScore && this.model.saveHeighestScore(e));
            wx.showModal({
                title: "提示",
                content: "分数延后上传失败,请检查网络状态后重试(" + r + ")",
                confirmText: "重试",
                cancelText: "延后上传",
                success: function(e) {
                    e.confirm ? o.checkLaterUpLoad(!0) : e.cancel || o.afterCheckLaterUpLoad(!1, r);
                },
                fail: function() {
                    o.afterCheckLaterUpLoad(!1, r);
                }
            });
        }
    }, {
        key: "handleAd",
        value: function(e, t) {
            this.modeCtrl.handleAd(t);
        }
    }, {
        key: "onSocketOpen",
        value: function() {
            this.modeCtrl.onSocketOpen();
        }
    }, {
        key: "gotoRelayMode",
        value: function() {
            this.reporter.reportGotoRelayMode(), this.modeCtrl.gotoRelayMode();
        }
    }, {
        key: "skipRelayBeginner",
        value: function() {
            this.modeCtrl.skipRelayBeginner();
        }
    }, {
        key: "outRelay1",
        value: function() {
            this.reporter.relayBackStart(), this.modeCtrl.outRelay1();
        }
    }, {
        key: "outRelay2",
        value: function() {
            this.reporter.relayBackStart(), this.modeCtrl.outRelay2();
        }
    }, {
        key: "startRelay",
        value: function(e) {
            this.modeCtrl.startRelay(e);
        }
    }, {
        key: "watchRelay",
        value: function() {
            this.modeCtrl.watchRelay(), this.reporter.rpWatchRelay();
        }
    }, {
        key: "replayRelay",
        value: function() {
            this.modeCtrl.replayRelay();
        }
    }, {
        key: "shareRelay",
        value: function() {
            this.modeCtrl.shareRelay();
        }
    }, {
        key: "afterShownStartPage",
        value: function() {
            this.reporter.reportStartPage(), this.modeCtrl.afterShownStartPage();
        }
    } ]), e;
}();

exports.default = f;