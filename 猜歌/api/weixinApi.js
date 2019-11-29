var t = require("../utils/apiCaller.js");

module.exports = {
    getAccessToken: function(e) {
        var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, t.caller)("wechat/accesstoken", {
            success: c,
            fail: function(t) {
                console.log("getUserInfo fail", t);
            }
        });
    },
    getAuthorization: function(e) {
        var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, t.caller)("wechat/authorization", {
            data: e,
            success: c
        });
    },
    getRemoteUser: function(e) {
        var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, t.post)("wechat/mini", {
            data: e,
            success: c,
            fail: function(t) {
                console.log("getUserInfo fail", t);
            }
        });
    },
    decryptData: function(e) {
        var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, t.post)("wechat/decrypt", {
            data: e,
            success: c
        });
    }
};