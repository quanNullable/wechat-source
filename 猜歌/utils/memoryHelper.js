var t = {
    getApplication: function() {
        return getApp();
    },
    getAppConfig: function() {
        return getApp().globalData.__appconfig;
    },
    setAppConfig: function(t) {
        getApp().globalData.__appconfig = t;
    },
    getMemory: function(t) {
        return getApp().globalData[t];
    },
    setMemory: function(t, e) {
        getApp().globalData[t] = e;
    },
    saveMemoryUser: function(t) {
        getApp().globalData.__userinfo = t;
    },
    getMemoryUser: function(t) {
        return getApp().globalData.__userinfo;
    },
    getMemoryShareOption: function() {
        return getApp().globalData.__page_share_option;
    },
    saveMemoryShareOption: function(t) {
        getApp().globalData.__page_share_option = t;
    },
    existsLoadUserCallback: function() {
        return "function" == typeof getApp().globalData.__usercallback;
    },
    registerQuestionCallback: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, e = getApp(), a = getCurrentPages(), n = a[a.length - 1];
        e.globalData.__questionId ? t(e.globalData.__questionId, e.globalData.__challegeId) : n.__questioncallback = t;
    },
    triggerQuestionCallback: function(t) {
        var e = getApp();
        getCurrentPages().forEach(function(t) {
            "function" == typeof t.__questioncallback && t.__questioncallback(e.globalData.__questionId, e.globalData.__challegeId);
        });
    },
    registerLoadUserCallback: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, e = getApp(), a = getCurrentPages(), n = a[a.length - 1];
        e.globalData.__userinfo ? t() : n.__usercallback = t;
    },
    triggerUserCallback: function(t) {
        getCurrentPages().forEach(function(e) {
            "function" == typeof e.__usercallback && e.__usercallback(t);
        });
    },
    setQuestion: function(t, e) {
        var a = getApp();
        a.globalData.__questionId = t, a.globalData.__questionNum = t.length, a.globalData.__challegeId = e;
    },
    getQuestionArr: function() {
        return getApp().globalData.__questionId;
    },
    getQuestionNum: function() {
        return getApp().globalData.__questionNum;
    },
    getChallegeId: function() {
        return getApp().globalData.__challegeId;
    },
    setAdvertisement: function(t) {
        getApp().globalData.__advertisement = t;
    },
    getAdvertisement: function() {
        return getApp().globalData.__advertisement || {};
    }
};

module.exports = t;