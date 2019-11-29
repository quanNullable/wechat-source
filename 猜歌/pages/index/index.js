var a = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (a[i] = t[i]);
    }
    return a;
}, e = (require("../../config/appsetting.js"), require("../../api/adApi.js")), t = (require("../../config/globalenum.js"), 
require("../../utils/memoryHelper.js"), getApp());

Page({
    data: {
        guize_list: [],
        ruleShow: !1,
        buy_status: "hide",
        share_status: "hide",
        game_number: 0,
        timer: "",
        loading: "show",
        index_more_games: []
    },
    onLoad: function(a) {
        console.log("onLoad");
        var e = this;
        e.data.timer = setInterval(function() {
            0 != t.globalData.user_id && t.globalData.is_initialize && (e.setData({
                is_onshow: !0
            }), clearInterval(e.data.timer), e.get_index_data());
        }, 100), this.loadAd();
    },
    loadAd: function() {
        var t = this;
        (0, e.getIndex)(function(e) {
            t.setData(a({}, e));
        });
    },
    onReady: function() {
        console.log("onready");
    },
    onShow: function() {
        console.log("onShow");
        var a = this;
        a.data.is_onshow && a.get_index_data();
    },
    get_index_data: function() {
      console.log("get_index_data");
        var a = this;
        wx.request({
            url: t.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: t.globalData.secretkey,
                libVersion: t.globalData.libVersion,
                action: "index",
                user_id: t.globalData.user_id
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                "404" == e.statusCode ? a.get_index_data() : 2 == e.data.code ? (t.globalData.is_initialize = !1, 
                t.onLaunch()) : (e.data.data.game_number <= 0 && t.globalData.is_payment && t.globalData.is_payment_list ? a.setData({
                    pay_status: "start-pay"
                }) : e.data.data.game_number <= 0 && t.globalData.is_payment && !t.globalData.is_payment_list ? a.setData({
                    pay_status: "start"
                }) : a.setData({
                    pay_status: "start",
                    game_number: e.data.data.game_number
                }), a.setData({
                    game_number: e.data.data.game_number,
                    guize_list: e.data.data.guize_list,
                    index_banner_img: t.globalData.index_banner_img,
                    is_wawa: t.globalData.is_wawa,
                    is_send_goods: t.globalData.is_send_goods,
                    is_payment_list: t.globalData.is_payment_list,
                    user_share_img: t.globalData.user_share_img,
                    is_rank: t.globalData.is_rank,
                    is_user_info: t.globalData.is_user_info,
                    index_share_txt: t.globalData.index_share_txt,
                    index_share_title: t.globalData.index_share_title,
                    index_toubu_guize_txt: t.globalData.index_toubu_guize_txt,
                    index_tishi_txt_1: t.globalData.index_tishi_txt_1,
                    index_tishi_txt_2: t.globalData.index_tishi_txt_2,
                    index_middle_ad: t.globalData.index_middle_ad,
                    is_index_middle_ad: t.globalData.is_index_middle_ad,
                    index_float_ad: t.globalData.index_float_ad,
                    is_index_float_ad: t.globalData.is_index_float_ad,
                    index_more_games: e.data.data.index_more_games,
                    is_ad1: t.globalData.is_ad1,
                    is_ad2: t.globalData.is_ad2,
                    loading: "hide",
                    is_game_skip: e.data.data.is_game_skip,
                    skip_tye: t.globalData.skip_type
                }));
            }
        });
    },
    go_url: function() {
        var a = this;
        1 != t.globalData.is_skip_other || 0 != t.globalData.skip_type && (1 != t.globalData.skip_type || 0 != a.data.is_game_skip) ? wx.getNetworkType({
            success: function(e) {
                "none" != e.networkType ? a.data.game_number < 1 ? a.share_show() : wx.navigateTo({
                    url: "../game/game"
                }) : wx.showModal({
                    content: "没有检测到网络信号或信号较差，请稍后再试",
                    showCancel: !1,
                    success: function(a) {}
                });
            },
            fail: function(a) {
                wx.showModal({
                    content: "没有检测到网络信号或信号较差，请稍后再试",
                    showCancel: !1,
                    success: function(a) {}
                });
            }
        }) : wx.navigateToMiniProgram({
            appId: t.globalData.skip_appid,
            path: t.globalData.skip_path,
            success: function(a) {
                wx.request({
                    url: t.globalData.get_url + "/index/Versioncontrol/index",
                    data: {
                        libVersion: t.globalData.libVersion,
                        action: "game_skip",
                        user_id: t.globalData.user_id
                    },
                    method: "POST",
                    success: function(a) {}
                });
            }
        });
    },
    goTxtPage: function() {
        wx.navigateTo({
            url: "../txtpage/txtpage",
            success: function(a) {
                wx.request({
                    url: t.globalData.get_url + "/index/Versioncontrol/index",
                    data: {
                        param_url: "../txtpage/txtpage",
                        libVersion: t.globalData.libVersion,
                        action: "url_jump",
                        user_id: t.globalData.user_id
                    },
                    method: "POST",
                    success: function(a) {}
                });
            }
        });
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
    closePopupBuy: function() {
        this.setData({
            buy_status: "hide"
        });
    },
    closePopupShare: function() {
        this.setData({
            share_status: "hide"
        }), wx.navigateTo({
            url: "/pages/group/index"
        });
    },
    onShareAppMessage: function() {
        wx.showShareMenu({
            withShareTicket: !0
        });
        var a = "/pages/group/index?uid=" + t.globalData.user_id + "&timestamp=" + new Date().getTime();
        return console.log("group share path ", a), {
            title: t.globalData.index_share_title,
            path: a,
            imageUrl: t.globalData.index_share_img,
            success: function(a) {
                console.log("share success ", a);
                var e = a.shareTickets, i = e ? e[e.length - 1] : null;
                i ? wx.getShareInfo({
                    shareTicket: i,
                    success: function(a) {
                        var s = encodeURIComponent(a.encryptedData), o = encodeURIComponent(a.iv);
                        wx.request({
                            url: t.globalData.get_url + "/index/Versioncontrol/index",
                            data: {
                                shareTicket: i,
                                secretkey: t.globalData.secretkey,
                                libVersion: t.globalData.libVersion,
                                action: "insert_click_share",
                                user_id: t.globalData.user_id,
                                encryptedData: s,
                                iv: o
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(a) {
                                console.log("insert_click_share result ", a), 0 == a.data.code ? wx.showModal({
                                    title: "提示",
                                    showCancel: !1,
                                    content: t.globalData.pk_share_repeat_tishi
                                }) : wx.redirectTo({
                                    url: "/pages/group/index?wait=1&useRandUser=" + (null != e)
                                });
                            }
                        });
                    }
                }) : wx.request({
                    url: t.globalData.get_url + "/index/Versioncontrol/index",
                    data: {
                        secretkey: t.globalData.secretkey,
                        libVersion: t.globalData.libVersion,
                        action: "insert_click_share",
                        user_id: t.globalData.user_id
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        wx.redirectTo({
                            url: "/pages/group/index?wait=1&useRandUser=" + (null != e)
                        });
                    }
                });
            },
            fail: function(a) {}
        };
    },
    openRule: function() {
        this.setData({
            ruleShow: !0
        });
    },
    closeRule: function() {
        this.setData({
            ruleShow: !1
        });
    },
    more_games: function(a) {
        var t = a.currentTarget.dataset, i = t.toid, s = t.appid, o = t.path, n = t.extardata, l = t.version;
        wx.navigateToMiniProgram({
            appId: s,
            path: o,
            extarData: {
                channel: n,
                data: n
            },
            envVersion: l,
            success: function(a) {
                (0, e.addStatistics)(i);
            }
        });
    }
});