var e = require("../utils/apiCaller.js"), i = (require("../utils/common.js"), require("../config/apiurl.js"));

require("../utils/cacheHepler.js"), require("../utils/memoryHelper.js"), require("../config/appsetting.js"), 
require("../utils/md5.js");

module.exports = {
    addFavorite: function(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, e.post)(i.favorite.add, {
            data: r,
            success: t
        });
    },
    getFavorite: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
        (0, e.post)(i.favorite.list, {
            success: r
        });
    },
    removeFavorite: function(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, e.post)(i.favorite.remove, {
            data: r,
            success: t
        });
    }
};