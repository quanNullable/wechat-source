var e = require("../utils/apiCaller.js"), i = (require("../utils/common.js"), require("../config/apiurl.js"));

require("../utils/cacheHepler.js"), require("../utils/memoryHelper.js"), require("../config/appsetting.js"), 
require("../utils/md5.js");

module.exports = {
    getProfile: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
        wx.login({
            success: function(s) {
                (0, e.post)(i.profile.index, {
                    data: {},
                    success: r
                });
            }
        });
    },
    updateProfile: function(r) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, e.post)(i.profile.update, {
            data: r,
            success: s
        });
    }
};