function t(t) {
    return t ? new Date(t.replace(/-/g, "/")) : null;
}

function e(t, e, a) {
    return [ t, e + 1, a ].join("/");
}

function a(t) {
    return 15 & m[t - 1900];
}

function n(t) {
    var e, a = 348;
    for (e = 32768; e > 8; e >>= 1) a += m[t - 1900] & e ? 1 : 0;
    return a + r(t);
}

function r(t) {
    return a(t) ? 65536 & m[t - 1900] ? 30 : 29 : 0;
}

function o(t, e) {
    return m[t - 1900] & 65536 >> e ? 30 : 29;
}

function i(t) {
    return t.getMonth() + 1 < 10 ? "0" + (parseInt(t.getMonth()) + 1) : t.getMonth() + 1;
}

function s(t) {
    return t.getDate() < 10 ? "0" + t.getDate().toString() : t.getDate().toString();
}

function u(t) {
    var e = new Date(t), a = new Date();
    a.setDate("1");
    for (var n = 0, r = 0; r <= e.getDate(); r++) a.getDay() === e.getDay() && n++, 
    a.setDate(a.getDate() + parseInt(1));
    return n + "" + e.getDay();
}

function h(t) {
    var e;
    switch (t) {
      case 1:
        e = "正";
        break;

      case 11:
        e = "十一";
        break;

      case 12:
        e = "腊";
        break;

      default:
        e = v[(t - 1) % 10];
    }
    return e + "月";
}

function c(t) {
    var e;
    switch (t) {
      case 10:
        e = "初十";
        break;

      case 20:
        e = "二十";
        break;

      case 30:
        e = "三十";
        break;

      default:
        e = M[Math.floor(t / 10)], e += v[t % 10 - 1];
    }
    return e;
}

function d(t) {
    var e = new Date(t), a = i(e) + "" + s(e), n = i(e) + "" + u(t);
    return T[a] ? T[a] : !!w[n] && w[n];
}

function l(t) {
    var e = (t.month < 10 ? "0" + t.month : t.month) + "" + (t.day < 10 ? "0" + t.day : t.day);
    return !!E[e] && E[e];
}

function f(t) {
    var e, i = new Date(t), s = 0, u = 0, h = new Date(1900, 0, 31), c = Math.round((i - h) / 864e5), d = {};
    for (d.dayCyl = c + 40, d.monCyl = 14, e = 1900; e < 2050 && c > 0; e++) c -= u = n(e), 
    d.monCyl += 12;
    for (c < 0 && (c += u, e--, d.monCyl -= 12), d.year = e, d.yearCyl = e - 1864, s = a(e), 
    d.isLeap = !1, e = 1; e < 13 && c > 0; e++) s > 0 && e == s + 1 && 0 == d.isLeap ? (--e, 
    d.isLeap = !0, u = r(d.year)) : u = o(d.year, e), 1 == d.isLeap && e == s + 1 && (d.isLeap = !1), 
    c -= u, 0 == d.isLeap && d.monCyl++;
    return 0 == c && s > 0 && e == s + 1 && (d.isLeap ? d.isLeap = !1 : (d.isLeap = !0, 
    --e, --d.monCyl)), c < 0 && (c += u, --e, --d.monCyl), d.month = e, d.day = c + 1, 
    {
        year: d.year,
        month: d.month,
        day: d.day,
        isLeap: d.isLeap
    };
}

function D(t) {
    return t >= 10 ? "" + t : "0" + t;
}

function p(t, a, n, r, o, i) {
    for (var s = new Date(t, a, 1), u = function(s) {
        var u = !1, g = e(t, a, s), y = t + "-" + D(a + 1) + "-" + D(s);
        if (Y && (t < Y.year && (u = !0), t == Y.year && a < Y.month && (u = !0), t == Y.year && a == Y.month && s < Y.date && (u = !0)), 
        r) {
            var m = r.split("-"), v = parseInt(m[0]), M = parseInt(m[1]) - 1, T = parseInt(m[2]);
            t < v && (u = !0), t == v && a < M && (u = !0), t == v && a == M && s < T && (u = !0);
        }
        if (o) {
            var m = o.split("-"), w = parseInt(m[0]), E = parseInt(m[1]) - 1, A = parseInt(m[2]);
            t > w && (u = !0), t == w && a > E && (u = !0), t == w && a == E && s > A && (u = !0);
        }
        var L = d(g), _ = f(g), O = 1 == _.day ? h(_.month) : c(_.day);
        L || _.isLeap || (L = l(_));
        var P = !(u || !i || !i[g]) && i[g];
        p.push({
            choose: g == n.replace(/-/g, "/"),
            value: g,
            date: s,
            outOfRange: u,
            today: g == S,
            holiday: L,
            lunar: O,
            workday: C.indexOf(g) >= 0,
            restday: I.indexOf(g) >= 0,
            dateValuePreZero: y,
            info: P
        });
    }, p = [], g = s.getDay(), y = 0; y < g; y++) p.push({
        date: null
    });
    for (var m = 1; m < 28; m++) u(m);
    for (;s.getMonth() == a; ) u(m), s.setDate(++m);
    return p;
}

var g = require("../../cwx.js"), y = require("../../../pages/train/common/model.js"), m = [ 19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42448, 83315, 21200, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46496, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448 ], v = [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十" ], M = [ "初", "十", "廿", "卅" ], T = {
    "0101": "元旦",
    "0214": "情人节",
    "0308": "妇女节",
    "0312": "植树节",
    "0401": "愚人节",
    "0422": "地球日",
    "0501": "劳动节",
    "0504": "青年节",
    "0531": "无烟日",
    "0601": "儿童节",
    "0606": "爱眼日",
    "0701": "建党日",
    "0801": "建军节",
    "0910": "教师节",
    1001: "国庆节",
    1031: "万圣节",
    1111: "光棍节",
    1224: "平安夜",
    1225: "圣诞节"
}, w = {
    "0520": "母亲节",
    "0630": "父亲节",
    1144: "感恩节"
}, E = {
    "0101": "春节",
    "0115": "元宵节",
    "0202": "龙抬头",
    "0505": "端午节",
    "0707": "七夕",
    "0715": "中元节",
    "0815": "中秋节",
    "0909": "重阳节",
    1208: "腊八节",
    1224: "小年",
    1230: "除夕"
}, A = {
    TITLE: "选择日期",
    YEAR_POSTFIX: "年",
    MONTH_NAMES: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
    YEAR_MONTH_SEPERATOR: "",
    DAY_NAMES: [ "日", "一", "二", "三", "四", "五", "六" ]
}, L = [ [ "2016-10-1", "国庆" ], [ "2016-10-9", "重阳" ], [ "2016-12-25", "圣诞" ], [ "2017-1-1", "元旦" ], [ "2017-1-27", "除夕" ], [ "2017-1-28", "春节" ], [ "2017-2-11", "元宵" ], [ "2017-4-4", "清明" ], [ "2017-5-50", "端午" ], [ "2017-10-1", "国庆" ], [ "2017-10-4", "中秋" ], [ "2017-10-28", "重阳" ], [ "2017-12-25", "圣诞" ] ], I = [ "2017/10/1", "2017/10/2", "2017/10/3", "2017/10/4", "2017/10/5", "2017/10/6", "2017/10/7", "2017/10/8" ], C = [ "2017/9/30" ], _ = new Date(), O = 1900 + _.getYear(), P = _.getMonth(), R = _.getDate(), S = e(O, P, R), Y = {
    year: O,
    month: P,
    date: R
};

(0, g.CPage)({
    pageId: "10320654340",
    data: {
        DAY_NAMES: A.DAY_NAMES,
        monthDates: [],
        year_month_seperator: A.YEAR_MONTH_SEPERATOR,
        HOLIDAYS: L,
        choosenDate: null,
        scrollToID: null,
        tips: null,
        flightCalendar: !1
    },
    onLoad: function(t) {
        this.options = t, g.cwx.showToast({
            title: "加载中..",
            icon: "loading",
            duration: 1e4,
            complete: function() {}
        });
    },
    getFlightLowestPrice: function() {
        var t = this, e = this.queryParams;
        (0, y.FlightLowestPriceModel)(e, function(e) {
            if (e && e.data && e.data.length) {
                var a = t.data.monthDates, n = {};
                e.data.forEach(function(t) {
                    n[t.flightDate.split(" ")[0]] = t.price;
                }), a.forEach(function(t) {
                    t.dates.forEach(function(t) {
                        t.price = (n[t.dateValuePreZero] || "") + "", t.price && (t.price = "¥" + t.price);
                    });
                }), t.setData({
                    monthDates: a
                });
            }
        }, function(t) {});
    },
    onReady: function() {
        var t = this.options;
        this.setData({
            flightCalendar: t.data.flight || !1
        }), this.updateMonthDates(t.data), this.title = t.data.title || "日历", g.cwx.setNavigationBarTitle({
            title: this.title
        }), g.cwx.hideToast(), this.queryParams = t.data.queryParams, this.data.flightCalendar && this.getFlightLowestPrice();
    },
    onDateTap: function(t) {
        var e = t.currentTarget.dataset, a = this.updateChooseDate(e.date);
        this.setData({
            choosenDate: e.date,
            monthDates: a
        }), this.invokeCallback(e.date), this.navigateBack();
    },
    onHolidayTap: function(t) {
        this.setData({
            choosenDate: "date-" + t.currentTarget.dataset.date
        });
    },
    updateChooseDate: function(t) {
        var e = this.data.monthDates;
        return e.forEach(function(e) {
            e.dates && e.dates instanceof Array && e.dates.forEach(function(e) {
                e && (e.choose = !1, e.value === t && (e.choose = !0));
            });
        }), e;
    },
    updateToday: function() {
        var t = new Date();
        O = 1900 + t.getYear(), P = t.getMonth(), R = t.getDate(), S = e(O, P, R);
    },
    updateMonthDates: function(e) {
        var a = e.choosenDate, n = e.beginDate, r = e.endDate, o = e.info;
        this.updateToday(), _ = t(n) || new Date(), O = 1900 + _.getYear(), P = _.getMonth(), 
        R = _.getDate(), Y = {
            year: O,
            month: P,
            date: R
        };
        for (var i = t(r) || new Date(O + 2, P, R), s = i.getFullYear(), u = i.getMonth(), h = [], c = 12 * (s - O) + (u - P) + 1; c--; ) h.push({
            monthID: "mid" + O + "-" + (P + 1),
            monthName: O + A.YEAR_POSTFIX + A.YEAR_MONTH_SEPERATOR + A.MONTH_NAMES[P],
            dates: p(O, P, a, n, r, o)
        }), 11 == P ? (O++, P = 0) : P++;
        var d = null;
        if (a) {
            var l = a.split("-");
            d = "mid" + l[0] + "-" + l[1];
        }
        var f = e.tips;
        this.setData({
            tips: f,
            monthDates: h
        }), this.setData({
            scrollToID: d
        });
    }
});