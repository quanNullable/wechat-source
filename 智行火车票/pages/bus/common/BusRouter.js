var e = require("../../../cwx/cwx.js"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../common/String.js")), n = {
    list: "pages/bus/list/index",
    passenger: "pages/bus/passenger/index",
    book: "pages/bus/book/index",
    orderdetail: "pages/bus/orderdetail/orderdetail",
    cms: "pages/bus/cms/cms"
}, t = {
    navigateTo: function(e, a, r, o) {
        var s = n[e];
        if (s) {
            var c = "/" + s + "?" + i.default.serializeParams(a);
            r ? t.checkLogin(function() {
                t._navigateTo(c, o);
            }) : t._navigateTo(c, o);
        }
    },
    checkLogin: function(i) {
        e.cwx.user.isLogin() ? i(!1) : e.cwx.user.login({
            callback: function(e) {
                e && 0 == e.ReturnCode && i(!0);
            }
        });
    },
    redirectTo: function(e, a, r, o) {
        var s = n[e];
        if (s) {
            var c = "/" + s + "?" + i.default.serializeParams(a);
            r ? t.checkLogin(function() {
                t._redirectTo(c, o);
            }) : t._redirectTo(c, o);
        }
    },
    _redirectTo: function(e, i) {
        i > 5 && (i = 5);
        var n = getCurrentPages();
        if (n.length > i) {
            var a = n.length - 5;
            t._backAndPush(a, e);
        } else wx.redirectTo({
            url: e
        });
    },
    _navigateTo: function(i, n) {
        n || (n = 5), getCurrentPages().length >= n ? t._redirectTo(i, n) : e.cwx.navigateTo({
            url: i
        });
    },
    _backAndPush: function(e, i) {
        var n = this;
        wx.navigateBack({
            delta: e,
            success: function(e) {
                setTimeout(function() {
                    n.showLoading("请稍后...");
                }, 100);
            }
        }), setTimeout(function() {
            n.hideLoading(), wx.navigateTo(i);
        }, 1e3);
    }
};

module.exports = t;