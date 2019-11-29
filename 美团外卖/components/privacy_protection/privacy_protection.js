function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function a(r, i) {
                try {
                    var s = e[r](i), o = s.value;
                } catch (t) {
                    return void n(t);
                }
                if (!s.done) return Promise.resolve(o).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(o);
            }
            return a("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, a = require("../../api/index.js"), r = a.privacyInfo, i = a.privacyBinding, s = {
    RUNNER: 0,
    SHOPPER: 1
};

module.exports = function(a) {
    return n({}, a, {
        data: n({}, a.data, {
            privacy: {
                usingPrivacy: !1,
                scene: "",
                modalStatus: 0,
                dailingPhone: "",
                targetPhone: "",
                exception: {
                    mainMsg: "服务不稳定，号码保护暂时不可用",
                    subMsg: "您可以使用真实号码继续拨号"
                },
                isInputError: !1,
                inputPhoneStr: "",
                inputFocus: !1,
                isExpired: 0
            }
        }),
        checkTelephone: function(t) {
            var e = /^1[3-9][0-9]{9}$/;
            return (t = t.replace(/\s/g, "")) && e.test(t);
        },
        fmtMsg: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "-";
            return (t.replace(/\s/g, "") || "").replace(/(\d{3})(\d{4})(\d{4})/g, function(t, n, a, r) {
                return [ n, a, r ].join(e);
            });
        },
        updatePrivacyStatus: function(t) {
            var e = this.data.privacy;
            this.setData({
                privacy: n({}, e, t)
            });
        },
        switchMap: function(t) {
            var e = this.data.showMap, n = this.mapSwtich, a = this.pageScrollY, r = this.mapHeight, i = "HIDE" === t ? 0 : n, s = "SHOW" !== t;
            if (void 0 !== e) {
                if ("SHOW" === t) return void this.setData({
                    showMap: i,
                    disableReload: s
                });
                -1 !== r ? a <= r && this.setData({
                    showMap: i,
                    disableReload: s
                }) : this.setData({
                    showMap: i,
                    disableReload: s
                });
            }
        },
        contact: function(t) {
            var e = this.updatePrivacyStatus, n = this.switchMap;
            e({
                modalStatus: 0,
                inputFocus: !1
            }), n("SHOW"), wx.makePhoneCall({
                phoneNumber: t,
                success: function() {},
                fail: function() {},
                complete: function() {}
            });
        },
        handleResp: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = t.code, a = t || {}, r = a.phone, i = a.action, s = a.main_desc, o = a.sub_desc, u = a.log_field.is_expired, c = this.fmtMsg, p = this.updatePrivacyStatus, h = this.contact;
            void 0 === n ? 3 !== i ? (1 === i && (e ? h(r) : p({
                dailingPhone: c(r),
                modalStatus: 1
            })), 2 === i && p({
                modalStatus: 3,
                targetPhone: r,
                exception: {
                    mainMsg: s,
                    subMsg: o
                },
                isExpired: u
            }), p({
                inputPhoneStr: ""
            })) : this.toast({
                message: "操作过于频繁，请稍后再试"
            }) : p({
                modalStatus: 3,
                targetPhone: r,
                isExpired: u
            });
        },
        fetchPrivacy: function() {
            var a = this, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "SHOPPER";
            return t(e.default.mark(function t() {
                var o, u, c, p, h, d, l, v, f;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return o = a.updatePrivacyStatus, u = a.genPrivacyReqParam, c = a.handleResp, p = a.switchMap, 
                        h = a.data.privacy.dailingPhone, d = u(), l = h || d.user_phone, v = n({}, d, {
                            user_phone: l.replace(/-/g, ""),
                            scene_code: s[i]
                        }), p("HIDE"), o({
                            scene: i
                        }), t.prev = 7, t.t0 = c, t.next = 11, r(v);

                      case 11:
                        t.t1 = t.sent, (0, t.t0)(t.t1), t.next = 19;
                        break;

                      case 15:
                        t.prev = 15, t.t2 = t.catch(7), f = JSON.parse(d.third_party_phone)[0], c({
                            code: 2,
                            phone: f,
                            log_field: {
                                is_expired: 0
                            }
                        });

                      case 19:
                      case "end":
                        return t.stop();
                    }
                }, t, a, [ [ 7, 15 ] ]);
            }))();
        },
        bindingPrivacy: function(a) {
            var r = this, o = a.currentTarget.dataset.entrance;
            return t(e.default.mark(function t() {
                var a, u, c, p, h, d, l, v, f, g, P, S, y;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (a = r.fmtMsg, u = r.updatePrivacyStatus, c = r.checkTelephone, p = r.handleResp, 
                        h = r.genPrivacyReqParam, d = r.data.privacy, l = d.inputPhoneStr, v = d.dailingPhone, 
                        f = d.scene, g = v.replace(/-/g, ""), 1 != +o) {
                            t.next = 9;
                            break;
                        }
                        if (c(l)) {
                            t.next = 7;
                            break;
                        }
                        return u({
                            isInputError: !0
                        }), t.abrupt("return");

                      case 7:
                        u({
                            dailingPhone: a(l),
                            inputFocus: !1
                        }), g = l.replace(/\s/g, "");

                      case 9:
                        return P = h(), S = n({}, P, {
                            scene_code: s[f],
                            user_phone: g
                        }), t.prev = 11, t.t0 = p, t.next = 15, i(S);

                      case 15:
                        t.t1 = t.sent, (0, t.t0)(t.t1, !0), t.next = 23;
                        break;

                      case 19:
                        t.prev = 19, t.t2 = t.catch(11), y = JSON.parse(P.third_party_phone)[0], p({
                            code: 2,
                            phone: y,
                            log_field: {
                                is_expired: 0
                            }
                        });

                      case 23:
                      case "end":
                        return t.stop();
                    }
                }, t, r, [ [ 11, 19 ] ]);
            }))();
        },
        onTapChangeDailingPhone: function() {
            (0, this.updatePrivacyStatus)({
                modalStatus: 2,
                inputFocus: !0
            });
        },
        onTapCancelChangeDailingPhone: function() {
            var t = this.updatePrivacyStatus;
            setTimeout(function() {
                t({
                    modalStatus: 1,
                    inputPhoneStr: "",
                    isInputError: !1,
                    inputFocus: !1
                });
            }, 200);
        },
        onTapCallWithoutPrivacy: function() {
            var t = this.data.privacy.targetPhone;
            this.contact(t);
        },
        onTapCancelCall: function() {
            var t = this.updatePrivacyStatus, e = this.switchMap;
            t({
                modalStatus: 0
            }), e("SHOW");
        },
        onInputChange: function(t) {
            var e = this.updatePrivacyStatus, n = this.checkTelephone, a = this.data.privacy.isInputError, r = t.detail.value;
            (r = r.replace(/\s/g, "").substring(0, 11)).length > 3 && (r = r.substring(0, 3) + " " + r.substring(3, r.length)), 
            r.length > 8 && (r = r.substring(0, 8) + " " + r.substring(8, r.length)), e({
                inputPhoneStr: r,
                isInputError: 13 === r.length ? !n(r) : !!r && a
            });
        },
        onTapClearInputText: function() {
            (0, this.updatePrivacyStatus)({
                inputPhoneStr: "",
                isInputError: !1
            });
        },
        prohibitScroll: function() {}
    });
};