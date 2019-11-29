function s(s) {
    return s && s.__esModule ? s : {
        default: s
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = s(require("../../utils/api.js")), e = require("../../utils/config.js"), o = s(require("../../slidervalid/script/slider.plugin.js")), a = s(require("../../image/script/image.js")), i = new t.default(), r = getApp(), n = {
    data: {
        smsInfo: {}
    },
    initSmsSDK: function() {
        var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = s.data, o = s.success, a = s.fail, i = s.style, n = void 0 === i ? null : i;
        e.rohr.i(e.rohrConfig.i);
        var c = this;
        c.smsCallBackSuccess = o, c.smsCallBackFail = a;
        var l = void 0, d = void 0, u = void 0, m = void 0, f = void 0, h = void 0;
        n && Object.keys(n).length > 0 && (l = n.mobileInput, d = n.codeInput, u = n.codeButton, 
        m = n.verifyButton, f = n.imgStyle, h = n.sliderStyle), l || (l = {});
        var p = l.mobilePlac || "仅支持中国大陆手机号";
        l.caretColor = l.caretColor || "currentColor", d || (d = {});
        var v = d.mobilePlac || "请输入验证码";
        d.caretColor = d.caretColor || "currentColor", u || (u = {});
        var b = u.text || "获取验证码";
        u.color = u.color || "#333", u.borderRadius = u.borderRadius || "3px", u.borderWidth = u.borderWidth || "thin", 
        u.borderColor = u.borderColor || "transparent", u.backgroundColor = u.backgroundColor || "transparent", 
        m || (m = {});
        var g = m.text || "验证";
        m.color = m.color || "#333", m.borderRadius = m.borderRadius || "3px", m.borderWidth = m.borderWidth || "thin", 
        m.borderColor = m.borderColor || "transparent", m.backgroundColor = m.backgroundColor || "transparent", 
        r.$loginPage = this;
        var S = t.riskLevel.split("|");
        c.setData({
            smsInfo: {
                data: t,
                isMobile: !!t.mobile,
                isSend: !1,
                show: !0,
                showImg: !1,
                smsFocus: !1,
                imgStyle: f,
                sliderStyle: h,
                mobileLable: "手机号",
                verifyCodeLable: "验证码",
                smscode: "",
                mobilePlac: p,
                codeButText: b,
                codePlac: v,
                verifyButText: g,
                smsButColor: t.mobile ? m.color : "#B6B6B6",
                mobileInput: l,
                codeInput: d,
                codeButton: u,
                verifyButton: m,
                opacity: .5,
                sendSmsDisa: !t.mobile,
                verifyDisa: !0,
                switchText: S.length > 1
            }
        }), "true" === t.autoSend && this.tapSeedSmS();
    },
    tapSeedSmS: function(s) {
        var t = this, e = this, o = this.data, a = o.smsInfo, r = o.smsInfo, n = r.isMobile, c = r.mobile, l = r.data, d = l.action, u = l.request_code, m = l.type;
        l.riskLevel, n && (c = ""), i.sendInfo({
            request_code: u,
            type: m,
            action: d,
            options: {
                mobile: c,
                moduleEnable: !0
            }
        }).then(function(s) {
            var o = s.status, i = (s.data, s.error);
            1 === o ? (wx.showToast({
                title: "已发送短信"
            }), t.showWaitModal(), a.isSend = !0, a.smsFocus = !0) : t.smsHandleError(i), e.setData({
                smsInfo: a
            });
        }).catch(function(s) {
            e.smsExit({
                text: "发送短信异常",
                code: 0,
                msg: "请求发送短信异常"
            });
        });
    },
    bindSmsVerify: function(s) {
        var t = this, e = this.data.smsInfo, o = e.isMobile, a = e.smscode, r = e.mobile, n = e.data, c = n.action, l = n.request_code, d = n.type, u = (n.riskLevel, 
        n.options);
        o && (r = ""), i.verify({
            request_code: l,
            type: d,
            action: c,
            options: {
                smscode: a,
                mobile: r
            }
        }).then(function(s) {
            var e = s.status, o = s.data, a = s.error;
            if (1 === e) {
                var i = o.response_code;
                if ("string" == typeof t.smsCallBackSuccess) {
                    var r = "status=1&requestCode=" + l + "&responseCode=" + i;
                    r = t.smsCallBackSuccess.indexOf("?") > 0 ? "&" + r : "?" + r, t.navigate({
                        options: u,
                        url: t.smsCallBackSuccess + r
                    });
                }
                "function" == typeof t.smsCallBackSuccess && t.smsCallBackSuccess({
                    status: 1,
                    requestCode: l,
                    responseCode: i
                });
            } else t.smsHandleError(a);
        }).catch(function(s) {
            t.smsExit({
                text: "验证异常",
                code: 0,
                msg: "请求验证异常"
            });
        });
    },
    smsHandleError: function(s) {
        var t = this, o = s.code || 0, a = s.message || "网络错误";
        for (var i in e.closeStatus) e.closeStatus.hasOwnProperty(i) && Number(e.closeStatus[i]) === o && (o = "jump");
        switch (o) {
          case 121038:
            wx.showToast({
                title: "操作过于频繁"
            });
            break;

          case 121044:
            t.smsExit({
                text: "授权码过期",
                code: o,
                msg: a
            });
            break;

          case 121048:
            t.showImgModal(s.request_code);
            break;

          case 121060:
            t.showSliderModal(s.request_code);
            break;

          case 121047:
            t.smsTip("请重新发送短信");
            break;

          case 121008:
            t.smsTip("验证码错误");
            break;

          case "jump":
            t.smsExit({
                text: "请24小时后重试",
                code: s.code,
                msg: a
            });
            break;

          default:
            t.smsExit({
                text: "发生异常了",
                code: o,
                msg: a
            });
        }
    },
    smsTip: function(s) {
        var t = this, e = this.data.smsInfo;
        wx.showToast({
            title: s,
            icon: "none",
            mask: !0,
            duration: 2e3,
            complete: function() {
                e.smscode = "", e.opacity = .5, e.verifyDisa = !0, t.setData({
                    smsInfo: e
                });
            }
        });
    },
    smsExit: function() {
        var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = s.text, e = s.code, o = s.msg, a = this, i = this.data.smsInfo.data.options;
        wx.showToast({
            title: t,
            icon: "none",
            mask: !0,
            duration: 2e3,
            complete: function() {
                if ("function" == typeof a.smsCallBackFail && a.smsCallBackFail({
                    status: 0,
                    code: e,
                    msg: o
                }), "string" == typeof a.smsCallBackFail) {
                    var s = "status=0&code=" + e + "&msg=" + o;
                    s = a.smsCallBackFail.indexOf("?") > 0 ? "&" + s : "?" + s, a.navigate({
                        options: i,
                        url: a.smsCallBackFail + s
                    });
                }
            }
        });
    },
    showImgModal: function(s) {
        var t = this, e = this.data.smsInfo.imgStyle, o = getApp().$loginPage;
        Object.keys(a.default).forEach(function(s) {
            "data" === s ? Object.assign(o.data, a.default.data) : o[s] = a.default[s];
        });
        try {
            o.initImageSDK({
                requestCode: s,
                success: function() {
                    t.tapSeedSmS();
                },
                fail: function() {
                    t.smsTip("图片验证异常");
                },
                style: e
            });
        } catch (s) {
            t.smsExit({
                text: "图片验证异常",
                code: 0,
                msg: "短信弹图片验证异常"
            });
        }
    },
    showSliderModal: function(s) {
        var t = this, e = this.data.smsInfo, a = getApp().$loginPage;
        Object.keys(o.default).forEach(function(s) {
            "data" === s ? Object.assign(a.data, o.default.data) : a[s] = o.default[s];
        });
        try {
            a.initSliderSDK({
                requestCode: s,
                success: function(s) {
                    t.tapSeedSmS();
                },
                fail: function(s) {
                    t.smsTip(s.msg);
                },
                style: e.sliderStyle
            });
        } catch (s) {
            t.smsExit({
                text: "滑块验证异常",
                code: 0,
                msg: "短信弹滑块验证异常"
            });
        }
    },
    showWaitModal: function() {
        var s = this, t = 0, e = s.data.smsInfo, o = e.codeButText, a = e.sendSmsDisa, i = o, r = setInterval(function() {
            var e = s.data.smsInfo;
            o = 60 - (t += 1) + "s后请重试", a = !0, 60 === t && (clearInterval(r), o = i, a = !1), 
            e.sendSmsDisa = a, e.codeButText = o, s.setData({
                smsInfo: e
            });
        }, 1e3);
    },
    bindMobileInput: function(s) {
        var t = s.detail.value.trim(), e = this.data.smsInfo;
        e.mobile = t, 11 !== t.length || isNaN(Number(t)) ? (e.sendSmsDisa = !0, e.smsButColor = "#B6B6B6") : (e.sendSmsDisa = !1, 
        e.sendSmsDisa = !1, e.smsButColor = "#666"), this.setData({
            smsInfo: e
        });
    },
    bindSmsCodeInput: function(s) {
        var t = s.detail.value, e = this.data.smsInfo;
        e.smscode = t, t.length > 1 && !0 === e.isSend ? (e.opacity = 1, e.verifyDisa = !1) : (e.opacity = .5, 
        e.verifyDisa = !0), this.setData({
            smsInfo: e
        });
    },
    bindSmsFocusInput: function(s) {
        var t = this.data.smsInfo;
        t.smsFocus = !0, this.setData({
            smsInfo: t
        });
    },
    bindSmsBlurInput: function(s) {
        var t = this.data.smsInfo;
        t.smsFocus = !1, this.setData({
            smsInfo: t
        });
    },
    bindSmsSwitch: function(s) {
        var t = this.data.smsInfo.data;
        wx.navigateTo({
            url: "/modules/list/list?riskLevel=" + t.riskLevel
        }), console.log("... bindSmsSwitch ...");
    },
    onTapPage: function(s) {
        e.rohr.t(s);
    },
    onTouchMovePage: function(s) {
        e.rohr.m(s);
    }
};

exports.default = n;