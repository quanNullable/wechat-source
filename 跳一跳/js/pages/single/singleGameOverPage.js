function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
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
}(), n = function() {
    function n(t) {
        e(this, n), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.name = "singleSettlementPgae";
    }
    return t(n, [ {
        key: "show",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = 0, n = "", o = function() {}, a = function() {}, i = function() {};
            e && e.banType && (t = e.banType || 0), e.bottle_skin && e.bottle_skin.icon && (n = e.bottle_skin.icon, 
            this.game.reporter.rpGetSkinSettle()), e.onClickBottleSkin && (o = e.onClickBottleSkin), 
            e.onRewardAdGetProp && (a = e.onRewardAdGetProp), e.onShowBannerAd && (i = e.onShowBannerAd), 
            this.data = e;
            var r = this.model.currentScore, s = this.model.getHighestScore(), l = this.model.startTime, d = this.model.weekBestScore, h = this.game.historyTimes.getTimes(), u = wx.getStorageSync("ad") || {}, f = "";
            if (u.t) {
                var c = new Date(u.t), g = new Date();
                u.ad_banner_quota && c.getMonth() == g.getMonth() && c.getDate() == g.getDate() ? f = "banner" : u.ad_reward_quota && c.getMonth() == g.getMonth() && c.getDate() == g.getDate() && (f = "reward");
            }
            if (this.full2D || this.game.handleWxOnError({
                message: "can not find full 2D gameOverPage",
                stack: ""
            }), this.full2D) {
                var m = {
                    score: r,
                    highest_score: s,
                    start_time: l,
                    week_best_score: d,
                    game_cnt: h,
                    banType: t,
                    bottle_skin_icon: n,
                    ad_type: f,
                    onClickBottleSkin: o,
                    onRewardAdGetProp: a,
                    onShowBannerAd: i
                };
                this.model.adInfo && this.model.adInfo.advertisingInfo && this.model.adInfo.advertisingInfo.isShowing && (m.advertise = {
                    score: this.model.adInfo.advertisingInfo.score,
                    icon_url: this.model.adInfo.advertisingInfo.trademark_url,
                    url: this.model.adInfo.advertisingInfo.ad_url
                }, this.game.reporter.rpAdGameOver()), this.full2D.showGameOverPage(m), r > s ? this.game.reporter.historyBest() : r > d && this.game.reporter.weekBest();
            }
        }
    }, {
        key: "showAdReward",
        value: function(e) {
            var t = this;
            this.full2D.showJiLiAdGetPropPage({
                icon: e,
                onReturn: function() {
                    t.data.is_ad_reward = 0, t.show(t.data);
                }
            });
        }
    }, {
        key: "hide",
        value: function() {
            this.full2D.hide2D();
        }
    } ]), n;
}();

exports.default = n;