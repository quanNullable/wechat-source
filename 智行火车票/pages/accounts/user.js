var e = require("../../cwx/cwx.js"), t = require("../train/common/store"), o = require("../flight/common/store"), c = require("common.js"), n = {
    userName: "",
    auth: "",
    duid: "",
    openid: "",
    logintype: "noauthenticate",
    isLogin: function() {
        return "" != this.auth;
    },
    checkLoginStatusFromServer: function(t, o) {
        if ("" == this.auth) t(!1); else {
            var n = {
                Ticket: e.cwx.user.auth,
                IsMobile: !0
            }, r = function(o) {
                e.cwx.user.auth = "", e.cwx.user.duid = "", t(!1);
            };
            try {
                e.cwx.request(c.getRequestObject("10209/CheckLoginStatusByTicket.json", n, function(e) {
                    e.data && 0 == e.data.ReturnCode ? t(!0) : r();
                }, r));
            } catch (e) {
                r();
            }
        }
    },
    checkAuth: function() {
        this.checkLoginStatusFromServer(function() {
            console.log("checkAuth:true");
        });
    },
    login: function(t) {
        var o = e.cwx.getCurrentPage();
        o.navigateTo({
            url: "/pages/accounts/login",
            data: t.param,
            callback: t.callback.bind(o)
        });
    },
    getUserCode: function(e, t) {
        wx.login({
            success: function(e) {
                e.code && "the code is a mock one" != e.code ? t.success && t.success(e.code) : (t.fail && t.fail("获取用户码失败"), 
                console.log("[app-login] :: 微信用户登录返回码错误 > " + (JSON.stringify(e) || "")));
            },
            fail: function(e) {
                t.fail && t.fail("用户登录失败"), console.log("[app-login] :: 微信用户登录失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    logout: function(t) {
        var o = this, n = {
            Ticket: e.cwx.user.auth,
            IsMobile: !0
        };
        try {
            e.cwx.request(c.getRequestObject("10209/LogoutByTicket.json", n, function(e) {
                o.clearAuthStore(), t(!0);
            }, function(e) {
                o.clearAuthStore(), t(!0);
            }));
        } catch (e) {
            o.clearAuthStore(), t(!0);
        }
    },
    clearAuthStore: function() {
        e.cwx.user.auth = "", e.cwx.user.duid = "", e.cwx.user.userName = "", o.FlightBookStore.set({}), 
        t.TrainBookStore.set({});
    }
};

Object.defineProperty(n, "userName", {
    get: function() {
        return wx.getStorageSync("userName");
    },
    set: function(e) {
        try {
            wx.setStorageSync("userName", e);
        } catch (e) {
            console.log(e);
        }
    }
}), Object.defineProperty(n, "auth", {
    get: function() {
        return wx.getStorageSync("auth");
    },
    set: function(e) {
        try {
            wx.setStorageSync("auth", e);
        } catch (e) {
            console.log(e);
        }
    }
}), Object.defineProperty(n, "duid", {
    get: function() {
        return wx.getStorageSync("duid");
    },
    set: function(e) {
        try {
            wx.setStorageSync("duid", e);
        } catch (e) {
            console.log(e);
        }
    }
}), Object.defineProperty(n, "openid", {
    get: function() {
        return wx.getStorageSync("openid");
    },
    set: function(e) {
        try {
            wx.setStorageSync("openid", e);
        } catch (e) {
            console.log(e);
        }
    }
}), module.exports = n;