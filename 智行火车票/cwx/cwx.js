Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./ext/global.js"), t = e._ = require("../3rd/lodash.core.min.js"), r = e.cwx = function() {
    var t = {
        common: {},
        pay: {},
        train: {},
        home: {},
        flight: {},
        bus: {}
    }, r = Object.create(wx, {
        config: {
            get: function() {
                return require("./cpage/config.js");
            },
            enumerable: !0
        },
        util: {
            value: require("./ext/util.js"),
            enumerable: !0
        },
        request: {
            get: function() {
                return require("./ext/cwx.request.js").request;
            },
            enumerable: !0
        },
        cancel: {
            get: function() {
                return require("./ext/cwx.request.js").cancel;
            },
            enumerable: !0
        },
        locate: {
            get: function() {
                return require("./ext/cwx.locate.js");
            },
            enumerable: !0
        },
        payment: {
            get: function() {
                return require("../pages/pay/common/cpay.js");
            },
            enumerable: !0
        },
        component: {
            get: function() {
                return require("./component/component.js");
            },
            enumerable: !0
        },
        user: {
            get: function() {
                return require("../pages/accounts/user.js");
            },
            enumerable: !0
        },
        passenger: {
            get: function() {
                return require("../pages/passenger/passenger.js");
            },
            enumerable: !0
        },
        mkt: {
            get: function() {
                return require("../pages/market/market.js");
            },
            enumerable: !0
        },
        appId: {
            enumerable: !0,
            value: e.appId
        },
        editPassenger: {
            get: function() {
                return require("../pages/flight/flightPassengerEdit/flightEdit.js");
            },
            enumerable: !0
        },
        chooseFlightPassenger: {
            get: function() {
                return require("../pages/flight/flightPassengerList/flightPassenger.js");
            },
            enumerable: !0
        },
        ABTestingManager: {
            get: function() {
                return require("./ext/cwx.abtesting.js");
            },
            enumerable: !0
        }
    });
    r.getCurrentPage = function() {
        var e, t;
        try {
            e = getCurrentPages(), t = e && e.length ? e[e.length - 1] : null;
        } catch (e) {
            t = getApp().getCurrentPage();
        }
        return t;
    }, Object.keys(t).forEach(function(e) {
        r[e] = t[e];
    });
    var n = wx.getStorageSync("clientID");
    return n ? (r.clientID = n, r.ABTestingManager.fetchABService(n)) : wx.request({
        url: "https://" + e.host + "/restapi/soa2/10290/createclientid",
        method: "POST",
        success: function(e) {
            if (200 == e.statusCode) return r.clientID = e.data.ClientID, wx.setStorage({
                key: "clientID",
                data: e.data.ClientID
            }), void r.ABTestingManager.fetchABService(n);
            r.clientID = "";
        },
        fail: function(e) {
            r.clientID = "";
        }
    }), r.systemCode = "30", r.bookingToDetail = !1, r;
}(), n = e.CPage = require("./cpage/cpage.js");

exports.default = r, exports.__global = e, exports.cwx = r, exports._ = t, exports.CPage = n;