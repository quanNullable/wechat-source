function e(e) {
    return "[object String]" === o.call(e);
}

function t(e) {
    return "[object Date]" === o.call(e);
}

function r() {
    if (arguments.length <= 1) return arguments[0] || "";
    var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
    return e.replace(/\{(\d+)\}/g, function(e, r) {
        return t[r];
    });
}

function n(t) {
    return t && e(t) ? new Date(t.replace(/-/g, "/")) : null;
}

function a(e, r) {
    if (!t(e)) return e;
    var n = {
        "M+": e.getMonth() + 1,
        "d+": e.getDate(),
        "h+": e.getHours(),
        "m+": e.getMinutes(),
        "s+": e.getSeconds(),
        "q+": Math.floor((e.getMonth() + 3) / 3),
        S: e.getMilliseconds()
    };
    /(y+)/.test(r) && (r = r.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var a in n) new RegExp("(" + a + ")").test(r) && (r = r.replace(RegExp.$1, 1 == RegExp.$1.length ? n[a] : ("00" + n[a]).substr(("" + n[a]).length)));
    return r;
}

var u = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ], o = Object.prototype.toString;

module.exports = {
    IsString: e,
    Format: r,
    AppendParams: function(t, n) {
        if (t = t || "", !n) return t || "";
        if (e(n)) return (t + "&" + n).replace(/[&?]{1,2}/, "?");
        for (var a = Object.keys(n), u = [], o = 0, s = a.length; o < s; o++) u.push(r("{0}={1}", a[o], n[a[o]]));
        var i = u.join("&").replace(/%20/g, "+");
        return decodeURI((t + "&" + i).replace(/[&?]{1,2}/, "?"));
    },
    GetQueryParams: function(e) {
        var t = /([^?&=]+)=([^?&=]*)/g, r = {};
        return (e = e || "").substring(e.lastIndexOf("?") + 1).replace(t, function(e, t, n) {
            var a = decodeURIComponent(t), u = decodeURIComponent(n);
            return r[a] = u, e;
        }), r;
    },
    String2Date: n,
    FormatDate: a,
    Date2Alias: function(e) {
        var t = n(e).getDay();
        return t < 0 || t > 6 ? "" : u[t];
    },
    DatetoNt: function(e) {
        var t = "";
        if (!n(e)) return t;
        var r = new Date(), u = r.getDate();
        return e == a(new Date(r.getFullYear(), r.getMonth(), u), "yyyy-MM-dd") && (t = "今天 "), 
        e == a(new Date(r.getFullYear(), r.getMonth(), u + 1), "yyyy-MM-dd") && (t = "明天 "), 
        e == a(new Date(r.getFullYear(), r.getMonth(), u + 2), "yyyy-MM-dd") && (t = "后天 "), 
        t || "";
    },
    CheckIdentity: function(e) {
        var t = {
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
            91: "国外"
        }, r = "", n = !0;
        if (e && /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e)) if (t[e.substr(0, 2)]) {
            if (18 == e.length) {
                e = e.split("");
                for (var a = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], u = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ], o = 0, s = 0; s < 17; s++) o += e[s] * a[s];
                u[o % 11] != e[17] && (r = "校验位错误", n = !1);
            }
        } else r = "地址编码错误", n = !1; else r = "身份证号格式错误", n = !1;
        return n || console.log(r), n;
    },
    CheckCnName: function(e) {
        var t = {
            isTrue: !0,
            message: ""
        };
        return (e = e || "").length <= 1 ? (t.isTrue = !1, t.message = "中文名请与证件姓名一致。", t) : /^[\u4e00-\u9fa5]+$/.test(e) ? t : (t.isTrue = !1, 
        t.message = "请输入正确的中文姓名，姓名中的特殊符号无需输入。", t);
    },
    Throttle: function(e, t) {
        var r = null;
        return function() {
            var n = this, a = arguments;
            r && clearTimeout(r), r = setTimeout(function() {
                e.apply(n, a);
            }, t && t > 0 ? t : 100);
        };
    },
    CheckAdrCode: function(e) {
        e = e || "";
        var t = {
            isTrue: !0,
            message: ""
        };
        return /^[0-9][0-9]{5}$/.test(e) ? t : (t.isTrue = !1, t.message = "请输入正确的邮编", t);
    }
};