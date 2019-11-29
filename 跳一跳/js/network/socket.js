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
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t;
    };
}(), n = e(require("../store/session")), o = e(require("./network")), s = function() {
    function e(a) {
        var n = this;
        t(this, e), this.alive = !1, this.noErr = !1, this.game = a, this.handlers = {}, 
        this.handleSocketErr = "", this.heartBeat = [], wx.onSocketOpen(function(e) {
            n.alive = !0, "relay" == n.game.mode ? n.game.gameCtrl.onSocketOpen() : n.joinGame();
        }), wx.onSocketClose(function(e) {
            "player" != n.game.mode || n.noErr || (o.default.quitGame(), n.game.gameCtrl.onSocketCloseErr()), 
            "observe" != n.game.mode || n.noErr || n.game.gameCtrl.onSocketCloseErr(), "relay" != n.game.mode || n.noErr || n.game.gameCtrl.onSocketCloseErr(), 
            n.alive = !1, console.log("Socket close", e, "是否正常关闭：", n.noErr);
        }), wx.onSocketError(function(e) {}), wx.onSocketMessage(function(e) {
            n.cleanHeartBeat(), n.heartBeat.push(setTimeout(n.sendHeartBeat.bind(n), 5e3));
            var t;
            try {
                t = JSON.parse(e.data);
            } catch (e) {
                return n.game.handleWxOnError({
                    message: "socket receive wrong msg JSON.parse(res.data) error",
                    stack: ""
                }), void wx.closeSocket();
            }
            t.cmd, 106 === t.cmd && n.handleACK(t), 101 === t.cmd && n.handleJoinGame(t), t.cmd, 
            108 === t.cmd && n.handlePeopleCome(t), 102 === t.cmd && n.receiveCommand(t), 109 == t.cmd && n.close(), 
            107 == t.cmd && n.handlePlayerOut(), 401 != t.cmd && 402 != t.cmd || n.handleRelayCMD(t);
        });
    }
    return a(e, [ {
        key: "cleanHeartBeat",
        value: function() {
            if (this.heartBeat.length) for (;this.heartBeat.length; ) {
                var e = this.heartBeat.pop();
                clearTimeout(e);
            }
        }
    }, {
        key: "connectSocket",
        value: function() {
            var e = this;
            console.log("connectSocket"), wx.connectSocket({
                url: "wss://wxagame.weixin.qq.com",
                success: function() {
                    console.log("wx.connectSocket success");
                },
                fail: function(t) {
                    e.alive = !1;
                }
            });
        }
    }, {
        key: "sendCommand",
        value: function(e, t) {
            var a = n.default.gameId, o = n.default.gameTicket;
            if (a && o && e) if ("string" == typeof a) {
                var s = {
                    cmd: 102,
                    i: a,
                    n: e,
                    k: o,
                    o: [ JSON.stringify(t) ]
                };
                wx.sendSocketMessage({
                    data: JSON.stringify(s)
                });
            } else console.warn("Socket send cmd need gameId");
        }
    }, {
        key: "sendNullCommand",
        value: function() {
            var e = n.default.gameId, t = n.default.gameTicket;
            if (e && t) if ("string" == typeof e) {
                var a = {
                    cmd: 102,
                    i: e,
                    k: t,
                    o: []
                };
                wx.sendSocketMessage({
                    data: JSON.stringify(a)
                });
            } else console.warn("Socket send cmd need gameId");
        }
    }, {
        key: "getCommand",
        value: function(e) {}
    }, {
        key: "sendRelayCmd",
        value: function(e) {
            var t = this;
            if (this.game.gameModel.relayInfo.router_id && n.default.sessionId && e) {
                var a = JSON.stringify(e), o = {
                    cmd: 401,
                    router_id: this.game.gameModel.relayInfo.router_id,
                    session_id: n.default.sessionId,
                    fast: 1,
                    data: a
                };
                wx.sendSocketMessage({
                    data: JSON.stringify(o),
                    fail: function(e) {
                        e && e.errMsg && e.errMsg.match(/WebSocket is not connected$/) && (t.alive = !1);
                    }
                });
            }
        }
    }, {
        key: "onRelayCmdCome",
        value: function(e) {
            this.handleRelayCMD = e;
        }
    }, {
        key: "onPeopleCome",
        value: function(e) {
            this.peopleCome = e;
        }
    }, {
        key: "onReciveCommand",
        value: function(e) {
            this.observerMessage = e;
        }
    }, {
        key: "onJoinSuccess",
        value: function(e) {
            this.joinSuccess = e;
        }
    }, {
        key: "onPlayerOut",
        value: function(e) {
            this.playerOutHandler = e;
        }
    }, {
        key: "receiveCommand",
        value: function(e) {
            "function" == typeof this.observerMessage && e.o && e.o[0] && e.o[0].o && this.observerMessage(e.n, JSON.parse(e.o[0].o));
        }
    }, {
        key: "handlePeopleCome",
        value: function(e) {
            "function" == typeof this.peopleCome && this.peopleCome(e);
        }
    }, {
        key: "receiveACK",
        value: function() {}
    }, {
        key: "joinGame",
        value: function() {
            var e = n.default.gameId;
            if (n.default.sessionId && e) {
                var t = {
                    cmd: 101,
                    game_id: e,
                    fast: 1,
                    session_id: n.default.sessionId
                };
                wx.sendSocketMessage({
                    data: JSON.stringify(t)
                });
            }
        }
    }, {
        key: "handleACK",
        value: function(e) {
            this.handlers.ack && this.handlers.ack.forEach(function(t) {
                t(e);
            });
        }
    }, {
        key: "handleJoinGame",
        value: function(e) {
            if ("observe" == this.game.mode) switch (e.ret) {
              case 0:
              case 2:
                this.joinSuccess(!0);
                break;

              default:
                this.joinSuccess(!1);
            } else 0 != e.ret ? this.joinSuccess(!1) : this.joinSuccess(!0);
        }
    }, {
        key: "sendHeartBeat",
        value: function() {
            if ("player" == this.game.mode) this.sendNullCommand(); else {
                var e = {
                    cmd: 104
                };
                wx.sendSocketMessage({
                    data: JSON.stringify(e)
                });
            }
        }
    }, {
        key: "quitObserve",
        value: function() {
            if (this.alive) {
                var e = {
                    cmd: 109,
                    fast: 1,
                    game_id: n.default.gameId,
                    session_id: n.default.sessionId
                };
                wx.sendSocketMessage({
                    data: JSON.stringify(e)
                });
            }
        }
    }, {
        key: "close",
        value: function() {
            var e = this;
            this.alive && (this.cleanHeartBeat(), this.noErr = !0, console.log("emmit close"), 
            wx.closeSocket(), n.default.clearShareTicket(), n.default.clearGameId(), setTimeout(function() {
                e.reset();
            }, 1e3));
        }
    }, {
        key: "onSocketErr",
        value: function(e) {
            this.handleSocketErr = e;
        }
    }, {
        key: "reset",
        value: function() {
            this.noErr = !1;
        }
    }, {
        key: "handlePlayerOut",
        value: function() {
            "function" == typeof this.playerOutHandler && this.playerOutHandler();
        }
    } ]), e;
}();

exports.default = s;