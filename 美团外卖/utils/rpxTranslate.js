module.exports = function(e, r) {
    var s = 0, t = 375;
    return wx.getSystemInfo({
        success: function(u) {
            if (t = u.screenWidth, "px" === r) {
                var n = e * t;
                s = Number(n / 750);
            } else if ("rpx" === r) {
                var c = 750 * e;
                s = Number(c / t);
            }
        }
    }), s;
};