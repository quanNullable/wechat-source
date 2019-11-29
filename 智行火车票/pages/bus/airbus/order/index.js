var e = require("../../../cwx/cwx.js"), t = require("../../buscommon/global.js"), i = require("../../buscommon/utils.js"), r = require("../../buscommon/service.js");

(0, e.CPage)({
    pageid: "",
    data: {
        mParams: {},
        isError: !1,
        mMessage: "",
        isShowDeclar: !1,
        isShowMask: !1,
        mLine: {},
        mLoading: {
            isLoading: !1,
            message: ""
        },
        mTitle: "订单详情",
        mTicket: {},
        mInvoice: {},
        mMarks: [],
        mPassengers: []
    },
    onLoad: function(e) {
        var t = this;
        e = e || {}, t.setData({
            mParams: e
        }), t.setNavTitle().showLoading("正在加载");
        var i = {
            OrderID: e.orderId || e.oid || "2149176160"
        };
        r.getAirbusOrder(i, {
            success: function(e) {
                t.afterFetch(e, !1);
            },
            fail: function(e) {
                t.afterFetch(e, !0), console.log("[order-getAirbusOrder] :: 获取线路详情失败 > " + (JSON.stringify(e) || ""));
            }
        }), wx.setStorageSync("AIR_BUS_INVOICE", {});
    },
    onUnload: function() {},
    onShow: function() {},
    onReady: function() {},
    onShowDeclaration: function() {
        this.setData({
            isShowMask: !0,
            isShowDeclar: !0
        });
    },
    onHideDeclaration: function() {
        this.setData({
            isShowMask: !1,
            isShowDeclar: !1
        });
    },
    onHideMask: function() {
        var e = this;
        return e.setData({
            isShowMask: !1,
            isShowDeclar: !1
        }), e;
    },
    beforeFetch: function() {
        var e = this;
        return e.setData({
            isFetching: !0
        }), e.showLoading("正在加载"), e;
    },
    afterFetch: function(e, t) {
        e = e || {};
        var i = this;
        i.hideLoading();
        var r = i.mapTicketInfo(e), a = i.parseOrderMark(e), n = i.mapPassengers(e), s = i.createInformation(e), o = {
            code: e.billPostalCode || "",
            name: e.billReceiverName || "",
            address: e.billReceiverAddress || ""
        };
        return i.setData({
            mLine: e,
            mTicket: r,
            mMarks: a,
            mInvoice: o,
            mInfomations: s,
            mPassengers: n
        }), t ? (i.showError("获取订单详情失败").hideError(), i.setNavTitle(null), i) : (i.setNavTitle(e), 
        i);
    },
    mapPassengers: function(e) {
        var i = [];
        return (e.passengers || []).forEach(function(e) {
            e = e || {}, i.push({
                name: e.passengerName || "",
                type: t.CARDS_TYPE[e.identityType],
                ID: e.identityNo
            });
        }), i;
    },
    mapTicketInfo: function(e) {
        var t = ((e.Route || {}).Tickets || [])[0] || {};
        return {
            status: t.TicketStateCN || "待出票",
            price: t.TicketSellPrice || 0,
            count: t.TicketCount || 0,
            type: t.TicketTypeCn || "普通票",
            mount: (t.TicketSellPrice || 0) * (t.TicketCount || 0)
        };
    },
    parseOrderMark: function(e) {
        var t = e.OrderMark || "";
        !!t && (t = JSON.parse(t));
        var i = [];
        return ((t = (t || [])[0] || {}).content || []).forEach(function(e) {
            "airportname" != ((e = e || {}).name || "").toLowerCase() && i.push(e);
        }), !!e.flightNo && i.push({
            name: "flightNo",
            desc: "航班号",
            value: e.flightNo
        }), i;
    },
    createInformation: function(e) {
        var t = {};
        (e.TicketIssueDescList || []).forEach(function(e) {
            t[(e = e || {}).Title] = (t[e.Title] || []).concat(e.IssueDescList || []);
        });
        for (var i = Object.keys(t), r = [], a = 0; a < i.length; a++) if (i[a].indexOf("关于报销") < 0) {
            var n = t[i[a]] || {};
            r.push({
                title: i[a],
                desc: n
            });
        }
        return r;
    },
    setNavTitle: function(e) {
        var t = this;
        if (!(e = e || t.mLine || {}).Route || !e.Route.DepartDate) return wx.setNavigationBarTitle({
            title: "订单详情"
        }), t;
        var r = (e.Route || {}).DepartDate || "", a = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ], n = ((r = new Date(r)).getMonth() + 1).toString(), s = r.getDate().toString(), o = r.getDay();
        return n = n.length <= 1 ? "0" + n : n, s = s.length <= 1 ? "0" + s : s, wx.setNavigationBarTitle({
            title: i.Format("{0}月{1}日 , {2}", n, s, a[o]) || "订单详情"
        }), t;
    },
    onLogin: function() {
        if (e.cwx.user.isLogin()) return self;
        e.cwx.user.login({
            callback: function(e) {}
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