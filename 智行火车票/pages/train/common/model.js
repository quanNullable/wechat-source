function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, o, r, a, n) {
    c.cwx.request({
        url: e,
        data: t,
        method: o,
        success: function(e) {
            r(e.data);
        },
        fail: function(e) {
            a(e.data);
        },
        complete: function() {
            n();
        }
    });
}

function o(e, t) {
    var o = e.channel, r = e.path, a = p + o + (t ? "/" : "/json/") + r, i = function() {};
    return function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], r = arguments[2], s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : i;
        u["_" + o] && (e.head || (e.head = {
            extension: n()
        })), c.cwx.request({
            url: a,
            data: e,
            success: function(e) {
                if (e.data.ResponseStatus && e.data.ResponseStatus.Ack && "Failure" == e.data.ResponseStatus.Ack) {
                    var o = e.data.ResponseStatus.Errors;
                    if (o && o.length > 0) {
                        var r = o[0].ErrorCode;
                        if (r && "MobileRequestFilterException" == r) return l("登录已失效，请重新登录"), !1;
                    }
                }
                if (e.data.resultCode && -96 == e.data.resultCode) return l(e.data.resultMessage), 
                !1;
                console.log("请求成功：", e), t(e.data);
            },
            fail: function(e) {
                r(e.data);
            },
            complete: function() {
                s();
            }
        });
        var l = function(e) {
            c.cwx.user.logout(function() {
                d.default.showToast(e), s(), c.cwx.user.login({
                    callback: function(e) {}
                });
            });
        };
    };
}

function r(e) {
    var t = e.channel, o = "https://order.tieyou.com/index.php?param=" + e.path + "/" + t + ".html&requestType=remjy", r = function() {};
    return function(e, t, a) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : r;
        "object" == (void 0 === e ? "undefined" : s(e)) && (e.cAuth = c.cwx.user && c.cwx.user.auth || ""), 
        wx.request({
            url: o,
            data: e,
            success: function(e) {
                t(e.data);
            },
            fail: function(e) {
                a(e.data);
            },
            complete: function() {
                n();
            }
        });
    };
}

function a(e) {
    function t(e) {
        var t = JSON.stringify(e), o = l.default.MD5(t).toString(), r = l.default.enc.Utf8.parse(n), i = l.default.enc.Utf8.parse(a), s = l.default.AES.encrypt(o, r, {
            iv: i
        }).toString();
        return {
            partner: c.cwx.config.partner,
            channel: "wxs",
            sign: s
        };
    }
    var o = "https://vss.suanya.cn/ctm/" + e.path, r = function() {}, a = "0102030405060708", n = "gfmklmwhjdkstgfd";
    return function(e, a, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : r, s = {
            data: e,
            header: t(e)
        };
        c.cwx.request({
            method: "POST",
            url: o,
            data: s,
            success: function(e) {
                a(e.data);
            },
            fail: function(e) {
                n(e.data);
            },
            complete: function() {
                i();
            }
        });
    };
}

function n() {
    var e = void 0;
    c.cwx.mkt.getUnion(function(t) {
        return e = t;
    });
    c.cwx.config;
    var t = [], o = {
        platform: "wxapp",
        clientInfo: c.cwx.config.clientInfo || "",
        deviceId: c.cwx.clientID || "",
        partner: c.cwx.config.partner,
        reqTime: "" + new Date().getTime(),
        channel: c.cwx.config.channel5,
        openId: c.cwx.user.openid
    };
    return o.clientInfo.length && (o.clientInfo += "|"), e && (o.clientInfo += "aid=" + e.allianceid + "|sid=" + e.sid + "|ouid=" + e.ouid), 
    Object.keys(o).forEach(function(e) {
        t.push({
            name: e,
            value: o[e]
        });
    }), t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.UnSignCreditPayModel = exports.SignCreditPayModel = exports.QueryCreditPayModel = exports.GetOnTrainThenByTicketSoluModel = exports.GetUserAvailableCouponsModel = exports.GetWechatAppNewGuestCouponModel = exports.GetCouponListModel = exports.GetUserAccountInfoModel = exports.GetBuAnswerModel = exports.GetQuestionListModel = exports.PreHoldSeatPercentResultModel = exports.SaveWechatAppInfoModel = exports.GetGrabCrossStationInfosModel = exports.GetOrderPayInfoModal = exports.GetHotelAndFlightNewGuestCouponStatusModal = exports.GetHotelAndFlightNewGuestCouponModal = exports.UpdateGrabOrderModal = exports.GetUserPointInfoModal = exports.AcquireSpeedPointModal = exports.GetConfigInfoModal = exports.CreateGrabOrderModel = exports.GetGrabOrderDetailModel = exports.GetJLSuccessRateModel = exports.GetGrabTicketSucRateInfoModel = exports.TrainModifyPassengerModel = exports.TrainGetPassengerListModel = exports.GetShareImgForTZModel = exports.GetOrderShareAccPackageModel = exports.GetAcceleratePackageListInfoModel = exports.CalculateAcceleratePackageModel = exports.GetGrabOrderShareInfoModel = exports.CheckIsBindBankCardModel = exports.BindBankCardModel = exports.PushBindRegisterInfoModel = exports.Register12306AccountModel = exports.CheckInfoRegisterableModel = exports.AddReScheduleOrderOutModel = exports.Check12306Model = exports.Login12306Model = exports.PayResultNotifyModel = exports.PaySubmitNotifyModel = exports.GetGoPayInfoModel = exports.AccelerateGrabTicketRateModel = exports.RobTicketShareInfoModel = exports.ShareGrabModel = exports.AccelerateModel = exports.GetAccelerateInfoModel = exports.FlightLowestPriceModel = exports.TrainInfoModel = exports.LBSModel = exports.OrderListModel = exports.RefundTicketModel = exports.OrderCancelModel = exports.OrderDetailModel = exports.OrderCreateModel = exports.ValidateModel = exports.RequestIDModel = exports.CheckBookableModel = exports.PreHoldSeatResultModel = exports.ConfigInfoModel = exports.TrainStopModel = exports.CouponListModel = exports.JLSuccessModel = exports.XProductModel = exports.GetTrainTicketDetailModel = exports.TrainListModel = exports.TrainStationModel = exports.TrainNoticeModel = exports.GrabTicketRecommendTrainListModel = void 0;

var i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
}, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.getExtension = n;

var c = require("../../../cwx/cwx"), l = e(require("../../../3rd/crypto-js/crypto-js")), d = e(require("./util")), p = "/restapi/soa2/", u = {
    _10957: "10957",
    _12399: "12399",
    _14289: "14289"
}, h = {
    trainnotice: {
        channel: "10103",
        path: "GetNoticeInfo"
    },
    trainstation: {
        channel: "getStation",
        path: "dataApi"
    },
    traininfo: {
        channel: "10103",
        path: "GetBookingByTrainNameV3"
    },
    trainlist: {
        channel: "10103",
        path: "GetBookingByStationV3"
    },
    trainticketdetail: {
        channel: "10103",
        path: "TrainTicketDetailSearchV4"
    },
    jlsuccessrate: {
        channel: "getSuccessRate",
        path: "dataApi"
    },
    couponlist: {
        channel: "10064",
        path: "GetCouponListByOut"
    },
    trainstop: {
        channel: "checi",
        path: "dataApi"
    },
    configinfo: {
        channel: "getTicketDesc",
        path: "dataApi"
    },
    xproduct: {
        channel: "10103",
        path: "GetTrainXProductDesc"
    },
    preholdseat: {
        channel: "preHoldSeat",
        path: "orderApi"
    },
    checkbookable: {
        channel: "yupiao",
        path: "dataApi"
    },
    requestid: {
        channel: "addPay",
        path: "orderApi"
    },
    validate: {
        channel: "checkAllPassengers",
        path: "userApi"
    },
    ordercreate: {
        channel: "10957",
        path: "OrderCreateV1"
    },
    orderdetail: {
        channel: "10957",
        path: "GetOrderDetailV1"
    },
    ordercancel: {
        channel: "10957",
        path: "OrderCancelV1"
    },
    orderlist: {
        channel: "10957",
        path: "GetOrderListV1"
    },
    refundticket: {
        channel: "10957",
        path: "RefundTicketV1"
    },
    location: {
        channel: "10398",
        path: "LBSLocateCity"
    },
    flightLowestPrice: {
        channel: "12011",
        path: "GetFlightLowestPrice"
    },
    accelerateInfo: {
        path: "queryActiveMonitor"
    },
    accelerate: {
        path: "activeMonitor"
    },
    sharegrab: {
        channel: "10064",
        path: "GrabTicketSharedLoad"
    },
    robTicketShareInfo: {
        channel: "10064",
        path: "GrabTicketFlowShared"
    },
    grabTicketSharedAcce: {
        channel: "10064",
        path: "GrabTicketSharedAcce"
    },
    getGoPayInfo: {
        channel: "10957",
        path: "GetGoPayInfoAy"
    },
    paySubmitNotify: {
        channel: "10957",
        path: "PaySubmitNotifyV1"
    },
    payResultNotify: {
        channel: "10957",
        path: "PayResultNotifyV1"
    },
    check12306: {
        channel: "10103",
        path: "CheckUserAccountStatusResultV2"
    },
    login12306: {
        channel: "10103",
        path: "CheckUserAccountV2"
    },
    RegisterUserAccountInfo: {
        channel: "10064",
        path: "RegisterUserAccountInfo"
    },
    CheckRegisterMobile: {
        channel: "10064",
        path: "CheckRegisterMobile"
    },
    pushBindRegisterInfo: {
        channel: "10064",
        path: "PushUserRegisterInfo"
    },
    BindBankCard: {
        channel: "10957",
        path: "BindBankCard"
    },
    CheckIsBindBankCard: {
        channel: "10957",
        path: "CheckIsBindBankCard"
    },
    GetGrabOrderShareInfo: {
        channel: "14289",
        path: "getGrabOrderShareInfo"
    },
    CalculateAcceleratePackage: {
        channel: "12399",
        path: "CalculateAcceleratePackage"
    },
    GetOrderShareAccPackage: {
        channel: "12399",
        path: "GetOrderShareAccPackage"
    },
    GetAcceleratePackageListInfo: {
        channel: "10103",
        path: "GetAcceleratePackageListInfo"
    },
    GetShareImgForTZ: {
        channel: "13892",
        path: "GetShareImg"
    },
    TrainGetPassengerList: {
        channel: "10103",
        path: "TrainGetPassengerList"
    },
    TrainModifyPassenger: {
        channel: "10103",
        path: "TrainModifyPassenger"
    },
    GetGrabTicketSucRateInfo: {
        channel: "10103",
        path: "GetGrabTicketSucRateInfo"
    },
    getJLSuccessRate: {
        channel: "10064",
        path: "JLSuccessRateH5"
    },
    grabTicketRecommendTrainList: {
        channel: "10103",
        path: "GrabTicketRecommendTrainList"
    },
    GetGrabOrderDetail: {
        channel: "10957",
        path: "GetGrabOrderDetail"
    },
    CreateGrabOrder: {
        channel: "10957",
        path: "CreateGrabOrder"
    },
    GetConfigInfo: {
        channel: "10103",
        path: "GetConfigInfo"
    },
    AcquireSpeedPoint: {
        channel: "14289",
        path: "AcquireSpeedPoint"
    },
    GetUserPointInfo: {
        channel: u._12399,
        path: "GetUserPointInfo"
    },
    UpdateGrabOrder: {
        channel: u._10957,
        path: "UpdateGrabOrder"
    },
    GetHotelAndFlightNewGuestCoupon: {
        channel: "14289",
        path: "GetHotelAndFlightNewGuestCoupon"
    },
    GetHotelAndFlightNewGuestCouponStatus: {
        channel: "14289",
        path: "GetHotelAndFlightNewGuestCouponStatus"
    },
    GetOrderPayInfo: {
        channel: u._10957,
        path: "GetOrderPayInfo"
    },
    GetGrabCrossStationInfos: {
        channel: "10103",
        path: "GetGrabCrossStationInfos"
    },
    SaveWechatAppInfo: {
        channel: u._14289,
        path: "SaveWechatAppInfo"
    },
    addRescheduleOrderOut: {
        channel: "10957",
        path: "CreateReScheduleOrderV1"
    },
    preholdseatpercent: {
        channel: "10957",
        path: "GetPreHoldSeatResultV1"
    },
    GetQuestionList: {
        channel: "11373",
        path: "GetQuestionList"
    },
    GetBuAnswer: {
        channel: "11373",
        path: "GetBuAnswer"
    },
    GetUserAccountInfo: {
        channel: "12399",
        path: "GetUserAccountInfo"
    },
    GetCouponList: {
        channel: "12399",
        path: "GetCouponList"
    },
    GetWechatAppNewGuestCouponList: {
        channel: "14289",
        path: "GetWechatAppNewGuestCoupon"
    },
    GetUserAvailableCoupons: {
        channel: "12399",
        path: "GetUserAvailableCoupons"
    },
    GetOnTrainThenByTicketSolu: {
        channel: "13892",
        path: "getOnTrainThenByTicketSolu"
    },
    QueryCreditPayInfo: {
        channel: "10957",
        path: "QueryCreditPay"
    },
    SignCreditPayInfo: {
        channel: "10957",
        path: "SignCreditPay"
    },
    UnSignCreditPayInfo: {
        channel: "10957",
        path: "UnSignCreditPay"
    }
};

exports.GrabTicketRecommendTrainListModel = function(e, o, r) {
    var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {}, n = h.grabTicketRecommendTrainList, s = n.channel, c = n.path;
    t(p + s + "/" + c, e, void 0, function(e) {
        function t(e) {
            var t = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/i;
            return e.match(t) && (e = e.replace(t, "$2/$3/$1 $4:$5:$6")), new Date(e);
        }
        function r(e, o) {
            var r = t(e), a = (t(o).getTime() - r.getTime()) / 1e3, n = parseInt(a / 3600);
            return n + "时" + parseInt((a - 3600 * n) / 60) + "分";
        }
        var a = e.RecommendListBySuccessRate, n = e.RecommendTrainList, s = a.map(function(e) {
            return i({}, e, {
                DepartStation: e.DepStation,
                ArriveStation: e.ArrStation,
                DepartTimeStamp: +t(e.DepTime),
                DepartTime: "" + e.DepTime[8] + e.DepTime[9] + ":" + e.DepTime[10] + e.DepTime[11],
                ArriveTime: "" + e.ArrTime[8] + e.ArrTime[9] + ":" + e.ArrTime[10] + e.ArrTime[11],
                TimesCost: r(e.DepTime, e.ArrTime)
            });
        }), c = n.map(function(e) {
            return i({}, e, {
                DepartStation: e.DepStation,
                ArriveStation: e.ArrStation,
                DepartTimeStamp: +t(e.DepTime),
                DepartTime: "" + e.DepTime[8] + e.DepTime[9] + ":" + e.DepTime[10] + e.DepTime[11],
                ArriveTime: "" + e.ArrTime[8] + e.ArrTime[9] + ":" + e.ArrTime[10] + e.ArrTime[11],
                TimesCost: r(e.DepTime, e.ArrTime)
            });
        }), l = i({}, e, {
            RecommendListBySuccessRate: s,
            RecommendTrainList: c
        });
        o(l);
    }, r, a);
}, exports.TrainNoticeModel = o(h.trainnotice), exports.TrainStationModel = r(h.trainstation), 
exports.TrainListModel = o(h.trainlist), exports.GetTrainTicketDetailModel = o(h.trainticketdetail), 
exports.XProductModel = o(h.xproduct), exports.JLSuccessModel = r(h.jlsuccessrate), 
exports.CouponListModel = o(h.couponlist), exports.TrainStopModel = r(h.trainstop), 
exports.ConfigInfoModel = r(h.configinfo), exports.PreHoldSeatResultModel = r(h.preholdseat), 
exports.CheckBookableModel = r(h.checkbookable), exports.RequestIDModel = r(h.requestid), 
exports.ValidateModel = r(h.validate), exports.OrderCreateModel = o(h.ordercreate), 
exports.OrderDetailModel = o(h.orderdetail), exports.OrderCancelModel = o(h.ordercancel), 
exports.RefundTicketModel = o(h.refundticket), exports.OrderListModel = o(h.orderlist), 
exports.LBSModel = o(h.location), exports.TrainInfoModel = o(h.traininfo), exports.FlightLowestPriceModel = o(h.flightLowestPrice), 
exports.GetAccelerateInfoModel = a(h.accelerateInfo), exports.AccelerateModel = a(h.accelerate), 
exports.ShareGrabModel = o(h.sharegrab), exports.RobTicketShareInfoModel = o(h.robTicketShareInfo), 
exports.AccelerateGrabTicketRateModel = o(h.grabTicketSharedAcce), exports.GetGoPayInfoModel = o(h.getGoPayInfo), 
exports.PaySubmitNotifyModel = o(h.paySubmitNotify), exports.PayResultNotifyModel = o(h.payResultNotify), 
exports.Login12306Model = o(h.login12306), exports.Check12306Model = o(h.check12306), 
exports.AddReScheduleOrderOutModel = o(h.addRescheduleOrderOut), exports.CheckInfoRegisterableModel = o(h.RegisterUserAccountInfo), 
exports.Register12306AccountModel = o(h.CheckRegisterMobile), exports.PushBindRegisterInfoModel = o(h.pushBindRegisterInfo), 
exports.BindBankCardModel = o(h.BindBankCard), exports.CheckIsBindBankCardModel = o(h.CheckIsBindBankCard), 
exports.GetGrabOrderShareInfoModel = o(h.GetGrabOrderShareInfo), exports.CalculateAcceleratePackageModel = o(h.CalculateAcceleratePackage), 
exports.GetAcceleratePackageListInfoModel = o(h.GetAcceleratePackageListInfo), exports.GetOrderShareAccPackageModel = o(h.GetOrderShareAccPackage), 
exports.GetShareImgForTZModel = o(h.GetShareImgForTZ), exports.TrainGetPassengerListModel = o(h.TrainGetPassengerList), 
exports.TrainModifyPassengerModel = o(h.TrainModifyPassenger), exports.GetGrabTicketSucRateInfoModel = o(h.GetGrabTicketSucRateInfo), 
exports.GetJLSuccessRateModel = o(h.getJLSuccessRate), exports.GetGrabOrderDetailModel = o(h.GetGrabOrderDetail), 
exports.CreateGrabOrderModel = o(h.CreateGrabOrder), exports.GetConfigInfoModal = o(h.GetConfigInfo), 
exports.AcquireSpeedPointModal = o(h.AcquireSpeedPoint), exports.GetUserPointInfoModal = o(h.GetUserPointInfo), 
exports.UpdateGrabOrderModal = o(h.UpdateGrabOrder), exports.GetHotelAndFlightNewGuestCouponModal = o(h.GetHotelAndFlightNewGuestCoupon), 
exports.GetHotelAndFlightNewGuestCouponStatusModal = o(h.GetHotelAndFlightNewGuestCouponStatus), 
exports.GetOrderPayInfoModal = o(h.GetOrderPayInfo), exports.GetGrabCrossStationInfosModel = o(h.GetGrabCrossStationInfos), 
exports.SaveWechatAppInfoModel = o(h.SaveWechatAppInfo), exports.PreHoldSeatPercentResultModel = o(h.preholdseatpercent), 
exports.GetQuestionListModel = o(h.GetQuestionList), exports.GetBuAnswerModel = o(h.GetBuAnswer), 
exports.GetUserAccountInfoModel = o(h.GetUserAccountInfo), exports.GetCouponListModel = o(h.GetCouponList), 
exports.GetWechatAppNewGuestCouponModel = o(h.GetWechatAppNewGuestCouponList), exports.GetUserAvailableCouponsModel = o(h.GetUserAvailableCoupons), 
exports.GetOnTrainThenByTicketSoluModel = o(h.GetOnTrainThenByTicketSolu), exports.QueryCreditPayModel = o(h.QueryCreditPayInfo), 
exports.SignCreditPayModel = o(h.SignCreditPayInfo), exports.UnSignCreditPayModel = o(h.UnSignCreditPayInfo);