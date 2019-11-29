function e(e, a, t) {
    (a = n(a)).basic_params = s, wx.request({
        url: encodeURI(e),
        method: "POST",
        data: a,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            var a = (e || {}).data || {};
            t.success && t.success(a);
        },
        fail: function(e) {
            t.fail && t.fail(e.errMsg || "请求远程服务失败");
        },
        complete: function(e) {}
    });
}

function a(e, a, t) {
    (a = r(a)).basic_params = s, wx.request({
        url: encodeURI(e),
        method: "POST",
        data: a,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            var a = (e || {}).data || {};
            a.code ? t.success && t.success(a.return) : t.fail && t.fail(a.message || "服务接口调用失败");
        },
        fail: function(e) {
            var a = (e || {}).data || {};
            t.fail && t.fail(a.message || "服务接口调用失败");
        },
        complete: function(e) {}
    });
}

function t(e, a, t) {
    (a = r(a)).basic_params = s, wx.request({
        url: encodeURI(e),
        method: "POST",
        data: a,
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            var a = (e || {}).data || {};
            a.code ? t.success && t.success(a) : t.fail && t.fail(a.message || "服务接口调用失败");
        },
        fail: function(e) {
            var a = (e || {}).data || {};
            t.fail && t.fail(a.message || "服务接口调用失败");
        },
        complete: function(e) {}
    });
}

function n(e) {
    var a = e || {};
    a.head = a.head || {};
    try {
        var t = p.user.auth || "";
        a.head.auth = t;
        var n = p.clientID || "";
        a.head.cid = n;
    } catch (e) {
        console.log("[service-wrapperHead] :: 构造请求 head 信息异常 > " + (JSON.stringify(e) || ""));
    }
    return a;
}

function r(e) {
    var a = e || {};
    a.head = a.head || {};
    try {
        var t = p.user.auth || "";
        a.head.auth = t, a.head.sauth = t;
        var n = p.clientID || "";
        a.head.cid = n;
        var r = JSON.parse(wx.getStorageSync("CTRIP_UBT_M") || "") || {};
        a.head.sid = r.sid || "";
        var i = JSON.parse(wx.getStorageSync("mkt_union") || "") || {};
        a.head.sid = i.sid || "";
    } catch (e) {
        console.log("[service-wrapperHead]1 :: 构造请求 head 信息异常 > " + (JSON.stringify(e) || ""));
    }
    return a;
}

require("../common/common.js");

var p = require("../../../cwx/ext/global.js").cwx, i = require("../common/utils.js"), s = {
    app: "zhixingship",
    big_channel: "wxship",
    small_channel: "1",
    operat_system: "ios",
    big_client_type: "wechatxcx",
    small_client_type: "1",
    client_version: "1.0.0"
}, c = {
    ref: "ctrip.h5",
    partner: "ctrip.app",
    clientType: "wxShip",
    version: "1000"
}, o = {
    domain: "https://m.ctrip.com",
    path: "/restapi/soa2"
}, d = require("account"), h = function(e) {
    return "https://m.ctrip.com" + ("/restapi/ship/app/index.php?param=" + e) + "&ref=ctrip.h5&partner=ctrip.wxShip&clientType=wxShip&version=";
}, u = function(e, a, t, n, r, p) {
    t = t || function() {}, e = h(e), a.basic_params = s, wx.request({
        url: e,
        method: p || "POST",
        data: a,
        success: function(e) {
            200 == e.statusCode && e.data ? 1 == e.data.code ? t(null, e.data || {}) : t(e.data.msg, {}) : t(e.errMsg || e.statusCode, {});
        },
        fail: function(e) {
            t(e.errMsg, {});
        }
    });
}, m = {};

m.getShipLine = function(e, a) {
    u("/api/home & method=wx.getShipLine", e, function(e, t) {
        a(e, t.data);
    });
}, m.getShipList = function(e, a) {
    u("/wxship/list", e, function(e, t) {
        a(e, t.data, t.notice);
    });
}, m.getShipInfo = function(e, a) {
    u("/wxship/shipInfo", e, function(e, t) {
        a(e, t.data);
    });
}, m.getPassengers = function(a, t) {
    e(o.domain + o.path + "/10820/GetCommonPassenger.json", a, t);
}, m.savePassengers = function(a, t) {
    e(o.domain + o.path + "/10820/SaveCommonPassenger.json", a, t);
}, m.updPassengers = function(a, t) {
    e(o.domain + o.path + "/10820/SaveCommonPassenger.json", a, t);
}, m.getOrderDetail = function(e, a) {
    var t = {
        orderId: e
    };
    t = d.appendHead(t), u("h5order_v2/orderDetail", t, function(e, t) {
        a(e, t.data);
    });
}, m.cancelOrder = function(e, a) {
    var t = {
        orderId: e
    };
    t = d.appendHead(t), u("h5order_v2/orderCancel", t, function(e, t) {
        a(e, t.data);
    });
}, m.RefundOrder = function(e, a) {
    var t = {
        orderId: e
    };
    t = d.appendHead(t), u("h5order_v2/orderRefund", t, function(e, t) {
        a(e, t.data);
    });
}, m.addShipOrder = function(e, t) {
    var n = "https://m.ctrip.com/restapi/ship/app/index.php?param=/h5order_v2/createOrder", r = c;
    r.partner = "ctrip.app", a(n = i.AppendParams(n, r), e, t);
}, m.getpayment = function(e, a) {
    var n = "https://m.ctrip.com/restapi/ship/app/index.php?param=/h5order_v2/getPayToken", r = c;
    r.partner = "ctrip.app", t(n = i.AppendParams(n, r), e, a);
}, m.getCoupon = function(e, a) {
    var n = "https://m.ctrip.com/restapi/ship/app/index.php?param=/coupon/getShipCouponList", r = c;
    r.partner = "ctrip.app", t(n = i.AppendParams(n, r), e, a);
}, m.checkCoupon = function(e, a) {
    var n = "https://m.ctrip.com/restapi/ship/app/index.php?param=/coupon/checkCouponCode", r = c;
    r.partner = "ctrip.app", t(n = i.AppendParams(n, r), e, a);
}, m.getairline = function(e, a) {
    var n = "https://m.ctrip.com/restapi/ship/app/index.php?param=/api/home&method=ship.getAirLinesInfo", r = c;
    r.partner = "ctrip.h5", t(n = i.AppendParams(n, r), e, a);
}, m.countrylist = function(e, a) {
    var n = "https://m.ctrip.com/restapi/ship/app/index.php?param=/api/home&method=ship.countryCode", r = c;
    r.partner = "ctrip.h5", t(n = i.AppendParams(n, r), e, a);
}, m.shipPassengers = function(e, a) {
    var n = "https://m.ctrip.com/restapi/ship/app/index.php?param=/api/home&method=user.getPassengerList", r = c;
    r.partner = "ctrip.h5", t(n = i.AppendParams(n, r), e, a);
}, module.exports = m;