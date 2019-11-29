function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a, i = require("../../../cwx/cwx"), s = require("../common/model"), r = (require("../../train/common/model"), 
e(require("../common/cDate"))), n = e(require("../common/util")), o = require("../common/store"), d = require("../../flight/common/model"), c = e(require("../common/utilPassenger")), l = i.cwx.flight, h = i.cwx.common;

(0, i.CPage)({
    pageId: "10650001976",
    data: (a = {
        canIUseRichText: wx.canIUse("rich-text"),
        flight: {},
        cabinDetailList: [],
        additionalProducts: [],
        invoiceRelateInfo: null,
        orderRemark: [],
        totalPrice: 0,
        priceDetail: {},
        needSendBill: !1,
        mobile: "",
        invoiceTitle: "",
        invoiceTax: "",
        contactName: "",
        contactAddress: "",
        coupon: null,
        proInfo: [],
        isSupportAdultChild: !0,
        hasChildSeat: !0,
        hasBabySeat: !0,
        adultAmount: 0,
        childAsAdultAmount: 0,
        childAmount: 0,
        babyAmount: 0,
        maxInventory: 0,
        minPassengerNum: 0,
        maxPassengerNum: 0,
        ageLimit: [],
        isCompositionPrice: !1,
        repeatOrderCancel: !1,
        enterTimeMillis: 0,
        passengers: [],
        passengerSels: [],
        showFilterView: !1,
        isFilterViewAnimation: !1,
        showType: "",
        flightStartDate: "",
        supportedPasType: [ "成人票" ],
        supportedIdType: [],
        supportedInvoiceType: [ {
            code: "1",
            name: "个人抬头"
        }, {
            code: "2",
            name: "公司抬头"
        }, {
            code: "1",
            name: "行政机关"
        } ],
        selectedInvoice: {
            code: "2",
            name: "公司抬头"
        },
        isTransfer: !1,
        timeArray: [],
        rescheduleRefundRemark: ""
    }, t(a, "showType", null), t(a, "productType", null), a),
    onLoad: function(e) {
        console.log(l), this.data.enterTimeMillis = new Date().getTime();
        var t = l.flight, a = l.cabinDetail, i = l.couponInfo;
        this.bindFlight(t), this.bindCabinDetail(a), this.bindCoupon(i), this.loadDataFromStore();
    },
    bindFlight: function(e) {
        var t = l.isTransfer, a = l.timeArray;
        console.log(t), e.modifyDate = e.departTime.slice(5, 10) + " " + r.default.weekday(e.departTime.split(" ")[0]) + " " + e.departTime.split(" ")[1].slice(0, 5);
        var i = e.departTime.slice(0, 10);
        this.setData({
            isTransfer: t,
            timeArray: a,
            flight: e,
            flightStartDate: i
        });
    },
    bindCabinDetail: function(e) {
        var t = e.cabinDetailList, a = e.additionalProducts, i = e.invoiceRelateInfo, s = e.rescheduleRefundRemark, r = e.productType, n = [];
        -1 == e.orderRemark.indexOf("<br>") ? e.orderRemark.split("</font>").forEach(function(e) {
            e && e.length && n.push(e.split(">")[1]);
        }) : e.orderRemark.split("<br>").forEach(function(e) {
            e.split("</font>").forEach(function(e) {
                e && e.length && n.push(e.split(">")[1]);
            });
        });
        for (var o in t) 0 != this.data.maxInventory ? this.data.maxInventory = this.data.maxInventory > t[o].cabinOverview.inventory ? t[o].cabinOverview.inventory : this.data.maxInventory : this.data.maxInventory = t[o].cabinOverview.inventory, 
        t[o].flightOverview.hasChildTicket || (this.data.hasChildSeat = !1), t[o].flightOverview.hasBabyTicket || (this.data.hasBabySeat = !1), 
        t[o].isSupportAdultChild || (this.data.isSupportAdultChild = !1);
        this.data.hasChildSeat && this.data.supportedPasType.push("儿童票"), this.data.hasBabySeat && this.data.supportedPasType.push("婴儿票"), 
        1 == t.length && (this.data.minPassengerNum = t[0].minPassengerNum, this.data.maxPassengerNum = t[0].maxPassengerNum, 
        t[0].passengerAgeLimit && t[0].passengerAgeLimit.length > 0 && (this.data.ageLimit = t[0].passengerAgeLimit.split(",")), 
        this.data.isCompositionPrice = t[0].isCompositionPrice), this.data.supportedIdType = e.supportIdentities, 
        this.setData({
            cabinDetailList: t,
            additionalProducts: a,
            invoiceRelateInfo: i,
            orderRemark: n,
            hasChildSeat: this.data.hasChildSeat,
            hasBabySeat: this.data.hasBabySeat,
            isSupportAdultChild: this.data.isSupportAdultChild,
            rescheduleRefundRemark: s,
            productType: r
        }), this.doFavCheck();
    },
    bindCoupon: function(e) {
        var t = null;
        e.couponPrice && (t = {
            couponDisplayName: e.couponName,
            couponCode: e.couponNumber,
            couponId: e.couponId,
            couponPrice: e.couponPrice
        }), this.setData({
            coupon: t
        }), h.selectedCoupon = this.data.coupon;
    },
    loadDataFromStore: function() {
        if (o.FlightBookStore.get()) {
            var e = o.FlightBookStore.get(), t = e.passengerSels || [], a = e.mobile || "", s = e.invoiceTitle || "", r = e.invoiceTax || "", n = e.contactName || "", d = e.contactAddress || "";
            if (t && t.length > 0) for (var c = 0; c < t.length; c++) t[c].passengerType = this.getFlightPasType(t[c]), 
            t[c].ticketType = t[c].passengerType, t[c] && "婴儿票" != t[c].passengerType || t.splice(c, 1);
            a || (a = i.cwx.user.userName || ""), this.data.ageLimit && this.data.ageLimit.length > 0 && (t = []), 
            this.setData({
                passengerSels: t,
                mobile: a,
                invoiceTitle: s,
                invoiceTax: r,
                contactName: n,
                contactAddress: d
            });
        } else o.FlightBookStore.set({}), this.setData({
            mobile: i.cwx.user.userName || ""
        });
        this.refreshPrice();
    },
    checkBill: function(e) {
        var t = e.detail.value;
        this.setData({
            needSendBill: t
        }), this.refreshPrice();
    },
    mobileInput: function(e) {
        this.setData({
            mobile: e.detail.value
        }), 11 == e.detail.value.length && wx.hideKeyboard();
    },
    clickInvoiceType: function(e) {
        var t = e.currentTarget.dataset.index;
        this.data.selectedInvoice = this.data.supportedInvoiceType[t], this.setData({
            selectedInvoice: this.data.selectedInvoice
        });
    },
    invoiceTitleInput: function(e) {
        this.setData({
            invoiceTitle: e.detail.value
        });
    },
    invoiceTaxInput: function(e) {
        this.setData({
            invoiceTax: e.detail.value
        });
    },
    nameInput: function(e) {
        this.setData({
            contactName: e.detail.value
        });
    },
    addressInput: function(e) {
        this.setData({
            contactAddress: e.detail.value
        });
    },
    proSwitchChange: function(e) {
        var t = e.currentTarget.dataset.index;
        this.data.additionalProducts[t].selected = e.detail.value, this.refreshPrice();
    },
    showProductInfo: function(e) {
        var t = this, a = e.currentTarget.dataset.index, i = this.data.additionalProducts[a].descriptionUrl.match(/\d*$/);
        !i || i.length <= 0 || (i = i[0], n.default.getAppendProductInfo(i, function(e) {
            e && t.setData({
                showType: "proInfo",
                proInfo: e,
                isFilterViewAnimation: !0
            });
        }));
    },
    showFlight: function() {
        this.data.cabinDetailList.forEach(function(e) {
            e.flightOverview.departTimeDes = e.flightOverview.departTime.split(" ")[1].slice(0, 5), 
            e.flightOverview.arriveTimeDes = e.flightOverview.arriveTime.split(" ")[1].slice(0, 5), 
            0 != e.flightOverview.stopType && (e.flightOverview.departInfo = e.flightOverview.departTimeDes + " " + r.default.weekday(e.flightOverview.departTime.split(" ")[0]) + " " + e.flightOverview.departCityName + "—" + e.flightOverview.arriveCityName, 
            e.flightOverview.subsegments.forEach(function(e) {
                e.departTimeDes = e.departTime.split(" ")[1].slice(0, 5), e.arriveTimeDes = e.arriveTime.split(" ")[1].slice(0, 5);
            }));
        }), this.setData({
            cabinDetailList: this.data.cabinDetailList,
            showType: "flight"
        });
    },
    hideFlight: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                showType: ""
            });
        });
    },
    doBookVerify: function() {
        var e = this;
        this.saveBookInfos();
        var t = {
            data: {
                bookVerifyFlight: [],
                bookVerifyPassenger: [],
                contactName: this.getContactName(),
                phoneNumber: this.data.mobile,
                piid: l.cabinDetail.mainProductCode,
                repeatOrderCancel: this.data.repeatOrderCancel
            }
        };
        l.cabinDetail.cabinDetailList.forEach(function(e, a, i) {
            t.data.bookVerifyFlight.push({
                arrivalCity: e.flightOverview.arriveCityCode,
                departCity: e.flightOverview.departCityCode,
                arrivalTime: e.flightOverview.arriveTime,
                departTime: e.flightOverview.departTime,
                sequence: e.routeIndex
            });
        }), this.data.passengerSels.forEach(function(e, a, i) {
            t.data.bookVerifyPassenger.push({
                cardNo: e.passportCode,
                cardType: e.passportType,
                passengerName: e.passengerName.length > 0 ? e.passengerName : e.passengerENFirstName + "/" + e.passengerENLastName
            });
        }), n.default.showLoading("正在校验订单..."), (0, s.BookVerify)(t, function(t) {
            var a = t.resultCode, i = t.resultMessage;
            1 == a ? e.doSubmit() : -1 == a ? (n.default.hideLoading(), e.showRepeatOrder(t.data, t.resultMessage)) : i && (n.default.hideLoading(), 
            n.default.showWaringDialog(i));
        }, function(t) {
            e.doSubmit();
        }, function() {});
    },
    doSubmit: function() {
        var e = this, t = this;
        wx.showToast({
            title: "正在提交订单...",
            icon: "loading",
            duration: 25e3
        });
        var a = {
            data: {
                flightSegments: [],
                passengers: [],
                appendProducts: [],
                contactInfo: {
                    contactName: this.getContactName(),
                    contactPhone: this.data.mobile
                },
                orderPrice: this.data.totalPrice,
                orderType: this.data.productType,
                invoiceFlag: this.data.needSendBill,
                billType: this.data.invoiceRelateInfo.invoiceType,
                couponNo: this.data.coupon ? this.data.coupon.couponCode : "",
                favToken: l.cabinDetail.favToken,
                pataToken: l.cabinDetail.pataToken,
                fromPage: "JSAPI",
                flightProductCode: l.cabinDetail.mainProductCode,
                vendorName: l.cabinDetail.vendorName,
                qunarBookingInfo: l.cabinDetail.qunarBookingInfo
            }
        };
        this.data.needSendBill && (a.data.deliveryInfo = {
            deliveryType: 1,
            address: this.data.contactAddress,
            contactName: this.data.contactName,
            contactPhone: this.data.mobile,
            email: "",
            province: "",
            city: "",
            district: ""
        }, this.data.invoiceRelateInfo.isInvoiceAlterable && (a.data.invoiceInfo = {
            invoiceType: this.data.selectedInvoice.code,
            invoiceTitle: this.data.invoiceTitle,
            taxNumber: this.data.invoiceTax
        })), l.cabinDetail.cabinDetailList.forEach(function(e, t, i) {
            a.data.flightSegments.push({
                departCityCode: e.flightOverview.departCityCode,
                departCityName: e.flightOverview.departCityName,
                arriveCityCode: e.flightOverview.arriveCityCode,
                arriveCityName: e.flightOverview.arriveCityName,
                departAirportCode: e.flightOverview.departAirportCode,
                departAirportName: e.flightOverview.departAirportName,
                arriveAirportCode: e.flightOverview.arriveAirportCode,
                arriveAirportName: e.flightOverview.arriveAirportName,
                departTerminal: e.flightOverview.departTerminal,
                arriveTerminal: e.flightOverview.arriveTerminal,
                airCompanyCode: e.flightOverview.airlineCode,
                airCompanyName: e.flightOverview.airlineName,
                carrierCode: e.flightOverview.carrierAirlineCode,
                carrierName: e.flightOverview.carrierAirlineName,
                stopAirportName: "",
                flightNumber: e.flightOverview.flightNumber,
                cabinCode: e.cabinOverview.cabinCode,
                cabinName: e.cabinOverview.cabinName,
                cabinCodeForChild: e.cabinCodeForChild,
                cabinCodeForBaby: e.cabinCodeForBaby,
                departDateTime: e.flightOverview.departTime,
                arriveDateTime: e.flightOverview.arriveTime,
                isShare: e.flightOverview.isCodeShared,
                flightProductCode: e.cabinOverview.productCode,
                flightProductType: e.cabinOverview.productType,
                saleType: e.saleType,
                segmentType: e.routeIndex + 1,
                prices: [ {
                    passengerType: "成人票",
                    farePrice: e.adultFarePrice,
                    marketPrice: e.adultMarketPrice,
                    fuelSurcharge: e.adultFuelPrice,
                    airportTax: e.adultAirportTaxPrice,
                    otherCharge: e.adultOtherPrice
                }, {
                    passengerType: "儿童票",
                    farePrice: e.childFarePrice,
                    marketPrice: e.childMarketPrice,
                    fuelSurcharge: e.childFuelPrice,
                    airportTax: e.childAirportTaxPrice,
                    otherCharge: e.childOtherPrice
                }, {
                    passengerType: "婴儿票",
                    farePrice: e.babyFarePrice,
                    marketPrice: e.babyMarketPrice,
                    fuelSurcharge: e.babyFuelPrice,
                    airportTax: e.babyAirportTaxPrice,
                    otherCharge: e.babyOtherPrice
                } ]
            });
        }), this.data.passengerSels.forEach(function(e, t, i) {
            a.data.passengers.push({
                passengerName: e.passengerName.length > 0 ? e.passengerName : e.passengerENFirstName + "/" + e.passengerENLastName,
                passengerType: e.ticketType,
                passengerPhone: e.mobile,
                birth: e.passengerBirth,
                identityType: e.passportType,
                identityNo: e.passportCode
            });
        }), this.data.additionalProducts.forEach(function(e, t, i) {
            e.selected && a.data.appendProducts.push({
                productId: e.productCode
            });
        }), (0, s.CreateOrder)(a, function(a) {
            function s() {
                1 != r && n.default.hideLoading(), 1 == r ? t.doPay(a.data) : 2 == r ? wx.showModal({
                    title: "温馨提示",
                    content: o,
                    cancelText: "重新选择",
                    confirmText: "接受新价",
                    success: function(e) {
                        e.confirm ? t.doPay(a.data) : t.refreshFlightList(2);
                    }
                }) : -2 == r ? t.showRefreshDialog(o, 2) : -3 == r ? wx.showModal({
                    title: "温馨提示",
                    showCancel: !1,
                    content: o,
                    success: function(e) {
                        e.confirm && i.cwx.user.login({
                            callback: function(e) {}
                        });
                    }
                }) : -4 == r ? wx.showModal({
                    title: "温馨提示",
                    showCancel: !1,
                    content: o,
                    success: function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : o && n.default.showWaringDialog(o);
            }
            var r = a.resultCode, o = a.resultMessage;
            e.data.repeatOrderCancel = !0, a.data.waitSeconds > 0 ? setTimeout(function() {
                s();
            }, 1e3 * a.data.waitSeconds) : s();
        }, function(e) {
            n.default.showWaringDialog("下单失败，请重试");
        }, function() {});
    },
    doPay: function(e) {
        var t = this;
        n.default.showLoading("正在前往支付...");
        var a = {
            data: {
                orderNumber: e.orderNumber,
                payType: "weixin",
                payTarget: 0,
                wxId: i.cwx.user.openid
            }
        };
        (0, s.GetOrderPayInfo)(a, function(e) {
            n.default.hideLoading();
            var a = e.resultMessage;
            1 == e.resultCode ? t.weicatPay(e.data.weixinPayInfo) : a && n.default.showWaringDialog(a);
        }, function(e) {
            n.default.showWaringDialog("支付信息获取失败");
        }, function() {});
    },
    weicatPay: function(e) {
        var t = this;
        console.log(e), wx.requestPayment({
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.prepayId,
            signType: "MD5",
            paySign: e.sign,
            success: function(e) {
                console.log("success"), console.log(e), t.toOrderList();
            },
            fail: function(e) {
                console.log("fail"), console.log(e), e && e.err_desc && n.default.showToast(e.err_desc);
            },
            complete: function(e) {
                console.log("complete"), console.log(e), e && e.errMsg && "requestPayment:fail cancel" == e.errMsg && n.default.showToast("用户中途取消");
            }
        });
    },
    toOrderList: function() {
        l.switchType = "flight", wx.switchTab({
            url: "/pages/myctrip/list/list"
        });
    },
    delPas: function(e) {
        var t = e.currentTarget.dataset.index;
        this.data.passengerSels.splice(t, 1), this.setData({
            passengerSels: this.data.passengerSels
        }), this.refreshPrice();
    },
    formSubmit: function(e) {
        n.default.isFastDoubleClick() || (new Date().getTime() - this.data.enterTimeMillis > 6e5 ? this.showRefreshDialog("您在此页面停留过久，将为您重新搜索航班信息", 0) : this.validateSubmitData() && (i.cwx.user.auth && i.cwx.user.isLogin() ? this.doBookVerify() : i.cwx.user.login({
            callback: function(e) {
                "0" === e.ReturnCode && this.doBookVerify();
            }
        })));
    },
    showRepeatOrder: function(e, t) {
        var a = this;
        e.hasPaid ? e.bookVerifyFlight && 0 != e.bookVerifyFlight.length ? wx.showModal({
            title: "温馨提示",
            content: t,
            cancelText: "返回修改",
            confirmText: "查看订单",
            success: function(t) {
                t.confirm && a.showOldOrder(e.bookVerifyFlight);
            }
        }) : wx.showModal({
            title: "温馨提示",
            showCancel: !1,
            content: t,
            success: function(e) {}
        }) : e.bookVerifyFlight && 0 != e.bookVerifyFlight.length ? wx.showModal({
            title: "温馨提示",
            content: t,
            cancelText: "继续预定",
            confirmText: "查看订单",
            success: function(t) {
                t.confirm ? a.showOldOrder(e.bookVerifyFlight) : (a.cancelOrder(e.bookVerifyFlight), 
                a.doSubmit());
            }
        }) : this.doSubmit();
    },
    cancelOrder: function(e) {
        e.forEach(function(e) {
            var t = {
                data: {
                    orderNumber: e.orderID,
                    reason: ""
                }
            };
            (0, s.FlightCancelOrderModel)(t, function(e) {});
        });
    },
    showOldOrder: function(e) {
        if (1 == e.length) {
            var t = e[0].orderID;
            if (!t || 0 == t.length) return;
            this.navigateTo({
                data: {
                    oid: t
                },
                url: "/pages/flight/detail/detail"
            });
        } else this.toOrderList();
    },
    refreshFlightList: function(e) {
        l.query.cacheUsage = e, l.needRefreshList = !0, wx.navigateBack({
            delta: 2
        });
    },
    showRefreshDialog: function(e, t) {
        var a = this;
        wx.showModal({
            title: "温馨提示",
            showCancel: !1,
            content: e,
            success: function(e) {
                e.confirm && a.refreshFlightList(t);
            }
        });
    },
    validateSubmitData: function() {
        var e = this.data.passengerSels;
        if (11 != this.data.mobile.length) return n.default.showWaringDialog("请输入11位手机号码"), 
        !1;
        if (!this.data.hasChildSeat && this.data.childAmount > 0) return n.default.showWaringDialog("该舱位儿童不可订，请选择其他舱位"), 
        !1;
        if (!this.data.hasBabySeat && this.data.babyAmount > 0) return n.default.showWaringDialog("该舱位婴儿不可订，请选择其他舱位"), 
        !1;
        if (!e || 0 == e.length) return n.default.showWaringDialog("请先添加乘客"), !1;
        if (0 == this.data.adultAmount) return n.default.showWaringDialog("儿童必须有成人陪同预定，请添加成人"), 
        !1;
        if (this.data.babyAmount > this.data.adultAmount) return n.default.showWaringDialog("一位成人只允许带一个婴儿，请继续选择或新增乘机人"), 
        !1;
        if (e.length > 9) return n.default.showWaringDialog("一次最多选择9位乘客"), !1;
        if (e.length > this.data.maxInventory) return n.default.showWaringDialog("很抱歉，该航班仅剩" + this.data.maxInventory + "张机票"), 
        !1;
        if (this.data.minPassengerNum < this.data.maxPassengerNum && this.data.maxPassengerNum > 0 && (e.length < this.data.minPassengerNum || e.length > this.data.maxPassengerNum)) return this.isCompositionPrice ? n.default.showWaringDialog("该组合产品仅限" + this.data.minPassengerNum + "~" + this.data.maxPassengerNum + "人预定") : n.default.showWaringDialog("该产品仅限" + this.data.minPassengerNum + "~" + this.data.maxPassengerNum + "人预定"), 
        !1;
        if (this.data.needSendBill) {
            if (0 == this.data.contactName.length || 0 == this.data.contactAddress.length) return n.default.showWaringDialog("请输入收件信息"), 
            !1;
            if (this.data.invoiceRelateInfo.isInvoiceAlterable) {
                if (0 == this.data.invoiceTitle.length) return n.default.showWaringDialog("请输入发票抬头"), 
                !1;
                if ("2" == this.data.selectedInvoice.code && 0 == this.data.invoiceTax.length) return n.default.showWaringDialog("请输入纳税人识别号"), 
                !1;
                if (0 != this.data.invoiceTax.length && !n.default.checkInvoiceTax(this.data.invoiceTax)) return n.default.showWaringDialog("请输入正确的纳税人识别号"), 
                !1;
            }
        }
        return !0;
    },
    saveBookInfos: function() {
        o.FlightBookStore.setAttr("passengerSels", this.data.passengerSels), o.FlightBookStore.setAttr("mobile", this.data.mobile), 
        o.FlightBookStore.setAttr("invoiceTitle", this.data.invoiceTitle), o.FlightBookStore.setAttr("invoiceTax", this.data.invoiceTax), 
        o.FlightBookStore.setAttr("contactName", this.data.contactName), o.FlightBookStore.setAttr("contactAddress", this.data.contactAddress);
    },
    doFavCheck: function() {
        var e = this;
        if (l.cabinDetail.favToken && l.cabinDetail.pataToken) {
            var t = {
                data: {
                    favToken: l.cabinDetail.favToken,
                    pataToken: l.cabinDetail.pataToken,
                    passengerNum: 1,
                    memcacheKey: l.cabinDetail.mainProductCode
                }
            };
            !function a(i) {
                (0, s.FavCheck)(t, function(t) {
                    var s = t.resultCode, r = t.resultMessage;
                    0 == s ? i > 0 && setTimeout(function() {
                        a(i - 1);
                    }, 3e3) : 2 == s || 3 == s ? e.showRefreshDialog(r, 2) : 1 == s && (t.data && e.setMaxInventory(t.data.verifyCheckFlight), 
                    i > 0 && setTimeout(function() {
                        a(i - 1);
                    }, 3e3));
                });
            }(3);
        }
    },
    setMaxInventory: function(e) {
        if (e && 0 != e.length) if (1 == e.length) 999 != e[0].seatCount && (this.data.maxInventory = e[0].seatCount); else {
            var t = 999, a = !0;
            for (var i in e) 999 == i.seatCount && (a = !1), t = t > i.seatCount ? i.seatCount : t;
            this.data.maxInventory = a ? t : this.data.maxInventory > t ? t : this.data.maxInventory;
        }
    },
    getContactName: function() {
        var e = "";
        if (this.data.passengerSels.length > 0) {
            var t = this.data.passengerSels[0];
            e = t.passengerName.length > 0 ? t.passengerName : t.passengerENFirstName + "/" + t.passengerENLastName;
        }
        return e;
    },
    childToAdult: function(e) {
        var t = e.currentTarget.dataset.index;
        "儿童票" == this.data.passengerSels[t].passengerType && "成人票" == this.data.passengerSels[t].ticketType ? this.data.passengerSels[t].ticketType = "儿童票" : this.data.passengerSels[t].ticketType = "成人票", 
        this.setData({
            passengerSels: this.data.passengerSels
        }), this.refreshPrice();
    },
    refreshPrice: function() {
        var e = 0, t = 0, a = 0, i = 0, s = 0, r = 0, n = 0, o = 0, d = 0;
        if (this.data.passengerSels && 0 != this.data.passengerSels.length) {
            for (var c in this.data.passengerSels) {
                var l = this.data.passengerSels[c];
                "成人票" == l.ticketType ? "成人票" == l.passengerType ? r++ : "儿童票" == l.passengerType && n++ : "儿童票" == l.ticketType ? o++ : "婴儿票" == l.ticketType && d++;
            }
            this.data.needSendBill && (t = this.data.invoiceRelateInfo.deliveryPrice), this.data.coupon && (i = this.data.coupon.couponPrice);
            for (var c in this.data.cabinDetailList) {
                var h = this.data.cabinDetailList[c];
                s = (s = (s = s + h.adultFuelPrice * r + h.childAsAdultFuelPrice * n + h.childFuelPrice * o + h.babyFuelPrice * d) + h.adultMarketPrice * r + h.adultMarketPrice * n + h.childMarketPrice * o + h.babyMarketPrice * d) + h.adultAirportTaxPrice * r + h.childAsAdultAirportTaxPrice * n + h.childAirportTaxPrice * o + h.babyAirportTaxPrice * d;
            }
            for (var c in this.data.additionalProducts) {
                var u = this.data.additionalProducts[c];
                u.selected && ("P" == u.productType ? a += this.data.passengerSels.length * u.price * this.data.cabinDetailList.length : a += u.price);
            }
            e = t + a + s - i, this.setData({
                adultAmount: r,
                childAsAdultAmount: n,
                childAmount: o,
                babyAmount: d,
                totalPrice: e
            });
        } else this.setData({
            adultAmount: 0,
            childAmount: 0,
            babyAmount: 0,
            totalPrice: 0
        });
    },
    showPriceDetail: function(e) {
        var t = this, a = [], i = this.data.isTransfer;
        for (var s in this.data.cabinDetailList) {
            var r = "";
            this.data.cabinDetailList.length > 1 && (0 == this.data.cabinDetailList[s].routeIndex ? r = " (去)" : 1 == this.data.cabinDetailList[s].routeIndex && (r = " (返)"));
            var n = this.data.cabinDetailList[s];
            this.data.adultAmount > 0 && (a.push({
                name: "成人票 " + (i ? 0 === Number(s) ? "(第一程)" : "(第二程)" : r),
                price: "¥" + n.adultMarketPrice + "  x" + this.data.adultAmount + "人"
            }), a.push({
                name: "机建/燃油 " + (i ? 0 === Number(s) ? "(第一程)" : "(第二程)" : r),
                price: "¥" + (n.adultAirportTaxPrice + n.adultFuelPrice) + "  x" + this.data.adultAmount + "人"
            })), this.data.childAsAdultAmount > 0 && (a.push({
                name: "儿童转成人票 " + (i ? 0 === Number(s) ? "(第一程)" : "(第二程)" : r),
                price: "¥" + n.adultMarketPrice + "  x" + this.data.childAsAdultAmount + "人"
            }), a.push({
                name: "机建/燃油 " + (i ? 0 === Number(s) ? "(第一程)" : "(第二程)" : r),
                price: "¥" + (n.childAsAdultAirportTaxPrice + n.childAsAdultFuelPrice) + "  x" + this.data.childAsAdultAmount + "人"
            })), this.data.childAmount > 0 && (a.push({
                name: "儿童票 " + (i ? 0 === Number(s) ? "(第一程)" : "(第二程)" : r),
                price: "¥" + n.childMarketPrice + "  x" + this.data.childAmount + "人"
            }), a.push({
                name: "机建/燃油 " + (i ? 0 === Number(s) ? "(第一程)" : "(第二程)" : r),
                price: "¥" + (n.childAirportTaxPrice + n.childFuelPrice) + "  x" + this.data.childAmount + "人"
            })), this.data.babyAmount > 0 && (a.push({
                name: "婴儿票 " + (i ? 0 === Number(s) ? "(第一程)" : "(第二程)" : r),
                price: "¥" + n.babyMarketPrice + "  x" + this.data.babyAmount + "人"
            }), a.push({
                name: "机建/燃油 " + (i ? 0 === Number(s) ? "(第一程)" : "(第二程)" : r),
                price: "¥" + (n.babyAirportTaxPrice + n.babyFuelPrice) + "  x" + this.data.babyAmount + "人"
            }));
        }
        for (var s in this.data.additionalProducts) {
            var o = this.data.additionalProducts[s];
            o.selected && ("P" == o.productType ? a.push({
                name: o.productName,
                price: "¥" + o.price + "  x" + this.data.passengerSels.length * this.data.cabinDetailList.length + "份"
            }) : a.push({
                name: o.productName,
                price: "¥" + o.price + "  x1份"
            }));
        }
        this.data.needSendBill && a.push({
            name: "快递费",
            price: "¥" + this.data.invoiceRelateInfo.deliveryPrice + "  x1份"
        }), this.data.coupon && a.push({
            name: this.data.coupon.couponDisplayName,
            price: "- ¥" + this.data.coupon.couponPrice + "  x1份"
        }), this.setData({
            priceDetail: a,
            showType: "priceDetail"
        }), setTimeout(function() {
            t.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    showRefundTips: function() {
        var e = this;
        this.setData({
            showType: "refund"
        }), setTimeout(function() {
            e.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    hideTips: function(e) {
        var t = this;
        this.setData({
            isFilterViewAnimation: !0
        }), setTimeout(function() {
            t.setData({
                showType: ""
            });
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShow: function() {
        var e = h.selectedCoupon;
        this.setData({
            coupon: e
        }), this.refreshPrice();
    },
    goToPassenger: function() {
        var e = this;
        i.cwx.user.isLogin() ? this.data.passengers && this.data.passengers.length > 0 ? this.formartPassData(this.data.passengers) : this.getPassengerInfo() : i.cwx.user.login({
            callback: function(t) {
                "0" === t.ReturnCode && e.setData({
                    showType: "pas"
                });
            }
        });
    },
    goToCoupon: function() {
        var e = "N";
        this.data.additionalProducts && (e = "Y");
        var t = [ {
            key: "Price",
            value: this.data.totalPrice
        }, {
            key: "IsBuyPackage",
            value: e
        } ];
        h.selectedCoupon = this.data.coupon, h.eventBody = t, this.navigateTo({
            url: "/pages/train/coupon/coupon?couponId=${coupon.couponId}&couponType=200"
        });
    },
    getPassengerInfo: function() {
        var e = this;
        n.default.showLoading();
        var t = {
            source: "flight"
        };
        (0, d.FlightPassengerModel)(t, function(t) {
            1 == t.resultCode && e.formartPassData(t.commonPassengers);
        }, function(t) {
            e.setData({
                isFailed: !0
            });
        }, function() {
            n.default.hideLoading();
        });
    },
    formartPassData: function(e) {
        var t = this, a = this;
        i._.each(e, function(e) {
            var t = i._.find(a.data.passengerSels, function(t) {
                return e.passengerID == t.passengerID;
            });
            e.passengerType = a.getFlightPasType(e), e.isSupportENName = c.default.isSupportEnName(e), 
            e.isSelected = !!t;
        }), this.setData({
            showType: "pas",
            passengers: e
        }), setTimeout(function() {
            t.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    getFlightPasType: function(e) {
        "身份证" == e.passportType && e.passportCode && 18 == e.passportCode.length && (e.passengerBirth = e.passportCode.slice(6, 10) + "-" + e.passportCode.slice(10, 12) + "-" + e.passportCode.slice(12, 14));
        var t = new Date(e.passengerBirth), a = new Date(this.data.flightStartDate) - 12096e5, i = new Date(this.data.flightStartDate);
        i.setFullYear(i.getFullYear() - 2);
        var s = new Date(this.data.flightStartDate);
        return s.setFullYear(s.getFullYear() - 12), t > a ? void 0 : t < a && t > i ? "婴儿票" : t < i && t > s ? "儿童票" : t < s ? "成人票" : void 0;
    },
    cancelPasChoose: function() {
        this.hideBackDrop();
    },
    confirmPasChoose: function() {
        this.setData({
            passengerSels: this.data.passengers.filter(function(e) {
                return 1 == e.isSelected;
            })
        }), i._.each(this.data.passengerSels, function(e) {
            e.ticketType || (e.ticketType = e.passengerType);
        }), this.hideBackDrop(), this.refreshPrice();
    },
    selectPassenger: function(e) {
        var t = this, a = e.currentTarget.dataset.index, i = this.data.passengers[a];
        if (i.isSelected) i.isSelected = !1, t.removePassenger(i); else {
            var s = this.data.passengers.filter(function(e) {
                return 1 == e.isSelected;
            });
            if (s && 9 == s.length) return n.default.showWaringDialog("一次最多选择9位乘客"), !1;
            if (s && s.length == this.data.maxInventory) return n.default.showWaringDialog("很抱歉，该航班仅剩" + this.data.maxInventory + "张机票"), 
            !1;
            var r = {};
            if (1 != (r = c.default.isPassengerCanBuyTicket(i, this.data.supportedPasType, this.data.supportedIdType, this.data.ageLimit, this.data.flightStartDate)).type) return n.default.showWaringDialog(r.info), 
            !1;
            t.choosePassenger(i);
        }
    },
    choosePassenger: function(e) {
        e.isSelected = !0, this.setData({
            passengers: this.data.passengers
        });
    },
    removePassenger: function(e) {
        e.isSelected = !1, this.setData({
            passengers: this.data.passengers
        });
    },
    addNewPassenger: function() {
        var e = {
            buyFlag: 0,
            mobile: "",
            passengerBirth: "",
            passengerENFirstName: "",
            passengerENLastName: "",
            passengerID: "",
            passengerName: "",
            passengerType: "成人票",
            passportCode: "",
            passportType: "身份证",
            useENName: !1,
            isSupportENName: !1
        };
        i.cwx.editPassenger.editPassenger(this.callbackPassenger, e, this.data.supportedPasType, this.data.supportedIdType, this.data.flightStartDate);
    },
    editPassenger: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.passengers[t];
        i.cwx.editPassenger.editPassenger(this.callbackPassenger, a, this.data.supportedPasType, this.data.supportedIdType, this.data.flightStartDate);
    },
    callbackPassenger: function() {
        this.getPassengerInfo();
    },
    hideBackDrop: function() {
        var e = this;
        this.setData({
            isFilterViewAnimation: !1,
            showType: ""
        }), setTimeout(function() {
            e.setData({
                showFilterView: !1
            });
        }, 300);
    }
});