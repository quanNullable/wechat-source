function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new o(function(e, a) {
            function n(r, s) {
                try {
                    var c = t[r](s), i = c.value;
                } catch (e) {
                    return void a(e);
                }
                if (!c.done) return o.resolve(i).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(i);
            }
            return n("next");
        });
    };
}

var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../actions/user.js"), o = require("../../npm/promise-polyfill/promise.js"), s = require("../../constants.js").KEY_USER_INFO, c = require("../../api/wx.js"), i = c.login, u = c.getUserInfo, d = require("../../api/index.js"), p = d.accountLogin, f = d.verifyCodeSend, h = d.verifyCodeCheck, l = d.getCaptchaUrl, g = require("../../utils/wx.js").storage.setItem, m = require("../base.js"), v = require("../../weapp-redux/index.js").connect, C = function(e) {
    var t = e.nickName, a = e.avatarUrl, n = e.gender, r = e.city, o = e.province, c = e.country;
    return g(s, {
        nickName: t,
        avatarUrl: a,
        gender: n,
        city: r,
        province: o,
        country: c
    });
}, w = m({
    pageName: "login",
    data: {
        focusedInput: "phone",
        inputCodeVal: "",
        inputPhoneNumberVal: "",
        inputCaptchaVal: "",
        inputCode: "",
        inputPhoneNumber: "",
        seconds: 60,
        countdown: !1,
        hasClickCodeBtn: !1,
        inputCaptcha: "",
        captchaUrl: "",
        modalCaptchaShow: !1,
        modalCaptchaUrl: "",
        modalCaptchaLoading: !1,
        pageState: "auth",
        userInfo: {}
    },
    redirectTo: "",
    open_id: "",
    rawData: "",
    signature: "",
    encryptData: "",
    encryptedData: "",
    iv: "",
    afterLoginAction: "",
    success: function() {
        var e = this.redirectTo;
        if (e) wx.redirectTo({
            url: e
        }); else {
            var t = getApp();
            t.afterLoginAction = this.afterLoginAction, wx.navigateBack(), t.eventBus.fire("user:login");
        }
    },
    onClickAuth: function(e) {
        var t = e.currentTarget.dataset.action;
        "return" === t ? this.success() : "reject" === t ? (getApp().afterLoginAction = "", 
        wx.navigateBack()) : this.auth();
    },
    auth: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, r, o, s, c, i, u, d, p, f;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.loading(!0), t.prev = 1, t.next = 4, e.login();

                  case 4:
                    n = t.sent, r = n.userId, o = n.openId, s = n.token, e.storeUser({
                        user_id: r,
                        token: s,
                        open_id: o
                    }), e.success(), t.next = 19;
                    break;

                  case 12:
                    t.prev = 12, t.t0 = t.catch(1), c = t.t0.code, i = t.t0.message, u = t.t0.data, 
                    (d = i && -1 !== i.indexOf("getUserInfo") && -1 !== i.indexOf("auth")) ? (p = wx, 
                    (f = p.openSetting) ? e.confirm({
                        message: "检测到您没打开美团外卖的用户信息权限，是否去设置打开？",
                        ok: function() {
                            f({
                                success: function(t) {
                                    t.authSetting["scope.userInfo"] && e.auth();
                                }
                            });
                        }
                    }) : e.alert({
                        message: "检测到您没打开美团外卖的用户信息权限，请到设置启用：点击右上角按钮，进入小程序介绍页，再次点击右上角按钮，进入设置页面，打开用户信息权限"
                    })) : 101155 === c ? e.confirm({
                        message: i,
                        textOK: "绑定手机",
                        ok: function() {
                            var t = u.userInfo;
                            e.setData({
                                pageState: "bind",
                                userInfo: t
                            });
                        }
                    }) : 101172 === c ? (e.storeUser({
                        token: ""
                    }), e.confirm({
                        message: "啊哦, 出错了, 请再试一下",
                        textCancel: "稍后再说",
                        textOK: "重新授权",
                        ok: function() {
                            e.auth();
                        }
                    })) : -1 === c || void 0 === c ? e.confirm({
                        message: "啊哦, 出错了, 请再试一下",
                        textCancel: "稍后再说",
                        textOK: "重新授权",
                        ok: function() {
                            e.auth();
                        }
                    }) : e.alert({
                        message: i
                    });

                  case 19:
                    e.loading(!1);

                  case 20:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 1, 12 ] ]);
        }))();
    },
    canSendCode: function() {
        var e = this.data, t = e.countdown;
        return 11 === e.inputPhoneNumber.length && !t;
    },
    encryptParam: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this, a = t.encryptData, n = t.encryptedData, r = t.iv;
        return n && r ? (e.encryptedData = n, e.iv = r) : e.encryptData = a, e;
    },
    login: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, r, o, s, c, d, f, h, l, g, m, v, w;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, i();

                  case 2:
                    return n = t.sent, r = n.code, t.next = 6, u();

                  case 6:
                    return o = t.sent, s = o.rawData, c = o.signature, d = o.encryptData, f = o.encryptedData, 
                    h = o.iv, l = o.userInfo, t.next = 15, C(l);

                  case 15:
                    return t.next = 17, p(e.encryptParam({
                        wxCode: r,
                        rawData: s,
                        signature: c
                    }, {
                        encryptData: d,
                        encryptedData: f,
                        iv: h
                    }));

                  case 17:
                    if (g = t.sent, m = g.openId, v = g.code, w = g.message, e.open_id = m, e.rawData = s, 
                    e.signature = c, e.encryptData = d, e.encryptedData = f, e.iv = h, g.userInfo = l, 
                    0 === v) {
                        t.next = 28;
                        break;
                    }
                    throw {
                        code: v,
                        message: w,
                        msg: w,
                        data: g
                    };

                  case 28:
                    return t.abrupt("return", g);

                  case 29:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    sendCode: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, r, o, s, c, i, u;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (n = e.open_id) {
                        t.next = 4;
                        break;
                    }
                    return t.next = 4, e.login();

                  case 4:
                    return r = e.open_id, o = e.rawData, s = e.signature, c = e.data, i = c.inputPhoneNumber, 
                    u = c.inputCaptcha, t.abrupt("return", f(e.encryptParam({
                        phone: i,
                        openId: r,
                        rawData: o,
                        signature: s,
                        captcha: u
                    })));

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onClickGetCodeBtn: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, r, o, s;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (e.canSendCode()) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return");

                  case 2:
                    return e.loading(!0), e.setData({
                        countdown: !0
                    }), t.prev = 4, t.next = 7, e.sendCode();

                  case 7:
                    n = t.sent, r = n.code, o = n.message, s = !1, 0 === r ? (e.toast({
                        message: "已发送验证码"
                    }), s = !0) : 101089 === r ? (e.toast({
                        message: o
                    }), s = !0) : 101091 === r || 101092 === r ? e.showCaptchaModal() : e.toast({
                        message: o
                    }), s ? e.startCountdown() : e.setData({
                        countdown: !1
                    }), t.next = 20;
                    break;

                  case 15:
                    t.prev = 15, t.t0 = t.catch(4), o = t.t0.message, e.setData({
                        countdown: !1
                    }), e.toast({
                        message: o
                    });

                  case 20:
                    e.loading(!1);

                  case 21:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 4, 15 ] ]);
        }))();
    },
    onClickCatpchaSubmit: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, r, o, s;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.loading(!0), t.prev = 1, t.next = 4, e.sendCode();

                  case 4:
                    n = t.sent, r = n.code, o = n.message, s = !1, 0 === r ? (e.toast({
                        message: "已发送验证码"
                    }), s = !0) : 101089 === r ? (e.toast({
                        message: o
                    }), s = !0) : 101091 === r || 101092 === r ? (e.toast({
                        message: o
                    }), e.showCaptchaModal()) : e.toast({
                        message: o
                    }), s ? (e.startCountdown(), e.closeCaptchaModal()) : e.setData({
                        countdown: !1
                    }), t.next = 17;
                    break;

                  case 12:
                    t.prev = 12, t.t0 = t.catch(1), o = t.t0.message, e.setData({
                        countdown: !1
                    }), e.toast({
                        message: o
                    });

                  case 17:
                    e.loading(!1);

                  case 18:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 1, 12 ] ]);
        }))();
    },
    startCountdown: function() {
        var e = this;
        setTimeout(function t() {
            var a = e.data.seconds;
            a <= 0 ? e.setData({
                countdown: !1
            }) : (e.setData({
                seconds: a - 1
            }), setTimeout(t, 1e3));
        }, 1e3), this.setData({
            hasClickCodeBtn: !0,
            countdown: !0,
            seconds: 60,
            focusedInput: "code"
        });
    },
    onClickLogin: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, r, o, s, c, i, u, d;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.loading(!0), t.prev = 1, n = e.open_id, r = e.rawData, o = e.signature, 
                    t.next = 5, h(e.encryptParam({
                        phone: e.data.inputPhoneNumber,
                        rawData: r,
                        signature: o,
                        openId: n,
                        code: e.data.inputCode
                    }));

                  case 5:
                    s = t.sent, c = s.code, i = s.message, u = s.userId, d = s.token, 0 === c ? (e.storeUser({
                        user_id: u,
                        token: d,
                        open_id: n
                    }), e.success()) : e.toast({
                        message: i
                    }), t.next = 16;
                    break;

                  case 13:
                    t.prev = 13, t.t0 = t.catch(1), e.alert({
                        message: t.t0.message
                    });

                  case 16:
                    e.loading(!1);

                  case 17:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 1, 13 ] ]);
        }))();
    },
    onInput: function(t) {
        var a = t.detail.value, n = t.currentTarget.dataset.key;
        this.setData(e({}, n, a));
    },
    onClickClearInput: function(t) {
        var a, n = t.currentTarget.dataset.key, r = n + "Val";
        this.setData(e({}, r, " ")), this.setData((a = {}, e(a, n, ""), e(a, r, ""), a));
    },
    onClickModalCaptchaClose: function() {
        this.setData({
            modalCaptchaShow: !1
        });
    },
    onClickCaptchaImage: function() {
        this.setData({
            modalCaptchaUrl: l(),
            inputCaptcha: ""
        });
    },
    closeCaptchaModal: function() {
        this.setData({
            modalCaptchaShow: !1,
            modalCaptchaLoading: !1,
            modalCaptchaUrl: "",
            modalCaptchaMessage: "",
            inputCaptcha: ""
        });
    },
    showCaptchaModal: function() {
        this.setData({
            modalCaptchaShow: !0,
            modalCaptchaLoading: !1,
            modalCaptchaUrl: l(),
            inputCaptcha: "",
            focusedInput: "captcha"
        });
    },
    onLoad: function(e) {
        var t = e.redirectTo, a = e.afterLoginAction, n = void 0 === a ? "" : a;
        this.afterLoginAction = n, this.redirectTo = t, this.loading(!1);
    }
});

(0, n.page)(v(null, function(e) {
    return {
        storeUser: function(t) {
            e((0, r.store)(t));
        }
    };
})(w));