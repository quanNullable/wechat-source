function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var t, n = require("../../../cwx/cwx.js"), o = require("../buscommon/global.js"), a = require("../buscommon/utils.js"), i = require("../buscommon/service.js"), s = require("../buscommon/datahandler.js"), r = require("../../accounts/user.js");

(0, n.CPage)((t = {
    pageid: "10320655423",
    data: {
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
        mContractTel: "",
        mParams: {},
        mLine: {},
        mUsedCoupon: "",
        mInsPkg: "",
        mCouponGrp: [],
        mCouponList: [],
        mDetail: {},
        mSrvmsg: "",
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
        passtypeListA: 9,
        passtypeListB: 9
    },
    onLoad: function(e) {
        var t = this;
        e = e || {};
        var n = wx.getStorageSync("BUS_SELECT_PASSENGER") || [], o = 0, a = 0, s = 0, r = {}, u = t.calculateCnt(n);
        o = u.mXCnt, a = u.mACnt, s = u.mCCnt, r.totalCount = n.length, r.mXCnt = o, r.mACnt = a, 
        r.mCCnt = s;
        for (var c = [], m = 0; m < n.length; m++) if ("A" == n[m].mType) {
            c = n[m];
            break;
        }
        t.setData({
            mParams: e,
            mSelUsers: n,
            mCount: r,
            mTPicker: c
        }), t.setNavTitle(e), e.isNeedBusInfo = !0, e.isNeedServPackInfo = !0, e.abTest = [ {
            name: "160818_crm_nwpkg",
            version: "B"
        } ], i.getBusLine(e, {
            success: function(e) {
                var n = t.data || {}, o = t.updLineInfo((e || {})._hInfo).fStation;
                (!o || null == o || o.length < 0) && t.showError("获取线路详情异常，请返回列表页重试").hideError(), 
                (((t.updLineInfo((e || {})._hInfo) || {}).supportPassengerTypes || "身份证" || "").split("|") || []).forEach(function(e) {
                    "身份证" == e && t.setData({
                        passtypeListA: 1
                    }), "护照" == e && t.setData({
                        passtypeListB: 2
                    });
                });
                var a = "添加乘客";
                t.updLineInfo((e || {})._hInfo).takeChildNum && (a = "新增成人或携童乘客"), t.updLineInfo((e || {})._hInfo).ticketChild && (a = "新增成人或儿童乘客"), 
                t.updLineInfo((e || {})._hInfo).ticketChild && t.updLineInfo((e || {})._hInfo).takeChildNum && (a = "新增成人或儿童/携童乘客"), 
                t.setData({
                    mLine: t.updLineInfo((e || {})._hInfo),
                    mInsPkg: t.sortInsPackage((e || {})._servPackItem || []),
                    mCouponGrp: t.updCouponGrp((e || {})._couponGrp || []),
                    btutilte: a
                });
                n = t.data || {};
                t.updPrice().updCouponList(n.mCouponList).selDefaultCoupon().updPrice(), t.calcServiceFee().calcInvoiceStatus();
            },
            fail: function(e) {
                t.showError("获取线路详情失败").hideError(), console.log("[book-getBusLine] :: 获取线路详情失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    onUnload: function() {},
    onShow: function() {
        var e = this, t = {};
        wx.setStorageSync("BUS_NO_UPDATE", 1), s.Passengers.get(t, {
            success: function(t) {
                var n = e.data.mSelUsers || [], o = [], a = [], i = (e.data.mTPicker || {}).mPID || "", s = {};
                n.forEach(function(e) {
                    o.push(e.mPID);
                }), (t || []).forEach(function(e) {
                    e.mStatus = o.indexOf(e.mPID) >= 0, o.indexOf(e.mPID) >= 0 && a.push(e), i == e.mPID && (s = e);
                }), e.setData({
                    mUsers: t || [],
                    mSelUsers: a || [],
                    mTPicker: s
                });
                e.data;
                wx.setStorageSync("BUS_SELECT_PASSENGER", a || []);
            },
            fail: function(t) {
                console.log("[book-Passengers] :: 获取常旅信息失败 > " + (JSON.stringify(t) || "")), e.showError("获取常旅信息").hideError();
            }
        }), e.setData({
            mUsedCoupon: ""
        }), e.updPrice().fetchCouponList();
        var n = wx.getStorageSync("BUS_CONTACTORS_TEL") || "";
        e.setData({
            mContractTel: n
        });
    },
    onReady: function() {
        n.cwx.mkt.getUnion(function(e) {
            this.unionData = e;
        }.bind(this));
    },
    onNewPassenger: function(e) {
        "edit" != e && (e = "new");
        var t = this.data || {}, n = {
            type: e,
            mChildren: (t.mLine || {}).ticketChild || 0,
            mTakeChildren: (t.mLine || {}).ticketTakeChild || 0,
            mSurpported: (t.mLine || {}).supportPassengerTypes || "身份证"
        };
        wx.navigateTo({
            url: a.AppendParams("../passenger/index", n),
            success: function(e) {},
            fail: function(e) {
                console.log("[book-onAddPassenger] :: 跳转新增乘客页失败 > " + (JSON.stringify(e) || ""));
            }
        });
    },
    onShowCoupon: function() {
        var e = this;
        return e.setData({
            isSelPicker: !1,
            isShowMask: !0,
            isSelCoupon: !0,
            isAddPassenger: !1
        }), e;
    },
    onToggleMsg: function(e) {
        var t = this, n = [], o = (e.currentTarget.dataset || {}).id;
        return (t.data.mCouponList || []).forEach(function(e) {
            o == e.CouponCode && (e._ishowMsg = !e._ishowMsg), n.push(e);
        }), t.setData({
            mCouponList: n
        }), t;
    },
    onSelectCoupon: function(e) {
        var t = this, n = e.target.dataset || {}, o = e.currentTarget.dataset || {};
        if ("coupon_info" != n.name && o.enable) {
            var a = o.id, i = "";
            return (t.data.mCouponList || []).forEach(function(e) {
                a == e.CouponCode && (i = e);
            }), t.setData({
                mUsedCoupon: i
            }), t.onHideMask().updPrice(), t;
        }
    },
    onPickerChange: function() {
        var e = this;
        return e.setData({
            isSelPicker: !0,
            isShowMask: !0,
            isSelCoupon: !1,
            isAddPassenger: !0
        }), e;
    },
    onAddPassenger: function() {
        var e = this;
        return wx.setStorageSync("BUS_TEMP_PASSENGER", e.data.mSelUsers), wx.setStorageSync("BUS_OLD_PASSENGER", e.data.mUsers), 
        e.setData({
            isSelPicker: !1,
            isShowMask: !0,
            isSelCoupon: !1,
            isAddPassenger: !0
        }), e;
    },
    onConfirmPassenger: function() {
        var e = this, t = e.data || {}, n = [], o = 0, a = 0, i = 0, s = {};
        n = wx.getStorageSync("BUS_SELECT_PASSENGER");
        var r = e.calculateCnt(n);
        if (o = r.mXCnt, a = r.mACnt, i = r.mCCnt, o > a) wx.showModal({
            title: "温馨提示",
            content: "成人票数量需要大于携童票数量",
            showCancel: !1
        }); else {
            if (!(i > 0 && a <= 0)) {
                for (var u = e.data.mTPicker, c = 0; c < n.length; c++) if ("A" == n[c].mType) {
                    u = n[c];
                    break;
                }
                return s.totalCount = n.length, s.mXCnt = o, s.mACnt = a, s.mCCnt = i, e.setData({
                    mSelUsers: n,
                    mCount: s,
                    mTPicker: u
                }), e.onHideMask(), e.updPrice().updCouponList(t.mCouponList).selDefaultCoupon().updPrice(), 
                wx.setStorageSync("BUS_TEMP_PASSENGER", n), e;
            }
            wx.showModal({
                title: "温馨提示",
                content: "儿童必须有至少一名成人陪同",
                showCancel: !1
            });
        }
    },
    onCancelPassenger: function() {
        var e = this, t = [];
        return e.onHideMask(), t = wx.getStorageSync("BUS_OLD_PASSENGER"), e.setData({
            mUsers: t
        }), e;
    },
    onClickUser: function(e) {
        var t = this, n = (e.target || {}).dataset || {}, o = (e.currentTarget || {}).dataset || {}, a = o.value || "", i = t.data.mUsers || [];
        if (wx.setStorageSync("BUS_TEMP_PASSENGER", t.data.mSelUsers), wx.setStorageSync("BUS_OLD_PASSENGER", t.data.mUsers), 
        "edit" == n.type) {
            s = i.find(function(e) {
                return e.mPID == a;
            });
            return wx.setStorageSync("BUS_EDIT_PASSENGER", s), void t.onNewPassenger("edit");
        }
        if (!o.enable) return t;
        if (t.data.isSelPicker) {
            var s = i.find(function(e) {
                return e.mPID == a;
            });
            return t.setData({
                isSelPicker: !1,
                mTPicker: s
            }), void t.onHideMask();
        }
        var r = [], u = [], c = t.data.mLine || {}, m = [];
        m = wx.getStorageSync("BUS_SELECT_PASSENGER") || [];
        var d = c.takeChildNum || 0, l = c.maxSaleCount || 0, f = 0, p = 0, S = 0, h = 0, C = 0, g = 0, v = 0, P = 0;
        i.find(function(e) {
            e.mPID != a || e.mStatus || ("X" != e.mType && P++, "X" == e.mType && C++, "A" == e.mType && g++, 
            "C" == e.mType && v++, "" != e.mType && void 0 != e.mType || g++), e.mPID == a && e.mStatus && ("X" != e.mType && P--, 
            "X" == e.mType && C--, "A" == e.mType && g--, "C" == e.mType && v--, "" != e.mType && void 0 != e.mType || g++);
        }), m.forEach(function(e) {
            "X" != e.mType && f++, "X" == e.mType && S++, "A" == e.mType && p++, "C" == e.mType && h++, 
            "" != e.mType && void 0 != e.mType || p++;
        }), l > 0 && f + P > l ? wx.showModal({
            title: "温馨提示",
            content: "本车次最多支持添加" + l + "个乘客",
            showCancel: !1
        }) : S + C > d ? wx.showModal({
            title: "温馨提示",
            content: "本车次最多仅支持添加" + d + "个携童",
            showCancel: !1
        }) : (i.forEach(function(e) {
            e.mPID, e.mPID == a && (e.mStatus = !e.mStatus), e.mStatus && r.push(e), u.push(e);
        }), t.setData({
            mUsers: u
        }), wx.setStorageSync("BUS_SELECT_PASSENGER", r));
    },
    onSwitchFloat: function() {
        var e = this;
        return e.setData({
            isAcceptFloat: !e.data.isAcceptFloat
        }), e;
    },
    onShowDeclaration: function() {
        var e = this, t = e.data.mParams || {}, n = e.data.mSrvmsg || [];
        !n.length && e.showLoading("正在加载"), n.length > 0 && e.setData({
            isShowMask: !0,
            isShowDeclar: !0,
            isShowPrice: !1,
            isSelCoupon: !1,
            isAddPassenger: !1
        }), !n.length && i.getTicketService(t, {
            success: function(t) {
                e.hideLoading().setData({
                    isShowMask: !0,
                    isShowDeclar: !0,
                    isShowPrice: !1,
                    isSelCoupon: !1,
                    isAddPassenger: !1,
                    mSrvmsg: t || []
                });
            },
            fail: function(t) {
                console.log("[book-onShowDeclaration] :: 请求服务文案信息失败 > " + (JSON.stringify(t) || "")), 
                e.hideLoading().showError("网络异常，请重新尝试").hideError();
            }
        });
    },
    onHideDeclaration: function() {
        this.setData({
            isShowMask: !1,
            isShowDeclar: !1,
            isShowPrice: !1,
            isSelCoupon: !1,
            isAddPassenger: !1
        });
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
    }
}, e(t, "onHideCostDetail", function() {
    this.setData({
        isShowMask: !1,
        isShowDeclar: !1,
        isShowPrice: !1,
        isSelCoupon: !1,
        isAddPassenger: !1
    });
}), e(t, "onHideMask", function() {
    var e = this;
    return e.setData({
        isShowMask: !1,
        isShowDeclar: !1,
        isShowPrice: !1,
        isSelCoupon: !1,
        isAddPassenger: !1
    }), e;
}), e(t, "onMobileChange", function(e) {
    var t = this, n = e.detail || {};
    t.setData({
        mContractTel: n.value
    }), wx.setStorageSync("BUS_CONTACTORS_TEL", n.value);
}), e(t, "onPassengerDel", function(e) {
    var t = this, n = e.currentTarget.dataset || {}, o = n.id, a = n.type, i = n.index, s = t.data.mSelUsers || [], r = t.data.mUsers || [], u = [], c = this.data.mCount;
    s.forEach(function(e) {
        e.mPID == o && (e.mStatus = !e.mStatus);
    }), s.splice(i, 1), "X" == a && c.mXCnt--, "C" == a && c.mCCnt--, "A" == a && c.mACnt--, 
    c.totalCount--, r.forEach(function(e) {
        e.mPID == o && (e.mStatus = !e.mStatus), u.push(e);
    });
    for (var m = t.data.mTPicker, d = 0; d < s.length; d++) if ("A" == s[d].mType) {
        m = s[d];
        break;
    }
    t.setData({
        mUsers: r,
        mSelUsers: s,
        mCount: c,
        mTPicker: m
    });
    var l = t.data.mCouponList || [];
    t.updPrice().updCouponList(l).selDefaultCoupon().updPrice(), wx.setStorageSync("BUS_SELECT_PASSENGER", t.data.mSelUsers);
}), e(t, "onSwitchInsPkg", function(e) {
    var t = this, n = t.data.mInsPkg || {};
    return n.open = !n.open, t.setData({
        mInsPkg: n
    }), n.open ? t.setData({
        isShowInvoice: !0
    }) : t.setData({
        isNeedInvoice: !1,
        isShowInvoice: !1
    }), t.calcInvoiceStatus().updPrice(), t;
}), e(t, "onSwitchCouponPkg", function(e) {
    var t = this, n = (e.currentTarget.dataset, []);
    return t.data.mCouponGrp.forEach(function(e) {
        e.open = !e.open, "1元免票" != e.name && n.push(e);
    }), t.setData({
        mCouponGrp: n
    }), t.calcInvoiceStatus().updPrice(), t;
}), e(t, "onSwitchInvoice", function() {
    var e = this, t = e.data || {};
    return e.setData({
        isNeedInvoice: !t.isNeedInvoice
    }), e;
}), e(t, "onSubmit", function() {
    var e = this, t = e.checkBookInfo();
    return t.isTrue ? e.addOrder() : e.showError(t.message).hideError(), e;
}), e(t, "onCloseCoupon", function(e) {
    var t = this;
    return t.onHideMask(), t;
}), e(t, "onUnusedCoupon", function(e) {
    var t = this;
    return t.setData({
        mUsedCoupon: ""
    }), t.onHideMask().updPrice(), t;
}), e(t, "onUpdmail", function(e) {
    var t = this, n = e.detail || {}, o = t.data.mInvoice || {};
    return o.contactName = n.value || "", t.setData({
        mInvoice: o
    }), t;
}), e(t, "onUpdcode", function(e) {
    var t = this, n = e.detail || {}, o = t.data.mInvoice || {};
    return o.zipCode = n.value || "", t.setData({
        mInvoice: o
    }), t;
}), e(t, "onUpdAddress", function(e) {
    var t = this, n = e.detail || {}, o = t.data.mInvoice || {};
    return o.address = n.value || "", t.setData({
        mInvoice: o
    }), t;
}), e(t, "calcServiceFee", function() {
    var e = this, t = ((e.data || {}).mLine || {}).fullPrice || 0, n = t > 20 && t <= 100 ? 2 : t > 100 && t <= 200 ? 3 : t > 200 ? 5 : 0;
    return e.setData({
        mServiceFee: n
    }), e;
}), e(t, "calcInvoiceStatus", function() {
    var e = this, t = e.data || {}, n = t.mCouponGrp || [];
    return !((t.mInsPkg || {}).open || !!n.find(function(e) {
        return e.open;
    })) && e.setData({
        isNeedInvoice: !1
    }), e;
}), e(t, "setNavTitle", function(e) {
    var t = this, n = (e = e || {}).fromDate.indexOf("-"), o = e.fromDate.lastIndexOf("-"), i = e.fromDate.substr(n + 1, o - (n + 1)), s = e.fromDate.substr(o + 1), r = a.Format("{0}月{1}日 {2} 出发", i, s, e.fromTime);
    return wx.setNavigationBarTitle({
        title: r
    }), t;
}), e(t, "fetchCouponList", function() {
    var e = this;
    i.getCouponList({
        business_type: "bus",
        client_type: "ctrip.app"
    }, {
        success: function(t) {
            var n = t || [];
            e.updCouponList(n).selDefaultCoupon().updPrice();
        },
        fail: function(t) {
            e.updCouponList([]).selDefaultCoupon().updPrice();
        }
    });
}), e(t, "updCouponList", function(e) {
    var t = this, n = [], o = 0, a = t.data.mTotalPrice || 0, i = new Date();
    return i = i.setHours(0, 0, 0, 0), (e || []).forEach(function(e) {
        var t = new Date(e.DisplayCouponStartDate), s = 1 * new Date(e.DisplayCouponEndDate).getTime();
        t = t.setHours(0, 0, 0, 0), e._aviable = t <= i && i <= s, e._canuse = a > e.DeductionStrategy[0].DeductionAmount, 
        e._ishowMsg = !1, o++, n.push(e);
    }), t.setData({
        mCouponList: n
    }), t;
}), e(t, "selDefaultCoupon", function() {
    var e = this, t = e.data || {}, n = t.mCouponList || [], o = ((t.mUsedCoupon || {
        DeductionStrategy: []
    }).DeductionStrategy[0] || {}).DeductionAmount || 0;
    if (o < t.mTotalPrice && o > 0) return e;
    var a = n.filter(function(e) {
        return +e.DeductionStrategy[0].DeductionAmount < t.mTotalPrice;
    }) || [];
    a.sort(function(e, t) {
        return +t.DeductionStrategy[0].DeductionAmount - +e.DeductionStrategy[0].DeductionAmount;
    });
    var i = (a || []).length > 0 ? a[0] : "";
    return e.setData({
        mUsedCoupon: i
    }), e;
}), e(t, "getCostDetail", function() {
    var e = this.data || {}, t = (e.mCouponGrp || []).filter(function(e) {
        return "1元免票" != e.name ? e.open : 0;
    }), n = e.mUsedCoupon || {}, o = {
        name: "票价",
        amount: e.mLine.fullPrice || 0
    }, a = {
        name: "儿童票",
        amount: e.mLine.ticketChildFee || 0
    }, i = {
        name: "携童票",
        amount: 0
    }, s = {
        name: "服务费",
        amount: ((e.mLine.servPack || [])[0] || {}).amount || 0
    }, r = (e.mInsPkg || {}).open ? e.mInsPkg : "", n = {
        name: "优惠券",
        amount: +((n.DeductionStrategy || [])[0] || {}).DeductionAmount || 0
    };
    return e = {
        mCnt: e.mSelUsers || 0,
        mTicket: o,
        mTicketChild: a,
        mTicketTakeChild: i,
        mIns: r,
        mPack: t,
        mSrv: s.amount ? s : null,
        mCoupon: n.amount ? n : null
    };
}), e(t, "updLineInfo", function(e) {
    var t = (e = e || {}).fullPrice;
    return (!e.servPack || e.servPack.length <= 0 || e.servPack.amount <= 0) && (e.servPack = {
        type: "service",
        isShowZX: "",
        name: "服务费",
        amount: t > 20 && t <= 100 ? 2 : t > 100 && t <= 200 ? 3 : 5,
        flag: 1,
        orderDetailPageTitle: ""
    }), e;
}), e(t, "sortInsPackage", function(e) {
    var t = [], n = {};
    return t = (e || []).sort(function(e, t) {
        return e.amount - t.amount;
    }), (!(n = t.find(function(e) {
        e.type;
    })) || n.amount <= 0) && (n = t.find(function(e) {
        return e.amount > 0;
    })), n;
}), e(t, "updCouponGrp", function(e) {
    var t = [], n = 0;
    return e.forEach(function(e) {
        e.__id = "coupon_" + n, n++, t.push(e);
    }), t;
}), e(t, "updPrice", function() {
    var e = this, t = e.getCostDetail(), n = 0, o = e.data || {}, a = (o.mSelUsers || []).length, i = 0, s = 0, r = 0, u = e.calculateCnt(o.mSelUsers);
    return i = u.mXCnt, s = u.mACnt, r = u.mCCnt, 1 == o.mLine.ticketChild && (n += o.mLine.ticketChildFee * r), 
    1 == o.mLine.ticketTakeChild && (n += 0 * i), n += ((t.mTicket || {}).amount || 0) * s, 
    n += ((t.mSrv || {}).amount || 0) * (s + r), n += ((t.mIns || {}).amount || 0) * s, 
    n += ((t.mIns || {}).amount || 0) * r, (t.mPack || []).forEach(function(e) {
        n += ((e || {}).amount || 0) * a;
    }), n -= (t.mCoupon || {}).amount || 0, e.setData({
        mTotalPrice: n
    }), e;
}), e(t, "checkBookInfo", function() {
    var e = this, t = e.data || {}, n = {
        isTrue: !0,
        message: ""
    };
    if ((t.mSelUsers || []).length <= 0) return n.isTrue = !1, n.message = "请添加乘客", 
    n;
    if (!t.mLine.ticketTakeChild && t.mCount.mXCnt > 0) return n.isTrue = !1, n.message = "不支持携童票,请删除", 
    n;
    var o = t.mLine.maxSaleCount;
    if ((t.mSelUsers || []).length > o) return n.isTrue = !1, n.message = "最多" + o + "个乘客", 
    n;
    if (t.mSelUsers.forEach(function(t) {
        if (t.mCardType != e.data.passtypeListA && t.mCardType != e.data.passtypeListB) return n.isTrue = !1, 
        n.message = "存在不支持的证件类型", n;
    }), t.mLine.ticketTakeChild && t.mCount.mXCnt > t.mLine.takeChildNum) return n.isTrue = !1, 
    n.message = "携童票余票不足", n;
    if (!t.mLine.ticketChild && t.mCount.mCCnt > 0) return n.isTrue = !1, n.message = "不支持儿童票,请删除", 
    n;
    if (t.mCount && t.mCount.mACnt < t.mCount.mXCnt) return n.isTrue = !1, n.message = "成人票数量不能少于携童票，请添加足够数量的成人票", 
    n;
    if (t.mCount && t.mCount.mACnt <= 0 && t.mCount.mCCnt > 0) return n.isTrue = !1, 
    n.message = "至少需要一张成人票", n;
    if (!(t.mTPicker || {}).mName) return n.isTrue = !1, n.message = "请添加取票人", n;
    if (!(t.mContractTel || "").trim()) return n.isTrue = !1, n.message = "请填写手机号", 
    n;
    if (!/^1\d{10}$/.test(t.mContractTel)) return n.isTrue = !1, n.message = "请填写正确的手机号", 
    n;
    if (t.isNeedInvoice) {
        var a = e.checkInvoice();
        if (!a.isTrue) return n.isTrue = !1, n.message = a.message || "收件人信息不合法", n;
    }
    return n;
}), e(t, "checkInvoice", function() {
    var e = this.data || {}, t = {
        isTrue: !0,
        message: ""
    };
    if (!(e.mInvoice.contactName || "").trim()) return t.isTrue = !1, t.message = "收件人姓名不能为空", 
    t;
    var n = a.CheckCnName(e.mInvoice.contactName);
    return n.isTrue ? "" == (e.mInvoice.zipCode || "").trim() ? (t.isTrue = !1, t.message = "收件人邮编不能为空", 
    t) : (n = a.CheckAdrCode(e.mInvoice.zipCode)).isTrue ? (e.mInvoice.address || "").trim() ? t : (t.isTrue = !1, 
    t.message = "收件人地址不能为空", t) : (t.isTrue = !1, t.message = n.message || "请输入正确的邮编", 
    t) : (t.isTrue = !1, t.message = n.message || "请输入正确的中文姓名", t);
}), e(t, "addOrder", function() {
    var e = this, t = e.data || {}, s = t.mLine || {}, r = t.mParams || {}, u = t.mInsPkg || {}, c = (getApp(), 
    {
        ticket_type: "成人票",
        selectOffsetActivityType: 0,
        utmSource: wx.getStorageSync("BUS_WECHAT_UTMSOURCE"),
        Union: this.unionData
    });
    c.Union ? c.Union.allianceid || (c.Union.allianceid = 586924, c.Union.sid = 1373425) : c.Union = {
        allianceid: 586924,
        sid: 1373425
    }, 1366880 == c.Union.sid && (c.Union.sid = 1373425);
    var m = e.isAdultTicket();
    c.ticket_type = m ? "成人票" : "儿童票", c.fromCityName = s.fCity, c.toCityName = s.tCity, 
    c.fromStationName = s.fStation, c.toStationName = s.tStation, c.ticketDate = t.mParams.fromDate, 
    c.ticketTime = s.fTime, c.busNumber = s.busNumber, c.toTime = s.tTime, c.toDays = s.tDay, 
    c.symbol = r.symbol;
    var d = 1;
    c.identityInfoCount = t.mSelUsers.length, t.mSelUsers.forEach(function(e) {
        var t = o.CARDS_TYPE[e.mCardType], n = "";
        "X" == (n = e.mType) && (n = "tc"), c["identityInfo" + d] = a.Format("{0};{1};{2};{3};{4}", e.mName, t, e.mCardNo, "", n), 
        d++;
    });
    var l = o.CARDS_TYPE[t.mTPicker.mCardType];
    c.contactName = t.mTPicker.mName, c.contactPaperType = l, c.contactPaperNum = t.mTPicker.mCardNo, 
    c.contactMobile = t.mContractTel, c.acceptFromDateFloating = t.isAcceptFloat, c.acceptFreeInsurance = !0, 
    c.selectServicePackage2 = u.open ? u.serviceId : 0;
    var f = [];
    return (t.mCouponGrp || []).forEach(function(e) {
        e.open && "1元免票" != e.name && f.push(e.couponId);
    }), c.couponId = f.join("|"), c.useCouponClientType = 1, c.couponCode = t.mUsedCoupon ? t.mUsedCoupon.CouponCode : "", 
    t.isNeedInvoice && (c.invoiceInfo = t.mInvoice), c.clientType = a.Format("{0}--wx--zxbus", n.cwx.config.platform), 
    c.clientInfo = a.Format("{0}--{1}", n.cwx.util.systemInfo.model.replace(/<[^>]*>/g, ""), n.cwx.util.systemInfo.version), 
    c.launchDay = "20180301", e.showLoading("正在下单"), i.addBusOrder(c, {
        success: function(t) {
            e.sendUnionTrace(t.orderNumber), e.payOrder(t);
        },
        fail: function(t) {
            "wx重新调用该接口" == t ? e.onLogin() : (t = a.IsString(t) ? t : "下单失败", e.hideLoading().showError(t).hideError(), 
            console.log("[book-addOrder] :: 下单失败 > " + (JSON.stringify(t) || "")));
        }
    }), e;
}), e(t, "sendUnionTrace", function(e) {
    n.cwx.mkt.sendUnionTrace(this, e);
}), e(t, "onLogin", function() {
    n.cwx.user.isLogin() || n.cwx.user.login({
        callback: function(e) {}
    });
}), e(t, "isAdultTicket", function() {
    var e = !1;
    return ((this.data || {}).mSelUsers || []).forEach(function(t) {
        "A" != t.mType && "a" != t.mType || (e = !0);
    }), e;
}), e(t, "payOrder", function(e) {
    var t = this, n = {};
    r.getUserCode({}, {
        success: function(o) {
            n.order_number = +e.orderNumber, n.js_code = o, t.callPayment(n);
        },
        fail: function(e) {
            t.hideLoading().showError("下单失败").hideError();
        }
    });
}), e(t, "callPayment", function(e) {
    var t = this;
    e = e || {}, i.getPaymentData(e, {
        success: function(n) {
            n = n || {}, t.hideLoading(), wx.requestPayment({
                timeStamp: n.timeStamp,
                nonceStr: n.nonceStr,
                package: n.package,
                signType: n.signType,
                paySign: n.paySign,
                success: function(t) {
                    wx.redirectTo({
                        url: a.AppendParams("../order/index", {
                            oid: e.order_number
                        }),
                        success: function(e) {},
                        fail: function(e) {
                            console.log("[book-requestPayment] :: 跳转订单详情页失败 > " + (JSON.stringify(e) || ""));
                        }
                    });
                },
                fail: function(n) {
                    t.hideLoading().showError("支付失败").hideError(), wx.redirectTo({
                        url: a.AppendParams("../order/index", {
                            oid: e.order_number
                        }),
                        success: function(e) {},
                        fail: function(e) {
                            console.log("[book-requestPayment] :: 跳转订单详情页失败 > " + (JSON.stringify(e) || ""));
                        }
                    });
                }
            });
        },
        fail: function(e) {
            t.hideLoading().showError("下单失败").hideError();
        }
    });
}), e(t, "showLoading", function(e) {
    var t = this, n = {
        isLoading: !0,
        message: e || "加载中"
    };
    return t.setData({
        mLoading: n
    }), t;
}), e(t, "hideLoading", function() {
    var e = this, t = {
        isLoading: !1,
        message: ""
    };
    return e.setData({
        mLoading: t
    }), e;
}), e(t, "showError", function(e) {
    e = e || "操作失败";
    var t = this;
    return t.setData({
        isError: !0,
        mMessage: e
    }), t;
}), e(t, "hideError", function() {
    var e = this;
    return setTimeout(function() {
        e.setData({
            isError: !1,
            mMessage: ""
        });
    }, 2e3), e;
}), e(t, "calculateCnt", function(e) {
    var t = 0, n = 0, o = 0;
    e.forEach(function(e) {
        "X" == e.mType ? t++ : "A" == e.mType ? n++ : "C" == e.mType ? o++ : n++;
    });
    var a = {};
    return a.mXCnt = t, a.mACnt = n, a.mCCnt = o, a;
}), e(t, "formSubmit", function(e) {
    console.log("form发生了submit事件，携带数据为：", e.detail.value);
}), e(t, "formReset", function() {
    console.log("form发生了reset事件");
}), t));