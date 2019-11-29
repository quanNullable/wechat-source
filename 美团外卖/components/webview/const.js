var e = {
    stack: [],
    CONST: {
        DIRECT: "DIRECT",
        REDIRECT: "REDIRECT",
        SHARE: "share",
        KEY_WEBVIEW_SHARE: "webviewShareConfig"
    },
    loginData: null,
    baseData: {},
    shareConfig: {},
    webviewUrl: "",
    redirectUrl: ""
}, a = {
    isMini: 1
}, t = "qa" === wx.getStorageSync("ENV") ? "https://wx.c.waimai.test.sankuai.com/weapp/v2/account/middlepage" : "https://wx.waimai.meituan.com/weapp/v2/account/middlepage";

module.exports = {
    defaultState: e,
    middlePageUrl: t,
    otherParams: a,
    CONST: e.CONST,
    getState: function() {
        return getApp().store.getState();
    }
};