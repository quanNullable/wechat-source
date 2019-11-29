var e = require("../utils/apiCaller.js"), t = require("../utils/common.js"), i = require("../config/apiurl.js"), a = (require("../utils/cacheHepler.js"), 
require("../utils/memoryHelper.js")), r = require("../config/appsetting.js"), s = require("../config/globalenum.js");

require("../utils/md5.js");

module.exports = {
    getIndex: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, d = (0, 
        a.getAdvertisement)();
        (0, t.isEmpty)(d) ? (0, e.adGet)(i.ad.index, {
            data: {
                appid: r.appId
            },
            success: function(e) {
                d = {
                    moreGames: e.data.app_link_list,
                    gameAd: e.data.advertisement_list.filter(function(e) {
                        return e.position_type == s.AD_TYPE.GAME_PAGE;
                    }),
                    floatAd: e.data.advertisement_list.filter(function(e) {
                        return e.position_type == s.AD_TYPE.INDEX_FLOAT;
                    }),
                    bannerAd: e.data.advertisement_list.filter(function(e) {
                        return e.position_type == s.AD_TYPE.INDEX_BANNER;
                    })
                }, (0, a.setAdvertisement)(d), n(d);
            }
        }) : n(d);
    },
    addStatistics: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, e.adGet)(i.ad.statistics, {
            data: {
                to_id: t,
                appid: r.appId,
                from_id: r.appId
            },
            success: a
        });
    },
    getMore: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
        (0, e.adGet)(i.ad.more, {
            data: {
                appid: r.appId
            },
            success: t
        });
    }
};