var e = require("../../../cwx/cwx.js"), a = require("../api/datahandler.js"), n = (require("../api/api"), 
require("../common/utils.js"), require("../common/global.js"));

(0, e.CPage)({
    data: {
        isError: !1,
        mError: "",
        isEdit: !1,
        passengerID: "0",
        passengerType: "成人票",
        mPRange: [ "成人票" ],
        mRIndex: 0,
        cname: !1,
        passengerName: "",
        ename: !1,
        surname: "",
        givenname: "",
        sex: !1,
        mgender: "M",
        birth: !1,
        mBirth: "",
        frequency: !1,
        frequency_des: "",
        mfrequency: 0,
        stay_days: !1,
        mstay_days: 0,
        visa_date: !1,
        mvisa_date: "",
        id_type: "",
        id_num: "",
        mCardNo: "",
        mCIndex: 0,
        passangerneed: [],
        mCRange: [],
        passengerselectdic: {}
    },
    onLoad: function(e) {
        var a = this, n = a.data || {}, s = e.mChildren || 0, r = e.mTakeChildren || 0, t = n.mPRange || [], i = [];
        if (e.passengercode && "undefined" != e.passengercode) var d = e.passengercode, i = JSON.parse(d);
        u = [];
        if (e.passengertypescode && "undefined" != e.passengertypescode) var m = e.passengertypescode, u = JSON.parse(m);
        if ("true" == s && t.push("儿童票"), 1 == r && t.push("携童票"), a.setData({
            isEdit: !1,
            mPRange: t,
            passengerneed: i,
            mCRange: u,
            passengerselectdic: i[0] || {}
        }), "edit" == e.type) {
            var o = wx.getStorageSync("SHIP_EDIT_PASSENGER"), n = a.data || {}, c = !0;
            c = "M" == (o.gender || "M");
            var t = n.mPRange || [], g = o.passengerType || "成人票", p = t.indexOf(g), f = u.indexOf(o.mCardType);
            a.setData({
                isEdit: !0,
                passengerID: o.mPID || "0",
                passengerType: o.mType || "成人票",
                mRIndex: p,
                passengerName: o.mName || "",
                surname: o.enFirstName || "",
                givenname: o.enLastName || "",
                mgender: o.gender || "M",
                male: c,
                mCardNo: o.mCardNo || "",
                mCIndex: f
            });
        }
    },
    onUnload: function() {},
    onShow: function() {},
    onReady: function() {},
    onmname: function(e) {
        var a = this;
        e.detail;
        return a.setData({
            passengerName: e.detail.value
        }), a.data.passengerName;
    },
    onsurname: function(e) {
        var a = this;
        e.detail;
        return a.setData({
            surname: e.detail.value
        }), a.data.surname;
    },
    ongivenname: function(e) {
        var a = this;
        e.detail;
        return a.setData({
            givenname: e.detail.value
        }), a.data.givenname;
    },
    onfrequencydes: function(e) {
        var a = this;
        e.detail;
        return a.setData({
            mfrequency: e.detail.value
        }), a.data.mfrequency;
    },
    onmstay_days: function(e) {
        var a = this;
        e.detail;
        return a.setData({
            mstay_days: e.detail.value
        }), a.data.mstay_days;
    },
    onUpdCode: function(e) {
        var a = this;
        return a.setData({
            mCardNo: e.detail.value
        }), a.data.mCardNo;
    },
    onUpdDate: function(e) {
        var a = this, n = e.target.dataset.key, s = e.target.dataset.index, r = e.detail.value, t = a.data.mCardNoarray;
        a.data.mCardNoarray;
        t.forEach(function(e, a) {
            if (a == s) {
                var i = e.date;
                i.forEach(function(e, a) {
                    e.name == n && (e.value = r, i.splice(a, 1, e));
                }), e.date = i, t.splice(a, 1, e);
            }
        }), a.setData({
            mCardNoarray: t
        });
    },
    onUpBirth: function(e) {
        var a = this, n = e.detail || {};
        return a.setData({
            mBirth: n.value
        }), a;
    },
    onConfirm: function() {
        var e = this, s = e.data || {}, r = s.mCRange[s.mCIndex || 0], t = e.checkInfo(), i = (s.mPRange || [])[s.mRIndex || 0];
        if (!t.isTrue) return e.showError(t.mMessage).hideError(), e;
        var d = {
            mPID: s.passengerID,
            mType: n.PASSENGER_ENUM[i],
            mName: s.passengerName,
            mCardType: n.CARD_ENUM[r],
            mCardNo: s.mCardNo,
            mBirth: s.mBirth,
            surname: s.surname,
            givenname: s.givenname,
            gender: s.mgender
        };
        !s.isEdit && a.Passengers.save({
            passenger: d
        }, {
            success: function(e) {},
            fail: function(e) {}
        }), s.isEdit && a.Passengers.update({
            passenger: d
        }, {
            success: function(e) {},
            fail: function(e) {}
        }), wx.navigateBack();
    },
    onPickCard: function(e) {
        var a = this, n = (e.detail || {}).value || 0, s = a.data.passengerneed;
        a.setData({
            mCIndex: n,
            passengerselectdic: s[n]
        });
    },
    checkInfo: function() {
        var e = this, a = e.data || {}, n = {
            isTrue: !1,
            mMessage: ""
        }, s = e.data.passengerselectdic;
        if (s.cname && !a.passengerName) return n.mMessage = "姓名不能为空", n;
        var r = a.passengerName, t = /[a-zA-Z0-9^.$()¦*+?]/;
        if (e.data.passengerselectdic.cname && t.test(r)) return n.mMessage = "请填写正确的中文姓名", 
        n;
        r = r.replace(/[^\u4e00-\u9fa5]/gi, "");
        var i = /^[\u4e00-\u9fa5]+[\u4e00-\u9fa5]{1,14}$/;
        return e.data.passengerselectdic.cname && !i.test(r) ? (n.mMessage = "请填写正确的中文姓名", 
        n) : s.ename && !a.surname ? (n.mMessage = "姓不能为空", n) : s.ename && !a.givenname ? (n.mMessage = "名不能为空", 
        n) : s.birth && !a.mBirth ? (n.mMessage = "请选择出生日期", n) : a.mCardNo ? (n.isTrue = !0, 
        n.mMessage = "", n) : (n.mMessage = mCheck.message || "请填写证件号", n);
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
    },
    selectgender: function(e) {
        var a = this;
        "M" == (e.currentTarget.dataset || {}).mgender ? a.setData({
            male: !0,
            mgender: "M"
        }) : a.setData({
            male: !1,
            mgender: "F"
        });
    },
    onPickPassengerType: function(e) {
        var a = this, n = (e.detail || {}).value || 0;
        a.setData({
            mRIndex: n
        });
    },
    bindDateChange: function(e) {
        this.setData({
            mBirth: e.detail.value
        });
    },
    bindvisadate: function(e) {
        this.setData({
            mvisa_date: e.detail.value
        });
    }
});