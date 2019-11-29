var e = require("../../../cwx/cwx.js"), t = require("../../../cwx/ext/global.js");

(0, e.CPage)({
    pageId: "",
    data: {},
    onLoad: function(e) {
        var t = e.scene ? decodeURIComponent(e.scene) : "";
        t && this.getSceneConfig(t);
    },
    getSceneConfig: function(t) {
        var a = this, o = {};
        new Date();
        o = {
            appid: e.cwx.appId,
            scene: t,
            path: this.route,
            exInfo: null
        }, e.cwx.request({
            url: "/restapi/soa2/12673/exchangeAppPath",
            method: "POST",
            data: o,
            success: function(e) {
                e && e.data && e.data.ResponseStatus && "Success" == e.data.ResponseStatus.Ack && 0 == Number(e.data.errcode) ? a.goTargetUrl(e.data.fullpath) : a.goHome();
            },
            fail: function(e) {
                a.goHome();
            }
        });
    },
    goTargetUrl: function(a) {
        var o = this;
        -1 != e._.indexOf(t.tabbar, a) ? e.cwx.switchTab({
            url: "/" + a.trim()
        }) : a ? e.cwx.redirectTo({
            url: "/" + a.trim(),
            fail: function(e) {
                o.goHome();
            }
        }) : o.goHome();
    },
    goHome: function() {
        e.cwx.switchTab({
            url: "/pages/train/index/index"
        });
    }
});