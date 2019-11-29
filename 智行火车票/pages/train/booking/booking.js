function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    var a = {};
    for (var i in e) t.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(e, i) && (a[i] = e[i]);
    return a;
}

function a(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

function i(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var r, n = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, s = require("../../../cwx/cwx"), o = require("../common/store"), c = require("../common/model"), d = require("../common/service"), h = e(require("../common/util")), l = e(require("../components/banklist/banklist")), u = e(require("../common/cDate")), f = require("../common/components/tip-bot/tip-bot"), m = require("../common/components/toast/toast"), p = e(require("../common/components/speed-slider/speed-slider")), S = e(require("../common/components/seatChoose/seatChoose")), g = e(require("../common/components/strideTrain/strideTrain")), T = require("../common/activate-card"), v = require("../common/student-service"), P = {
    1: "身份证",
    2: "护照",
    7: "回乡证",
    8: "台胞证"
}, D = s.cwx.train, w = s.cwx.config.isTieyou, y = (0, m.trainToast)(), C = {
    pageId: "10320660961",
    data: (r = {
        isTieyou: w,
        isPreSale: !1,
        train: {},
        isBed: !1,
        departDateStr: "",
        arriveDateStr: "",
        isWorkTime: !0,
        allPas: [],
        memberPas: [],
        packageList: [],
        selectPackage: {},
        mobile: "",
        otherTrains: [],
        otherTrainStr: "",
        otherTrainsSeatsArr: [],
        otherSeats: [],
        otherSeatStr: "",
        otherDates: [],
        otherDateStr: "",
        otherTrainDates: [],
        qiangpiaoEndTime: "",
        jlSuccessRate: "",
        jlTimeLine: {},
        bookingNotice: [],
        showType: "",
        showFilterView: !1,
        isFilterViewAnimation: !1,
        totalPrice: 0,
        isOpenPrice: !1,
        loadingHidden: !0,
        toastHidden: !0,
        toastMessage: "",
        modalHidden: !0,
        noCancel: !0,
        modalContent: "",
        otherTrainsSeats: {}
    }, i(r, "otherTrainDates", []), i(r, "isCheckingBookable", !1), i(r, "isValidateModel", !1), 
    i(r, "isCreatingOrder", !1), i(r, "isRequestID", !1), i(r, "orderNumber", 0), i(r, "isTest", !1), 
    i(r, "checkActiveCardWeak", !1), i(r, "showActivateCardWeakTick", !1), i(r, "activeCardWeakNotice", null), 
    i(r, "scrollTipBotTop", 1), i(r, "showAcceptNoSeat", !1), i(r, "isAcceptNoSeat", !1), 
    i(r, "currentStep", 0), i(r, "computeJLSuccessRateing", !1), i(r, "jLSuccessRate", ""), 
    i(r, "recommendTrainList", []), i(r, "isAlternativeNumberVisible", !1), i(r, "isAlternativeSeatVisible", !1), 
    i(r, "convertStu", !1), i(r, "isShowSpeedSlider", !1), i(r, "availablePoint", 0), 
    i(r, "isChooseSeatOnlineButtonVisible", !0), i(r, "isOpenCrossStation", !0), i(r, "isShowNearTrainFlag", !1), 
    i(r, "isShowCrossStationFlag", !1), i(r, "nearTrainFlag", 0), i(r, "isReschedule", !1), 
    i(r, "isNeedRescheduePay", !1), i(r, "oldOrderInfo", null), i(r, "reschedulePrice", 0), 
    i(r, "submitOrderStep", 0), i(r, "preholdDisplayStep", 0), i(r, "orderInfo", null), 
    i(r, "preHoldPercent", 0), i(r, "isSeatInventoryLow", !1), i(r, "isShowPreholdCloseIcon", !1), 
    i(r, "isOpenWeiXinCreditPay", !1), i(r, "isShowPayWay", !1), i(r, "defaultPayWay", "payFirst"), 
    i(r, "isCreditPaySwitchOn", !1), r),
    onLoad: function(e) {
        console.log("TRN booking onLoad options begin:"), console.log(e), console.log("TRN booking onLoad options end"), 
        delete D.chosenTrainList;
        var t = D.selectDate, a = D.train, i = D.isReschedule, r = void 0 !== i && i, n = (D.rescheduleInfo || {}).orderInfo;
        this.setData({
            isWorkTime: h.default.isWorkTime(),
            isPreSale: new u.default(t).getTime() >= new u.default().addDay(D.preSaleDays - 1).getTime(),
            isReschedule: r,
            oldOrderInfo: n
        }), this.initTrain(a), this.loadDataFromStore(), this.loadData();
    },
    onShow: function(e) {
        if (s.cwx.user.isLogin()) {
            h.default.isTest() && !D.train.isJianLou && this.retSelectPackage(), l.default.init(this);
            var t = D.train;
            t && this.updateTrain(t), this.load12306FromStore(), 1038 == s.cwx.scene && this.isSignCreditPay && this.signedCreditPay(s.cwx.options);
        } else this.data.isNavigating ? this.navigateBack() : (this.setData({
            isNavigating: !0
        }), s.cwx.user.login({
            callback: function(e) {
                0 == e.ReturnCode && (o.TrainBookStore.setAttr("auth", s.cwx.user.auth), this.setData({
                    isNavigating: !1
                }));
            }
        }));
    },
    initTrain: function(e) {
        D.train = e;
        var t = D.selectDate;
        e.DepartureDate = t, e.dayOfweek = u.default.weekday(e.DepartTimeStamp);
        var a = e.SeatName.indexOf("卧") > -1, i = new u.default(t).format("n月j日"), r = new u.default(t).addDay(e.TakeDays).format("n月j日"), n = this.calShowNoSeat(e.SeatName, e.isJianLou);
        this.setData({
            train: e,
            isSeatInventoryLow: this.isSeatInventoryLow(e),
            isBed: a,
            departDateStr: i,
            arriveDateStr: r,
            showAcceptNoSeat: n
        }), this.updateTrain(e), this.updateIsChooseSeatOnlineButtonVisible();
    },
    updateTrain: function(e) {
        var t = D.selectPackage, a = this.getOtherTrainDates();
        this.setData({
            selectPackage: t,
            otherTrainDates: a
        }), this.setOtherTrains(D.chosenTrainList || []), this.setSeats(), s.cwx.user.isLogin() && (this.getUserPointInfo().then(this.resetPrice), 
        this.getPassInfo());
    },
    loadDataFromStore: function() {
        if (o.TrainBookStore.get()) {
            var e = o.TrainBookStore.get(), t = e.allPas || [], a = e.mobile || "";
            this.setData({
                allPas: t,
                mobile: a
            }), this.updateSeatPositionView();
        } else o.TrainBookStore.set({});
    },
    loadData: function() {
        this.getPackageInfo(), this.getConfig(), this.getConfigSwitchActivateCardWeak(), 
        this.getNearTicketFlag(), this.getShowCrossStationFlag();
    },
    getPassInfo: function() {
        var e = this, t = {
            channel: s.cwx.config.partner
        };
        (0, c.TrainGetPassengerListModel)(t, function(t) {
            if (t.TrainPassengerList) {
                var a = e.handleMemPas(t.TrainPassengerList);
                e.setData({
                    memberPas: a
                });
            }
        }, function(e) {});
    },
    handleMemPas: function(e) {
        var t = this, a = [];
        return e = e.filter(function(e) {
            return (1 !== e.PassengerType || 1 === e.PassengerType && e.IdentityNo) && (!e.IsENName && e.CNName || e.IsENName && (e.ENFirstName || e.ENLastName));
        }), s._.each(e, function(e) {
            var i = {};
            i.Birthday = e.Birthday, i.CNName = e.CNName, i.ENFirstName = e.ENFirstName, i.ENLastName = e.ENLastName, 
            i.IdentityNo = e.IdentityNo, i.IdentityType = e.IdentityType, i.IsENName = e.IsENName, 
            i.IsSelf = e.IsSelf, i.PassengerID = e.PassengerID, i.PassengerType = e.PassengerType, 
            i.CheckStatus = e.CheckStatus, i.CheckStatusName = e.CheckStatusName, i.ename = "", 
            e.ENLastName && e.ENFirstName && (i.ename = e.ENLastName + "/" + e.ENFirstName), 
            i.birth = e.Birthday && e.Birthday.split(" ")[0] || "", i.pasID = e.PassengerID, 
            i.cname = e.CNName;
            var r = P[e.IdentityType];
            i.idcard = r ? {
                type: e.IdentityType,
                no: e.IdentityNo,
                text: P[e.IdentityType]
            } : {}, i.isChild = 2 == i.PassengerType, i.pasName = i.IsENName || !i.CNName ? i.ename : i.CNName;
            var n = s._.find(t.data.memberPas, function(e) {
                return e.chosen && e.PassengerID === i.PassengerID;
            });
            i.chosen = !!n, a.push(i);
        }), a;
    },
    clickSeat: function(e) {
        var t = e.currentTarget.dataset.index, a = D.train, i = a.seats[t];
        if (a.SeatName != i.SeatName && this.validateStuPsg({
            seatNames: i.SeatName
        }) && (!this.data.isReschedule || this.validateReschedule(i))) {
            a.SeatName = i.SeatName, a.Price = i.SeatPrice, a.isJianLou = !i.SeatInventory;
            var r = this.calShowNoSeat(a.SeatName, a.isJianLou);
            this.setData({
                train: a,
                showAcceptNoSeat: r,
                isSeatInventoryLow: this.isSeatInventoryLow(a)
            }), this.data.isReschedule ? this.resetReschedulePrice() : (this.updateSeatPositionView(), 
            this.updateIsChooseSeatOnlineButtonVisible(), this.getPackageInfo());
        }
    },
    resetPrice: function() {
        D.train.isJianLou && this.handleJLPrice();
        var e = 0, t = this.data.allPas, a = this.CrossStationGrabTicketGetCrossStationGrabExtraAmount();
        try {
            var i = 0;
            this.data.selectPackage && (i = this.data.selectPackage.PackagePrice);
            var r = this.getSpeedPkgOringalPrice() * t.length - this.data.availablePoint;
            r = r > 0 ? r : 0, e = t.length * (this.data.train.Price + i) + r + t.length * a;
        } catch (e) {
            console.error(e);
        }
        e < 0 && (e = 0), this.setData({
            totalPrice: e,
            CrossStationGrabTicketExtraAmount: a
        }), this.calJLSuccessRate();
    },
    handleJLPrice: function() {
        var e = D.train, t = this.data.otherTrainsSeatsArr, a = t.filter(function(t) {
            return t.SeatName === e.SeatName;
        });
        a.length && (e.Price = a[0].SeatPrice);
        var i = s._.max(t.filter(function(e) {
            return e.selected;
        }).map(function(e) {
            return e.SeatPrice;
        }));
        i > e.Price && (e.Price = i), this.setData({
            train: e
        });
    },
    getConfig: function() {
        var e = this, t = {
            ConfigKey: D.train.isJianLou ? "ProductWX_ElectronicTicketActionDesc" : "ProductWX_DeliveryTicketActionDesc"
        };
        (0, c.ConfigInfoModel)(t, function(t) {
            if (200 == t.code) {
                var a = JSON.parse(t.data);
                if (a.ConfigInfo && a.ConfigInfo.Content) {
                    var i = JSON.parse(a.ConfigInfo.Content);
                    e.setData({
                        bookingNotice: i
                    });
                }
            }
        }, function(e) {});
    },
    getPackageInfo: function() {
        var e = this;
        this.showTrainLoading();
        var t = {
            UserId: s.cwx.clientID ? s.cwx.clientID : "",
            Channel: "tieyouwx",
            ClientId: "",
            Platform: s.cwx.util.systemInfo.model,
            AppVersion: s.cwx.util.systemInfo.version,
            DepartStation: D.train.DepartStation,
            ArriveStation: D.train.ArriveStation,
            DepartDate: D.selectDate + " " + D.train.DepartTime + ":00",
            TrainNumber: D.train.TrainNumber,
            SeatName: D.train.SeatName,
            OrderType: D.train.isJianLou ? "JL" : "E",
            IsMember: !!s.cwx.user.isLogin(),
            VendorID: D.train.isJianLou ? 6 : 1,
            ExtendInfo: ""
        };
        (0, c.GetTrainTicketDetailModel)(t, function(t) {
            if (D.train.isJianLou) {
                if (!t.JLTimeLine || !t.JLTimeLine.RecDateTime) return h.default.showModal({
                    m: t.ResultMessage || "距离发车时间太近，无法抢票，换个车次试试吧"
                });
                var a = t.JLTimeLine.RecDateTime.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
                if (a) {
                    var i = t.JLTimeLine, r = (a[1], a[2], a[3], a[4], a[5], a[6], a[2] + "月" + a[3] + "日 " + a[4] + ":" + a[5]);
                    e.setData({
                        jlTimeLine: i,
                        qiangpiaoEndTime: r
                    });
                }
            }
            if (!D.train.isJianLou && t.TrainPackageProductList && t.TrainPackageProductList.length > 0 && (!e.data.isTest || D.train.isJianLou)) {
                var n = t.TrainPackageProductList[0], s = t.TrainPackageProductList;
                D.packageList = s, D.selectPackage = n, e.setData({
                    packageList: s,
                    selectPackage: n
                }), e.resetPrice();
            } else t.ResultMessage && h.default.showModal({
                m: t.ResultMessage
            }), e.retSelectPackage();
        }, function(e) {}, function() {
            e.hideTrainLoading();
        });
    },
    onReady: function() {
        var e = this;
        s.cwx.mkt.getUnion(function(t) {
            return e.unionData = t;
        });
    },
    onUnload: function() {
        clearTimeout(this.displayPreholdId), clearTimeout(this.preholdSeatId), clearTimeout(this.showPreholdCloseIconTimer), 
        o.TrainBookStore.setAttr("mobile", this.data.mobile), delete D.chosenTrainList, 
        this.savePas();
    },
    goTT: function() {
        this.navigateTo({
            url: "../timetable/timetable",
            data: {
                fromStation: this.data.train.DepartStation,
                toStation: this.data.train.ArriveStation,
                date: new u.default(D.selectDate).format("Y-m-d"),
                TrainNumber: this.data.train.TrainNumber
            }
        });
    },
    chooseOtherTrain: function() {
        var e = this.data.train, t = e.TrainNumber, a = e.DepartStation, i = e.ArriveStation, r = e.SeatName, n = e.DepartureDate, s = n;
        this.navigateTo({
            url: "../otherlist/otherlist?TrainNumber=" + t + "&DepartStation=" + a + "&ArriveStation=" + i + "&DepartureDate=" + n + "&DepartureDates=" + s + "&SeatName=" + r
        });
    },
    chooseOtherSeat: function() {
        var e = this, t = this.data.otherSeats, a = this.data.otherTrainsSeatsArr;
        a.forEach(function(e, i) {
            t.indexOf(e.SeatName) >= 0 ? a[i].selected = !0 : a[i].selected = !1;
        }), this.setData({
            otherTrainsSeatsArr: a,
            showFilterView: !0,
            showType: "otherSeats"
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    getOtherTrainsDates: function() {
        for (var e = new u.default(this.data.train.DepartTimeStamp), t = [], a = [], i = 0; i < 3; i++) {
            var r = e.getTime() - 864e5 * (i + 1);
            if ((r = new Date(r)) <= new Date().getTime()) {
                var n = e.getTime() + 864e5 * (i + 1), s = new u.default(n), o = s.format("n月j日");
                a.push({
                    millinSeconds: n,
                    monthDayStr: o,
                    dayStr: s.format("Y-m-d"),
                    weekDay: s.format("D") || s.format("w")
                });
            } else {
                var c = e.getTime() + 864e5 * (i + 1), d = new u.default(c), h = d.format("n月j日"), l = e.getTime() - 864e5 * (i + 1), f = new u.default(l), m = f.format("n月j日");
                a.push({
                    millinSeconds: c,
                    monthDayStr: h,
                    dayStr: d.format("Y-m-d"),
                    weekDay: d.format("D") || d.format("w")
                }), t.push({
                    millinSeconds: l,
                    monthDayStr: m,
                    dayStr: f.format("Y-m-d"),
                    weekDay: f.format("D") || f.format("w")
                });
            }
        }
        t = t.reverse();
        var p = {
            millinSeconds: e.getTime(),
            monthDayStr: e.format("n月j日"),
            dayStr: e.format("Y-m-d"),
            weekDay: e.format("D") || e.format("w")
        };
        return t.concat(p).concat(a);
    },
    chooseOtherDate: function() {
        var e = this, t = this.data.otherDates, a = this.data.otherTrainDates;
        a.forEach(function(e, i) {
            t.indexOf(e.dayStr) >= 0 ? a[i].selected = !0 : a[i].selected = !1;
        }), this.setData({
            showFilterView: !0,
            showType: "otherDates",
            otherTrainDates: a
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    selectDate: function(e) {
        var t = this.data.otherTrainDates, a = t[e.currentTarget.dataset.index];
        a.monthDayStr != this.data.departDateStr && (a.selected = !a.selected, this.setData({
            otherTrainDates: t
        }));
    },
    confirmChooseDate: function() {
        var e = [], t = [];
        this.data.otherTrainDates.forEach(function(a) {
            a.selected && (e.push(a.dayStr), t.push(a.monthDayStr));
        }), this.setData({
            otherDates: e,
            otherDateStr: t.toString()
        }), this.hideBackDrop();
    },
    cancelChooseDate: function() {
        var e = this.data.otherDates;
        this.data.otherTrainDates.forEach(function(t) {
            e.indexOf(t.dayStr) ? t.selected = !0 : t.selected = !1;
        }), this.hideBackDrop();
    },
    selectSeat: function(e) {
        var t = D.train, a = e.currentTarget.dataset.index, i = this.data.otherTrainsSeatsArr, r = i[a];
        if (r.SeatName != t.SeatName) {
            if (r.selected) r.selected = !1; else {
                if (i.filter(function(e) {
                    return e.selected;
                }).length >= 2) return this.showTrainToast("最多选择两个", "fail");
                r.selected = !0;
            }
            this.setData({
                otherTrainsSeatsArr: i
            });
        }
    },
    confirmChooseSeat: function() {
        var e = this, t = [];
        this.data.otherTrainsSeatsArr.forEach(function(e) {
            e.selected && t.push(e.SeatName);
        }), this.setData({
            otherSeats: t,
            otherSeatStr: t.join(",")
        }), this.getCrossStationGrabTicketInfo().then(function() {
            e.resetPrice();
        }), this.hideBackDrop();
    },
    cancelChooseSeat: function() {
        this.hideBackDrop();
    },
    showJLExplain: function() {
        this.setData({
            showType: "jlExplain"
        });
    },
    updateChildInfo: function() {
        for (var e = this.data.allPas, t = s._.find(e, function(e) {
            return !e.isChild;
        }), a = [], i = 0; i < e.length; i++) 1 == e[i].isChild && a.push(i);
        for (var r = 0; r < a.length; r++) e[a[r]].idcard = t.idcard;
        this.setData({
            allPas: e
        });
    },
    showPas: function() {
        var e = this, t = this;
        if (!s.cwx.user.isLogin()) return s.cwx.user.login({
            callback: function(e) {
                "0" == e.ReturnCode && t.setData({
                    showType: "pas"
                });
            }
        });
        var a = this.data.allPas.map(function(e) {
            return e.PassengerID;
        });
        this.tempList = this.data.allPas;
        var i = this.data.memberPas;
        s._.each(i, function(e) {
            a.indexOf(e.PassengerID) > -1 ? e.chosen = !0 : e.chosen = !1;
        }), this.setData({
            showFilterView: !0,
            showType: "pas",
            memberPas: i,
            scrollTipBotTop: 1
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    cancelPasChoose: function() {
        this.setData({
            allPas: this.tempList
        }), this.hideBackDrop();
    },
    confirmPasChoose: function() {
        var e = this.data.memberPas.filter(function(e) {
            return e.chosen;
        });
        this.setData({
            allPas: e
        }), this.resetPrice(), this.updateSeatPositionView(), this.hideBackDrop();
    },
    addNewPas: function() {
        D.pas = void 0, this.navigateTo({
            url: "../passenger/index"
        });
    },
    choosePas: function(e) {
        var t = this.data.memberPas.filter(function(e) {
            return e.chosen;
        }), a = e.currentTarget.dataset.index, i = this.data.memberPas[a];
        if (!(i.isChild || i.idcard.text && i.idcard.no)) return this.showTrainToast("请先补全证件信息", "fail");
        if (this.validateStuPsg({
            stuPsgs: [ i ]
        })) {
            if (i.chosen) i.chosen = !1; else {
                if (5 == t.length) return h.default.showModal({
                    m: "一个订单最多只能添加5名乘客，超过请分批购买"
                });
                if (i.isChild && !this.checkAddable(t)) return h.default.showModal({
                    m: "儿童不能单独出行，请先添加成人"
                });
                i.chosen = !0;
            }
            this.setData({
                memberPas: this.data.memberPas
            });
        }
    },
    editPas: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.memberPas[t];
        D.pas = a, this.navigateTo({
            url: "../passenger/index"
        });
    },
    deletePas: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.allPas;
        if (!this.checkDeletable(a[t])) return this.showTrainToast("请先删除儿童", "fail");
        a.splice(t, 1), this.setData({
            allPas: a
        }), this.savePas(), this.resetPrice(), this.updateSeatPositionView();
    },
    savePas: function() {
        var e = this.data.allPas;
        o.TrainBookStore.setAttr("allPas", e);
    },
    checkAddable: function(e) {
        return s._.find(e, function(e) {
            return !e.isChild;
        });
    },
    checkDeletable: function(e) {
        var t = !1, a = !1, i = this.data.allPas;
        return 1 == e.isChild || (s._.each(i, function(i) {
            i.isChild ? t = !0 : i.PassengerID != e.PassengerID && (a = !0);
        }), !t || a);
    },
    mobileInput: function(e) {
        this.setData({
            mobile: e.detail.value
        }), e.detail.value.length >= 11 && s.cwx.hideKeyboard();
    },
    goInsurance: function() {
        this.navigateTo({
            url: "../package/package"
        });
    },
    showTips: function() {
        var e = this;
        this.setData({
            showType: "tips"
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    hideTips: function() {
        var e = this;
        "tips-active-card-weak" === this.data.showType && s.cwx.setNavigationBarTitle({
            title: "订单填写"
        }), this.setData({
            isFilterViewAnimation: !0
        }), setTimeout(function() {
            e.setData({
                showType: ""
            });
        }, 200);
    },
    hideBackDrop: function() {
        var e = this;
        "prehold" !== this.data.showType ? ("login-12306" === this.data.showType && this.load12306FromStore(), 
        this.setData({
            isFilterViewAnimation: !1,
            showType: ""
        }), setTimeout(function() {
            e.setData({
                showFilterView: !1
            });
        }, 300), this.data.isTest && this.data.orderNumber && this.cancelChooseBank()) : this.isAfter30 && (this.setData({
            showType: ""
        }), this.goDetail(this.data.orderNumber));
    },
    openPrice: function() {
        var e = this;
        this.data.isOpenPrice ? this.hidePrice() : (this.setData({
            isOpenPrice: !0
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10));
    },
    hidePrice: function() {
        var e = this;
        this.setData({
            isFilterViewAnimation: !1
        }), setTimeout(function() {
            e.setData({
                isOpenPrice: !1
            });
        }, 300);
    },
    submit: function() {
        var e = this;
        if (this.validatePassenger() && this.validateInput() && this.validateStuPsg()) if (s.cwx.user.auth && s.cwx.user.isLogin()) {
            var t = D.train.isJianLou, a = this.data.isCreditPaySwitchOn, i = this.data.isOpenWeiXinCreditPay;
            t ? a ? i ? this.validatePsgInfo() : this.setData({
                isShowPayWay: !0
            }) : (this.setData({
                isShowPayWay: !1
            }), this.checkBookable()) : this.checkBookable();
        } else s.cwx.user.login({
            callback: function(t) {
                e.getPackageInfo();
            }
        });
    },
    validatePassenger: function() {
        return !!this.data.allPas.length || (this.showTrainToast("请添加乘客", "fail"), !1);
    },
    validateInput: function() {
        return this.data.mobile ? !!h.default.isMobile(this.data.mobile) || (this.showTrainToast("请输入正确的手机号", "fail"), 
        !1) : (this.showTrainToast("输入手机号", "fail"), !1);
    },
    checkBookable: function() {
        var e = this, t = this;
        if (!(this.data.isCheckingBookable || this.data.isValidateModel || this.data.isCreatingOrder || this.data.isRequestID)) {
            if (D.train.isJianLou) return t.validatePsgInfo();
            this.setData({
                isCheckingBookable: !0
            }), this.showTrainLoading("正在提交订单...");
            var a = {
                checi: D.train.TrainNumber,
                from: D.train.DepartStation,
                to: D.train.ArriveStation,
                date: D.selectDate
            };
            (0, c.CheckBookableModel)(a, function(e) {
                if (200 == e.code) {
                    if (s._.isEmpty(e.data) || s._.isEmpty(e.data[0].seats)) return t.validatePsgInfo();
                    var a = e.data[0].seats;
                    for (var i in a) if (a[i].seat_name == D.train.SeatName) {
                        if (1 == a[i].seat_bookable) break;
                        return void h.default.showModal({
                            m: e.Message || "很抱歉，该车次座席暂时无法预订，请更换其它座席"
                        });
                    }
                    return t.validatePsgInfo();
                }
                h.default.showModal({
                    m: e.Message || "很抱歉，该车次暂时无法预订，请更换其它车次"
                });
            }, function(e) {}, function() {
                e.hideTrainLoading(), e.setData({
                    isCheckingBookable: !1
                });
            });
        }
    },
    validatePsgInfo: function() {
        var e = this, t = this, a = this.data.allPas, i = "";
        if (s._.each(a, function(e) {
            e.isChild || "1" != e.idcard.type || (i += "" != i ? "^" + (e.pasName || "").trim().toUpperCase() + "@" + e.idcard.no.toUpperCase() + "@" + e.PassengerID : (e.pasName || "").trim().toUpperCase() + "@" + e.idcard.no.toUpperCase() + "@" + e.PassengerID);
        }), "" != i) {
            var r = {
                datas: i
            };
            this.setData({
                isValidateModel: !0
            }), (0, c.ValidateModel)(r, function(a) {
                if (a.code > 0) {
                    if ("" == !a.failShow) {
                        a.failShow = a.failShow.substr(1, a.failShow.length);
                        var i = a.failShow.split("#"), r = "乘客";
                        return s._.each(i, function(e, t) {
                            r += "乘客" == r ? e.split("@")[0] : "、" + e.split("@")[0];
                        }), void (r && (t.hideTrainLoading(), h.default.showModal({
                            m: r + "的身份信息未通过核验不能网络买票，请确认姓名证件是否正确，或持有效证件去线下火车站或代售点核验购票。"
                        })));
                    }
                    "" == !a.okShow && (e.setData({
                        submitOrderStep: 1
                    }), e.submitOrder(0));
                } else t.hideTrainLoading(), h.default.showModal({
                    m: "乘客身份信息核验失败"
                });
            }, function(t) {
                e.submitOrder(0);
            }, function() {
                e.setData({
                    isValidateModel: !1
                });
            });
        } else this.submitOrder(0);
    },
    getCardType: function(e) {
        var t = "";
        switch (e) {
          case 2:
            t = "护照";
            break;

          case 4:
            t = "军人证";
            break;

          case 7:
            t = "回乡证";
            break;

          case 8:
            t = "台胞证";
            break;

          case 10:
            t = "港澳通行证";
            break;

          case 22:
            t = "台湾通行证";
            break;

          default:
            t = "身份证";
        }
        return t;
    },
    getPassengerInfo: function() {
        var e = this, t = this.data.allPas, a = "";
        return s._.each(t, function(t) {
            var i = 3 != t.PassengerType ? t.isChild ? "儿童票" : "成人票" : e.data.convertStu ? "成人票" : "学生票", r = t.pasName.trim().toUpperCase() + "," + e.getCardType(parseInt(t.idcard.type)) + "," + t.idcard.no.toUpperCase() + "," + i + "," + (t.birth || t.idcard.birth) + "," + (parseInt(e.data.selectPackage.PackagePrice) > 0 ? 1 : 0);
            1 == t.isChild && (r = (t.pasName ? t.pasName.trim().toUpperCase() : t.CNName.trim().toUpperCase()) + "," + e.getCardType(parseInt(t.idcard.type)) + "," + t.idcard.no.toUpperCase() + "," + i + "," + t.birth + "," + (parseInt(e.data.selectPackage.PackagePrice) > 0 ? 1 : 0)), 
            a.indexOf(r) < 0 && ("" != a && (a += "|"), a += r);
        }), a;
    },
    submitGrabOrder: function() {
        var e = this, t = this;
        if (this.data.speedSlider.selectedItem.speedPkgNums || o.TrainUserStore.getAttr("popupForLowestShowed")) return (0, 
        d.GetUserPointInfoPromise)().then(function(t) {
            if (t.resultCode && 1 == t.resultCode) {
                if (t.AvailablePoint >= e.data.speedSlider.selectedItem.speedPkgNums || t.AvailablePoint === e.data.availablePoint) return e.createGrabOrder();
                e.setData({
                    availablePoint: t.AvailablePoint
                }), e.resetPrice();
            } else e.getUserPointInfo().then(e.resetPrice);
            e.ubtTrace(101591, {
                code: 1
            }), e.showTrainToast("您的订单金额有更新", "fail");
        });
        o.TrainUserStore.setAttr("popupForLowestShowed", !0), h.default.showModal({
            m: "选择低速可能会影响您的出票速度，确定要以低速抢票吗？",
            confirmText: "考虑一下",
            showCancel: !0,
            cancelText: "继续预订",
            done: function(e) {
                e.confirm || t.createGrabOrder();
            }
        });
    },
    submitOrder: function(e) {
        var t = this;
        if (this.updateChildInfo(), D.train.isJianLou) return this.submitGrabOrder();
        e++;
        var a = this.unionData, i = a.allianceid, r = void 0 === i ? 0 : i, n = a.sid, o = void 0 === n ? 0 : n, c = a.ouid, d = void 0 === c ? 0 : c, h = {};
        if (h.clientIp = "", h.clientId = "", h.reqTime = "", h.clientInfo = "", h.appVersion = "", 
        h.deviceId = "", h.sign = "", h.token = "", h.partnerName = s.cwx.config.partner, 
        h.source = s.cwx.config.channel4, h.trainNumber = D.train.TrainNumber, h.fromDate = D.selectDate.replace(/-/g, ""), 
        h.fromTime = D.train.DepartTime, h.fromName = D.train.DepartStation, h.toName = D.train.ArriveStation, 
        h.seatName = D.train.SeatName, h.ticketNum = this.data.allPas.length, h.userIdentity = this.getPassengerInfo(), 
        h.userAreaId = "", h.userAddress = "", h.contacts = "", h.userMobile = this.data.mobile, 
        h.orderType = D.train.isJianLou ? "JL" : D.train.isAcceptDelivery ? "P" : "E", h.orderChannel = s.cwx.config.channel2, 
        h.receiver = "", h.receiveMobile = "", h.receiveZipcode = "", h.receiveAddress = "", 
        h.couponNo = "", h.mediaClientDesc = r && o ? "aid=" + r + "|sid=" + o + "|ouid=" + d : "", 
        h.packageId = "", h.appendProduct = {
            packageId: this.data.selectPackage.PackageID,
            productId: []
        }, h.privateCustomization = "", h.remark = "", h.acceptSeat = this.data.isAcceptNoSeat && this.calShowNoSeat(D.train.SeatName, D.train.isJianLou) ? "无座" : "", 
        h.jlKeepTime = "", h.isOffsetTicket = "", h.alternativeDate = this.data.otherDates.length > 0 ? this.data.otherDates.join(",").replace(/-/g, "") : "", 
        h.alternativeTrainNumber = this.data.otherTrainStr.length > 0 ? this.data.otherTrainStr : "", 
        h.alternativeSeatName = this.data.otherSeatStr.length > 0 ? this.data.otherSeatStr : "", 
        h.ticketPrice = "", h.preSaleDay = "", h.preSaleTime = "", h.inventory = "", h.useTime = "", 
        h.pId = "", h.userName12306 = this.data.login12306Name, h.userPass12306 = this.data.login12306Pas, 
        h.cookie12306 = "", h.email = "", h.passengerList = "", h.bindCardFlag = this.data.showActivateCardWeakTick && !D.train.isJianLou ? 1 : 0, 
        h.acceptBindCardFlag = this.data.checkActiveCardWeak && this.data.showActivateCardWeakTick && !D.train.isJianLou ? 1 : 0, 
        this.data.isChooseSeatOnlineButtonVisible) {
            var l = [];
            [ "A", "B", "C", "D", "F" ].forEach(function(e) {
                t.data.seatPositionInfo.selectedSeats.row0[e] && l.push("1" + e), t.data.seatPositionInfo.selectedSeats.row1[e] && l.push("2" + e);
            }), h.selectedSeats = l.length > 0 ? l.join(",") : void 0;
        }
        this.createOrder(e, h);
    },
    createOrder: function(e, t) {
        var a = this, i = this;
        i.showTrainLoading("正在提交订单..."), this.setData({
            isCreatingOrder: !0
        }), (0, c.OrderCreateModel)(t, function(r) {
            if ("-96" != r.resultCode) return 1 != r.resultCode ? (i.hideTrainLoading(), void h.default.showModal({
                m: r.resultMessage
            })) : void (1 == r.isPreHoldSeat || i.data.showActivateCardWeakTick && !D.train.isJianLou ? (i.hideTrainLoading(), 
            s.cwx.bookingToDetail = !0, 1 == r.isPreHoldSeat ? (a.showPreholdCloseIconTimer = setTimeout(function() {
                a.isAfter30 = !0, a.setData({
                    isShowPreholdCloseIcon: !0
                });
            }, 3e4), Promise.all([ i.loadPreHoldData(r.orderNumber), i.displayPreholdStatus() ]).then(function() {
                a.goDetail(r.orderNumber);
            })) : i.data.checkActiveCardWeak ? (0, T.StartActivateCardWeak)(t.userMobile, i.data.allPas, r.orderNumber).then(function() {
                r.isPreHoldSeat ? i.goDetail(r.orderNumber) : (i.showTrainLoading(), setTimeout(function() {
                    i.hideTrainLoading(), i.goDetail(r.orderNumber);
                }, 5e3));
            }) : i.goDetail(r.orderNumber)) : i._pay(r));
            s.cwx.user.login({
                callback: function(t) {
                    "0" == t.ReturnCode && i.submitOrder(++e);
                }
            });
        }, function(t) {
            e >= 3 ? (i.hideTrainLoading(), h.default.showModal({
                m: "系统异常，提交订单失败。我们正在努力修复，请稍候再试。"
            })) : i.submitOrder(++e);
        }, function() {
            i.setData({
                isCreatingOrder: !1
            });
        });
    },
    _pay: function(e) {
        function t() {
            wx.redirectTo({
                url: "../orderdetail/orderdetail?oid=" + e.orderNumber + (e.jlview ? "&jlview=1" : "")
            });
        }
        var a = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = this, n = {
            order_number: e.orderNumber,
            Channel: s.cwx.config.channel3,
            partner: s.cwx.config.partner
        }, o = {
            title: D.train.DepartStation + " ⇀ " + D.train.ArriveStation,
            amount: this.data.totalPrice
        };
        (0, d.RequestSignPay)({
            params: n,
            token: o
        }, {
            sbackCallback: t,
            ebackCallback: t,
            rejectCb: function() {
                i < 3 ? r._pay(e, i + 1) : (r.showTrainToast("系统异常，请至订单详情页重新支付！", "fail"), setTimeout(function() {
                    a.goDetail(e.OrderId);
                }, 1500));
            }
        });
    },
    goDetail: function(e) {
        clearTimeout(this.displayPreholdId), clearTimeout(this.preholdSeatId), clearTimeout(this.showPreholdCloseIconTimer);
        var t = "../orderdetail/orderdetail?oid=" + e;
        wx.redirectTo({
            url: t
        });
    },
    selectReschedulePas: function(e) {
        var t = this.data.oldOrderInfo, a = t.ticketInfos[e.currentTarget.dataset.index];
        a.reScheduleFlag && (a.isSelected = !a.isSelected, this.setData({
            oldOrderInfo: t
        }), this.resetReschedulePrice());
    },
    confirmReschedule: function() {
        this.doReschedule();
    },
    doReschedule: function() {
        var e = this;
        if (this.validateReschedule()) {
            var t = this.data.oldOrderInfo, a = this.data.train, i = D.selectDate + " " + D.train.DepartTime, r = new u.default(D.selectDate).addDay(a.TakeDays).format("Y-m-d") + " " + D.train.ArriveTime, n = {
                originalElectronicLongNums: t.ticketInfos.filter(function(e) {
                    return e.isSelected;
                }).map(function(e) {
                    return e.electronicLongNum;
                }).join(","),
                originalOrderNumber: t.tyOrderNo,
                trainNumber: a.TrainNumber,
                departStationName: a.DepartStation,
                arriveStationName: a.ArriveStation,
                departTime: i,
                arriveTime: r,
                ticketPrice: this.data.reschedulePrice,
                seatName: a.SeatName
            };
            (0, c.AddReScheduleOrderOutModel)(n, function(t) {
                1 != t.resultCode ? h.default.showModal({
                    m: t.resultMessage || "改签失败，请稍后重试"
                }) : (e.showTrainToast("改签已提交，正在帮你扣位中", "ok"), setTimeout(function() {
                    e.hideTrainLoading(), s.cwx.navigateBack({
                        delta: 2
                    });
                }, 1e3));
            }, function(e) {
                console.log(e), h.default.showModal({
                    m: data.Message || "改签失败，请稍后重试"
                });
            });
        }
    },
    payReschedule: function() {
        this.doReschedule();
    },
    showChooseBank: function(e) {
        var t = this;
        this.setData({
            showType: "bank",
            showFilterView: !0,
            orderNumber: e
        }), setTimeout(function() {
            t.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    goUnionPay: function() {
        var e = this;
        l.default.goUnionPay(this.data.orderNumber, this.data.totalPrice, function() {
            e.setData({
                orderNumber: 0
            }), e.hideBackDrop();
        });
    },
    showChooseSelf: function() {
        var e = this;
        this.setData({
            showType: "self",
            showFilterView: !0
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    chooseSelf: function(e) {
        this.data.allPas[e.currentTarget.dataset.index];
        this.hideBackDrop();
    },
    setSelfInfo: function(e) {
        this.setData({
            selfInfo: e
        }), D.selfInfo = e;
    },
    cancelChooseBank: function() {
        var e = this.data.orderNumber;
        this.setData({
            orderNumber: 0
        }), wx.redirectTo({
            url: "../orderdetail/orderdetail?oid=" + e
        });
    },
    showLogin12306: function() {
        var e = this;
        this.setData({
            showFilterView: !0,
            showType: "login-12306"
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    retSelectPackage: function() {
        var e = {
            PackageID: 0,
            PackagePrice: 0
        };
        D.selectPackage = e, this.setData({
            selectPackage: e,
            packageList: []
        }), this.resetPrice();
    },
    toggleReadActiveCardWeak: function(e) {
        this.setData({
            checkActiveCardWeak: !this.data.checkActiveCardWeak
        });
    },
    showTipsActiveCardWeak: function(e) {
        s.cwx.setNavigationBarTitle({
            title: "线上账户服务条款"
        }), this.data.activeCardWeakNotice ? this.setData({
            showType: "tips-active-card-weak"
        }) : this.getConfigActiveVirtualCardWeakInstr();
    },
    getConfigActiveVirtualCardWeakInstr: function() {
        var e = this, t = {
            ConfigKey: w ? "tieyou_wx_open_virtual_card_weak_instr" : "zhixing_wx_open_virtual_card_weak_instr"
        };
        this.showTrainLoading(), (0, c.ConfigInfoModel)(t, function(t) {
            if (e.hideTrainLoading(), 200 == t.code) {
                var a = JSON.parse(t.data);
                if (a.ConfigInfo && a.ConfigInfo.Content) {
                    var i = void 0;
                    try {
                        i = JSON.parse(a.ConfigInfo.Content);
                    } catch (e) {
                        i = {}, console.log(e);
                    }
                    e.setData({
                        activeCardWeakNotice: i,
                        showType: "tips-active-card-weak"
                    }), setTimeout(function() {
                        e.setData({
                            isFilterViewAnimation: !0
                        });
                    }, 10);
                }
            }
        }, function(t) {
            e.hideTrainLoading();
        });
    },
    getConfigSwitchActivateCardWeak: function() {
        var e = this, t = {
            ConfigKey: "wx_open_virtual_card_weak"
        };
        (0, c.ConfigInfoModel)(t, function(t) {
            if (200 == t.code) {
                var a = JSON.parse(t.data);
                if (a.ConfigInfo && a.ConfigInfo.Content) {
                    var i = parseInt(a.ConfigInfo.Content), r = s.cwx.ABTestingManager.valueForKeySync("170817_trh_rbkk");
                    console.log("170817_trh_rbkk: ", r), "B" !== r && (i = !1), e.setData({
                        showActivateCardWeakTick: !!i,
                        checkActiveCardWeak: !!i
                    });
                }
            }
        }, function(e) {});
    },
    getConfigSwitchActivateCrossStation: function() {
        var e = this, t = {
            ConfigKey: "wx_open"
        };
        (0, c.ConfigInfoModel)(t, function(t) {
            if (200 == t.code) {
                var a = JSON.parse(t.data);
                if (a.ConfigInfo && a.ConfigInfo.Content) {
                    var i = parseInt(a.ConfigInfo.Content), r = s.cwx.ABTestingManager.valueForKeySync("170817_trh_rbkk");
                    console.log("170817_trh_rbkk: ", r), "B" !== r && (i = !1), e.setData({
                        showActivateCardWeakTick: !!i,
                        checkActiveCardWeak: !!i
                    });
                }
            }
        }, function(e) {});
    },
    preventBackMove: function(e) {},
    scrollTipBot: function(e) {
        e.detail && 0 == e.detail.scrollTop && this.setData({
            scrollTipBotTop: 1
        });
    },
    toggleNoSeat: function() {
        this.setData({
            isAcceptNoSeat: !this.data.isAcceptNoSeat
        });
    },
    calShowNoSeat: function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0], arguments[1];
        return !1;
    },
    getOtherTrainDates: function() {
        for (var e = new u.default(this.data.train.DepartTimeStamp), t = [], a = [], i = 0; i < 3; i++) {
            var r = e.getTime() - 864e5 * (i + 1);
            if ((r = new Date(r)) <= new Date().getTime()) {
                var n = e.getTime() + 864e5 * (i + 1), s = new u.default(n), o = s.format("n月j日");
                a.push({
                    millinSeconds: n,
                    monthDayStr: o,
                    dayStr: s.format("Y-m-d"),
                    weekDay: s.format("D") || s.format("w")
                });
            } else {
                var c = e.getTime() + 864e5 * (i + 1), d = new u.default(c), h = d.format("n月j日"), l = e.getTime() - 864e5 * (i + 1), f = new u.default(l), m = f.format("n月j日");
                a.push({
                    millinSeconds: c,
                    monthDayStr: h,
                    dayStr: d.format("Y-m-d"),
                    weekDay: d.format("D") || d.format("w")
                }), t.push({
                    millinSeconds: l,
                    monthDayStr: m,
                    dayStr: f.format("Y-m-d"),
                    weekDay: f.format("D") || f.format("w")
                });
            }
        }
        t = t.reverse();
        var p = {
            millinSeconds: e.getTime(),
            monthDayStr: e.format("n月j日"),
            dayStr: e.format("Y-m-d"),
            weekDay: e.format("D") || e.format("w")
        };
        return t.concat(p).concat(a);
    },
    getOtherTrainsSeatsArr: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return e.forEach(function(e) {
            t[e] && (t[e].selected = !0);
        }), Object.keys(t).map(function(e) {
            return n({
                SeatName: e,
                selected: !1
            }, t[e]);
        });
    },
    getOtherTrainsSeats: function(e, t) {
        var a = function(e, t) {
            e[t.SeatName] ? parseFloat(t.SeatPrice) > e[t.SeatName].SeatPrice && (e[t.SeatName] = {
                SeatPrice: parseFloat(t.SeatPrice)
            }) : e[t.SeatName] = {
                SeatPrice: parseFloat(t.SeatPrice)
            };
        };
        return e.concat(t).map(function(e) {
            return e.SeatList;
        }).reduce(function(e, t) {
            return t.forEach(function(t) {
                a(e, t);
            }), e;
        }, {});
    },
    setSeats: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.otherTrains, a = void 0 === t ? this.data.otherTrains : t, i = e.train, r = void 0 === i ? D.train : i, n = e.otherSeats, s = void 0 === n ? this.data.otherSeats : n, o = this.getOtherTrainsSeats(a, r), c = this.getOtherTrainsSeatsArr(s, o), d = c.filter(function(e) {
            return e.selected;
        }).map(function(e) {
            return e.SeatName;
        }), h = {
            otherSeats: d,
            otherSeatStr: d.join(","),
            otherTrainsSeatsArr: c
        };
        return this.setData(h), h;
    },
    setOtherTrains: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.otherTrains, t = {
            otherTrains: e,
            otherTrainStr: e.map(function(e) {
                return e.TrainNumber;
            }).join(",")
        };
        return D.chosenTrainList = e, this.setData(t), t;
    },
    validateStuPsg: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = t.stuPsgs, i = void 0 === a ? this.data.allPas : a, r = t.seatNames, n = void 0 === r ? [ this.data.train.SeatName ] : r, s = t.dates, o = void 0 === s ? [ D.selectDate ] : s, c = function() {
            e.setData({
                convertStu: !0
            });
        };
        if (this.data.convertStu) return !0;
        "string" == typeof n && (n = [ n ]), "string" == typeof o && (o = [ o ]), i = i.filter(function(e) {
            return 3 == e.PassengerType;
        });
        var d = (0, v.isValidationForStu)({
            stuPsgs: i,
            seatNames: n,
            dates: o
        });
        return !!d.isPass || (h.default.showModal({
            m: d.errMsg,
            showCancel: !0,
            confirmText: d.btnName,
            cancelText: "成人票",
            done: function(e) {
                e.cancel && c();
            }
        }), !1);
    },
    goNextStep: function() {
        var e = this;
        this.validatePassenger() && this.validateInput() && (this.initSpeedSlider(), this.setData({
            currentStep: 1
        }), D.chosenTrainList && D.chosenTrainList.length > 0 ? this.setData({
            isAlternativeNumberVisible: !1
        }) : this.setData({
            isAlternativeNumberVisible: !0
        }), this.data.otherSeatStr ? this.setData({
            isAlternativeSeatVisible: !1
        }) : this.setData({
            isAlternativeSeatVisible: !0
        }), this.data.otherTrainStr || (this.getGrabTicketRecommendTrainList(), this.data.isOpenCrossStation && this.getCrossStationGrabTicketInfo()), 
        this.getCreidtPaySwitch().then(function() {
            e.data.isCreditPaySwitchOn ? e.getCreditPayInfo().then(function() {
                e.getDefaultPayWay();
            }) : e.setData({
                defaultPayWay: "payFirst",
                isOpenWeiXinCreditPay: !1
            });
        }).catch(function(e) {}));
    },
    calJLSuccessRate: function() {
        var e = this;
        1 === this.data.currentStep && (this.setData({
            computeJLSuccessRateing: !0
        }), (0, c.GetJLSuccessRateModel)(this.getJLSuccessRateParams(), function(t) {
            var a = t.SuccessRate;
            e.setData({
                jLSuccessRate: (100 * a).toFixed(1)
            });
        }, function(e) {}, function() {
            e.setData({
                computeJLSuccessRateing: !1
            });
        }));
    },
    getJLSuccessRateParams: function() {
        if (this.data.train) {
            var e = this.data.allPas.length, t = this.data.train, i = t.DepartStation, r = t.ArriveStation, n = t.DepartureDate, s = t.DepartTime, o = (t.TrainNumber, 
            t.SeatName), c = t.IsStartStation, d = t.IsEndStation, l = (t.DepartTimeStamp, [].concat(a(this.data.otherTrains), [ this.data.train ])), u = l.map(function(e) {
                return e.TrainNumber;
            }), f = this.data.otherDateStr, m = o + (this.data.otherSeatStr ? "," + this.data.otherSeatStr : ""), p = l.map(function(e) {
                return e.DepartStation;
            }), S = l.map(function(e) {
                return e.ArriveStation;
            }), g = l.map(function(e) {
                return e.DepartTimeStamp;
            }), T = h.default.getTrainTypes(u).join(",");
            return {
                DepartStation: i,
                ArriveStation: r,
                TrainNumber: u.join(","),
                SeatName: m,
                JLAlternativeDate: f,
                IsStartStation: c,
                IsEndStation: d,
                TicketCount: e,
                DepartDateTime: n.replace(/-/g, "") + s.replace(":", "") + "00",
                PackagePrice: this.getSpeedPkgOringalPrice(),
                Channel: "ctriph5",
                GrabType: 0,
                IsAllDayJL: !1,
                UserJLEndTime: h.default.calJLEndTime(g),
                AllDepartStation: p.join(","),
                AllArriveStation: S.join(","),
                JLKeepTime: 0,
                TrainTypes: T
            };
        }
    },
    getGrabTicketRecommendTrainList: function() {
        var e = this;
        h.default.showLoading();
        var t = this.data.train, a = t.DepartStation, i = t.ArriveStation, r = t.DepartureDate, n = t.TrainNumber, o = t.SeatName;
        (0, c.GrabTicketRecommendTrainListModel)({
            Channel: "ctriph5",
            FromType: 0,
            DepartStation: a,
            ArriveStation: i,
            DepartDates: r,
            TrainNumbers: n,
            SeatNames: o
        }, function(t) {
            s._.isArray(t.RecommendListBySuccessRate) && e.setData({
                recommendTrainList: t.RecommendListBySuccessRate.filter(function(e, t) {
                    return t < 3;
                })
            });
        }, function(e) {
            console.log(e);
        }, function() {
            h.default.hideLoading();
        });
    },
    toggleRecommendTrain: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.recommendTrainList, i = D.chosenTrainList || [], r = a[t];
        if (!r.current && i.length >= D.maxOtherAmount) return h.default.showToast("最多选择" + D.maxOtherAmount + "个");
        r.current = !r.current, this.toggleList(i, r), D.chosenTrainList = i, this.setData({
            recommendTrainList: a,
            otherTrains: i
        }), this.updateTrain(D.train);
    },
    toggleList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], a = t.TrainNumber, i = (t.SeatList, 
        e.map(function(e) {
            return e.TrainNumber;
        }).indexOf(a));
        return -1 !== i ? e.splice(i, 1) : e.push(t), e;
    },
    selectSeatInStep1: function(e) {
        var t = D.train, a = e.currentTarget.dataset.index, i = this.data.otherTrainsSeatsArr, r = i[a];
        r.SeatName != t.SeatName && (r.selected = !r.selected, this.setData({
            otherTrainsSeatsArr: i
        }), this.confirmChooseSeat());
    },
    improveGrabSuccessRate: function() {
        if (!this.data.computeJLSuccessRateing) {
            D.train;
            if (this.data.isAlternativeNumberVisible) {
                var e = this.data.otherTrains, t = this.data.recommendTrainList;
                t.forEach(function(t) {
                    s._.find(e, function(e) {
                        return e.TrainNumber === t.TrainNumber;
                    }) || (t.current = !0, e.push(t));
                }), this.setData({
                    recommendTrainList: t
                }), this.setOtherTrains(e);
            }
            this.setSeats();
            var a = this.data.speedSlider.items;
            this.speedSliderSetLevel(a.length - 1).then(this.resetPrice);
        }
    },
    createGrabOrder: function() {
        var e = this, a = this, i = {};
        i.mobile = this.data.mobile, i.contactMobile = this.data.mobile, i.productCodes = this.data.selectPackage.PackageID, 
        i.bookType = 1001, i.userName = "", i.password = "", i.bindCardFlag = 0, i.acceptBindCardFlag = 0, 
        "creditPay" == this.data.defaultPayWay && (i.bookType = 1002), i.passengerList = this.data.allPas.map(function(e) {
            return {
                passengerName: e.pasName ? e.pasName.trim().toUpperCase() : e.CNName.trim().toUpperCase(),
                passengerType: 3 != e.PassengerType ? e.isChild ? "儿童票" : "成人票" : a.data.convertStu ? "成人票" : "学生票",
                identityType: a.getCardType(parseInt(e.idcard.type)),
                identityNo: e.idcard.no.toUpperCase()
            };
        }), i.trainInfo = {
            trainNo: D.train.TrainNumber + (this.data.otherTrainStr.length > 0 ? "," + this.data.otherTrainStr : ""),
            seatName: D.train.SeatName + (this.data.otherSeatStr.length > 0 ? "," + this.data.otherSeatStr : ""),
            fromName: D.train.DepartStation,
            toName: D.train.ArriveStation,
            fromDate: D.selectDate + (this.data.otherDates.length > 0 ? "," + this.data.otherDates.join(",") : "")
        }, i.nearTrainFlag = this.data.nearTrainFlag, i.crossStationFlag = 0, this.data.CrossStationGrabTicketInfoList && this.data.CrossStationGrabTicketInfoList.length > 0 && (this.data.isShowCrossStationFlag && (i.crossStationFlag = this.data.CrossStationGrabTicketInfoList.filter(function(e) {
            return e.isCrossStationGrabCheckoutSelected;
        }).length ? 1 : 0), i.crossStationInfos = this.data.CrossStationGrabTicketInfoList.filter(function(e) {
            return e.isCrossStationGrabCheckoutSelected;
        }).map(function(e) {
            e.isCrossStationGrabCheckoutSelected, e.recommendContent, e.extraAmountInfos;
            var a = t(e, [ "isCrossStationGrabCheckoutSelected", "recommendContent", "extraAmountInfos" ]);
            return a.extraAmount = a.f_extraAmount, a.successRate = a.f_successRate, a;
        })), this.data.speedSlider.selectedItem && (i.speedSum = this.data.speedSlider.selectedItem.speedPkgNums);
        var r = function(e) {
            h.default.showModal({
                m: e && e.resultMessage || "系统异常，提交订单失败。我们正在努力修复，请稍候再试。"
            });
        };
        return this.showTrainLoading(), (0, d.CreateGrabOrderPromise)(i).then(function(t) {
            if (t.resultCode && 1 == t.resultCode) if (t.isNeedPay) e._pay({
                orderNumber: t.orderNumber,
                OrderId: t.orderNumber,
                jlview: 1
            }); else {
                var a = "../orderdetail/orderdetail?oid=" + t.orderNumber + "&jlview=1";
                wx.redirectTo({
                    url: a
                });
            } else e.hideTrainLoading(), r(t);
        }).catch(function(t) {
            e.hideTrainLoading(), r();
        });
    },
    toggleSpeedSlider: function() {
        this.setData({
            isShowSpeedSlider: !this.data.isShowSpeedSlider
        }), this.initSpeedSlider();
    },
    initSpeedSlider: function() {
        var e = this;
        (0, d.GetSpeedLvlName)().then(function(t) {
            var a = t.map(function(e) {
                return n({}, e, {
                    title: e.name
                });
            }), i = 2;
            e.data.train.Price > 200 && (i = 3);
            var r = e.data.speedSlider.index;
            0 == r && (r = i);
            var s = [ r, a, e.data.allPas.length, "speedSliderChangeHandler" ];
            e.data.isShowSpeedSlider ? e.speedSliderInit.apply(e, s) : e.speedSliderModelInit.apply(e, s);
        });
    },
    getUserPointInfo: function() {
        var e = this;
        return (0, d.GetUserPointInfoPromise)().then(function(t) {
            if (1 == t.resultCode) return e.setData({
                availablePoint: t.AvailablePoint
            }), t.AvailablePoint;
        });
    },
    getSpeedPkgOringalPrice: function() {
        var e = this.data.speedSlider.selectedItem;
        return e ? e.speedPkgNums * this.data.speedSlider.costPrice : 0;
    },
    speedSliderChangeHandler: function() {
        this.resetPrice();
    },
    updateIsChooseSeatOnlineButtonVisible: function() {
        var e = this.data.train;
        this.setData({
            isChooseSeatOnlineButtonVisible: h.default.isChoosingCRM(e.SeatName) && h.default.isCDGTrain(e.TrainNumber) && !e.isJianLou,
            "seatPositionInfo.currentSeatName": e.SeatName
        });
    },
    updateSeatPositionView: function() {
        this.setData({
            "seatPositionInfo.isSecondRowVisible": this.data.allPas.length >= 2,
            "seatPositionInfo.pasNumber": this.data.allPas.length
        }), this["seatChoose-reset"]();
    },
    getNearTicketFlag: function() {
        var e = this, t = {
            ConfigKey: "tieyou_wx_openneartrain"
        };
        (0, d.GetConfigInfoPromise)(t).then(function(t) {
            t.ConfigInfo && "1" == t.ConfigInfo.Content && e.setData({
                isShowNearTrainFlag: !0
            });
        }).catch(function() {});
    },
    getShowCrossStationFlag: function() {
        var e = this, t = {
            ConfigKey: "tieyou_wx_opencrossstation"
        };
        (0, d.GetConfigInfoPromise)(t).then(function(t) {
            t.ConfigInfo && "1" == t.ConfigInfo.Content && e.setData({
                isShowCrossStationFlag: !0
            });
        }).catch(function() {});
    },
    nearTrainSwitch: function(e) {
        e.detail.value ? this.data.nearTrainFlag = 1 : this.data.nearTrainFlag = 0;
    },
    getCrossStationGrabTicketInfo: function() {
        var e = this, t = {
            departStation: this.data.train.DepartStation,
            arriveStation: this.data.train.ArriveStation,
            departDate: this.data.train.DepartureDate.replace(/-/g, ""),
            alternativeTrainNums: [ this.data.train.TrainNumber ].concat(a(this.data.otherTrainStr ? this.data.otherTrainStr.split(",") : "")).join(","),
            alternativeDepartDates: [ this.data.train.DepartureDate ].concat(a(this.data.otherDates)).map(function(e) {
                return e.replace(/-/g, "");
            }).join(","),
            alternativeTrainSeats: [ this.data.train.SeatName ].concat(a(this.data.otherSeats)).join(","),
            fromPage: 0
        };
        return (0, d.GetGrabCrossStationInfosPromise)(t).then(function(t) {
            var a = t.resultCode, i = t.crossStationInfos;
            1 == a && i.length > 0 && (h.default.formatCrossSolutions(i, e.data.otherTrainsSeatsArr, [ e.data.train.SeatName ]), 
            e.setData({
                CrossStationGrabTicketInfoList: i.map(function(e) {
                    return Object.assign(e, {
                        isCrossStationGrabCheckoutSelected: !1
                    });
                })
            }));
        });
    },
    CrossStationGrabTicketToggleItem: function(e) {
        var t = this.data.CrossStationGrabTicketInfoList[e.currentTarget.dataset.index];
        t.isCrossStationGrabCheckoutSelected = !t.isCrossStationGrabCheckoutSelected, this.setData({
            CrossStationGrabTicketInfoList: this.data.CrossStationGrabTicketInfoList
        }), this.resetPrice();
    },
    showNearTrainTips: function() {
        var e = this;
        this.setData({
            showType: "near-train-tips",
            showFilterView: !0
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    showCrossTips: function() {
        var e = this;
        this.setData({
            showType: "cross-tips",
            showFilterView: !0
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    resetReschedulePrice: function() {
        var e = this.data.oldOrderInfo, t = this.data.train.Price * e.ticketInfos.filter(function(e) {
            return e.isSelected;
        }).length;
        e.orderTotalPrice, this.setData({
            reschedulePrice: t,
            isNeedRescheduePay: !1
        });
    },
    validateReschedule: function(e) {
        var t = this.data.oldOrderInfo;
        t.ticketInfos;
        if (!e) {
            var a = D.train.SeatList.filter(function(e) {
                return e.SeatName === D.train.SeatName;
            });
            e = a.length && a[0];
        }
        if (!s._.some(t.ticketInfos, function(e) {
            return e.isSelected;
        })) return h.default.showModal({
            m: "请选择改签乘客"
        }), !1;
        var i = t.ticketInfos.filter(function(e) {
            return e.isSelected && e.reScheduleFlag;
        }), r = t.ticketInfos.filter(function(e) {
            return !e.isSelected && e.reScheduleFlag;
        });
        return i.filter(function(e) {
            return e.passengerType.indexOf("儿童票") > -1;
        }).length == i.length || r.filter(function(e) {
            return e.passengerType.indexOf("儿童票") > -1;
        }).length == r.length && r.length ? (h.default.showModal({
            m: "儿童不可单独出行，请勾选成人一同改签"
        }), !1) : e && e.SeatInventory > 0 && e.SeatBookable ? !(-1 !== e.SeatName.indexOf("卧") && t.ticketInfos.filter(function(e) {
            return e.isSelected;
        }).length > 1) || (h.default.showModal({
            m: "很抱歉，卧铺不支持同时多人改签，请分开改签"
        }), !1) : (h.default.showModal({
            m: "暂时不支持改签抢，请选择其它坐席或车次"
        }), !1);
    },
    loadPreHoldData: function(e) {
        var t = this;
        e || (e = this.oid), this.setData({
            showType: "prehold",
            orderNumber: e
        });
        var a = function(a) {
            a && console.error(a), t.setData({
                showType: ""
            }), t.goDetail(e);
        }, i = {
            orderNumber: e,
            clientId: "",
            reqTime: "",
            clientInfo: "",
            appVersion: s.cwx.util.systemInfo.version,
            deviceId: "",
            partnerName: s.cwx.config.partner
        };
        return clearTimeout(this.preholdSeatId), (0, d.PreHoldSeatPercentResultPromise)(i).then(function(i) {
            var r = s.cwx.getCurrentPage();
            if (r && r.pageId == t.pageId) {
                if (3 != i.resultCode) {
                    if (1 == i.resultCode) {
                        if (t.data.preholdDisplayStep < 4) return void t.setData({
                            preholdDisplayStep: 5
                        });
                        var n = 200, o = !1, c = !1, d = function() {
                            if (c) o = !0; else {
                                var a = t.data.preHoldPercent + Math.round(5 * Math.random()) + 1;
                                if (a > 100) return t.loadOrderData(e).then(function(e) {
                                    e.resultCode && t.setData({
                                        orderInfo: e
                                    }), a = 100, t.setData({
                                        preHoldPercent: a,
                                        preholdDisplayStep: 5
                                    }), n = 1e3, c = !0;
                                });
                                t.setData({
                                    preHoldPercent: a
                                });
                            }
                        };
                        return function e() {
                            if (!o) {
                                var a = h.default.wait(n), i = a.promise, r = a.timeoutId;
                                return t.preholdSeatId = r, i.then(d).then(e);
                            }
                        }();
                    }
                    var l = 0, u = 80, f = 1e3 * (i.requestRate > 0 ? i.requestRate : 4), m = function() {
                        if (!(t.data.preholdDisplayStep < 4)) {
                            var e = t.data.preHoldPercent + Math.round(2 * Math.random());
                            e > 80 && (u = 1e3), e > 99 && (e = 99), t.setData({
                                preHoldPercent: e
                            });
                        }
                    };
                    return function a() {
                        if (l * u < f) {
                            l++;
                            var i = h.default.wait(u), r = i.promise, n = i.timeoutId;
                            return t.preholdSeatId = n, r.then(m).then(a);
                        }
                        return t.loadPreHoldData(e);
                    }();
                }
                a();
            }
        }).catch(a);
    },
    displayPreholdStatus: function() {
        var e = this;
        clearTimeout(this.displayPreholdId);
        var t = !1, a = function() {
            e.setData({
                preholdDisplayStep: e.data.preholdDisplayStep + 1
            });
        }, i = [ {
            keyPercent: 12,
            fn: a
        }, {
            keyPercent: 25,
            fn: a
        }, {
            keyPercent: 36,
            fn: a
        }, {
            keyPercent: 49,
            fn: function() {
                a(), t = !0;
            }
        } ], r = i.shift(), n = 0, s = function() {
            n = e.data.preHoldPercent, n += 1, e.setData({
                preHoldPercent: n
            }), r && n >= r.keyPercent && (r.fn(), r = i.shift());
        };
        return function a() {
            if (!t) {
                var i = h.default.wait(100), r = i.promise, n = i.timeoutId;
                return e.displayPreholdId = n, r.then(s).then(a);
            }
        }();
    },
    loadOrderData: function(e) {
        var t = this, a = h.default.getDeferred();
        e || (e = this.oid);
        var i = {
            orderNumber: e,
            partnerName: s.cwx.config.partner,
            source: s.cwx.config.channel4
        }, r = function() {
            t.goDetail(e);
        };
        return (0, c.OrderDetailModel)(i, function(e) {
            e.resultCode && (e && e.ticketInfos || r(), a.resolve(e));
        }, function(e) {
            r();
        }, function() {}), a.promise;
    },
    isSeatInventoryLow: function(e) {
        var t = e.SeatList.filter(function(t) {
            return t.SeatName === e.SeatName;
        })[0];
        return !!(t && t.SeatInventory < 10);
    },
    getCreditPayInfo: function() {
        var e = this, t = {
            orderChannel: s.cwx.config.channel5,
            partnerName: s.cwx.config.partner,
            clientInfo: s.cwx.config.clientInfo || "",
            reqTime: "" + new Date().getTime()
        };
        return (0, d.QueryCreditPayPromise)(t).then(function(t) {
            t.resultCode && 1 === t.resultCode && t.creditPayInfos.forEach(function(t) {
                "weixinapp" === t.payType && e.setData({
                    isOpenWeiXinCreditPay: t.isOpen
                });
            });
        }).catch(function(e) {
            return console.log(e);
        });
    },
    getDefaultPayWay: function() {
        try {
            var e = wx.getStorageSync("defaultPayWay");
            "creditPay" == e && this.data.isOpenWeiXinCreditPay && this.setData({
                defaultPayWay: e
            });
        } catch (e) {}
    },
    hidePayWay: function() {
        this.setData({
            isShowPayWay: !1
        });
    },
    payFirst: function() {
        try {
            wx.setStorageSync("defaultPayWay", "payFirst");
        } catch (e) {}
        this.setData({
            defaultPayWay: "payFirst"
        }), this.data.isOpenWeiXinCreditPay || this.checkBookable(), this.hidePayWay();
    },
    payLater: function() {
        if (this.data.isOpenWeiXinCreditPay) {
            this.setData({
                defaultPayWay: "creditPay"
            });
            try {
                wx.setStorageSync("defaultPayWay", "creditPay");
            } catch (e) {}
        } else this.signCreditPay();
        this.hidePayWay();
    },
    signCreditPay: function() {
        var e = {
            payType: "weixin",
            orderChannel: s.cwx.config.channel5,
            partnerName: s.cwx.config.partner,
            clientInfo: s.cwx.config.clientInfo || "",
            reqTime: "" + new Date().getTime(),
            deviceId: s.cwx.clientID || "",
            clientId: s.cwx.clientID || ""
        }, t = this;
        (0, d.SignCreditPayPromise)(e).then(function(e) {
            if (e.resultCode && 1 === e.resultCode) {
                var a = {
                    appId: "wxbd687630cd02ce1d",
                    path: "pages/index/index",
                    extraData: JSON.parse(e.signInfo),
                    success: function(e) {
                        t.isSignCreditPay = !0;
                    },
                    fail: function(e) {},
                    complete: function(e) {}
                };
                s.cwx.navigateToMiniProgram(a);
            } else t.showTrainToast("免密付开通失败", "fail");
        }).catch(function(e) {
            return console.log(e);
        });
    },
    signedCreditPay: function(e) {
        var t = this, a = e.referrerInfo, i = a.appId, r = a.extraData;
        if ("wxbd687630cd02ce1d" == i) {
            if (void 0 === r) return void this.getCreditPayInfo().then(function() {
                if (t.data.isOpenWeiXinCreditPay) {
                    t.showTrainToast("免密付开通成功", "ok"), t.setData({
                        defaultPayWay: "creditPay"
                    });
                    try {
                        wx.setStorageSync("defaultPayWay", "creditPay");
                    } catch (e) {}
                    t.validatePsgInfo();
                } else t.showTrainToast("免密付开通失败", "fail");
            }).catch(function(e) {});
            if ("SUCCESS" == r.return_code) {
                this.showTrainToast("免密付开通成功", "ok"), this.setData({
                    defaultPayWay: "creditPay"
                });
                try {
                    wx.setStorageSync("defaultPayWay", "creditPay");
                } catch (e) {}
                this.validatePsgInfo();
            } else this.showTrainToast("免密付开通失败", "fail");
        }
    },
    changePayWay: function() {
        this.setData({
            isShowPayWay: !0
        });
    },
    getCreidtPaySwitch: function() {
        var e = this, t = {
            ConfigKey: "tieyou_wx_booking_opencreditpay"
        };
        return (0, d.GetConfigInfoPromise)(t).then(function(t) {
            t.ConfigInfo && "1" == t.ConfigInfo.Content && e.setData({
                isCreditPaySwitchOn: !0
            });
        }).catch(function(e) {
            return console.log(e);
        });
    }
};

h.default.useMixin(C, [ f.login12306, y, p.default, S.default, g.default ]), (0, 
s.CPage)(C);