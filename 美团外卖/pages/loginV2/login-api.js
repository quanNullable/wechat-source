function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function a(r, i) {
                try {
                    var o = t[r](i), s = o.value;
                } catch (e) {
                    return void n(e);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(s);
            }
            return a("next");
        });
    };
}

var n = e(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../actions/user.js"), r = e(require("./yoda-modules/index/yoda.js")), i = require("./finger.js"), o = require("../../api/index.js"), s = o.accountLoginV2, c = o.appleMobileV2, u = o.bindMobileV2, p = o.ticketLoginV2, d = require("../../api/wx.js"), l = d.login, g = d.getUserInfo, h = require("../../constants.js").KEY_USER_INFO, f = require("../../utils/wx.js").storage, _ = f.setItem, x = f.getItem, v = require("../../weapp-redux/index.js").connect, m = require("../../utils/mix.js"), k = require("./log.js"), b = function(e) {
    var t = e.nickName, n = e.avatarUrl, a = e.gender, r = e.city, i = e.province, o = e.country;
    return _(h, {
        nickName: t,
        avatarUrl: n,
        gender: a,
        city: r,
        province: i,
        country: o
    });
}, w = {
    mobileInput: {},
    codeButton: {
        text: "获取验证码",
        color: "#333"
    },
    verifyButton: {
        text: "验证",
        color: "#333",
        backgroundColor: "#FFD161"
    },
    codeInput: {
        mobilePlac: ""
    },
    imgStyle: {
        verifyButton: {
            text: "验证",
            color: "#FFD161"
        },
        codeInput: {
            borderRadius: "3px",
            borderWidth: "1px",
            borderColor: "#eee"
        }
    }
}, y = m({
    data: {
        pageState: "0",
        hasUserInfo: !(!wx.canIUse || !wx.canIUse("button.open-type.getUserInfo"))
    },
    nextTap: !1,
    firstInput: !0,
    _events: {
        iptPhone_ok: null,
        iptPhone_cancel: null
    },
    config: {
        type: 0,
        afterLoginAction: ""
    },
    params: null,
    openid: "",
    raw_data: "",
    signature: "",
    iv: "",
    encrypted_data: "",
    wechat_fingerprint: "",
    mobile: "",
    iptPhone: function(e) {
        var t = e.ok, n = e.cancel;
        this._events.iptPhone_cancel = n, this._events.iptPhone_ok = t, this.setData({
            iptPhone: {
                show: !0,
                inputValue: "",
                type: "iptPhone",
                isRight: !1,
                error: !1,
                hasValue: !1
            }
        });
    },
    onClearIpt: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                iptPhone: {
                    show: e.data.iptPhone.show,
                    inputValue: "",
                    type: "iptPhone",
                    isRight: !1,
                    error: e.data.iptPhone.error,
                    hasValue: !1
                }
            });
        }, 100);
    },
    onCheckPhoneNumber: function(e) {
        var t = !1, n = e.detail.value, a = new RegExp("(^1(3|4|5|6|7|8|9)[0-9]{9}$)|(^0060[0-9]{9}$)");
        11 === (n = (n = n.replace(/\s/g, "")).substring(0, 11)).length && a.test(n) && (t = !0), 
        n.length > 3 && (n = n.substring(0, 3) + " " + n.substring(3, n.length)), n.length > 8 && (n = n.substring(0, 8) + " " + n.substring(8, n.length));
        var r = this.config.type;
        return this.setData({
            iptPhone: {
                show: 1 === r,
                inputValue: n,
                type: "iptPhone",
                isRight: t,
                error: !1,
                hasValue: n.length > 0
            }
        }), 0 === r && this.firstInput && (this.lxInputClick(), this.firstInput = !1), n;
    },
    onNextCheck: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, r, i, o, s, u, p;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!e.nextTap) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return");

                  case 2:
                    if (a = e.data.iptPhone.inputValue, r = e.data.iptPhone.isRight, i = e.config.type, 
                    e.lxInputNextClick(i, r ? 0 : 1), !r) {
                        t.next = 24;
                        break;
                    }
                    return e.nextTap = !0, e.mobile = a.replace(/\s/g, ""), t.prev = 9, t.next = 12, 
                    c(Object.assign(e._encryptParam()));

                  case 12:
                    o = t.sent, s = o.request_code, e._initYodaSdk(s), t.next = 24;
                    break;

                  case 17:
                    t.prev = 17, t.t0 = t.catch(9), u = t.t0.code, p = t.t0.msg, o = t.t0.data, e.nextTap = !1, 
                    e.alert({
                        message: p
                    });

                  case 24:
                    e.setData({
                        iptPhone: {
                            show: 1 === i && !r,
                            inputValue: e.data.iptPhone.inputValue,
                            type: "iptPhone",
                            isRight: r,
                            error: !r,
                            hasValue: e.data.iptPhone.hasValue
                        }
                    });

                  case 25:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 9, 17 ] ]);
        }))();
    },
    onClickAuth: function() {
        this.lxAuthClick(), this._auth();
    },
    _splitParams: function(e, t) {
        var n = e;
        return t ? (Object.keys(t).forEach(function(e) {
            void 0 !== t[e] && "" !== t[e] && (n += "&" + e + "=" + t[e] + "&");
        }), n.substring(0, n.length - 1)) : n;
    },
    _encryptParam: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this;
        return {
            mobile: e.mobile,
            openid: e.openid,
            raw_data: e.raw_data,
            signature: e.signature,
            iv: e.iv,
            encrypted_data: e.encrypted_data,
            wechat_fingerprint: e.wechat_fingerprint,
            login_scene: e.config.type
        };
    },
    _getCommonParams: function(e) {
        _("login_common_params", e);
    },
    _goToSuccess: function(e) {
        var t = e.userid, n = e.openid, a = e.token;
        this.storeUser({
            user_id: t,
            token: a,
            open_id: n
        }), this._success();
    },
    _success: function() {
        var e = this.config, t = e.type, n = e.afterLoginAction, a = getApp();
        a.afterLoginAction = n, 0 === t ? wx.navigateBack() : this.onShow(), a.eventBus.fire("user:login");
    },
    _login: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, r, o, c, u, p, d, h, f, _;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, l();

                  case 2:
                    return a = t.sent, r = a.code, t.next = 6, g();

                  case 6:
                    return o = t.sent, c = o.rawData, u = o.signature, p = o.encryptedData, d = o.iv, 
                    h = o.userInfo, t.next = 14, b(h);

                  case 14:
                    return e.raw_data = c, e.signature = u, e.iv = d, e.encrypted_data = p, e.wechat_fingerprint || i.g(function(t) {
                        e.wechat_fingerprint = t;
                    }), t.next = 21, s(Object.assign(e._encryptParam(), {
                        code: r
                    }));

                  case 21:
                    return f = t.sent, _ = f.login_data, t.abrupt("return", _);

                  case 24:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    _auth: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, r, i, o, s, c, u, p, d, l, g;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, e._login();

                  case 3:
                    a = t.sent, r = a.userid, i = a.openid, o = a.token, e._goToSuccess({
                        userid: r,
                        openid: i,
                        token: o
                    }), t.next = 22;
                    break;

                  case 10:
                    if (t.prev = 10, t.t0 = t.catch(0), s = t.t0.code, c = t.t0.message, (u = t.t0.data) && (p = u.login_data, 
                    d = p.openid, e.openid = d), l = c && -1 !== c.indexOf("getUserInfo") && -1 !== c.indexOf("auth"), 
                    g = e.config.type, wx.canIUse && wx.canIUse("button.open-type.getUserInfo") || !(c.indexOf("unauthorized") > -1)) {
                        t.next = 21;
                        break;
                    }
                    return wx.showModal({
                        title: "提示",
                        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && 0 === g && wx.navigateBack();
                        }
                    }), t.abrupt("return");

                  case 21:
                    l ? console.log(c) : 101155 === s ? 1 === g ? (e.lxInputModalView(g), e.nextTap = !1, 
                    e.iptPhone({
                        ok: function() {
                            e.onNextCheck();
                        },
                        cancel: function() {
                            e.lxInputCancelClick();
                        }
                    })) : (e.lxInputModalView(g), e.setData({
                        pageState: "2"
                    })) : 101172 === s ? (e.storeUser({
                        token: ""
                    }), e.confirm({
                        message: "啊哦, 出错了, 请再试一下",
                        textCancel: "稍后再说",
                        textOK: "重新授权",
                        ok: function() {
                            e._auth();
                        }
                    })) : -1 === s || void 0 === s ? e.confirm({
                        message: "啊哦, 出错了, 请再试一下",
                        textCancel: "稍后再说",
                        textOK: "重新授权",
                        ok: function() {
                            e._auth();
                        }
                    }) : e.alert({
                        message: c
                    });

                  case 22:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 10 ] ]);
        }))();
    },
    _initYodaSdk: function(e) {
        this._getCommonParams(this._encryptParam()), (0, r.default)({
            requestCode: e,
            style: w,
            success: "back",
            fail: "back",
            options: {
                navigate: "back"
            }
        });
    },
    bindMobileLogin: function(e) {
        var a = this, r = e.request_code, i = e.response_code;
        return t(n.default.mark(function e() {
            var t, o, s, c, p, d, l, g, h, f, _;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t = {}, e.prev = 1, e.next = 4, x("login_common_params");

                  case 4:
                    o = e.sent, t = o.data, e.next = 12;
                    break;

                  case 8:
                    e.prev = 8, e.t0 = e.catch(1), s = e.t0.message, console.log(s);

                  case 12:
                    return e.prev = 12, e.next = 15, u(Object.assign(t, {
                        request_code: r,
                        response_code: i
                    }));

                  case 15:
                    c = e.sent, p = c.login_data, d = p.userid, l = p.token, a._goToSuccess({
                        userid: d,
                        openid: a.openid,
                        token: l
                    }), e.next = 27;
                    break;

                  case 21:
                    e.prev = 21, e.t1 = e.catch(12), g = e.t1.code, s = e.t1.msg, o = e.t1.data, 101188 === g ? (h = o.multi_bound_account_datas, 
                    f = h.ticket, _ = h.userid, a.ticketLogin({
                        userid: _,
                        ticket: f
                    })) : a.alert({
                        message: s
                    });

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 1, 8 ], [ 12, 21 ] ]);
        }))();
    },
    ticketLogin: function(e) {
        var a = this, r = e.userid, i = e.ticket;
        return t(n.default.mark(function e() {
            var t, o, s, c, u, d;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, e.next = 3, p({
                        userid: r,
                        ticket: i
                    });

                  case 3:
                    t = e.sent, o = t.login_data, s = o.userid, c = o.token, a._goToSuccess({
                        userid: s,
                        openid: a.openid,
                        token: c
                    }), e.next = 15;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e.catch(0), u = e.t0.code, d = e.t0.msg, t = e.t0.data, a.alert({
                        message: d
                    });

                  case 15:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 9 ] ]);
        }))();
    },
    getLoginStatus: function(e) {
        var t = e.status, n = e.requestCode, a = e.responseCode, r = e.code;
        "1" === t ? this.bindMobileLogin({
            request_code: n,
            response_code: a
        }) : "0" === t && ("121044" === r ? this.alert({
            message: "验证码已过期，请重新登录",
            ok: function() {}
        }) : this.alert({
            message: "您的帐号暂时无法登录",
            ok: function() {}
        }));
    },
    initLoginSDK: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.config = Object.assign(this.config, t), i.g(function(t) {
            e.wechat_fingerprint = t;
        });
        var n = this.data.hasUserInfo;
        wx.getSetting && 0 === this.config.type ? wx.getSetting({
            success: function(t) {
                t.authSetting && t.authSetting["scope.userInfo"] || !n ? e._auth() : e.setData({
                    pageState: 1
                });
            },
            fail: function() {
                n && e.setData({
                    pageState: 1
                }), e._auth();
            }
        }) : this._auth();
    }
}, v(null, function(e) {
    return {
        storeUser: function(t) {
            e((0, a.store)(t));
        }
    };
}), k);

module.exports = function(e) {
    return Object.keys(y).forEach(function(t) {
        "data" === t ? Object.assign(e.data, y.data) : "onLoad" === t || "pageName" === t || (e[t] = y[t]);
    }), e;
};