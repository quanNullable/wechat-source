function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function s(e, s) {
    if (!(e instanceof s)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, s) {
        for (var t = 0; t < s.length; t++) {
            var f = s[t];
            f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), 
            Object.defineProperty(e, f.key, f);
        }
    }
    return function(s, t, f) {
        return t && e(s.prototype, t), f && e(s, f), s;
    };
}(), f = e(require("../lib/mue/eventcenter")), i = require("../config"), o = (e(i), 
e(require("../network/network"))), n = function() {
    function e(t) {
        var o = this;
        s(this, e), this.game = t, this.runningSeq = 0, this.cmdList = [], this.seq = 0, 
        this.model = t.gameModel, this.monitor = this.game.socketMonitor, f.default.on(i.EVENT.WATCHRELAY, function() {
            o.sync();
        }), f.default.on(i.EVENT.CHECK_GAME, function() {
            f.default.emit(i.EVENT.SEND_CHECK_GAME, {
                room_id: o.model.relayInfo.room_id || "",
                seq: o.seq
            });
        });
    }
    return t(e, [ {
        key: "cmdCome",
        value: function(e) {
            if (0 == e.ret) {
                var s = JSON.parse(e.data);
                if (0 == s.error_code) {
                    if (!s.buff) return;
                    if (s.buff = JSON.parse(s.buff), 10006 != s.cmdid && console.log("收到帧，cmdid：", s.cmdid, "帧房号:" + s.buff.room_id + "本机房号" + this.model.relayInfo.room_id + (s.buff.room_id == this.model.relayInfo.room_id ? "匹配" : "不匹配"), "数据：", s), 
                    10009 == s.cmdid || 10008 == s.cmdid || 10006 == s.cmdid || 10004 == s.cmdid || 10012 == s.cmdid || 10013 == s.cmdid || 10014 == s.cmdid || 10015 == s.cmdid) return;
                    if (10001 != s.cmdid) {
                        if (s.buff.room_id != this.model.relayInfo.room_id) return void console.log("房间号不匹配丢弃帧，cmdid：", s.cmdid, "数据:");
                        if (10007 == s.cmdid) return void this.parseCmd(s);
                        10002 != s.cmdid && 10011 != s.cmdid || (this.cmdList = [], this.canRunningCmd = !0);
                    } else this.cmdList = [], this.canRunningCmd = !0;
                    this.cmdList.push(s), this.runCmd();
                } else {
                    var t = String(s.error_code);
                    "-1019" == t ? (this.handleSyncWrong(), o.default.sendServerError(3)) : "-1015" != t && t < 0 && this.debug(t, s.error_msg + "cmd" + e.cmd, s);
                }
            } else this.debug("ret:" + e.ret, "cmd:" + e.cmd), "-1" == String(e.ret) && o.default.sendServerError(4);
        }
    }, {
        key: "runCmd",
        value: function() {
            if (this.cmdList.length && this.canRunningCmd) {
                this.cmdList.sort(function(e, s) {
                    return e.ts - s.ts;
                });
                var e = this.cmdList.shift(), s = e.cmdid;
                if (10001 == s || 10002 == s || 10010 == s || 10011 == s) return 10010 != s && (this.seq = e.buff.seq, 
                this.msg_seq = -1), this.parseCmd(e), void this.runCmd();
                if (e.buff.seq > this.seq) {
                    var t = e.buff.msg_seq - this.msg_seq;
                    if (0 == t || 1 == t && "20006" == e.cmdid) return this.parseCmd(e), this.seq = e.buff.seq, 
                    this.msg_seq = e.buff.msg_seq, void this.runCmd();
                    console.log("丢帧了"), this.sync();
                } else 20008 == s && e.buff.msg_seq - this.msg_seq == 0 && (console.log("realtime run"), 
                this.parseCmd(e)), this.runCmd();
            }
        }
    }, {
        key: "sync",
        value: function() {
            this.canRunningCmd = !1, this.cmdList = [], f.default.emitSync(i.EVENT.SYNCMSGSEQ, {
                msg_seq: this.msg_seq
            }), this.clearSyncTimeOut(), this.setSyncTimeOut();
        }
    }, {
        key: "setSyncTimeOut",
        value: function() {
            this.syncTimeOutArr || (this.syncTimeOutArr = []), this.syncTimeOutArr.push(setTimeout(this.sync.bind(this), 5e3));
        }
    }, {
        key: "clearSyncTimeOut",
        value: function() {
            if (Array.isArray(this.syncTimeOutArr)) for (;this.syncTimeOutArr.length; ) {
                var e = this.syncTimeOutArr.pop();
                clearTimeout(e);
            }
        }
    }, {
        key: "receiveSyncCmd",
        value: function(e) {
            if (this.clearSyncTimeOut(), 2 == e.buff.game_status) return f.default.emitSync(i.EVENT.ENDGAME, e.buff), 
            void (this.cmdList = []);
            f.default.emitSync(i.EVENT.SYNCSCENE, {
                now_msg_seq: this.msg_seq,
                serverData: e.buff
            }), this.msg_seq = e.buff.msg_seq, this.seq = e.buff.seq, this.canRunningCmd = !0, 
            this.runCmd();
        }
    }, {
        key: "parseCmd",
        value: function(e) {
            switch (e.cmdid) {
              case 10001:
                console.log(10001, "创建房间", e.buff), this.monitor.log("|10001;" + e.buff.room_id + ";" + e.buff.seq + ";" + e.buff.msg_seq), 
                f.default.emitSync(i.EVENT.RELAYCREATEROOM, e.buff);
                break;

              case 10002:
                console.log(10002, "加入房间", e.buff), this.monitor.log("|10002;" + e.buff.room_id + ";" + e.buff.seq + ";" + e.buff.msg_seq), 
                0 == e.buff.my_seat_no && 0 != e.buff.game_status && (this.canRunningCmd = !1), 
                f.default.emitSync(i.EVENT.JOINRELAYROOM, e.buff);
                break;

              case 10011:
                console.log(10011, "加入下局房间", e.buff), this.monitor.log("|10011;" + e.buff.room_id + ";" + e.buff.seq + ";" + e.buff.msg_seq), 
                0 == e.buff.my_seat_no && 0 != e.buff.game_status && (this.canRunningCmd = !1), 
                f.default.emitSync(i.EVENT.JOINRELAYROOM, e.buff);
                break;

              case 20004:
                this.adJustBuff(e.buff, 1), this.monitor.log("|20004;" + e.buff.seq + ";" + e.buff.msg_seq), 
                console.log(20004, "有玩家加入", e.buff), f.default.emitSync(i.EVENT.PEOPLECOME, e.buff);
                break;

              case 20005:
                this.adJustBuff(e.buff, 1), this.monitor.log("|20005;" + e.buff.seq + ";" + e.buff.msg_seq), 
                console.log(20005, "有玩家退出", e.buff), f.default.emitSync(i.EVENT.PEOPLEOUT, e.buff);
                break;

              case 20001:
                this.adJustBuff(e.buff), console.log(20001, "游戏开始 ——————————————————", e.buff), 
                this.monitor.log("|20001;" + e.buff.seq + ";" + e.buff.msg_seq + ";" + e.buff.game_level), 
                console.log("20001 my_seat_no", this.model.relayInfo.my_seat_no), f.default.emitSync(i.EVENT.RELAYSTART, e.buff);
                break;

              case 20006:
                this.adJustBuff(e.buff), console.log(20006, "别人跳了一下 ——————————————————", e.buff.msg_seq, e.buff), 
                this.monitor.log("|20006;" + e.buff.seq + ";" + e.buff.msg_seq), console.log("20006 my_seat_no", this.model.relayInfo.my_seat_no), 
                f.default.emitSync(i.EVENT.RELAYCHECKUSER, e.buff);
                break;

              case 20002:
                this.adJustBuff(e.buff), console.log(20002, "回合往前进一下 ——————————————————", e.buff.msg_seq, e.buff), 
                this.monitor.log("|20002;" + e.buff.seq + ";" + e.buff.msg_seq), console.log("20002 my_seat_no", this.model.relayInfo.my_seat_no), 
                f.default.emitSync(i.EVENT.RUNGAME, e.buff);
                break;

              case 20003:
                this.adJustBuff(e.buff), this.monitor.log("|20003;" + e.buff.room_id + ";" + e.buff.seq + ";" + e.buff.msg_seq), 
                console.log(20003, "整个游戏结束", e.buff), console.log("20003 my_seat_no", this.model.relayInfo.my_seat_no), 
                e.buff && "-1019" == e.buff.error_ret && this.monitor.report(), f.default.emitSync(i.EVENT.ENDGAME, e.buff);
                break;

              case 10010:
                this.model.relayInfo.room_id && (this.model.relayInfo.room_wxa_code = e.buff.room_wxa_code), 
                this.adJustBuff(e.buff), console.log(10010, "收到二维码", e.buff), console.log("10010 my_seat_no", this.model.relayInfo.my_seat_no), 
                f.default.emitSync(i.EVENT.RECEIVEMINICODE, e.buff);
                break;

              case 10007:
                this.adJustBuff(e.buff), console.log(10007, "收到同步帧流", e.buff), this.monitor.log("|10007;" + e.buff.seq + ";" + e.buff.msg_seq), 
                this.receiveSyncCmd(e);
                break;

              case 20007:
                this.adJustBuff(e.buff, 1), console.log(20007, "房间难度等级改变", e.buff), f.default.emitSync(i.EVENT.RECEIVEGAMELEVELCHANGE, e.buff);
                break;

              case 20008:
                this.adJustBuff(e.buff), console.log(20008, "接收实时按压帧", e.buff), f.default.emitSync(i.EVENT.RECEIVE_REALTIME_MSG, e.buff);
                break;

              default:
                console.log("没有执行的帧", e);
            }
        }
    }, {
        key: "adJustBuff",
        value: function(e, s) {
            e.my_seat_no = this.model.relayInfo.my_seat_no, s && (e.room_wxa_code = this.model.relayInfo.room_wxa_code), 
            e.score = this.game.UI.score, console.log("修正数据,玩家房号:", e.my_seat_no);
        }
    }, {
        key: "debug",
        value: function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0], arguments.length > 1 && void 0 !== arguments[1] && arguments[1], 
            arguments[2];
            return;
        }
    }, {
        key: "run",
        value: function() {
            this.canRunningCmd = !0, this.runCmd();
        }
    }, {
        key: "stop",
        value: function() {
            this.canRunningCmd = !1;
        }
    }, {
        key: "handleOnShow",
        value: function() {
            this.cmdList = [], this.canRunningCmd = !0;
        }
    }, {
        key: "handleOnhide",
        value: function() {
            this.clearSyncTimeOut(), this.cmdList = [], this.stop();
        }
    }, {
        key: "handleSyncWrong",
        value: function() {
            wx.showModal({
                title: "提示",
                content: "游戏异常，请重新开始游戏",
                showCancel: !1
            });
        }
    }, {
        key: "destroy",
        value: function() {
            this.clearSyncTimeOut(), this.cmdList = [], this.stop(), this.seq = 0, this.msg_seq = -1;
        }
    } ]), e;
}();

exports.default = n;