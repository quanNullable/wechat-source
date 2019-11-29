function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = e(require("../../utils/api.js")), t = require("../../utils/config.js"), i = e(require("../../slidervalid/script/slider.plugin.js")), c = new o.default(), a = (getApp(), 
{
    data: {
        voiceInfo: {}
    },
    initVoiceSDK: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = e.data, i = e.success, c = e.fail, a = e.style, r = void 0 === a ? null : a;
        t.rohr.i(t.rohrConfig.i), this.callBackSuccess = i, this.callBackFail = c;
        var s = void 0, n = void 0, l = void 0, d = void 0, u = void 0, v = void 0;
        r && Object.keys(r).length > 0 && (s = r.mobileInput, n = r.codeInput, l = r.codeButton, 
        d = r.verifyButton, u = r.imgStyle, v = r.sliderStyle), s || (s = {}), s.mobilePlac = s.mobilePlac || "仅支持中国大陆手机号", 
        s.caretColor = s.caretColor || "currentColor", n || (n = {}), n.mobilePlac = n.mobilePlac || "请输入语音验证码", 
        n.caretColor = n.caretColor || "currentColor", l || (l = {}), l.codeButText = l.text || "获取验证码", 
        l.borderRadius = l.borderRadius || "6rpx", l.borderWidth = l.borderWidth || "2rpx", 
        l.borderColor = l.borderColor || "#CCC", l.border = l.borderWidth + " solid " + l.borderColor, 
        l.color = l.color || "#333", l.backgroundColor = l.backgroundColor || "#F7F7F7", 
        d || (d = {}), d.verifyButText = d.text || "验证", d.borderRadius = d.borderRadius || "6rpx", 
        d.borderWidth = d.borderWidth || "0rpx", d.borderColor = d.borderColor || "#06c1ae", 
        d.border = d.borderWidth + " solid " + d.borderColor, d.color = d.color || "#333", 
        d.backgroundColor = d.backgroundColor || "#06c1ae";
        var f = o.riskLevel.split("|");
        this.setData({
            voiceInfo: {
                data: o,
                isMobile: !!o.mobile,
                isSend: !1,
                show: !0,
                voiceFocus: !1,
                imgStyle: u,
                sliderStyle: v,
                mobileLable: "手机号",
                verifyCodeLable: "验证码",
                voicecode: "",
                voiceButColor: o.mobile ? "#666666" : "#B6B6B6",
                mobileInput: s,
                codeInput: n,
                codeButton: l,
                verifyButton: d,
                opacity: .5,
                sendVoiceDisa: !o.mobile,
                verifyDisa: !0,
                switchText: f.length > 1
            }
        });
    },
    tapSeedVoice: function(e) {
        var o = this, t = this.data, i = t.voiceInfo, a = t.voiceInfo, r = a.isMobile, s = a.mobile, n = a.data, l = n.action, d = n.request_code, u = n.type;
        n.riskLevel, r && (s = ""), wx.showModal({
            title: "提示",
            content: "您现在方便接电话么",
            cancelText: "不方便",
            cancelColor: "#333",
            confirmText: "方便",
            confirmColor: "#000",
            success: function(e) {
                e.confirm && c.sendInfo({
                    request_code: d,
                    type: u,
                    action: l,
                    options: {
                        mobile: s,
                        moduleEnable: !0
                    }
                }).then(function(e) {
                    var t = e.status, c = (e.data, e.error);
                    1 === t ? (o.showWaitModal(), i.isSend = !0, i.voiceFocus = !0) : o.handleError(c), 
                    o.setData({
                        voiceInfo: i
                    });
                }).catch(function(e) {
                    o.voiceExit({
                        text: "打电话异常了",
                        code: 0,
                        msg: "请求打电话异常"
                    });
                }), e.cancel;
            }
        });
    },
    bindVerify: function(e) {
        var o = this, t = this.data.voiceInfo, i = t.isMobile, a = t.voicecode, r = t.mobile, s = t.data, n = s.action, l = s.request_code, d = s.type, u = (s.riskLevel, 
        s.options);
        i && (r = ""), c.verify({
            request_code: l,
            type: d,
            action: n,
            options: {
                voicecode: a,
                mobile: r
            }
        }).then(function(e) {
            var t = e.status, i = e.data, c = e.error;
            if (1 === t) {
                var a = i.response_code;
                if ("string" == typeof o.callBackSuccess) {
                    var r = "status=1&requestCode=" + l + "&responseCode=" + a;
                    r = o.callBackSuccess.indexOf("?") > 0 ? "&" + r : "?" + r, o.navigate({
                        options: u,
                        url: o.callBackSuccess + r
                    });
                }
                "funtion" == typeof o.callBackSuccess && o.callBackSuccess({
                    status: 1,
                    requestCode: l,
                    responseCode: a
                });
            } else o.handleError(c);
        }).catch(function(e) {
            o.voiceExit({
                text: "验证异常了",
                code: 0,
                msg: "请求验证异常"
            });
        });
    },
    handleError: function(e) {
        var o = this, i = (this.data.voiceInfo, e.code || 0), c = e.message || "网络错误";
        for (var a in t.closeStatus) t.closeStatus.hasOwnProperty(a) && Number(t.closeStatus[a]) === i && (i = "jump");
        switch (i) {
          case 121048:
            o.showImgModal(e.request_code);
            break;

          case 121060:
            o.showSliderModal(e.request_code);
            break;

          case 121047:
            o.voiceTip("验证次数过多");
            break;

          case 121008:
            o.voiceTip("验证码错误");
            break;

          case "jump":
            o.voiceExit({
                text: "请24小时后重试",
                code: e.code,
                msg: c
            });
            break;

          default:
            o.voiceExit({
                text: "发生异常了",
                code: i,
                msg: c
            });
        }
    },
    voiceTip: function(e) {
        var o = this, t = this.data.voiceInfo;
        wx.showToast({
            title: e,
            icon: "none",
            mask: !0,
            duration: 2e3,
            complete: function() {
                t.voicecode = "", t.opacity = .5, t.verifyDisa = !0, o.setData({
                    voiceInfo: t
                });
            }
        });
    },
    voiceExit: function(e) {
        var o = e.text, t = e.code, i = e.msg, c = this, a = this.data.voiceInfo.data.options;
        wx.showToast({
            title: o,
            icon: "none",
            mask: !0,
            duration: 2e3,
            complete: function() {
                if ("string" == typeof c.callBackFail) {
                    var e = "status=0&code=" + t + "&msg=" + i;
                    e = c.callBackFail.indexOf("?") > 0 ? "&" + e : "?" + e, c.navigate({
                        options: a,
                        url: c.callBackFail + e
                    });
                }
                "function" === c.callBackFail && c.callBackFail({
                    status: 0,
                    code: t,
                    msg: i
                });
            }
        });
    },
    showImgModal: function(e) {},
    showSliderModal: function(e) {
        var o = this;
        Object.keys(i.default).forEach(function(e) {
            "data" === e ? Object.assign(o.data, i.default.data) : o[e] = i.default[e];
        });
        try {
            o.initSliderSDK({
                requestCode: e,
                success: function(e) {
                    o.tapSeedVoice();
                },
                fail: function() {
                    throw new Error("滑块验证失败");
                }
            });
        } catch (e) {
            o.voiceExit({
                text: "滑块验证失败",
                code: 0,
                msg: "语音弹滑块验证失败"
            });
        }
    },
    showWaitModal: function() {
        var e = this, o = 0, t = e.data.voiceInfo, i = t.codeButton, c = t.sendVoiceDisa, a = i.codeButText, r = setInterval(function() {
            var t = e.data.voiceInfo;
            o += 1, i.codeButText = 60 - o + "s后请重试", c = !0, 60 === o && (clearInterval(r), 
            i.codeButText = a, c = !1), console.log("voicecode" + t.voicecode), t.sendVoiceDisa = c, 
            t.codeButton = i, e.setData({
                voiceInfo: t
            });
        }, 1e3);
    },
    bindMobileInput: function(e) {
        var o = e.detail.value, t = this.data.voiceInfo;
        t.mobile = o, 11 === o.length ? (t.sendVoiceDisa = !1, t.voiceButColor = "#666") : (t.sendVoiceDisa = !0, 
        t.voiceButColor = "#B6B6B6"), this.setData({
            voiceInfo: t
        });
    },
    bindVoiceCodeInput: function(e) {
        var o = e.detail.value, t = this.data.voiceInfo;
        t.voicecode = o, o.length > 1 && !0 === t.isSend ? (t.opacity = 1, t.verifyDisa = !1) : (t.opacity = .5, 
        t.verifyDisa = !0), this.setData({
            voiceInfo: t
        });
    },
    onTapPage: function(e) {
        t.rohr.t(e);
    },
    onTouchMovePage: function(e) {
        t.rohr.m(e);
    }
});

exports.default = a;