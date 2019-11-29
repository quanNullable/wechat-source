function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = require("../../../cwx/cwx.js"), n = require("../api/datahandler.js"), s = require("../common/utils.js"), i = require("../api/api.js"), r = require("../common/global.js");

(0, a.CPage)({
    pageId: "",
    data: (t = {
        from_station_name: "",
        from_city_name: "",
        ship_name: "",
        to_station_name: "",
        to_city_name: "",
        from_date: "",
        from_time: "",
        to_date: "",
        to_day: "",
        book_type: "",
        to_time: "",
        use_time: "",
        seat_ps: "",
        seat_price: "",
        seat_name: "",
        seat_child_price: "",
        service_fee: "",
        isError: !1,
        mMessage: "",
        isShowPrice: !1,
        isShowDeclar: !1,
        isAddPassenger: !1,
        isSelCoupon: !1,
        isShowMask: !1,
        isSelPicker: !1,
        isAcceptFloat: !0,
        isShowInvoice: !1,
        isNeedInvoice: !1,
        mTotalPrice: 0,
        mServiceFee: 0,
        is_air_line: !1,
        isforeign: !1,
        mContractTel: "",
        mParams: {},
        mInsPkg: "",
        mCouponGrp: [],
        mCouponList: [],
        mDetail: {},
        mSrvmsg: [],
        mTPicker: "",
        mUsers: [],
        mSelUsers: [],
        mInvoice: {
            contactName: "",
            zipCode: "",
            address: ""
        },
        mLoading: {
            isLoading: !1,
            message: ""
        },
        mCount: {},
        btutilte: "新增乘客",
        vendor: "",
        goodsID: "",
        orderNumber: "",
        ischild: !1,
        passgenumber: 0,
        mUsedCoupon: ""
    }, e(t, "mCouponList", []), e(t, "website", ""), e(t, "airname", ""), e(t, "airprefix", ""), 
    e(t, "phonetype", ""), e(t, "phoneheard", ""), e(t, "airdate", ""), e(t, "airtime", ""), 
    e(t, "airdestination", ""), e(t, "foreign_passenger", {}), e(t, "countrydataarray", []), 
    e(t, "hasforeign", !1), e(t, "passangerneed", []), e(t, "passangertypes", []), e(t, "tpyepassid", {}), 
    t),
    onLoad: function(e) {
        var t = this;
        e = e || {}, wx.setStorageSync("SHIP_AIR_COMPANY_NAME", ""), wx.setStorageSync("SHIP_AIR_COMPANY_PREFIX", ""), 
        wx.setStorageSync("SHIP_AIR_CN", "中国大陆"), wx.setStorageSync("SHIP_AIR_CODE", "86"), 
        wx.setStorageSync("SHIP_PASS_EDIT", {});
        var a = e.from_station_name, n = e.ship_name, s = e.to_station_name, i = e.from_date, r = e.from_time, o = e.to_date, m = e.to_time, d = e.use_time, c = e.seat_price, u = e.seat_name, S = e.seat_ps, p = e.seat_child_price, g = e.service_fee, _ = e.from_city_name, f = e.to_city_name, l = e.to_day, h = e.vendor, C = e.website, y = {}, P = !1;
        if (e.foreign_passengercode && "undefined" != e.foreign_passengercode) {
            var T = e.foreign_passengercode, y = JSON.parse(T);
            P = !0;
        }
        v = [];
        if (e.passengercode && "undefined" != e.passengercode) var w = e.passengercode, v = JSON.parse(w);
        D = [];
        if (e.passengertypescode && "undefined" != e.passengertypescode) var E = e.passengertypescode, D = JSON.parse(E);
        var k = !1;
        (Object.keys(y) || []).length > 0 && (k = !0);
        var I = !1;
        if ("1" == e.is_air_line && (I = !0), "true" == e.ischild) A = !0; else var A = !1;
        var N = e.passgenumber, x = wx.getStorageSync("rule_desc"), U = x;
        t.setData({
            from_station_name: a,
            ship_name: n,
            to_station_name: s,
            from_date: i,
            to_date: o,
            from_time: r,
            to_time: m,
            use_time: d,
            seat_ps: S,
            seat_price: c,
            seat_name: u,
            seat_child_price: p,
            service_fee: g,
            rule_desc: x,
            from_city_name: _,
            to_city_name: f,
            to_day: l,
            is_air_line: I,
            mSrvmsg: U,
            vendor: h,
            ischild: A,
            passgenumber: N,
            website: C,
            date: "",
            time: "",
            foreign_passenger: y,
            isforeign: P,
            hasforeign: k,
            passangerneed: v,
            passangertypes: D
        });
    },
    onUnload: function() {},
    onReady: function() {
        a.cwx.mkt.getUnion(function(e) {
            var t = e;
            t || (t = {
                allianceid: 586924,
                sid: 1373426
            }), t.allianceid || (t = {
                allianceid: 586924,
                sid: 1373426
            }), 1366880 == t.sid && (t.sid = 1373426);
            var a = {
                AllianceID: e.allianceid,
                SID: e.sid,
                OUID: e.ouid,
                SourceID: e.sourceid
            };
            this.unionData = a;
        }.bind(this));
    },
    onShow: function() {
        var e = this, t = {};
        e.setData({
            airname: wx.getStorageSync("SHIP_AIR_COMPANY_NAME") || "",
            airprefix: wx.getStorageSync("SHIP_AIR_COMPANY_PREFIX") || "",
            phonetype: wx.getStorageSync("SHIP_AIR_CN") || "",
            phoneheard: wx.getStorageSync("SHIP_AIR_CODE") || ""
        });
        var a = e.data.tpyepassid, s = wx.getStorageSync("SHIP_PASS_EDIT") || {};
        a = Object.assign(a, s), e.setData({
            tpyepassid: a
        }), e.data.isforeign || n.Passengers.get(t, {
            success: function(t) {
                var a = e.data.mSelUsers || [], n = [], s = [], i = (e.data.mTPicker || {}).mPID || "", r = {};
                a.forEach(function(e) {
                    n.push(e.mPID);
                }), (t || []).forEach(function(e) {
                    e.mStatus = n.indexOf(e.mPID) >= 0, n.indexOf(e.mPID) >= 0 && s.push(e), i == e.mPID && (r = e);
                }), e.setData({
                    mUsers: t || [],
                    mSelUsers: s || [],
                    mTPicker: r
                });
                e.data;
                wx.setStorageSync("BUS_SELECT_PASSENGER", s || []);
            },
            fail: function(t) {
                console.log("[book-Passengers] :: 获取常旅信息失败 > " + (JSON.stringify(t) || "")), e.showError("获取常旅信息").hideError();
            }
        }, a), e.updPrice();
        var i = wx.getStorageSync("BUS_CONTACTORS_TEL") || "";
        e.setData({
            mContractTel: i
        });
    },
    onShowDeclaration: function() {
        this.setData({
            isShowMask: !0,
            isShowDeclar: !0,
            isShowPrice: !1,
            isSelCoupon: !1,
            isAddPassenger: !1
        });
    },
    onHideDeclaration: function() {
        this.setData({
            isShowMask: !1,
            isShowDeclar: !1,
            isShowPrice: !1,
            isSelCoupon: !1,
            isSelPicker: !1,
            isAddPassenger: !1
        });
    },
    onShowCoupon: function() {
        var e = this;
        e.setData({
            isSelPicker: !1,
            isShowMask: !0,
            isSelCoupon: !0,
            isAddPassenger: !1,
            isShowDeclar: !1,
            isShowPrice: !1
        }), e.getuserCoupon();
    },
    getuserCoupon: function() {
        var e = this, t = {};
        e.showLoading("获取优惠券列表"), i.getCoupon(t, {
            success: function(t) {
                e.hideLoading();
                var a = t.return;
                a = a.length > 0 ? t.return : [], e.setData({
                    mCouponList: a
                });
            },
            fail: function(t) {
                e.hideLoading().showError(t).hideError(), console.log("[book-addOrder] :: 获取优惠券失败 > ");
            }
        });
    },
    onToggleMsg: function(e) {
        var t = this, a = [], n = (e.currentTarget.dataset || {}).id;
        return (t.data.mCouponList || []).forEach(function(e) {
            n == e.CouponCode && (e._ishowMsg = !e._ishowMsg), a.push(e);
        }), t.setData({
            mCouponList: a
        }), t;
    },
    onSelectCoupon: function(e) {
        var t = this, a = e.target.dataset || {}, n = e.currentTarget.dataset || {};
        if ("coupon_info" != a.name && n.enable) {
            var s = n.id, r = "";
            (t.data.mCouponList || []).forEach(function(e) {
                s == e.CouponCode && (r = e);
            });
            var o = {
                coupon_code: r.CouponCode
            };
            return i.checkCoupon(o, {
                success: function(e) {
                    t.setData({
                        mUsedCoupon: r
                    }), t.onHideMask().updPrice();
                },
                fail: function(e) {
                    t.hideLoading().showError(e).hideError(), console.log("[book-addOrder] :: 该优惠券不能使用 > ");
                }
            }), t;
        }
    },
    onCloseCoupon: function(e) {
        var t = this;
        return t.onHideMask(), t;
    },
    onUnusedCoupon: function(e) {
        var t = this;
        return t.setData({
            mUsedCoupon: ""
        }), t.onHideMask().updPrice(), t;
    },
    onMobileChange: function(e) {
        var t = this, a = e.detail || {};
        t.setData({
            mContractTel: a.value
        }), wx.setStorageSync("BUS_CONTACTORS_TEL", a.value);
    },
    onAddPassenger: function() {
        if (!this.data.isforeign) {
            var e = this;
            return wx.setStorageSync("BUS_TEMP_PASSENGER", e.data.mSelUsers), wx.setStorageSync("BUS_OLD_PASSENGER", e.data.mUsers), 
            e.setData({
                isSelPicker: !1,
                isShowMask: !0,
                isSelCoupon: !1,
                isAddPassenger: !0,
                isShowDeclar: !1,
                isShowPrice: !1
            }), e;
        }
        this.onNewPassenger("new");
    },
    onClickUser: function(e) {
        var t = this, a = (e.target || {}).dataset || {}, n = (e.currentTarget || {}).dataset || {}, s = n.value || "", i = n.index || 0, r = t.data.mUsers || [];
        if (wx.setStorageSync("BUS_TEMP_PASSENGER", t.data.mSelUsers), wx.setStorageSync("BUS_OLD_PASSENGER", t.data.mUsers), 
        "edit" == a.type) {
            o = r.find(function(e) {
                return e.mPID == s;
            });
            return wx.setStorageSync("SHIP_EDIT_PASSENGER", o), void t.onNewPassenger("edit");
        }
        if (!n.enable) return t;
        if (t.data.isSelPicker) {
            var o = {};
            return o = t.data.isforeign ? t.data.mSelUsers[i] : r.find(function(e) {
                return e.mPID == s;
            }), t.setData({
                isSelPicker: !1,
                mTPicker: o
            }), void t.onHideMask();
        }
        var m = [], d = [], c = [];
        c = wx.getStorageSync("BUS_SELECT_PASSENGER") || [];
        var u = t.data.passgenumber || 0, S = 0, p = 0, g = 0, _ = 0, f = 0, l = 0, h = 0, C = 0, y = t.checkpass(r, s);
        if (!y.isTrue) return t.showError(y.mMessage).hideError(), t;
        r.find(function(e) {
            e.mPID != s || e.mStatus || ("携童票" != e.mType && C++, "携童票" == e.mType && f++, "成人票" == e.mType && l++, 
            "儿童票" == e.mType && h++, "" != e.mType && void 0 != e.mType || l++), e.mPID == s && e.mStatus && ("携童票" != e.mType && C--, 
            "携童票" == e.mType && f--, "成人票" == e.mType && l--, "儿童票" == e.mType && h--, "" != e.mType && void 0 != e.mType || l++);
        }), c.forEach(function(e) {
            "携童票" != e.mType && S++, "携童票" == e.mType && g++, "成人票" == e.mType && p++, "儿童票" == e.mType && _++, 
            "" != e.mType && void 0 != e.mType || p++;
        }), S + C > u ? wx.showModal({
            title: "温馨提示",
            content: "乘客数量超限",
            showCancel: !1
        }) : (r.forEach(function(e) {
            e.mPID, e.mPID == s && (e.mStatus = !e.mStatus), e.mStatus && m.push(e), d.push(e);
        }), t.setData({
            mUsers: d
        }), wx.setStorageSync("BUS_SELECT_PASSENGER", m));
    },
    onConfirmPassenger: function() {
        var e = this, t = (e.data, []), a = 0, n = 0, s = 0, i = {};
        t = wx.getStorageSync("BUS_SELECT_PASSENGER");
        var r = e.calculateCnt(t);
        if (a = r.mXCnt, n = r.mACnt, s = r.mCCnt, a > n) wx.showModal({
            title: "温馨提示",
            content: "成人票数量需要大于携童票数量",
            showCancel: !1
        }); else {
            if (!(s > 0 && n <= 0)) {
                for (var o = e.data.mTPicker, m = 0; m < t.length; m++) if ("成人票" == t[m].mType) {
                    o = t[m];
                    break;
                }
                return i.totalCount = t.length, i.mXCnt = a, i.mACnt = n, i.mCCnt = s, e.setData({
                    mSelUsers: t,
                    mCount: i,
                    mTPicker: o
                }), e.onHideMask(), e.updPrice().updPrice(), wx.setStorageSync("BUS_TEMP_PASSENGER", t), 
                e;
            }
            wx.showModal({
                title: "温馨提示",
                content: "儿童必须有至少一名成人陪同",
                showCancel: !1
            });
        }
    },
    checkpass: function(e, t) {
        var a = this, n = {
            isTrue: !0,
            mMessage: ""
        };
        return e.find(function(e) {
            if (e.mPID == t && !e.mStatus) {
                if (!(a.data.passangertypes.indexOf(e.mCardType) >= 0)) return n.isTrue = !1, n.mMessage = "暂不支持该证件类型", 
                n;
                a.data.passangerneed.find(function(t) {
                    if (e.mCardType == t.id_type) {
                        if (t.cname && !e.mName) return n.isTrue = !1, n.mMessage = "缺少姓名，您可以编辑该乘客", n;
                        if (t.ename && !e.enFirstName) return n.isTrue = !1, n.mMessage = "缺少姓，您可以编辑该乘客", 
                        n;
                        if (t.ename && !e.enLastName) return n.isTrue = !1, n.mMessage = "缺少名，您可以编辑该乘客", 
                        n;
                        if (t.id_num && !e.mCardNo) return n.isTrue = !1, n.mMessage = "缺少证件信息，您可以编辑该乘客", 
                        n;
                        if (t.birth && !e.mBirth) return n.isTrue = !1, n.mMessage = "缺少出生日期，您可以编辑该乘客", 
                        n;
                        if (t.sex && !e.gender) return n.isTrue = !1, n.mMessage = "信息不完整，您可以编辑该乘客", n;
                    }
                });
            }
        }), n;
    },
    onCancelPassenger: function() {
        var e = this, t = [];
        return e.onHideMask(), t = wx.getStorageSync("BUS_OLD_PASSENGER"), e.setData({
            mUsers: t
        }), e;
    },
    onHideMask: function() {
        var e = this;
        return e.setData({
            isShowMask: !1,
            isShowDeclar: !1,
            isShowPrice: !1,
            isSelCoupon: !1,
            isAddPassenger: !1
        }), e;
    },
    calculateCnt: function(e) {
        var t = 0, a = 0, n = 0;
        e.forEach(function(e) {
            "携童票" == e.mType ? t++ : "成人票" == e.mType ? a++ : "儿童票" == e.mType ? n++ : a++;
        });
        var s = {};
        return s.mXCnt = t, s.mACnt = a, s.mCCnt = n, s;
    },
    updPrice: function() {
        var e = this, t = e.getCostDetail(), a = 0, n = e.data || {}, s = (n.mSelUsers || []).length, i = 0, r = 0, o = e.calculateCnt(n.mSelUsers);
        return o.mXCnt, i = o.mACnt, r = o.mCCnt, n.ischild && (a += n.seat_child_price * r), 
        a += n.seat_price * i, a += ((t.mSrv || {}).amount || 0) * s, a += ((t.mIns || {}).amount || 0) * i, 
        a += ((t.mIns || {}).amount || 0) * r, a -= (t.mCoupon || {}).amount || 0, e.setData({
            mTotalPrice: a
        }), e;
    },
    getCostDetail: function() {
        var e = this.data || {}, t = e.mUsedCoupon || {}, a = {
            name: "成人票",
            amount: e.seat_price || 0
        }, n = {
            name: "儿童票",
            amount: e.seat_child_price || 0
        }, s = {
            name: "服务费",
            amount: e.service_fee || 0
        }, i = (e.mInsPkg || {}).open ? e.mInsPkg : "", t = {
            name: "优惠券",
            amount: +((t.DeductionStrategy || [])[0] || {}).DeductionAmount || 0
        };
        return e = {
            mCnt: e.mSelUsers || 0,
            mTicket: a,
            mTicketChild: n,
            mIns: i,
            mSrv: s || null,
            mCoupon: t.amount ? t : null
        };
    },
    onPassengerDel: function(e) {
        var t = this, a = e.currentTarget.dataset || {}, n = a.id, s = a.type, i = a.index, r = t.data.mSelUsers || [], o = t.data.mUsers || [], m = [], d = this.data.mCount;
        if ("成人票" == s && d.mACnt <= d.mCCnt + d.mXCnt) wx.showModal({
            title: "温馨提示",
            content: "若删除该成人票，则会导致儿童票或携童票被删除，请知晓",
            success: function(e) {
                if (e.confirm) {
                    var a = r[0];
                    r.forEach(function(e) {
                        e.mPID == n && (e.mStatus = !e.mStatus);
                    }), r[0].mStatus = !r[0].mStatus, r.splice(i, 1), r.splice(0, 1), o.forEach(function(e) {
                        e.mPID != n && e.mPID != a.mPID || (e.mStatus = !e.mStatus, m.push(e));
                    }), "携童票" == a.mType && d.mXCnt--, "儿童票" == a.mType && d.mCCnt--, d.mACnt--, d.totalCount = d.totalCount - 2;
                    for (var s = t.data.mTPicker, c = 0; c < r.length; c++) if ("成人票" == r[c].mType) {
                        s = r[c];
                        break;
                    }
                    t.setData({
                        mUsers: o,
                        mSelUsers: r,
                        mCount: d,
                        mTPicker: s
                    }), t.updPrice().updPrice(), wx.setStorageSync("BUS_SELECT_PASSENGER", r);
                }
            }
        }); else {
            r.forEach(function(e) {
                e.mPID == n && (e.mStatus = !e.mStatus);
            }), r.splice(i, 1), "携童票" == s && d.mXCnt--, "儿童票" == s && d.mCCnt--, "成人票" == s && d.mACnt--, 
            d.totalCount--, o.forEach(function(e) {
                e.mPID == n && (e.mStatus = !e.mStatus), m.push(e);
            });
            for (var c = t.data.mTPicker, u = 0; u < r.length; u++) if ("成人票" == r[u].mType) {
                c = r[u];
                break;
            }
            t.setData({
                mUsers: o,
                mSelUsers: r,
                mCount: d,
                mTPicker: c
            }), t.updPrice().updPrice(), wx.setStorageSync("BUS_SELECT_PASSENGER", t.data.mSelUsers);
        }
    },
    onPickerChange: function() {
        var e = this;
        return wx.setStorageSync("BUS_TEMP_PASSENGER", e.data.mSelUsers), wx.setStorageSync("BUS_OLD_PASSENGER", e.data.mUsers), 
        e.setData({
            isSelPicker: !0,
            isShowMask: !0,
            isSelCoupon: !1,
            isAddPassenger: !0
        }), e;
    },
    onShowCostDetail: function() {
        var e = this, t = {};
        return t = e.getCostDetail(), e.data.isShowPrice ? e.onHideCostDetail() : e.setData({
            isShowMask: !0,
            isShowDeclar: !1,
            isAddPassenger: !1,
            isSelCoupon: !1,
            isShowPrice: !0,
            mDetail: t
        }), e;
    },
    onHideCostDetail: function() {
        this.setData({
            isShowMask: !1,
            isShowDeclar: !1,
            isShowPrice: !1,
            isSelCoupon: !1,
            isAddPassenger: !1
        });
    },
    editPassenger: function(e) {
        var t = this, a = ((e.currentTarget || {}).dataset || {}).index || 0, n = t.data.mSelUsers[a];
        wx.setStorageSync("SHIP_EDIT_PASSENGER", n), t.onNewPassenger("edit", a);
    },
    onNewPassenger: function(e, t) {
        var n = this, i = (n.data || {}).ischild, r = t || 0, o = {
            type: e,
            mChildren: i,
            mindex: r
        }, m = "../compassenger/index";
        if (n.data.isforeign) {
            m = "../foreignpassenger/index";
            var d = JSON.stringify(n.data.foreign_passenger);
            o.foreign_passengercode = d, a.cwx.component.shipforeignpassanger({
                data: o,
                immediateCallback: function(t) {
                    var a = n.data.mSelUsers;
                    "edit" == e ? a.splice(r, 1, t) : a.push(t);
                    for (var s = n.data.mTPicker, i = 0; i < a.length; i++) if ("成人票" == a[i].mType) {
                        s = a[i];
                        break;
                    }
                    var o = 0, m = 0, d = 0, c = {}, u = n.calculateCnt(a);
                    o = u.mXCnt, m = u.mACnt, d = u.mCCnt, c.totalCount = a.length, c.mXCnt = o, c.mACnt = m, 
                    c.mCCnt = d, n.setData({
                        mSelUsers: a,
                        mTPicker: s,
                        mUsers: a,
                        mCount: c
                    });
                },
                navComplete: function() {}
            });
        } else o.passengercode = JSON.stringify(n.data.passangerneed), o.passengertypescode = JSON.stringify(n.data.passangertypes), 
        wx.navigateTo({
            url: s.AppendParams(m, o),
            success: function(e) {},
            fail: function(e) {
                console.log("[book-onAddPassenger] :: 跳转新增乘客页失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    onSubmit: function() {
        var e = this, t = e.checkBookInfo();
        return t.isTrue ? e.addOrder() : e.showError(t.message).hideError(), e;
    },
    checkBookInfo: function() {
        var e = this, t = e.data || {}, a = {
            isTrue: !0,
            message: ""
        };
        if ((t.mSelUsers || []).length <= 0) return a.isTrue = !1, a.message = "请添加乘客", 
        a;
        if (t.mCount.mXCnt > 0) return a.isTrue = !1, a.message = "暂不支持携童票,请删除", a;
        if (!t.ischild && t.mCount.mCCnt > 0) return a.isTrue = !1, a.message = "不支持儿童票,请删除", 
        a;
        if (t.mCount && t.mCount.mACnt <= 0 && t.mCount.mCCnt > 0) return a.isTrue = !1, 
        a.message = "至少需要一张成人票", a;
        if (t.mCount && t.mCount.mACnt + t.mCount.mCCnt > t.passgenumber) return a.isTrue = !1, 
        a.message = "最多添加" + t.passgenumber + "位乘客", a;
        if (!(t.mTPicker || {}).mCardNo) return a.isTrue = !1, a.message = "请添加取票人", a;
        if (!(t.mContractTel || "").trim()) return a.isTrue = !1, a.message = "请填写手机号", 
        a;
        if (!/^1\d{10}$/.test(t.mContractTel)) return a.isTrue = !1, a.message = "请填写正确的手机号", 
        a;
        if (e.data.is_air_line) {
            if (!(t.airprefix || "").trim()) return a.isTrue = !1, a.message = "请选择航班", a;
            if (!(t.airdate || "").trim()) return a.isTrue = !1, a.message = "请选择航班日期", a;
            if (!(t.airtime || "").trim()) return a.isTrue = !1, a.message = "请选择航班时间", a;
            if (!(t.airdestination || "").trim()) return a.isTrue = !1, a.message = "请填写地址", 
            a;
        }
        return a;
    },
    addOrder: function() {
        var e = this, t = e.data || {}, a = wx.getStorageSync("SHIP_WECHAT_UTMSOURCE"), n = {
            union: this.unionData,
            contentType: "json",
            ship_name: t.ship_name,
            seat_name: t.seat_name,
            from_date: t.from_date,
            from_time: t.from_time,
            from_city_name: t.from_city_name,
            from_station_name: t.from_station_name,
            use_time_fmt: t.use_time,
            to_date: t.to_date,
            to_time: t.to_time,
            to_city_name: t.to_city_name,
            to_station_name: t.to_station_name,
            to_day: t.to_day,
            book_type: t.book_type,
            ship_price: t.seat_price,
            seat_child_price: t.seat_child_price,
            insurance_type: "0",
            taopiao_trip_time: "",
            taopiao_back_date: "",
            utm_source: a,
            is_need_invoice: !1,
            admission_ticket_date: null,
            is_need_alternative: !1,
            vendor: t.vendor,
            is_seckill: null
        }, s = {
            checkAcceptDispatch: !1,
            address: ""
        };
        n.dispatch_info = s;
        var o = [];
        t.mSelUsers.forEach(function(t) {
            var a = {}, n = "adult";
            if ("儿童票" == t.mType && (n = "child"), a.passenger_type = n, t.mName && (a.cname = t.mName), 
            t.enLastName && (a.ename = t.enLastName + "/" + t.enFirstName), t.gender) {
                var s = r.GANDER_TYPE[t.gender] || "";
                a.gender = s;
            }
            if (t.mBirth && (a.birth = t.mBirth || ""), t.frequency && (a.frequency = t.frequency || ""), 
            t.stay_days && (a.stay_days = t.stay_days || ""), t.visa_date && (a.visa_date = t.visa_date || ""), 
            a.id_num = t.mCardNo || "", a.id_type = t.mCardType || "", a.country = "", e.data.isforeign) {
                var i = t.Nationality || "";
                a.country = i, a.nationality = i, a.id_card = t.id_card;
            }
            e.data.is_air_line && (a.flight_no = e.data.airprefix, a.flight_date_time = e.data.airdate + " " + e.data.airtime, 
            a.flight_to_address = e.data.airdestination), o.push(a);
        }), n.passengers = o;
        var m = {
            cname: t.mTPicker.mName,
            id_num: t.mTPicker.mCardNo,
            id_type: t.mTPicker.mCardType,
            phone_num: t.mContractTel,
            phone_num_code: e.data.phoneheard || "86",
            contact_email: "",
            ename: t.mTPicker.enLastName + "/" + t.mTPicker.enFirstName
        };
        n.fetcher = m, n.orderChannel = "wxZxShip", n.clientType = "wxShip", n.coupon_code = t.mUsedCoupon ? t.mUsedCoupon.CouponCode : "";
        var d = {
            is_da_zai: "0"
        };
        return n.car_info = d, e.showLoading("正在下单"), i.addShipOrder(n, {
            success: function(t) {
                e.setData({
                    mUsedCoupon: ""
                }), e.payOrder(t);
            },
            fail: function(t) {
                e.hideLoading().showError(t).hideError(), console.log("[book-addOrder] :: 下单失败 > ");
            }
        }), e;
    },
    payOrder: function(e) {
        var t = this, a = e.GoodsId, n = e.OrderNumber;
        t.setData({
            goodsID: a,
            orderNumber: n
        }), t.getOpenIdTap();
    },
    getOpenIdTap: function(e) {
        var t = this;
        wx.login({
            success: function(e) {
                var a = {
                    goodsId: t.data.goodsID,
                    orderId: t.data.orderNumber,
                    js_code: e.code,
                    paymentType: "weixinapp"
                };
                i.getpayment(a, {
                    success: function(e) {
                        var n = JSON.parse(e.data);
                        wx.requestPayment({
                            timeStamp: n.timeStamp,
                            nonceStr: n.nonceStr,
                            package: n.package,
                            signType: n.signType,
                            paySign: n.paySign,
                            success: function(e) {
                                wx.redirectTo({
                                    url: s.AppendParams("../orderdetail/orderdetail", {
                                        orderId: a.orderId
                                    }),
                                    success: function(e) {},
                                    fail: function(e) {
                                        t.hideLoading().showError("支付失败").hideError(), console.log("[book-requestPayment] :: 跳转订单详情页失败 > " + (JSON.stringify(e) || ""));
                                    }
                                });
                            },
                            fail: function(e) {
                                t.hideLoading().showError("支付失败").hideError(), wx.redirectTo({
                                    url: s.AppendParams("../orderdetail/orderdetail", {
                                        orderId: a.orderId
                                    }),
                                    success: function(e) {},
                                    fail: function(e) {
                                        t.hideLoading().showError("支付失败").hideError(), console.log("[book-requestPayment] :: 跳转订单详情页失败 > " + (JSON.stringify(e) || ""));
                                    }
                                });
                            }
                        });
                    }
                });
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
    },
    selectaircompany: function() {
        var e = this, t = {
            from_station_name: e.data.from_station_name,
            to_station_name: e.data.to_station_name,
            website: e.data.website
        };
        wx.navigateTo({
            url: s.AppendParams("../airline/index", t),
            success: function(e) {},
            fail: function(e) {
                console.log("[book-onAddPassenger] :: 跳转选择航空公司失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    selectphonetype: function() {
        var e = {
            IScountry: "IScountrycode"
        };
        wx.navigateTo({
            url: s.AppendParams("../countrylist/index", e),
            success: function(e) {},
            fail: function(e) {
                console.log("[book-onAddPassenger] :: 跳转选择国际和地区 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    onairdestination: function(e) {
        var t = this, a = e.detail || {};
        t.setData({
            airdestination: a.value
        });
    },
    bindDateChange: function(e) {
        this.setData({
            airdate: e.detail.value
        });
    },
    bindTimeChange: function(e) {
        this.setData({
            airtime: e.detail.value
        });
    }
});