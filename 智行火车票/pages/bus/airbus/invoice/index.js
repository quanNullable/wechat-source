var e = require("../../../cwx/cwx.js");

require("../../buscommon/global.js"), require("../../buscommon/utils.js");

(0, e.CPage)({
    pageid: "",
    data: {
        isError: !1,
        mMessage: "",
        mInvoice: {},
        mPrice: 0
    },
    onLoad: function(e) {
        var a = this;
        e = e || {}, a.setData({
            mPrice: e.mount || 0
        }), wx.setNavigationBarTitle({
            title: "发票"
        });
    },
    onUnload: function() {},
    onShow: function() {
        var e = this, a = wx.getStorageSync("AIR_BUS_INVOICE") || {};
        a.mount = e.data.mPrice || 0, e.setData({
            mInvoice: a
        });
    },
    onReady: function() {},
    onUnneed: function() {
        var e = this, a = e.data.mInvoice || {};
        return a.isNeed = !1, e.setData({
            mInvoice: a
        }), e;
    },
    onNeed: function() {
        var e = this, a = e.data.mInvoice || {};
        return a.isNeed = !0, e.setData({
            mInvoice: a
        }), e;
    },
    onNameChange: function(e) {
        var a = this, t = e.detail || {}, n = a.data.mInvoice || {};
        n.name = (t.value || "").trim(), a.setData({
            mInvoice: n
        });
    },
    onCodeChange: function(e) {
        var a = this, t = e.detail || {}, n = a.data.mInvoice || {};
        n.code = (t.value || "").trim(), a.setData({
            mInvoice: n
        });
    },
    onAddressChange: function(e) {
        var a = this, t = e.detail || {}, n = a.data.mInvoice || {};
        n.address = (t.value || "").trim(), a.setData({
            mInvoice: n
        });
    },
    onConfirm: function() {
        var e = this, a = (e.data || {}).mInvoice || {};
        if (!a.isNeed) return wx.setStorageSync("AIR_BUS_INVOICE", a), void wx.navigateBack();
        var t = e.checkInfo();
        return t.isTrue ? (wx.setStorageSync("AIR_BUS_INVOICE", a), wx.navigateBack()) : e.showError(t.message).hideError(), 
        e;
    },
    checkInfo: function() {
        var e = (this.data || {}).mInvoice || {}, a = {
            isTrue: !0,
            message: ""
        };
        return e.name ? /^[\u4e00-\u9fa5]{2,14}$/.test(e.name || "") ? e.code ? /^[1-9][0-9]{5}$/.test(e.code) ? e.address ? a : (a.isTrue = !1, 
        a.message = "邮寄地址不能为空", a) : (a.isTrue = !1, a.message = "请填写正确的邮政编码", a) : (a.isTrue = !1, 
        a.message = "邮政编码不能为空", a) : (a.isTrue = !1, a.message = "请输入正确的中文姓名，不能包含字母和标点符号，少数民族姓名中的圆点可不输入。", 
        a) : (a.isTrue = !1, a.message = "乘客姓名不能为空", a);
    },
    showError: function(e) {
        e = e || "操作失败";
        var a = this;
        return a.setData({
            isError: !0,
            mMessage: e
        }), a;
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