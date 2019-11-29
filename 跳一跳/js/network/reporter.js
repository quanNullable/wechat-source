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
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}(), r = e(require("./network")), s = require("../config"), o = e(require("../lib/mue/eventcenter")), n = function() {
    function e() {
        t(this, e), this.timeOut = null, this.reportList = [], this.pkState = {
            isGroup: 0,
            score: 0
        }, this.singleState = 0, this.observeState = {
            startTime: 0,
            success: 0
        }, this.playerState = {
            startTime: 0,
            maxAudience: 0
        }, this.gameStartTime = 0;
        try {
            var i = wx.getSystemInfoSync();
            this.clientInfo = {
                platform: i.platform,
                brand: i.brand,
                model: i.model,
                system: i.system
            };
        } catch (e) {
            console.log(e);
        }
        this.relayGameStartTime = 0, this.bindEvent();
    }
    return i(e, [ {
        key: "bindEvent",
        value: function() {
            var e = this;
            o.default.on(s.EVENT.CREATE_RELAY_ROOM_FAIL, function(t, i) {
                e.reportCreateRelayRoom(i);
            }), o.default.on(s.EVENT.RP_JOIN_RELAY_ROOM_AGAIN, function(t, i) {
                e.reportPlayGameAgain({
                    result: i.res
                });
            }), o.default.on(s.EVENT.RP_JOIN_RELAY_ROOM, function(t, i) {
                e.reportJoinRelayRoom(i);
            }), o.default.on(s.EVENT.RP_RELAY_START, function(t, i) {
                e.relayGameStartTime = e.getTime(), e.reportRelayStart(i), e.sendReport();
            }), o.default.on(s.EVENT.RP_RELAY_GAME_END, function(t, i) {
                var r = 0;
                e.relayGameStartTime && (r = e.getTime() - e.relayGameStartTime), i.duration = r, 
                e.reportRelayEnd(i);
            }), o.default.on(s.EVENT.CLOSE_HIGHEST_MODEL, function(t, i) {
                var r = i.id;
                "history" == r && e.historyClose(), "week" == r && e.weekBestClose();
            }), o.default.on(s.EVENT.JUMP_AD, function(t, i) {
                e.rpClickAdCard(i);
            }), o.default.on(s.EVENT.JUMP_AD_GG, function(t, i) {
                e.rpJumpH5GameOver();
            });
        }
    }, {
        key: "getTime",
        value: function() {
            var e = Date.now();
            return e = Math.floor(e / 1e3);
        }
    }, {
        key: "enterReport",
        value: function(e) {
            if (this.gameStartTime = this.getTime(), e) {
                var t = {
                    ts: this.getTime(),
                    type: 0,
                    scene: e
                };
                this.reportList.push(t);
            }
        }
    }, {
        key: "quitReport",
        value: function() {
            if (this.gameStartTime) {
                var e = {
                    ts: this.getTime(),
                    type: 1,
                    duration: this.getTime() - this.gameStartTime
                };
                this.reportList.push(e);
            }
        }
    }, {
        key: "playGameReport",
        value: function(e, t, i) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
            if (this.singleState) {
                var s = {
                    ts: this.getTime(),
                    type: 2,
                    score: e,
                    best_score: t,
                    break_record: e > t ? 1 : 0,
                    duration: this.getTime() - this.singleState,
                    times: i,
                    using_prop: r
                };
                this.reportList.push(s), this.singleState = 0;
            }
        }
    }, {
        key: "addEggBlockReport",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, o = [];
            for (var n in e) e[n = parseInt(n)] && o.push({
                id: n,
                count: e[n],
                type: 0
            }), t[n] && o.push({
                id: n,
                count: t[n],
                type: 1
            }), i[n] && o.push({
                id: n,
                count: i[n],
                type: 2
            }), s[n] && o.push({
                id: n,
                count: s[n],
                type: 3
            });
            r.default.sendEggReport(o);
        }
    }, {
        key: "playGameReportStart",
        value: function() {
            this.singleState = this.getTime();
        }
    }, {
        key: "shareAudienceReport",
        value: function(e) {
            var t = {
                ts: this.getTime(),
                type: 3,
                is_group: e
            };
            this.reportList.push(t);
        }
    }, {
        key: "playAudienceReport",
        value: function() {
            if (this.playerState.startTime) {
                var e = {
                    ts: this.getTime(),
                    type: 4,
                    duration: this.getTime() - this.playerState.startTime,
                    max_audience: this.playerState.maxAudience
                };
                this.reportList.push(e), this.playerState.startTime = 0, this.playerState.maxAudience = 0;
            }
        }
    }, {
        key: "playAudienceReportStart",
        value: function() {
            this.playerState.startTime = this.getTime();
        }
    }, {
        key: "playAudienceReportMaxPeople",
        value: function(e) {
            this.playerState.maxAudience < e && (this.playerState.maxAudience = e);
        }
    }, {
        key: "joinAudienceReport",
        value: function() {
            var e = 0 == this.observeState.startTime ? 0 : this.getTime() - this.observeState.startTime, t = {
                ts: this.getTime(),
                type: 5,
                duration: e,
                join_audience_success: this.observeState.success
            };
            this.reportList.push(t), this.observeState.startTime = 0, this.observeState.success = 0;
        }
    }, {
        key: "joinAudienceReportStart",
        value: function() {
            this.observeState.startTime = this.getTime(), this.observeState.success = 1;
        }
    }, {
        key: "shareGroupReport",
        value: function(e) {
            var t = {
                ts: this.getTime(),
                type: 6,
                is_group: e
            };
            this.reportList.push(t);
        }
    }, {
        key: "sharePKReport",
        value: function(e) {
            var t = {
                ts: this.getTime(),
                type: 7,
                is_group: e
            };
            this.reportList.push(t);
        }
    }, {
        key: "joinPKReport",
        value: function(e) {
            var t = {
                ts: this.getTime(),
                type: 8,
                is_group: e
            };
            this.reportList.push(t);
        }
    }, {
        key: "playPKReport",
        value: function(e) {
            var t = 0;
            e == this.pkState.score && (t = 1), e > this.pkState.score && (t = 3);
            var i = {
                ts: this.getTime(),
                type: 9,
                is_group: this.pkState.isGroup,
                result: t
            };
            this.reportList.push(i);
        }
    }, {
        key: "playPKReportStart",
        value: function(e) {
            this.pkState.isGroup = e;
        }
    }, {
        key: "playPKScore",
        value: function(e) {
            this.pkState.score = e;
        }
    }, {
        key: "resetPKReport",
        value: function() {
            this.pkState.isGroup = 0, this.pkState.score = 0;
        }
    }, {
        key: "gameBeginReport",
        value: function() {
            var e = {
                ts: this.getTime(),
                type: 10
            };
            this.reportList.push(e);
        }
    }, {
        key: "reportGotoRelayMode",
        value: function() {
            var e = {
                ts: this.getTime(),
                type: 11
            };
            this.reportList.push(e);
        }
    }, {
        key: "reportCreateRelayRoom",
        value: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).result, t = void 0 === e ? 0 : e, i = {
                ts: this.getTime(),
                type: 12,
                result: t
            };
            this.reportList.push(i);
        }
    }, {
        key: "reportJoinRelayRoom",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.scene, i = void 0 === t ? 1 : t, r = e.result, s = void 0 === r ? 0 : r, o = {
                ts: this.getTime(),
                type: 13,
                scene: i,
                result: s
            };
            this.reportList.push(o);
        }
    }, {
        key: "reportRelayStart",
        value: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).result, t = void 0 === e ? 0 : e, i = {
                ts: this.getTime(),
                type: 14,
                result: t
            };
            this.reportList.push(i);
        }
    }, {
        key: "reportRelayEnd",
        value: function(e) {
            var t = e.jielong_score, i = e.player_num, r = e.max_audience, s = e.difficulty, o = e.duration, n = {
                ts: this.getTime(),
                type: 15,
                player_num: i,
                max_audience: r,
                difficulty: s,
                jielong_score: t,
                duration: o
            };
            this.reportList.push(n);
        }
    }, {
        key: "reportPlayGameAgain",
        value: function(e) {
            var t = e.result, i = {
                ts: this.getTime(),
                type: 16,
                result: t
            };
            this.reportList.push(i);
        }
    }, {
        key: "clickStartPageRankBtn",
        value: function() {
            var e = {
                ts: this.getTime(),
                type: 21
            };
            this.reportList.push(e);
        }
    }, {
        key: "clickSingleSettlementPageRankBtn",
        value: function() {
            var e = {
                ts: this.getTime(),
                type: 22
            };
            this.reportList.push(e);
        }
    }, {
        key: "clickReviewBtn",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = {
                ts: this.getTime(),
                type: 23,
                result: e
            };
            this.reportList.push(t);
        }
    }, {
        key: "singleBackStart",
        value: function() {
            this.record(24);
        }
    }, {
        key: "relayBackStart",
        value: function() {
            this.record(25);
        }
    }, {
        key: "historyBest",
        value: function() {
            this.record(26);
        }
    }, {
        key: "weekBest",
        value: function() {
            this.record(27);
        }
    }, {
        key: "historyShare",
        value: function() {
            this.record(28);
        }
    }, {
        key: "weekBestShare",
        value: function() {
            this.record(29);
        }
    }, {
        key: "historyClose",
        value: function() {
            this.record(30);
        }
    }, {
        key: "weekBestClose",
        value: function() {
            this.record(31);
        }
    }, {
        key: "reportStartPage",
        value: function() {
            this.record(32);
        }
    }, {
        key: "rpWatchRelay",
        value: function() {
            this.record(33);
        }
    }, {
        key: "rpLike",
        value: function(e) {
            var t = e.open_user_id, i = void 0 === t ? "" : t, r = e.praise_over_limit, s = void 0 === r ? 1 : r, o = e.result, n = {
                open_user_id: i,
                praise_over_limit: s,
                result: void 0 === o ? 0 : o,
                type: 34,
                ts: this.getTime()
            };
            this.reportList.push(n);
        }
    }, {
        key: "rpSingleSettlePlayAgain",
        value: function() {
            this.record(35);
        }
    }, {
        key: "rpSingleSettleRankReview",
        value: function() {
            this.record(36);
        }
    }, {
        key: "rpSingleSettleRankShareGroup",
        value: function() {
            this.record(37);
        }
    }, {
        key: "rpSingleSettleRankCloseRank",
        value: function() {
            this.record(38);
        }
    }, {
        key: "rpGetSkinSettle",
        value: function() {
            this.record(39);
        }
    }, {
        key: "rpGetSkinSettleClickSkin",
        value: function() {
            this.record(40);
        }
    }, {
        key: "rpGetSkinShowOff",
        value: function() {
            this.record(41);
        }
    }, {
        key: "rpGetSkinShareGoods",
        value: function() {
            this.record(42);
        }
    }, {
        key: "rpPlayerClickPlayAgain",
        value: function() {
            this.record(43);
        }
    }, {
        key: "rpRelayClickCardShare",
        value: function() {
            this.record(44);
        }
    }, {
        key: "rpRelayClickSunCode",
        value: function() {
            this.record(45);
        }
    }, {
        key: "rpStartPageClickFriendInfo",
        value: function() {
            this.record(46);
        }
    }, {
        key: "rpStartPageFriendInfoLike",
        value: function() {
            this.record(47);
        }
    }, {
        key: "rpStartPageFriendReview",
        value: function() {
            this.record(48);
        }
    }, {
        key: "rpStartPageGroupShare",
        value: function() {
            this.record(49);
        }
    }, {
        key: "rpStartPageRankClose",
        value: function() {
            this.record(50);
        }
    }, {
        key: "rpSkinInfo",
        value: function() {
            this.record(51);
        }
    }, {
        key: "rpMsgBox",
        value: function() {
            this.record(52);
        }
    }, {
        key: "rpShowAdCard",
        value: function() {
            this.record(53);
        }
    }, {
        key: "rpClickAdCard",
        value: function() {
            this.record(54);
        }
    }, {
        key: "rpClickSingleStartPage",
        value: function() {
            this.record(55);
        }
    }, {
        key: "rpClickObserveShare",
        value: function() {
            this.record(56);
        }
    }, {
        key: "rpClickShareBattle",
        value: function() {
            this.record(57);
        }
    }, {
        key: "rpClickShareObserve",
        value: function() {
            this.record(58);
        }
    }, {
        key: "rpGoProfileByMsgBox",
        value: function() {
            this.record(59);
        }
    }, {
        key: "rpGoSkinBySkinCenter",
        value: function() {
            this.record(60);
        }
    }, {
        key: "rpClickProfile",
        value: function(e) {
            this.record(61), e ? this.record(65) : this.record(66);
        }
    }, {
        key: "rpClickComeInSkinShare",
        value: function() {
            this.record(62);
        }
    }, {
        key: "rpGameOverOnlike",
        value: function() {
            this.record(63);
        }
    }, {
        key: "rpGameOverClickFriendInfo",
        value: function() {
            this.record(64);
        }
    }, {
        key: "rpAdGameOver",
        value: function() {
            this.record(67);
        }
    }, {
        key: "rpJumpH5GameOver",
        value: function() {
            this.record(68);
        }
    }, {
        key: "record",
        value: function(e) {
            if ("number" == typeof e) {
                var t = {
                    ts: this.getTime(),
                    type: e
                };
                this.reportList.push(t);
            }
        }
    }, {
        key: "bestShare",
        value: function(e) {
            e && ("week" == e && this.weekBestShare(), "history" == e && this.historyShare());
        }
    }, {
        key: "sendReport",
        value: function() {
            this.reportList.length && (r.default.sendReport(this.reportList, this.clientInfo), 
            this.reportList = []);
        }
    }, {
        key: "clearTimer",
        value: function() {
            this.timeOut && clearInterval(this.timeOut);
        }
    }, {
        key: "setTimer",
        value: function(e) {
            this.timeOut = setInterval(this.sendReport.bind(this), e);
        }
    } ]), e;
}();

exports.default = n;