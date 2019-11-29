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

var o = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var i = t[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, o, i) {
        return o && e(t.prototype, o), i && e(t, i), t;
    };
}(), i = require("../config"), n = e(require("../lib/mue/eventcenter")), s = e(require("../pages/relay/room")), a = require("../shareApp"), l = e(require("../pages/relay/gamePage")), r = e(require("../pages/relay/fakeRoomPage")), h = require("../util/forceUpdate"), d = function() {
    function e(o, i) {
        t(this, e), this.name = "relay", this.game = o, this.reporter = o.reporter, this.modeCtrl = i, 
        this.gameCtrl = this.game.gameCtrl, this.model = this.game.gameModel, this.view = this.game.gameView, 
        this.netWorkCtrl = this.gameCtrl.netWorkCtrl, this.onSocketOpenCb = function() {}, 
        this.socketTimeout = null, this.gameSocket = this.game.gameSocket, this.reconnectTimeout = null, 
        this.currentPage = null, this.roomPage = new s.default(o), this.gamePage = new l.default(o), 
        this.fakeRoomPage = new r.default(o), this.scene = 1, this.setStartRelayReportTimeOut = null, 
        this.socketMonitor = this.game.socketMonitor;
    }
    return o(e, [ {
        key: "init",
        value: function(e) {
            if (e && e.scene) switch (e.scene) {
              case 1044:
                this.scene = 0;
                break;

              default:
                this.scene = 1;
            }
            this.addEvent(), this.createRoomNoAddEvent(e);
        }
    }, {
        key: "createRoomNoAddEvent",
        value: function(e) {
            e ? this.changePage("fakeRoomPage", 0) : this.changePage("fakeRoomPage", 1), this.model.getSessionId() ? this.afterLogin(e, !0) : this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this, e)), 
            this.isShareCard = !1;
        }
    }, {
        key: "afterLogin",
        value: function(e, t) {
            var o = this;
            if (!t) return this.view.showJoinRelayFail("n0"), e || n.default.emit(i.EVENT.CREATE_RELAY_ROOM_FAIL, {
                result: 1
            }), void this.modeCtrl.changeMode("singleCtrl");
            if (e) {
                console.log("options12312312312", e);
                var s = e.query.room_id, a = decodeURIComponent(e.query.router_id), l = e.query.version;
                console.log("optionsoptionsoptionsoptions", a), i.VERSION != l ? (this.rpJoinRoom(1), 
                1 == (0, h.compareMyVersion)(l) ? (0, h.forceUpdate)(function() {
                    o.modeCtrl.changeMode("singleCtrl");
                }, "点击确定，进行版本更新后重试") : (this.view.showVersionMismatching(), this.modeCtrl.changeMode("singleCtrl"))) : (this.model.relayInfo = {
                    room_id: s,
                    router_id: a
                }, this.joinRelayRoom());
            } else this.netWorkCtrl.createRouterId(this.afterCreateRouterId.bind(this));
        }
    }, {
        key: "afterCreateRouterId",
        value: function(e, t) {
            e ? (this.model.relayInfo = {
                router_id: t
            }, this.masterCreateRoom()) : (this.view.showJoinRelayFail(t), n.default.emit(i.EVENT.CREATE_RELAY_ROOM_FAIL, {
                result: 1
            }), this.modeCtrl.changeMode("singleCtrl"));
        }
    }, {
        key: "masterCreateRoom",
        value: function() {
            this.onSocketOpenCb = this.socketCreateRoom.bind(this), this.connectSocket(this.masterCreateRoomFail.bind(this));
        }
    }, {
        key: "joinRelayRoom",
        value: function(e) {
            var t = e || this.joinRelayRoomFail.bind(this);
            this.onSocketOpenCb = this.socketJoinRoom.bind(this), this.connectSocket(t);
        }
    }, {
        key: "joinNextRelayRoom",
        value: function() {
            n.default.emitSync(i.EVENT.RELAYMODEDESTROY, {}), this.clearSocketTimeout(), this.scene = 2, 
            this.onSocketOpenCb = this.socketJoinNextRoom.bind(this), this.connectSocket(this.joinRelayRoomFail.bind(this));
        }
    }, {
        key: "connectSocket",
        value: function(e) {
            this.socketTimeout = setTimeout(e, 5e3), this.gameSocket.alive ? this.onSocketOpenCb() : this.gameSocket.connectSocket();
        }
    }, {
        key: "onSocketOpen",
        value: function() {
            this.onSocketOpenCb();
        }
    }, {
        key: "socketCreateRoom",
        value: function() {
            var e = {
                cmdid: 10001,
                buff: {
                    router_id: this.model.relayInfo.router_id,
                    version: i.VERSION
                }
            };
            this.sendRelayCmd(e);
        }
    }, {
        key: "socketJoinRoom",
        value: function() {
            var e = {
                cmdid: 10002,
                buff: {
                    room_id: this.model.relayInfo.room_id
                }
            };
            this.sendRelayCmd(e);
        }
    }, {
        key: "socketJoinNextRoom",
        value: function() {
            var e = {
                cmdid: 10011,
                buff: {
                    room_id: this.model.relayInfo.room_id
                }
            };
            this.sendRelayCmd(e);
        }
    }, {
        key: "sendRelayMsg",
        value: function(e, t) {
            var o = t.time, i = {
                cmdid: 10015,
                buff: {
                    room_id: this.model.relayInfo.room_id,
                    msg_info: {
                        msginfo: o
                    },
                    msg_seq: this.game.relayInstructionCtrl.msg_seq
                }
            };
            this.sendRelayCmd(i);
        }
    }, {
        key: "joinRoomSucc",
        value: function(e, t) {
            console.log("加入房间成功 joinRoomSucc"), this.clearSocketTimeout(), this.rpJoinRoom(0), 
            this.model.relayInfo.room_seed = t.room_seed, this.model.relayInfo.my_seat_no = t.my_seat_no, 
            this.model.relayInfo.next_room_id = t.next_room_id, this.model.relayInfo.room_wxa_code = "", 
            this.setCheckGameInterval(), 0 != t.my_seat_no && 1 == t.game_status ? this.rejoinRelay() : this.changePage("roomPage", t);
        }
    }, {
        key: "joinRelayRoomFail",
        value: function() {
            console.log("joinRelayRoomFail"), this.rpJoinRoom(1), this.view.showJoinRelayFail2(), 
            this.modeCtrl.changeMode("singleCtrl");
        }
    }, {
        key: "masterCreateRoomFail",
        value: function() {
            console.log("masterCreateRoomFail"), n.default.emit(i.EVENT.CREATE_RELAY_ROOM_FAIL, {
                result: 1
            }), this.view.showJoinRelayFail2(), this.modeCtrl.changeMode("singleCtrl");
        }
    }, {
        key: "createRoomSucc",
        value: function(e, t) {
            console.log("createRoomSucc"), this.clearSocketTimeout(), this.model.relayInfo.room_id = t.room_id, 
            this.model.relayInfo.room_seed = t.room_seed, this.model.relayInfo.my_seat_no = t.my_seat_no, 
            this.model.relayInfo.room_wxa_code = "", this.model.relayInfo.next_room_id = t.next_room_id, 
            this.setCheckGameInterval(), n.default.emit(i.EVENT.CREATE_RELAY_ROOM_FAIL, {
                result: 0
            }), this.changePage("roomPage", t);
        }
    }, {
        key: "sendRelayCmd",
        value: function(e) {
            var t = e.cmdid, o = e.buff;
            t && ("10006" != t && console.log("向服务器发送指令：", t, "数据：", o), o = JSON.stringify(o), 
            this.gameSocket.sendRelayCmd({
                cmdid: t,
                buff: o
            }));
        }
    }, {
        key: "clearSocketTimeout",
        value: function() {
            clearTimeout(this.reconnectTimeout), clearTimeout(this.socketTimeout), this.clearCheckGameInterval(), 
            this.socketTimeout = null, this.reconnectTimeout = null;
        }
    }, {
        key: "changePage",
        value: function(e, t) {
            this.currentPage && this.currentPage.hide();
            var o = this[e];
            o && (this.currentPage = o, this.model.setStage(o.name), this.currentPage.show(t));
        }
    }, {
        key: "shareRelay",
        value: function() {
            var e = this.model.relayInfo, t = e.room_id, o = e.router_id, n = i.VERSION, s = this.afterShareRelay.bind(this);
            this.isShareCard = !0, (0, a.ShareRelayCard)({
                room_id: t,
                router_id: o,
                version: n,
                cb: s
            }), this.reporter.rpClickShareObserve();
        }
    }, {
        key: "afterShareRelay",
        value: function(e, t) {
            if (console.log("shareTicket:", t, "session_id:", this.model.getSessionId()), e && t && this.gameSocket.alive) {
                var o = {
                    cmdid: 10014,
                    buff: {
                        room_id: this.model.relayInfo.room_id,
                        session_id: this.model.getSessionId(),
                        share_ticket: t,
                        share_query: "?" + e
                    }
                };
                this.sendRelayCmd(o), this.reporter.rpRelayClickCardShare();
            }
        }
    }, {
        key: "addEvent",
        value: function() {
            n.default.on(i.EVENT.RELAYCREATEROOM, this.createRoomSucc.bind(this)), n.default.on(i.EVENT.JOINRELAYROOM, this.joinRoomSucc.bind(this)), 
            n.default.on(i.EVENT.PEOPLECOME, this.upDateRoom.bind(this)), n.default.on(i.EVENT.PEOPLEOUT, this.upDateRoom.bind(this)), 
            n.default.on(i.EVENT.RELAYSTART, this.relayGameStart.bind(this)), n.default.on(i.EVENT.NOWPLAYERJUMP, this.sendPlayerJumpMsg.bind(this)), 
            n.default.on(i.EVENT.CHECKUSER, this.checkUser.bind(this)), n.default.on(i.EVENT.REPLAYAGAIN, this.joinNextRoom.bind(this)), 
            n.default.on(i.EVENT.SYNCMSGSEQ, this.syncMsgSeq.bind(this)), n.default.on(i.EVENT.SEND_CHECK_GAME, this.sendCheckGame.bind(this)), 
            n.default.on(i.EVENT.ENDGAME, this.endGame.bind(this)), n.default.on(i.EVENT.CHANGEGAMELEVEL, this.sendChangeGameLevel.bind(this)), 
            n.default.on(i.EVENT.RECEIVEGAMELEVELCHANGE, this.receiveGameLevelChange.bind(this)), 
            n.default.on(i.EVENT.GETRELAYQR, this.getRelayQR.bind(this)), n.default.on(i.EVENT.GETRELAYCHECKUSERERROR, this.syncRelay.bind(this)), 
            n.default.on(i.EVENT.SEND_REALTIME_MSG, this.sendRelayMsg.bind(this));
        }
    }, {
        key: "offEvent",
        value: function() {
            n.default.off(i.EVENT.RELAYCREATEROOM, this.createRoomSucc.bind(this)), n.default.off(i.EVENT.JOINRELAYROOM, this.joinRoomSucc.bind(this)), 
            n.default.off(i.EVENT.PEOPLECOME, this.upDateRoom.bind(this)), n.default.off(i.EVENT.PEOPLEOUT, this.upDateRoom.bind(this)), 
            n.default.off(i.EVENT.RELAYSTART, this.relayGameStart.bind(this)), n.default.off(i.EVENT.NOWPLAYERJUMP, this.sendPlayerJumpMsg.bind(this)), 
            n.default.off(i.EVENT.CHECKUSER, this.checkUser.bind(this)), n.default.off(i.EVENT.REPLAYAGAIN, this.joinNextRoom.bind(this)), 
            n.default.off(i.EVENT.SYNCMSGSEQ, this.syncMsgSeq.bind(this)), n.default.off(i.EVENT.SEND_CHECK_GAME, this.sendCheckGame.bind(this)), 
            n.default.off(i.EVENT.ENDGAME, this.endGame.bind(this)), n.default.off(i.EVENT.CHANGEGAMELEVEL, this.sendChangeGameLevel.bind(this)), 
            n.default.off(i.EVENT.RECEIVEGAMELEVELCHANGE, this.receiveGameLevelChange.bind(this)), 
            n.default.off(i.EVENT.GETRELAYQR, this.getRelayQR.bind(this)), n.default.off(i.EVENT.GETRELAYCHECKUSERERROR, this.syncRelay.bind(this)), 
            n.default.off(i.EVENT.SEND_REALTIME_MSG, this.sendRelayMsg.bind(this));
        }
    }, {
        key: "upDateRoom",
        value: function(e, t) {
            console.log("更新房间信息"), this.currentPage == this.roomPage && this.currentPage.show(t);
        }
    }, {
        key: "outRelay1",
        value: function() {
            var e = {
                cmdid: 10003,
                buff: {
                    room_id: this.model.relayInfo.room_id
                }
            };
            this.sendRelayCmd(e), this.modeCtrl.changeMode("singleCtrl");
        }
    }, {
        key: "outRelay2",
        value: function() {
            this.modeCtrl.changeMode("singleCtrl");
        }
    }, {
        key: "startRelay",
        value: function(e) {
            var t = {
                cmdid: 10004,
                buff: {
                    room_id: this.model.relayInfo.room_id,
                    game_level: e
                }
            };
            this.sendRelayCmd(t), this.setStartRelayReportTimeOut = setTimeout(function() {
                n.default.emit(i.EVENT.RP_RELAY_START, {
                    result: 1
                });
            }, 5e3);
        }
    }, {
        key: "relayGameStart",
        value: function(e) {
            this.changePage("gamePage"), clearTimeout(this.setStartRelayReportTimeOut), n.default.emit(i.EVENT.RP_RELAY_START, {
                result: 0
            });
        }
    }, {
        key: "sendPlayerJumpMsg",
        value: function(e, t) {
            var o = t.msginfo, i = t.jump_succ, n = t.msg_seq;
            if (this.model.relayInfo.my_seat_no) {
                var s = {
                    cmdid: 10009,
                    buff: {
                        room_id: this.model.relayInfo.room_id,
                        msg_info: {
                            msgid: this.model.relayInfo.room_id + Date.now(),
                            jump_succ: i,
                            msginfo: o
                        },
                        msg_seq: n
                    }
                };
                this.sendRelayCmd(s);
            }
        }
    }, {
        key: "checkUser",
        value: function(e, t) {
            var o = t.msgid, i = t.msg_seq, n = t.jump_succ;
            if (this.model.relayInfo.my_seat_no) {
                var s = {
                    cmdid: 10008,
                    buff: {
                        room_id: this.model.relayInfo.room_id,
                        msg_info: {
                            msgid: o,
                            jump_succ: n,
                            msg_seq: i
                        }
                    }
                };
                this.sendRelayCmd(s);
            }
        }
    }, {
        key: "endGame",
        value: function(e, t) {
            this.clearCheckGameInterval(), this.gamePage.hideScore(), n.default.emit(i.EVENT.RP_RELAY_GAME_END, {
                jielong_score: t.score,
                player_num: t.playerlist.length,
                max_audience: t.onlookerlist.length,
                difficulty: t.game_level
            });
        }
    }, {
        key: "syncMsgSeq",
        value: function(e, t) {
            var o = {
                cmdid: 10007,
                buff: {
                    room_id: this.model.relayInfo.room_id,
                    msg_seq: t.msg_seq
                }
            };
            this.sendRelayCmd(o);
        }
    }, {
        key: "setCheckGameInterval",
        value: function() {
            this.checkRelayInterval = setInterval(function() {
                n.default.emit(i.EVENT.CHECK_GAME, {});
            }, 2e3);
        }
    }, {
        key: "clearCheckGameInterval",
        value: function() {
            console.log("清除业务心跳"), clearInterval(this.checkRelayInterval), this.checkRelayInterval = null;
        }
    }, {
        key: "sendCheckGame",
        value: function(e, t) {
            if (this.model.relayInfo.my_seat_no) {
                var o = {
                    cmdid: 10006,
                    buff: {
                        room_id: t.room_id,
                        seq: t.seq
                    }
                };
                this.sendRelayCmd(o);
            }
        }
    }, {
        key: "joinNextRoom",
        value: function(e) {
            if (!this.model.relayInfo.next_room_id) return this.view.showJoinNextRoomFail(), 
            void this.modeCtrl.changeMode("singleCtrl");
            n.default.emitSync(i.EVENT.RELAYMODEDESTROY, {}), this.game.full2D.hide2D(), this.model.relayInfo.room_id = this.model.relayInfo.next_room_id, 
            this.model.relayInfo.room_wxa_code = "", this.joinNextRelayRoom();
        }
    }, {
        key: "afterGetMiniCode",
        value: function(e, t) {
            console.log("getMiniCode", "RECEIVEMINICODE"), this.upDateRoom(e, t);
        }
    }, {
        key: "getMiniCode",
        value: function() {
            var e = {
                cmdid: 10010,
                buff: {
                    room_id: this.model.relayInfo.room_id,
                    router_id: decodeURIComponent(this.model.relayInfo.router_id),
                    client_version: i.VERSION,
                    mode: "relay"
                }
            };
            this.sendRelayCmd(e);
        }
    }, {
        key: "watchRelay",
        value: function() {
            this.rejoinRelay();
        }
    }, {
        key: "rejoinRelay",
        value: function() {
            n.default.emitSync(i.EVENT.WATCHRELAY, {}), this.changePage("gamePage");
        }
    }, {
        key: "syncRelay",
        value: function() {
            n.default.emitSync(i.EVENT.WATCHRELAY, {});
        }
    }, {
        key: "onSocketCloseErr",
        value: function() {
            this.socketTimeout || (this.clearSocketTimeout(), this.model.relayInfo.room_id && this.model.relayInfo.router_id ? this.reconnectSocket() : this.modeCtrl.changeMode("singleCtrl"));
        }
    }, {
        key: "reconnectSocket",
        value: function() {
            var e = this.reconnectSocketFail.bind(this);
            this.joinRelayRoom(e);
        }
    }, {
        key: "reconnectSocketFail",
        value: function() {
            this.gameSocket.close(), this.clearSocketTimeout(), clearTimeout(this.reconnectTimeout), 
            this.reconnectTimeout = setTimeout(this.reconnectSocket.bind(this), 3e3);
        }
    }, {
        key: "progressOver",
        value: function(e) {
            var t = {
                cmdid: 10013,
                buff: {
                    room_id: this.model.relayInfo.room_id,
                    msg_seq: this.game.relayInstructionCtrl.msg_seq
                }
            };
            console.log("告诉服务器这个人过时"), this.sendRelayCmd(t);
        }
    }, {
        key: "receiveGameLevelChange",
        value: function(e, t) {
            this.upDateRoom(e, t);
        }
    }, {
        key: "sendChangeGameLevel",
        value: function(e, t) {
            var o = {
                cmdid: 10012,
                buff: {
                    room_id: this.model.relayInfo.room_id,
                    game_level: t
                }
            };
            console.log("告诉服务器房间的难度改变"), this.sendRelayCmd(o);
        }
    }, {
        key: "rpJoinRoom",
        value: function(e) {
            2 == this.scene ? n.default.emit(i.EVENT.RP_JOIN_RELAY_ROOM_AGAIN, {
                res: e
            }) : n.default.emit(i.EVENT.RP_JOIN_RELAY_ROOM, {
                scene: this.scene,
                result: e
            });
        }
    }, {
        key: "getRelayQR",
        value: function() {
            this.model.relayInfo.room_wxa_code ? n.default.emitSync(i.EVENT.RECEIVEMINICODE, {
                room_wxa_code: this.model.relayInfo.room_wxa_code
            }) : this.getMiniCode(), this.reporter.rpRelayClickSunCode();
        }
    }, {
        key: "checkCmd",
        value: function() {
            var e = this.game.relayInstructionCtrl.cmdList, t = !1;
            return e.length && e[e.length - 1].buff.game_status > 0 && (t = !0), t;
        }
    }, {
        key: "wxOnShow",
        value: function() {
            this.isShareCard ? this.checkCmd() ? this.onSocketCloseErr() : this.game.relayInstructionCtrl.run() : (this.game.relayInstructionCtrl.handleOnShow(), 
            this.onSocketCloseErr()), this.socketMonitor.log("|os|"), this.isShareCard = !1;
        }
    }, {
        key: "wxOnhide",
        value: function() {
            this.isShareCard ? this.game.relayInstructionCtrl.stop() : (this.clearSocketTimeout(), 
            this.gameSocket.close(), this.game.relayInstructionCtrl.handleOnhide()), this.socketMonitor.log("|oh|");
        }
    }, {
        key: "gotoRelayMode",
        value: function() {
            n.default.emitSync(i.EVENT.RELAYMODEDESTROY, {}), this.game.full2D.hide2D(), this.clearSocketTimeout(), 
            this.scene = 1, this.model.relayInfo = {}, this.onSocketOpenCb = function() {}, 
            this.game.relayInstructionCtrl.destroy(), this.createRoomNoAddEvent();
        }
    }, {
        key: "destroy",
        value: function() {
            this.clearSocketTimeout(), this.gameSocket.close(), this.model.relayInfo = {}, this.onSocketOpenCb = function() {}, 
            this.offEvent(), this.game.full2D.hide2D(), wx.hideLoading(), this.game.relayInstructionCtrl.destroy(), 
            this.game.resetScene(), n.default.emitSync(i.EVENT.RELAYMODEDESTROY, {});
        }
    } ]), e;
}();

exports.default = d;