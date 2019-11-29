var e = require("./cwx/cwx.js"), n = require("./pages/accounts/common.js");

App({
    onLaunch: function(c) {
        function o(c) {
            wx.request(n.getRequestObjectV1("wxUserApi/getOpenId", c, function(n) {
                console.log(n), n && n.data && 200 == n.statusCode && (e.cwx.user.openid = n.data);
            }, function(e) {}));
        }
        c && c.scene && (e.cwx.scene = c.scene), e.cwx.user.openid || wx.login({
            success: function(n) {
                n.code && "the code is a mock one" != n.code && (console.log("code:" + n.code), 
                wx.getUserInfo({
                    success: function(c) {
                        c.encryptedData;
                        o({
                            Channel: e.cwx.config.channel3,
                            RequestToken: n.code,
                            EncryptData: c.encryptedData,
                            IV: c.iv
                        });
                    },
                    fail: function(c) {
                        console.log("获取GetuserInfo失败"), o({
                            Channel: e.cwx.config.channel3,
                            RequestToken: n.code
                        });
                    }
                }));
            },
            fail: function(e) {
                console.log("获取code失败");
            }
        });
    },
    onShow: function(n) {
        n && n.scene && (e.cwx.scene = n.scene, e.cwx.options = n);
    }
});