function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var t, i = require("../../../../cwx/cwx.js"), n = require("../../buscommon/utils.js"), a = require("../../buscommon/service.js"), s = require("../../buscommon/datahandler.js"), r = require("../../../accounts/user.js");

(0, i.CPage)({
    pageid: "",
    data: (t = {
        isError: !1,
        mMessage: "",
        isShowPrice: !1,
        isShowDeclar: !1,
        isAddPassenger: !1,
        isShowMask: !1,
        isRealName: !1,
        mContractor: {},
        mTripInfo: {},
        mParams: {},
        mLine: {},
        mDetail: {},
        mCount: 1,
        mTotalPrice: 0,
        mPrdInfo: {},
        mDescriptions: [],
        mUsers: [],
        mSelUsers: [],
        mLoading: {
            isLoading: !1,
            message: ""
        },
        isFetching: !0,
        mDateMsg: "",
        mSchedule: {},
        hasTime: !1,
        isNeedTime: !1
    }, e(t, "isRealName", !1), e(t, "mTimes", []), e(t, "mTime1", 0), e(t, "mTime2", "00:00"), 
    e(t, "mInvoice", {}), t),
    onLoad: function(e) {
        var t = this;
        (e = e || {}).dataSource = 1;
        var i = wx.getStorageSync("AIR_BUS_SELECT_PASSENGER") || [], n = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ], s = new Date(e.date), r = (s.getMonth() + 1).toString(), o = s.getDate().toString(), c = s.getDay(), m = (r = r.length <= 1 ? "0" + r : r) + "月" + (o = o.length <= 1 ? "0" + o : o) + "日 , " + n[c];
        t.setData({
            mParams: e,
            mSelUsers: i,
            mDateMsg: m
        }), t.setNavTitle(m).showLoading("正在加载"), a.getAirBusLine(e, {
            success: function(e) {
                t.afterFetch(e, !1);
            },
            fail: function(e) {
                t.afterFetch(e, !0), console.log("[book-getAirBusLine] :: 获取线路详情失败 > " + (JSON.stringify(e) || ""));
            }
        }), wx.setStorageSync("AIR_BUS_INVOICE", {});
    },
    onUnload: function() {},
    onShow: function() {
        var e = this, t = {}, i = e.data || {};
        wx.setStorageSync("BUS_NO_UPDATE", 1), s.Passengers.get(t, {
            success: function(t) {
                t = t || [];
                var n = e.data.mSelUsers || [], a = [], s = [];
                e.data.mLine;
                n.forEach(function(e) {
                    a.push(e.mPID);
                }), t.forEach(function(e) {
                    e.mStatus = a.indexOf(e.mPID) >= 0, a.indexOf(e.mPID) >= 0 && s.push(e);
                });
                var r = {
                    mUsers: t,
                    mSelUsers: s = s || []
                };
                !!i.isRealName && (r.mCount = s.length), e.setData(r), wx.setStorageSync("AIR_BUS_SELECT_PASSENGER", s);
            },
            fail: function(t) {
                console.log("[book-Passengers] :: 获取常旅信息失败 > " + (JSON.stringify(t) || "")), e.showError("获取常旅信息").hideError();
            }
        });
        var n = wx.getStorageSync("AIR_BUS_CONTRACTOR") || "", a = wx.getStorageSync("AIR_BUS_INVOICE") || {};
        e.setData({
            mContractor: n,
            mInvoice: a
        });
    },
    onReady: function() {
        i.cwx.mkt.getUnion(function(e) {
            this.unionData = e;
        }.bind(this));
    },
    onNewPassenger: function(e) {
        "edit" != e && (e = "new");
        var t = this.data.mLine || {}, i = {
            type: e,
            mChildren: t.ticketChild || 0,
            mTakeChildren: t.ticketTakeChild || 0,
            mSurpported: t.supportPassengerTypes || "身份证"
        };
        wx.navigateTo({
            url: n.AppendParams("../../passenger/index", i),
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
        var e = this, t = [], i = (e.data || {}).mLine || {};
        return t = wx.getStorageSync("AIR_BUS_SELECT_PASSENGER"), e.setData({
            mSelUsers: t,
            mCount: t.length,
            mTotalPrice: i.full_price * t.length
        }), e.onHideMask(), e;
    },
    onCancelPassenger: function() {
        var e = this;
        return e.onHideMask(), e;
    },
    onClickUser: function(e) {
        var t = this, i = (e.target || {}).dataset || {}, n = (e.currentTarget || {}).dataset || {}, a = n.value || "", s = t.data.mUsers || [], r = s.find(function(e) {
            return e.mPID == a;
        });
        if ("edit" == i.type) return wx.setStorageSync("BUS_EDIT_PASSENGER", r), void t.onNewPassenger("edit");
        if (!n.enable) return t;
        var o = [], c = [], m = t.data.mLine || {};
        (t.data.mCount || 0) >= 5 && !r.mStatus ? wx.showModal({
            title: "温馨提示",
            content: "本车次最多代购 5 位乘客，若超过 5 位乘客，请另行多次下单。",
            showCancel: !1
        }) : (s.forEach(function(e) {
            e.mPID, e.mPID == a && (e.mStatus = !e.mStatus), e.mStatus && o.push(e), c.push(e);
        }), o = o || [], t.setData({
            mUsers: c,
            mCount: o.length,
            mTotalPrice: m.full_price * o.length
        }), wx.setStorageSync("AIR_BUS_SELECT_PASSENGER", o));
    },
    onShowFlight: function() {
        var e = [ {
            title: "航班号",
            desc: [ "航班号为选填项，作为供应商调度车辆的参考信息，若飞机延误，在供应商运营时间内尽量为您安排后续班车，若无后续班车或后续班车无座，可全额退款。" ]
        } ];
        this.setData({
            isShowMask: !0,
            isShowDeclar: !0,
            isShowPrice: !1,
            isAddPassenger: !1,
            mPrdInfo: e
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
    onAddressChange: function(e) {
        var t = this, i = e.detail || {}, n = t.data.mTripInfo || {};
        n.address = (i.value || "").trim(), t.setData({
            mTripInfo: n
        }), wx.setStorageSync("AIR_BUS_TRIP_INFO", n);
    },
    onTimeChange1: function(e) {
        var t = this, i = e.detail || {}, n = t.data.mTripInfo || {}, a = t.data.mTimes || [], s = (i.value || "").trim() || 0;
        n.time = a[s], t.setData({
            mTimes1: s,
            mTripInfo: n
        }), wx.setStorageSync("AIR_BUS_TRIP_INFO", n);
    },
    onTimeChange2: function(e) {
        var t = this, i = e.detail || {}, n = t.data.mTripInfo || {};
        n.time = (i.value || "").trim(), t.setData({
            mTimes2: n.time,
            mTripInfo: n
        }), wx.setStorageSync("AIR_BUS_TRIP_INFO", n);
    },
    onFlightChange: function(e) {
        var t = this, i = e.detail || {}, n = t.data.mTripInfo || {};
        n.flight = (i.value || "").trim(), t.setData({
            mTripInfo: n
        }), wx.setStorageSync("AIR_BUS_TRIP_INFO", n);
    },
    onTicketsChange: function(e) {
        var t = this, i = e.currentTarget.dataset || {}, n = t.data.mCount || 0, a = t.data.mLine || {}, s = parseInt(i.value || 0);
        +s + n < 0 || +s + n > 5 || t.setData({
            mCount: n + s,
            mTotalPrice: (a.full_price || 0) * (n + s)
        });
    },
    onNameChange: function(e) {
        var t = this, i = e.detail || {}, n = t.data.mContractor || {};
        n.name = i.value || "", t.setData({
            mContractor: n
        }), wx.setStorageSync("AIR_BUS_CONTRACTOR", n);
    },
    onMobileChange: function(e) {
        var t = this, i = e.detail || {}, n = t.data.mContractor || {};
        n.mobile = i.value || "", t.setData({
            mContractor: n
        }), wx.setStorageSync("AIR_BUS_CONTRACTOR", n);
    },
    onPassengerDel: function(e) {
        var t = this, i = e.currentTarget.dataset || {}, n = i.id, a = i.index, s = t.data.mSelUsers || [], r = t.data.mUsers || [], o = [];
        s.forEach(function(e) {
            e.mPID == n && (e.mStatus = !e.mStatus);
        }), s.splice(a, 1), r.forEach(function(e) {
            e.mPID == n && (e.mStatus = !e.mStatus), o.push(e);
        });
        var c = t.data.mLine || {};
        s = s || [], t.setData({
            mUsers: r,
            mSelUsers: s,
            mCount: s.length,
            mTotalPrice: c.full_price * s.length
        }), wx.setStorageSync("AIR_BUS_SELECT_PASSENGER", t.data.mSelUsers);
    },
    onSelInvoice: function() {
        var e = this, t = e.data.mLine || {}, i = e.data || {};
        wx.navigateTo({
            url: n.AppendParams("../invoice/index", {
                mount: (t.full_price || 0) * (i.mCount || 0)
            }),
            success: function(e) {},
            fail: function(e) {
                console.log("[list-onChangeDate] :: 跳转日历选择页失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    onSubmit: function() {
        var e = this, t = e.checkBookInfo();
        return t.isTrue ? e.addOrder() : e.showError(t.message).hideError(), e;
    },
    beforeFetch: function() {
        var e = this;
        return e.setData({
            isFetching: !0
        }), e.showLoading("正在加载"), e;
    },
    afterFetch: function(e, t) {
        var i = this, n = {
            beginTime: "",
            endTime: "",
            schedule: ""
        };
        (e = e || {}).full_price = 1 * (e.full_price || 0);
        var a = e.shift_desc.trim();
        !!a && (a = a.split(","));
        var s = (a || []).length > 0, r = !!e.is_need_time, o = !!e.is_real_name, c = !!e.is_need_address;
        i.hideLoading();
        var m = {
            mSchedule: n,
            mTimes: a,
            hasTime: s,
            isNeedTime: r,
            isRealName: o,
            isNeedAddress: c
        }, u = i.data || {};
        if (o && (m.mCount = ((i.data || {}).mSelUsers || []).length), m.mCount = o ? u.mSelUsers.length : u.mCount, 
        m.mCount = m.mCount || 0, t) return i.showError("获取线路详情失败").hideError(), m.mLine = {}, 
        m.mTotalPrice = 0, i.setData(m), i;
        var d = m.mCount, l = (e.begin_time || "").trim();
        n.beginTime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(l) ? l : ":" + l;
        var h = (e.end_time || "").trim();
        return n.endTime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(h) ? h : ":" + h, n.schedule = (e.schedule_description || "").trim(), 
        m.mLine = e, m.mTotalPrice = (e.full_price || 0) * d, i.setData(m), i.buildPrdInfo(), 
        i;
    },
    setNavTitle: function(e) {
        var t = this;
        return wx.setNavigationBarTitle({
            title: n.Format("{0} 出发", e)
        }), t;
    },
    buildPrdInfo: function() {
        var e = this, t = [], n = [], a = [], s = (this.data.mLine || {}).paramters || {}, r = i._.filter(s.TicketCheckinAddress || [], function(e) {
            return !!(e || {}).Desc;
        }), o = i._.filter(s.BookNote || [], function(e) {
            return !!(e || {}).Desc;
        }), c = i._.filter(s.TicketRefundRule || [], function(e) {
            return !!(e || {}).Desc;
        });
        r.forEach(function(e, i) {
            e = e || {};
            var n = r.length > 1 ? i + 1 + ". " + e.Desc : e.Desc;
            t.push(n);
        }), o.forEach(function(e, t) {
            e = e || {};
            var i = o.length > 1 ? t + 1 + ". " + e.Desc : e.Desc;
            n.push(i);
        }), c.forEach(function(e, t) {
            e = e || {};
            var i = c.length > 1 ? t + 1 + ". " + e.Desc : e.Desc;
            a.push(i);
        });
        var m = [ {
            title: "上车说明",
            desc: t
        }, {
            title: "预订说明",
            desc: n
        }, {
            title: "退改说明",
            desc: a
        } ];
        e.setData({
            mDescriptions: m
        });
    },
    getCostDetail: function() {
        var e = this.data || {}, t = {
            name: "票价",
            amount: e.mLine.full_price || 0
        };
        return e = {
            mCnt: e.mCount || 0,
            mTicket: t
        };
    },
    checkBookInfo: function() {
        var e = this.data || {}, t = e.mContractor || {}, i = (t.name || "").trim(), n = (t.mobile || "").trim(), a = {
            isTrue: !0,
            message: ""
        };
        return (e.mSelUsers || []).length <= 0 && e.mCount <= 0 ? (a.isTrue = !1, a.message = "请添加乘客", 
        a) : i ? n ? /^1\d{10}$/.test(n) ? a : (a.isTrue = !1, a.message = "请填写正确的联系人手机号", 
        a) : (a.isTrue = !1, a.message = "请填写联系人手机号", a) : (a.isTrue = !1, a.message = "请填写联系人姓名", 
        a);
    },
    addOrder: function() {
        var e = this, t = e.data || {}, s = t.mLine || {}, r = (getApp(), t.mTripInfo || {}), o = t.mParams || {}, c = wx.getStorageSync("BUS_WECHAT_UTMSOURCE"), m = [], u = [];
        s.is_need_address && m.push({
            name: "isGetBusAddress",
            desc: s.is_up_line ? "上车地址" : "下车地址",
            value: r.address
        }), s.is_need_time && m.push({
            name: "isGetBusTime",
            desc: "用车时间",
            value: r.time
        }), m.push({
            name: "airportName",
            desc: "机场名称",
            value: s.airport_name
        }), u.push({
            code: "10001",
            content: m
        });
        var d = 1 * (s.full_price * t.mCount).toFixed(2), l = s.line_sites || [], h = {
            ticketType: 0,
            ticketCount: 1 * t.mCount,
            ticketUintFee: 0,
            ticketSellPrice: 1 * s.full_price,
            ticketTotalPrice: d,
            busLineID: s.line_number,
            fromStopID: l[0].site_id,
            toStopID: l[l.length - 1].site_id,
            departDate: o.date
        }, g = t.mContractor || {}, f = {
            partnerName: "ctrip-wx-bus",
            orderType: 1,
            orderPrice: 1 * d,
            ticketCount: 1 * t.mCount,
            contact: {
                contactName: g.name,
                contactMobile: g.mobile
            },
            saleChannel: c || "wx-bus",
            tickets: [ h ],
            union: e.unionData,
            orderMark: JSON.stringify(u),
            fromCity: s.from_city_name,
            toCity: s.to_city_name
        };
        f.Union ? f.Union.allianceid || (f.Union.allianceid = 30613, f.Union.sourceid = 1060566) : f.Union = {
            allianceid: 30613,
            sourceid: 1060566
        }, f.trace = {
            source: c + "|" + n.Format("{0}--{1}", i.cwx.util.systemInfo.model.replace(/<[^>]*>/g, ""), i.cwx.util.systemInfo.version),
            ClientType: n.Format("{0}--wx--bus", i.cwx.config.platform),
            AppVersion: ""
        }, !!s.is_up_line && (f.flightNo = r.flight);
        var S = t.mInvoice || {};
        if (S.isNeed && (f.billReceiverName = S.name || "", f.billPostalCode = S.code || "", 
        f.billReceiverAddress = S.address || ""), t.isRealName) {
            var p = [];
            (t.mSelUsers || []).forEach(function(e) {
                e = e || {}, p.push({
                    passengerName: e.mName || "",
                    passengerType: 0,
                    identityType: e.mCardType || 1,
                    identityNo: e.mCardNo || "",
                    birthday: ""
                });
            }), f.passengers = p;
        }
        return e.showLoading("正在下单"), a.addAirbusOrder(f, {
            success: function(t) {
                e.sendUnionTrace(t.orderId), e.payOrder(t);
            },
            fail: function(t) {
                "wx重新调用该接口" == t ? e.onLogin() : (t = n.IsString(t) ? t : "下单失败1", e.hideLoading().showError(t).hideError(), 
                console.log("[book-addOrder] :: 下单失败2 > " + (JSON.stringify(t) || "")));
            }
        }), e;
    },
    sendUnionTrace: function(e) {
        i.cwx.mkt.sendUnionTrace(this, e);
    },
    onLogin: function() {
        if (i.cwx.user.isLogin()) return self;
        i.cwx.user.login({
            callback: function(e) {}
        });
    },
    payOrder: function(e) {
        var t = this, i = {};
        r.getUserCode({}, {
            success: function(n) {
                i.orderId = +e.orderId, i.jsCode = n, t.callPayment(i);
            },
            fail: function(e) {
                t.hideLoading().showError("下单失败3").hideError();
            }
        });
    },
    callPayment: function(e) {
        var t = this;
        e = e || {}, a.getAirbusPayment(e, {
            success: function(i) {
                i = i || {}, t.hideLoading(), i = i.paymentParam || {}, wx.requestPayment({
                    timeStamp: i.timeStamp,
                    nonceStr: i.nonceStr,
                    package: i.package,
                    signType: i.signType,
                    paySign: i.paySign,
                    success: function(i) {
                        wx.redirectTo({
                            url: n.AppendParams("../order/index", {
                                oid: e.orderId
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
                t.hideLoading().showError("下单失败4").hideError();
            }
        });
    },
    showLoading: function(e) {
        var t = this, i = {
            isLoading: !0,
            message: e || "加载中"
        };
        return t.setData({
            mLoading: i
        }), t;
    },
    hideLoading: function() {
        var e = this, t = {
            isLoading: !1,
            message: ""
        };
        return e.setData({
            isFetching: !1,
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