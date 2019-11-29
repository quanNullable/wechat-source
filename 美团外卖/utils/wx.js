var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
}, o = require("../npm/@hfe/mp-owl/lib/index.js"), r = require("../npm/promise-polyfill/promise.js"), n = require("./promisify.js").obj, i = require("./param.js"), a = require("./object-assign.js"), s = require("./starts-with.js"), u = require("./deal-region-set.js").responseHeaderSet, c = n(o.request), f = function(e) {
    var o = e.data;
    return o && "object" === (void 0 === o ? "undefined" : t(o)) && (e.data = i(o), 
    e.header = a(e.header || {}, {
        "content-type": "application/x-www-form-urlencoded"
    })), c(e);
}, m = n(wx.getStorage), d = n(wx.setStorage), y = {
    getItem: function(e) {
        return m({
            key: e
        });
    },
    setItem: function(e, t) {
        return d({
            key: e,
            data: t
        });
    }
}, l = [ "getUserInfo", "getLocation", "login", "getSystemInfo", "setNavigationBarTitle", "showNavigationBarLoading", "hideNavigationBarLoading", "navigateTo", "redirectTo", "reLaunch", "navigateBack", "getNetworkType", "makePhoneCall", "showLoading", "hideLoading" ];

module.exports = l.reduce(function(e, t) {
    return e[t] = n(wx[t]), e;
}, {
    request: f,
    requestJSON: function(e) {
        return f(e).then(function(e) {
            var t = e.statusCode, o = e.errMsg, r = e.data, n = e.header;
            if (n.X_RegionInfo && u(n), "200" !== String(t)) {
                var i = "Status code not 200[" + t + "]: " + o;
                throw {
                    code: -t,
                    data: r,
                    msg: i,
                    message: i
                };
            }
            return r;
        }).catch(function(e) {
            throw e.msg = "网络异常，请重试", e.message = "网络异常，请重试", e;
        });
    },
    storage: y,
    requestPayment: function(e) {
        return new r(function(t, o) {
            e.success = t;
            var r = function(e) {
                var t = e.errMsg, r = t;
                s(t, "requestPayment:fail") && (r = -1 === t.indexOf("cancel") ? "调起支付失败, 请稍后重试吧" : "您已取消支付"), 
                e.message = r, o(e);
            };
            e.fail = r, e.complete = r, wx.requestPayment(e);
        });
    }
});