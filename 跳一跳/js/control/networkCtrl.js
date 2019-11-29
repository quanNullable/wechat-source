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

var r = function() {
    function e(e, t) {
        var r = [], n = !0, o = !1, i = void 0;
        try {
            for (var u, a = e[Symbol.iterator](); !(n = (u = a.next()).done) && (r.push(u.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !n && a.return && a.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), i = e(require("../network/network")), u = e(require("../store/storage")), a = e(require("../control/bottleSkinBaseCtrl")), s = function() {
    function e(r) {
        t(this, e), this.game = r, this.gameCtrl = r.gameCtrl, this.model = r.gameModel, 
        this.loginCb = null, this.serverConfigInterval = null, this.historyTimes = this.game.historyTimes;
    }
    return o(e, [ {
        key: "netWorkLogin",
        value: function(e) {
            e && (this.loginCb = e), i.default.requestLogin(this.afterRequestLogin.bind(this));
        }
    }, {
        key: "afterRequestLogin",
        value: function(e) {
            this.loginCb && this.loginCb(e);
            var t = i.default.getUserInfo(this.afterGetUserInfo.bind(this));
            t.then(function(e) {}, function(e) {
                e && Math.random() < .1 && ("object" == (void 0 === e ? "undefined" : n(e)) && (e = JSON.stringify(e)), 
                i.default.badReport("$$getUserInfoFail;unknownError;" + e + ";")), i.default.sendServerError(6);
            }), e && (Promise.all([ t, i.default.requestFriendsScore(this.updateFriendsScore.bind(this)) ]).then(function(e) {
                var t = r(e, 2), n = (t[0], t[1]);
                n && n.my_user_info && n.my_user_info.playback_id && a.default.setRankDataTolocalStorage(n.my_user_info);
            }, function() {}), this.requestMmpayTimeout(), this.requestServerInit(), this.gameCtrl.onLoginSuccess());
        }
    }, {
        key: "afterGetUserInfo",
        value: function(e) {
            e.appeal_notify && this.gameCtrl.appealNotify();
        }
    }, {
        key: "requestServerInit",
        value: function() {
            i.default.requestInit(), this.serverConfigInterval = setInterval(i.default.requestInit.bind(i.default), 6e4);
        }
    }, {
        key: "requestMmpayTimeout",
        value: function() {
            function e() {
                i.default.requestMmpayBonus(function(e, n) {
                    e && n.data.svr_time ? 0 == n.data.pay_status.status ? (n.data.pay_status.expire_time < r && (n.data.pay_status.expire_time = r), 
                    u.default.setMmpayBonusStatus(n.data.pay_status, n.data.svr_time), t.mmpayTimeout = setTimeout(t.requestMmpayTimeout.bind(t), 1e3 * n.data.pay_status.expire_time)) : 1 == n.data.pay_status.status && u.default.setMmpayBonusStatus(n.data.pay_status, n.data.svr_time) : t.mmpayTimeout = setTimeout(t.requestMmpayTimeout.bind(t), 1e3 * r);
                });
            }
            var t = this, r = 120;
            this.clearMmpayTimeout();
            var n = u.default.getMmpayBonusStatus();
            n ? 1 == n.status || 0 == n.status && e() : e();
        }
    }, {
        key: "clearMmpayTimeout",
        value: function() {
            this.mmpayTimeout && (clearTimeout(this.mmpayTimeout), this.mmpayTimeout = null);
        }
    }, {
        key: "clearServerInit",
        value: function() {
            this.serverConfigInterval && clearInterval(this.serverConfigInterval);
        }
    }, {
        key: "upDateFriendsScoreList",
        value: function() {
            var e = this;
            this.model.getSessionId() && i.default.requestFriendsScore(function() {
                e.updateFriendsScore2.bind(e).apply(void 0, arguments);
            }).then(function() {}, function() {});
        }
    }, {
        key: "updateUserInfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, t = u.default.getMyUserInfo();
            "object" == (void 0 === t ? "undefined" : n(t)) && t.open_id || i.default.getUserInfo(e.bind(this)).then(function() {}, function(e) {
                e && Math.random() < .1 && ("object" == (void 0 === e ? "undefined" : n(e)) && (e = JSON.stringify(e)), 
                i.default.badReport("$$getUserInfoFail;unknownError;" + e + ";")), i.default.sendServerError(6);
            });
        }
    }, {
        key: "updateFriendsScore",
        value: function(e, t) {
            if (e && (t.user_info.sort(function(e, t) {
                return -(e.week_best_score || 0) + (t.week_best_score || 0);
            }), this.model.saveFriendsScore(t.user_info), t.my_user_info)) {
                var r = t.my_user_info.history_best_score || 0;
                this.model.saveHeighestScore(r);
                var n = t.my_user_info.week_best_score || 0;
                this.model.weekBestScore = n, this.model.saveWeekBestScore(n);
                var o = t.my_user_info.times;
                this.historyTimes.verifyScore(o), t && t.my_user_info && a.default.setRankDataTolocalStorage(t.my_user_info);
            }
        }
    }, {
        key: "updateFriendsScore2",
        value: function(e, t) {
            e && (t.user_info.sort(function(e, t) {
                return -(e.week_best_score || 0) + (t.week_best_score || 0);
            }), this.model.saveFriendsScore(t.user_info), t.my_user_info && a.default.setRankDataTolocalStorage(t.my_user_info));
        }
    }, {
        key: "uploadScore",
        value: function(e) {
            i.default.requestSettlement(e);
        }
    }, {
        key: "requestSettlement",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            i.default.requestSettlement(e, t, r, n);
        }
    }, {
        key: "requestLogin",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            i.default.requestLogin(e);
        }
    }, {
        key: "sendServerError",
        value: function() {
            i.default.sendServerError(2);
        }
    }, {
        key: "createRouterId",
        value: function(e) {
            i.default.createRouterId(e);
        }
    } ], [ {
        key: "getPropperty",
        value: function() {
            return i.default.getproperty().then(function(e) {
                return a.default.updateSkinExpireByPropertyList(e.property_list), Promise.resolve(e);
            }, function(e) {
                return Promise.reject(e);
            });
        }
    } ]), e;
}();

exports.default = s;