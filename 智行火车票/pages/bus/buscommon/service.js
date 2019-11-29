function a(a) {
    var t = a || {};
    t.head = t.head || {};
    try {
        var e = p.cwx.user.auth || "";
        t.head.auth = e;
        var n = wx.getStorageSync("clientID") || "";
        t.head.cid = n;
        var r = JSON.parse(wx.getStorageSync("CTRIP_UBT_M") || "") || {};
        t.head.sid = r.sid || "";
        var i = JSON.parse(wx.getStorageSync("mkt_union") || "") || {};
        t.head.sid = i.sid || "";
    } catch (a) {
        console.log("[service-wrapperHead] :: 构造请求 head 信息异常 > " + (JSON.stringify(a) || ""));
    }
    return t;
}

function t(a, t, e) {
    if (t) t.basic_paramsbasic_params = JSON.stringify(v), a = encodeURI(o.AppendParams(a, t)); else {
        var n = {};
        n.basic_params = JSON.stringify(v), a = encodeURI(o.AppendParams(a, n));
    }
    wx.request({
        url: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            var t = (a || {}).data || {};
            e.success && e.success(t.return);
        },
        fail: function(a) {
            e.fail && e.fail(a.message || "请求远程服务失败");
        },
        complete: function(a) {}
    });
}

function e(t, e, n) {
    (e = a(e)).basic_params = JSON.stringify(v), e.gs_debug = "1", wx.request({
        url: encodeURI(t),
        method: "POST",
        data: e,
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            var t = (a || {}).data || {};
            t.code ? n.success && n.success(t.return) : "relogin" == t.nextAction ? n.fail && n.fail("wx重新调用该接口") : n.fail && n.fail(t.message || "服务接口调用失败");
        },
        fail: function(a) {
            var t = (a || {}).data || {};
            n.fail && n.fail(t.message || "服务接口调用失败");
        },
        complete: function(a) {}
    });
}

function n(t, e, n) {
    (e = a(e)).basic_params = JSON.stringify(v), wx.request({
        url: encodeURI(t),
        method: "POST",
        data: e,
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            var t = (a || {}).data || {};
            n.success && n.success(t);
        },
        fail: function(a) {
            n.fail && n.fail(a.errMsg || "请求远程服务失败");
        },
        complete: function(a) {}
    });
}

function r(t, e, n) {
    (e = a(e)).basic_params = JSON.stringify(v), wx.request({
        url: encodeURI(t),
        method: "POST",
        data: e,
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            var t = (a || {}).data || {};
            0 == t.code ? n.success && n.success(t) : n.fail && n.fail(t.msg || "请求远程服务失败");
        },
        fail: function(a) {
            n.fail && n.fail(a || "请求远程服务失败");
        },
        complete: function(a) {}
    });
}

function i(t, e, n) {
    (e = a(e)).basic_params = JSON.stringify(v), wx.request({
        url: encodeURI(t),
        method: "POST",
        data: e,
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            var t = (a || {}).data || {};
            n.success && n.success(t);
        },
        fail: function(a) {
            n.fail && n.fail(a || "请求远程服务失败");
        },
        complete: function(a) {}
    });
}

var p = require("../../../cwx/cwx.js"), o = require("utils.js"), s = {
    domain: "https://m.ctrip.com",
    path: "/restapi/busphp/app/index.php?param=/api/home"
}, c = {
    domain: "https://m.ctrip.com",
    path: "/restapi/buscommon/index.php?param=/api/home"
}, d = {
    domain: "https://m.ctrip.com",
    path: "/restapi/soa2"
}, m = {
    domain: "https://m.ctrip.com",
    path: "/restapi/busphp/h5service/index.php?param=/api/home"
}, u = {
    domain: "https://accounts.ctrip.com",
    path: "/restapi/soa2"
}, h = {
    domain: "https://m.ctrip.com",
    path: "/restapi/pointbus/index.php?param=/api/home"
}, f = {
    domain: "https://m.ctrip.com",
    path: "/restapi/airbus/index.php?param=/api/home"
}, g = {
    domain: "https://m.ctrip.com",
    path: "/air-bus-trade"
}, l = {
    ref: "ctrip.h5",
    partner: "ctrip.app",
    clientType: "wx",
    version: "1"
}, v = {
    app: "zhixing",
    big_channel: "train",
    small_channel: "ZXI",
    operat_system: "ios",
    big_client_type: "wechatxcx",
    small_client_type: "",
    client_version: "1.0.0"
};

module.exports = {
    getFromStations: function(a, e) {
        var n = s.domain + s.path + "&method=product.getCascadingFromCityList", r = l;
        r.partner = "ctrip.app", t(n = o.AppendParams(n, r), a, e);
    },
    getToStations: function(a, e) {
        var n = s.domain + s.path + "&method=product.getToCityList", r = l;
        r.partner = "ctrip.app", t(n = o.AppendParams(n, r), a, e);
    },
    getBusLines: function(a, t) {
        var n = m.domain + m.path + "&method=product.getBusListPage&v=1.0", r = l;
        r.partner = "ctrip.h5", n = o.AppendParams(n, r), console.log(n), e(n, a, t);
    },
    getBusLine: function(a, t) {
        var n = s.domain + s.path + "&method=product.getBusFillInfo&v=1.1", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    getTourBusLine: function(a, t) {
        var n = h.domain + h.path + "&method=product.pointBusDetail&v=1.0", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    getAirBusLine: function(a, t) {
        var n = f.domain + f.path + "&method=airbus.getAirBusLine&v=1.0", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    getTicketService: function(a, t) {
        var n = c.domain + c.path + "&method=copy.getBusServiceCopy", r = l;
        r.partner = "ctrip.wx", e(n = o.AppendParams(n, r), a, t);
    },
    getBusOrders: function(a, t) {
        n(d.domain + d.path + "/10098/GetOrdersSearch.json", a, t);
    },
    getPassengers: function(a, t) {
        n(d.domain + d.path + "/10820/GetCommonPassenger.json", a, t);
    },
    savePassengers: function(a, t) {
        n(d.domain + d.path + "/10820/SaveCommonPassenger.json", a, t);
    },
    updPassengers: function(a, t) {
        n(d.domain + d.path + "/10820/SaveCommonPassenger.json", a, t);
    },
    checkBookable: function(a, t) {
        var n = s.domain + s.path + "&method=product.checkBook&v=1.0", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    checkTourBookable: function(a, t) {
        var n = h.domain + h.path + "&method=product.checkPointBus&v=1.0", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    addBusOrder: function(a, t) {
        var n = s.domain + s.path + "&method=order.addOrder&v=1.0", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    addTourbusOrder: function(a, t) {
        var n = h.domain + h.path + "&method=order.addPointOrder&v=1.0", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    addAirbusOrder: function(a, t) {
        var e = g.domain + g.path + "/order/addOrder", n = l;
        n.partner = "ctrip.app", r(e = o.AppendParams(e, n), a, t);
    },
    getPaymentId: function(a, t) {
        n("https://gateway.secure.ctrip.com" + d.path + "/10064/json/GetPaymentRequestId", a, t);
    },
    getPaymentData: function(a, t) {
        var n = c.domain + c.path + "&method=pay.getWeixinPayParams", r = l;
        r.partner = "ctrip.wx", e(n = o.AppendParams(n, r), a, t);
    },
    getAirbusPayment: function(a, t) {
        var e = g.domain + g.path + "/weChat/getPayParams", n = l;
        n.partner = "ctrip.wx", r(e = o.AppendParams(e, n), a, t);
    },
    getOrder: function(a, t) {
        var n = s.domain + s.path + "&method=order.detail&v=1.0", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    getAirbusOrder: function(a, t) {
        var e = g.domain + g.path + "/order/detail", n = l;
        n.partner = "ctrip.app", i(e = o.AppendParams(e, n), a, t);
    },
    cancelOrder: function(a, t) {
        var n = s.domain + s.path + "&method=order.cancelOrder", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    refundOrder: function(a, t) {
        var n = s.domain + s.path + "&method=order.refundTicket&v=1.0", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    getCouponList: function(a, t) {
        var n = c.domain + c.path + "&method=coupon.getUserAvailableCoupon", r = l;
        r.partner = "ctrip.app", e(n = o.AppendParams(n, r), a, t);
    },
    LoginAccount: function(a, t) {
        n(u.domain + u.path + "/10209/ThirdPartBindAndLogin.json", a, t);
    },
    SendMessage: function(a, t) {
        n(d.domain + d.path + "/10261/SendMessageByPhone.json", a, t);
    },
    LoginDynamic: function(a, t) {
        n(d.domain + d.path + "/10209/LoginValidate.json", a, t);
    },
    LogOut: function(a, t) {
        n(d.domain + d.path + "/10209/LogoutByTicket.json", a, t);
    }
};