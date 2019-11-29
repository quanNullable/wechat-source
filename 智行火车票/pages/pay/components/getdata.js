var t = require("../../../cwx/cwx.js"), r = require("../models/stores.js"), e = r.OrderDetailStore(), o = (r.OrderDetailExtendStore(), 
require("../common/util.js"));

module.exports = {
    getData: function(r) {
        var a = this, n = a.originalOrderDetailData, i = decodeURIComponent(n.token || ""), l = null, u = {}, s = 0, m = "系统异常，请重新提交订单(1001)";
        try {
            if (!((l = t.cwx.util.base64Decode(i)).length > 0)) return;
            (i = JSON.parse(l)).oid && (i.oid += "");
            for (var c in i) {
                var d = i[c];
                d && t._.isString(d) && (d = d.replace(/(^\s*)|(\s*$)/g, "")), u[c] = d;
            }
            u.totalamount = u.amount, u.origamount = u.amount;
        } catch (t) {
            s = 1;
        }
        if (!s) {
            if (!u.oid || !u.title || !u.amount) return u.amount || 0 != u.amount || (m = "系统异常，请重新提交订单(1005)"), 
            u.oid || (m = "系统异常，请重新提交订单(1006)"), u.title || (m = "系统异常，请重新提交订单(1013)"), void a.modalConfirm(m, function() {
                if ("function" == typeof a.settings.fromCallback) return a.settings.fromCallback.call(a, {
                    msg: m
                });
            });
            e.set(u);
            var f = o.transNumToFixedArray(u.amount || 0), g = u.currency || "￥";
            "CNY" == g && (g = "￥");
            var D = g + f.join(".");
            return a.data.payData = {
                orderDetail: u,
                orderDetailInfo: {
                    currAmount: D
                }
            }, r();
        }
        a.modalConfirm(m, function() {
            if ("function" == typeof a.settings.fromCallback) return a.settings.fromCallback.call(a, {
                msg: m
            });
        });
    }
};