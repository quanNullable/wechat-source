Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/api.js")), e = require("../../utils/config.js"), o = new t.default(), a = (getApp(), 
{
    data: {
        lbsInfo: {}
    },
    initLbsSDK: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = t.data, a = t.success, s = t.fail, i = t.style, n = void 0 === i ? null : i;
        e.rohr.i(e.rohrConfig.i), this.callBackSuccess = a, this.callBackFail = s;
        var c = void 0, r = void 0, l = void 0;
        n && (r = n.changeBut, c = n.verifyBut, l = n.bgColor), this.setData({
            lbsInfo: {
                data: o,
                show: !0,
                changeText: r.text || "换一换",
                changeColor: r.color || "#333",
                changeBgColor: r.bgColor || "transparent",
                verifyButText: c.text || "验证",
                verifyButColor: c.color || "#333",
                verifyButBgColor: c.backgroundColor || "#06c1ae",
                bgColor: l || "#FFF",
                opacity: .5,
                verifyDisa: !0,
                geolocation: []
            }
        }), this.getLbsInfo();
    },
    getLbsInfo: function() {
        var t = this, e = this.data, a = e.lbsInfo, s = e.lbsInfo.data, i = s.request_code, n = s.action, c = s.type;
        o.sendInfo({
            request_code: i,
            type: c,
            action: n
        }).then(function(e) {
            var o = e.status, s = e.data, i = e.error;
            if (1 === o) {
                var n = s.prompt.geolocation, c = n.items, r = n.hint, l = (n.selectcnt, !0), u = !1, f = void 0;
                try {
                    for (var d, h = c[Symbol.iterator](); !(l = (d = h.next()).done); l = !0) d.value.checked = !1;
                } catch (t) {
                    u = !0, f = t;
                } finally {
                    try {
                        !l && h.return && h.return();
                    } finally {
                        if (u) throw f;
                    }
                }
                a.items = c, a.hint = r, a.opacity = .5, a.verifyDisa = !0, t.setData({
                    lbsInfo: a
                });
            } else t.handleLbsError(i);
        }).catch(function(e) {
            t.lbsExit({
                text: "获取数据异常",
                code: 0,
                msg: "请求获取数据出异常了"
            });
        });
    },
    bindChange: function(t) {
        this.getLbsInfo();
    },
    bindVerify: function(t) {
        var e = this, a = this.data, s = a.lbsInfo, i = a.lbsInfo, n = i.geolocation, c = i.data, r = c.action, l = c.request_code, u = c.type, f = c.options;
        o.verify({
            request_code: l,
            type: u,
            action: r,
            options: {
                geolocation: JSON.stringify(n)
            }
        }).then(function(t) {
            var o = t.status, a = t.data, i = t.error;
            if (1 === o) {
                var n = a.response_code;
                if (s.show = !1, e.setData({
                    lbsInfo: s
                }), "function" == typeof e.callBackSuccess && e.callBackSuccess({
                    status: 1,
                    requestCode: l,
                    responseCode: n
                }), "string" == typeof e.callBackSuccess) {
                    var c = "status=1&requestCode=" + l + "&responseCode=" + n;
                    c = e.callBackSuccess.indexOf("?") > 0 ? "&" + c : "?" + c, e.navigate({
                        options: f,
                        url: e.callBackSuccess + c
                    });
                }
            } else e.handleLbsError(i);
        }).catch(function(t) {
            console.log(t), e.lbsExit({
                text: "验证异常了",
                code: 0,
                msg: "请求验证出异常了"
            });
        });
    },
    bindRadioChange: function(t) {
        var e = t.detail.value, o = this.data.lbsInfo;
        o.geolocation[0] = e, o.opacity = 1, o.verifyDisa = !1;
        var a = !0, s = !1, i = void 0;
        try {
            for (var n, c = o.items[Symbol.iterator](); !(a = (n = c.next()).done); a = !0) {
                var r = n.value;
                r.geohash == e ? r.checked = !0 : r.checked = !1;
            }
        } catch (t) {
            s = !0, i = t;
        } finally {
            try {
                !a && c.return && c.return();
            } finally {
                if (s) throw i;
            }
        }
        this.setData({
            lbsInfo: o
        });
    },
    handleLbsError: function(t) {
        this.data.lbsInfo;
        var o = t.code || 0, a = t.message || "网络错误";
        for (var s in e.closeStatus) e.closeStatus.hasOwnProperty(s) && Number(e.closeStatus[s]) === o && (o = "jump");
        switch (o) {
          case 121008:
            wx.showToast({
                title: "验证错误",
                complete: this.getLbsInfo()
            });
            break;

          case "jump":
            this.lbsExit({
                text: "请24小时之后重试",
                code: t.code,
                msg: a
            });
            break;

          default:
            this.lbsExit({
                text: "发生异常了",
                code: o,
                msg: a
            });
        }
    },
    lbsExit: function(t) {
        var e = t.text, o = t.code, a = t.msg, s = this, i = this.data.lbsInfo.data.options;
        wx.showToast({
            title: e,
            icon: "none",
            mask: !0,
            duration: 2e3,
            complete: function() {
                if ("function" == typeof s.callBackFail && s.callBackFail({
                    status: 0,
                    code: o,
                    msg: a
                }), "string" == typeof s.callBackFail) {
                    var t = "status=0&code=" + o + "&msg=" + a;
                    t = s.callBackFail.indexOf("?") > 0 ? "&" + t : "?" + t, s.navigate({
                        options: i,
                        url: s.callBackFail + t
                    });
                }
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

exports.default = a;