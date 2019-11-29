var e = require("../../npm/@hfe/mp-owl/lib/index.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./login-api.js")), i = require("../../utils/mix.js"), a = require("../base.js"), o = {
    pageName: "login",
    data: {},
    login_page: 0,
    getReportData: function() {
        return {
            cid: "c_inwfwgvo",
            val: {
                custom: {
                    login_page: this.login_page
                }
            }
        };
    },
    onLoad: function(e) {
        var t = e.login_page, i = e.afterLoginAction;
        this.login_page = t ? parseInt(t, 10) : 0, this.loading(!1), this.initLoginSDK({
            type: 0,
            afterLoginAction: i
        });
    },
    onShow: function() {
        var e = getApp(), t = e.yodaVerifyData, i = e.afterLoginAction;
        if (e.yodaVerifyData = "", this.nextTap = !1, t && !i) {
            var a = t.status, o = t.requestCode, n = t.responseCode, s = t.code, r = t.msg;
            this.setData({
                pageState: "0"
            }), "1" !== a && "0" !== a || this.getLoginStatus({
                status: a,
                requestCode: o,
                responseCode: n,
                code: s,
                msg: r
            });
        }
    }
};

(0, e.page)(i(o, a, t.default));