var e = require("../../../cwx/cwx.js"), a = (require("../../accounts/user.js"), 
require("../buscommon/service.js"), require("../buscommon/datahandler.js")), r = require("../buscommon/utils.js"), t = require("../buscommon/global.js");

(0, e.CPage)({
    data: {
        isEdit: !1,
        mPID: "0",
        mType: "A",
        mName: "",
        mCIndex: 0,
        mCardNo: "",
        mPIndex: 0,
        mCRange: [ "身份证" ],
        mPRange: [ "成人" ],
        mBirth: "",
        isError: !1,
        mError: ""
    },
    onLoad: function(e) {
        console.log(e);
        var a = this, r = a.data || {}, n = (e = e || {}).mChildren || 0, m = e.mTakeChildren || 0, s = r.mPRange || [], i = (e.mSurpported || "").split("|") || [];
        if (1 == n && s.push("儿童"), 1 == m && s.push("携童"), a.setData({
            isEdit: !1,
            mCRange: i.length > 0 ? i : [ "身份证" ],
            mPRange: s
        }), "edit" == e.type) {
            var o = wx.getStorageSync("BUS_EDIT_PASSENGER");
            if (o && (o.mName || o.mCardNo)) {
                var d = (r = a.data || {}).mCRange, u = t.CARDS_TYPE[o.mCardType || 1], c = d.indexOf(u), s = r.mPRange || [], h = t.PASSENGER_TYPE[o.mType] || "成人", C = s.indexOf(h);
                a.setData({
                    isEdit: !0,
                    mPID: o.mPID || "0",
                    mType: o.mType || "A",
                    mName: o.mName || "",
                    mCIndex: c,
                    mPIndex: C,
                    mCardNo: o.mCardNo || "",
                    mBirth: o.mBirth || ""
                });
            }
        }
    },
    onUnload: function() {},
    onShow: function() {
        wx.setStorageSync("BUS_NEW_PASSENGER", "");
    },
    onReady: function() {},
    onUpdName: function(e) {
        var a = this;
        e.detail;
        return a.setData({
            mName: e.detail.value
        }), a.data.mName;
    },
    onUpdCode: function(e) {
        var a = this;
        return a.setData({
            mCardNo: e.detail.value
        }), a.data.mCardNo;
    },
    onUpBirth: function(e) {
        var a = this, r = e.detail || {};
        return a.setData({
            mBirth: r.value
        }), a;
    },
    onPickCard: function(e) {
        var a = this, r = e.detail || {}, t = r.value || 0, n = "身份证" == (r.mCRange || [])[t] ? "" : r.mBirth;
        a.setData({
            mCIndex: t,
            mCardNo: "",
            mBirth: n
        });
    },
    onPickPassengerType: function(e) {
        var a = this, r = (e.detail || {}).value || 0;
        a.setData({
            mPIndex: r
        });
    },
    onConfirm: function() {
        var e = this, r = e.data || {}, n = r.mCRange[r.mCIndex || 0], m = e.checkInfo(), s = (r.mPRange || [])[r.mPIndex || 0], i = {
            mPID: r.mPID,
            mType: t.PASSENGER_ENUM[s],
            mName: r.mName,
            mCardType: t.CARD_ENUM[n],
            mCardNo: r.mCardNo,
            mBirth: r.mBirth
        };
        if (!m.isTrue) return e.showError(m.mMessage).hideError(), e;
        wx.setStorageSync("BUS_NEW_PASSENGER", i), !r.isEdit && a.Passengers.save({
            passenger: i
        }, {
            success: function(e) {},
            fail: function(e) {}
        }), r.isEdit && a.Passengers.update({
            passenger: i
        }, {
            success: function(e) {},
            fail: function(e) {}
        }), wx.navigateBack();
    },
    checkInfo: function() {
        var e = this, a = e.data || {}, t = {
            isTrue: !1,
            mMessage: ""
        };
        if (!a.mName) return t.mMessage = "姓名不能为空", t;
        var n = r.CheckCnName(a.mName);
        return n.isTrue ? a.mCardNo ? 0 != a.mCIndex || r.CheckIdentity(a.mCardNo) ? (t.isTrue = !0, 
        t.mMessage = "", t) : (t.mMessage = "请填写正确的证件号码", t) : void wx.showModal({
            title: "提示",
            content: e.data.mCardNo,
            showCancel: !1,
            success: function(e) {
                e.confirm;
            }
        }) : (t.mMessage = n.message || "请输入正确的中文姓名", t);
    },
    showError: function(e) {
        var a = this;
        return e = e || "添加乘车失败", a.setData({
            isError: !0,
            mError: e
        }), a;
    },
    hideError: function() {
        var e = this;
        return setTimeout(function() {
            e.setData({
                isError: !1,
                mError: ""
            });
        }, 2e3), e;
    }
});