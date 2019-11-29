function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = require("../../../cwx/cwx"), e = require("../common/model"), s = a(require("../common/cDate")), i = a(require("../common/util")), n = require("../common/components/toast/toast"), r = t.cwx.train, d = (0, 
n.trainToast)(), o = {
    "身份证": 1,
    "护照": 2,
    "回乡证": 7,
    "台胞证": 8
}, u = {
    1: "身份证",
    2: "护照",
    7: "回乡证",
    8: "台胞证"
}, h = {
    data: {
        pas: {
            isChild: 0,
            Birthday: "1990-10-01",
            CNName: "",
            ENFirstName: "",
            ENLastName: "",
            PassengerID: 0,
            IdentityNo: "",
            IdentityType: 1,
            IsENName: !1,
            IsSelf: !1,
            PassengerType: 1,
            CheckStatus: "",
            CheckStatusName: ""
        },
        cardTypeText: "身份证",
        showType: "",
        isNew: !0
    },
    onLoad: function(a) {
        var t = r.pas;
        this.isNew = void 0 === t, this.isNew || this.setData({
            pas: t,
            isNew: !1,
            cardTypeText: u[t.IdentityType]
        });
    },
    showNameTips: function() {
        this.setData({
            showType: "name"
        });
    },
    hideNameTips: function() {
        "child" === this.data.showType && this.resetTitle(), this.setData({
            showType: ""
        });
    },
    showChildTips: function() {
        i.default.setTitle("儿童购票说明"), this.setData({
            showType: "child"
        });
    },
    showPasType: function() {
        var a = this;
        if (a.isNew) {
            var t = [ "成人票", "学生票", "儿童票" ];
            wx.showActionSheet({
                itemList: t,
                success: function(e) {
                    if (t[e.tapIndex]) {
                        var s = void 0;
                        switch (e.tapIndex) {
                          case 0:
                            s = 1;
                            break;

                          case 1:
                            s = 3;
                            break;

                          case 2:
                            s = 2;
                            break;

                          default:
                            s = 1;
                        }
                        a.setData({
                            "pas.isChild": 2 == e.tapIndex,
                            "pas.PassengerType": s
                        });
                    }
                }
            });
        }
    },
    inputName: function(a) {
        this.setData({
            "pas.CNName": a.detail.value
        });
    },
    inputFirstName: function(a) {
        this.setData({
            "pas.ENFirstName": a.detail.value
        });
    },
    inputLastName: function(a) {
        this.setData({
            "pas.ENLastName": a.detail.value
        });
    },
    showCardType: function() {
        var a = this, t = [ "身份证", "护照", "回乡证", "台胞证" ];
        wx.showActionSheet({
            itemList: t,
            success: function(e) {
                var s = t[e.tapIndex], i = o[s];
                s && i && ("护照" === s && "" === a.data.pas.CNName ? a.setData({
                    "pas.IsENName": !0
                }) : [ "回乡证", "台胞证" ].indexOf(s) > -1 && !a.hasENName() && a.setData({
                    "pas.IsENName": !1
                }), a.setData({
                    cardTypeText: s,
                    "pas.IdentityType": i
                }));
            }
        });
    },
    inputCardNum: function(a) {
        this.setData({
            "pas.IdentityNo": a.detail.value
        }), 18 == a.detail.value.length && wx.hideKeyboard();
    },
    birthChange: function(a) {
        var t = a.detail.value;
        this.setData({
            "pas.Birthday": t
        });
    },
    submit: function() {
        this.validateInput() && this.submitPasInfo();
    },
    validateInput: function() {
        var a = this.data.pas;
        if (a.IsENName) {
            if (!this.checkEName()) return !1;
        } else if (!this.checkCName()) return !1;
        if (!a.isChild && !this.checkIdCard()) return !1;
        if (!a.isChild && 1 == a.IdentityType && a.IdentityNo) {
            var t = a.IdentityNo.substring(6, 14), e = s.default.parse(t).format("Y-m-d");
            this.setData({
                "pas.Birthday": e
            });
        }
        return !!this.checkBirth();
    },
    checkCName: function() {
        var a = this.data.pas.CNName;
        return a ? !!i.default.isValidChineseName(a) || (i.default.showModal({
            m: "请填写正确的中文姓名"
        }), !1) : (this.showTrainToast("姓名不能为空"), !1);
    },
    checkEName: function() {
        if (!this.data.pas.ENFirstName && !this.data.pas.ENLastName) return this.showTrainToast("姓名不能为空"), 
        !1;
        var a = /^[A-Za-z ]+$/;
        return !(!a.test(this.data.pas.ENFirstName) || !a.test(this.data.pas.ENLastName)) || (i.default.showModal({
            m: "请填写正确的英文名"
        }), !1);
    },
    checkIdCard: function() {
        var a = this.data.pas, t = a.IdentityType, e = a.IdentityNo;
        if (!e) return i.default.showModal({
            m: "证件号码不能为空"
        }), !1;
        if (1 == t) {
            if (!i.default.isIdCard(e)) return i.default.showModal({
                m: "请填写正确的证件号码"
            }), !1;
        } else if (2 == t) {
            if (!i.default.isValidPassport(e)) return i.default.showModal({
                m: "请填写正确的证件号码"
            }), !1;
        } else if (7 == t) {
            if (!i.default.isValidHKMacao(e)) return i.default.showModal({
                m: "请填写正确的证件号码"
            }), !1;
        } else if (8 == t && !i.default.isValidTaiwan(e)) return i.default.showModal({
            m: "请填写正确的证件号码"
        }), !1;
        return !0;
    },
    checkBirth: function() {
        var a = this.data.pas.Birthday;
        if (!a) return i.default.showModal({
            m: "请选择出生日期"
        }), !1;
        if (s.default.parse(a).getTime() > new s.default().getTime()) return i.default.showModal({
            m: "请选择正确的出生日期"
        }), !1;
        if (this.data.pas.isChild) {
            var t = (new s.default().getTime() - s.default.parse(a).getTime()) / 864e5;
            if (t > 5840 || t < 30) return i.default.showModal({
                m: "出生满30天且小于于16周岁才可以购买儿童票。请填写正确的出生日期。"
            }), !1;
        }
        return !0;
    },
    submitPasInfo: function() {
        var a = this, s = this.data.pas, n = {
            Channel: t.cwx.config.partner,
            TrainModifyInfo: {}
        }, d = n.TrainModifyInfo;
        Object.assign(d, s), r.pas ? s.IsENName ? d.CNName = r.pas.CNName : (d.ENFirstName = r.pas.ENFirstName || "", 
        d.ENLastName = r.pas.ENLastName || "") : s.IsENName ? d.CNName = "" : (d.ENFirstName = "", 
        d.ENLastName = ""), d.CNName = d.CNName.trim(), d.ENFirstName = d.ENFirstName.trim(), 
        d.ENLastName = d.ENLastName.trim(), this.showTrainLoading();
        var o = function() {
            var a = (s.PassengerID ? "编辑" : "新增") + "乘客失败，请稍候再试";
            i.default.showModal({
                m: a
            });
        };
        (0, e.TrainModifyPassengerModel)(n, function(e) {
            e && 1 == e.RetCode ? (a.showTrainToast("保存成功！"), t.cwx.navigateBack()) : o.call(null);
        }, function(a) {
            o.call(null);
        }, function() {
            a.hideTrainLoading();
        });
    },
    onReady: function() {
        this.resetTitle();
    },
    switchLanguage: function() {
        this.setData({
            "pas.IsENName": !this.data.pas.IsENName
        });
    },
    resetTitle: function() {
        var a = this.data.pas.PassengerID ? "编辑乘客" : "新增乘客";
        i.default.setTitle(a);
    },
    showStudentTips: function() {
        i.default.setTitle("学生购票说明"), this.setData({
            showType: "stu"
        });
    },
    hasENName: function() {
        return this.data.pas.ENLastName || this.data.pas.ENFirstName;
    }
};

i.default.useMixin(h, [ d ]), (0, t.CPage)(h);