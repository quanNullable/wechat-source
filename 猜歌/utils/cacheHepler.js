var e = {
    setCache: function(e, n) {
        try {
            wx.setStorageSync(e, n);
        } catch (e) {
            console.log("cache push error ", e);
        }
    },
    getCache: function(e) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, t = wx.getStorageSync(e);
        return null != t && 0 != t.length || null != (t = n) ? t : null;
    },
    getLocalUser: function() {
        return e.getCache("__userinfo", !0);
    },
    saveLocalUser: function(n) {
        e.setCache("__userinfo", n);
    },
    saveBootscreen: function(n) {
        return e.setCache("__bootscreen", n);
    },
    getBootscreen: function() {
        return e.getCache("__bootscreen");
    },
    saveCurrentSeason: function(n) {
        return e.setCache("__current_season", n);
    },
    getCurrentSeason: function() {
        return e.getCache("__current_season");
    }
};

module.exports = e;