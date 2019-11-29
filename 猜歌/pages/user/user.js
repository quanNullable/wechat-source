require("../../config/appsetting.js");

var a = require("../../api/adApi.js"), e = getApp();

Page({
    data: {
        buy_status: "hide",
        share_status: "hide",
        ss: !1,
        goods_number: "",
        avatarUrl: "",
        game_number: 0,
        nickName: "",
        play_times: 0,
        score: 0,
        is_game_number: !0,
        more_games: [],
        user_share_txt: "",
        share_game_number: 0
    },
    onLoad: function(a) {
        var t = this;
        wx.showShareMenu({
            withShareTicket: !0
        }), t.data.timer = setInterval(function() {
            0 != e.globalData.user_id && (clearInterval(t.data.timer), wx.getSetting({
                success: function(a) {
                    t.setData({
                        isAuthorize: !!a.authSetting["scope.userInfo"]
                    });
                }
            }), t.get_ureinfo(), t.get_user_data(), t.setData({
                is_onshow: !0
            }));
        }, 100), this.loadMore();
    },
    loadMore: function() {
        var e = this;
        (0, a.getMore)(function(a) {
            e.setData({
                moreGames: a.data.link_list
            });
        });
    },
    onShow: function() {
        var a = this;
        a.data.is_onshow && a.get_user_data();
    },
    get_ureinfo: function(a) {
        if (a && a.detail && a.detail.userInfo) e.globalData.userInfo = a.detail.userInfo, 
        wx.setStorageSync("__userinfo", JSON.stringify(a.detail.userInfo)); else {
            var t = wx.getStorageSync("__userinfo");
            if (t) try {
                e.globalData.userInfo = JSON.parse(t);
            } catch (a) {
                e.globalData.userInfo = null;
            } else e.globalData.userInfo = null;
        }
        if (e.globalData.userInfo) {
            var s = this;
            wx.login({
                success: function(a) {
                    e.globalData.code = a.code, wx.request({
                        url: e.globalData.get_url + "/index/Versioncontrol/index",
                        data: {
                            secretkey: e.globalData.secretkey,
                            libVersion: e.globalData.libVersion,
                            action: "login",
                            code: e.globalData.code,
                            nickName: e.globalData.userInfo.nickName,
                            avatarUrl: e.globalData.userInfo.avatarUrl,
                            gender: e.globalData.userInfo.gender,
                            city: e.globalData.userInfo.city,
                            province: e.globalData.userInfo.province,
                            country: e.globalData.userInfo.country
                        },
                        method: "POST",
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(a) {
                            e.globalData.user_id = a.data.id, s.setData({
                                isAuthorize: !0,
                                avatarUrl: e.globalData.userInfo.avatarUrl,
                                nickName: e.globalData.userInfo.nickName,
                                gender: e.globalData.userInfo.gender,
                                city: e.globalData.userInfo.city
                            });
                        }
                    });
                }
            });
        }
    },
    get_user_data: function() {
        var a = this;
        wx.request({
            url: e.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: e.globalData.secretkey,
                libVersion: e.globalData.libVersion,
                action: "user",
                user_id: e.globalData.user_id
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.setData({
                    avatarUrl: t.data.data.userinfo.avatarUrl,
                    game_number: t.data.data.userinfo.game_number,
                    nickName: t.data.data.userinfo.nick_name,
                    play_times: t.data.data.userinfo.play_times,
                    score: t.data.data.userinfo.score,
                    more_games: t.data.data.all,
                    is_send_goods: e.globalData.is_send_goods,
                    wins: t.data.data.wins,
                    is_payment: e.globalData.is_payment,
                    is_wawa: e.globalData.is_wawa,
                    is_more_games: e.globalData.is_more_games,
                    is_game_number: e.globalData.is_game_number,
                    is_payment_list: e.globalData.is_payment_list,
                    user_share_txt: e.globalData.user_share_txt,
                    share_game_number: e.globalData.share_game_number,
                    game_more_games_txt: e.globalData.game_more_games_txt,
                    kefu_title: e.globalData.kefu_title
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        console.log("user page share options ", a), wx.showShareMenu({
            withShareTicket: !0
        });
        var t = "/pages/index/index", s = e.globalData.index_share_title, o = e.globalData.index_share_img, n = 1 == a.target.dataset.id;
        return n && (t = "/pages/group/index?uid=" + e.globalData.user_id + "&timestamp=" + new Date().getTime(), 
        s = e.globalData.pk_share_txt, o = e.globalData.pk_share_img), {
            title: s,
            path: t,
            imageUrl: o,
            success: function(a) {
                if (n) {
                    var t = a.shareTickets, s = t ? t[t.length - 1] : null;
                    s ? wx.getShareInfo({
                        shareTicket: s,
                        success: function(a) {
                            var o = encodeURIComponent(a.encryptedData), n = encodeURIComponent(a.iv);
                            wx.request({
                                url: e.globalData.get_url + "/index/Versioncontrol/index",
                                data: {
                                    shareTicket: s,
                                    secretkey: e.globalData.secretkey,
                                    libVersion: e.globalData.libVersion,
                                    action: "insert_click_share",
                                    user_id: e.globalData.user_id,
                                    encryptedData: o,
                                    iv: n
                                },
                                method: "POST",
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(a) {
                                    console.log("insert_click_share result ", a), 0 == a.data.code ? wx.showModal({
                                        title: "提示",
                                        showCancel: !1,
                                        content: e.globalData.pk_share_repeat_tishi
                                    }) : wx.redirectTo({
                                        url: "/pages/group/index?wait=1&useRandUser=" + (null != t)
                                    });
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
                        success: function(a) {
                            wx.redirectTo({
                                url: "/pages/group/index?wait=1&useRandUser=" + (null != t)
                            });
                        }
                    });
                }
            },
            fail: function(a) {}
        };
    },
    buy_show: function() {
        this.setData({
            buy_status: "show"
        });
    },
    share_show: function() {
        this.setData({
            share_status: "show"
        });
    },
    pay: function(a) {
        var t = this;
        wx.request({
            data: {
                secretkey: e.globalData.secretkey,
                libVersion: e.globalData.libVersion,
                action: "payment",
                fee: a.currentTarget.dataset.fee,
                user_id: e.globalData.user_id
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(a) {
                wx.requestPayment({
                    timeStamp: a.data.timeStamp,
                    nonceStr: a.data.nonceStr,
                    package: a.data.package,
                    signType: "MD5",
                    paySign: a.data.paySign,
                    success: function(a) {
                        wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            duration: 1e3
                        }), t.setData({
                            buy_status: "hide"
                        }), t.onLoad();
                    },
                    fail: function(a) {
                        wx.showToast({
                            title: "支付失败",
                            icon: "success",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    closePopupBuy: function() {
        this.setData({
            buy_status: "hide"
        });
    },
    closePopupShare: function() {
        this.setData({
            share_status: "hide"
        });
    },
    more_games: function(e) {
        var t = e.currentTarget.dataset, s = t.toid, o = t.appid, n = t.path, i = t.extardata, r = t.version;
        wx.navigateToMiniProgram({
            appId: o,
            path: n,
            extarData: {
                channel: i,
                data: i
            },
            envVersion: r,
            success: function(e) {
                (0, a.addStatistics)(s);
            }
        });
    },
    tousu: function() {
        wx.navigateTo({
            url: "../tousu/tousu"
        });
    }
});