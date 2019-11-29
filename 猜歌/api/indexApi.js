var e = require("../utils/apiCaller.js"), i = require("../utils/common.js"), t = require("../config/apiurl.js"), s = (require("../utils/cacheHepler.js"), 
require("../utils/memoryHelper.js")), r = require("../config/appsetting.js"), u = require("../utils/md5.js");

module.exports = {
    getHomeData: function() {
        var u = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, a = ((0, 
        i.getTimestamp)(), (0, s.getMemoryUser)());
        (0, s.getAppConfig)();
        (0, e.post)(t.index.index, {
            data: {
                libVersion: r.libVersion,
                user_id: a
            },
            success: u
        });
    },
    getRule: function() {
        var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, r = (0, 
        i.getTimestamp)(), a = "timestamp:" + r;
        (0, e.caller)(t.index.rule, {
            data: {
                sign: u.md5(a),
                timestamp: r
            },
            success: s
        });
    },
    startGame: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, a = (0, 
        i.getTimestamp)(), n = (0, s.getMemoryUser)(), m = "timestamp:" + a + "user_id:" + n;
        (0, e.post)(t.index.start, {
            data: {
                user_id: n,
                sign: u.md5(m),
                timestamp: a
            },
            success: r
        });
    }
};