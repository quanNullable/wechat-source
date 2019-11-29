function a(a, t, n) {
    try {
        var r = a.data || {};
        c.exceptionInfoCollect({
            bustype: r.bustype || "",
            excode: "c_e_c03",
            extype: 1,
            exdesc: "订单号为：" + r.oid + t + "token:" + r.token + ";extend:" + r.extend + ";oid:" + r.oid + ";错误信息为:" + JSON.stringify(n),
            head: {
                auth: e.cwx.user.auth
            }
        });
    } catch (a) {}
}

var e = require("../../../cwx/cwx.js"), c = require("business.js"), t = {}, n = function() {
    return {
        data: {},
        sbackCallback: function() {},
        fromCallback: function() {},
        ebackCallback: function() {},
        env: "pro"
    };
}, r = function(c) {
    var t = c.rbackCallback && e._.isFunction(c.rbackCallback), n = e.cwx.getCurrentPage();
    c.data.isHasRback = t, n.navigateTo({
        url: "/pages/pay/index/index",
        data: c.data,
        callback: function(a) {
            if (a && a.type) switch (a.type) {
              case "sback":
                c.sbackCallback(a.data);
                break;

              case "rback":
                t && c.rbackCallback(a.data);
                break;

              case "eback":
                c.ebackCallback(a.data);
                break;

              default:
                c.fromCallback();
            }
        },
        success: function(a) {},
        fail: function(e) {
            a(c, "Bu跳转支付页面，navigator方法报错", e);
        },
        complete: function(e) {
            e && e.errorCode && 500 == e.errorCode && a(c, "页面层级超过5层，errorinfo : " + JSON.stringify(e), e);
        }
    });
};

t.callPay = function(a) {
    r(e._.extend(n(), a || {}));
}, module.exports = t;