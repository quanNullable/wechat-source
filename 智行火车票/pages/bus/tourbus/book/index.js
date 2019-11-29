var e = require("../../../../cwx/cwx.js"), t = require("../../buscommon/global.js"), a = require("../../buscommon/utils.js"), n = require("../../buscommon/service.js"), r = require("../../buscommon/datahandler.js"), s = require("../../../accounts/user.js");

(0, e.CPage)({
    pageid: "",
    data: {
        isError: !1,
        mMessage: "",
        isShowPrice: !1,
        isShowDeclar: !1,
        isAddPassenger: !1,
        isShowMask: !1,
        mContractTel: "",
        mParams: {},
        mLine: {},
        mDetail: {},
        mCount: 0,
        mTotalPrice: 0,
        mPrdInfo: {},
        mUsers: [],
        mSelUsers: [],
        mLoading: {
            isLoading: !1,
            message: ""
        },
        mDateMsg: "",
        hasPackage: !1
    },
    onLoad: function(e) {
        var t = this;
        e = e || {};
        var a = wx.getStorageSync("TOUR_BUS_SELECT_PASSENGER") || [], r = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ], s = new Date(e.fromDate), o = (s.getMonth() + 1).toString(), i = s.getDate().toString(), c = s.getDay(), m = (o = o.length <= 1 ? "0" + o : o) + "月" + (i = i.length <= 1 ? "0" + i : i) + "日 , " + r[c];
        t.setData({
            mParams: e,
            mSelUsers: a,
            mDateMsg: m,
            mCount: a.length
        }), t.setNavTitle(e), n.getTourBusLine(e, {
            success: function(e) {
                var a = (e = e || {}).to_time || "", n = a.substr(a.indexOf(" "));
                e.toTime = n ? n + "（预估时间）" : n;
                var r = t.data.mCount || 0, s = !!e.packages || !!e.back_info;
                t.setData({
                    mLine: e,
                    hasPackage: s,
                    mTotalPrice: (e.fullPrice || 0) * r
                });
            },
            fail: function(e) {
                t.showError("获取线路详情失败").hideError(), t.setData({
                    mLine: {},
                    mTotalPrice: 0
                }), console.log("[book-getTourBusLine] :: 获取线路详情失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    onUnload: function() {},
    onShow: function() {
        var e = this, t = {};
        wx.setStorageSync("BUS_NO_UPDATE", 1), r.Passengers.get(t, {
            success: function(t) {
                t = t || [];
                var a = e.data.mSelUsers || [], n = [], r = [], s = e.data.mLine || {};
                a.forEach(function(e) {
                    n.push(e.mPID);
                }), t.forEach(function(e) {
                    e.mStatus = n.indexOf(e.mPID) >= 0, n.indexOf(e.mPID) >= 0 && r.push(e);
                }), r = r || [], e.setData({
                    mUsers: t,
                    mSelUsers: r,
                    mCount: r.length,
                    mTotalPrice: s.fullPrice * r.length
                }), wx.setStorageSync("TOUR_BUS_SELECT_PASSENGER", r);
            },
            fail: function(t) {
                console.log("[book-Passengers] :: 获取常旅信息失败 > " + (JSON.stringify(t) || "")), e.showError("获取常旅信息").hideError();
            }
        });
        var a = wx.getStorageSync("TOUR_BUS_CONTACTORS_TEL") || "";
        e.setData({
            mContractTel: a
        });
    },
    onReady: function() {
        e.cwx.mkt.getUnion(function(e) {
            this.unionData = e;
        }.bind(this));
    },
    onNewPassenger: function(e) {
        "edit" != e && (e = "new");
        var t = this.data.mLine || {}, n = {
            type: e,
            mChildren: t.ticketChild || 0,
            mTakeChildren: t.ticketTakeChild || 0,
            mSurpported: t.supportPassengerTypes || "身份证"
        };
        wx.navigateTo({
            url: a.AppendParams("../../passenger/index", n),
            success: function(e) {},
            fail: function(e) {
                console.log("[book-onAddPassenger] :: 跳转新增乘客页失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    onAddPassenger: function() {
        var e = this;
        return e.setData({
            isShowMask: !0,
            isAddPassenger: !0
        }), e;
    },
    onConfirmPassenger: function() {
        var e = this, t = [];
        return t = wx.getStorageSync("TOUR_BUS_SELECT_PASSENGER"), e.setData({
            mSelUsers: t
        }), e.onHideMask(), e;
    },
    onCancelPassenger: function() {
        var e = this;
        return e.onHideMask(), e;
    },
    onClickUser: function(e) {
        var t = this, a = (e.target || {}).dataset || {}, n = (e.currentTarget || {}).dataset || {}, r = n.value || "", s = t.data.mUsers || [], o = s.find(function(e) {
            return e.mPID == r;
        });
        if ("edit" == a.type) return wx.setStorageSync("BUS_EDIT_PASSENGER", o), void t.onNewPassenger("edit");
        if (!n.enable) return t;
        var i = [], c = [], m = t.data.mLine || {}, u = m.orderTicketCount || 0, d = t.data.mCount || 0;
        u > 0 && d >= u && !o.mStatus ? wx.showModal({
            title: "温馨提示",
            content: "本车次最多代购 " + u + " 位乘客，若超过 " + u + " 位乘客，请另行多次下单。",
            showCancel: !1
        }) : (s.forEach(function(e) {
            e.mPID, e.mPID == r && (e.mStatus = !e.mStatus), e.mStatus && i.push(e), c.push(e);
        }), i = i || [], t.setData({
            mUsers: c,
            mCount: i.length,
            mTotalPrice: m.fullPrice * i.length
        }), wx.setStorageSync("TOUR_BUS_SELECT_PASSENGER", i));
    },
    onShowDeclaration: function() {
        var e = this, t = this.data.mLine || {}, a = [ {
            title: "我们的特点：",
            desc: [ "1.您正在购买的旅游专线产品，不需要取票，凭携程短信，验证后直接上车。", "2.发车前24小时外，您可以在网上申请退票，详见下方退改签规则。" ]
        } ], n = t.serviceDescNew || [];
        a = a.concat(n);
        var r = [];
        (t.packages || []).forEach(function(e) {
            var t = (e = e || {}).package_desc || "";
            r.push({
                title: e.package_title || "",
                content: t ? t.split("$") : ""
            });
        });
        var s = {
            mEnsurances: r,
            mDescription: a
        };
        e.hideLoading().setData({
            isShowMask: !0,
            isShowDeclar: !0,
            isShowPrice: !1,
            isAddPassenger: !1,
            mPrdInfo: s
        });
    },
    onHideDeclaration: function() {
        this.setData({
            isShowMask: !1,
            isShowDeclar: !1,
            isShowPrice: !1,
            isAddPassenger: !1
        });
    },
    onShowCostDetail: function() {
        var e = this, t = {};
        return t = e.getCostDetail(), e.setData({
            isShowMask: !0,
            isShowDeclar: !1,
            isAddPassenger: !1,
            isShowPrice: !0,
            mDetail: t
        }), e;
    },
    onHideCostDetail: function() {
        this.setData({
            isShowMask: !1,
            isShowDeclar: !1,
            isShowPrice: !1,
            isAddPassenger: !1
        });
    },
    onHideMask: function() {
        var e = this;
        return e.setData({
            isShowMask: !1,
            isShowDeclar: !1,
            isShowPrice: !1,
            isAddPassenger: !1
        }), e;
    },
    onMobileChange: function(e) {
        var t = this, a = e.detail || {};
        t.setData({
            mContractTel: a.value
        }), wx.setStorageSync("TOUR_BUS_CONTACTORS_TEL", a.value);
    },
    onPassengerDel: function(e) {
        var t = this, a = e.currentTarget.dataset || {}, n = a.id, r = a.index, s = t.data.mSelUsers || [], o = t.data.mUsers || [], i = [];
        s.forEach(function(e) {
            e.mPID == n && (e.mStatus = !e.mStatus);
        }), s.splice(r, 1), o.forEach(function(e) {
            e.mPID == n && (e.mStatus = !e.mStatus), i.push(e);
        });
        var c = t.data.mLine || {};
        s = s || [], t.setData({
            mUsers: o,
            mSelUsers: s,
            mCount: s.length,
            mTotalPrice: c.fullPrice * s.length
        }), wx.setStorageSync("TOUR_BUS_SELECT_PASSENGER", t.data.mSelUsers);
    },
    onSubmit: function() {
        var e = this, t = e.checkBookInfo();
        return t.isTrue ? e.addOrder() : e.showError(t.message).hideError(), e;
    },
    setNavTitle: function(e) {
        var t = this, n = (e = e || {}).fromDate.indexOf("-"), r = e.fromDate.lastIndexOf("-"), s = e.fromDate.substr(n + 1, r - (n + 1)), o = e.fromDate.substr(r + 1), i = a.Format("{0}月{1}日 {2} 出发", s, o, e.fromTime);
        return wx.setNavigationBarTitle({
            title: i
        }), t;
    },
    getCostDetail: function() {
        var e = this.data || {}, t = {
            name: "票价",
            amount: e.mLine.fullPrice || 0
        };
        return e = {
            mCnt: e.mSelUsers.length || 0,
            mTicket: t
        };
    },
    checkBookInfo: function() {
        var e = this.data || {}, t = {
            isTrue: !0,
            message: ""
        };
        return (e.mSelUsers || []).length <= 0 ? (t.isTrue = !1, t.message = "请添加乘客", t) : (e.mContractTel || "").trim() ? /^1\d{10}$/.test(e.mContractTel) ? t : (t.isTrue = !1, 
        t.message = "请填写正确的手机号", t) : (t.isTrue = !1, t.message = "请填写手机号", t);
    },
    addOrder: function() {
        var r = this, s = r.data || {}, o = s.mLine || {}, i = (getApp(), {
            ticket_type: "成人票",
            utmSource: wx.getStorageSync("BUS_WECHAT_UTMSOURCE") || "wx-bus",
            Union: this.unionData
        });
        i.Union ? i.Union.allianceid || (i.Union.allianceid = 30613, i.Union.sourceid = 1060566) : i.Union = {
            allianceid: 30613,
            sourceid: 1060566
        };
        var c = s.mSelUsers || [], m = e._.find(c, function(e) {
            return !!e.mName && !!e.mCardNo;
        }) || c[0] || {}, u = "A" == (m.mType || "").toUpperCase();
        i.ticket_type = u ? "成人票" : "儿童票", i.fromCityName = o.fromCityName, i.toCityName = o.toCityName, 
        i.fromStationName = o.fromStationName, i.toStationName = o.toStationName, i.ticketDate = s.mParams.fromDate, 
        i.ticketTime = o.fromTime, i.busNumber = o.busNumber, i.busType = o.busType, i.toTime = o.to_time, 
        i.toDays = o.toDays, i.contactMobile = s.mContractTel, i.acceptFromDateFloating = !0, 
        i.contactName = m.mName, i.contactPaperType = t.CARDS_TYPE[m.mCardType], i.contactPaperNum = m.mCardNo;
        var d = 1;
        return i.identityInfoCount = s.mSelUsers.length, s.mSelUsers.forEach(function(e) {
            var n = t.CARDS_TYPE[e.mCardType];
            i["identityInfo" + d] = a.Format("{0};{1};{2};{3};{4}", e.mName, n, e.mCardNo, "", e.mType), 
            d++;
        }), i.clientType = a.Format("{0}--wx--bus", e.cwx.config.platform), i.clientInfo = a.Format("{0}--{1}", e.cwx.util.systemInfo.model.replace(/<[^>]*>/g, ""), e.cwx.util.systemInfo.version), 
        r.showLoading("正在下单"), n.addTourbusOrder(i, {
            success: function(e) {
                r.sendUnionTrace(e.orderNumber), r.payOrder(e);
            },
            fail: function(e) {
                "wx重新调用该接口" == e ? r.onLogin() : (e = a.IsString(e) ? e : "下单失败", r.hideLoading().showError(e).hideError(), 
                console.log("[book-addOrder] :: 下单失败 > " + (JSON.stringify(e) || "")));
            }
        }), r;
    },
    sendUnionTrace: function(t) {
        e.cwx.mkt.sendUnionTrace(this, t);
    },
    onLogin: function() {
        e.cwx.user.isLogin() || e.cwx.user.login({
            callback: function(e) {}
        });
    },
    payOrder: function(e) {
        var t = this, a = {};
        s.getUserCode({}, {
            success: function(n) {
                a.order_number = +e.orderNumber, a.js_code = n, t.callPayment(a);
            },
            fail: function(e) {
                t.hideLoading().showError("下单失败").hideError();
            }
        });
    },
    callPayment: function(e) {
        var t = this;
        e = e || {}, n.getPaymentData(e, {
            success: function(n) {
                n = n || {}, t.hideLoading(), wx.requestPayment({
                    timeStamp: n.timeStamp,
                    nonceStr: n.nonceStr,
                    package: n.package,
                    signType: n.signType,
                    paySign: n.paySign,
                    success: function(n) {
                        wx.redirectTo({
                            url: a.AppendParams("../order/index", {
                                oid: e.order_number
                            }),
                            success: function(e) {},
                            fail: function(e) {
                                t.showError("支付失败").hideError(), console.log("[book-requestPayment] :: 跳转订单详情页失败 > " + (JSON.stringify(e) || ""));
                            }
                        });
                    },
                    fail: function(e) {
                        t.hideLoading().showError("支付失败").hideError(), console.log("[book-requestPayment] :: 支付操作取消 > " + (JSON.stringify(e) || ""));
                    }
                });
            },
            fail: function(e) {
                t.hideLoading().showError("下单失败").hideError();
            }
        });
    },
    showLoading: function(e) {
        var t = this, a = {
            isLoading: !0,
            message: e || "加载中"
        };
        return t.setData({
            mLoading: a
        }), t;
    },
    hideLoading: function() {
        var e = this, t = {
            isLoading: !1,
            message: ""
        };
        return e.setData({
            mLoading: t
        }), e;
    },
    showError: function(e) {
        e = e || "操作失败";
        var t = this;
        return t.setData({
            isError: !0,
            mMessage: e
        }), t;
    },
    hideError: function() {
        var e = this;
        return setTimeout(function() {
            e.setData({
                isError: !1,
                mMessage: ""
            });
        }, 2e3), e;
    }
});