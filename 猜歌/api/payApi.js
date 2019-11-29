function e(e, s, i) {
    return s in e ? Object.defineProperty(e, s, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[s] = i, e;
}

var s = Object.assign || function(e) {
    for (var s = 1; s < arguments.length; s++) {
        var i = arguments[s];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
    }
    return e;
}, i = require("../utils/apiCaller.js"), n = require("../utils/common.js"), u = require("../utils/message.js"), t = require("../config/globalenum.js"), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/cache.js"));

module.exports = {
    businessPay: function(c, r) {
        var o, l = a.default.getLocalUser(), d = (o = {}, e(o, t.BUSINESS_TYPE.COURSE, {
            courseid: c.businessId
        }), e(o, t.BUSINESS_TYPE.MEMBER, {
            cost: c.money
        }), o), f = s({
            openid: l.openid,
            paytype: c.paytype || t.PAY_TYPE.WEIXIN,
            type: c.businessType,
            businessid: c.businessId,
            pwd: c.pwd
        }, d[c.businessType]);
        f.paytype == t.PAY_TYPE.WALLET ? (0, i.post)("api/pay/balance", {
            data: f,
            success: function(e) {
                e.successed ? (0, n.isFunction)(r.success) && r.success(e) : (0, n.isFunction)(r.fail) && r.fail(e);
            },
            fail: function(e) {
                (0, n.isFunction)(r.fail) && r.fail(e);
            }
        }) : (0, i.post)("wechat/mini/pay", {
            data: f,
            success: function(e) {
                if (e.successed) {
                    var s = e.data, i = "", t = Object.assign({}, {
                        success: function(e) {
                            e.errMsg.indexOf("ok") > 0 && ((0, n.isFunction)(r.success) ? r.success(e) : (i = 0 == c.otype ? "/pages/order/detail?id=" + c.businessId : "/pages/order/receive?fromType=1&id=" + c.businessId, 
                            wx.redirectTo({
                                url: i
                            })));
                        },
                        fail: function(e) {
                            (0, n.isFunction)(r.fail) ? r.fail(e) : (e.errMsg.indexOf("cancel") > 0 ? i = "/pages/order/detail?id=" + c.businessId : c.businessId, 
                            wx.redirectTo({
                                url: i
                            }));
                        },
                        complete: function(e) {
                            (0, u.hideLoading)();
                        }
                    }, s);
                    wx.requestPayment(t);
                } else (0, n.isFunction)(r.fail) && r.fail(e);
            }
        });
    }
};