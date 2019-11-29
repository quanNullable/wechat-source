function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = function() {
    function i(e) {
        t(this, i), this.game = e, this.commandList = [], this.isRunning = !1, this.icTimeout = null, 
        this.cmdHandler = function() {}, this.gameId = 0, this.seq = 0, this.currentSeq = null, 
        this.waited = !1;
    }
    return e(i, [ {
        key: "onReceiveCommand",
        value: function(t, e) {
            t._seq = e, this.gameId != this.game.gameCtrl.modeCtrl.observeCtrl.gameId && (this.gameId = this.game.gameCtrl.modeCtrl.observeCtrl.gameId, 
            this.seq = e - 1);
            var i = e - this.seq;
            if (1 != i) {
                var n;
                i > 1 && (n = 0), i < 1 && (n = 1), this.game.sendServerError(n), this.game.socketFirstSync = !0;
            }
            this.seq = e, (!this.currentSeq || e > this.currentSeq) && (this.commandList.push(t), 
            this.commandList.sort(function(t, e) {
                return t._seq - e._seq;
            }), this.checkRunningState());
        }
    }, {
        key: "checkRunningState",
        value: function() {
            this.isRunning || this.runCommand();
        }
    }, {
        key: "runCommand",
        value: function() {
            var t = this, e = this.commandList[0];
            if (e) if (this.isRunning = !0, !this.currentSeq || this.currentSeq && e._seq - this.currentSeq == 1) this.waited = !1, 
            this.currentSeq = e._seq, this.commandList.shift(), this.cmdHandler(e); else if (e._seq - this.currentSeq > 1) {
                if (this.waited) return this.waited = !1, this.currentSeq = e._seq, this.commandList.shift(), 
                void this.cmdHandler(e);
                this.waited = !0, this.timer = setTimeout(function() {
                    t.runCommand();
                }, 100);
            }
        }
    }, {
        key: "bindCmdHandler",
        value: function(t) {
            this.cmdHandler = t;
        }
    }, {
        key: "onCmdComplete",
        value: function() {
            this.commandList.length ? this.runCommand() : this.isRunning = !1;
        }
    }, {
        key: "destroy",
        value: function() {
            this.timer && (clearTimeout(this.timer), this.timer = null), this.commandList = [], 
            this.gameId = 0, this.seq = 0, this.currentSeq = null, this.waited = !1, this.icTimeout && clearTimeout(this.icTimeout), 
            this.icTimeout = null, this.isRunning = !1;
        }
    } ]), i;
}();

exports.default = i;