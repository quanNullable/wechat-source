function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
}, a = e(require("./slider.sdk.js")), s = e(require("./slider.api.js")), o = require("../../utils/config.js"), n = getApp(), r = {
    data: {
        sliderInfo: {}
    },
    initSliderSDK: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = t.requestCode, d = t.success, l = t.fail, u = t.data;
        o.rohr.i(o.rohrConfig.i);
        var c = this;
        if (c.sliderSuccess = d, c.sliderFail = l, "string" == typeof r && s.default.getPageData(r).then(function(t) {
            var i = new a.default({
                requestCode: r,
                pageData: t,
                success: c.sliderVerifySuccess,
                fail: c.sliderVerifyFail
            });
            n.$loginPage = e, c.setData({
                sdk: i,
                sliderInfo: {
                    moveWidth: 0,
                    codeImage: "",
                    requestCode: t.request_code,
                    sliderCode: "",
                    show: !0,
                    validStep: "slider",
                    slideStatusClass: "",
                    animationData: {},
                    pageData: t
                }
            });
        }).catch(function(e) {
            wx.showToast({
                title: "获取数据异常",
                complete: function() {
                    c.sliderVerifyFail({
                        status: 0,
                        code: 0,
                        msg: "请求page_data数据接口异常了"
                    });
                }
            });
        }), "object" === (void 0 === u ? "undefined" : i(u))) {
            var f = {};
            for (var h in u) f[h] = u[h];
            r = u.request_code, f.id = f.type;
            var p = new a.default({
                requestCode: r,
                pageData: f,
                success: c.sliderVerifySuccess,
                fail: c.sliderVerifyFail
            });
            n.$loginPage = this, c.setData({
                sdk: p,
                sliderInfo: {
                    moveWidth: 0,
                    codeImage: "",
                    requestCode: r,
                    sliderCode: "",
                    show: !0,
                    validStep: "slider",
                    slideStatusClass: "",
                    animationData: {},
                    pageData: f
                }
            });
        }
        var m = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease",
            delay: 0
        });
        this.animation = m;
    },
    sliderVerifySuccess: function(e) {
        var t = getApp().$loginPage, i = t.sliderSuccess, a = t.data.sliderInfo;
        a.show = !1, wx.showToast({
            title: "验证成功",
            icon: "none",
            mask: !0,
            duration: 2e3
        }), e ? i({
            status: 1,
            requestCode: a.requestCode,
            responseCode: e.response_code
        }) : i();
    },
    sliderVerifyFail: function(e) {
        var t = getApp().$loginPage, i = t.sliderFail, a = t.data.sliderInfo;
        a.show = !1, t.setData({
            sliderInfo: a
        }), i(e);
    },
    sliderTouchStart: function(e) {
        this.data.sdk.sliderTouchStart(e);
    },
    sliderTouchMove: function(e) {
        var t = this.data, i = t.sdk, a = t.sliderInfo, s = i.sliderTouchMove(e), o = {
            moveWidth: s.deltaX
        };
        s.isDone && (o.slideStatusClass = "slider-boxLoading"), Object.assign(a, o), this.setData({
            sliderInfo: a
        });
    },
    sliderTouchEnd: function(e) {
        var t = this.data, i = t.sdk, a = t.sliderInfo;
        i.isDone ? this.setData({
            slideStatusClass: "slider-boxLoading"
        }) : (Object.assign(a, {
            moveWidth: 0
        }), this.setData({
            sliderInfo: a
        }));
    },
    sliderClose: function() {
        var e = this.data.sliderInfo;
        e.show = !1, this.setData({
            sliderInfo: e
        });
    },
    sliderValideCode: function(e) {
        var t = this, i = this.data, a = i.sliderInfo, o = a.sliderCode, n = a.pageData, r = void 0 === n ? {} : n, d = i.sdk.requestCode;
        s.default.verfiyCode({
            captchacode: o,
            action: r.action,
            id: 1,
            requestCode: d
        }).then(function(e) {
            var i = e.status, a = e.error, s = e.data;
            1 === i ? t.sliderVerifySuccess(s) : (wx.showToast({
                title: a.message,
                icon: "loading",
                duration: 1e3
            }), t.sliderUpdataCaptch());
        }).catch(function(e) {
            wx.showToast({
                title: "图片验证异常",
                icon: "none",
                mask: !0,
                duration: 2e3,
                complete: function() {
                    t.sliderVerifyFail({
                        status: 0,
                        code: 0,
                        msg: "请求图片验证异常了"
                    });
                }
            });
        });
    },
    sliderUpdataCaptch: function() {
        var e = this.data, t = e.sdk.requestCode, i = e.sliderInfo.pageData;
        this.setData({
            "sliderInfo.codeImage": o.baseUrl + "/v2/captcha?request_code=" + t + "&action=" + i.action + "&captchaHash=" + Number(new Date()),
            "sliderInfo.sliderCode": ""
        });
    },
    sliderValideCodeInput: function(e) {
        var t = e.detail.value, i = this.data.sliderInfo;
        i.sliderCode = t, this.setData({
            sliderInfo: i
        });
    },
    bindSliderInputFocus: function(e) {
        var t = this.data.sliderInfo;
        this.animation.top(200).step(), t.animationData = this.animation.export(), this.setData({
            sliderInfo: t
        });
    },
    bingSliderInputBlur: function(e) {
        var t = this.data.sliderInfo;
        this.animation.top(300).step(), t.animationData = this.animation.export(), this.setData({
            sliderInfo: t
        });
    },
    onTapPage: function(e) {
        o.rohr.t(e);
    },
    onTouchMovePage: function(e) {
        o.rohr.m(e);
    }
};

exports.default = r;