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

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), o = (e(require("../network/network")), e(require("../pages/bottleShop/bottleShop"))), i = e(require("../control/bottleSkinBaseCtrl")), a = e(require("../store/storage")), l = function() {
    function e(n) {
        var o = n.game, i = n.onReturn;
        t(this, e), this.game = o, this.gameCtrl = o.gameCtrl, this.onReturn = i;
    }
    return n(e, [ {
        key: "init",
        value: function() {
            var e = this, t = void 0, n = void 0;
            this.bottleShopPage = new o.default({
                game: this.game,
                onClickUse: function(n) {
                    i.default.getSelectedSkinId() != n.id && n.use_status && (n.id ? (t = setTimeout(function() {
                        wx.showLoading({
                            title: "下载中...",
                            mask: !0
                        });
                    }, 100), i.default.getBottleSkinResource(n.id).then(function(o) {
                        t && (clearTimeout(t), t = !1), wx.hideLoading(), a.default.setSelectBottleSkinId(n.id), 
                        e.bottleShopPage.setSelectSkin(n.id), i.default.syncSelectBottleSkin(!0), e.changeSkin(e.game), 
                        i.default.setRankDataTolocalStorage({});
                    }, function(e) {
                        t && (clearTimeout(t), t = !1), wx.hideLoading(), wx.showToast({
                            title: "获取皮肤失败",
                            icon: "none"
                        });
                    })) : (a.default.setSelectBottleSkinId(0), i.default.syncSelectBottleSkin(!0), e.bottleShopPage.setSelectSkin(n.id), 
                    e.changeSkin(e.game), i.default.setRankDataTolocalStorage({})));
                },
                onReturn: function() {
                    e.onReturn();
                }
            }), n = setTimeout(function() {
                wx.showLoading({
                    title: "加载中...",
                    mask: !0
                });
            }, 300), i.default.getBottleSkinShopData().then(function(t) {
                n && (clearTimeout(n), n = !1), wx.hideLoading();
                var o = i.default.getSelectedSkinId();
                e.bottleShopPage.show(t.bottleSkinShopList, o || 0);
            }, function() {
                n && (clearTimeout(n), n = !1), wx.hideLoading();
                var t = a.default.getBottleSkinShopList(t), o = i.default.getSelectedSkinId();
                e.bottleShopPage.show(t, o || 0), wx.hideLoading(), wx.showToast({
                    title: "加载失败",
                    icon: "none"
                });
            });
        }
    }, {
        key: "changeSkin",
        value: function(e) {
            var t = i.default.getSelectedBottleSkinResourceSync();
            t ? this.game.bottle && this.game.bottle.changeSkin && this.game.bottle.changeSkin(t) : this.game.bottle.changeSkin();
        }
    }, {
        key: "destroy",
        value: function() {}
    } ]), e;
}();

exports.default = l;