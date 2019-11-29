var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, e = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : o(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : o(e);
}, t = require("../api/wx.js").navigateTo, n = require("../constants.js").MT_PAY, r = wx.getStorageSync, i = function() {
    return "qa" === r("ENV");
}, u = function() {
    return i() ? "https://stable.pay.test.sankuai.com/i/cashier/show/index" : "https://mpay.meituan.com/i/cashier/show/index";
}, c = function() {
    var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = o.tradeno, t = void 0 === e ? "" : e, n = o.pay_token, i = void 0 === n ? "" : n, u = o.pay_success_url, c = void 0 === u ? "" : u;
    return "?redr_url=&auth=v2&dp_cityid=1&from_dp=0&nb_app=weixin&token=" + ((r("user") || {}).token || "") + "&tradeno=" + t + "&pay_token=" + i + "&pay_success_url=" + encodeURIComponent(encodeURIComponent(c));
};

module.exports = {
    mtpay: function() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new Promise(function(e) {
            var n = "" + u() + c(o);
            t({
                url: "../web-view/web-view?type=DIRECT&redirectUrl=" + encodeURIComponent(n)
            }), e();
        });
    },
    isMtpay: function(o) {
        return "object" === (void 0 === o ? "undefined" : e(o)) ? o.wm_order_pay_channel === n : o === n;
    }
};