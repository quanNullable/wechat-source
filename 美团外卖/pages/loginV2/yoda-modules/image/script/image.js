var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(a) {
    return void 0 === a ? "undefined" : t(a);
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : void 0 === a ? "undefined" : t(a);
}, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/api.js")), o = require("../../utils/config.js"), i = new e.default(), r = {
    data: {
        imageInfo: {}
    },
    initImageSDK: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.requestCode, r = t.success, n = t.fail, s = t.style, c = void 0 === s ? null : s, d = t.data;
        o.rohr.i(o.rohrConfig.i);
        var u = this;
        u.callBackSuccess = r, u.callBackFail = n;
        var l = void 0, m = void 0;
        if (c && (l = c.codeInput, m = c.verifyButton), l || (l = {}), m || (m = {}), "string" == typeof e && i.getPageData(e, "image").then(function(t) {
            var a = t.status, i = t.data;
            t.error, 0 === a && wx.showToast({
                title: "请求异常",
                complete: n()
            }), u.setData({
                imageInfo: {
                    data: i,
                    show: !0,
                    imgsrc: o.baseUrl + "/v2/captcha?request_code=" + e + "&action=" + i.action + "&captchaHash=" + Number(new Date()),
                    captchacode: "",
                    title: "请输入图片中的内容",
                    inBorderRadius: l.borderRadius || "3px",
                    inBorderWidth: l.borderWidth || "1px",
                    inBorderColor: l.borderColor || "#ccc",
                    inCaretColor: l.caretColor || "auto",
                    btnBorderRadius: m.borderRadius || "0",
                    btnBorderWidth: m.borderWidth || "0",
                    btnBorderColor: m.borderColor || "transparent",
                    btnColor: m.color || "#06c1ae",
                    btnText: m.text || "验证",
                    btnBgColor: m.backgroundColor || "transparent",
                    opacity: .5,
                    animationData: {},
                    plain: !0,
                    verifyDisa: !0
                }
            });
        }).catch(function(t) {
            that.imageExit({
                text: "获取数据异常",
                code: 0,
                msg: "请求page_data数据接口异常了"
            });
        }), "object" === (void 0 === d ? "undefined" : a(d))) {
            for (var f in e) d[f] = e[f];
            u.setData({
                imageInfo: {
                    data: d,
                    show: !0,
                    imgsrc: o.baseUrl + "/v2/captcha?request_code=" + e + "&action=" + d.action + "&captchaHash=" + Number(new Date()),
                    captchacode: "",
                    title: "请输入图片中的内容",
                    inBorderRadius: l.borderRadius || "3px",
                    inBorderWidth: l.borderWidth || "1px",
                    inBorderColor: l.borderColor || "#ccc",
                    inCaretColor: l.caretColor || "auto",
                    btnBorderRadius: m.borderRadius || "0",
                    btnBorderWidth: m.borderWidth || "0",
                    btnBorderColor: m.borderColor || "transparent",
                    btnColor: m.color || "#06c1ae",
                    btnText: m.text || "验证",
                    btnBgColor: m.backgroundColor || "transparent",
                    opacity: .5,
                    animationData: {},
                    plain: !0,
                    verifyDisa: !0
                }
            });
        }
        var h = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease",
            delay: 0
        });
        this.animation = h;
    },
    bindImgVerify: function(t) {
        var a = this, e = this.data, o = e.imageInfo, r = e.imageInfo, n = r.captchacode, s = r.data, c = s.action, d = s.request_code, u = s.type;
        s.riskLevel, i.verify({
            request_code: d,
            type: u,
            action: c,
            options: {
                captchacode: n
            }
        }).then(function(t) {
            var e = t.status, i = t.data, r = t.error;
            if (1 === e) if (o.show = !1, a.setData({
                imageInfo: o
            }), i) {
                var n = i.response_code;
                a.callBackSuccess({
                    status: 1,
                    requestCode: d,
                    responseCode: n
                });
            } else a.callBackSuccess(); else a.handleImgError(r);
        }).catch(function(t) {
            a.imageExit({
                text: "验证异常",
                code: 0,
                msg: "请求验证异常了"
            });
        });
    },
    handleImgError: function(t) {
        var a = t.code || 0, e = t.message || "网络错误";
        for (var i in o.closeStatus) o.closeStatus.hasOwnProperty(i) && Number(o.closeStatus[i]) === a && (a = "jump");
        var r = this.data.imageInfo;
        switch (a) {
          case 121020:
            wx.showToast({
                title: "验证码错误",
                icon: "loading",
                complete: this.bingUpdateImg()
            }), r.captchacode = "", r.verifyDisa = !0, this.setData({
                imageInfo: r
            });
            break;

          case "jump":
            that.imageExit({
                text: "请24小时后重试",
                code: t.code,
                msg: e
            });
            break;

          default:
            that.imageExit({
                text: "发生异常了",
                code: a,
                msg: e
            });
        }
    },
    imageExit: function(t) {
        var a = t.text, e = t.code, o = t.msg, i = this;
        wx.showToast({
            title: a,
            complete: function() {
                i.callBackFail({
                    status: 0,
                    code: e,
                    msg: o
                });
            }
        });
    },
    bingUpdateImg: function(t) {
        var a = this.data, e = a.imageInfo, i = a.imageInfo.data;
        e.imgsrc = o.baseUrl + "/v2/captcha?request_code=" + i.request_code + "&action=" + i.action + "&captchaHash=" + Number(new Date()), 
        this.setData({
            imageInfo: e
        });
    },
    bindImgCodeInput: function(t) {
        var a = t.detail.value, e = this.data.imageInfo;
        e.captchacode = a, a && a.length > 0 ? (e.opacity = 1, e.verifyDisa = !1) : (e.opacity = .5, 
        e.verifyDisa = !0), this.setData({
            imageInfo: e
        });
    },
    bindImgInputFocus: function(t) {
        var a = this.data.imageInfo;
        this.animation.top(200).step(), a.animationData = this.animation.export(), this.setData({
            imageInfo: a
        });
    },
    bingImgInputBlur: function(t) {
        var a = this.data.imageInfo;
        this.animation.top(300).step(), a.animationData = this.animation.export(), this.setData({
            imageInfo: a
        });
    },
    bingimgClose: function(t) {
        var a = this.data.imageInfo;
        a.show = !1, this.setData({
            imageInfo: a
        });
    }
};

exports.default = r;