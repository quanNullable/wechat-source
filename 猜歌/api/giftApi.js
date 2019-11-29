var e = require("../utils/apiCaller.js"), i = (require("../utils/common.js"), require("../config/apiurl.js"));

require("../utils/cacheHepler.js"), require("../utils/memoryHelper.js"), require("../config/appsetting.js"), 
require("../config/globalenum.js"), require("../utils/md5.js");

module.exports = {
    getPrize: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
        (0, e.post)(i.gift.prize, {
            data: {},
            success: r
        });
    },
    receive: function(r) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
        (0, e.post)(i.gift.receive, {
            data: r,
            success: s,
            fail: t
        });
    }
};