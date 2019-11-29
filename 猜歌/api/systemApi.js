var e = require("../utils/apiCaller.js"), i = (require("../utils/common.js"), require("../config/apiurl.js")), t = (require("../utils/cacheHepler.js"), 
require("../utils/memoryHelper.js")), r = require("../config/appsetting.js");

require("../utils/md5.js");

module.exports = {
    userLogin: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
        wx.login({
            success: function(e) {
                function i(i) {
                    return e.apply(this, arguments);
                }
                return i.toString = function() {
                    return e.toString();
                }, i;
            }(function(s) {
                (0, e.post)(i.system.login, {
                    data: {
                        code: s.code,
                        libVersion: r.libVersion,
                        action: "login"
                    },
                    success: function(e) {
                        function i(i) {
                            return e.apply(this, arguments);
                        }
                        return i.toString = function() {
                            return e.toString();
                        }, i;
                    }(function(e) {
                        (0, t.saveMemoryUser)(e.data.user_id), n();
                    })
                });
            })
        });
    },
    moregames: function(n) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var s = (0, t.getMemoryUser)(), o = (0, t.getAppConfig)();
        (0, e.post)(i.system.addlog, {
            data: {
                secretkey: o.secretkey,
                libVersion: r.libVersion,
                action: "count_jump",
                app_id: n.appid,
                user_id: s
            }
        });
    },
    addFormId: function(t) {
        (0, e.post)(i.system.addformid, {
            data: {
                formid: t,
                type: 1
            }
        });
    },
    getConfig: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, s = (0, 
        t.getMemoryUser)();
        (0, e.post)(i.system.config, {
            data: {
                libVersion: r.libVersion,
                action: "initialize",
                user_id: s
            },
            success: n
        });
    },
    addUrlJump: function() {
        var n = (0, t.getMemoryUser)();
        (0, e.post)(i.system.config, {
            data: {
                param_url: "../txtpage/txtpage",
                libVersion: r.libVersion,
                action: "url_jump",
                user_id: n
            },
            success: success
        });
    }
};