var e = getApp(), a = 10, t = !1;

Page({
    data: {
        WAIT_SECOND: a,
        timestamp: new Date().getTime(),
        isMatching: !1,
        isReady: t,
        endTime: a,
        game_number: 0
    },
    onLoad: function(t) {
        var n = this, i = setInterval(function() {
            if (0 != e.globalData.user_id) {
                if (n.setData({
                    pk_not_match_tishi: e.globalData.pk_not_match_tishi,
                    timeout: !1
                }), e.globalData) {
                    var r = e.globalData, o = r.pk_one_wait_time, s = r.pk_qun_wait_time;
                    a = "true" == t.useRandUser || 1 == t.useRandUser ? s || a : o || a;
                }
                if (console.log("WAIT_SECOND", a, "new Date().getTime() - options.timestamp", new Date().getTime() - t.timestamp), 
                t.timestamp && new Date().getTime() - t.timestamp > 1e3 * a) return wx.reLaunch({
                    url: "/pages/index/index"
                }), void clearInterval(i);
                n.loadCurrentUser(), n.get_index_data(), t.uid && e.globalData.user_id != t.uid && t.timestamp ? n.joinGroup(t) : 1 == t.wait && n.waitTargetUser(t.useRandUser), 
                clearInterval(i);
            }
        }, 200);
    },
    get_index_data: function() {
        var a = this;
        wx.request({
            url: e.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: e.globalData.secretkey,
                libVersion: e.globalData.libVersion,
                action: "index",
                user_id: e.globalData.user_id
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                "404" == e.statusCode ? a.get_index_data() : a.setData({
                    game_number: e.data.data.game_number
                });
            }
        });
    },
    bind2Game: function() {
        this.data.game_number <= 0 ? wx.showModal({
            title: "提示",
            content: e.globalData.index_tishi_txt_1,
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        }) : (this.data.readyInterval && clearInterval(this.data.readyInterval), this.data.waitInterval && clearInterval(this.data.waitInterval), 
        wx.redirectTo({
            url: "/pages/game/game"
        }));
    },
    getWxUserInfo: function(e) {
        var a = this;
        e && e.detail && e.detail.userInfo && (wx.setStorageSync("__userinfo", JSON.stringify(e.detail.userInfo)), 
        a.setData({
            isAuthorize: !0,
            userInfo: e.detail.userInfo
        }));
    },
    loadCurrentUser: function() {
        var a = this;
        wx.getSetting({
            success: function(t) {
                var n = !!t.authSetting["scope.userInfo"], i = {};
                if (n) {
                    var r = wx.getStorageSync("__userinfo");
                    if (r) try {
                        i = JSON.parse(r);
                    } catch (a) {
                        e.globalData.userInfo = null;
                    }
                }
                a.setData({
                    isAuthorize: n,
                    userInfo: i
                });
            }
        });
    },
    waitTargetUser: function(t) {
        var n = this, i = a;
        this.setData({
            WAIT_SECOND: a,
            endTime: i
        });
        var r = setInterval(function() {
            i -= 1, !n.data.isMatching && i > 0 ? (n.setData({
                endTime: i
            }), console.log("app.globalData.jiqi_wait_time", e.globalData.jiqi_wait_time, "endTime", i), 
            i != e.globalData.jiqi_wait_time || "true" != t && 1 != t ? n.loadJoinUser(function() {
                clearInterval(r);
            }) : (n.loadRandUser(), clearInterval(r))) : (n.setData({
                endTime: i <= 0 ? 0 : i,
                reShare: !0
            }), i <= 0 && ("true" == t || 1 == t ? n.loadRandUser() : n.setData({
                timeout: !0
            }), clearInterval(r)));
        }, 1e3);
        this.setData({
            waitInterval: r
        });
    },
    loadJoinUser: function(a) {
        var n = this;
        console.log("loadJoinUser isReady ", t, " data isReady ", n.data.isReady), wx.request({
            url: e.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: e.globalData.secretkey,
                libVersion: e.globalData.libVersion,
                action: "user_isclick",
                user_id: e.globalData.user_id
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log(e), !t && e.data && e.data.avatar_url && (t = !0, a(), n.setData({
                    randUser: e.data
                }), n.readyCountDown());
            }
        });
    },
    readyCountDown: function() {
        var e = this;
        t = !0, e.setData({
            readyTime: 2,
            isMatching: !0,
            isReady: t
        });
        var a = setInterval(function() {
            t || clearInterval(a);
            var n = e.data.readyTime - 1;
            0 == n && t && (clearInterval(a), t = !1, getCurrentPages().filter(function(e) {
                return "pages/game/game" == e.route;
            }).length > 0 || wx.redirectTo({
                url: "/pages/game/game"
            })), e.setData({
                isReady: t,
                readyTime: n
            });
        }, 2e3);
        this.setData({
            readyInterval: a
        });
    },
    loadRandUser: function() {
        var a = this;
        t = !0, a.setData({
            readyTime: 2,
            isMatching: !0,
            isReady: t
        }), wx.request({
            url: e.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: e.globalData.secretkey,
                libVersion: e.globalData.libVersion,
                action: "get_rand_userinfo",
                user_id: e.globalData.user_id
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                a.setData({
                    isRand: !0,
                    randUser: e.data
                }), a.readyCountDown();
            }
        });
    },
    joinGroup: function(a) {
        var t = this;
        console.log("joinGroup options", a), wx.request({
            url: e.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: e.globalData.secretkey,
                libVersion: e.globalData.libVersion,
                action: "change_click_share",
                user_id: e.globalData.user_id,
                target_user: a.uid
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("joinGroup", e.data), t.setData({
                    randUser: e.data
                }), t.readyCountDown();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        this.data.readyInterval && clearInterval(this.data.readyInterval), this.data.waitInterval && clearInterval(this.data.waitInterval);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = this;
        wx.showShareMenu({
            withShareTicket: !0
        }), this.setData({
            pk_not_match_tishi: e.globalData.pk_not_match_tishi,
            timeout: !1
        });
        var t = "/pages/group/index?uid=" + e.globalData.user_id + "&timestamp=" + new Date().getTime();
        return console.log("group share path ", t), {
            title: e.globalData.index_share_title,
            path: t,
            imageUrl: e.globalData.index_share_img,
            success: function(t) {
                console.log("share success ", t);
                var n = t.shareTickets, i = n ? n[n.length - 1] : null;
                i ? wx.getShareInfo({
                    shareTicket: i,
                    success: function(t) {
                        var n = encodeURIComponent(t.encryptedData), r = encodeURIComponent(t.iv);
                        wx.request({
                            url: e.globalData.get_url + "/index/Versioncontrol/index",
                            data: {
                                shareTicket: i,
                                secretkey: e.globalData.secretkey,
                                libVersion: e.globalData.libVersion,
                                action: "insert_click_share",
                                user_id: e.globalData.user_id,
                                encryptedData: n,
                                iv: r
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(t) {
                                console.log("insert_click_share result ", t), 0 == t.data.code ? wx.showModal({
                                    title: "提示",
                                    showCancel: !1,
                                    content: e.globalData.pk_share_repeat_tishi
                                }) : a.waitTargetUser(!0);
                            }
                        });
                    }
                }) : wx.request({
                    url: e.globalData.get_url + "/index/Versioncontrol/index",
                    data: {
                        secretkey: e.globalData.secretkey,
                        libVersion: e.globalData.libVersion,
                        action: "insert_click_share",
                        user_id: e.globalData.user_id
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        a.waitTargetUser(!1);
                    }
                });
            },
            fail: function(e) {
                console.log("share fail ", e);
            }
        };
    }
});