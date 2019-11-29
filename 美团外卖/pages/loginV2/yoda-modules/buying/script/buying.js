Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/api.js")), e = require("../../utils/config.js"), a = new t.default(), o = (getApp(), 
{
    data: {
        buyingInfo: {}
    },
    initBuyingSDK: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = t.data, o = t.success, i = t.fail, n = t.style, r = void 0 === n ? null : n;
        e.rohr.i(e.rohrConfig.i), this.callBackSuccess = o, this.callBackFail = i;
        var s = void 0, c = void 0, u = void 0;
        r && (c = r.changeBut, s = r.verifyBut, u = r.bgColor), this.setData({
            buyingInfo: {
                data: a,
                show: !0,
                changeText: c.text || "换一换",
                changeColor: c.color || "#333",
                changeBgColor: c.bgColor || "transparent",
                verifyButText: s.text || "验证",
                verifyButColor: s.color || "#333",
                verifyButBgColor: s.backgroundColor || "#06c1ae",
                bgColor: u || "#FFF",
                opacity: .5,
                verifyDisa: !0,
                purchaseddeal: []
            }
        }), this.getBuyInfo();
    },
    getBuyInfo: function() {
        var t = this, e = this.data, o = e.buyingInfo, i = e.buyingInfo.data, n = i.request_code, r = i.action, s = i.type;
        a.sendInfo({
            request_code: n,
            type: s,
            action: r
        }).then(function(e) {
            var a = e.status, i = e.data, n = e.error;
            if (1 === a) {
                var r = i.prompt.purchaseddeal, s = r.items, c = r.hint, u = (r.selectcnt, !0), l = !1, d = void 0;
                try {
                    for (var f, h = s[Symbol.iterator](); !(u = (f = h.next()).done); u = !0) {
                        var y = f.value;
                        y.couponTitle = y.couponTitle.length > 25 ? y.couponTitle.substring(0, 24) + "..." : y.couponTitle, 
                        y.checked = !1;
                    }
                } catch (t) {
                    l = !0, d = t;
                } finally {
                    try {
                        !u && h.return && h.return();
                    } finally {
                        if (l) throw d;
                    }
                }
                o.items = s, o.hint = c, o.opacity = .5, o.verifyDisa = !0, t.setData({
                    buyingInfo: o
                });
            } else t.handleError(n);
        }).catch(function(e) {
            t.buyExit({
                text: "获取数据异常",
                code: 0,
                msg: "请求历史购买信息出异常了"
            });
        });
    },
    bindChange: function(t) {
        this.getBuyInfo();
    },
    bindVerify: function(t) {
        var e = this, o = this.data, i = o.buyingInfo, n = o.buyingInfo, r = n.purchaseddeal, s = n.data, c = s.action, u = s.request_code, l = s.type, d = s.options;
        a.verify({
            request_code: u,
            type: l,
            action: c,
            options: {
                purchaseddeal: JSON.stringify(r)
            }
        }).then(function(t) {
            var a = t.status, o = t.data, n = t.error;
            if (1 === a) {
                var r = o.response_code;
                if (i.show = !1, e.setData({
                    buyingInfo: i
                }), "function" == typeof e.callBackSuccess && e.callBackSuccess({
                    status: 1,
                    requestCode: u,
                    responseCode: r
                }), "string" == typeof e.callBackSuccess) {
                    var s = "status=1&requestCode=" + u + "&responseCode=" + r;
                    s = e.callBackSuccess.indexOf("?") > 0 ? "&" + s : "?" + s, e.navigate({
                        options: d,
                        url: e.callBackSuccess + s
                    });
                }
            } else e.handleError(n);
        }).catch(function(t) {
            e.buyExit({
                text: "验证异常了",
                code: 0,
                msg: "请求验证出异常了"
            });
        });
    },
    bindRadioChange: function(t) {
        var e = t.detail.value, a = this.data.buyingInfo;
        a.purchaseddeal[0] = e, a.opacity = 1, a.verifyDisa = !1;
        var o = !0, i = !1, n = void 0;
        try {
            for (var r, s = a.items[Symbol.iterator](); !(o = (r = s.next()).done); o = !0) {
                var c = r.value;
                c.dealid === Number(e) ? c.checked = !0 : c.checked = !1;
            }
        } catch (t) {
            i = !0, n = t;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (i) throw n;
            }
        }
        this.setData({
            buyingInfo: a
        });
    },
    handleError: function(t) {
        this.data.buyingInfo;
        var a = t.code || 0, o = t.message || "网络错误";
        for (var i in e.closeStatus) e.closeStatus.hasOwnProperty(i) && Number(e.closeStatus[i]) === a && (a = "jump");
        switch (a) {
          case 121008:
            wx.showToast({
                title: "验证错误",
                complete: this.getBuyInfo()
            });
            break;

          case "jump":
            this.buyExit({
                text: "请24小时后重试",
                code: t.code,
                msg: o
            });
            break;

          default:
            this.buyExit({
                text: "发生异常了",
                code: a,
                msg: o
            });
        }
    },
    buyExit: function(t) {
        var e = t.text, a = t.code, o = t.msg, i = this, n = this.data.buyingInfo.data.options;
        wx.showToast({
            title: e,
            icon: "none",
            mask: !0,
            duration: 2e3,
            complete: function() {
                if ("string" == typeof i.callBackFail) {
                    var t = "status=0&code=" + a + "&msg=" + o;
                    t = i.callBackFail.indexOf("?") > 0 ? "&" + t : "?" + t, i.navigate({
                        options: n,
                        url: i.callBackFail + t
                    });
                }
                "function" === i.callBackFail && i.callBackFail({
                    status: 0,
                    code: a,
                    msg: o
                });
            }
        });
    },
    onTapPage: function(t) {
        e.rohr.t(t);
    },
    onTouchMovePage: function(t) {
        e.rohr.m(t);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});

exports.default = o;