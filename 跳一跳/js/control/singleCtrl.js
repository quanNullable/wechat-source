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

var a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, i = function() {
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
}(), r = e(require("../pages/single/singleStartPage")), n = e(require("../pages/single/singleGamePage")), o = e(require("../pages/single/singleGameOverPage")), s = e(require("../pages/single/singleFriendRankPage")), l = e(require("../pages/single/relayGuide")), h = e(require("../control/profileCtrl")), g = e(require("../control/bottleSkinShopCtrl")), u = require("../shareApp"), d = e(require("../network/network")), c = e(require("../lib/mue/eventcenter")), f = e(require("./msgBoxCtrl")), m = e(require("../store/storage")), k = require("../config"), v = e(require("./propertyCtrl")), P = e(require("../control/bottleSkinBaseCtrl")), y = function() {
    function e(a, i) {
        t(this, e), this.name = "single", this.game = a, this.gameCtrl = this.game.gameCtrl, 
        this.model = this.game.gameModel, this.view = this.game.gameView, this.modeCtrl = i, 
        this.netWorkCtrl = this.gameCtrl.netWorkCtrl, this.gameSocket = this.game.gameSocket, 
        this.startPage = new r.default(a, this.onEnterMsgCenter.bind(this), this.onEnterBottleSkinShop.bind(this)), 
        this.gamePage = new n.default(a), this.gameOverPage = new o.default(a), this.friendRankPage = new s.default(a, this.onProfile.bind(this)), 
        this.relayGuidePage = new l.default(a), this.currentPage = null, this.lastPage = null, 
        this.socketTimeout = null, this.count = 1;
    }
    return i(e, [ {
        key: "init",
        value: function(e) {
            this.model.checkAdInfo(), this.startPage.show(), this.model.setStage(this.startPage.name), 
            this.currentPage = this.startPage;
        }
    }, {
        key: "onEnterMsgCenter",
        value: function() {
            var e = this, t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            this.MsgBoxCtrl ? this.MsgBoxCtrl.init(t) : (this.MsgBoxCtrl = new f.default({
                game: this.game,
                onReturn: function() {
                    e.gameCtrl.onReturnTo("home");
                },
                onGoSkin: function() {
                    e.goShop(function() {
                        e.MsgBoxCtrl.init(!1);
                    }), e.game.reporter.rpGoSkinBySkinCenter();
                },
                onGoProfile: function(t) {
                    var i = m.default.getMyUserInfo(), r = !1;
                    i && i.playback_id && (r = !(i.playback_id != t.open_user_id)), t.is_self = r;
                    var n = new h.default({
                        user_data: t,
                        game: e.game,
                        onReturn: function() {
                            e.onEnterMsgCenter(!1);
                        },
                        onGoRecord: function(t) {
                            e.gameCtrl.reviewCtrl.init({
                                user_data: a({}, t, {
                                    is_self: r
                                }),
                                is_from_share: !1,
                                onHide: function() {
                                    e.gameCtrl.reviewCtrl.destroy(), n.showPage();
                                }
                            });
                        }
                    });
                    n.init(), e.game.reporter.rpGoProfileByMsgBox();
                },
                onGoMyProfile: function() {
                    var t = m.default.getMyUserInfo();
                    if (t && t.playback_id) {
                        var i = new h.default({
                            user_data: {
                                is_self: !0,
                                playback_id: t.playback_id
                            },
                            game: e.game,
                            onReturn: function() {
                                e.onEnterMsgCenter(!1);
                            },
                            onGoRecord: function(t) {
                                e.gameCtrl.reviewCtrl.init({
                                    user_data: a({}, t, {
                                        is_self: !0
                                    }),
                                    is_from_share: !1,
                                    onHide: function() {
                                        e.gameCtrl.reviewCtrl.destroy(), i.showPage();
                                    }
                                });
                            }
                        });
                        i.init(), e.game.reporter.rpGoProfileByMsgBox();
                    }
                }
            }), this.MsgBoxCtrl.init()), this.game.reporter.rpMsgBox();
        }
    }, {
        key: "goShop",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            this.bottleSkinShopCtrl = new g.default({
                game: this.game,
                onReturn: function() {
                    e();
                }
            }), this.bottleSkinShopCtrl.init();
        }
    }, {
        key: "onEnterBottleSkinShop",
        value: function() {
            var e = this;
            this.goShop(function() {
                e.gameCtrl.onReturnTo("home");
            }), this.game.reporter.rpSkinInfo();
        }
    }, {
        key: "onProfile",
        value: function(e) {
            var t = this, i = m.default.getMyUserInfo();
            i && e.user_data.is_self && !e.user_data.playback_id && i.playback_id && (e.user_data.playback_id = i.playback_id), 
            e.user_data.playback_id || i.playback_id || (console.log("-----------------------------------"), 
            console.log("-----------------------------------"), console.log("-----------------------------------"), 
            console.log("-----------------------------------"), console.log("-----------------------------------"), 
            console.log("-----------------------------------"), console.log(e), console.log(i));
            var r = new h.default(a({}, e, {
                game: this.game,
                onReturn: function() {
                    t.gameCtrl.onReturnTo("friends");
                },
                onGoRecord: function(i) {
                    t.gameCtrl.reviewCtrl.init({
                        user_data: a({}, i, {
                            is_self: e.user_data.is_self
                        }),
                        is_from_share: !1,
                        onHide: function() {
                            t.gameCtrl.reviewCtrl.destroy(), r.showPage();
                        }
                    }), Array.isArray(i.routesArr) && t.reportReview(i.routesArr);
                }
            }));
            r.init(), Array.isArray(e.routesArr) && this.reportGoProfile(e.routesArr);
        }
    }, {
        key: "reportReview",
        value: function(e) {
            for (var t = e.length - 1; t >= 0; t--) {
                if ("start" == e[t]) {
                    this.game.reporter.rpStartPageFriendReview();
                    break;
                }
                if ("gameOver" == e[t]) {
                    this.game.reporter.rpSingleSettleRankReview();
                    break;
                }
            }
        }
    }, {
        key: "reportGoProfile",
        value: function(e) {
            for (var t = e.length - 1; t >= 0; t--) {
                if ("start" == e[t]) {
                    this.game.reporter.rpStartPageClickFriendInfo();
                    break;
                }
                if ("gameOver" == e[t]) {
                    this.game.reporter.rpGameOverClickFriendInfo();
                    break;
                }
            }
        }
    }, {
        key: "showStartPage",
        value: function() {
            this.hideCurrentPage(), this.startPage.show(), this.currentPage = this.startPage;
        }
    }, {
        key: "clickStart",
        value: function() {
            this.hideCurrentPage();
            v.default.canUseProp(1) ? this.gamePage.show({
                usingProp: 1
            }) : this.gamePage.show(), this.game.replayGame(), this.model.setStage(this.gamePage.name), 
            this.currentPage = this.gamePage;
        }
    }, {
        key: "touchProp",
        value: function(e) {
            var t = e.id, a = e.cb, i = setTimeout(function() {
                wx.showLoading({
                    mask: !0
                });
            }, 200);
            v.default.confirmUsingProp({
                id: t,
                game: this.game,
                seed: e.seed
            }).then(function() {
                wx.hideLoading(), clearTimeout(i), a(!0);
            }, function() {
                wx.hideLoading(), wx.showToast({
                    title: "网络繁忙",
                    icon: "none",
                    duration: 800
                }), clearTimeout(i), a(!1);
            });
        }
    }, {
        key: "showGameOverPage",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.hideCurrentPage(), t.onRewardAdGetProp = function() {
                d.default.getAdReward().then(function(t) {
                    var a = wx.getStorageSync("ad");
                    a.ad_reward_quota--, wx.setStorage({
                        key: "ad",
                        data: a
                    }), e.gameOverPage.showAdReward(t.icon || "xxx");
                }, function() {
                    wx.showToast({
                        title: "道具发放失败",
                        icon: "none",
                        duration: 800
                    }), console.log("道具发放失败");
                });
            }, t.onShowBannerAd = function() {
                var e = wx.getStorageSync("ad");
                e.ad_banner_quota--, wx.setStorage({
                    key: "ad",
                    data: e
                }), d.default.showBannerAd().then(function(e) {
                    console.log("showBannerAd res: ", e);
                });
            }, this.gameOverPage.show(t), this.model.clearPkId(), this.model.setStage(this.gameOverPage.name), 
            this.currentPage = this.gameOverPage;
        }
    }, {
        key: "gameOverClickReplay",
        value: function() {
            this.clickStart(), this.model.adInfo = {
                canShowAd: !this.model.getAdTagInLS(),
                advertisingInfo: {}
            };
        }
    }, {
        key: "showFriendRank",
        value: function(e) {
            e || (this.lastPage = this.currentPage), this.hideCurrentPage(), this.friendRankPage.show(), 
            this.model.setStage(this.friendRankPage.name), this.currentPage = this.friendRankPage;
        }
    }, {
        key: "friendRankReturn",
        value: function() {
            this.hideCurrentPage(), this.lastPage.show(), this.lastPage && "singleSettlementPgae" == this.lastPage.name && this.game.reporter.rpSingleSettleRankCloseRank(), 
            this.lastPage && "startPage" == this.lastPage.name && this.game.reporter.rpStartPageRankClose(), 
            this.model.setStage(this.lastPage.name), this.currentPage = this.lastPage;
        }
    }, {
        key: "shareGroupRank",
        value: function() {
            var e = this;
            this.lastPage && this.lastPage.name && ("singleSettlementPgae" == this.lastPage.name && this.game.reporter.rpSingleSettleRankShareGroup(), 
            "startPage" == this.lastPage.name && this.game.reporter.rpStartPageGroupShare()), 
            (0, u.shareGroupRank)(function(t, a) {
                e.gameCtrl.afterShareGroupRank(t, a);
            });
        }
    }, {
        key: "clickRank",
        value: function() {
            this.showFriendRank();
        }
    }, {
        key: "shareBattleCard",
        value: function() {
            var e = this, t = this.model.getSessionId(), a = this.model.currentScore, i = this.model.getPkId();
            t ? i ? this.afterHavePkId() : d.default.createPK(a).then(function() {
                e.afterHavePkId();
            }, function() {
                e.getPKErr();
            }).catch(function(e) {
                return console.log(e);
            }) : this.view.showNoSession();
        }
    }, {
        key: "afterHavePkId",
        value: function() {
            var e = this, t = this.model.getPkId(), a = this.model.currentScore;
            (0, u.shareBattle)(t, a, function(t, a) {
                e.gameCtrl.afterShareBattle(t, a);
            });
        }
    }, {
        key: "getPKErr",
        value: function() {
            this.view.showGetPkIdFail();
        }
    }, {
        key: "shareObservCard",
        value: function() {
            this.gamePage.hideLookersShare(), this.model.setStage("loading"), wx.showLoading(), 
            this.model.getSessionId() ? this.afterLogin(!0) : this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this));
        }
    }, {
        key: "afterLogin",
        value: function(e) {
            var t = this;
            e ? d.default.requestCreateGame(function(e, a) {
                e ? (t.model.setGameId(a.data.game_id), t.model.setGameTicket(a.data.up_op_ticket), 
                t.shareObservCardA()) : t.shareObservCardFail(a);
            }) : this.shareObservCardFail();
        }
    }, {
        key: "shareObservCardFail",
        value: function(e) {
            this.view.showShareObserveCardFail(e), this.model.clearGameId(), this.model.clearGameTicket(), 
            "loading" == this.model.stage && this.model.setStage("game"), this.clearSocketTimeout(), 
            this.gameSocket.close(), wx.hideLoading();
        }
    }, {
        key: "shareObservCardA",
        value: function() {
            this.socketTimeout = setTimeout(this.shareObservCardFail.bind(this), 5e3), this.gameSocket.connectSocket();
        }
    }, {
        key: "socketJoinSuccess",
        value: function(e) {
            wx.hideLoading(), e ? (this.clearSocketTimeout(), this.shareObservCardB()) : this.shareObservCardFail();
        }
    }, {
        key: "shareObservCardB",
        value: function() {
            var e = this, t = P.default.getSelectedSkinId();
            (0, u.shareObserve)({
                bottle_skin_id: t,
                skin_id: this.game.skin_id,
                skin_sn: this.game.skin_sn,
                cb: function(t, a) {
                    t && e.gameCtrl.afterShareObserveCard(a), setTimeout(function() {
                        "loading" == e.model.stage && e.model.setStage("game"), e.modeCtrl.singleChangeToPlayer(), 
                        e.currentPage = null;
                    }, 50);
                }
            });
        }
    }, {
        key: "clearSocketTimeout",
        value: function() {
            null != this.socketTimeout && (clearTimeout(this.socketTimeout), this.socketTimeout = null);
        }
    }, {
        key: "appealNotify",
        value: function() {
            this.currentPage === this.startPage && this.startPage.show({
                banType: 1
            });
        }
    }, {
        key: "gotoRelayMode",
        value: function() {
            this.model.getIsRelayNewBie() ? (console.log("去接龙新手指导"), c.default.emit(k.EVENT.SHOW_RELAY_GUIDE), 
            this.hideCurrentPage(), this.relayGuidePage.show(), this.model.setStage(this.relayGuidePage.name), 
            this.currentPage = this.relayGuidePage) : (console.log("不去接龙新手指导"), this.modeCtrl.changeMode("relayCtrl"));
        }
    }, {
        key: "afterShownStartPage",
        value: function() {
            var e = !1;
            this.lastSyncTime ? Date.now() - this.lastSyncTime > k.SYNC_DEBONCE_TIME && (e = !0, 
            this.lastSyncTime = Date.now()) : (e = !0, this.lastSyncTime = Date.now()), e && (this.checkMsgBox(), 
            v.default.getProps());
        }
    }, {
        key: "checkMsgBox",
        value: function() {
            var e = this;
            d.default.requestMsgRedPot().then(function() {
                (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).count && e.startPage.upDateRedPot();
            }, function() {});
        }
    }, {
        key: "handleAd",
        value: function(e) {
            if ("function" == typeof wx.openUrl && "game" == this.game.stage && this.model.adInfo && this.model.adInfo.canShowAd && e.block && e.block.isAd) {
                var t = e.block;
                this.model.adInfo.advertisingInfo && this.model.adInfo.advertisingInfo.isShowing ? t.order == this.model.adInfo.advertisingInfo.id && (this.model.adInfo.advertisingInfo.score += t.score) : (this.model.adInfo.advertisingInfo = {
                    id: t.order,
                    score: t.score || 0,
                    trademark_url: t.trademark_url || BASE_TRADE_MARK_RUL,
                    ad_url: t.ad_url,
                    isShowing: !0
                }, this.game.UI.showAdAvator(this.game.camera, t.trademark_url, t.ad_url), this.model.setAdTagInLS());
            }
        }
    }, {
        key: "skipRelayBeginner",
        value: function() {
            this.modeCtrl.changeMode("relayCtrl");
        }
    }, {
        key: "wxOnhide",
        value: function() {}
    }, {
        key: "wxOnshow",
        value: function() {}
    }, {
        key: "destroy",
        value: function() {
            this.hideCurrentPage(), this.currentPage = null, this.model.setStage(""), this.model.clearGameId(), 
            this.model.clearGameTicket(), this.clearSocketTimeout(), this.model.adInfo = {
                canShowAd: !this.model.getAdTagInLS(),
                advertisingInfo: {}
            }, this.game.resetScene();
        }
    }, {
        key: "hideCurrentPage",
        value: function() {
            this.currentPage && this.currentPage.hide();
        }
    } ]), e;
}();

exports.default = y;