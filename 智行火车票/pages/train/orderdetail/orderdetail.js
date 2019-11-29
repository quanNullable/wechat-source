function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, i = function() {
    function t(t, e) {
        var a = [], i = !0, r = !1, n = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (a.push(o.value), 
            !e || a.length !== e); i = !0) ;
        } catch (t) {
            r = !0, n = t;
        } finally {
            try {
                !i && s.return && s.return();
            } finally {
                if (r) throw n;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = require("../../../cwx/cwx"), n = require("../common/store"), o = require("../common/model"), s = require("../common/service"), d = t(require("../common/cDate")), u = t(require("../common/util")), c = t(require("../components/banklist/banklist")), f = require("../common/activate-card"), h = require("../common/components/toast/toast"), l = t(require("../common/components/selecters/date-selecter")), m = t(require("../common/components/selecters/seat-selecter")), S = (require("../../pay/controllers/index.js"), 
r.cwx.train), p = (0, h.trainToast)(), T = {
    JLView: !1,
    countdownOrderTips: !1,
    reShareBtn: !1,
    oriShareBtn: !1,
    isOrderSuccess: !1,
    activity: !1,
    JL_NOTSTART: !1,
    JL_ROBING: !1,
    altInfo: !1,
    isShowBuyAgain: !1,
    isNoTicket: !1,
    addSpeedOrConfirmModify: ""
}, v = {
    pageId: "10320660962",
    data: {
        train: {},
        departDateStr: "",
        arriveDateStr: "",
        orderInfo: {},
        preholdSeatId: null,
        isWorkTime: !0,
        bookTips: "",
        isExpanded: !1,
        isOpenPrice: !1,
        isFilterViewAnimation: !1,
        mask: !1,
        isTest: !1,
        canUnionpay: !1,
        detailLoadingTimes: 0,
        grabOrder: null,
        canShare: u.default.canIUse("button.open-type.share"),
        canRichText: u.default.canIUse("rich-text"),
        isTieyou: r.cwx.config.isTieyou,
        speedPackageNum: 0,
        speedPackageMaxBuyCount: 0,
        speedLevels: [],
        isHotelNewGuest: 1,
        isFlightNewGuest: 1,
        isCanGetNewGuestGift: !1,
        showType: "",
        partnerCN: r.cwx.config.partnerCN,
        isNearTrainSwitchSelected: !1,
        isShowNearTrainInfo: !1,
        CrossStationGrabTicketInfoList: [],
        isShowCrossStationRevise: !1,
        isIOS: !1,
        QuestionList: [],
        isShowNewGuestRedPocket: !1,
        payUponArrivalList: [],
        originTrainInfo: {}
    },
    onLoad: function(t) {
        var e = this;
        delete S.chosenTrainList, this.jlview = t.jlview;
        var a = t.oid;
        this.oid = a;
        var i = u.default.isTest(), n = u.default.isWorkTime(), o = wx.getSystemInfoSync().system || "";
        o = o.toLowerCase(), this.setData({
            isWorkTime: n,
            isTest: i,
            isIOS: !(o.indexOf("android") > -1)
        }), this.getUserInfo(), r.cwx.hideShareMenu && r.cwx.hideShareMenu(), this.speedLvlPromise = (0, 
        s.GetSpeedLvlName)().then(function(t) {
            e.setData({
                speedLevels: t
            });
        }), this.getShowCrossStationFlag();
    },
    onShow: function() {
        var t = this;
        S.isReschedule = !1, r.cwx.mkt.getUnion(function(e) {
            t.unionData = e;
        }), c.default.init(this), this.newGuestCouponStatusPromise = this.getNewGuestCouponStatus(), 
        this.loadData(this.oid);
    },
    onUnload: function() {
        delete S.chosenTrainList, clearInterval(this.preholdIntvl);
    },
    onPullDownRefresh: function() {
        this.loadData(this.oid);
    },
    loadData: function(t) {
        var e = this;
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.showTrainLoading(), t || (t = this.oid);
        var a = function() {
            return e.handleNoTicket(), e.hideTrainLoading(), wx.stopPullDownRefresh(), e.newGuestCouponStatusPromise.then(e.showNewGuestModal);
        };
        return this.loadOrderDataPromise = this.loadOrderData(t), this.jlview ? (this.setData({
            JLView: !0
        }), Promise.all([ this.loadOrderDataPromise, this.loadGrabData(t) ]).then(function(t) {
            var a = i(t, 2), r = a[0], n = a[1];
            r && (n && (r.payFlag = n.orderInfo && n.orderInfo.payFlag), e.setOrderStatus(r));
        }).then(a).catch(a)) : this.loadOrderDataPromise.then(function(t) {
            e.setOrderStatus(t);
        }).then(a).catch(a);
    },
    loadOrderData: function(t) {
        var e = this, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, i = u.default.getDeferred(), n = this;
        t || (t = this.oid);
        var s = {
            orderNumber: t,
            partnerName: r.cwx.config.partner,
            source: r.cwx.config.channel4
        };
        return (0, o.OrderDetailModel)(s, function(t) {
            if (t.resultCode) {
                var r = e.orderInfo = t, o = r.trainInfo || {}, s = {
                    DepartureStationName: o.fromStation,
                    DepartureTime: o.fromTime,
                    DepartureDate: o.fromDate,
                    ArrivalStationName: o.toStation,
                    ArrivalTime: o.toTime,
                    ArrivalDate: o.toDate || o.fromDate,
                    TrainNumber: o.trainNo
                };
                s.DepartureDateStr = new d.default(s.DepartureDate).format("m月d号"), s.ArrivalDateStr = new d.default(s.ArrivalDate).format("m月d号"), 
                e.train = s, e.setData({
                    train: s
                });
                if (e.data.JLView || (e.oid = t.tyOrderNo, e.loadQuestionList()), r.checkBindCardFlag && !r.isPreHoldSeat && e.data.detailLoadingTimes < 3) return e.setData({
                    detailLoadingTimes: e.data.detailLoadingTimes + 1
                }), (0, f.CheckIsBindBankCard)(t.tyOrderNo), setTimeout(function() {
                    n.showTrainLoading();
                }, 100), setTimeout(function() {
                    e.hideTrainLoading(), e.loadData(e.oid);
                }, 3e3), void i.resolve(r);
                try {
                    r.priceDetail.detail.forEach(function(t) {
                        t.value = t.value.replace("*", "x");
                    });
                } catch (t) {}
                e.setOrderFlags(r), e.formatOrder(r), i.resolve(r), a.call(e);
            }
        }, function(t) {
            i.resolve();
        }, function() {}), i.promise;
    },
    loadGrabData: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.oid, a = {
            orderNumber: e
        }, i = function(e) {
            return t.setJLOrderFlags(e), r.cwx.showShareMenu && r.cwx.showShareMenu(), (0, s.GetShareImg)().then(function(e) {
                t.shareImgs = e;
            }), t.speedLvlPromise.then(function() {
                return t.setJLDetailInfo(e), e;
            });
        };
        return (0, s.GetGrabOrderDetailPromise)(a).then(function(t) {
            if (1 === t.resultCode && t.orderInfo && (!t.resultMessage || -1 === t.resultMessage.indexOf("未找到该监控订单"))) {
                if (t.orderInfo.payFlag) {
                    var a = {
                        orderNumber: e,
                        mobile: r.cwx.user.userName,
                        contactMobile: "",
                        crossStationFlag: -1,
                        speedSum: -1,
                        trainInfo: {
                            trainNo: "",
                            seatName: "",
                            fromName: "",
                            toName: "",
                            fromDate: ""
                        }
                    };
                    return (0, s.UpdateGrabOrderPromise)(a).then(function(e) {
                        if (1 === e.resultCode) return t.f_priceDetail = e.orderPaymentInfo.priceDetail, 
                        i(t);
                        u.default.showModal({
                            m: e.resultMessage || "系统异常，请重试"
                        });
                    });
                }
                return i(t);
            }
        }).catch(function(t) {
            console.error(t);
        });
    },
    setTicketStatus: function(t) {
        var e = t.ticketInfos || [];
        r._.each(e, function(t) {
            t.statusName = t.orderStatus;
        }), this.setData({
            orderInfo: t
        });
    },
    setOrderStatus: function(t) {
        if (t.isPreHoldSeat && 0 == t.preHoldStatus && this.getPreholdResult(), t.isPreHoldSeat && 1 == t.preHoldStatus && t.payFlag) this.preHoldSeatTips(); else {
            this.setData({
                bookTips: ""
            });
        }
        this.setTicketStatus(t);
        var e = "D" === t.orderType && t.isPreHoldSeat;
        this.setData({
            orderInfo: t,
            canUnionpay: e
        });
    },
    formatOrder: function(t) {
        r._.isArray(t.reScheduleOrders) && t.reScheduleOrders.forEach(function(t) {
            var e = t.trainInfo;
            e && (e.f_fromDate = d.default.parse(e.fromDate).format("m月d号"), e.f_toDate = d.default.parse(e.toDate).format("m月d号"));
        });
    },
    getPreholdResult: function() {
        function t() {
            (0, o.PreHoldSeatResultModel)(i, function(t) {
                var i = t.preHoldSchedule.resultCode;
                if (e.setData({
                    preholdSeatId: i
                }), 1 == i) clearInterval(e.preholdIntvl), e.loadData(e.oid); else if (0 == i) {
                    clearInterval(e.preholdIntvl), i = null;
                    e.setData({
                        bookTips: "",
                        preholdSeatId: i
                    }), a > 1 && e.loadData(e.oid, e.pay);
                } else {
                    if (-1 == i) return clearInterval(e.preholdIntvl), void e.showTrainToast(t.preHoldSchedule.resultMessage);
                    if (3 == i) return clearInterval(e.preholdIntvl), void e.loadData(e.oid);
                }
                a++;
            }, function(t) {}, function() {
                e.hideTrainLoading();
            });
        }
        var e = this, a = 0;
        e.showTrainLoading();
        var i = {
            order_no: this.oid,
            user_id: r.cwx.user.duid,
            partner: r.cwx.config.partner
        };
        t(), e.preholdIntvl = setInterval(t, 5e3);
    },
    preHoldSeatTips: function() {
        var t = new d.default(this.orderInfo.orderTimeoutDate).getTime();
        if (!(+new Date() >= t)) {
            var e = "您已成功占座，请在 " + this.orderInfo.orderTimeoutDate + " 前完成支付，避免订单超时";
            this.setData({
                bookTips: e
            });
        }
    },
    buySame: function(t) {
        var e = t.currentTarget.dataset.type, a = this.data.orderInfo, i = "../list/list";
        "book" === e && (i = "../booking/booking");
        var n = {};
        n.url = "reverse" == e ? i + "?dstation=" + a.trainInfo.toStation + "&astation=" + a.trainInfo.fromStation + "&date=" + a.trainInfo.fromDate : i + "?dstation=" + a.trainInfo.fromStation + "&astation=" + a.trainInfo.toStation + "&date=" + a.trainInfo.fromDate, 
        r.cwx.bookingToDetail = !1, this.navigateTo(n);
    },
    refundTicketAction: function(t) {
        var e = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = arguments[2];
        if (!t.returnFlag || !t.reBtnColorType) return u.default.showModal({
            m: t.returnDesc
        });
        if ("成人票" != t.passengerType || this.checkRefundable(t, a, i)) {
            var r = function() {
                e.refundAction(t, a);
            };
            u.default.showModal({
                m: t.returnDesc || "退票可能会产生手续费，是否确认退票？",
                showCancel: !0,
                done: function(t) {
                    t.confirm && r();
                }
            });
        }
    },
    refundTicket: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.orderInfo.ticketInfos[e];
        return this.refundTicketAction(a);
    },
    checkRefundable: function(t, e, a) {
        var i = e ? this.data.orderInfo.reScheduleOrders[a].ticketInfos : this.data.orderInfo.ticketInfos, n = !1, o = !1;
        return r._.each(i, function(e) {
            "儿童票" == e.passengerType && e.returnFlag && (n = !0), "成人票" == e.passengerType && e.returnFlag && e.electronicLongNum != t.electronicLongNum && (o = !0);
        }), !(!o && n) || (this.showTrainToast("儿童不可单独出行，请先退同行儿童车票"), !1);
    },
    refundAction: function(t) {
        var e = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.showTrainLoading();
        var i = {
            orderNumber: this.oid,
            tickectId: t.ticketId,
            partnerName: r.cwx.config.partner,
            isRescheduleTicket: a ? 1 : 0
        }, n = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            u.default.showModal({
                m: t.resultMessage || "退票失败，请稍候再试!"
            });
        };
        (0, o.RefundTicketModel)(i, function(t) {
            e.hideTrainLoading(), 1 == t.resultCode ? e.loadData(e.oid) : n(t);
        }, function(t) {
            e.hideTrainLoading(), n();
        }, function() {});
    },
    cancelOrder: function() {
        var t = this, e = this;
        u.default.showModal({
            m: "确定取消订单吗？",
            showCancel: !0,
            done: function(a) {
                if (a.confirm) {
                    e.showTrainLoading();
                    var i = {
                        orderNumber: e.data.orderInfo.reschedulePayOrderNo || t.oid,
                        partnerName: r.cwx.config.partner
                    };
                    (0, o.OrderCancelModel)(i, function(e) {
                        1 === e.resultCode ? (delete S.chosenTrainList, t.isAltInfoInited = !1, t.loadData(t.oid)) : u.default.showModal({
                            m: e.resultMessage
                        });
                    }, function(t) {}, function() {
                        e.hideTrainLoading();
                    });
                }
            }
        });
    },
    pay: function() {
        function t() {
            wx.redirectTo({
                url: "../orderdetail/orderdetail?oid=" + e.oid + (e.jlview ? "&jlview=1" : "")
            });
        }
        {
            if (!this.data.isTest || !this.data.canUnionpay) {
                var e = this;
                return this.showTrainLoading(), (0, s.OrderPay)({
                    payType: "weixin",
                    orderNumber: e.data.orderInfo.reschedulePayOrderNo || e.data.orderInfo.tyOrderNo
                }).then(function() {
                    "requestPayment:fail cancel" == (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).errMsg || setTimeout(function() {
                        t();
                    }, 200);
                }).catch(function() {
                    e.showTrainToast("系统繁忙，请重新支付!");
                });
            }
            this.showChooseBank();
        }
    },
    openPrice: function() {
        var t = this;
        this.data.isOpenPrice ? this.hidePrice() : (this.setData({
            isOpenPrice: !0
        }), setTimeout(function() {
            t.setData({
                isFilterViewAnimation: !0
            });
        }, 10));
    },
    hidePrice: function() {
        var t = this;
        this.setData({
            isFilterViewAnimation: !1
        }), setTimeout(function() {
            t.setData({
                isOpenPrice: !1
            });
        }, 300);
    },
    goToFriend: function(t) {
        var e = this.getSharePath();
        e += "&type=" + t, e += "&isme=1", n.TrainUserStore.getAttr("hideShareMask") || (e += "&firsttime=1", 
        n.TrainUserStore.setAttr("hideShareMask", !0)), this.navigateTo({
            url: e
        });
    },
    buyAgain: function(t) {
        r.cwx.reLaunch ? r.cwx.reLaunch({
            url: "/pages/train/index/index"
        }) : r.cwx.switchTab({
            url: "/pages/train/index/index"
        });
    },
    getUserInfo: function() {
        var t = this;
        wx.login({
            success: function() {
                wx.getUserInfo({
                    success: function(e) {
                        t.userInfo = e.userInfo;
                    }
                });
            }
        });
    },
    getSharePath: function() {
        var t = this.data.orderInfo, e = r._.pick(t.trainInfo, "toStation", "toTime", "toDate", "trainNo", "fromStation", "fromDate", "fromTime"), a = r._.pick(this.userInfo, "avatarUrl", "nickName"), i = {
            DepartStation: e.fromStation,
            DepartTime: e.fromTime,
            DepartDate: e.fromDate,
            TrainNumber: e.trainNo,
            ArriveStation: e.toStation,
            ArriveTime: e.toTime,
            ArriveDate: e.toDate
        };
        return "/pages/train/friend/friend?oinfo=" + JSON.stringify(i) + "&userinfo=" + JSON.stringify(a);
    },
    share: function() {
        "JL" == this.data.orderInfo.orderType ? this.goToFriend("jl") : "D" == this.data.orderInfo.orderType && this.goToFriend("e");
    },
    showMask: function() {
        this.setData({
            mask: !0
        });
    },
    hideMask: function() {
        this.setData({
            mask: !1
        });
    },
    hideBackDrop: function() {
        var t = this, e = this.data.showType;
        this.setData({
            isFilterViewAnimation: !1,
            showType: "",
            isShowReviseConfirm: !(!this.data.grabOrder || !this.isOrderChanged())
        }), setTimeout(function() {
            t.setData({
                showFilterView: !1
            });
        }, 300), this.data.isTest && "bank" === e && this.cancelChooseBank(), "newGuest" === e && this.setData({
            isShowNewGuestRedPocket: !0
        });
    },
    goUnionPay: function() {
        var t = this, e = this.data.train;
        S.train = {
            DepartStation: e.DepartureStationName,
            ArriveStation: e.ArrivalStationName
        }, c.default.goUnionPay(this.oid, this.orderInfo.orderTotalPrice, function() {
            t.setData({
                showType: "bank"
            }), t.hideBackDrop();
        });
    },
    showChooseBank: function() {
        var t = this;
        this.setData({
            showType: "bank",
            showFilterView: !0
        }), setTimeout(function() {
            t.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    cancelChooseBank: function() {
        this.hideBackDrop();
    },
    rescheduleTicket: function() {
        var t = this.data.orderInfo.trainInfo;
        S.isReschedule = !0, S.rescheduleInfo = {
            orderInfo: this.data.orderInfo
        }, r.cwx.bookingToDetail = !1, this.navigateTo({
            url: "../list/list?dstation=" + t.fromStation + "&astation=" + t.toStation + "&date=" + t.fromDate + "&isGaotieOnly=false&isReschedule=1"
        });
    },
    setDownload: function() {
        var t = r.cwx.config.isTieyou ? "t.ctrip.cn/erfn3b" : "suanya.cn/train";
        r.cwx.setClipboardData ? r.cwx.setClipboardData({
            data: t,
            success: function(t) {
                u.default.showModal({
                    m: "APP下载链接已复制到剪贴板,打开浏览器粘贴链接即可下载"
                });
            }
        }) : u.default.showModal({
            m: "APP下载链接为" + t + ",打开浏览器输入链接即可下载"
        });
    },
    goTT: function(t) {
        var e = "../timetable/timetable", a = t.currentTarget.dataset, i = a.type, r = void 0 === i ? "" : i, n = a.tIndex;
        if ("resch" !== r) this.navigateTo({
            url: e,
            data: {
                fromStation: this.data.orderInfo.trainInfo.fromStation,
                toStation: this.data.orderInfo.trainInfo.toStation,
                date: this.data.orderInfo.trainInfo.fromDate,
                TrainNumber: this.data.orderInfo.trainInfo.trainNo
            }
        }); else {
            var o = this.data.orderInfo.reScheduleOrders[n].trainInfo;
            this.navigateTo({
                url: e,
                data: {
                    fromStation: o.fromStation,
                    toStation: o.toStation,
                    date: o.fromDate,
                    TrainNumber: o.trainNo
                }
            });
        }
    },
    setOrderFlags: function(t) {
        var e = Object.assign({}, T, {
            JLView: this.data.JLView
        });
        e.oriShareBtn = "success" === t.orderState && t.ticketInfos.filter(function(t) {
            return t.returnFlag && t.reBtnColorType;
        }).length, e.isOrderSuccess = "success" === t.orderState, e.altInfo = ("wait" == t.orderState || "pay" == t.orderState) && (t.alternativeTrainNumber || t.alternativeSeatName || t.alternativeDate), 
        e.isShowBuyAgain = !(0 != t.cancelFlag || t.refundInfo || "wait" != t.orderState || t.isPreHoldSeat && 0 == t.preHoldStatus), 
        e.isShowRobBuySame = 0 == t.cancelFlag && ("wait" == t.orderState || "returned" == t.orderState), 
        e.isRefunded = !!t.refundInfo, e.isShowDownLoad = new d.default(t.trainInfo.fromDate + " " + t.trainInfo.fromTime).getTime() < new Date().getTime(), 
        this.setData(a({}, e));
    },
    setJLOrderFlags: function(t) {
        var e = {
            JLView: !1,
            countdownOrderTips: !1,
            reShareBtn: !1,
            oriShareBtn: !1,
            activity: !1,
            JL_NOTSTART: !1,
            JL_ROBING: !1,
            altInfo: !1
        };
        e.JLView = !0, e.JL_ROBING = !!t.grabSpeedInfo, this.setData(a({}, e)), e.JLView && u.default.setNavigationBarColor({
            backgroundColor: r.cwx.config.isTieyou ? "#fc6e51" : "#5495e6",
            frontColor: "#ffffff"
        });
    },
    setJLDetailInfo: function(t) {
        var e = this, a = [], i = [];
        t.orderInfo.leaveDate && (a = t.orderInfo.leaveDate.split(",")), i = a.map(function(t) {
            return new d.default(t).format("n月j日");
        });
        var r = "";
        r = t.orderInfo.fromStation.name + " - " + t.orderInfo.toStation.name;
        var n = t.orderInfo.seatType, o = t.orderInfo.passenger, s = "", c = [];
        t.grabSpeedInfo && (t.grabSpeedInfo.desc && (s = t.grabSpeedInfo.desc.replace(/<a([^>]*)>([^<]*)<\/a>/gi, ""), 
        s = u.default.convertStr(s)), c = this.data.speedLevels.map(function(e, a) {
            return {
                name: e.name,
                isCurrent: a === t.grabSpeedInfo.speed - 1
            };
        }));
        var f = t.orderInfo.trainNo, h = (i.join(","), r), l = o, m = f, S = n || "", p = s, T = c, v = !(!t.nearTrainInfo || !t.orderInfo.updateFlag), g = this.getInitNearTrainValue(t) || this.data.isNearTrainSwitchSelected;
        Object.assign(t, {
            f_route: h,
            f_passengerNames: l,
            f_acceDesc: p,
            f_speedLevels: T
        }), this.setData({
            grabOrder: t,
            isNearTrainSwitchSelected: g,
            isShowNearTrainInfo: v,
            disabledDates: i,
            disabledSeats: S.split(",")
        }), this.setGrabSpeedData(), this.loadOrderDataPromise.then(function() {
            if (!e.isAltInfoInited || [ 3, 4, 5, 6, 7, 8 ].indexOf(t.orderInfo.monitorStatus) > -1) return e.initAltInfo({
                submitedSeatList: S.split(","),
                submitedTrainNumberList: m.split(","),
                submitedDateList: a
            }).then(function() {
                e.isAltInfoInited = !0;
            });
            e.updateAltInfo(), e.reloadGrabCrossStationInfos().then(function() {
                e.setData({
                    isShowReviseConfirm: !!e.isOrderChanged()
                });
            });
        });
    },
    showJLTips: function() {
        this.setData({
            showType: "jl-tips"
        });
    },
    hideTips: function() {
        this.hideBackDrop();
    },
    onShareAppMessage: function() {
        var t = this.data.grabOrder;
        if (t && t.helpMonitorInfo) {
            return u.default.getRobShareObj({
                shareKey: t.helpMonitorInfo.shareKey,
                arriveStation: t.orderInfo.toStation.name,
                allianceid: this.unionData.allianceid,
                sid: this.unionData.sid,
                shareImgs: this.shareImgs
            });
        }
        return {
            bu: "train",
            path: "/pages/train/index/index"
        };
    },
    addSpeedPackageNum: function() {
        var t = this.data.speedPackageNum + 1;
        this.setSpeedPackageNum(t);
    },
    minusSpeedPackageNum: function() {
        var t = this.data.speedPackageNum - 1;
        this.setSpeedPackageNum(t);
    },
    speedPackageNumInput: function(t) {
        var e = t.detail.value;
        this.setSpeedPackageNum(e);
    },
    speedPackageNumBlur: function(t) {},
    setSpeedPackageNum: function(t) {
        var e = t, a = this.data.speedPackageMaxBuyCount;
        e > a ? e = a : e <= 0 && (e = 0), this.setData({
            speedPackageNum: parseInt(e)
        });
    },
    addSpeedPackageClick: function() {
        var t = this;
        this.setData({
            addSpeedOrConfirmModify: "addSpeed",
            showType: "credit-pay-add-speed-tips"
        }), setTimeout(function() {
            t.addSpeedPackage();
        }, 20);
    },
    addSpeedPackage: function() {
        this.data.orderInfo;
        var t = {
            orderNumber: this.oid,
            speedSum: this.data.speedPackageNum + this.data.grabOrder.orderInfo.speedPacks
        };
        return this.UpdateOrder(t);
    },
    UpdateOrder: function(t) {
        var e = this, a = this.data.addSpeedOrConfirmModify, i = function(t) {
            console.log(t), u.default.showModal({
                m: "系统异常，提交订单失败。我们正在努力修复，请稍候再试。"
            });
        }, r = function() {
            e.loadData(e.oid);
        };
        return (0, s.UpdateGrabOrder)(t).then(function(t) {
            return 1 == t.resultCode ? t.isNeedPay ? (0, s.OrderPay)({
                payType: "weixin",
                orderNumber: t.payOrderNumber
            }).then(function() {
                if ("requestPayment:fail cancel" != (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).errMsg) return e.showTrainToast("抢票详情已更新", "ok"), 
                setTimeout(function() {
                    r();
                }, 200), {
                    successed: !0
                };
            }) : ("addSpeed" === a ? e.setData({
                showType: "credit-pay-add-speed-tips"
            }) : "confirmModify" === a ? e.setData({
                showType: "credit-pay-diff-price-tips"
            }) : e.showTrainToast("抢票详情已更新", "ok"), setTimeout(function() {
                r();
            }, 200), {
                successed: !0
            }) : i();
        }).catch(i);
    },
    chooseOtherDate: function() {
        var t = this.data.otherDates;
        this.showOtherDates(this.data.disabledDates, t);
    },
    chooseOtherSeat: function() {
        var t = this.data.otherSeats;
        this.showOtherSeat(this.data.disabledSeats, t);
    },
    chooseOtherTrain: function() {
        var t = this.data.submitedTrainNumberList.join(","), e = this.data.train.DepartureStationName, a = this.data.train.ArrivalStationName, i = this.data.submitedDateList.join(","), r = this.data.train.DepartureDate, n = this.data.submitedSeatList.join(",");
        this.navigateTo({
            url: "../otherlist/otherlist?TrainNumber=" + t + "&DepartStation=" + e + "&ArriveStation=" + a + "&DepartureDates=" + i + "&DepartureDate=" + r + "&SeatName=" + n
        }), S.chosenTrainList = this.data.chosenTrainList;
    },
    reviseConfirm: function() {
        var t = this;
        this.setData({
            addSpeedOrConfirmModify: "confirmModify"
        });
        var e = [], i = [], r = [], n = this.data, o = n.orderInfo.trainInfo, s = n.otherDates, d = n.chosenTrainNumberList, u = n.otherSeats, c = n.grabOrder;
        e.push(o.fromDate), i.push(o.trainNo), r.push(o.seatName);
        var f = !0, h = !1, l = void 0;
        try {
            for (var m, p = s[Symbol.iterator](); !(f = (m = p.next()).done); f = !0) {
                var T = m.value;
                o.fromDate != T && e.push(T);
            }
        } catch (t) {
            h = !0, l = t;
        } finally {
            try {
                !f && p.return && p.return();
            } finally {
                if (h) throw l;
            }
        }
        var v = !0, g = !1, D = void 0;
        try {
            for (var I, w = d[Symbol.iterator](); !(v = (I = w.next()).done); v = !0) {
                var b = I.value;
                o.trainNo != b && i.push(b);
            }
        } catch (t) {
            g = !0, D = t;
        } finally {
            try {
                !v && w.return && w.return();
            } finally {
                if (g) throw D;
            }
        }
        var N = !0, y = !1, k = void 0;
        try {
            for (var C, L = u[Symbol.iterator](); !(N = (C = L.next()).done); N = !0) {
                var O = C.value;
                o.seatName != O && r.push(O);
            }
        } catch (t) {
            y = !0, k = t;
        } finally {
            try {
                !N && L.return && L.return();
            } finally {
                if (y) throw k;
            }
        }
        var P = !1;
        this.isSameCrossStationSolutions(c.crossStationInfos.map(function(t) {
            return a({}, t, {
                f_extraAmount: t.extraAmount
            });
        }), this.data.CrossStationGrabTicketInfoList) || (P = !0);
        var G = {
            orderNumber: this.oid,
            nearTrainFlag: this.data.isShowNearTrainInfo ? this.data.isNearTrainSwitchSelected ? 1 : 0 : -1,
            trainInfo: {
                fromDate: e.join(","),
                trainNo: i.join(","),
                seatName: r.join(",")
            },
            crossStationFlag: -1
        };
        if (this.data.isShowCrossStationRevise && P) {
            var A = this.data.CrossStationGrabTicketInfoList.filter(function(t) {
                return t.confirmed || t.disabled;
            }).map(function(t) {
                return a({}, t, {
                    extraAmount: t.f_extraAmount,
                    successRate: t.f_successRate
                });
            });
            A.length && (G.crossStationInfos = A, G.crossStationFlag = 1);
        }
        return this.UpdateOrder(G).then(function() {
            (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).successed && (delete S.chosenTrainList, 
            t.isAltInfoInited = !1);
        });
    },
    isOrderChanged: function() {
        var t = this.data, e = t.otherDates, a = void 0 === e ? [] : e, i = t.chosenTrainNumberList, r = void 0 === i ? [] : i, n = t.otherSeats, o = void 0 === n ? [] : n, s = t.grabOrder, d = void 0 === s ? {} : s, c = t.grabOrder, f = (c = void 0 === c ? {} : c).orderInfo, h = f.leaveDate, l = void 0 === h ? "" : h, m = f.trainNo, S = void 0 === m ? "" : m, p = f.seatType, T = void 0 === p ? "" : p;
        return !u.default.arraySame(l.split(","), a) || !u.default.arraySame(S.split(","), r) || !u.default.arraySame(T.split(","), o) || this.getInitNearTrainValue(d) != this.data.isNearTrainSwitchSelected || this.isCrossStationChanged();
    },
    isCrossStationChanged: function() {
        return this.data.CrossStationGrabTicketInfoList.filter(function(t) {
            return t.confirmed;
        }).length;
    },
    initAltInfo: function(t) {
        var a = this, i = t.submitedSeatList, r = void 0 === i ? [] : i, n = t.submitedTrainNumberList, o = void 0 === n ? [] : n, c = t.submitedDateList, f = void 0 === c ? [] : c, h = this.data.train;
        this.setData({
            otherTrainDates: this.getOtherTrainDates(h.DepartureDate)
        });
        var l = {
            DepartStation: h.DepartureStationName,
            ArriveStation: h.ArrivalStationName,
            DepartDate: h.DepartureDate
        };
        return this.showTrainLoading(), (0, s.TrainListPromise)(l).then(function(t) {
            var i = u.default.handleTrains(t.ResponseBody.TrainInfoList, l.DepartDate), n = [].concat(e(r)), s = i.filter(function(t) {
                return o.indexOf(t.TrainNumber) > -1;
            }), c = [].concat(e(f));
            a.setData({
                submitedSeatList: r,
                otherSeats: n,
                submitedTrainNumberList: o,
                chosenTrainList: s,
                submitedDateList: f,
                otherDates: c,
                otherDateStr: c.map(function(t) {
                    return d.default.parse(t).format("n月j日");
                }).join(","),
                disabledDates: f.map(function(t) {
                    return d.default.parse(t).format("n月j日");
                }),
                disabledSeats: r
            }), a.updateAltInfo(), a.GetGrabCrossStationInfos().then(function() {
                a.setData({
                    isShowReviseConfirm: !!a.isOrderChanged()
                });
            }), a.hideTrainLoading();
        }).catch(function(t) {
            console.log(t), a.hideTrainLoading(), u.default.showModal({
                m: "网络异常，请稍后再试。"
            });
        });
    },
    updateAltInfo: function() {
        var t = S.chosenTrainList || this.data.chosenTrainList || [];
        this.setData({
            chosenTrainList: t
        });
        var e = [], a = "";
        r._.isArray(t) && (a = (e = t.map(function(t) {
            return t.TrainNumber;
        })).join(",")), this.setData({
            chosenTrainNumberList: e,
            selectTrainNumberStr: a
        }), this.setSeats();
    },
    setSeats: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.otherTrains, a = void 0 === e ? this.data.chosenTrainList : e, i = t.train, r = (void 0 === i && this.data.train, 
        t.otherSeats), n = void 0 === r ? this.data.otherSeats : r, o = this.getOtherTrainsSeats(a, null), s = this.getOtherTrainsSeatsArr(n, o), d = s.filter(function(t) {
            return t.selected;
        }).map(function(t) {
            return t.SeatName;
        }), u = {
            otherSeats: d,
            otherSeatStr: d.join(","),
            otherTrainsSeatsArr: s
        };
        return this.setData(u), u;
    },
    setGrabSpeedData: function() {
        var t = this.data, e = (t.grabOrder, t.grabOrder), a = e.speedPointConfig, i = (e.helpMonitorInfo, 
        void 0);
        i = e.vipFlag ? Math.floor(a.minCount * a.speedFactor + this.getInviteSpeedpackNumForOne()) : Math.floor(a.minCount + this.getInviteSpeedpackNumForOne());
        for (var r = a.maxCount || 0, n = 0, o = a.speedRange.split(","), s = 0; s < o.length - 1; s++) if (i < o[s + 1]) {
            n = o[s + 1] - i;
            break;
        }
        this.setData({
            speedPackageMaxBuyCount: r,
            speedPackageNum: n
        });
    },
    getInviteSpeedpackNumForOne: function() {
        var t = this.data, e = (t.grabOrder, t.grabOrder), a = (e.speedPointConfig, e.helpMonitorInfo), i = e.passengerList;
        return Math.floor(a.helpMonitorSum / i.length);
    },
    getNewGuestCouponStatus: function() {
        var t = this;
        return this.showTrainLoading(), (0, s.GetHotelAndFlightNewGuestCouponStatusPromise)({}).then(function(e) {
            if (t.hideTrainLoading(), 1 == e.resultCode) {
                var a = e.isHotelNewGuest, i = e.isFlightNewGuest, r = !a || !i;
                t.setData({
                    isHotelNewGuest: a,
                    isFlightNewGuest: i,
                    isCanGetNewGuestGift: r
                });
            }
        }).catch(function() {
            t.hideTrainLoading();
        });
    },
    getNewGuestCoupon: function() {
        this.hideBackDrop(), this.navigateTo({
            url: "../newguestgifts/newguestgifts?type=3"
        });
    },
    toggleNearTrains: function() {
        this.setData({
            isNearTrainSwitchSelected: !this.data.isNearTrainSwitchSelected
        }), this.setData({
            isShowReviseConfirm: !!this.isOrderChanged()
        });
    },
    getInitNearTrainValue: function(t) {
        return !!(t.orderInfo.nearTrainFlag || t.nearTrainInfo && t.nearTrainInfo.defaultOpen);
    },
    GetGrabCrossStationInfos: function() {
        var t = this, e = this.data, a = e.train, i = e.otherDates, r = e.chosenTrainNumberList, n = e.otherSeats, o = {
            departStation: a.DepartureStationName,
            arriveStation: a.ArrivalStationName,
            departDate: a.DepartureDate,
            alternativeTrainNums: r.join(","),
            alternativeTrainSeats: n.join(","),
            alternativeDepartDates: i.join(","),
            fromPage: 1
        };
        return (0, s.GetGrabCrossStationInfosPromise)(o).then(function(e) {
            if (1 == e.resultCode) return u.default.formatCrossSolutions(e.crossStationInfos, t.data.otherTrainsSeatsArr, t.data.disabledSeats);
        }).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = t.data, i = a.grabOrder, r = a.CrossStationGrabTicketInfoList, n = i.crossStationInfos;
            e.forEach(function(t) {
                var e = r.find(function(e) {
                    return u.default.isSameCrossStationSolution(e, t);
                });
                e && e.confirmed && (t.confirmed = !0);
            }), n.forEach(function(t) {
                t.disabled = !0, t.confirmed = !1;
                var a = e.find(function(e) {
                    return u.default.isSameCrossStationSolution(t, e);
                });
                a ? Object.assign(a, t) : e.push(t);
            }), t.setData({
                CrossStationGrabTicketInfoList: e
            });
        }).catch(function(t) {
            console.log("获取跨站抢信息报错"), console.log(t);
        });
    },
    CrossStationGrabTicketToggleItem: function(t) {
        var e = this.data.CrossStationGrabTicketInfoList[t.currentTarget.dataset.index];
        e.disabled || (e.isCrossStationGrabCheckoutSelected = !e.isCrossStationGrabCheckoutSelected, 
        this.setData({
            CrossStationGrabTicketInfoList: this.data.CrossStationGrabTicketInfoList
        }));
    },
    chooseCrossStation: function() {
        var t = this.data.CrossStationGrabTicketInfoList, e = void 0 === t ? [] : t;
        e.forEach(function(t) {
            t.confirmed ? t.isCrossStationGrabCheckoutSelected = !0 : t.isCrossStationGrabCheckoutSelected = !1;
        }), this.setData({
            showType: "cross-station",
            CrossStationGrabTicketInfoList: e
        });
    },
    cancelChooseCrossStation: function() {
        this.hideBackDrop();
    },
    confirmChooseCrossStation: function() {
        var t = this.data.CrossStationGrabTicketInfoList, e = void 0 === t ? [] : t;
        e.forEach(function(t) {
            t.isCrossStationGrabCheckoutSelected ? t.confirmed = !0 : t.confirmed = !1;
        }), this.setData({
            CrossStationGrabTicketInfoList: e
        }), this.hideBackDrop();
    },
    confirmChooseSeatHandler: function(t) {
        this.confirmChooseSeat(t), this.reloadGrabCrossStationInfos();
    },
    reloadGrabCrossStationInfos: function() {
        var t = this, e = this.data.CrossStationGrabTicketInfoList;
        return this.setData({
            CrossStationGrabTicketInfoList: []
        }), this.GetGrabCrossStationInfos().then(function() {
            t.isSameCrossStationSolutions(e, t.data.CrossStationGrabTicketInfoList) || t.showTrainToast("跨站方案已更新", "txt");
        });
    },
    isSameCrossStationSolutions: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if (t.length != e.length) return !1;
        var a = function(t, e) {
            for (var a = [ "recommendDepartStation", "recommendDepartCount", "recommendArriveStation", "recommendArriveCount" ], i = 0; i < a.length; i++) {
                var r = t[a[i]], n = e[a[i]];
                if (r != n) return r - n;
            }
            return 0;
        };
        t.sort(a), e.sort(a);
        for (var i = t.length, r = 0; r < i; r++) {
            var n = t[r], o = e[r];
            if (!(n === o || u.default.isSameCrossStationSolution(n, o) && n.f_extraAmount == o.f_extraAmount)) return !1;
        }
        return !0;
    },
    confirmChooseDateHandler: function(t) {
        this.confirmChooseDate(), this.reloadGrabCrossStationInfos();
    },
    showNearTrainTips: function() {
        this.setData({
            showType: "near-train-tips"
        });
    },
    getShowCrossStationFlag: function() {
        var t = this;
        return (0, s.SetConfigSwitchAsync)("tieyou_wx_opencrossstation").then(function(e) {
            var a = i(e, 1)[0];
            t.setData({
                isShowCrossStationRevise: a
            });
        }).catch(function() {});
    },
    showUserTips: function() {
        this.setData({
            showType: "user-tips"
        });
    },
    refundTicketRescheduled: function(t) {
        var e = t.currentTarget.dataset.tIndex, a = t.currentTarget.dataset.pIndex, i = this.data.orderInfo.reScheduleOrders, r = (void 0 === i ? [] : i)[e].ticketInfos[a];
        return this.refundTicketAction(r, !0, e);
    },
    loadQuestionList: function() {
        var t = this;
        return (0, s.GetQuestionListPromise)({
            OrderId: this.oid
        }).then(function(t) {
            if (t.IsSuccessful && t.CaseDetail) return t.CaseDetail.QuestionList;
        }).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            t.setData({
                QuestionList: e.slice(0, 3)
            });
        });
    },
    goToBuAnswer: function(t) {
        var e = t.currentTarget.dataset.item;
        this.navigateTo({
            url: "../service/service",
            data: {
                item: e,
                oid: this.oid,
                isGetAnswer: !0
            }
        });
    },
    goQuestionList: function() {
        this.navigateTo({
            url: "../service/service",
            data: {
                oid: this.oid,
                isGetAnswer: !1
            }
        });
    },
    showNewGuestModal: function() {
        this.data.isCanGetNewGuestGift && this.data.isOrderSuccess && (n.TrainUserStore.getAttr("isOrderDetailNewGuestMaskShowed") ? this.setData({
            isShowNewGuestRedPocket: !0
        }) : (this.setData({
            showType: "newGuest"
        }), n.TrainUserStore.setAttr("isOrderDetailNewGuestMaskShowed", !0)));
    },
    noop: function() {},
    handleNoTicket: function() {
        var t = this.data.orderInfo.orderStatusDesc, e = t || "", a = e.includes("已售完") || e.includes("占座失败");
        a && (r.cwx.bookingToDetail = !1, this.setData({
            isNoTicket: a
        }), this.getNoTicketRecommend().then(function(t) {}).catch(function(t) {
            return console.log(t);
        }));
    },
    goGrab: function() {
        var t = this.data.orderInfo.trainInfo, e = t ? t.fromStation : "", a = t ? t.toStation : "", i = t ? t.fromDate : "", r = t ? t.trainNo : "";
        e && a && i && r ? this.gotoBookPage(e, a, i, r) : this.showTrainToast("去抢票失败", "fail");
    },
    gotoListPage: function() {
        var t = this.data.orderInfo.trainInfo, e = t ? t.fromStation : "", a = t ? t.toStation : "", i = t ? t.fromDate : "";
        if (e && a && i) {
            var n = "../list/list?dstation=" + e + "&astation=" + a + "&date=" + i;
            r.cwx.navigateTo({
                url: n
            });
        } else this.showTrainToast("获取车次失败", "fail");
    },
    gotoBookPage: function(t, e, a, i) {
        var n = this, o = {
            DepartStation: t,
            ArriveStation: e,
            DepartDate: a,
            trainNo: i
        };
        this.getTrainInfo(o).then(function(t) {
            if (t) {
                S.train = {};
                for (var e in t) S.train[e] = t[e];
                S.selectDate = a, S.train.SeatCount = 0, S.train.isJianLou = !0, S.train.seats && S.train.seats.length > 0 && S.train.SeatList && S.train.SeatList.length > 0 && [ "SeatList", "seats" ].forEach(function(t) {
                    S.train[t].forEach(function(t) {
                        t.SeatName == S.train.SeatName && (t.SeatInventory = 0, t.SeatBookable = !1);
                    });
                }), r.cwx.navigateTo({
                    url: "../booking/booking"
                });
            } else n.showTrainToast("去抢票失败", "fail");
        }).catch(function() {
            n.showTrainToast("去抢票失败", "fail");
        });
    },
    getTrainInfo: function(t) {
        var e = t.DepartStation, a = t.ArriveStation, i = t.DepartDate, r = t.trainNo;
        return (0, s.TrainListPromise)({
            DepartStation: e,
            ArriveStation: a,
            DepartDate: i
        }).then(function(t) {
            return u.default.handleTrains(t.ResponseBody.TrainInfoList, i).find(function(t) {
                return t.TrainNumber == r;
            });
        }).catch(function(t) {
            self.showTrainToast("去抢票失败", "fail");
        });
    },
    getNoTicketRecommend: function() {
        var t = this, e = this.data.orderInfo.trainInfo, a = {
            DepartStation: e ? e.fromStation : "",
            ArriveStation: e ? e.toStation : "",
            DepartDate: e ? d.default.parse(e.fromDate).format("Ymd") : "",
            MainTrainNums: e ? e.trainNo : "",
            FromType: 1
        };
        return (0, s.GetOnTrainThenByTicketSoluPromise)(a).then(function(e) {
            if (0 === e.ResultCode) {
                var a = e.GetOnTrainThenByTicketSoluList ? e.GetOnTrainThenByTicketSoluList : [], i = a && a[0] ? a[0] : null, r = i && i.SolutionInfoList ? i.SolutionInfoList : [], n = {
                    departStation: i.OriginDepartStation,
                    arriveStation: i.OriginArriveStation,
                    departTime: i.OriginDepartTime,
                    arriveTime: i.OriginArriveTime,
                    SpendTime: i.SpendTime,
                    trainNum: i.TrainNum
                };
                n && t.setData({
                    originTrainInfo: n
                }), r.length > 0 && (r.forEach(function(t) {
                    var e = t.SeatInfoList ? t.SeatInfoList : null;
                    e && e.forEach(function(e) {
                        t.seatName || [ "二等座", "一等座", "硬座", "硬卧" ].indexOf(e.SeatType) > -1 && e.SeatCount > 0 && (t.seatName = e.SeatType, 
                        t.seatCount = e.SeatCount, t.seatPrice = e.SeatPrice);
                    });
                }), t.setData({
                    payUponArrivalList: r
                }));
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    showPayUponArrivalTips: function() {
        this.setData({
            showType: "pay-upon-arrival-tips"
        });
    },
    hidePayUponArrivalTips: function() {
        this.setData({
            showType: ""
        });
    },
    clickItemToGrab: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.payUponArrivalList[e], i = a ? a.RecommendDepartStation : "", r = a ? a.RecommendArriveStation : "", n = a ? d.default.parse(a.RecommendDepStationDate).format("Y-m-d") : "", o = this.data.originTrainInfo.trainNum;
        i && r && n && o ? this.gotoBookPage(i, r, n, o) : this.showTrainToast("去抢票失败", "fail");
    }
};

u.default.useMixin(v, [ l.default, m.default, p ]), (0, r.CPage)(v);