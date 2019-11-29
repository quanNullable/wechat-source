function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function t(e, t) {
    if ("string" != typeof e) return !1;
    e = e.replace(/[\[\]]/g, "\\$&");
    var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = require("../../../cwx/cwx"), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./cDate")), o = {
    isMobile: function(e) {
        return /^(1[3-8][0-9])\d{8}$/.test(e);
    },
    isIdCard: function(e) {
        var t = e.toLowerCase().match(/\w/g);
        if (e.match(/^\d{17}[\dx]$/i)) {
            for (var n = 0, r = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], a = 0; a < 17; a++) n += parseInt(t[a], 10) * r[a];
            return "10x98765432".charAt(n % 11) == t[17] && !!e.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3");
        }
        return !!e.match(/^\d{15}$/) && !!e.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, "19$1-$2-$3");
    },
    isValidChineseName: function(e) {
        return /^([\u4E00-\u9FA5]{1,20}((?:·|\.)[\u4E00-\u9FA5]{1,20})|[\u4E00-\u9FA5]{2,20}|([\u4E00-\u9FA5]{1,20}[a-zA-z]{1,20}))$/.test(e);
    },
    isValidPassport: function(e) {
        return /^[a-zA-Z0-9]{5,17}$/.test(e);
    },
    isValidHKMacao: function(e) {
        return /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(e);
    },
    isValidTaiwan: function(e) {
        var t = /^[0-9]{10}$/;
        return /^[0-9]{8}$/.test(e) || t.test(e);
    },
    isWorkTime: function() {
        var e = +new Date(), t = new Date(e).setHours(6, 0, 0), n = new Date(e).setHours(23, 0, 0);
        return e - t >= 0 && e <= n;
    },
    handleTrains: function(e, t) {
        var n, r = this, a = +new Date(), o = function(e) {
            return +new Date(t.replace(/\-/g, "/") + " " + e + ":00");
        }, i = function(e) {
            return parseInt(e / 60) + "时" + e % 60 + "分";
        }, u = function(e) {
            return e >= c[0] && e <= c[1] ? 2 : e >= c[1] && e <= c[2] ? 4 : e >= c[2] && e <= c[3] ? 8 : 16;
        }, s = function(e) {
            return f.indexOf(e) >= 0 ? 2 : l.indexOf(e) >= 0 ? 4 : d.indexOf(e) >= 0 ? 8 : 16;
        }, c = [ o("00:00"), o("06:00"), o("12:00"), o("18:00") ], f = [ "G", "C" ], l = [ "D" ], d = [ "Z", "T", "K" ], m = [];
        return e.forEach(function(e) {
            if (!(0 == e.SeatList.length || o(e.DepartTime) <= +new Date())) {
                n = e.SeatList[0], e.SeatCount = r.handleSeats(e.SeatList), e.Price = n.SeatPrice, 
                e.SeatName = n.SeatName, e.isJianLou = !n.SeatInventory, e.TimesCost = i(e.RunTime), 
                e.DepartTimeStamp = o(e.DepartTime), e.IsLocked = e.DepartTimeStamp - a <= 21e5, 
                e.timePeriod = u(e.DepartTimeStamp), e.trainType = s(e.TrainNumber[0]), e.SaleNote = (e.SaleNote || "").replace(/(<br\/>)/g, ""), 
                e.down = !1;
                var t = [];
                e.SeatList.forEach(function(e) {
                    if (0 == e.SeatName.indexOf("硬卧上") || 0 == e.SeatName.indexOf("硬卧中") || 0 == e.SeatName.indexOf("软卧上") || 0 == e.SeatName.indexOf("高级软卧上") || 0 == e.SeatName.indexOf("高级动卧上") || 0 == e.SeatName.indexOf("动卧上")) return !1;
                    0 == e.SeatName.indexOf("硬卧下") ? e.SeatName = "硬卧" : 0 == e.SeatName.indexOf("软卧下") ? e.SeatName = "软卧" : 0 == e.SeatName.indexOf("高级软卧下") ? e.SeatName = "高级软卧" : 0 == e.SeatName.indexOf("高级动卧下") ? e.SeatName = "高级动卧" : 0 == e.SeatName.indexOf("动卧下") && (e.SeatName = "动卧"), 
                    t.push(e);
                }), e.seats = t, !e.IsLocked && m.push(e);
            }
        }), m;
    },
    handleSeats: function(e) {
        var t = 0;
        return e.forEach(function(e) {
            t += e.SeatInventory;
        }), t;
    },
    setTitle: function(e) {
        wx.setNavigationBarTitle({
            title: e
        });
    },
    showLoading: function(e) {
        wx.showToast({
            title: e || "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        });
    },
    hideLoading: function() {
        wx.hideToast();
    },
    showToast: function(e) {
        wx.showToast({
            title: e || "",
            icon: "success"
        });
    },
    hideToast: function() {
        wx.hideToast();
    },
    showModal: function(e) {
        wx.showModal({
            title: e.title || "提示",
            content: e.m,
            showCancel: e.showCancel || !1,
            cancelText: e.cancelText || "取消",
            cancelColor: e.cancelColor || "#5495e6",
            confirmText: e.confirmText || "确定",
            confirmColor: "#5495e6",
            success: e.done
        });
    },
    isTest: function() {
        var e = r.cwx.util.systemInfo.platform && r.cwx.util.systemInfo.platform.toLowerCase();
        if (!r.cwx.user || !r.cwx.user.userName || !o.payPostfix.length || "tieyou" !== r.cwx.config.partner || "ios" !== e && "devtools" !== e) return !1;
        var t = r.cwx.user.userName;
        return r._.some(o.payPostfix, function(e) {
            return !!e && o.endsWith(t, e);
        });
    },
    payPostfix: [],
    setConfigPayPostfix: function(e) {
        o.payPostfix = e;
    },
    parsePasExt: function(e, t) {
        var n = {};
        if (t) try {
            n = JSON.parse(t) || {};
        } catch (e) {
            console.log(e);
        }
        return n;
    },
    endsWith: function(e, t, n) {
        var r = e.length;
        (n = void 0 === n ? r : +n) < 0 || n != n ? n = 0 : n > r && (n = r);
        var a = n;
        return (n -= t.length) >= 0 && e.slice(n, a) == t;
    },
    forceBuyPackage: !1,
    isForceBuy: function() {
        return o.forceBuyPackage;
    },
    setConfigForceBuy: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        o.forceBuyPackage = e;
    },
    getPureDate: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date(), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return new Date(e.getFullYear(), e.getMonth(), e.getDate(), t, 0, 0, 0);
    },
    getDiffDays: function(e, t) {
        var n = o.getPureDate(e), r = o.getPureDate(t);
        return Math.floor((r - n) / 864e5);
    },
    getDiffDHS: function(e, t) {
        var n = t - e, r = n % 36e5 / 6e4, a = n % 864e5 / 36e5, o = n / 864e5;
        return {
            days: Math.floor(o),
            hours: Math.floor(a),
            seconds: Math.floor(r)
        };
    },
    getCardType: function(e) {
        var t = "";
        switch (e) {
          case 2:
            t = "护照";
            break;

          case 4:
            t = "军人证";
            break;

          case 7:
            t = "回乡证";
            break;

          case 8:
            t = "台胞证";
            break;

          case 10:
            t = "港澳通行证";
            break;

          case 22:
            t = "台湾通行证";
            break;

          default:
            t = "身份证";
        }
        return t;
    },
    getCalendarInfo: function(e) {
        var t = new a.default().addDay(29), n = {}, r = a.default.parse(e).getTime(), o = a.default.parse(t.format("Y/n/j"));
        for (n[o.format("Y/n/j")] = {
            title: "开售"
        }, o = o.addDay(1); o.getTime() <= r; ) n[o.format("Y/n/j")] = {
            title: "可抢"
        }, o = o.addDay(1);
        return n;
    },
    getMidFromScene: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return decodeURIComponent(e);
    },
    getDeferred: function() {
        var e = {};
        return e.promise = new Promise(function(t, n) {
            e.resolve = t, e.reject = n;
        }), e;
    },
    useMixin: function(e) {
        (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).forEach(function(t) {
            t.data && Object.assign(e.data, t.data), t.methods && Object.keys(t.methods).forEach(function(n) {
                e[n] = t.methods[n];
            });
        });
    },
    setNavigationBarColor: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        o.safeWX("setNavigationBarColor", void 0, e);
    },
    canIUse: function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return o.safeWX.apply(o, [ "canIUse", void 0 ].concat(t));
    },
    safeWX: function() {
        for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, n = arguments.length, a = Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) a[o - 2] = arguments[o];
        return r.cwx[e] ? r.cwx[e].apply(r.cwx, a) : t.apply(void 0, a);
    },
    promisifyModel: function(e, t) {
        return function() {
            for (var n = arguments.length, r = Array(n), a = 0; a < n; a++) r[a] = arguments[a];
            var o = void 0;
            return t && t.thisArg ? o = t.thisArg : t && (o = t), new Promise(function(t, n) {
                r.push(function(e) {
                    t(e);
                }), r.push(function(e) {
                    n(e);
                }), r.push(function() {}), e.apply(o, r);
            });
        };
    },
    isGaoTie: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return /^G|C/.test(e);
    },
    isDongChe: function(e) {
        return /^D/.test(e);
    },
    isPuKuai: function(e) {
        return /^Z|K|T/.test(e);
    },
    getTrainType: function(e) {
        var t = "其他";
        return o.isGaoTie(e) ? t = "高铁" : o.isDongChe(e) ? t = "动车" : o.isPuKuai(e) && (t = "普快"), 
        t;
    },
    isFirstClassSeat: function(e) {
        return "一等座" === e;
    },
    isSecondClassSeat: function(e) {
        return "二等座" === e;
    },
    isBussinessClassSeat: function(e) {
        return "商务座" === e;
    },
    isHardSeat: function(e) {
        return "硬座" === e;
    },
    isSoftSeat: function(e) {
        return "软座" === e;
    },
    isHardLieSeat: function(e) {
        return "硬卧" === e;
    },
    isSoftLieSeat: function(e) {
        return "软卧" === e;
    },
    isChoosingCRM: function(e) {
        return o.isFirstClassSeat(e) || o.isSecondClassSeat(e) || o.isBussinessClassSeat(e);
    },
    isCDGTrain: function(e) {
        return o.isDongChe(e) || o.isGaoTie(e);
    },
    isSameTrainType: function(e, t) {
        return o.getTrainType(e) === o.getTrainType(t);
    },
    unique: function(e) {
        for (var t = [], n = 0; n < e.length; n++) -1 == t.indexOf(e[n]) && t.push(e[n]);
        return t;
    },
    getTrainTypes: function(e) {
        var t = [ "G", "D", "C" ], n = e.map(function(e) {
            return e[0];
        }).map(function(e) {
            return t.indexOf(e) > -1 ? e : "O";
        });
        return o.unique(n);
    },
    calJLEndTime: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Y-m-d H:i:s", r = Math.max.apply(Math, e(t)), o = r - 36e5, i = new Date(o);
        return new Date().getTime() >= i.getTime() && (o = r - 21e5, i = new Date(o)), new a.default(i).format(n);
    },
    configs: {},
    setConfig: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return o.configs[e] = t, t;
    },
    getConfig: function(e, t) {
        return o.configs[e] || t;
    },
    setConfigSwitch: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return o.setConfig(e, !!parseInt(t));
    },
    getRobShareObj: function(e) {
        var t = e.shareKey, n = void 0 === t ? "" : t, a = e.arriveStation, o = void 0 === a ? "" : a, i = e.allianceid, u = void 0 === i ? "" : i, s = e.sid, c = void 0 === s ? "" : s, f = e.success, l = void 0 === f ? function() {} : f, d = e.shareImgs, m = void 0 === d ? [] : d, h = o ? "我正在抢到" + o + "的火车票" : "我正在抢火车票", g = "/pages/train/robshare0914/robshare0914?scene=" + encodeURIComponent(n) + "&allianceid=" + u + "&sid=" + c, p = r.cwx.config.isTieyou ? "https://images3.c-ctrip.com/train/wechat/share/robshare-ty.png" : "https://images3.c-ctrip.com/train/wechat/share/robshare-zx.png";
        return m && (p = m[Math.floor(Math.random() * m.length)]), {
            bu: "train",
            title: h,
            path: g,
            imageUrl: p,
            success: l
        };
    },
    convertStr: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = /<font(\s+color=['"]([a-zA-Z#0-9]*)?['"])([^>]*)>([^<]*)<\/font>/gi;
        return o.canIUse("rich-text") ? e.replace(t, '<span style="color:$2">$4</span>') : e.replace(t, "$4");
    },
    mergeDeep: function(t) {
        function r(t) {
            for (var a = function(e) {
                return e && "object" === (void 0 === e ? "undefined" : n(e));
            }, o = arguments.length, i = Array(o > 1 ? o - 1 : 0), u = 1; u < o; u++) i[u - 1] = arguments[u];
            return i.reduce(function(t, n) {
                return Object.keys(n).forEach(function(o) {
                    var i = t[o], u = n[o];
                    Array.isArray(i) && Array.isArray(u) ? t[o] = i.concat.apply(i, e(u)) : a(i) && a(u) ? t[o] = r(i, u) : t[o] = u;
                }), t;
            }, t || {});
        }
        for (var a = arguments.length, o = Array(a > 1 ? a - 1 : 0), i = 1; i < a; i++) o[i - 1] = arguments[i];
        return r.apply(void 0, [ t ].concat(o));
    },
    arraySame: function(e, t) {
        if (e.length != t.length) return !1;
        var n = new Set(e), r = new Set(t), a = !0, o = !1, i = void 0;
        try {
            for (var u, s = n[Symbol.iterator](); !(a = (u = s.next()).done); a = !0) {
                var c = u.value;
                if (!r.has(c)) return !1;
            }
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (o) throw i;
            }
        }
        return !0;
    },
    isSameCrossStationSolution: function(e, t) {
        return e.recommendDepartStation === t.recommendDepartStation && e.recommendDepartCount === t.recommendDepartCount && e.recommendArriveStation === t.recommendArriveStation && e.recommendArriveCount === t.recommendArriveCount;
    },
    formatCrossSolutions: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], r = {};
        return t.forEach(function(e) {
            (e.selected || e.disabled) && (r[e.SeatName] = !0);
        }), n.forEach(function(e) {
            r[e] = !0;
        }), e.forEach(function(e) {
            var t = 0, n = 0;
            e.extraAmountInfos.forEach(function(e) {
                r[e.seatType] && t < e.amount && (t = e.amount, n = e.successRate);
            }), e.f_extraAmount = t, e.f_successRate = n;
        }), e;
    },
    wait: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = o.getDeferred(), n = setTimeout(t.resolve, e);
        return {
            promise: t.promise,
            timeoutId: n
        };
    },
    getUrlParam: t,
    getUrlParams: function(e, n) {
        if ("string" != typeof e) return !1;
        var r = {}, a = 0, o = (e = e.split(" ")).length;
        if (0 === e.length) return !1;
        for (;a < o; a++) r[e[a]] = t(e[a], n);
        return r;
    }
};

exports.default = o;