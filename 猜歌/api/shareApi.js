var e = require("../utils/apiCaller.js"), r = require("../utils/common.js"), i = require("../config/apiurl.js"), s = (require("../utils/cacheHepler.js"), 
require("../utils/memoryHelper.js")), t = require("../config/appsetting.js");

require("../utils/md5.js");

module.exports = {
    addShare: function(a) {
        var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, n = ((0, 
        r.getTimestamp)(), (0, s.getMemoryUser)()), o = (0, s.getAppConfig)();
        a.iv ? (0, e.post)(i.share.share, {
            data: {
                secretkey: o.secretkey,
                libVersion: t.libVersion,
                action: "update_game_number",
                user_id: n,
                encryptedData: a.encryptedData,
                iv: a.iv
            },
            success: u
        }) : (0, e.post)(i.share.share, {
            data: {
                libVersion: t.libVersion,
                action: "update_game_number2",
                user_id: n
            },
            success: u
        });
    }
};