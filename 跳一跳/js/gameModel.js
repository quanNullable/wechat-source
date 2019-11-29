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
}(), n = e(require("./store/storage")), i = e(require("./store/session")), r = function() {
    function e(a) {
        t(this, e), this.game = a, this.mode = "", this.stage = "", this.is_from_wn = 0, 
        this.firstBlood = !1, this.currentScore = 0, this.highestScore = 0, this.observeInfo = {}, 
        this.friendsScore = [], this.weekBestScore = 0, this.startTime = Math.floor(Date.now() / 1e3), 
        this.upLoadScoreData = {}, this.relayInfo = {}, this.groupListData = !1, this.adInfo = {
            canShowAd: !1,
            advertisingInfo: {}
        };
    }
    return a(e, [ {
        key: "checkAdInfo",
        value: function() {
            this.adInfo.canShowAd = !this.getAdTagInLS();
        }
    }, {
        key: "setMode",
        value: function(e) {
            this.mode = e, this.game.mode = e;
        }
    }, {
        key: "setStage",
        value: function(e) {
            this.stage = e, this.game.stage = e;
        }
    }, {
        key: "init",
        value: function() {
            i.default.init(), n.default.getFirstBlood() || (this.setFirstBlood(!0), n.default.saveFirstBlood()), 
            this.highestScore = n.default.getHeighestScore() || 0, i.default.setServerConfig(n.default.getServerConfig()), 
            this.weekBestScore = n.default.getWeekBestScore() || 0, this.friendsScore = n.default.getFriendsScore();
        }
    }, {
        key: "getServerConfig",
        value: function() {
            return i.default.serverConfig;
        }
    }, {
        key: "setIsFromWn",
        value: function(e) {
            this.is_from_wn = e, this.game.is_from_wn = e;
        }
    }, {
        key: "setFirstBlood",
        value: function(e) {
            this.firstBlood = e, this.game.firstBlood = e;
        }
    }, {
        key: "getMode",
        value: function() {
            return this.mode;
        }
    }, {
        key: "setScore",
        value: function(e) {
            this.currentScore = e;
        }
    }, {
        key: "saveHeighestScore",
        value: function(e) {
            n.default.saveHeighestScore(e), this.highestScore = e;
        }
    }, {
        key: "saveLaterUpLoadScore",
        value: function(e, t) {
            if (e && t) {
                var a = {
                    ts: this.getNextSunday(),
                    score: e,
                    data: t
                };
                n.default.saveActionData(a);
            }
        }
    }, {
        key: "clearLaterUpLoadScore",
        value: function() {
            n.default.saveActionData("");
        }
    }, {
        key: "saveWeekBestScore",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = {
                ts: this.getNextSunday(),
                data: e
            };
            n.default.saveWeekBestScore(t);
        }
    }, {
        key: "getActionData",
        value: function() {
            return n.default.getActionData();
        }
    }, {
        key: "getHighestScore",
        value: function() {
            return this.highestScore;
        }
    }, {
        key: "saveFriendsScore",
        value: function(e) {
            this.friendsScore = e;
            var t = {
                ts: this.getNextSunday(),
                data: e
            };
            n.default.saveFriendsScore(t);
        }
    }, {
        key: "getSessionId",
        value: function() {
            return i.default.sessionId;
        }
    }, {
        key: "getPkId",
        value: function() {
            return i.default.pkId;
        }
    }, {
        key: "clearPkId",
        value: function() {
            i.default.clearPkId();
        }
    }, {
        key: "setShareTicket",
        value: function(e) {
            i.default.setShareTicket(e);
        }
    }, {
        key: "getShareTicket",
        value: function() {
            return i.default.shareTicket;
        }
    }, {
        key: "clearShareTicket",
        value: function() {
            i.default.clearShareTicket();
        }
    }, {
        key: "setGameId",
        value: function(e) {
            i.default.setGameId(e);
        }
    }, {
        key: "setGameTicket",
        value: function(e) {
            i.default.setGameTicket(e);
        }
    }, {
        key: "clearGameId",
        value: function() {
            i.default.clearGameId();
        }
    }, {
        key: "clearGameTicket",
        value: function() {
            i.default.clearGameTicket();
        }
    }, {
        key: "setObserveInfo",
        value: function(e) {
            this.observeInfo.headimg = e.headimg, this.observeInfo.nickName = e.nickName;
        }
    }, {
        key: "clearObserveInfo",
        value: function() {
            this.observeInfo.headimg = null, this.observeInfo.nickName = null;
        }
    }, {
        key: "getIsRelayNewBie",
        value: function() {
            var e = !n.default.getRelayNewBie();
            return e && n.default.setRelayNewBie(), e;
        }
    }, {
        key: "getAdTagInLS",
        value: function() {
            var e = n.default.getAdTag();
            return e = !!(e && e.ts && e.ts > Date.now());
        }
    }, {
        key: "setAdTagInLS",
        value: function() {
            var e = this.getNextDay();
            n.default.saveAdTag({
                ts: e
            });
        }
    }, {
        key: "getNextDay",
        value: function() {
            var e = new Date();
            return e.setHours(0, 0, 0, 0), e.valueOf() + 864e5;
        }
    }, {
        key: "getNextSunday",
        value: function() {
            var e = new Date(), t = e.getDay();
            e.setHours(0, 0, 0, 0);
            var a = 7 - t + 1;
            return 8 == a && (a = 1), e.valueOf() + 24 * a * 60 * 60 * 1e3;
        }
    }, {
        key: "setGroupRankData",
        value: function(e, t) {
            this.groupListData = {
                list: e,
                userInfo: t
            };
        }
    }, {
        key: "getGroupRankData",
        value: function() {
            var e = this.groupListData;
            return !(!e || !e.userInfo) && {
                list: e.list,
                userInfo: e.userInfo
            };
        }
    } ]), e;
}();

exports.default = r;