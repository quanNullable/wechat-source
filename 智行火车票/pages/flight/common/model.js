function e(e) {
    var i = e.port, a = e.path, s = o + i + "/json/" + a, n = function() {};
    return function(e, o, i) {
        var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : n, l = t.cwx.user && t.cwx.user.duid ? t.cwx.user.duid : "";
        e.head = {
            sid: "4505",
            cver: "606.000",
            extension: [ {
                name: "platform",
                value: t.cwx.config.platform
            }, {
                name: "reqTime",
                value: parseInt(new Date().getTime() / 1e3)
            }, {
                name: "clientInfo",
                value: t.cwx.config.clientInfo
            }, {
                name: "deviceId",
                value: l
            }, {
                name: "partner",
                value: t.cwx.config.partner
            }, {
                name: "channel",
                value: t.cwx.config.channel
            }, {
                name: "sign",
                value: "ok"
            } ]
        }, console.log("请求的url：", s), console.log("请求的参数：", e), t.cwx.request({
            url: s,
            data: e,
            success: function(e) {
                if (e.data.ResponseStatus && e.data.ResponseStatus.Ack && "Failure" == e.data.ResponseStatus.Ack) {
                    var t = e.data.ResponseStatus.Errors;
                    if (t && t.length > 0) {
                        var r = t[0].ErrorCode;
                        if (r && "MobileRequestFilterException" == r) return p("登录已失效，请重新登录"), !1;
                    }
                }
                if (e.data.resultCode && -96 == e.data.resultCode) return p(e.data.resultMessage), 
                !1;
                console.log("请求成功：", e), o(e.data);
            },
            fail: function(e) {
                console.log("请求发生错误：", e), i(e.data);
            },
            complete: function() {
                a();
            }
        });
        var p = function(e) {
            t.cwx.user.logout(function() {
                r.default.showToast(e), a(), t.cwx.user.login({
                    callback: function(e) {}
                });
            });
        };
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getNearbyAirportRecommend = exports.savePassengerModel = exports.GetOrderPayInfo = exports.FlightCancelOrderModel = exports.CreateOrder = exports.BookVerify = exports.FavCheck = exports.CabinDetailModel = exports.FlightPassengerModel = exports.CabinListModel = exports.ReturnTicketModel = exports.FlightOrderListModel = exports.LBSModel = exports.FlightRefundConditionModel = exports.FlightOrderDetailModel = exports.FlightListV2Model = exports.FlightListModel = exports.FlightCityListModel = void 0;

var t = require("../../../cwx/cwx"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../common/util")), o = "/restapi/soa2/", i = {
    location: {
        port: "10398",
        path: "LBSLocateCity"
    },
    flightList: {
        port: "12011",
        path: "GetFlightList"
    },
    getFlightListV2: {
        port: "12011",
        path: "GetFlightListV2"
    },
    orderDetail: {
        port: "12003",
        path: "OrderDetail"
    },
    flightRefundCondition: {
        port: "12003",
        path: "FlightRefundCondition"
    },
    cityList: {
        port: "12011",
        path: "FlightAirportList"
    },
    orderList: {
        port: "12003",
        path: "GetOrderList"
    },
    cabinList: {
        port: "12011",
        path: "GetFlightDetail"
    },
    favCheck: {
        port: "12003",
        path: "FavCheck"
    },
    bookVerify: {
        port: "12003",
        path: "BookVerify"
    },
    createOrder: {
        port: "12003",
        path: "CreateOrder"
    },
    cancelOrder: {
        port: "12003",
        path: "CancelOrder"
    },
    getOrderPayInfo: {
        port: "12003",
        path: "GetOrderPayInfo"
    },
    returnTicket: {
        port: "12003",
        path: "ReturnTicket"
    },
    passengerList: {
        port: "10957",
        path: "GetCommonPassengerV1"
    },
    savePassenger: {
        port: "10957",
        path: "SaveCommonPassengerV1"
    },
    cabinDetail: {
        port: "12011",
        path: "GetCabinDetail"
    },
    nearbyAirportRecommend: {
        port: "12011",
        path: "NearbyAirportRecommend"
    }
};

exports.FlightCityListModel = e(i.cityList), exports.FlightListModel = e(i.flightList), 
exports.FlightListV2Model = e(i.getFlightListV2), exports.FlightOrderDetailModel = e(i.orderDetail), 
exports.FlightRefundConditionModel = e(i.flightRefundCondition), exports.LBSModel = e(i.location), 
exports.FlightOrderListModel = e(i.orderList), exports.ReturnTicketModel = e(i.returnTicket), 
exports.CabinListModel = e(i.cabinList), exports.FlightPassengerModel = e(i.passengerList), 
exports.CabinDetailModel = e(i.cabinDetail), exports.FavCheck = e(i.favCheck), exports.BookVerify = e(i.bookVerify), 
exports.CreateOrder = e(i.createOrder), exports.FlightCancelOrderModel = e(i.cancelOrder), 
exports.GetOrderPayInfo = e(i.getOrderPayInfo), exports.savePassengerModel = e(i.savePassenger), 
exports.getNearbyAirportRecommend = e(i.nearbyAirportRecommend);