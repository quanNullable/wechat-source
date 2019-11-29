(0, require("../../../cwx/cwx").CPage)({
    pageId: "10320663267",
    data: {
        text: "Page expand"
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    freeJL: function() {
        wx.switchTab({
            url: "/pages/train/index/index"
        });
    }
});