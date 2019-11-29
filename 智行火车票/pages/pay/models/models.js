Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    getPackage: {
        channel: "getPackage",
        path: "weixin"
    }
};

exports.GetPackageModel = function(e) {
    var t = e.channel, a = "https://order.tieyou.com/index.php?param=" + e.path + "/" + t + ".html&requestType=rep";
    return function(e, t, n) {
        wx.request({
            url: a,
            data: e,
            success: function(e) {
                t(e.data);
            },
            fail: function(e) {
                n(e.data);
            }
        });
    };
}(e.getPackage);