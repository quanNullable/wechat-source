var t = getApp();

Page({
    data: {
        currentTab: 0,
        winWidth: 0,
        winHeight: 0,
        challenge: [],
        win: []
    },
    onLoad: function(t) {
        this.get_rank_data();
    },
    get_rank_data: function() {
        var a = this;
        wx.request({
            url: t.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: t.globalData.secretkey,
                libVersion: t.globalData.libVersion,
                action: "rank"
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.setData({
                    win: t.data.win,
                    challenge: t.data.challenge
                });
            }
        });
    },
    swiperTab: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    clickTab: function(t) {
        var a = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        a.setData({
            currentTab: t.target.dataset.current
        });
    }
});