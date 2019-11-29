var t = getApp();

Page({
    data: {
        currentTab: 0,
        winWidth: 0,
        winHeight: 0,
        write_addres: "hide",
        gift_list: [],
        gift_list_slice: [],
        limit: 6,
        linqu_limit: 0,
        linqu_list: [],
        address: "",
        true_name: "",
        phone_num: ""
    },
    onLoad: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    winWidth: 750 / t.windowWidth * t.windowWidth,
                    winHeight: 750 / t.windowWidth * t.windowHeight - 144
                });
            }
        }), a.get_gift_data();
    },
    get_gift_data: function() {
        var a = this;
        wx.request({
            url: t.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: t.globalData.secretkey,
                libVersion: t.globalData.libVersion,
                action: "gift",
                user_id: t.globalData.user_id
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.setData({
                    linqu_limit: t.data.count,
                    address: t.data.address.address,
                    true_name: t.data.address.true_name,
                    phone_num: t.data.address.phone_num,
                    gift_list: t.data.gift_list,
                    gift_list_slice: t.data.gift_list.slice(0, a.data.limit),
                    linqu_list: t.data.linqu_list
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
    },
    linqu_click: function(t) {
        var a = this;
        a.data.linqu_limit < 1 ? wx.showToast({
            title: "挑战成功即可领取",
            icon: "none",
            duration: 2e3
        }) : a.setData({
            write_addres: "show",
            goods_id: t.currentTarget.dataset.id
        });
    },
    cancel: function() {
        this.setData({
            write_addres: "hide"
        });
    },
    send_gift: function(a) {
        var e = this, i = e.data.address, n = e.data.phone_num, s = e.data.true_name, d = e.data.goods_id;
        "" === i ? wx.showToast({
            title: "请输入收货地址",
            icon: "none",
            duration: 2e3
        }) : "" === n ? wx.showToast({
            title: "请输入联系电话",
            icon: "none",
            duration: 2e3
        }) : "" === s ? wx.showToast({
            title: "请输入真实姓名",
            icon: "none",
            duration: 2e3
        }) : wx.request({
            url: t.globalData.get_url + "/index/Versioncontrol/index",
            data: {
                secretkey: t.globalData.secretkey,
                libVersion: t.globalData.libVersion,
                action: "send_gift",
                goods_id: d,
                user_id: t.globalData.user_id,
                true_name: e.data.true_name,
                address: e.data.address,
                phone_num: e.data.phone_num
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                wx.showToast({
                    title: "领取成功",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../gift/gift"
                    });
                }, 2e3);
            },
            fail: function(t) {
                console.log(t.data);
            }
        });
    },
    true_name: function(t) {
        this.setData({
            true_name: t.detail.value
        });
    },
    address: function(t) {
        this.setData({
            address: t.detail.value
        });
    },
    phone_num: function(t) {
        this.setData({
            phone_num: t.detail.value
        });
    }
});