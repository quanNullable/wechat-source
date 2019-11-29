function e(e) {
    var o = n.cwx.getCurrentPage();
    o && o.ubtTrace && n._.isObject(e) && o.ubtTrace(101692, e);
}

function o(o, t) {
    var r = t.success, i = void 0 === r ? function() {} : r, a = t.fail, s = void 0 === a ? function() {} : a, d = t.complete, u = void 0 === d ? function() {} : d;
    n.cwx.requestPayment({
        timeStamp: o.timeStamp,
        nonceStr: o.nonceStr,
        package: o.package,
        signType: "MD5",
        paySign: o.paySign,
        success: function() {
            e({
                c: 1,
                m: "pay success",
                d: o
            }), i();
        },
        fail: function(t) {
            e({
                c: 2,
                m: "pay fail",
                d: {
                    res: t,
                    param: o
                }
            }), s(t);
        },
        complete: function(e) {
            u(e);
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.UnSignCreditPayPromise = exports.SignCreditPayPromise = exports.QueryCreditPayPromise = exports.GetOnTrainThenByTicketSoluPromise = exports.GetWechatAppNewGuestCouponPromise = exports.GetCouponListPromise = exports.GetUserAccountInfoPromise = exports.PreHoldSeatPercentResultPromise = exports.TrainListPromise = exports.trainPay = exports.GetHotelAndFlightNewGuestCouponStatusPromise = exports.GetHotelAndFlightNewGuestCouponPromise = exports.UpdateGrabOrderPromise = exports.GetUserPointInfoPromise = exports.AcquireSpeedPointPromise = exports.SetConfigSwitchAsync = exports.GetConfigInfoPromise = exports.GetGrabOrderShareInfoPromise = exports.CreateGrabOrderPromise = exports.GetGrabOrderDetailPromise = exports.GetGrabTicketSucRateInfoPromise = exports.GetGrabCrossStationInfosPromise = void 0;

var t = Object.assign || function(e) {
    for (var o = 1; o < arguments.length; o++) {
        var t = arguments[o];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
};

exports.GetShareImg = function() {
    return d({
        ConfigKey: "tieyou_wx_robshare_shareimgs"
    }).then(function(e) {
        if (e.ConfigInfo && e.ConfigInfo.Content) return e.ConfigInfo.Content.split(",");
    });
}, exports.RequestSignPay = function(e, o) {
    var r = e.params, s = void 0 === r ? {} : r, d = e.token, u = void 0 === d ? {} : d, l = (e.extend, 
    e.options), f = void 0 === l ? {} : l, p = o.sbackCallback, c = o.ebackCallback, m = (o.rbackCallback, 
    o.rejectCb), P = void 0 === m ? function() {} : m, x = f.payOptions, G = void 0 === x ? {} : x, g = {
        order_number: "",
        Channel: n.cwx.config.channel3,
        partner: n.cwx.config.partner
    };
    Object.assign(g, s), (0, i.RequestIDModel)(g, function(e) {
        var o = {
            oid: e.oid,
            auth: n.cwx.user.auth,
            title: "",
            amount: 0
        };
        Object.assign(o, u), a.CPayPopbox.init(t({
            data: {
                oid: e.oid,
                token: n.cwx.util.base64Encode(JSON.stringify(o))
            },
            sbackCallback: p,
            ebackCallback: c
        }, G));
    }, P);
}, exports.UpdateGrabOrder = function(e) {
    var o = {
        orderNumber: "",
        mobile: n.cwx.user.userName,
        contactMobile: "",
        crossStationFlag: -1,
        speedSum: -1,
        nearTrainFlag: -1,
        trainInfo: {
            trainNo: "",
            seatName: "",
            fromName: "",
            toName: "",
            fromDate: ""
        },
        head: {
            extension: (0, i.getExtension)()
        }
    };
    return o.head.extension.forEach(function(e) {
        "channel" == e.name && (e.value = n.cwx.config.channel5);
    }), r.default.mergeDeep(o, e), r.default.promisifyModel(i.UpdateGrabOrderModal)(o);
}, exports.OrderPay = function(e) {
    var t = {
        head: {
            extension: (0, i.getExtension)()
        }
    };
    t.head.extension.forEach(function(e) {
        "channel" == e.name && (e.value = n.cwx.config.channel5);
    }), r.default.mergeDeep(t, e);
    var a = r.default.getDeferred();
    return r.default.promisifyModel(i.GetOrderPayInfoModal)(t).then(function(e) {
        if (1 == e.resultCode) {
            var t = e.weixinPayInfo;
            o({
                timeStamp: t.timeStamp,
                nonceStr: t.nonceStr,
                package: t.packageValue,
                signType: "MD5",
                paySign: t.sign
            }, {
                success: function() {
                    a.resolve();
                },
                fail: function(e) {
                    "requestPayment:fail cancel" == e.errMsg ? a.resolve(e) : a.reject(e);
                }
            });
        } else a.reject(e);
    }).catch(function(e) {
        a.reject(e);
    }), a.promise;
}, exports.GetSpeedLvlName = function() {
    var e = [ {
        name: "低速",
        speedPkgNums: 0
    }, {
        name: "中速",
        speedPkgNums: 10
    }, {
        name: "快速",
        speedPkgNums: 20
    }, {
        name: "高速",
        speedPkgNums: 30
    }, {
        name: "VIP",
        speedPkgNums: 50
    } ], o = r.default.getDeferred();
    return o.resolve(e), o.promise;
}, exports.saveUserFormID = function(e) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if (n.cwx.user.openid && e) {
        var t = {
            openId: n.cwx.user.openid,
            formId: e,
            detail: o
        };
        return r.default.promisifyModel(i.SaveWechatAppInfoModel)(t);
    }
}, exports.GetQuestionListPromise = function(e) {
    var o = {
        GroupCode: "train",
        Platform: 1,
        origin: 40001,
        caseValue: -1,
        PageId: null
    };
    return r.default.mergeDeep(o, e), r.default.promisifyModel(i.GetQuestionListModel)(o);
}, exports.GetBuAnswerPromise = function(e) {
    var o = {
        GroupCode: "train",
        Platform: 1,
        RelationGuid: "",
        OrderID: "",
        enableDynamicAnswer: !0,
        IsJsonFormat: !0,
        ProdcutId: null,
        clientVersion: "0.0.1"
    };
    return r.default.mergeDeep(o, e), r.default.promisifyModel(i.GetBuAnswerModel)(o);
};

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./util")), n = require("../../../cwx/cwx"), i = require("./model"), a = require("../../pay/controllers/index.js"), s = r.default.promisifyModel(i.GetConfigInfoModal), d = (exports.GetGrabCrossStationInfosPromise = r.default.promisifyModel(i.GetGrabCrossStationInfosModel), 
exports.GetGrabTicketSucRateInfoPromise = r.default.promisifyModel(i.GetGrabTicketSucRateInfoModel), 
exports.GetGrabOrderDetailPromise = r.default.promisifyModel(i.GetGrabOrderDetailModel), 
exports.CreateGrabOrderPromise = r.default.promisifyModel(i.CreateGrabOrderModel), 
exports.GetGrabOrderShareInfoPromise = r.default.promisifyModel(i.GetGrabOrderShareInfoModel), 
exports.GetConfigInfoPromise = s);

exports.SetConfigSwitchAsync = function(e) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e;
    return s({
        ConfigKey: e
    }).then(function(e) {
        return e.ConfigInfo && e.ConfigInfo.Content ? [ r.default.setConfigSwitch(o, e.ConfigInfo.Content), o ] : [ !1, o ];
    }).catch(function(e) {
        return [ !1, o ];
    });
}, exports.AcquireSpeedPointPromise = r.default.promisifyModel(i.AcquireSpeedPointModal), 
exports.GetUserPointInfoPromise = function() {
    var e = {
        data: {
            AccountName: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
        }
    };
    return r.default.promisifyModel(i.GetUserPointInfoModal)(e);
}, exports.UpdateGrabOrderPromise = r.default.promisifyModel(i.UpdateGrabOrderModal), 
exports.GetHotelAndFlightNewGuestCouponPromise = r.default.promisifyModel(i.GetHotelAndFlightNewGuestCouponModal), 
exports.GetHotelAndFlightNewGuestCouponStatusPromise = r.default.promisifyModel(i.GetHotelAndFlightNewGuestCouponStatusModal);

exports.trainPay = o;

exports.TrainListPromise = r.default.promisifyModel(i.TrainListModel), exports.PreHoldSeatPercentResultPromise = r.default.promisifyModel(i.PreHoldSeatPercentResultModel), 
exports.GetUserAccountInfoPromise = r.default.promisifyModel(i.GetUserAccountInfoModel), 
exports.GetCouponListPromise = r.default.promisifyModel(i.GetCouponListModel), exports.GetWechatAppNewGuestCouponPromise = r.default.promisifyModel(i.GetWechatAppNewGuestCouponModel), 
exports.GetOnTrainThenByTicketSoluPromise = r.default.promisifyModel(i.GetOnTrainThenByTicketSoluModel), 
exports.QueryCreditPayPromise = r.default.promisifyModel(i.QueryCreditPayModel), 
exports.SignCreditPayPromise = r.default.promisifyModel(i.SignCreditPayModel), exports.UnSignCreditPayPromise = r.default.promisifyModel(i.UnSignCreditPayModel);