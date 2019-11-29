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
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), n = (e(require("../pages/gift/getGiftPage")), e(require("../store/session")), 
e(require("../network/network"))), o = e(require("../control/propertyCtrl")), r = function() {
    function e(i, n) {
        t(this, e), this.name = "getGiftPage", this.game = i, this.gameCtrl = this.game.gameCtrl, 
        this.model = this.game.gameModel, this.view = this.game.gameView, this.modeCtrl = n, 
        this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
    }
    return i(e, [ {
        key: "init",
        value: function(e) {
            var t = this.model.getSessionId();
            console.log("options", e), this.giftId = e.query.id, wx.showLoading(), t ? this.afterLogin(!0) : this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this));
        }
    }, {
        key: "afterLogin",
        value: function(e) {
            var t = this;
            console.log("susususususuususuusususus", this.giftId), e ? n.default.getGiftData(this.giftId).then(function(e) {
                wx.hideLoading(), e ? (t.updateProperty(e.gift_list), t.game.full2D.showShareSkin({
                    headimg: e.headimg,
                    nickname: e.nickname,
                    total_gift: e.gift_count,
                    gift_list: e.gift_list,
                    onReturn: function() {
                        t.modeCtrl.changeMode("singleCtrl");
                    }
                })) : t.modeCtrl.changeMode("singleCtrl");
            }).catch(function() {
                wx.hideLoading(), wx.showModal({
                    title: "提示",
                    content: "网络异常，拉取礼物失败",
                    showCancel: !1
                }), t.modeCtrl.changeMode("singleCtrl");
            }) : (wx.hideLoading(), wx.showModal({
                title: "提示",
                content: "网络异常，拉取礼物失败",
                showCancel: !1
            }), this.modeCtrl.changeMode("singleCtrl"));
        }
    }, {
        key: "updateProperty",
        value: function() {
            var e = void 0;
            (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).map(function(t) {
                t.received && (e = !0);
            }), e && setTimeout(function() {
                o.default.getProps();
            }, 1e3);
        }
    }, {
        key: "destroy",
        value: function() {
            this.currentPage && this.currentPage.hide(), this.model.setStage(""), wx.hideLoading(), 
            this.shareTicket = "", this.giftId = null, this.game.resetScene();
        }
    }, {
        key: "wxOnhide",
        value: function() {}
    } ]), e;
}();

exports.default = r;