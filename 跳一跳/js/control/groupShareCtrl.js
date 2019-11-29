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
            var o = t[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, i, o) {
        return i && e(t.prototype, i), o && e(t, o), t;
    };
}(), o = e(require("../pages/group/groupPage")), r = e(require("../network/network")), a = function() {
    function e(i, r) {
        t(this, e), this.name = "groupShare", this.game = i, this.gameCtrl = this.game.gameCtrl, 
        this.model = this.game.gameModel, this.view = this.game.gameView, this.netWorkCtrl = this.gameCtrl.netWorkCtrl, 
        this.modeCtrl = r, this.groupPage = new o.default(i), this.shareTicket = "", this.shareInfoTimeout = null;
    }
    return i(e, [ {
        key: "init",
        value: function(e) {
            var t = this.model.getServerConfig();
            if (t && !t.group_score_switch) return this.view.showServeConfigForbiddenGroupShare(), 
            void this.modeCtrl.changeMode("singleCtrl");
            this.model.setStage("");
            var i = this.model.getSessionId();
            this.shareTicket = e.shareTicket, wx.showLoading(), i ? this.afterLogin(!0) : this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this));
        }
    }, {
        key: "afterLogin",
        value: function(e) {
            var t = this;
            e ? (this.setShareInfoTimeout(), wx.getShareInfo({
                shareTicket: this.shareTicket,
                success: function(e) {
                    null != t.shareInfoTimeout && (t.clearShareInfoTimeout(), t.model.setShareTicket(e.rawData), 
                    r.default.getGroupScore(function(e, i) {
                        if (e) {
                            var o = i.data.user_info || [], r = i.data.my_user_info || {};
                            t.model.setStage(o, r), t.showGroupRankPage(o, r);
                        } else t.goToGroupShareFail();
                        wx.hideLoading();
                    }));
                },
                fail: function(e) {
                    null != t.shareInfoTimeout && (t.clearShareInfoTimeout(), wx.hideLoading(), t.goToGroupShareFail("群里的群分享才有效哦~"));
                }
            })) : (wx.hideLoading(), this.goToGroupShareFail());
        }
    }, {
        key: "setShareInfoTimeout",
        value: function() {
            this.shareInfoTimeout = setTimeout(this.handleShareInfoTimeout.bind(this), 5e3);
        }
    }, {
        key: "clearShareInfoTimeout",
        value: function() {
            null != this.shareInfoTimeout && (clearTimeout(this.shareInfoTimeout), this.shareInfoTimeout = null);
        }
    }, {
        key: "handleShareInfoTimeout",
        value: function() {
            this.clearShareInfoTimeout(), this.goToGroupShareFail();
        }
    }, {
        key: "goToGroupShareFail",
        value: function(e) {
            this.view.showGroupShareFail(e), this.modeCtrl.changeMode("singleCtrl");
        }
    }, {
        key: "showGroupRankPage",
        value: function(e, t) {
            var i = this.model.getGroupRankData(), o = void 0, r = void 0;
            if (i && (o = i.list, r = i.userInfo), void 0 !== e && void 0 !== t) this.model.setGroupRankData(e, t); else {
                if (void 0 === o || void 0 === r) throw new Error("showGroupRankPage。调用没有list，myUserInfo数据");
                e = o, t = r;
            }
            this.groupPage.show(e.concat([]), t), this.model.setStage(this.groupPage.name), 
            this.currentPage = this.groupPage;
        }
    }, {
        key: "destroy",
        value: function() {
            wx.hideLoading(), this.currentPage && this.currentPage.hide(), this.model.setStage(""), 
            this.shareTicket = "", this.model.clearShareTicket(), this.clearShareInfoTimeout(), 
            this.game.resetScene();
        }
    }, {
        key: "groupPlayGame",
        value: function() {
            this.modeCtrl.directPlaySingleGame();
        }
    }, {
        key: "wxOnhide",
        value: function() {}
    } ]), e;
}();

exports.default = a;