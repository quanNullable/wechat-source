Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = [ {
    code: "0",
    name: "身份证",
    hint: "",
    english_enable: !1
}, {
    code: "1",
    name: "护照",
    hint: "",
    english_enable: !1
}, {
    code: "2",
    name: "台胞证",
    hint: "",
    english_enable: !1
}, {
    code: "3",
    name: "回乡证",
    hint: "",
    english_enable: !1
}, {
    code: "4",
    name: "军人证",
    hint: "仅支持拼音/数字，如flight123",
    english_enable: !1
}, {
    code: "5",
    name: "港澳通行证",
    hint: "",
    english_enable: !1
}, {
    code: "6",
    name: "户口簿",
    hint: "可填写身份证号码或出生日期",
    english_enable: !1
}, {
    code: "7",
    name: "出生证明",
    hint: "可用出生日期代替",
    english_enable: !1
} ], t = {
    isValidName: function(e) {
        return e.passengerName ? this.isValidName_Flight(e.passengerName) : this.isValidName_Flight(e.passengerENFirstName) && this.isValidName_Flight(e.passengerENLastName);
    },
    isSupportEnName: function(t) {
        var n = e.filter(function(e) {
            return e.name == t.passportType;
        }), r = n.length > 0 ? n[0] : null;
        return !(!r || !r.english_enable);
    },
    isValidName_Flight: function(e) {
        if (!e) return !1;
        var t = /((^[\u4E00-\u9FA5]{1,14}([a-zA-Z]{0,26})$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/;
        return e = e.replace(/^\s+/g, ""), e = e.replace(/\s+$/g, ""), !!t.test(e);
    },
    isValidBirth: function(e) {
        if (!e) return !1;
        var t = new Date(e.replace(/-/g, "/"));
        if (!t) return !1;
        var n = new Date(), r = n.setMonth(n.getMonth() - 1);
        return t > n.setYear(n.getYear() - 108) && t < r;
    },
    isValidIdCode: function(e, t) {
        return "身份证" == e || "二代身份证" == e ? this.isValidSFZ(t) : "港澳通行证" == e ? this.isValidGA(t) : "护照" == e ? this.isValidHZ(t) : "台湾通行证" == e ? this.isValidTW(t) : this.isValidCode(t);
    },
    isValidSFZ: function(e) {
        if (!e) return !1;
        if (!{
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
        }[(e = e.toUpperCase()).substr(0, 2)]) return !1;
        if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(e)) return !1;
        var t, n;
        if (15 == (t = e.length)) {
            n = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            s = e.match(n);
            if ((u = new Date("19" + s[2] + "/" + s[3] + "/" + s[4])).getYear() == Number(s[2]) && u.getMonth() + 1 == Number(s[3]) && u.getDate() == Number(s[4])) {
                var r = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), i = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"), a = 0;
                for (e = e.substr(0, 6) + "19" + e.substr(6, e.length - 6), l = 0; l < 17; l++) a += e.substr(l, 1) * r[l];
                return e += i[a % 11], !0;
            }
            return !1;
        }
        if (18 == t) {
            n = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var s = e.match(n), u = new Date(s[2] + "/" + s[3] + "/" + s[4]);
            if (u.getFullYear() == Number(s[2]) && u.getMonth() + 1 == Number(s[3]) && u.getDate() == Number(s[4])) {
                var l, r = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), i = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"), a = 0;
                for (l = 0; l < 17; l++) a += e.substr(l, 1) * r[l];
                return i[a % 11] == e.substr(17, 1);
            }
            return !1;
        }
        return !1;
    },
    isValidHZ: function(e) {
        if (!e) return !1;
        var t = /^[a-zA-Z0-9]{5,17}$/;
        return !(!/^[a-zA-Z]{5,17}$/.test(e) && !t.test(e));
    },
    isValidTW: function(e) {
        if (!e) return !1;
        var t = /^[0-9]{10}$/;
        return !(!/^[0-9]{8}$/.test(e) && !t.test(e));
    },
    isValidGA: function(e) {
        return !!e && !!/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(e);
    },
    isValidCode: function(e) {
        return !!e && !!/^[a-zA-Z0-9]{1,20}$/.test(e);
    },
    isMeetAgeLimit: function(e, t, n, r) {
        var i, a = new Date(r), s = a.getFullYear(), u = a.getMonth() + 1, l = a.getDate(), o = new Date(e), p = o.getFullYear(), g = o.getMonth() + 1, f = o.getDate();
        return s - p < 0 ? (Alert.alert(null, "日期有误"), i = "") : i = u - g < 0 ? s - p - 1 : l - f >= 0 ? s - p : s - p - 1, 
        i >= t && i <= n;
    },
    getFlightSupportType: function(t) {
        return t && 0 != t.length ? t.map(function(t) {
            var n = e.filter(function(e) {
                return e.code == t;
            });
            if (n.length > 0) return n[0];
        }).filter(function(e) {
            return e;
        }) : e;
    },
    isPassengerCanBuyTicket: function(e, t, n, r, i) {
        var a = this;
        if (!e.passportType || 0 == e.passportType.length) return {
            info: "无效的证件类型,请重新编辑",
            type: 0
        };
        var s = a.getFlightSupportType(n).some(function(t) {
            return t.name == e.passportType;
        });
        if (!s) return {
            info: "该航班不支持" + e.passportType + "购票",
            type: 0
        };
        if (!a.isValidIdCode(e.passportType, e.passportCode)) return {
            info: "无效的证件号码,请重新编辑",
            type: 0
        };
        if (!a.isValidName(e)) return {
            info: e.passengerName + "姓名不正确,请重新编辑",
            type: 0
        };
        if (!("身份证" == e.passportType || e.passengerBirth && new Date(e.passengerBirth))) return {
            info: "无效的生日信息,请重新编辑",
            type: 0
        };
        if (!e.passengerType) return {
            info: "无效的乘客类型,请重新编辑",
            type: 0
        };
        var u = "";
        return r && r.length > 0 && !(s = r.some(function(t) {
            var n = t.split("-");
            return u.length > 0 && (u += "或"), u = u + n[0] + "至" + n[1] + "岁", a.isMeetAgeLimit(e.passengerBirth, n[0], n[1], i);
        })) ? {
            info: "该航班仅支持" + u + "年龄段乘客购票",
            type: 0
        } : (s = t.some(function(t) {
            return t == e.passengerType;
        })) ? {
            info: "",
            type: 1
        } : {
            info: "该航班不支持购买" + e.passengerType,
            type: 0
        };
    }
};

exports.default = t;