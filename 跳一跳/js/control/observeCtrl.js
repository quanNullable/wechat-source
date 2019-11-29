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
        var i = [], n = !0, a = !1, o = void 0;
        try {
            for (var r, s = e[Symbol.iterator](); !(n = (r = s.next()).done) && (i.push(r.value), 
            !t || i.length !== t); n = !0) ;
        } catch (e) {
            a = !0, o = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (a) throw o;
            }
        }
        return i;
    }
    return function(t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), a = e(require("../pages/observe/observeWaiting")), o = e(require("../pages/observe/observeGg")), r = e(require("../pages/observe/observeOut")), s = e(require("../network/network")), l = require("../util/forceUpdate"), u = e(require("./bottleSkinBaseCtrl")), h = function() {
    function e(i, n) {
        t(this, e), this.game = i, this.name = "observe", this.gameCtrl = this.game.gameCtrl, 
        this.model = this.game.gameModel, this.view = this.game.gameView, this.modeCtrl = n, 
        this.netWorkCtrl = this.gameCtrl.netWorkCtrl, this.gameSocket = this.game.gameSocket, 
        this.currentPage = null, this.waitingPage = new a.default(i), this.ggPage = new o.default(i), 
        this.outPage = new r.default(i), this.gameId = "", this.longTimeout = null;
    }
    return n(e, [ {
        key: "init",
        value: function(e) {
            var t = this, i = this.model.getServerConfig();
            if (i && !i.audience_mode_switch) return this.view.showServeConfigForbiddenObserveMode(), 
            void this.modeCtrl.changeMode("singleCtrl");
            if (e.query.version) {
                console.log("options.query.version", e.query.version);
                var n = e.query.version;
                1 == (0, l.compareMyVersion)(n) ? (0, l.forceUpdate)(function() {
                    t.modeCtrl.changeMode("singleCtrl");
                }, "点击确定，进行版本更新后重试") : this.go(e);
            } else this.go(e);
        }
    }, {
        key: "go",
        value: function(e) {
            var t = this;
            this.model.setStage("");
            var i = this.model.getSessionId();
            this.gameId = e.query.gameId, this.model.setObserveInfo({
                headimg: e.query.headimg,
                nickName: e.query.nickName
            }), this.model.setGameId(this.gameId), wx.showLoading(), i ? this.afterLogin(!0, e) : this.netWorkCtrl.netWorkLogin(function(i) {
                t.afterLogin(i, e);
            });
        }
    }, {
        key: "afterLogin",
        value: function(e, t) {
            var n = this;
            if (e) {
                var a = t.query.skin_id || "", o = t.query.skin_sn || "", r = t.query.bottle_skin_id || "", s = void 0, l = void 0;
                s = a && o ? this.game.skinManager.loadSkinForOtherMode(a, o).then(function() {
                    return a;
                }, function(e) {
                    return console.log("----observeCtrl---- ekili", e), Promise.reject(null);
                }) : Promise.resolve(null), l = r && 0 != r ? new Promise(function(e, t) {
                    u.default.getBottleSkinShopData().then(function(i) {
                        var n = null, a = i.bottleSkinShopList || [], o = a.findIndex(function(e) {
                            return e.id == r;
                        });
                        o < 0 ? e(null) : (n = a[o], u.default.getBottleSkinResourceBySkinData(n).then(function() {
                            e(n);
                        }, function(e) {
                            t(e);
                        }));
                    }, function(e) {
                        t(e);
                    });
                }) : Promise.resolve(null), Promise.all([ s, l ]).then(function(e) {
                    var t = i(e, 2), a = t[0], o = void 0 === a ? null : a, r = t[1];
                    n.game.resetScene(null, {
                        skinId: o,
                        bottleSkin: r
                    }), n.go2();
                }, function(e) {
                    console.log("GO observe fail", e), n.goToObserveStateFail();
                });
            } else this.goToObserveStateFail();
        }
    }, {
        key: "go2",
        value: function() {
            this.setLongTimeHandle(), this.gameSocket.connectSocket(), this.model.setStage("");
        }
    }, {
        key: "socketJoinSuccess",
        value: function(e) {
            this.clearLongTimeHandle(), wx.hideLoading(), e ? (this.waitingPage.show(), this.model.setStage(this.waitingPage.name), 
            this.currentPage = this.waitingPage, this.game.UI.setScore(0), this.checkPlayerTimeout = setInterval(this.checkPlayerState.bind(this), 1e4)) : this.showPlayerDead();
        }
    }, {
        key: "goToObserveStateFail",
        value: function() {
            this.view.showObserveStateFail(), this.modeCtrl.changeMode("singleCtrl");
        }
    }, {
        key: "setLongTimeHandle",
        value: function() {
            this.longTimeout = setTimeout(this.handleLongTime.bind(this), 9e3);
        }
    }, {
        key: "handleLongTime",
        value: function() {
            this.goToObserveStateFail();
        }
    }, {
        key: "clearLongTimeHandle",
        value: function() {
            null != this.longTimeout && (clearTimeout(this.longTimeout), this.longTimeout = null);
        }
    }, {
        key: "showPlayerDead",
        value: function() {
            this.gameSocket.close(), this.clearCheckPlayerTimeout(), this.currentPage && this.currentPage.hide(), 
            this.outPage.show(), this.model.setStage(this.outPage.name), this.currentPage = this.outPage;
        }
    }, {
        key: "checkPlayerState",
        value: function() {
            s.default.syncop(this.judgePlayerState.bind(this));
        }
    }, {
        key: "judgePlayerState",
        value: function(e, t) {
            e ? 0 != t.data.state && (this.clearCheckPlayerTimeout(), this.showPlayerDead()) : this.handleSyncopErr();
        }
    }, {
        key: "handleSyncopErr",
        value: function() {
            this.view.showSyncopErr(), this.goToObserveStateFail();
        }
    }, {
        key: "clearCheckPlayerTimeout",
        value: function() {
            null != this.checkPlayerTimeout && (clearInterval(this.checkPlayerTimeout), this.checkPlayerTimeout = null);
        }
    }, {
        key: "destroy",
        value: function() {
            this.currentPage && this.currentPage.hide(), this.currentPage = null, this.model.setStage(""), 
            this.model.clearGameId(), this.clearLongTimeHandle(), this.clearCheckPlayerTimeout(), 
            wx.hideLoading(), this.gameSocket.alive && this.gameSocket.close(), this.model.clearObserveInfo(), 
            this.game.instructionCtrl.destroy(), this.game.deadTimeout && (clearTimeout(this.game.deadTimeout), 
            this.game.deadTimeout = null), this.game.pendingReset = !1, this.game.resetScene();
        }
    }, {
        key: "showPlayerWaiting",
        value: function() {
            this.currentPage != this.waitingPage && (null != this.currentPage && this.currentPage.hide(), 
            this.waitingPage.show(), this.model.setStage(this.waitingPage.name), this.currentPage = this.waitingPage);
        }
    }, {
        key: "showPlayerGG",
        value: function(e) {
            null != this.currentPage && this.currentPage.hide(), this.ggPage.show(e), this.model.setStage(this.ggPage.name), 
            this.currentPage = this.ggPage;
        }
    }, {
        key: "onPlayerOut",
        value: function() {
            this.showPlayerDead();
        }
    }, {
        key: "onViewerStart",
        value: function() {
            this.gameSocket.quitObserve(), this.game.instructionCtrl.destroy(), this.modeCtrl.directPlaySingleGame();
        }
    }, {
        key: "showGameOverPage",
        value: function() {}
    }, {
        key: "wxOnhide",
        value: function() {
            this.clearCheckPlayerTimeout(), this.gameSocket.quitObserve(), this.gameSocket.close(), 
            this.game.resetScene();
        }
    }, {
        key: "wxOnshow",
        value: function() {}
    } ]), e;
}();

exports.default = h;