function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new i(function(e, n) {
            function r(o, a) {
                try {
                    var s = t[o](a), c = s.value;
                } catch (e) {
                    return void n(e);
                }
                if (!s.done) return i.resolve(c).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(c);
            }
            return r("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../api/index.js"), o = r.previewRiskCheckResendCode, a = r.orderValidate, i = require("../../npm/promise-polyfill/promise.js"), s = require("../../utils/mix.js"), c = require("../base.js"), u = require("../../weapp-redux/index.js").connect, d = {
    data: {
        verifyPhoneCode: "",
        verifyPhoneSeconds: 60,
        verifyPhoneCallSeconds: 0,
        verifyPhoneContactShow: !1,
        verifyPhoneInputFocus: !1,
        verifyPhoneData: {
            bind_phone: "",
            customer_service_time: "",
            wm_verify_user_type: 3,
            feedback_call: "",
            contact_phone_verifycode_switch_for_order: 1,
            contact_phone_verifycode: "",
            order_token: ""
        }
    },
    verifyTo: null,
    verityPhoneClean: function() {
        this.clearTimeout(this.verifyTo);
    },
    onClickVerifyPhoneClear: function() {
        this.setData({
            verifyPhoneCode: "",
            verifyPhoneInputFocus: !0
        });
    },
    onInputVerifyPhoneCode: function(e) {
        var t = e.detail.value;
        this.setData({
            verifyPhoneCode: t
        });
    },
    onClickVerifyPhoneSend: function(e) {
        var t = e.currentTarget.dataset.sendtype;
        this.verifyPhoneSend(parseInt(t, 10) || 1);
    },
    verifyPhoneSend: function(n) {
        var r = this;
        return e(t.default.mark(function e() {
            var a, i, s, c, u, d, h, f;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r.loading(!0), e.prev = 1, a = r.data.verifyPhoneData, i = a.bind_phone, 
                    s = a.wm_verify_user_type, c = n || s, u = 2 === c ? 2 : 1, d = r.store.getState(), 
                    h = d.purchase.token, e.next = 8, o({
                        phone: i,
                        order_token: h,
                        wm_verify_user_type: s,
                        send_code_type: u
                    });

                  case 8:
                    r.startCountdown(), r.setData({
                        verifyPhoneInputFocus: !0
                    }), e.next = 16;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(1), f = e.t0.message, r.alert({
                        message: f
                    });

                  case 16:
                    r.loading(!1);

                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 1, 12 ] ]);
        }))();
    },
    onClickVerifyPhoneCheck: function() {
        var n = this;
        return e(t.default.mark(function e() {
            var r, o, i, s, c, u;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n.loading(!0), e.prev = 1, r = n.data, o = r.verifyPhoneData.bind_phone, 
                    i = r.verifyPhoneCode, s = n.store.getState(), c = s.purchase.token, e.next = 6, 
                    a({
                        phone: o,
                        token: c,
                        verify_code: i
                    });

                  case 6:
                    getApp().orderValidated = !0, wx.navigateBack(), e.next = 15;
                    break;

                  case 10:
                    e.prev = 10, e.t0 = e.catch(1), u = e.t0.message, n.alert({
                        message: u
                    }), n.loading(!1);

                  case 15:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 1, 10 ] ]);
        }))();
    },
    onClickVerifyPhoneContact: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.verifyPhoneData.contact_phone_verifycode
        });
    },
    onClickVerifyPhoneCall: function(n) {
        var r = this, a = n.currentTarget.dataset.sendtype;
        return e(t.default.mark(function e() {
            var n, i, s, c, u, d, h;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r.setData({
                        verifyPhoneInputFocus: !0,
                        verifyPhoneContactShow: !0
                    }), n = parseInt(a, 10) || 2, r.loading(!0), e.prev = 3, i = r.data.verifyPhoneData, 
                    s = i.bind_phone, c = i.wm_verify_user_type, u = r.store.getState(), d = u.purchase.token, 
                    e.next = 8, o({
                        phone: s,
                        order_token: d,
                        wm_verify_user_type: c,
                        send_code_type: n
                    });

                  case 8:
                    r.startCountdownCall(), e.next = 15;
                    break;

                  case 11:
                    e.prev = 11, e.t0 = e.catch(3), h = e.t0.message, r.alert({
                        message: h
                    });

                  case 15:
                    r.loading(!1);

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 3, 11 ] ]);
        }))();
    },
    countdownFn: null,
    countdownFnAlt: null,
    timerStarted: !1,
    timerStart: function() {
        var e = this;
        this.timerStarted || (this.timerStarted = !0, this.verifyTo = this.setTimeout(function t() {
            var n = e.countdownFn, r = e.countdownFnAlt;
            n && n.call(e), r && r.call(e), n || r ? e.verifyTo = e.setTimeout(t, 1e3) : e.timerStarted = !1;
        }, 1e3));
    },
    startCountdown: function() {
        var e = this, t = 60;
        this.countdownFn = function() {
            t -= 1, e.setData({
                verifyPhoneSeconds: t
            }), t < 1 && (e.countdownFn = null);
        };
        var n = {
            verifyPhoneInputFocus: !0
        };
        this.data.verifyPhoneSeconds !== t && (n.verifyPhoneSeconds = t), this.setData(n), 
        this.timerStart();
    },
    startCountdownCall: function() {
        var e = this, t = 60;
        this.countdownFnAlt = function() {
            t -= 1, e.setData({
                verifyPhoneCallSeconds: t
            }), t < 1 && (e.countdownFnAlt = null);
        };
        var n = {
            verifyPhoneInputFocus: !0
        };
        this.data.verifyPhoneCallSeconds !== t && (n.verifyPhoneCallSeconds = t), this.setData(n), 
        this.timerStart();
    },
    onLoad: function() {
        var e = getApp();
        e.orderValidated = !1;
        var t = e.verifyPhoneData;
        t ? (this.verityPhoneClean(), this.setData({
            verifyPhoneData: t
        }), this.startCountdown(), this.loading(!1)) : this.alert({
            message: "啊哦, 出错了, 请返回",
            ok: function() {
                wx.navigateBack();
            }
        });
    },
    onUnload: function() {
        this.verityPhoneClean();
    }
};

(0, n.page)(s(d, c, u()));