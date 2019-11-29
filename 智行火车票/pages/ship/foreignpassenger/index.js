function a(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var e = require("../../../cwx/cwx.js"), t = (require("../api/datahandler.js"), require("../api/api"), 
require("../common/utils.js"));

require("../common/global.js");

(0, e.CPage)({
    data: {
        isError: !1,
        mError: "",
        isEdit: !1,
        passengerID: "0",
        passengerType: "成人票",
        mPRange: [ "成人票" ],
        mRIndex: 0,
        country: [],
        mPIndex: 0,
        Nationality: "中国大陆",
        mCardNoarray: [],
        cname: !1,
        passengerName: "",
        ename: !1,
        surname: "",
        givenname: "",
        gender: !1,
        mgender: "M",
        birth: !1,
        mBirth: "",
        frequency: !1,
        frequency_des: "",
        mfrequency: "",
        stay_days: !1,
        mstay_days: "",
        visa_date: !1,
        mvisa_date: "",
        foreign_passengerdic: {},
        passengerselectdic: {},
        foreign: !1,
        foreigncountrycn: "",
        hasforeign: !1
    },
    onLoad: function(e) {
        console.log(e);
        var t = this, r = t.data || {}, n = (e = e.data || {}).mChildren || 0, s = e.mTakeChildren || 0, i = r.country || [], d = r.mPRange || [];
        "true" == n && d.push("儿童票"), 1 == s && d.push("携童票"), wx.setStorageSync("Country_CN", "");
        var o = {};
        if (e.foreign_passengercode && "undefined" != e.foreign_passengercode) {
            var c = e.foreign_passengercode;
            o = JSON.parse(c);
        }
        var m = !1, u = {}, g = [];
        if ((i = Object.keys(o) || []).length > 0 && (m = !0, g = (u = o[i[0]]).required_card, 
        t.setData({
            isEdit: !1,
            country: i,
            mPRange: d,
            hasforeign: m,
            foreign_passengerdic: o,
            passengerselectdic: u,
            mCardNoarray: g
        }), "edit" == e.type)) {
            var f = wx.getStorageSync("SHIP_EDIT_PASSENGER"), r = t.data || {}, y = f.Nationality || "", l = "", p = "", v = !1, h = {};
            "中国大陆" == y ? p = "中国大陆" : "中国香港" == y ? p = "中国香港" : "中国澳门" == y ? p = "中国澳门" : "中国台湾" == y ? p = "中国台湾" : (wx.setStorageSync("Country_CN", y), 
            p = "外籍", l = y, v = !0), g = (h = o[p]).required_card;
            var N = 0;
            t.data.country.forEach(function(a, e) {
                p == a && (N = e);
            });
            var _ = !0;
            _ = "M" == (f.gender || "M");
            var d = r.mPRange || [], C = f.passengerType || "成人票", D = d.indexOf(C);
            t.setData(a({
                isEdit: !0,
                passengerID: f.mPID || "0",
                passengerType: f.mType || "成人票",
                mRIndex: D,
                Nationality: y,
                foreigncountrycn: l,
                mPIndex: N,
                passengerName: f.mName || "",
                surname: f.enFirstName || "",
                givenname: f.enLastName || "",
                mgender: f.gender || "M",
                mBirth: f.mBirth || "",
                mfrequency: f.frequency || "",
                mCardNoarray: f.id_card || "",
                foreign: v,
                male: _,
                passengerselectdic: h
            }, "mCardNoarray", g));
        }
    },
    onUnload: function() {},
    onShow: function() {
        var a = this;
        if (a.data.foreign) {
            var e = wx.getStorageSync("Country_CN");
            a.setData({
                foreigncountrycn: e,
                Nationality: e
            });
        }
    },
    onReady: function() {},
    onmname: function(a) {
        var e = this;
        a.detail;
        return e.setData({
            passengerName: a.detail.value
        }), e.data.passengerName;
    },
    onsurname: function(a) {
        var e = this;
        a.detail;
        return e.setData({
            surname: a.detail.value
        }), e.data.surname;
    },
    ongivenname: function(a) {
        var e = this;
        a.detail;
        return e.setData({
            givenname: a.detail.value
        }), e.data.givenname;
    },
    onfrequencydes: function(a) {
        var e = this;
        a.detail;
        return e.setData({
            mfrequency: a.detail.value
        }), e.data.mfrequency;
    },
    onmstay_days: function(a) {
        var e = this;
        a.detail;
        return e.setData({
            mstay_days: a.detail.value
        }), e.data.mstay_days;
    },
    onUpdCode: function(a) {
        var e = this, t = a.target.dataset.key, r = a.detail.value, n = e.data.mCardNoarray;
        e.data.mCardNoarray;
        n.forEach(function(a, e) {
            a.id_type == t && (a.id_num = r, n.splice(e, 1, a));
        }), e.setData({
            mCardNoarray: n
        });
    },
    onUpdDate: function(a) {
        var e = this, t = a.target.dataset.key, r = a.target.dataset.index, n = a.detail.value, s = e.data.mCardNoarray;
        e.data.mCardNoarray;
        s.forEach(function(a, e) {
            if (e == r) {
                var i = a.date;
                i.forEach(function(a, e) {
                    a.name == t && (a.value = n, i.splice(e, 1, a));
                }), a.date = i, s.splice(e, 1, a);
            }
        }), e.setData({
            mCardNoarray: s
        });
    },
    onUpBirth: function(a) {
        var e = this, t = a.detail || {};
        return e.setData({
            mBirth: t.value
        }), e;
    },
    onPickcountryType: function(a) {
        var e = this, t = (a.detail || {}).value || 0, r = e.data.country[+t], n = !1, s = {}, i = [];
        if ((Object.keys(e.data.foreign_passengerdic) || []).length > 0) {
            n = !0, i = (s = e.data.foreign_passengerdic[r]).required_card;
            var d = "", o = !1;
            "中国大陆" == r ? d = "中国大陆" : "中国香港" == r ? d = "中国大陆" : "中国澳门" == r ? d = "中国大陆" : "中国台湾" == r ? d = "中国大陆" : o = !0, 
            e.setData({
                mPIndex: +t,
                Nationality: d,
                foreign: o,
                passengerselectdic: s,
                hasforeign: n,
                mCardNoarray: i
            });
        }
    },
    onConfirm: function() {
        var a = this, e = a.data || {}, t = e.mPRange, r = e.mRIndex || 0, n = a.checkInfo(), s = t[r];
        if (!n.isTrue) return a.showError(n.mMessage).hideError(), a;
        var i = {};
        if (i.mPID = a.data.passengerID, i.mType = s, i.Nationality = a.data.Nationality, 
        a.data.passengerselectdic.cname && (i.mName = a.data.passengerName), a.data.passengerselectdic.ename && (i.enFirstName = a.data.surname, 
        i.enLastName = a.data.givenname), a.data.passengerselectdic.gender && (i.gender = a.data.mgender), 
        a.data.passengerselectdic.birth && (i.mBirth = a.data.mBirth), a.data.passengerselectdic.frequency && (i.frequency = a.data.mfrequency), 
        a.data.passengerselectdic.stay_days && (i.stay_days = a.data.mstay_days), a.data.passengerselectdic.visa_date && (i.visa_date = a.data.mvisa_date), 
        i.mStatus = 1, i.id_card = a.data.mCardNoarray, a.data.mCardNoarray.length > 0) {
            var d = a.data.mCardNoarray[0];
            i.mCardType = d.id_type, i.mCardNo = d.id_num;
        }
        a.invokeCallback(i), wx.navigateBack();
    },
    checkInfo: function() {
        var a = this, e = a.data || {}, t = {
            isTrue: !1,
            mMessage: ""
        };
        if (a.data.hasforeign && (!e.Nationality || "" == e.Nationality)) return t.mMessage = "请选择国籍", 
        t;
        if (a.data.passengerselectdic.cname && !a.data.passengerName) return t.mMessage = "姓名不能为空", 
        t;
        var r = a.data.passengerName, n = /[a-zA-Z0-9^.$()¦*+?]/;
        if (a.data.passengerselectdic.cname && n.test(r)) return t.mMessage = "请填写正确的中文姓名", 
        t;
        r = r.replace(/[^\u4e00-\u9fa5]/gi, "");
        var s = /^[\u4e00-\u9fa5]+[\u4e00-\u9fa5]{1,14}$/;
        if (a.data.passengerselectdic.cname && !s.test(r)) return t.mMessage = "请填写正确的中文姓名", 
        t;
        if (a.data.passengerselectdic.ename && !a.data.surname) return t.mMessage = "姓不能为空", 
        t;
        if (a.data.passengerselectdic.ename && !a.data.givenname) return t.mMessage = "名不能为空", 
        t;
        if (a.data.passengerselectdic.birth && !a.data.mBirth) return t.mMessage = "请选择日期", 
        t;
        if (a.data.passengerselectdic.frequency && !a.data.mfrequency) return t.mMessage = "请完善信息", 
        t;
        if (a.data.passengerselectdic.stay_days && !a.data.mstay_days) return t.mMessage = "请完善信息", 
        t;
        if (a.data.passengerselectdic.visa_date && !a.data.mvisa_date) return t.mMessage = "请完善信息", 
        t;
        if (a.data.mCardNoarray.length > 0) {
            var i = !1;
            if (a.data.mCardNoarray.forEach(function(a, e) {
                a.id_num || (i = !0);
            }), i) return t.mMessage = "请完善证件信息", t;
        }
        return t.isTrue = !0, t.mMessage = "", t;
    },
    showError: function(a) {
        var e = this;
        return a = a || "添加乘客失败", e.setData({
            isError: !0,
            mError: a
        }), e;
    },
    hideError: function() {
        var a = this;
        return setTimeout(function() {
            a.setData({
                isError: !1,
                mError: ""
            });
        }, 2e3), a;
    },
    selectgender: function(a) {
        var e = this;
        "M" == (a.currentTarget.dataset || {}).mgender ? e.setData({
            male: !0,
            mgender: "M"
        }) : e.setData({
            male: !1,
            mgender: "F"
        });
    },
    onPickPassengerType: function(a) {
        var e = this, t = (a.detail || {}).value || 0;
        e.setData({
            mRIndex: t
        });
    },
    bindDateChange: function(a) {
        this.setData({
            mBirth: a.detail.value
        });
    },
    bindvisadate: function(a) {
        this.setData({
            mvisa_date: a.detail.value
        });
    },
    selectcountry: function() {
        var a = {
            IScountry: "IScountry"
        };
        wx.navigateTo({
            url: t.AppendParams("../countrylist/index", a),
            success: function(a) {},
            fail: function(a) {
                console.log("[book-onAddPassenger] :: 跳转选择国际和地区 > " + (JSON.stringify(a) || ""));
            }
        });
    }
});