function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return 0 !== e.length && e.every(function(e) {
        return n.indexOf(e) > -1;
    });
}

function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return 0 !== e.length && e.every(function(e) {
        var r = t.default.parse(e, !0).getMonth() + 1;
        return s.indexOf(r) > -1;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isValidationForStu = function(t) {
    var n = t.stuPsgs, s = t.seatNames, u = t.dates, a = {
        isPass: !0,
        errMsg: "",
        btnName: "",
        code: 0
    };
    return n && n.length ? e(s) ? r(u) ? a : (a.isPass = !1, a.errMsg = "学生票的乘车时间为6月1号-9月30日，12月1日-3月31日。您选择的日期不在优惠时间段内，请购买全价成人票", 
    a.btnName = "修改日期", a.code = 2, a) : (a.isPass = !1, a.errMsg = "学生票仅支持硬座、硬卧、二等座、无座坐席优惠，您选择的坐席不在优惠范围内，请重新选择，或购买成人票", 
    a.btnName = "修改座席", a.code = 1, a) : a;
};

require("../../../cwx/cwx");

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./cDate")), n = [ "硬卧", "二等座", "硬座", "无座" ], s = [ 1, 2, 3, 6, 7, 8, 9, 12 ];