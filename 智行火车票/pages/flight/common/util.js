Object.defineProperty(exports, "__esModule", {
    value: !0
});

!function(e) {
    e && e.__esModule;
}(require("cDate"));

var e = {
    isMobile: function(e) {
        return /^(1[3-8][0-9])\d{8}$/.test(e);
    },
    isIdCard: function(e) {
        var t = e.toLowerCase().match(/\w/g);
        if (e.match(/^\d{17}[\dx]$/i)) {
            for (var n = 0, a = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], i = 0; i < 17; i++) n += parseInt(t[i], 10) * a[i];
            return "10x98765432".charAt(n % 11) == t[17] && !!e.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3");
        }
        return !!e.match(/^\d{15}$/) && !!e.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, "19$1-$2-$3");
    },
    isWorkTime: function() {
        var e = +new Date(), t = new Date(e).setHours(6, 0, 0), n = new Date(e).setHours(23, 0, 0);
        return e - t >= 0 && e <= n;
    },
    handleTrains: function(e, t) {
        var n, a = +new Date(), i = function(e) {
            return +new Date(t.replace(/\-/g, "/") + " " + e + ":00");
        }, o = function(e) {
            return parseInt(e / 60) + "时" + e % 60 + "分";
        }, s = function(e) {
            return e >= c[0] && e <= c[1] ? 2 : e >= c[1] && e <= c[2] ? 4 : e >= c[2] && e <= c[3] ? 8 : 16;
        }, r = function(e) {
            return u.indexOf(e) >= 0 ? 2 : 4;
        }, c = [ i("00:00"), i("06:00"), i("12:00"), i("18:00") ], u = [ "G", "C", "D" ], d = [];
        return e.forEach(function(e) {
            if (!(0 == e.seats.length || i(e.from_time) <= +new Date())) {
                n = e.seats[0], e.Price = n.seat_price, e.SeatName = n.seat_name, e.isJianLou = !n.seat_yupiao, 
                e.TimesCost = o(e.use_time), e.DepartTimeStamp = i(e.from_time), e.IsLocked = e.DepartTimeStamp - a <= 21e5, 
                e.timePeriod = s(e.DepartTimeStamp), e.trainType = r(e.train_number[0]), e.SaleNote = (e.note || "").replace(/(<br\/>)/g, ""), 
                e.down = !1;
                var t = [];
                e.seats.forEach(function(e) {
                    if (0 == e.seat_name.indexOf("硬卧上") || 0 == e.seat_name.indexOf("硬卧中") || 0 == e.seat_name.indexOf("软卧上") || 0 == e.seat_name.indexOf("高级软卧上") || 0 == e.seat_name.indexOf("高级动卧上") || 0 == e.seat_name.indexOf("动卧上")) return !1;
                    0 == e.seat_name.indexOf("硬卧下") ? e.seat_name = "硬卧" : 0 == e.seat_name.indexOf("软卧下") ? e.seat_name = "软卧" : 0 == e.seat_name.indexOf("高级软卧下") ? e.seat_name = "高级软卧" : 0 == e.seat_name.indexOf("高级动卧下") ? e.seat_name = "高级动卧" : 0 == e.seat_name.indexOf("动卧下") && (e.seat_name = "动卧"), 
                    t.push(e);
                }), e.seats = t, !e.IsLocked && d.push(e);
            }
        }), d;
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
            duration: 1e4
        });
    },
    hideLoading: function() {
        wx.hideToast();
    },
    showToast: function(e) {
        wx.showToast({
            title: e,
            icon: "success"
        });
    },
    hideToast: function() {
        wx.hideToast();
    },
    showWaringDialog: function(e) {
        wx.showModal({
            showCancel: !1,
            content: e,
            success: function(e) {}
        });
    },
    showModal: function(e) {
        wx.showModal({
            title: e.t || "提示",
            content: e.m,
            showCancel: e.showCancel || !1,
            cancelText: e.cancelText || "取消",
            cancelColor: "#5495e6",
            confirmText: e.confirmText || "确定",
            confirmColor: "#5495e6",
            success: e.done
        });
    },
    handleFlights: function(e) {
        var t = [];
        return e.forEach(function(e) {
            e.Price = e.adultPrice, e.DepartTimeStamp = e.departTime, e.departTimeDes = e.departTime.split(" ")[1].slice(0, 5), 
            e.arriveTimeDes = e.arriveTime.split(" ")[1].slice(0, 5), 0 == e.stopType ? e.stopTypeDes = "直飞" : 1 == e.stopType ? e.stopTypeDes = "经停" : 2 == e.stopType && (e.stopTypeDes = "中转"), 
            t.push(e);
        }), t;
    },
    getAppendProductInfo: function(e, t) {
        var n = this;
        this.showLoading("正在获取套餐详情");
        var a = "https://trains.ctrip.com/OrderService/Ajax/TrainProductService.ashx?Action=GetProductDesc&Body=" + e;
        wx.request({
            url: a,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e);
                var n = {
                    title: e.data.ProductInfoTitle,
                    infoArr: e.data.ProductInfoDesc.split("\n")
                };
                t && t(n);
            },
            fail: function(e) {
                console.log(e), t && t();
            },
            complete: function() {
                n.hideLoading();
            }
        });
    },
    isFastDoubleClick: function() {
        if (this.lastClickTime) {
            var e = +new Date() - this.lastClickTime;
            if (0 < e && e < 1e3) return !0;
        }
        return this.lastClickTime = +new Date(), !1;
    },
    checkInvoiceTax: function(e) {
        return !!/^[A-Za-z0-9]{15,30}$/.test(e);
    },
    showCouponDiscountPrice: function() {
        return !0;
    }
};

exports.default = e;