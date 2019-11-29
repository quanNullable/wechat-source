var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./npm/@analytics/wechat-sdk/lib/index.js")), r = require("./actions/extradata.js"), n = require("./weapp-redux/index.js").Provider, t = require("./store.js"), i = require("./utils/event-bus.js"), a = require("./utils/filter-conditions-manager.js").clear, o = require("./utils/quick-filter-manager.js").clear, s = require("./api/analytics.js"), u = require("./utils/unify-uuid.js"), c = require("./constants.js").VERSION, f = require("./npm/@hfe/mp-owl/lib/index.js"), l = f.app, d = new (0, 
f.Owl)({
    project: "takeaway-waimai-wxapp",
    env: "pro",
    wxAppVersion: c
});

l(n(t)({
    onLaunch: function(r) {
        r = r || {}, s.setEnv("lch", r.scene || "wx"), e.default.setUTM(r);
        var n = new i();
        this.eventBus = n, n.on("user:logout", a), n.on("user:login", a), n.on("location:changed", function() {
            a(), o();
        }), s.init(), u(s, function(e) {
            d.config && (d.config.unionId = e);
        });
        try {
            var t = r.scene;
            wx.setStorageSync("wx_scene", t);
        } catch (r) {
            console.log(r);
        }
        wx.getStorage({
            key: "user",
            success: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (e) {
                    var r = e.data, n = void 0 === r ? {} : r;
                    s.setEnv("uid", n && n.user_id ? n.user_id : 0), s.setEnv("wxid", n && n.open_id ? n.open_id : "");
                }
            }
        });
    },
    onError: function(e) {
        console.error("App.onError: " + e);
    },
    onHide: function() {
        e.default.quit();
    },
    onShow: function(n) {
        e.default.start({}), e.default.setUTM(n), n && n.referrerInfo && n.referrerInfo.extraData && ("string" == typeof n.referrerInfo.extraData && (n.referrerInfo.extraData = JSON.parse(n.referrerInfo.extraData)), 
        t.dispatch((0, r.set)({
            extra: n.referrerInfo.extraData
        })));
        try {
            wx.setStorageSync("wx_scene", n.scene);
        } catch (n) {
            console.log(n);
        }
    }
}));