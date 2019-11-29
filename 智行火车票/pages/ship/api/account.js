var e = require("../common/common"), n = require("../../../cwx/ext/global.js").cwx, o = function(e) {
    return "https://m.ctrip.com" + ("/restapi/soa2" + e);
}, t = function(e) {
    var o = {
        cid: "",
        ctok: "",
        lang: "01",
        sid: "8888",
        syscode: "09",
        auth: n.user.auth || ""
    };
    return e.head = o, e;
}, s = function(n, o, t, s, i, u) {
    t = t || function() {}, s = s || "", e.showLoading(s), wx.request({
        url: n,
        method: u || "GET",
        data: o,
        success: function(n) {
            e.hideLoading(), 200 == n.statusCode && n.data ? t(null, n.data) : t(n.errMsg || n.statusCode, {});
        },
        fail: function(n) {
            e.hideLoading(), t(n.errMsg, {});
        }
    });
}, i = {};

i.appendHead = t, i.sendMobileCode = function(e, n) {
    var t = o("/10261/SendMessageByPhone.json");
    s(t, {
        CountryCode: "86",
        MobilePhone: e,
        sendScene: "RegistCode",
        CheckMobilePhoneNumber: "NoCheck",
        Context: {
            clientID: "",
            Version: "1.0",
            Url: "accounts/login.wxml",
            Platform: "WECHAT_SHIP",
            page_id: ""
        }
    }, function(e, o) {
        o && 0 == o.ReturnCode ? n(null, o) : n(e || o.Message);
    }, "发送短信中");
}, i.dynamicLogin = function(e, n, t) {
    var i = o("/10209/LoginValidate.json");
    s(i, {
        LoginName: e,
        AuthenticateCode: n,
        LoginType: "MobileQuickLogin",
        LoginEntrance: "Other",
        LoginWay: "App",
        AutoLogin: !1,
        Context: {
            clientID: "",
            Version: "1.0",
            Url: "accounts/login.wxml",
            Platform: "WECHAT_SHIP",
            SourceID: "",
            page_id: ""
        }
    }, function(e, n) {
        n && 0 == n.ReturnCode ? t(null, n) : t(e || n.Message);
    }, "登录中");
}, i.logoutByTicket = function(e, n) {
    var t = o("/10209/LogoutByTicket.json");
    s(t, {
        Ticket: e,
        IsMobile: !0
    }, function(e, o) {
        o && 0 == o.ReturnCode ? n(null, o) : n(e || o.Message);
    });
}, i.getOrderList = function(e, n) {
    var i = o("/10098/GetOrdersSearch.json"), u = {
        Channel: "WX",
        ClientVersion: "7.1",
        PageSize: 15,
        BizTypes: "Ship",
        OrderStatusClassify: "All",
        PageIndex: e || 1
    };
    u = t(u);
    s(i, u, function(e, o) {
        o && o.Result && 0 == o.Result.ResultCode ? n(null, o.OrderEnities) : n(e || o.ResultMsg);
    }, "", 0, "POST");
}, i.getCommonPassenger = function(e) {
    var n = o("/10820/GetCommonPassenger.json"), i = {
        Parameters: [ {
            Key: "BizType",
            Value: "SHIP"
        }, {
            Key: "BookingType",
            Value: "B"
        } ],
        UID: null
    };
    i = t(i);
    s(n, i, function(n, o) {
        o && o.Result && 0 == o.Result.Result ? e(null, o.CommonPassengers) : e(n || o.Result.ErrMessage);
    }, "", 0, "POST");
}, module.exports = i;