function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}(), n = require("./../config"), a = function() {
    function a() {
        t(this, a), this.mmpayStatus = null;
    }
    return e(a, null, [ {
        key: "getFriendsScore",
        value: function() {
            try {
                var t = wx.getStorageSync("friends_score") || [];
                return t = t && t.ts ? t.ts < Date.now() ? [] : t.data : [];
            } catch (t) {
                return [];
            }
        }
    }, {
        key: "saveFriendsScore",
        value: function(t) {
            wx.setStorage({
                key: "friends_score",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "saveMyUserInfo",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = void 0, n = a.getMyUserInfo() || {};
            e = Object.assign({}, n, t), wx.setStorage({
                key: "my_user_info",
                data: e,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "saveHeighestScore",
        value: function(t) {
            wx.setStorage({
                key: "my_heighest_score",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getHeighestScore",
        value: function() {
            try {
                return wx.getStorageSync("my_heighest_score") || !1;
            } catch (t) {
                return !1;
            }
        }
    }, {
        key: "getMyUserInfo",
        value: function() {
            try {
                return wx.getStorageSync("my_user_info") || !1;
            } catch (t) {
                return null;
            }
        }
    }, {
        key: "saveSessionId",
        value: function(t) {
            wx.setStorage({
                key: "session_id",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getSessionId",
        value: function(t) {
            try {
                return wx.getStorageSync("session_id") || "";
            } catch (t) {
                return "";
            }
        }
    }, {
        key: "clearSessionId",
        value: function() {
            wx.removeStorage({
                key: "session_id",
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "saveServerConfig",
        value: function(t) {
            wx.setStorage({
                key: "server_config",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getServerConfig",
        value: function() {
            try {
                return wx.getStorageSync("server_config") || 0;
            } catch (t) {
                return 0;
            }
        }
    }, {
        key: "getFirstBlood",
        value: function() {
            try {
                return wx.getStorageSync("first_blood") || 0;
            } catch (t) {
                return 0;
            }
        }
    }, {
        key: "saveFirstBlood",
        value: function() {
            wx.setStorage({
                key: "first_blood",
                data: 1,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getHistoryTimes",
        value: function() {
            try {
                return wx.getStorageSync("history_Times2") || !1;
            } catch (t) {
                return !1;
            }
        }
    }, {
        key: "saveHistoryTimes",
        value: function(t) {
            wx.setStorage({
                key: "history_Times2",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "saveActionData",
        value: function(t) {
            wx.setStorage({
                key: "action_data0",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getActionData",
        value: function() {
            try {
                return wx.getStorageSync("action_data0") || !1;
            } catch (t) {
                return !1;
            }
        }
    }, {
        key: "saveAdTag",
        value: function(t) {
            wx.setStorage({
                key: "ad_tag0",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getAdTag",
        value: function() {
            try {
                return wx.getStorageSync("ad_tag0") || !1;
            } catch (t) {
                return !1;
            }
        }
    }, {
        key: "saveWeekBestScore",
        value: function(t) {
            wx.setStorage({
                key: "weeek_best_score0",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getWeekBestScore",
        value: function() {
            try {
                var t = wx.getStorageSync("weeek_best_score0") || 0;
                return t && t.ts && (t = t.ts < Date.now() ? 0 : t.data), t;
            } catch (t) {
                return 0;
            }
        }
    }, {
        key: "setRelayNewBie",
        value: function() {
            wx.setStorage({
                key: "relay_newbie",
                data: 1,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getRelayNewBie",
        value: function() {
            try {
                return wx.getStorageSync("relay_newbie") || 0;
            } catch (t) {
                return 0;
            }
        }
    }, {
        key: "getWangZheBaseStatus",
        value: function() {
            return n.USEWANGZHEBASE;
        }
    }, {
        key: "getMmpayBaseStatus",
        value: function() {
            return n.USEMMPAYBASE;
        }
    }, {
        key: "getMmpayBonusStatus",
        value: function() {
            var t = {
                status: 0,
                expire_time: !1
            }, e = void 0;
            if (this.mmpayStatus) e = this.mmpayStatus; else try {
                e = wx.getStorageSync("mmpayStatus");
            } catch (n) {
                e = t;
            }
            if (1 == e.status) {
                var n = Math.round(new Date() / 1e3);
                return e.expire_time + e.svr_time < n ? t : e;
            }
            return 0 == e.status ? e : t;
        }
    }, {
        key: "setMmpayBonusStatus",
        value: function(t, e) {
            this.mmpayStatus = Object.assign(t, {
                svr_time: e
            }), wx.setStorage({
                key: "mmpayStatus",
                data: this.mmpayStatus
            });
        }
    }, {
        key: "getBottleSkinData",
        value: function(t) {
            return this.getBottleSkinShopList().find(function(e) {
                return e.id == t;
            });
        }
    }, {
        key: "getBottleSkinShopList",
        value: function() {
            return void 0 !== this.BottleSkinShopList ? this.BottleSkinShopList : wx.getStorageSync("bottleSkin_shopList") || [];
        }
    }, {
        key: "setBottleSkinShopList",
        value: function(t) {
            this.BottleSkinShopList = t, wx.setStorage({
                key: "bottleSkin_shopList",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getSkinResources",
        value: function() {
            return void 0 !== this.BottleSkinResources ? this.BottleSkinResources : wx.getStorageSync("bottleSkin_skinResources") || {};
        }
    }, {
        key: "setSkinResources",
        value: function(t) {
            this.BottleSkinResources = t, wx.setStorage({
                key: "bottleSkin_skinResources",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getCanUseBottleSkinIdList",
        value: function() {
            return void 0 !== this.canUseBottleSkinList ? this.canUseBottleSkinList : wx.getStorageSync("bottleSkin_canUseList") || [];
        }
    }, {
        key: "setCanUseBottleSkinIdList",
        value: function(t) {
            this.canUseBottleSkinList = t, wx.setStorage({
                key: "bottleSkin_canUseList",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "setSelectBottleSkinId",
        value: function(t) {
            this.bottleSkinId = t, wx.setStorage({
                key: "bottleSkin_skinId",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getSelectBottleSkinId",
        value: function() {
            return void 0 !== this.bottleSkinId ? this.bottleSkinId : wx.getStorageSync("bottleSkin_skinId");
        }
    }, {
        key: "saveMsgBoxData",
        value: function(t) {
            wx.setStorage({
                key: "msg_box_data_0",
                data: t,
                success: function(t) {},
                fail: function(t) {}
            });
        }
    }, {
        key: "getMsgBoxData",
        value: function() {
            try {
                return wx.getStorageSync("msg_box_data_0") || null;
            } catch (t) {
                return null;
            }
        }
    }, {
        key: "setSyncBottleSkinFailFlag",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.syncBottleSkinFailFlag = t;
        }
    }, {
        key: "getSyncBottleSkinFailFlag",
        value: function() {
            return this.syncBottleSkinFailFlag || 0;
        }
    } ]), a;
}();

exports.default = a;