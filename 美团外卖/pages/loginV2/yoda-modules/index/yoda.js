Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../utils/config.js"), t = new (function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/api.js")).default)();

exports.default = function(s) {
    var a = s.requestCode, o = s.success, i = s.fail, n = s.style, u = s.options;
    t.getPageData(a).then(function(t) {
        var s = t.status, a = t.data;
        t.error, 0 === s && wx.showToast({
            title: "系统异常",
            complete: function() {
                "function" == typeof i && i(), "string" == typeof i && wx.navigateTo({
                    url: i
                });
            }
        });
        var l = a.riskLevel.split("|"), r = l[0].split(","), d = r.length > 1 ? 1 : 0;
        (l.length > 0 || d) && (a.type = r[0]), a.success = o, a.fail = i, a.style = n || "", 
        a.options = u, wx.setStorage({
            key: "yodaPageData",
            data: a
        }), e.embedModule[r[0]] && u && u.embed || wx.navigateTo({
            url: "/pages/loginV2/yoda-modules/index/index"
        });
    });
};