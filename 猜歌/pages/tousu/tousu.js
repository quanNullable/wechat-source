var t = getApp();

Page({
    data: {
        items: [],
        submit_value: 0,
        is_click: !1
    },
    radioChange: function(t) {
        this.setData({
            submit_value: t.detail.value
        });
    },
    submit: function() {
        var a = this;
        0 != a.data.submit_value && 1 != a.data.is_click && (a.data.is_click = !0, wx.request({
            url: t.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: t.globalData.secretkey,
                libVersion: t.globalData.libVersion,
                action: "get_tousu_reason",
                reason: a.data.submit_value,
                user_id: t.globalData.user_id
            },
            success: function(t) {
                if (1 == t.data.code) {
                    wx.showToast({
                        title: "投诉成功",
                        icon: "success",
                        duration: 2e3
                    });
                    var e = setInterval(function() {
                        clearInterval(e), wx.reLaunch({
                            url: "../user/user"
                        }), a.data.is_click = !1;
                    }, 2e3);
                }
            }
        }));
    },
    onLoad: function() {
        this.get_tousu();
    },
    get_tousu: function() {
        var a = this;
        wx.request({
            url: t.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: t.globalData.secretkey,
                libVersion: t.globalData.libVersion,
                action: "get_tousu"
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.setData({
                    items: t.data
                });
            }
        });
    }
});