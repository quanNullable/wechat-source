Page({
    data: {
        url: ""
    },
    onLoad: function(t) {
        this.setData({
            url: "https://shengqianle.xyz/txtpage/txtpage.html?nonectr=" + new Date().getTime()
        });
    }
});