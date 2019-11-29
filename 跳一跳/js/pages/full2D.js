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

var i = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, i, a) {
        return i && e(t.prototype, i), a && e(t, a), t;
    };
}(), a = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../lib/three")), s = require("../config"), n = e(require("../text")), r = require("../lib/animation"), o = (e(require("../store/storage")), 
e(require("../scroll/scrollHandler")), e(require("../report")), require("./pages2d/base")), h = require("./pages2d/start"), l = require("./pages2d/beginner"), y = require("./pages2d/lookers"), c = require("./pages2d/pk"), u = require("./pages2d/rank"), p = require("./pages2d/gg"), d = require("./pages2d/verify"), v = require("./pages2d/relay"), T = require("./pages2d/record"), f = require("./pages2d/profile"), g = require("./pages2d/msg"), k = require("./pages2d/skin"), w = require("./pages2d/shareskin"), A = e(require("../lib/mue/eventcenter")), m = e(require("./headimgAnimation")), E = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio, S = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, _ = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, x = _ * E, P = [ "btn", "list1", "list2", "bg" ], R = s.FRUSTUMSIZE, b = (wx.loadFont("res/num.ttf"), 
function() {
    function e(i) {
        var h = this;
        t(this, e), this.texture = {}, this.material = {}, this.geometry = {}, this.obj = {}, 
        this.canvas = {}, this.context = {}, this._touchInfo = {
            trackingID: -1,
            maxDy: 0,
            maxDx: 0
        }, this.maxscroll = 0, this.options = Object.assign({}, {}, i), this.imgid = {
            btn: 0,
            bg: 0,
            list1: 0,
            list2: 0
        }, this.options.onGroupShare = i.onGroupShare, this.options.friendRankReturn = i.friendRankReturn, 
        this.options.groupPlayGame = i.groupPlayGame, this.options.onClickRank = i.onClickRank, 
        this.options.onClickReplay = i.onClickReplay, this.options.onClickShare = i.onClickShare, 
        this.options.onClickPureShare = i.onClickPureShare, this.options.onClickStart = i.onClickStart, 
        this.options.onShowFriendRank = i.onShowFriendRank, this.options.onBattlePlay = i.onBattlePlay, 
        this.options.onLookersStart = i.onLookersStart, this.options.newRelay = i.newRelay, 
        this.options.outRelay1 = i.outRelay1, this.options.outRelay2 = i.outRelay2, this.options.startRelay = i.startRelay, 
        this.options.shareRelay = i.shareRelay, this.options.replayRelay = i.replayRelay, 
        this.options.skipRelayBeginner = i.skipRelayBeginner, this.options.getRelayQr = i.getRelayQr, 
        this.options.quitRecord = i.quitRecord, A.default.on(s.EVENT.RELAYSTART, function(e, t) {
            h.hide2D(), h.relayHeadImg || (h.relayHeadImg = new m.default()), h.relayText || (h.relayText = new a.Object3D(), 
            h.turnText = new n.default("轮到你了！", {
                fillStyle: 4209243,
                chinese: !0,
                textAlign: "left"
            }), h.relayText.add(h.turnText.obj), h.outText = new n.default("被淘汰了！", {
                fillStyle: 4209243,
                chinese: !0,
                textAlign: "left"
            }), h.relayText.add(h.outText.obj), h.relayText.scale.set(1.5, 1.5, 1.5), h.relayText.position.x = -13.8, 
            h.relayText.position.y = 11.5), h.options.camera.add(h.relayText), h.outText.obj.visible = !1, 
            h.turnText.obj.visible = !1, h.relayHeadImg.set(t.playerlist), h.options.camera.add(h.relayHeadImg.obj), 
            h.relayHeadImg.obj.position.x = -8.8, h.relayHeadImg.obj.position.y = 20, t.my_seat_no == t.now_player_seat_no && (h.turnText.obj.visible = !0, 
            h.outText.obj.visible = !1);
        }), A.default.on(s.EVENT.SYNCSCENE, function(e, t) {
            h.hide2D(), h.relayHeadImg || (h.relayHeadImg = new m.default()), h.relayText || (h.relayText = new a.Object3D(), 
            h.turnText = new n.default("轮到你了！", {
                fillStyle: 4209243,
                chinese: !0,
                textAlign: "left"
            }), h.relayText.add(h.turnText.obj), h.outText = new n.default("被淘汰了！", {
                fillStyle: 4209243,
                chinese: !0,
                textAlign: "left"
            }), h.relayText.add(h.outText.obj), h.relayText.scale.set(1.5, 1.5, 1.5), h.relayText.position.x = -13.8, 
            h.relayText.position.y = 11.5), h.options.camera.add(h.relayText);
            var i = t.serverData.playerlist;
            i = i.slice(t.serverData.now_player_index, i.length).concat(i.slice(0, t.serverData.now_player_index)), 
            console.log("围观看到的头像1：", i, t.serverData.now_player_index), i = i.filter(function(e) {
                return 0 === e.rank;
            }), console.log("围观看到的头像2：", i), h.options.camera.add(h.relayHeadImg.obj), h.relayHeadImg.obj.position.x = -8.8, 
            h.relayHeadImg.obj.position.y = 20, t.serverData.my_seat_no == t.serverData.now_player_seat_no ? (h.turnText.obj.visible = !0, 
            h.outText.obj.visible = !1, h.relayHeadImg.set(i, {
                timeout: !0
            })) : (h.turnText.obj.visible = !1, h.outText.obj.visible = !1, h.relayHeadImg.set(i));
        }), A.default.on(s.EVENT.ORDERRUNGAME, function(e, t) {
            h.relayHeadImg || (h.relayHeadImg = new m.default()), h.relayHeadImg.next(t), console.log("轮到你了么？", t.my_seat_no, t.now_player_seat_no), 
            t.my_seat_no == t.now_player_seat_no ? (h.turnText.obj.visible = !0, h.outText.obj.visible = !1) : (h.turnText.obj.visible = !1, 
            h.outText.obj.visible = !1);
        }), A.default.on(s.EVENT.PLAYERDIED, function(e, t) {
            if (console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", h.canvasType, t), 
            h.canvasType == o.CANVASTYPE.relayRoom) {
                h.outText.obj.visible = !0, h.turnText.obj.visible = !1;
                var i = t.playerlist.filter(function(e) {
                    return 0 === e.rank;
                });
                console.log("playerlist.length ? ", i.length), t.my_seat_no == t.now_player_seat_no && i.length > 2 && (console.log("显示结算页面了吗？？", t.my_seat_no, t.now_player_seat_no), 
                h.showRelayGG({
                    all_player: t.player_count,
                    my_rank: t.player_rank
                }));
            }
        }), A.default.on(s.EVENT.RECEIVEMINICODE, function(e, t) {
            h.showRelayQr(t);
        }), A.default.on(s.EVENT.ENDGAME, function(e, t) {
            h.relayHeadImg && h.options.camera.remove(h.relayHeadImg.obj), h.relayText && h.options.camera.remove(h.relayText);
            var i = 0, a = t.my_seat_no, s = t.playerlist.find(function(e) {
                return e.seat_no === a;
            });
            s && s.rank >= 0 && (i = s.rank + 1), console.log("rank:", t), r.TweenAnimation.killAll(), 
            h.showRelayRank({
                players: t.playerlist,
                my_seat_no: t.my_seat_no,
                my_rank: i,
                total_score: t.score
            });
        }), A.default.on(s.EVENT.RELAYMODEDESTROY, function(e, t) {
            h.relayHeadImg && h.relayHeadImg.obj && (h.outText.obj.visible = h.turnText.obj.visible = !1, 
            h.options.camera.remove(h.relayText), h.options.camera.remove(h.relayHeadImg.obj));
        });
    }
    return i(e, [ {
        key: "showFriendRankList",
        value: function(e) {
            this.opt = e || {}, (0, u.drawFriendRankList)({
                self: this
            });
        }
    }, {
        key: "showGroupRankList",
        value: function(e, t) {
            (0, u.drawGroupRankList)(this, e, t);
        }
    }, {
        key: "showGameOverPage",
        value: function(e) {
            e = e || {}, this.opt = e, (0, p.routeGameOver)(this);
        }
    }, {
        key: "showStartPage",
        value: function(e) {
            o.DEBUGVIEW || (this.opt = e || {}, (0, h.drawStartPage)(this));
        }
    }, {
        key: "updateStartPage",
        value: function() {
            this.canvasType == o.CANVASTYPE.start && 1 != this.opt.hideRank && (0, h.drawStartUpdate)(this);
        }
    }, {
        key: "showPkPage",
        value: function(e) {
            this.opt = e, (0, c.drawPkPage)({
                self: this
            });
        }
    }, {
        key: "showLookersPage",
        value: function(e) {
            this.opt = e, (0, y.drawLookersPage)({
                self: this
            });
        }
    }, {
        key: "showRecordPage",
        value: function(e) {
            this.opt = e, (0, T.drawRecordPage)({
                self: this
            });
        }
    }, {
        key: "showRecordSharePage",
        value: function(e) {
            this.opt = e, (0, T.drawRecordSharePage)(this);
        }
    }, {
        key: "showBeginnerPage",
        value: function() {
            (0, l.drawBeginnerPage)({
                self: this
            });
        }
    }, {
        key: "showRelayRoom",
        value: function(e, t) {
            this.relayOpt = e, (this.canvasType != o.CANVASTYPE.relayQr || t) && (this.opt = e, 
            (0, v.drawRelayRoomPage)(this));
        }
    }, {
        key: "showRelayGG",
        value: function(e) {
            this.opt = e, (0, v.drawRelayGG)(this);
        }
    }, {
        key: "showRelaying",
        value: function(e) {
            this.opt = e, (0, v.drawRelaying)(this);
        }
    }, {
        key: "showRelayLookers",
        value: function(e) {
            this.opt = e, (0, v.drawRelayLookers)(this);
        }
    }, {
        key: "showRelayRank",
        value: function(e) {
            this.opt = e, (0, v.drawRelayRank)(this);
        }
    }, {
        key: "showRelayBeginner",
        value: function(e) {
            this.opt = e, (0, v.drawRelayBeginner)(this);
        }
    }, {
        key: "showRelayQr",
        value: function(e) {
            this.opt = e, (0, v.drawRelayQr)(this);
        }
    }, {
        key: "showProfile",
        value: function(e) {
            this.opt = e, (0, f.drawProfile)(this);
        }
    }, {
        key: "updateProfilePraise",
        value: function(e) {
            this.opt.praise_info = e.praise_info, e.propsData && (this.opt.propsData = e.propsData), 
            (0, f.drawProfileUpdate)(this);
        }
    }, {
        key: "showMsgBox",
        value: function(e) {
            this.opt = e, (0, g.drawMsgBox)(this);
        }
    }, {
        key: "updateMsgBox",
        value: function(e) {
            this.canvasType == o.CANVASTYPE.msgBox && (this.opt.msg_list = this.opt.msg_list.concat(e), 
            (0, g.updateMsgBox)(this));
        }
    }, {
        key: "showSkin",
        value: function(e) {
            this.opt = e, console.log(e), (0, k.drawSkin)(this);
        }
    }, {
        key: "updateSkin",
        value: function(e) {
            this.opt.new_id = e.id, (0, k.updateSkinUseStatus)(this);
        }
    }, {
        key: "showShareSkin",
        value: function(e) {
            this.opt = e, (0, w.drawShareSkin)(this);
        }
    }, {
        key: "showGetNewSkin",
        value: function(e) {
            this.opt = e, (0, p.drawGetNewSkin)(this);
        }
    }, {
        key: "showJiLiAdGetPropPage",
        value: function(e) {
            this.opt = e, (0, p.drawJiLiAdGetPropPage)(this);
        }
    }, {
        key: "showMsgDetailType5",
        value: function(e) {
            this.opt = e, (0, g.drawMsgDetailType5)(this);
        }
    }, {
        key: "hide2D",
        value: function() {
            (0, o.hide)(this);
        }
    }, {
        key: "hide2DGradually",
        value: function() {
            if (!o.DEBUGVIEW) for (var e = this, t = 0; t < P.length; t++) this.obj[P[t]] && r.customAnimation.to(this.material[P[t]], 1, {
                opacity: 0,
                onComplete: function(t) {
                    return function() {
                        e.material[P[t]].opacity = 1, e.obj[P[t]].visible = !1, e.showState = !1, e.options.camera.remove(e.obj[P[t]]);
                    };
                }(t)
            });
        }
    }, {
        key: "_findDelta",
        value: function(e) {
            var t = this._touchInfo, i = e.touches[0] || e.changedTouches[0];
            return i ? {
                x: i.pageX - t.x,
                y: i.pageY - t.y
            } : null;
        }
    }, {
        key: "doTouchStartEvent",
        value: function(e) {
            if (this.showState) {
                var t = e.changedTouches[0].pageX, i = e.changedTouches[0].pageY;
                if (this.startX = t, this.startY = i, this.canvasType == o.CANVASTYPE.friendRank || this.canvasType == o.CANVASTYPE.groupRank || this.canvasType == o.CANVASTYPE.pk || this.canvasType == o.CANVASTYPE.relayRank || this.canvasType == o.CANVASTYPE.msgBox || this.canvasType == o.CANVASTYPE.shareSkin) {
                    var a = this._touchInfo, s = this.scrollHandler;
                    if (!s) return;
                    a.trackingID = "touch", a.x = e.touches[0].pageX, a.y = e.touches[0].pageY, a.maxDx = 0, 
                    a.maxDy = 0, a.historyX = [ 0 ], a.historyY = [ 0 ], a.historyTime = [ +new Date() ], 
                    a.listener = s, s.onTouchStart && s.onTouchStart();
                } else this.canvasType == o.CANVASTYPE.gameOver ? (t = this._cxp(t), i = this._cyp(i), 
                "skin" != this.opt.type && "tired" != this.opt.type && t > 207 && t < 360 && i > 540 && i < 660 && this._drawGameOverBtnClick()) : this.canvasType == o.CANVASTYPE.start && (t = this._cxp(t), 
                i = this._cyp(i), t > 86 && t < 318 && i > 458 && i < 552 && this._drawStartClick());
            }
        }
    }, {
        key: "doTouchMoveEvent",
        value: function(e) {
            if (this.showState && (this.canvasType == o.CANVASTYPE.friendRank || this.canvasType == o.CANVASTYPE.groupRank || this.canvasType == o.CANVASTYPE.pk || this.canvasType == o.CANVASTYPE.relayRank || this.canvasType == o.CANVASTYPE.msgBox || this.canvasType == o.CANVASTYPE.shareSkin)) {
                var t = this._touchInfo;
                if (-1 == t.trackingID) return;
                e.preventDefault();
                var i = this._findDelta(e);
                if (!i) return;
                t.maxDy = Math.max(t.maxDy, Math.abs(i.y)), t.maxDx = Math.max(t.maxDx, Math.abs(i.x));
                var a = +new Date();
                for (t.historyX.push(i.x), t.historyY.push(i.y), t.historyTime.push(a); t.historyTime.length > 10; ) t.historyTime.shift(), 
                t.historyX.shift(), t.historyY.shift();
                t.listener && t.listener.onTouchMove && t.listener.onTouchMove(i.x, i.y, a);
            }
        }
    }, {
        key: "doTouchEndEvent",
        value: function(e) {
            if (this.showState) {
                var t = e.changedTouches[0].pageX, i = e.changedTouches[0].pageY, a = i, s = !0;
                if (this.canvasType != o.CANVASTYPE.friendRank && this.canvasType != o.CANVASTYPE.groupRank && this.canvasType != o.CANVASTYPE.pk && this.canvasType != o.CANVASTYPE.relayRank && this.canvasType != o.CANVASTYPE.msgBox && this.canvasType != o.CANVASTYPE.record && this.canvasType != o.CANVASTYPE.shareSkin || !(Math.abs(t - this.startX) > 5 || Math.abs(i - this.startY) > 5) || (s = !1), 
                t = this._cxp(t), i = this._cyp(i), this.canvasType == o.CANVASTYPE.start && this._drawStartClickRevert(), 
                s) {
                    if (this.canvasType == o.CANVASTYPE.gameOver && !1 === (0, p.gameOverEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.groupRank && !1 === (0, u.groupRankEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.friendRank && !1 === (0, u.friendRankEve)(this, t, i, this._cyp(a - this.lastScrollY))) return !1;
                    if (this.canvasType == o.CANVASTYPE.start && !1 === (0, h.startEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.pk && !1 === (0, c.pkEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.lookers && !1 === (0, y.lookersEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.verify && !1 === (0, d.verifyEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayRoom && !1 === (0, v.relayRoomEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayRank && !1 === (0, v.relayRankEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayGG && !1 === (0, v.relayGGEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayBeginner && !1 === (0, v.relayBeginnerEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.relayQr && !1 === (0, v.relayQrEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.record && !1 === (0, T.recordEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.recordShare && !1 === (0, T.recordShareEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.profile && !1 === (0, f.profileEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.msgBox && !1 === (0, g.msgBoxEve)(this, t, i, this._cyp(a - this.lastScrollY))) return !1;
                    if (this.canvasType == o.CANVASTYPE.skinList && !1 === (0, k.skinListEve)(this, t, i, this._cyp(a - this.lastScrollY))) return !1;
                    if (this.canvasType == o.CANVASTYPE.getNewSkin && !1 === (0, p.getNewSkinEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.shareSkin && !1 === (0, w.shareSkinEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.jiliProp && !1 === (0, p.drawJiLiAdGetPropPageEve)(this, t, i)) return !1;
                    if (this.canvasType == o.CANVASTYPE.msgDetail5 && !1 === (0, g.drawMsgDetailType5Eve)(this, t, i)) return !1;
                    this.canvasType == o.CANVASTYPE.gameOver && "tired" != this.opt.type && "skin" != this.opt.type && this._drawGameOverBtnClickRevert();
                } else {
                    var n = this._touchInfo;
                    if (-1 == n.trackingID) return;
                    e.preventDefault();
                    var r = this._findDelta(e);
                    if (!r) return;
                    var l = n.listener;
                    n.trackingID = -1, n.listener = null;
                    var A = {
                        x: 0,
                        y: 0
                    };
                    if (n.historyTime.length > 2) for (var m = n.historyTime.length - 1, E = n.historyTime[m], S = n.historyX[m], _ = n.historyY[m]; m > 0; ) {
                        m--;
                        var x = E - n.historyTime[m];
                        if (x > 30 && x < 50) {
                            A.x = (S - n.historyX[m]) / (x / 1e3), A.y = (_ - n.historyY[m]) / (x / 1e3);
                            break;
                        }
                    }
                    n.historyTime = [], n.historyX = [], n.historyY = [], l && l.onTouchEnd && l.onTouchEnd(r.x, r.y, A);
                }
                console.log("emmmm, 抛出click事件");
            }
        }
    }, {
        key: "doClickEvent",
        value: function(e) {
            console.log(e);
        }
    }, {
        key: "updatePosition",
        value: function(e) {
            var t;
            e > 0 && (e = 0);
            var i = (0, o.cwh)(720) / x * R, a = (0, o.cwh)(720), s = 12;
            this.canvasType != o.CANVASTYPE.friendRank && this.canvasType != o.CANVASTYPE.groupRank || (t = -(this._cy(157) + a / 2 - x / 2) / x * R), 
            this.canvasType == o.CANVASTYPE.pk && (t = -(this._cy(437) + a / 2 - x / 2) / x * R), 
            this.canvasType == o.CANVASTYPE.relayRank && (t = -(this._cy(404) + a / 2 - x / 2) / x * R, 
            1 != this.opt.my_rank && (t = -(this._cy(318) + a / 2 - x / 2) / x * R)), this.canvasType == o.CANVASTYPE.msgBox && (t = -(this._cy(136) + a / 2 - x / 2) / x * R, 
            s = 8), this.canvasType == o.CANVASTYPE.shareSkin && (t = -(this._cy(278) + a / 2 - x / 2) / x * R);
            var n = Math.floor((t - R * e / _) / i);
            if (this.lastN != n && this.lastN - n < 0) n % 2 == 0 ? this._drawList((n + 1) * s, "list2") : this._drawList((n + 1) * s, "list1"); else if (this.lastN != n && this.lastN - n > 0) {
                var r = n;
                -1 == r && (r = 1), n % 2 == 0 ? this._drawList(n * s, "list1") : this._drawList(r * s, "list2");
            }
            console.log("viewS : ", t, t - R * e / _ - n * i), n % 2 == 0 ? (this.obj.list1.position.y = t - R * e / _ - n * i, 
            this.obj.list2.position.y = t - R * e / _ - (n + 1) * i) : (this.obj.list2.position.y = t - R * e / _ - n * i, 
            this.obj.list1.position.y = t - R * e / _ - (n + 1) * i), this.lastN = n, this.lastScrollY = e, 
            this.maxscroll = Math.min(this.lastScrollY, this.maxscroll);
        }
    }, {
        key: "_drawList",
        value: function(e, t) {
            this.canvasType != o.CANVASTYPE.pk ? this.canvasType == o.CANVASTYPE.friendRank || this.canvasType == o.CANVASTYPE.groupRank ? (0, 
            u.drawRankList)(this, e, t) : this.canvasType == o.CANVASTYPE.relayRoom ? (0, v.drawRelayList)(this, e, t) : this.canvasType == o.CANVASTYPE.msgBox ? (this.lastScrollY <= this.maxscroll && !this.pending && (this.pending = !0, 
            console.log("onEEEEEEnd"), !!this.opt.onEnd && this.opt.onEnd()), (0, g.drawMsgList)(this, e, t)) : this.canvasType == o.CANVASTYPE.shareSkin && (0, 
            w.drawShareSkinList)(this, e, t) : (0, c.drawPkList)(this, e, t);
        }
    }, {
        key: "_drawGameOverBtnClick",
        value: function() {
            this.context.btn.clearRect(this._cx(140), this._cy(this.replayBtnPosy - 80), (0, 
            o.cwh)(232), (0, o.cwh)(134)), this._drawImageCenter("res/replay.png", this._cx(256), this._cy(this.replayBtnPosy), (0, 
            o.cwh)(190), (0, o.cwh)(75), "btn", null, this.imgid.btn);
        }
    }, {
        key: "_drawGameOverBtnClickRevert",
        value: function() {
            this.context.btn.clearRect(this._cx(140), this._cy(this.replayBtnPosy - 80), (0, 
            o.cwh)(232), (0, o.cwh)(134)), this._drawImageCenter("res/replay.png", this._cx(256), this._cy(this.replayBtnPosy), (0, 
            o.cwh)(212), (0, o.cwh)(84), "btn", null, this.imgid.btn);
        }
    }, {
        key: "_drawStartClick",
        value: function() {
            this.context.btn.clearRect(this._cx(91), this._cy(448), (0, o.cwh)(232), (0, o.cwh)(104)), 
            this._drawImageCenter("res/play.png", this._cx(207), this._cy(505), (0, o.cwh)(190), (0, 
            o.cwh)(75), "btn", null, this.imgid.btn);
        }
    }, {
        key: "_drawStartClickRevert",
        value: function() {
            this.context.btn.clearRect(this._cx(91), this._cy(448), (0, o.cwh)(232), (0, o.cwh)(104)), 
            this._drawImageCenter("res/play.png", this._cx(207), this._cy(505), (0, o.cwh)(212), (0, 
            o.cwh)(84), "btn", null, this.imgid.btn);
        }
    }, {
        key: "_cx",
        value: function(e) {
            var t = e * S / 414;
            return _ / S < 736 / 414 && (t = e * _ / 736 + (S - 414 * _ / 736) / 2), t * E;
        }
    }, {
        key: "_cy",
        value: function(e) {
            return (_ / S > 736 / 414 ? e * S / 414 + (_ - 736 * S / 414) / 2 : e * _ / 736) * E;
        }
    }, {
        key: "_cxp",
        value: function(e) {
            return e / S * 414;
        }
    }, {
        key: "_cyp",
        value: function(e) {
            return _ / S > 736 / 414 ? (e - (_ - 736 * S / 414) / 2) / S * 414 : e / _ * 736;
        }
    }, {
        key: "_drawImageCenter",
        value: function(e, t, i, a, s, n, r, h, l) {
            "/0" != e && "/96" != e && "/64" != e && e || (e = "res/ava.png");
            var y = new Image(), c = this;
            y.onload = function() {
                c.imgid[n] == h && (c.context[n].drawImage(y, t - a / 2, i - s / 2, a, s), !!r && r(), 
                l || (0, o.updatePlane)({
                    self: c,
                    type: n
                }));
            }, y.onerror = function() {
                !!r && r();
            }, y.src = e;
        }
    } ]), e;
}());

exports.default = b;