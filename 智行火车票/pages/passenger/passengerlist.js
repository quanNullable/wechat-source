function a(a) {
    return a.length > 3 ? t(a, parseInt(a.length / 3), a.length - parseInt(a.length / 3) - 2) : e(a, 0, a.length);
}

function e(a, e, s) {
    return a.length < 3 || s < 3 ? a : t(a, e + parseInt(s / 3), parseInt(s / 3) + 1);
}

function t(a, e, t) {
    for (var s = "", i = e + t - 1, n = 0; n < a.length; n++) s += n >= e && n <= i ? "*" : a[n];
    return s;
}

function s(a) {
    return a.length > 11 ? e(a, a.length - 11, 11) : e(a, 0, a.length);
}

function i(a) {
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    }, t = !0;
    if (a && /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(a)) if (e[a.substr(0, 2)]) {
        if (18 == a.length) {
            a = a.split("");
            for (var s = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], i = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ], n = 0, r = 0; r < 17; r++) n += a[r] * s[r];
            i[n % 11] != a[17] && (t = !1);
        }
    } else t = !1; else t = !1;
    return t;
}

var n = require("../../cwx/cwx"), r = require("../train/common/store");

(0, n.CPage)({
    pageId: "10320613378",
    data: {
        loadinghidden: !0,
        soaurl: "/restapi/soa2/10820/GetCommonPassenger.json",
        totalPages: 0,
        totalCount: 0,
        nowPage: 0,
        pageSize: 25,
        lastPage: {},
        checkfunc: null,
        needselectcnt: 0,
        selectCntNow: 0,
        selectedPassengerIds: [],
        selectedOkPassengerIds: [],
        autoSelectOver: !1,
        passengers: [],
        modalRetryHidden: !0,
        modalRetryText: "",
        okButtonStatus: 0,
        toastWarnHidden: !0,
        toastWarnMsg: "",
        editPageHidden: !0,
        editPageTitle: "",
        toastSuccessHidden: !0,
        modalWarnHidden: !0,
        modalWarnMsg: "",
        topWarnTipHidden: !0,
        soaSaveUrl: "/restapi/soa2/10820/SaveCommonPassenger.json",
        oPassenger: {},
        cardTypeList: [ {
            id: 1,
            name: "身份证"
        }, {
            id: 2,
            name: "护照"
        }, {
            id: 8,
            name: "台胞证"
        }, {
            id: 7,
            name: "回乡证"
        } ],
        cardTypeSelectorHidden: !0,
        cardTypeHidden: !1,
        cardNoHidden: !1,
        cardLimitHidden: !1,
        allCountry: [],
        allCountryCode: [],
        allCountryName: [],
        allCountryIndex: 0,
        allCountrySoaUrl: "/restapi/soa2/11376/GetCountryForH5.json",
        guideHidden: !0,
        isEdit: "0",
        isWrongList: [],
        wrongMsgList: []
    },
    onLoad: function(a) {
        this.data.checkfunc = a.data.filterFunc, this.data.lastPage = a.data.page, this.data.needselectcnt = a.data.maxCount || 0, 
        this.data.selectedPassengerIds = a.data.choosedPassengers || [];
    },
    onReady: function() {
        this.setData({
            nowPage: this.data.nowPage + 1
        }), this.getDataFromSoa();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    moreDetail: function() {
        this.data.nowPage - this.data.totalPages < 0 && this.data.totalPages - 1 > 0 ? (this.setData({
            nowPage: this.data.nowPage + 1
        }), this.getDataFromSoa()) : this.showToast("已显示全部。");
    },
    MakeSoaParam: function(a, e) {
        var t, s = [];
        t = {
            Key: "BizType",
            Value: "BASE"
        }, s.push(t), t = {
            Key: "BookingType",
            Value: "N"
        }, s.push(t), t = {
            Key: "InputType",
            Value: "U"
        }, s.push(t);
        var i, n = [];
        return i = {
            Key: "PageIndex",
            Value: e || this.data.nowPage
        }, n.push(i), i = {
            Key: "PageSize",
            Value: this.data.pageSize
        }, n.push(i), i = {
            Key: "OrderType",
            Value: "D"
        }, n.push(i), a && (i = {
            Key: "CommonPassengerID",
            Value: a
        }, n.push(i)), {
            Parameters: s,
            QueryConditions: n
        };
    },
    getDataFromSoa: function() {
        var a = this, e = r.TrainPassStore.get().allPas || [];
        e && e.length > 0 && (a.formatViewData(e), a.setData({
            totalPages: Math.ceil(e.length / a.data.pageSize)
        }), a.setData({
            totalCount: e.length
        }), a.data.selectedPassengerIds.length > 0 && a.data.selectedPassengerIds.forEach(function(e) {
            if (0 == a.data.selectedOkPassengerIds.filter(function(a) {
                return a == e;
            }).length) {
                var t = a.data.passengers.filter(function(a) {
                    return a.PassengerID == e;
                });
                t.length > 0 && (t[0].view.isselected = 1, a.setData({
                    passengers: a.data.passengers
                }), a.data.selectCntNow = a.data.selectCntNow + 1, a.setData({
                    selectCntNow: a.data.selectCntNow
                }), a.data.selectedOkPassengerIds.push(e), a.setData({
                    selectedOkPassengerIds: a.data.selectedOkPassengerIds
                }));
            }
        }), !a.data.autoSelectOver && a.data.selectedPassengerIds.length > a.data.selectedOkPassengerIds.length && a.data.totalPages - a.data.nowPage > 0 ? (a.setData({
            nowPage: a.data.nowPage + 1
        }), a.getDataFromSoa()) : (a.setData({
            autoSelectOver: !0
        }), a.setFinishButton(), a.setData({
            loadinghidden: !0
        })));
    },
    formatViewData: function(e) {
        var t = this, i = this.data.passengers;
        e && e.forEach(function(e) {
            e.UID = null;
            var n = {
                isselected: 0,
                cardshow: [],
                mobilephone: "",
                cantselect: 0
            }, r = "", o = "", d = [], g = [], h = "";
            if (e.CommonPassengerCard && e.CommonPassengerCard.length > 0) {
                for (var l = 0; l < e.CommonPassengerCard.length; l++) if (e.CommonPassengerCard[l] && "1" == e.CommonPassengerCard[l].CardType) r = "身份证 " + a(e.CommonPassengerCard[l].CardNo); else if (e.CommonPassengerCard[l] && "2" == e.CommonPassengerCard[l].CardType) o = "护照 " + a(e.CommonPassengerCard[l].CardNo); else {
                    switch (+e.CommonPassengerCard[l].CardType) {
                      case 0:
                        h = "未知证件";
                        break;

                      case 1:
                        h = "身份证";
                        break;

                      case 2:
                        h = "护照";
                        break;

                      case 3:
                        h = "学生证";
                        break;

                      case 4:
                        h = "军人证";
                        break;

                      case 6:
                        h = "驾驶证";
                        break;

                      case 7:
                        h = "回乡证";
                        break;

                      case 8:
                        h = "台胞证";
                        break;

                      case 10:
                        h = "港澳通行证";
                        break;

                      case 11:
                        h = "国际海员证";
                        break;

                      case 20:
                        h = "外国人永久居留证";
                        break;

                      case 21:
                        h = "旅行证";
                        break;

                      case 22:
                        h = "台湾通行证";
                        break;

                      case 23:
                        h = "士兵证";
                        break;

                      case 24:
                        h = "临时身份证";
                        break;

                      case 25:
                        h = "户口簿";
                        break;

                      case 26:
                        h = "警官证";
                        break;

                      case 27:
                        h = "出生证明";
                        break;

                      case 99:
                        h = "其他";
                    }
                    h = h + " " + a(e.CommonPassengerCard[l].CardNo), d.push(h);
                }
                "" != r && g.push(r), "" != o && g.push(o);
                for (var c = 0; c < d.length && !(g.length >= 2); c++) g.push(d[c]);
            }
            n.cardshow = g, void 0 !== e.MobilePhone && "" != e.MobilePhone && (n.mobilephone = s(e.MobilePhone)), 
            e.view = n, i.push(e), t.setData({
                passengers: i
            });
        });
    },
    selectDetail: function(a) {
        var e = a.currentTarget.dataset.idx, t = this.data.passengers[e];
        if (1 == t.view.isselected) t.view.isselected = 0, this.setData({
            passengers: this.data.passengers
        }), this.data.selectCntNow = this.data.selectCntNow - 1, this.setData({
            selectCntNow: this.data.selectCntNow
        }); else {
            if (this.data.needselectcnt > 0 && this.data.selectCntNow >= this.data.needselectcnt) return void this.modalWarnShow("已达到需要选择的旅客数量，不可再选。");
            if (1 == t.view.cantselect) return void this.modalWarnShow("此旅客信息不符合订单要求！");
            if (this.data.checkfunc && 1 != this.data.checkfunc(t, this.data.lastPage)) return this.modalWarnShow("此旅客信息不符合订单要求！"), 
            t.view.cantselect = 1, void this.setData({
                passengers: this.data.passengers
            });
            t.view.isselected = 1, this.setData({
                passengers: this.data.passengers
            }), this.data.selectCntNow = this.data.selectCntNow + 1, this.setData({
                selectCntNow: this.data.selectCntNow
            });
        }
        this.setFinishButton();
    },
    setFinishButton: function() {
        this.data.needselectcnt > 0 && this.data.needselectcnt >= this.data.selectCntNow && this.data.selectCntNow > 0 || 0 == this.data.needselectcnt && this.data.selectCntNow > 0 ? this.setData({
            okButtonStatus: 1
        }) : this.setData({
            okButtonStatus: 0
        });
    },
    finishClick: function() {
        var a = this, e = this.data.passengers.filter(function(a) {
            return 1 == a.view.isselected;
        });
        this.invokeCallback(e), setTimeout(function() {
            a.navigateBack();
        }, 100);
    },
    addPassenger: function() {
        this.showEditPage();
    },
    backFromEdit: function() {
        var a, e = this.data.passengers.filter(function(a) {
            return 1 == a.view.isselected;
        });
        e && e.length > 0 && (this.setData({
            selectCntNow: 0
        }), a = e.map(function(a) {
            return a.PassengerID;
        }), this.setData({
            selectedPassengerIds: a
        }), this.setData({
            selectedOkPassengerIds: []
        }), this.setData({
            autoSelectOver: !1
        })), this.setData({
            passengers: []
        }), this.setData({
            nowPage: 1
        }), this.getDataFromSoa();
    },
    editPassegner: function(a) {
        var e = this, t = r.TrainPassStore.get().allPas || [];
        e.setData({
            oPassenger: t[a.currentTarget.dataset.pid]
        }), e.showEditPage();
    },
    showEditPage: function(a) {
        if (this.resetItemStat(), this.data.oPassenger && this.data.oPassenger.CNName) {
            this.data.oPassenger.viewCardType = "1", this.data.oPassenger.viewCardTypeCN = "身份证", 
            this.data.oPassenger.viewCardNo = "0", this.data.oPassenger.viewCardTimelimit = "";
            var e;
            this.data.oPassenger.CommonPassengerCard && this.data.oPassenger.CommonPassengerCard.length > 0 ? e = this.data.oPassenger.CommonPassengerCard.filter(function(a) {
                return "1" == a.CardType;
            }).length > 0 ? this.data.oPassenger.CommonPassengerCard.filter(function(a) {
                return "1" == a.CardType;
            })[0] : this.data.oPassenger.CommonPassengerCard.filter(function(a) {
                return "2" == a.CardType;
            }).length > 0 ? this.data.oPassenger.CommonPassengerCard.filter(function(a) {
                return "2" == a.CardType;
            })[0] : this.data.oPassenger.CommonPassengerCard[0] : (e = {
                CardNo: "",
                CardTimelimit: "",
                CardType: "1"
            }, this.data.oPassenger.CommonPassengerCard = [ e ]), this.data.oPassenger.viewCardType = e.CardType, 
            this.data.oPassenger.viewCardTypeCN = this.GetCardTypeNm(e.CardType), this.data.oPassenger.viewCardNo = e.CardNo, 
            this.data.oPassenger.viewCardTimelimit = this.FormatDate(e.CardTimelimit), this.data.oPassenger.Birthday = this.FormatDate(this.data.oPassenger.Birthday), 
            this.setData({
                oPassenger: this.data.oPassenger
            }), this.setData({
                editPageTitle: "编辑旅客"
            }), this.setData({
                isEdit: "1"
            });
        } else {
            var t = {
                CNName: "",
                ENFirstName: "",
                ENLastName: "",
                ENMiddleName: "",
                CommonPassengerCard: [ {
                    CardNo: "",
                    CardTimelimit: "",
                    CardType: "1"
                } ],
                CommonPassengerFFP: [],
                Gender: "",
                Nationality: "CN",
                Birthday: "",
                PassengerType: "A",
                PassengerID: (r.TrainPassStore.get().allPas || []).length,
                viewCardType: "1",
                viewCardTypeCN: "身份证",
                viewCardNo: "",
                viewCardTimelimit: "",
                viewNationality: ""
            };
            this.setData({
                oPassenger: t
            }), this.setData({
                editPageTitle: "新增旅客"
            }), this.setData({
                isEdit: "0"
            });
        }
        "C" == this.data.oPassenger.PassengerType ? this.isHideCard(!0) : this.isHideCard(!1), 
        this.setData({
            editPageHidden: !1
        }), this.getCountryData();
    },
    closeEditPage: function(a) {
        this.setData({
            oPassenger: {}
        }), this.setData({
            editPageHidden: !0
        });
    },
    cnnameChange: function(a) {
        this.data.oPassenger.CNName = a.detail.value, this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    enlastnameChange: function(a) {
        this.data.oPassenger.ENLastName = a.detail.value, this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    enfirstnameChange: function(a) {
        var e = a.detail.value;
        e.indexOf(" ") >= 0 ? (this.data.oPassenger.ENFirstName = e.substr(0, e.indexOf(" ")), 
        this.data.oPassenger.ENMiddleName = e.substr(e.indexOf(" ") + 1)) : (this.data.oPassenger.ENFirstName = e, 
        this.data.oPassenger.ENMiddleName = ""), this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    changeCard: function(a) {
        this.setData({
            cardTypeSelectorHidden: !1
        });
    },
    notSelectedCard: function(a) {
        this.setData({
            cardTypeSelectorHidden: !0
        });
    },
    selectedCard: function(a) {
        var e, t = this.data.oPassenger.CommonPassengerCard.filter(function(e) {
            return e.CardType == a.currentTarget.dataset.id;
        });
        t && t.length > 0 ? e = t[0] : (e = {
            CardNo: "",
            CardTimelimit: "",
            CardType: a.currentTarget.dataset.id
        }, this.data.oPassenger.CommonPassengerCard.push(e)), this.data.oPassenger.viewCardType = e.CardType, 
        this.data.oPassenger.viewCardTypeCN = this.GetCardTypeNm(e.CardType), this.data.oPassenger.viewCardNo = e.CardNo, 
        this.data.oPassenger.viewCardTimelimit = this.FormatDate(e.CardTimelimit), this.setData({
            oPassenger: this.data.oPassenger
        }), this.setData({
            cardTypeSelectorHidden: !0
        });
    },
    changeCardNo: function(a) {
        var e = this.data.oPassenger.CommonPassengerCard.filter(function(e) {
            return e.CardType == a.currentTarget.dataset.cardid;
        }), t = a.detail.value;
        1 == a.currentTarget.dataset.cardid && (t = t.toUpperCase()), e.CardNo = t, this.data.oPassenger.viewCardNo = e.CardNo, 
        this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    cardTimelimitChange: function(a) {
        var e = this, t = this.data.oPassenger.CommonPassengerCard.filter(function(a) {
            return a.CardType == e.data.oPassenger.viewCardType;
        });
        t.CardTimelimit = this.FormatDate(a.detail.value), this.data.oPassenger.viewCardTimelimit = t.CardTimelimit, 
        this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    nationChange: function(a) {
        a.detail.value > -1 && (this.data.oPassenger.Nationality = this.data.allCountryCode[a.detail.value], 
        this.data.oPassenger.viewNationality = this.data.allCountryName[a.detail.value], 
        this.setData({
            oPassenger: this.data.oPassenger
        }), this.setData({
            allCountryIndex: a.detail.value
        }));
    },
    genderMale: function(a) {
        this.data.oPassenger.Gender = "M", this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    genderFemale: function(a) {
        this.data.oPassenger.Gender = "F", this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    typeAdult: function(a) {
        this.data.oPassenger.PassengerType = "A", this.setData({
            oPassenger: this.data.oPassenger
        }), this.isHideCard(!1);
    },
    typeChild: function(a) {
        this.data.oPassenger.PassengerType = "C", this.setData({
            oPassenger: this.data.oPassenger
        }), this.isHideCard(!0);
    },
    isHideCard: function(a) {
        this.setData({
            cardTypeHidden: a
        }), this.setData({
            cardNoHidden: a
        }), this.setData({
            cardLimitHidden: a
        });
    },
    birthdayChange: function(a) {
        this.data.oPassenger.Birthday = this.FormatDate(a.detail.value), this.setData({
            oPassenger: this.data.oPassenger
        });
    },
    finishEdit: function(a) {
        this.checkInputData() && this.saveAction();
    },
    checkInputData: function(a) {
        for (var e = this, t = !0, s = 0; s < this.data.isWrongList.length; s++) this.data.isWrongList[s].iswrong = 0, 
        this.data.wrongMsgList[s].msg = "";
        this.setData({
            isWrongList: this.data.isWrongList
        }), this.setData({
            wrongMsgList: this.data.wrongMsgList
        });
        var n = /^[\u4e00-\u9fa5]+$/, r = /^[a-zA-Z]+$/, o = /^[\u4e00-\u9fa5a-zA-Z]+$/;
        for (this.data.oPassenger.CNName = this.data.oPassenger.CNName.replace(new RegExp(unescape("%u2006"), "gm"), ""); ;) {
            if ("" != this.data.oPassenger.CNName) {
                if (this.data.oPassenger.CNName.length <= 1) {
                    this.data.isWrongList[0].iswrong = 1, this.data.wrongMsgList[0].msg = "中文名请与证件姓名一致。";
                    break;
                }
                if (this.data.oPassenger.CNName.length > 0) {
                    if (!n.test(this.data.oPassenger.CNName[0])) {
                        this.data.isWrongList[0].iswrong = 1, this.data.wrongMsgList[0].msg = "请填写正确的中文姓名，第一个汉字不可用拼音代替。";
                        break;
                    }
                    if (!o.test(this.data.oPassenger.CNName)) {
                        this.data.isWrongList[0].iswrong = 1, this.data.wrongMsgList[0].msg = "姓名中的特殊符号无需输入。如：“汉祖然•买买提”填写为：汉祖然买买提";
                        break;
                    }
                    for (var d = -1, s = 0; s < this.data.oPassenger.CNName.length; s++) if (!n.test(this.data.oPassenger.CNName[s])) {
                        d = s;
                        break;
                    }
                    if (d >= 0 && n.test(this.data.oPassenger.CNName.substr(d))) {
                        this.data.isWrongList[0].iswrong = 1, this.data.wrongMsgList[0].msg = "拼音后不可继续输入汉字，汉字请用拼音代替。";
                        break;
                    }
                }
            } else if ("" == this.data.oPassenger.ENLastName && "" == this.data.oPassenger.ENFirstName) {
                this.data.isWrongList[0].iswrong = 1, this.data.isWrongList[1].iswrong = 1, this.data.isWrongList[2].iswrong = 1, 
                this.data.wrongMsgList[0].msg = "请输入旅客姓名。";
                break;
            }
            break;
        }
        for (this.data.oPassenger.ENLastName = this.data.oPassenger.ENLastName.replace(new RegExp(unescape("%u2006"), "gm"), ""), 
        this.data.oPassenger.ENLastName = this.data.oPassenger.ENLastName.replace(/\s/g, ""); ;) {
            if ("" != this.data.oPassenger.ENLastName && !r.test(this.data.oPassenger.ENLastName) || "" == this.data.oPassenger.ENLastName && "" != this.data.oPassenger.ENFirstName) {
                this.data.isWrongList[1].iswrong = 1, this.data.wrongMsgList[1].msg = "英文姓名中无特殊符号，姓中特殊符号不输入，名中用空格代替。";
                break;
            }
            break;
        }
        for (this.data.oPassenger.ENFirstName = this.data.oPassenger.ENFirstName.replace(new RegExp(unescape("%u2006"), "gm"), ""), 
        this.data.oPassenger.ENMiddleName = this.data.oPassenger.ENMiddleName.replace(new RegExp(unescape("%u2006"), "gm"), ""), 
        this.data.oPassenger.ENFirstName = this.data.oPassenger.ENFirstName.replace(/\s+/g, " "), 
        this.data.oPassenger.ENMiddleName = this.data.oPassenger.ENMiddleName.replace(/\s+/g, " "); ;) {
            if ("" != this.data.oPassenger.ENFirstName) {
                if (!r.test(this.data.oPassenger.ENFirstName + this.data.oPassenger.ENMiddleName)) {
                    this.data.isWrongList[2].iswrong = 1, this.data.wrongMsgList[2].msg = "英文姓名中无特殊符号，姓中特殊符号不输入，名中用空格代替。";
                    break;
                }
                if (this.data.oPassenger.ENLastName.length + this.data.oPassenger.ENFirstName.length + this.data.oPassenger.ENMiddleName.length > 26) {
                    this.data.isWrongList[2].iswrong = 1, this.data.wrongMsgList[2].msg = "英文姓和名总长度不能超过26个字符，若过长请使用缩写。姓中特殊符号不输入，名中用空格代替。如 Alejandro Gomez Monteverde缩写为：英文姓: MONTEVERDE 英文名: A G";
                    break;
                }
            } else if ("" != this.data.oPassenger.ENLastName) {
                this.data.isWrongList[2].iswrong = 1, this.data.wrongMsgList[2].msg = "英文姓名中无特殊符号，姓中特殊符号不输入，名中用空格代替。";
                break;
            }
            break;
        }
        for (;;) {
            if ("A" != this.data.oPassenger.PassengerType && "C" != this.data.oPassenger.PassengerType) {
                this.data.isWrongList[9].iswrong = 1, this.data.wrongMsgList[9].msg = "请选择旅客类型";
                break;
            }
            break;
        }
        for (;;) {
            if ("C" == this.data.oPassenger.PassengerType) break;
            if ("1" == this.data.oPassenger.viewCardType || "25" == this.data.oPassenger.viewCardType) {
                if (!i(this.data.oPassenger.viewCardNo)) {
                    this.data.isWrongList[4].iswrong = 1, "1" == this.data.oPassenger.viewCardType ? this.data.wrongMsgList[4].msg = "请输入正确的身份证号" : this.data.wrongMsgList[4].msg = "请输入正确的户口薄号";
                    break;
                }
            } else if ("" == this.data.oPassenger.viewCardNo || !/^[ a-zA-Z0-9]+$/.test(this.data.oPassenger.viewCardNo)) {
                this.data.isWrongList[4].iswrong = 1, this.data.wrongMsgList[4].msg = "请输入正确的证件号";
                break;
            }
            break;
        }
        for (;;) break;
        for (;;) break;
        for (;;) break;
        for (;;) {
            if (10 != this.data.oPassenger.Birthday.length) {
                this.data.isWrongList[8].iswrong = 1, this.data.wrongMsgList[8].msg = "请输入正确的出生日期";
                break;
            }
            break;
        }
        var g = this.data.wrongMsgList.filter(function(a) {
            return "" != a.msg;
        });
        return g.length > 0 && (t = !1, 1 == g.length ? this.modalWarnShow(g[0].msg) : (this.setData({
            topWarnTipHidden: !1
        }), setTimeout(function() {
            e.setData({
                topWarnTipHidden: !0
            });
        }, 3e3))), this.setData({
            isWrongList: this.data.isWrongList
        }), this.setData({
            wrongMsgList: this.data.wrongMsgList
        }), this.setData({
            oPassenger: this.data.oPassenger
        }), t;
    },
    resetItemStat: function() {
        this.data.isWrongList = [ {
            iswrong: 0
        }, {
            iswrong: 0
        }, {
            iswrong: 0
        }, {
            iswrong: 0
        }, {
            iswrong: 0
        }, {
            iswrong: 0
        }, {
            iswrong: 0
        }, {
            iswrong: 0
        }, {
            iswrong: 0
        }, {
            iswrong: 0
        } ], this.data.wrongMsgList = [ {
            msg: ""
        }, {
            msg: ""
        }, {
            msg: ""
        }, {
            msg: ""
        }, {
            msg: ""
        }, {
            msg: ""
        }, {
            msg: ""
        }, {
            msg: ""
        }, {
            msg: ""
        }, {
            msg: ""
        } ], this.setData({
            isWrongList: this.data.isWrongList
        }), this.setData({
            wrongMsgList: this.data.wrongMsgList
        });
    },
    saveAction: function() {
        var a, e = this, t = [];
        a = {
            Key: "BizType",
            Value: "BASECWX"
        }, t.push(a), a = {
            Key: "BookingType",
            Value: "N"
        }, t.push(a), a = {
            Key: "InputType",
            Value: "U"
        }, t.push(a), a = {
            Key: "EditType",
            Value: this.data.isEdit
        }, t.push(a);
        var s = [];
        "C" != this.data.oPassenger.PassengerType && (s = [ {
            CardType: this.data.oPassenger.viewCardType,
            CardNo: this.data.oPassenger.viewCardNo,
            CardTimelimit: this.data.oPassenger.viewCardTimelimit
        } ]);
        var i = {
            PassengerID: this.data.oPassenger.PassengerID,
            PassengerType: this.data.oPassenger.PassengerType,
            CNName: "" == this.data.oPassenger.CNName && "1" == this.data.isEdit ? "" : this.data.oPassenger.CNName,
            ENLastName: "" == this.data.oPassenger.ENLastName && "1" == this.data.isEdit ? "" : this.data.oPassenger.ENLastName,
            ENFirstName: "" == this.data.oPassenger.ENFirstName && "1" == this.data.isEdit ? "" : this.data.oPassenger.ENFirstName,
            ENMiddleName: "" == this.data.oPassenger.ENMiddleName && "1" == this.data.isEdit ? "" : this.data.oPassenger.ENMiddleName,
            CommonPassengerCard: s,
            Birthday: this.data.oPassenger.Birthday,
            Gender: this.data.oPassenger.Gender,
            Nationality: this.data.oPassenger.Nationality
        }, n = r.TrainPassStore.get().allPas || [];
        n[this.data.oPassenger.PassengerID] ? n[this.data.oPassenger.PassengerID] = i : n.push(i), 
        r.TrainPassStore.set({
            allPas: n
        }), setTimeout(function() {
            e.showToast("保存成功"), setTimeout(function() {
                e.toastSuccessChange(e);
            }, 1500);
        }, 500);
    },
    toastSuccessChange: function(a) {
        var e = a || this;
        e.setData({
            toastSuccessHidden: !0
        }), e.setData({
            oPassenger: {}
        }), e.setData({
            editPageHidden: !0
        }), e.backFromEdit();
    },
    getCountryData: function() {
        var a = this;
        if (a.data.allCountry && a.data.allCountry.length > 0) a.data.oPassenger.viewNationality = a.getCountryNm(a.data.oPassenger.Nationality), 
        a.setData({
            oPassenger: a.data.oPassenger
        }), a.data.allCountryIndex = a.data.allCountryName.indexOf(a.data.oPassenger.viewNationality), 
        a.data.allCountryIndex < 0 && (a.data.allCountryIndex = 0), a.setData({
            allCountryIndex: a.data.allCountryIndex
        }); else {
            var e = {};
            n.cwx.request({
                url: a.data.allCountrySoaUrl,
                data: e,
                success: function(e) {
                    var t = e.data;
                    "Success" == t.ResultCode && "Success" == t.ResponseStatus.Ack && (a.data.allCountry = t.CountryInfoListHot, 
                    a.data.allCountry = a.data.allCountry.concat(t.CountryInfoListByFirstLetter), a.setData({
                        allCountry: a.data.allCountry
                    }), a.data.allCountryCode = a.data.allCountry.map(function(a) {
                        return a.scode;
                    }), a.setData({
                        allCountryCode: a.data.allCountryCode
                    }), a.data.allCountryName = a.data.allCountry.map(function(a) {
                        return a.name;
                    }), a.setData({
                        allCountryName: a.data.allCountryName
                    }), a.data.oPassenger.viewNationality = a.getCountryNm(a.data.oPassenger.Nationality), 
                    a.setData({
                        oPassenger: a.data.oPassenger
                    }), a.data.allCountryIndex = a.data.allCountryName.indexOf(a.data.oPassenger.viewNationality), 
                    a.data.allCountryIndex < 0 && (a.data.allCountryIndex = 0), a.setData({
                        allCountryIndex: a.data.allCountryIndex
                    }));
                },
                fail: function(a) {}
            });
        }
    },
    getCountryNm: function(a) {
        var e = this.data.allCountry.filter(function(e) {
            return e.scode == a;
        });
        return e.length > 0 ? e[0].name : "";
    },
    GetCardTypeNm: function(a) {
        var e;
        switch (+a) {
          case 0:
            e = "未知证件";
            break;

          case 1:
            e = "身份证";
            break;

          case 2:
            e = "护照";
            break;

          case 3:
            e = "学生证";
            break;

          case 4:
            e = "军人证";
            break;

          case 6:
            e = "驾驶证";
            break;

          case 7:
            e = "回乡证";
            break;

          case 8:
            e = "台胞证";
            break;

          case 10:
            e = "港澳通行证";
            break;

          case 11:
            e = "国际海员证";
            break;

          case 20:
            e = "外国人永久居留证";
            break;

          case 21:
            e = "旅行证";
            break;

          case 22:
            e = "台湾通行证";
            break;

          case 23:
            e = "士兵证";
            break;

          case 24:
            e = "临时身份证";
            break;

          case 25:
            e = "户口簿";
            break;

          case 26:
            e = "警官证";
            break;

          case 27:
            e = "出生证明";
            break;

          case 99:
            e = "其他";
            break;

          default:
            e = "未知证件";
        }
        return e;
    },
    FormatDate: function(a) {
        var e = "";
        if ("" != a) {
            var t = new Date(a.replace(/-/g, "/")), s = t ? t.getMonth() + 1 : void 0, a = t ? t.getDate() : void 0;
            s = s < 10 ? "0" + s : s, a = a < 10 ? "0" + a : a, e = t.getFullYear() + "-" + s + "-" + a, 
            "1-01-01" == t && (e = "");
        }
        return e;
    },
    showToast: function(a) {
        this.setData({
            toastWarnMsg: a,
            toastWarnHidden: !1
        });
    },
    modalRetryShow: function(a) {
        this.setData({
            modalRetryText: a
        }), this.setData({
            modalRetryHidden: !1
        });
    },
    modalRetryConfirm: function(a) {
        this.setData({
            modalRetryHidden: !0
        }), this.getDataFromSoa();
    },
    modalRetryCancel: function(a) {
        this.setData({
            modalRetryHidden: !0
        });
    },
    toastWarnChange: function(a) {
        this.setData({
            toastWarnHidden: !0
        });
    },
    modalWarnShow: function(a) {
        this.setData({
            modalWarnMsg: a
        }), this.setData({
            modalWarnHidden: !1
        });
    },
    modalWarnConfirm: function() {
        this.setData({
            modalWarnHidden: !0
        });
    }
});