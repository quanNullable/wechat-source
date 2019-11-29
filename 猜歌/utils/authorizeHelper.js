require("../config/scopeenum.js");

var n = {
    authorize: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
        wx.getSetting({
            success: function(o) {
                o.authSetting[t] ? e() : wx.authorize({
                    scope: t,
                    success: e,
                    fail: function() {
                        n.reAuthorize(t, e, i);
                    }
                });
            },
            fail: function() {
                n.reAuthorize(t, e, i);
            }
        });
    },
    reAuthorize: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
        wx.showModal({
            title: "警告",
            content: "您拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。",
            showCancel: !0,
            cancelText: "不授权",
            confirmText: "授权",
            success: function(o) {
                o.confirm ? n.openAuthorize(t, e, i) : i();
            }
        });
    },
    checkAuthorize: function(n, t) {
        wx.getSetting({
            success: function(e) {
                t(e.authSetting[n]);
            }
        });
    },
    openAuthorize: function(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
        wx.openSetting({
            success: function(i) {
                i.authSetting[n] ? t(i) : wx.authorize({
                    scope: n,
                    success: t,
                    fail: e
                });
            },
            fail: function(n) {
                e({
                    expired: !0
                });
            }
        });
    },
    login: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
        wx.login({
            success: function(t) {
                n(t);
            }
        });
    }
};

module.exports = n;