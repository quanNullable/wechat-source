var e = require("../utils/apiCaller.js"), r = (require("../utils/common.js"), require("../config/apiurl.js"));

require("../utils/cacheHepler.js"), require("../utils/memoryHelper.js"), require("../config/appsetting.js"), 
require("../utils/md5.js");

module.exports = {
    getTop: function() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
        (0, e.post)(r.rank.top, {
            data: {},
            success: i
        });
    }
};