var o = {};

o.showLoading = function(o) {
    wx.showToast({
        title: o || "加载中",
        icon: "loading",
        duration: 1e4
    });
}, o.hideLoading = function() {
    wx.hideToast();
}, o.info = function(o) {
    wx.showToast({
        title: o,
        icon: "success"
    });
}, o.err = function(o) {
    console.log(o);
}, o.validate = {
    isMobile: function(o) {
        return /^(1[3-8][0-9])\d{8}$/.test(o);
    }
}, module.exports = o;