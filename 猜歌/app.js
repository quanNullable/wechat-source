App({
    onLaunch: function() {
        var a = this;
        wx.onNetworkStatusChange(function(a) {
            "none" == a.networkType && wx.showToast({
                title: "当前网络状态不佳，可能会影响您的挑战体验",
                icon: "none",
                duration: 4e3
            });
        }), wx.checkSession({
            success: function() {
                var t = wx.getStorageSync("user_id");
                t ? a.globalData.user_id = t : a.get_login();
            },
            fail: function() {
                a.get_login();
            }
        });
        var t = setInterval(function() {
            0 != a.globalData.user_id && (clearInterval(t), a.globalData.is_initialize || a.get_initialize());
        }, 100);
    },
    get_login: function() {
        var a = this;
        wx.login({
            success: function(t) {
                a.globalData.code = t.code, wx.request({
                    url: a.globalData.get_url + "/index/Versioncontrol/index",
                    data: {
                        libVersion: a.globalData.libVersion,
                        action: "login",
                        code: a.globalData.code
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        "404" == t.statusCode && a.get_login(), wx.setStorage({
                            key: "user_id",
                            data: t.data.id
                        }), a.globalData.user_id = t.data.id;
                    }
                });
            }
        });
    },
    get_initialize: function() {
        var a = this;
        wx.request({
            url: a.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                libVersion: a.globalData.libVersion,
                action: "initialize",
                user_id: a.globalData.user_id
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                "404" == t.statusCode && a.get_initialize(), a.globalData.index_share_title = t.data.data.index_share_title, 
                a.globalData.index_share_img = t.data.data.index_share_img, a.globalData.game_share_title = t.data.data.game_share_title, 
                a.globalData.game_share_img = t.data.data.game_share_img, a.globalData.user_share_title = t.data.data.user_share_title, 
                a.globalData.user_share_img = t.data.data.user_share_img, a.globalData.index_banner_img = t.data.data.index_banner_img, 
                a.globalData.jiqi_wait_time = t.data.data.jiqi_wait_time, a.globalData.pk_share_img = t.data.data.pk_share_img, 
                a.globalData.pk_share_txt = t.data.data.pk_share_txt, a.globalData.pk_one_wait_time = t.data.data.pk_one_wait_time, 
                a.globalData.pk_qun_wait_time = t.data.data.pk_qun_wait_time, a.globalData.pk_not_match_tishi = t.data.data.pk_not_match_tishi, 
                a.globalData.pk_share_repeat_tishi = t.data.data.pk_share_repeat_tishi, a.globalData.index_toubu_guize_txt = t.data.data.index_toubu_guize_txt, 
                a.globalData.index_share_txt = t.data.data.index_share_txt, a.globalData.game_fail_share_txt = t.data.data.game_fail_share_txt, 
                a.globalData.game_fail_share_txt_1 = t.data.data.game_fail_share_txt_1, a.globalData.game_fail_share_txt_2 = t.data.data.game_fail_share_txt_2, 
                a.globalData.game_fail_share_txt_3 = t.data.data.game_fail_share_txt_3, a.globalData.game_fail_share_txt_4 = t.data.data.game_fail_share_txt_4, 
                a.globalData.game_win_share_txt = t.data.data.game_win_share_txt, a.globalData.game_win_share_txt_1 = t.data.data.game_win_share_txt_1, 
                a.globalData.game_win_share_txt_2 = t.data.data.game_win_share_txt_2, a.globalData.game_win_share_txt_3 = t.data.data.game_win_share_txt_3, 
                a.globalData.game_win_share_txt_4 = t.data.data.game_win_share_txt_4, a.globalData.user_share_txt = t.data.data.user_share_txt, 
                a.globalData.share_game_number = t.data.data.share_game_number, a.globalData.game_more_games_txt = t.data.data.game_more_games_txt, 
                a.globalData.index_tishi_txt_1 = t.data.data.index_tishi_txt_1, a.globalData.index_tishi_txt_2 = t.data.data.index_tishi_txt_2, 
                a.globalData.is_skip_other = t.data.data.is_skip_other, a.globalData.skip_type = t.data.data.skip_type, 
                a.globalData.skip_appid = t.data.data.skip_appid, a.globalData.skip_path = t.data.data.skip_path, 
                a.globalData.is_index_float_ad = t.data.data.is_index_float_ad, a.globalData.is_index_middle_ad = t.data.data.is_index_middle_ad, 
                a.globalData.is_game_bottom_ad = t.data.data.is_game_bottom_ad, a.globalData.index_float_ad = t.data.data.index_float_ad, 
                a.globalData.index_middle_ad = t.data.data.index_middle_ad, a.globalData.game_bottom_ad = t.data.data.game_bottom_ad, 
                a.globalData.is_ad1 = t.data.data.is_ad1, a.globalData.is_ad2 = t.data.data.is_ad2, 
                a.globalData.is_ad3 = t.data.data.is_ad3, a.globalData.is_payment = t.data.data.is_payment, 
                a.globalData.is_guize = t.data.data.is_guize, a.globalData.is_wawa = t.data.data.is_wawa, 
                a.globalData.is_send_goods = t.data.data.is_send_goods, a.globalData.is_more_games = t.data.data.is_more_games, 
                a.globalData.is_game_number = t.data.data.is_game_number, a.globalData.is_payment_list = t.data.data.is_payment_list, 
                a.globalData.is_rank = t.data.data.is_rank, a.globalData.is_user_info = t.data.data.is_user_info, 
                a.globalData.is_initialize = !0, a.globalData.secretkey = t.data.data.secretkey, 
                a.globalData.pay_txt = t.data.data.pay_txt, a.globalData.kefu_title = t.data.data.kefu_title, 
                a.globalData.is_go_alb = t.data.data.is_go_alb, a.globalData.is_go_alb && go_alb();
            }
        });
    },
    go_alb: function() {
        wx.navigateToMiniProgram({
            appId: "wxd2cc44709ab3d99f",
            path: "/pages/index/index",
            extarData: {
                open: "happy"
            },
            envVersion: "release",
            success: function(a) {
                console.log(10);
            }
        });
    },
    globalData: {
        is_payment: !1,
        is_payment_list: !1,
        is_guize: !1,
        is_wawa: !1,
        is_send_goods: !1,
        is_more_games: !1,
        is_game_number: !1,
        is_rank: !1,
        is_user_info: !1,
        index_share_title: "快来挑战我吧",
        index_share_img: "/img/banner.png",
        game_share_title: "快来挑战我吧",
        game_share_img: "/img/banner.png",
        user_share_title: "快来挑战我吧",
        user_share_img: "/img/banner.png",
        userInfo: null,
        index_banner_img: "/img/banner.png",
        code: null,
        
        get_url: "https://shengqianle.xyz",
        libVersion: "1_5_5",
        is_initialize: !1,
        // user_id: 0,
        // secretkey: "test"
        secretkey: "test",
        user_id: 123,
        
    }
});