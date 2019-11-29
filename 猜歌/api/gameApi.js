var e = require("../utils/apiCaller.js"), i = require("../utils/common.js"), t = require("../config/apiurl.js"), s = (require("../utils/cacheHepler.js"), 
require("../utils/memoryHelper.js")), a = require("../config/appsetting.js");

require("../utils/md5.js");

module.exports = {
    getGameLevel: function() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
        (0, e.post)(t.game.level, {
            success: i
        });
    },
    addGold: function() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
        (0, e.post)(t.game.gold, {
            data: i,
            success: s
        });
    },
    addGameSkip: function() {
        (0, i.getTimestamp)();
        var n = (0, s.getMemoryUser)();
        (0, s.getAppConfig)();
        (0, e.post)(t.game.gamedata, {
            data: {
                libVersion: a.libVersion,
                action: "game_skip",
                user_id: n
            },
            success: success
        });
    },
    getGameData: function(i) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
        (0, e.post)(t.game.gamedata, {
            data: {
                level_id: i.level,
                level: i.level
            },
            success: s,
            fail: a
        });
    },
    finishGame: function(i) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
        (0, e.post)(t.game.gameend, {
            data: i,
            success: s,
            fail: a
        });
    }
};