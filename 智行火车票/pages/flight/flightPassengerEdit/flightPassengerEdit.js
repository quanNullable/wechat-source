function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = require("../../../cwx/cwx"), t = require("../../flight/common/model"), s = e(require("../common/utilPassenger")), n = e(require("../common/util"));

(0, a.CPage)({
    pageId: "10320613378",
    data: {
        oPassenger: {},
        supportedPasType: [],
        supportedIdType: [],
        flightStartDate: "",
        cardTypeList: [ "身份证", "护照", "户口簿", "出生证明" ],
        toastWarnMsg: "",
        toastWarnHidden: !0,
        modalWarnMsg: "",
        modalWarnHidden: !0,
        modalRetryHidden: !0,
        topWarnTipHidden: !0,
        toastSuccessHidden: !0,
        passTypeHidden: !0,
        cardTypeSelectorHidden: !0,
        cardTypeHidden: !1,
        cardNoHidden: !1,
        dateHidden: !0
    },
    onLoad: function(e) {
        this.setData({
            oPassenger: e.data.passengerInfo
        }), this.setData({
            supportedPasType: e.data.supportedPasType
        }), this.setData({
            supportedIdType: e.data.supportedIdType
        }), this.setData({
            flightStartDate: e.data.flightStartDate
        }), this.data.oPassenger ? wx.setNavigationBarTitle({
            title: "编辑乘机人"
        }) : wx.setNavigationBarTitle({
            title: "新增乘机人"
        }), "身份证" == this.data.oPassenger.passportType ? this.setData({
            dateHidden: !0
        }) : this.setData({
            dateHidden: !1
        });
    },
    cnnameChange: function(e) {
        this.data.oPassenger.passengerName = e.detail.value, this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    enlastnameChange: function(e) {
        this.data.oPassenger.passengerENLastName = e.detail.value, this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    enfirstnameChange: function(e) {
        var a = e.detail.value;
        a.indexOf(" ") >= 0 ? (this.data.oPassenger.passengerENFirstName = a.substr(0, a.indexOf(" ")), 
        this.data.oPassenger.middleName = a.substr(a.indexOf(" ") + 1)) : (this.data.oPassenger.passengerENFirstName = a, 
        this.data.oPassenger.middleName = ""), this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    changeCard: function(e) {
        this.setData({
            cardTypeSelectorHidden: !1
        });
    },
    notSelectedCard: function(e) {
        this.setData({
            cardTypeSelectorHidden: !0
        });
    },
    selectedCard: function(e) {
        this.data.oPassenger.passportType = e.currentTarget.dataset.id, this.setData({
            oPassenger: this.data.oPassenger
        }), this.setData({
            cardTypeSelectorHidden: !0
        }), "身份证" == this.data.oPassenger.passportType ? this.setData({
            dateHidden: !0
        }) : this.setData({
            dateHidden: !1
        });
    },
    changeCardNo: function(e) {
        var a = e.detail.value;
        "身份证" == e.currentTarget.dataset.cardid && (a = a.toUpperCase()), this.data.oPassenger.passportCode = a, 
        this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    typeAdult: function(e) {
        this.data.oPassenger.passengerType = "成人票", this.setData({
            oPassenger: this.data.oPassenger
        }), this.isHideCard(!1);
    },
    typeChild: function(e) {
        this.data.oPassenger.passengerType = "儿童票", this.data.oPassenger.passportType = "", 
        this.data.oPassenger.passportCode = "", this.setData({
            oPassenger: this.data.oPassenger
        }), this.isHideCard(!0);
    },
    isHideCard: function(e) {
        this.setData({
            cardTypeHidden: e
        }), this.setData({
            cardNoHidden: e
        });
    },
    birthdayChange: function(e) {
        this.data.oPassenger.passengerBirth = this.FormatDate(e.detail.value), this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    verfityCNName: function(e) {
        e.passengerENFirstName && e.passengerENLastName || this.showToast("名字不能为空"), (0, 
        s.default)(e.passengerENFirstName) && (0, s.default)(e.passengerENLastName) || that.showToast("无效的姓名！");
    },
    verfityENName: function(e) {
        e.passengerName || this.showToast("名字不能为空"), (0, s.default)(e.passengerName) || this.showToast("无效的姓名！"), 
        "身份证" == e.passportType && ((0, s.default)(e.passengerName) || this.showToast("无效的姓名！"));
    },
    finishClick: function() {
        var e = this, a = this.data.oPassenger;
        this.data.oPassenger.passengerID;
        if (0 == a.passengerName.length) return n.default.showToast("名字不能为空"), !1;
        if (!s.default.isValidName(a)) return n.default.showToast("无效的姓名！"), !1;
        if ("儿童票" != a.passengerType) {
            if (!a.passportCode) return n.default.showToast("证件号码不能为空！"), !1;
            if (!s.default.isValidIdCode(a.passportType, a.passportCode)) return n.default.showToast("无效的" + a.passportType + "！"), 
            !1;
        }
        if ("身份证" == a.passportType && (a.passengerBirth = this.getBirthFromCode(a.passportCode)), 
        !a.passengerBirth || !new Date(a.passengerBirth)) return n.default.showToast("无效的生日日期:" + a.passengerBirth), 
        !1;
        a.passengerType = this.getFlightPasType(a);
        var r = {
            PassengerID: a.passengerID,
            passengerName: a.passengerName,
            passengerType: a.passengerType,
            passengerENFirstName: a.passengerENFirstName,
            passengerENLastName: a.passengerENLastName,
            passportType: a.passportType,
            passportCode: a.passportCode,
            middleName: a.middleName,
            mobile: "",
            passengerBirth: a.passengerBirth
        };
        n.default.showLoading();
        var i = {
            commonPassengerInfo: r
        };
        (0, t.savePassengerModel)(i, function(t) {
            1 == t.resultCode && (e.setData({
                toastSuccessHidden: !0
            }), e.invokeCallback(a), setTimeout(function() {
                e.navigateBack();
            }, 100));
        }, function(e) {
            n.default.showToast(e.msg);
        }, function() {
            n.default.hideLoading();
        });
    },
    getFlightPasType: function(e) {
        if (e.passengerBirth) {
            var a = new Date(e.passengerBirth), t = new Date(this.data.flightStartDate) - 12096e5, s = new Date(this.data.flightStartDate);
            s.setFullYear(s.getFullYear() - 2);
            var n = new Date(this.data.flightStartDate);
            return n.setFullYear(n.getFullYear() - 12), a > t ? void 0 : a < t && a > s ? "婴儿票" : a < s && a > n ? "儿童票" : a < n ? "成人票" : void 0;
        }
    },
    getBirthFromCode: function(e) {
        var a, t;
        if (15 == (e = e.toUpperCase()).length && (t = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/), 
        (s = e.match(t)) && s.length > 5 && (a = "19" + s[2] + "-" + s[3] + "-" + s[4])), 
        18 == e.length) {
            t = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var s = e.match(t);
            s && s.length > 5 && (a = s[2] + "-" + s[3] + "-" + s[4]);
        }
        return a;
    },
    FormatDate: function(e) {
        var a = "";
        if ("" != e) {
            var t = new Date(e.replace(/-/g, "/")), s = t ? t.getMonth() + 1 : void 0, e = t ? t.getDate() : void 0;
            s = s < 10 ? "0" + s : s, e = e < 10 ? "0" + e : e, a = t.getFullYear() + "-" + s + "-" + e, 
            "1-01-01" == t && (a = "");
        }
        return a;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});