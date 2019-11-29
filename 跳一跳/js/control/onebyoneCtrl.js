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
}(), i = e(require("../lib/mue/eventcenter")), n = e(require("../pages/headimgAnimation")), o = require("../config"), s = require("../lib/animation"), m = function() {
    function e(a, i) {
        t(this, e), this.game = a, this.camera = i, this.waitingList = [], this.playerOver = !0, 
        this.bindEvent();
    }
    return a(e, [ {
        key: "isDied",
        value: function() {
            if (this.data) for (var e = 0, t = this.data.playerlist.length; e < t; ++e) if (this.data.playerlist[e].seat_no == this.data.my_seat_no) return this.data.playerlist[e].rank > 0;
        }
    }, {
        key: "bindEvent",
        value: function() {
            var e = this;
            i.default.on(o.EVENT.RELAYSTART, function(t, a) {
                e.game.resetScene(a.room_seed, {
                    bottleShowupAnimation: !0,
                    gameLevel: a.game_level,
                    bottleSkin: null
                }), console.log("resetScene", a.room_seed, {
                    gameLevel: a.game_level
                }), e.data = a, e.game.myTurn = a.my_seat_no == a.now_player_seat_no, e.game.myTurn && (e.playerOver = !1), 
                console.log(" EVENT.RELAYSTART this.game.myTurn", e.game.myTurn, a.my_seat_no, a.now_player_seat_no);
            }), i.default.on(o.EVENT.ENDGAME, function(t, a) {
                e.over = !0;
            }), i.default.on(o.EVENT.RECEIVE_REALTIME_MSG, function(t, a) {
                console.log("RECEIVE_REALTIME_MSG", a), e.waitingList.length > 0 || e.game.myTurn ? console.log("return waityinglist length > 0") : "-1" == a.realtime_msg.msginfo ? e.game.handleInterrupt() : (e.game.touchStartAnim(), 
                e.game.bottle.relayLimitTime(parseFloat(a.realtime_msg.msginfo)), e.game.currentBlock.relayLimitTime(parseFloat(a.realtime_msg.msginfo)));
            }), i.default.on(o.EVENT.SEND_REALTIME_MSG_TO_CTRL, function(t, a) {
                e.game.myTurn && i.default.emit(o.EVENT.SEND_REALTIME_MSG, {
                    time: a.time
                });
            }), i.default.on(o.EVENT.RELAYCHECKUSER, function(t, a) {
                console.log("relayCheckUser", a), a.my_seat_no != a.now_player_seat_no ? (console.log("in relayCheckUser"), 
                a.msg_info.msginfo = JSON.parse(a.msg_info.msginfo), console.log("xxxx RELAYCHECKUSER", a.my_seat_no, a.now_player_seat_no, a.msg_info.msg_seq, a.msg_info.msg_id), 
                !e.playerOver || e.waitingList.length > 0 ? (a.myType = "checkuser", console.log("push checkuser to waitingList"), 
                e.waitingList.push(a)) : e._play(a)) : e.nowPlayerJump = !1;
            }), i.default.on(o.EVENT.RUNGAME, function(t, a) {
                if (console.log("ddddddddddd RUNGAME", a.my_seat_no, a.now_player_seat_no, e.playerOver), 
                e.nowPlayerJump) return console.log("RUNGAME check user EORROR", a.my_seat_no, a.now_player_seat_no, e.playerOver), 
                void i.default.emitSync(o.EVENT.GETRELAYCHECKUSERERROR);
                e.playerOver && e.waitingList.length <= 0 ? (e.game.myTurn = a.my_seat_no == a.now_player_seat_no, 
                e.game.clicked = !1, e.data = a, e.game.myTurn && (e.playerOver = !1), i.default.emit(o.EVENT.ORDERRUNGAME, a)) : (a.myType = "rungame", 
                console.log("push rungame to waitingList"), e.waitingList.push(a)), console.log("回合推进EVENT.RUNGAME，是否轮到我:", e.game.myTurn, "我的座位号：", a.my_seat_no, "当前玩的人座位号", a.now_player_seat_no);
            }), i.default.on(o.EVENT.NOWPLAYEROVER, function(t, a) {
                if (e.playerOver = !0, console.log("in NOWPLAYEROVER data", a), 1 != a.hit && 7 != a.hit && 2 != a.hit && !e.over && e.data && 0 != e.data.my_seat_no && (a.fromProgressOver && !e.game.myTurn || i.default.emitSync(o.EVENT.PLAYERDIED, {
                    player_rank: e.data.playerlist.length - e.data.failer_count,
                    player_count: e.data.playerlist.length,
                    my_seat_no: e.data.my_seat_no,
                    playerlist: e.data.playerlist,
                    now_player_seat_no: e.data.now_player_seat_no
                })), 0 !== a.hit && 3 !== a.hit && 4 !== a.hit && 5 !== a.hit && 6 !== a.hit || (e.waitingList.length > 0 ? e.game.relayBottleReset({
                    noAnimation: !0
                }) : e.game.relayBottleReset()), e.game.myTurn || e.over || 0 == a.my_seat_no || a.fromProgressOver || e.isDied() || !e.data || i.default.emitSync(o.EVENT.CHECKUSER, {
                    jump_succ: 1 == a.hit || 7 == a.hit || 2 == a.hit ? 1 : 0,
                    msgid: e.data.msg_info.msgid,
                    msg_seq: e.data.msg_info.msg_seq
                }), e.waitingList.length > 1) {
                    for (s.TweenAnimation.killAll(), e.game.camera.position.x = e.game.camera.destination[0] || e.game.camera.position.x, 
                    e.game.camera.position.z = e.game.camera.destination[1] || e.game.camera.position.z, 
                    e.game.camera.destination = [ null, null ], e.game.bottle.obj.position.x = e.game.bottle.destination[0] || e.game.bottle.obj.position.x, 
                    e.game.bottle.obj.position.z = e.game.bottle.destination[1] || e.game.bottle.obj.position.z; e.waitingList.length > 0; ) if ("checkuser" == (n = e.waitingList.shift()).myType) e.speedUpPlay(n, {
                        fromWaitingList: !0
                    }); else if ("rungame" == n.myType) {
                        if (!(m = n)) continue;
                        e.game.myTurn = m.my_seat_no == m.now_player_seat_no, e.game.clicked = !1, e.data = m, 
                        e.game.myTurn && (e.playerOver = !1), i.default.emitSync(o.EVENT.ORDERRUNGAME, m);
                    }
                } else if (1 == e.waitingList.length) {
                    var n = e.waitingList.shift();
                    if ("checkuser" == n.myType) e._play(n); else if ("rungame" == n.myType) {
                        var m = n;
                        if (!m) return;
                        e.game.myTurn = m.my_seat_no == m.now_player_seat_no, e.game.clicked = !1, e.data = m, 
                        e.game.myTurn && (e.playerOver = !1), i.default.emitSync(o.EVENT.ORDERRUNGAME, m);
                    }
                }
            }), i.default.on(o.EVENT.NOWPLAYERJUMP, function() {
                e.nowPlayerJump = !0;
            }), i.default.on(o.EVENT.SYNCSCENE, function(t, a) {
                if (console.log("SYNCSCENE"), a && a.serverData) {
                    e.destroy();
                    var i = 0 == a.serverData.my_seat_no;
                    if (e.game.isObserver = i, console.log("syncsene", a.now_msg_seq), console.log("zset", a.serverData.room_seed, a.serverData.game_level), 
                    e.game.resetScene(a.serverData.room_seed, {
                        gameLevel: a.serverData.game_level,
                        bottleSkin: null
                    }), a.serverData.msg_list && a.serverData.msg_list.msg_list) for (var n = 0, o = a.serverData.msg_list.msg_list.length; n < o; ++n) a.serverData.msg_list.msg_list[n].msginfo = JSON.parse(a.serverData.msg_list.msg_list[n].msginfo), 
                    e.speedUpPlay(a.serverData.msg_list.msg_list[n]);
                }
            }), i.default.on(o.EVENT.SHOW_RELAY_GUIDE, function(t, a) {
                console.log("SHOW_RELAY_GUIDE");
                var i = [ {
                    headimg: "res/2d/dog1.jpg",
                    seat_no: 1
                }, {
                    headimg: "res/2d/dog2.jpg",
                    seat_no: 2
                }, {
                    headimg: "res/2d/dog3.jpg",
                    seat_no: 3
                }, {
                    headimg: "res/2d/dog4.jpg",
                    seat_no: 4
                }, {
                    headimg: "res/2d/dog5.jpg",
                    seat_no: 5
                } ];
                e.headimgAnimation = new n.default(), e.headimgAnimation.set(i, {
                    noEmit: !0
                }), e.headimgAnimation.obj.position.x = -8.8, e.headimgAnimation.obj.position.y = 20, 
                e.camera.add(e.headimgAnimation.obj), e.headimgTimer = setInterval(function() {
                    e.headimgAnimation.next();
                }, 4e3), e.game.resetScene(void 0, {
                    bottleSkin: null
                }), setTimeout(function() {
                    e.game.animating = !0, e.game.loopAnimate();
                }, 3500);
            }), i.default.on(o.EVENT.RELAYMODEDESTROY, function() {
                e.destroy();
            }), i.default.on(o.EVENT.SKIP_RELAY_GUIDE, function() {
                e.game.resetScene(void 0, {
                    bottleSkin: null
                }), e.headimgTimer && (clearInterval(e.headimgTimer), e.headimgTimer = null), e.camera.remove(e.headimgAnimation.obj);
            }), i.default.on(o.EVENT.PROGRESSOVER, function() {
                "jump" != e.game.bottle.status && (e.game.myTurn && (e.game.clicked = !0, e.game.handleInterrupt()), 
                i.default.emitSync(o.EVENT.NOWPLAYEROVER, {
                    fromProgressOver: !0
                }));
            });
        }
    }, {
        key: "speedUpPlay",
        value: function(e, t) {
            if (!this.over) {
                this.data = e;
                var a, i;
                t && t.fromWaitingList ? (console.log("from waitingList", e, e.msg_info.msginfo.initY, e.msg_info.msginfo.duration), 
                a = e.msg_info.msginfo.initY, i = e.msg_info.msginfo.duration) : (a = e.msginfo.initY, 
                i = e.msginfo.duration);
                var n = this.game.touchEndAnim(i, a, null, null, {
                    noAnimation: !0
                });
                1 == n || 7 == n ? (this.game.succeed({
                    noAnimation: !0
                }), 1 === n ? (++this.game.doubleHit, this.game.UI.addScore(1, !0, !1)) : (this.game.doubleHit = 0, 
                this.game.UI.addScore(1, !1, !1))) : 2 == n ? (this.game.bottle.obj.position.x = this.game.bottle.destination[0], 
                this.game.bottle.obj.position.z = this.game.bottle.destination[1]) : this.game.relayBottleReset({
                    noAnimation: !0
                });
            }
        }
    }, {
        key: "_play",
        value: function(e, t) {
            var a = this;
            if (this.over) console.log("疑问播放帧：", e, e.msg_seq); else {
                console.log("确认播放帧：", e, e.msg_seq), this.data = e, this.playerOver = !1;
                var i = e.msg_info.msginfo.initY, n = e.msg_info.msginfo.duration;
                this.game.touchStartAnim(t);
                var o = Math.max(n - this.game.bottle.prepareTime, 0);
                this.jumpTimer = setTimeout(function() {
                    a.hit = a.game.touchEndAnim(n, i, null, null);
                }, 1e3 * o);
            }
        }
    }, {
        key: "destroy",
        value: function() {
            console.log("destroy relay"), this.over = !1, this.data = null, this.waitingList = [], 
            this.nowPlayerJump = !1, this.playerOver = !0, this.game.clicked = !1, this.game.isObserver = !1, 
            this.jumpTimer && (clearTimeout(this.jumpTimer), this.jumpTimer = null), this.deadTimer && (clearTimeout(this.deadTimer), 
            this.deadTimer = null), this.headimgTimer && (clearInterval(this.headimgTimer), 
            this.headimgTimer = null), this.headimgAnimation && this.camera.remove(this.headimgAnimation.obj);
        }
    } ]), e;
}();

exports.default = m;