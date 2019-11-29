var e, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = require("../../cwx/cwx.js"), t = require("common.js"), i = require("../../3rd/crypto-js/crypto-js"), a = "";

(0, o.CPage)({
    pageId: "10320613196",
    data: {
        errorMsg: "错误提示",
        errorMsgShow: "none",
        loginTabShow: "display:none",
        dynamicLoginShow: "none",
        normalLoginShow: "none",
        rediectLoginShow: "block",
        currentTab_dynamic: " tab-item_current",
        currentTab_normal: "",
        getdynamictitle: "获取动态码",
        getdynamicabled: !0,
        invitecodeShow: "display:none",
        addInviteCodeShow: "display:block",
        invitecode1Show: "display:none",
        addInviteCode1Show: "display:block",
        mobilephonewarn: "",
        dyncpwdwarn: "",
        imgcodewarn: "",
        loginnamewarn: "",
        pwdwarn: "",
        avatarUrl: "",
        avatarShow: "display:none",
        rediectLoginBtnShow: "display:none",
        nickname: "携程会员",
        nicknameShow: "display:none",
        showname: "",
        shownameShow: "display:none",
        imgCodeShow: "display:none",
        imgCodeUrl: "",
        captchaID: "",
        signature: ""
    },
    inputContent: {},
    onLoad: function() {},
    onUnload: function() {
        o.cwx.user.isLogin() || this.invokeCallback({
            ReturnCode: "-1",
            Message: "返回操作"
        });
    },
    onShow: function() {},
    onReady: function() {
        var e = this;
        "noauthenticate" == o.cwx.user.logintype ? (e.getWechatCodeV1(), e.changeOtherLogin()) : e.getWechatCodeV1();
    },
    callback: function(n) {
        e && clearTimeout(e), this.navigateBack(n);
    },
    bindAccountV1: function(e, n) {
        var i = this;
        n || (n = 0);
        var a = t.bindAccountV1(e, o.cwx.config.partner, function(e) {}, function(o) {
            n < 1 && i.bindAccountV1(e, n + 1);
        });
        o.cwx.request(a);
    },
    dynamicLoginClick: function() {
        var e = this;
        if (!this.isInLogin) {
            this.isInLogin = !0, setTimeout(function() {
                e.isInLogin = !1;
            }, 1e3);
            setTimeout(function() {
                var e = this, n = "", t = {};
                if (void 0 != this.inputContent.mobilephone && 0 != this.inputContent.mobilephone.trim().length || (n = "请输入手机号", 
                t.mobilewarn = "1"), void 0 != this.inputContent.dyncpwd && 0 != this.inputContent.dyncpwd.trim().length || (n.length > 0 ? (n += "和动态码", 
                t.mobilewarn = "3") : (n = "请输入动态码", t.mobilewarn = "2")), n && "" != n) return this.errorMsgShow(n, 1, t), 
                !1;
                this.mobileLogin(function(i) {
                    if (console.log(i), console.log(i.ReturnCode), i && 0 == i.ReturnCode ? (console.log(i), 
                    o.cwx.user.auth = i.Ticket, o.cwx.user.duid = i.Uid, o.cwx.user.userName = e.inputContent.mobilephone.trim(), 
                    e.bindAccountV1(o.cwx.user.userName), "" != a && e.thirdpartbind(), e.setMarketReferralCode(e.inputContent.invitecode, !1), 
                    e.callback({
                        ReturnCode: "0",
                        Message: "手机登录成功"
                    })) : i && 202 == i.ReturnCode ? (n = "动态码不正确" + (i ? i.ReturnCode : "900"), t.mobilewarn = "2") : n = "动态码登录失败" + (i ? i.ReturnCode : "900"), 
                    n && "" != n) return e.errorMsgShow(n, 1, t), !1;
                });
            }.bind(this), 300);
        }
    },
    redirectLoginClick: function() {
        var e = this, n = {
            RequestToken: a,
            ThirdType: "WeChatApp",
            IsMobile: !0,
            LoginType: "ThirdPart",
            LoginEntrance: "Other",
            LoginWay: "App",
            AutoLogin: !1,
            AutoRegister: !1,
            Context: [ {
                Key: "clientID",
                Value: o.cwx.clientID
            }, {
                Key: "Version",
                Value: "1.0"
            }, {
                Key: "Url",
                Value: "accounts/login.wxml"
            }, {
                Key: "Platform",
                Value: "WechatApp"
            }, {
                Key: "page_id",
                Value: e.pageId
            } ]
        };
        o.cwx.request(t.getRequestObject("10209/ThirdPartLogin.json", n, function(n) {
            n && n.data && 0 == n.data.ReturnCode ? (o.cwx.user.auth = n.data.Ticket, o.cwx.user.duid = n.data.UID, 
            e.callback({
                ReturnCode: "0",
                Message: "直接登录成功"
            })) : e.errorMsgShow(n.data.Message + "(" + n.data.ReturnCode + ")", 3);
        }, function(n) {
            e.errorMsgShow("登录失败，请返回重试(900)", 3);
        }));
    },
    changeOtherLogin: function() {
        this.setData({
            rediectLoginShow: "none",
            loginTabShow: "block",
            dynamicLoginShow: "block",
            normalLoginShow: "none"
        });
    },
    changedynamicLogin: function() {
        this.changeLoginType("block", " tab-item_current", "none", "", this);
    },
    changenormalLogin: function() {
        this.changeLoginType("none", "", "block", " tab-item_current", this);
    },
    changeLoginType: function(e, n, o, t, i) {
        i.setData({
            dynamicLoginShow: e,
            currentTab_dynamic: n,
            normalLoginShow: o,
            currentTab_normal: t
        });
    },
    normalLoginClick: function(e) {
        var n = this, i = "", r = {};
        if (void 0 != n.inputContent.loginname && 0 != n.inputContent.loginname.trim().length || (i = "请输入用户名", 
        r.loginwarn = "1"), void 0 != n.inputContent.pwd && 0 != n.inputContent.pwd.trim().length || ("" != i ? (i += "和密码", 
        r.loginwarn = "3") : (i = "请输入密码", r.loginwarn = "2")), i && "" != i) return this.errorMsgShow(i, 2, r), 
        !1;
        var c = {
            LoginName: n.inputContent.loginname.trim(),
            Password: n.inputContent.pwd.trim(),
            IsMobile: !0,
            LoginType: "MemberLogin",
            LoginEntrance: "Other",
            LoginWay: "App",
            AutoLogin: !1,
            TokenType: "OpenId",
            RequestToken: a,
            ThirdType: "WeChatApp",
            Context: {
                clientID: o.cwx.clientID,
                Version: "1.0",
                Url: "accounts/login.wxml",
                Platform: "WechatApp",
                page_id: n.pageId
            }
        };
        o.cwx.request(t.getRequestObject("10209/ThirdPartBindAndLogin.json", c, function(e) {
            if (e && e.data && e.data.Ticket && "" != e.data.Ticket ? (o.cwx.user.auth = e.data.Ticket, 
            o.cwx.user.duid = e.data.UID, n.setMarketReferralCode(n.inputContent.invitecode1, !1), 
            n.callback({
                ReturnCode: "0",
                Message: "普通登录成功"
            })) : i = e && e.data && "201" == e.data.ReturnCode ? "身份认证失败（" + e.data.ReturnCode + ")" : "登录失败，请重试（" + e.data.ReturnCode + ")", 
            i && "" != i) return n.errorMsgShow(i, 2, r), !1;
        }, function(e) {
            return i = "登录失败，请重试(900)", n.errorMsgShow(i, 2, r), !1;
        }));
    },
    addInviteCodeClick: function() {
        this.setData({
            invitecodeShow: "display:block",
            addInviteCodeShow: "display:none"
        });
    },
    addInviteCode1Click: function() {
        this.setData({
            invitecode1Show: "display:block",
            addInviteCode1Show: "display:none"
        });
    },
    textChange: function(e) {
        this.inputContent[e.currentTarget.id] = e.detail.value;
    },
    errorMsgShow: function(e, n, o) {
        console.log("errormsg 出现,当前登录类型：");
        var t = this;
        "1" == n ? "1" == o.mobilewarn ? this.setData({
            errorMsg: e,
            errorMsgShow: "block",
            mobilephonewarn: " color-warn"
        }) : "2" == o.mobilewarn ? this.setData({
            errorMsg: e,
            errorMsgShow: "block",
            dyncpwdwarn: " color-warn"
        }) : "3" == o.mobilewarn ? this.setData({
            errorMsg: e,
            errorMsgShow: "block",
            mobilephonewarn: " color-warn",
            dyncpwdwarn: " color-warn"
        }) : "1" == o.imgcodewarn ? this.setData({
            errorMsg: e,
            errorMsgShow: "block",
            imgcodewarn: " color-warn"
        }) : this.setData({
            errorMsg: e,
            errorMsgShow: "block"
        }) : "2" == n ? "1" == o.loginwarn ? this.setData({
            errorMsg: e,
            errorMsgShow: "block",
            loginnamewarn: " color-warn"
        }) : "2" == o.loginwarn ? this.setData({
            errorMsg: e,
            errorMsgShow: "block",
            pwdwarn: " color-warn"
        }) : "3" == o.loginwarn ? this.setData({
            errorMsg: e,
            errorMsgShow: "block",
            loginnamewarn: " color-warn",
            pwdwarn: " color-warn"
        }) : this.setData({
            errorMsg: e,
            errorMsgShow: "block"
        }) : this.setData({
            errorMsg: e,
            errorMsgShow: "block"
        }), setTimeout(function() {
            t.setData({
                errorMsg: "",
                errorMsgShow: "none"
            });
        }, 3e3);
    },
    getWechatCodeV1: function() {
        var e = this;
        wx.login({
            success: function(n) {
                n.code && "the code is a mock one" != n.code && (console.log("code:" + n.code), 
                wx.getUserInfo({
                    success: function(i) {
                        i.encryptedData;
                        console.log("iv:" + i.iv);
                        var r = {
                            Channel: o.cwx.config.channel3,
                            RequestToken: n.code,
                            EncryptData: i.encryptedData,
                            IV: i.iv
                        };
                        wx.request(t.getRequestObjectV1("wxUserApi/getOpenId", r, function(n) {
                            console.log(n), n && n.data && 200 == n.statusCode ? (a = n.data, o.cwx.user.openid = n.data, 
                            e.setData({
                                loginTabShow: "block",
                                dynamicLoginShow: "block"
                            })) : e.setData({
                                rediectLoginBtnShow: "display:none"
                            });
                        }, function(e) {}));
                    },
                    fail: function(e) {
                        console.log("获取GetuserInfo失败"), console.log(e);
                    }
                }));
            },
            fail: function(n) {
                console.log("获取code失败"), console.log(n), e.errorMsgShow("获取code失败", 3);
            }
        });
    },
    mobileLogin: function(e) {
        var n = this, i = {
            LoginName: n.inputContent.mobilephone,
            AuthenticateCode: n.inputContent.dyncpwd.trim(),
            LoginType: "MobileQuickLogin",
            LoginEntrance: "Other",
            LoginWay: "App",
            AutoLogin: !1,
            Context: [ {
                Key: "clientID",
                Value: o.cwx.clientID
            }, {
                Key: "Version",
                Value: "1.0"
            }, {
                Key: "Url",
                Value: "accounts/login.wxml"
            }, {
                Key: "Platform",
                Value: "WechatApp"
            }, {
                Key: "SourceID",
                Value: "55552689"
            }, {
                Key: "page_id",
                Value: n.pageId
            } ]
        };
        o.cwx.request(t.getRequestObject("10209/LoginValidate.json", i, function(n) {
            e(n.data);
        }, function(n) {
            e({
                ReturnCode: "900",
                Message: "登录失败，请重试"
            });
        }));
    },
    thirdpartbind: function() {
        var e = this, n = {
            ThirdType: "WeChatApp",
            RequestToken: a,
            AccountAuthType: "Auth",
            TokenType: "OpenId",
            IsMobile: !0,
            Context: [ {
                Key: "clientID",
                Value: o.cwx.clientID
            }, {
                Key: "Version",
                Value: "1.0"
            }, {
                Key: "Url",
                Value: "accounts/login.wxml"
            }, {
                Key: "Platform",
                Value: "WechatApp"
            }, {
                Key: "SourceID",
                Value: "55552689"
            }, {
                Key: "page_id",
                Value: e.pageId
            } ]
        };
        o.cwx.request(t.getRequestObject("10209/ThirdPartBind.json", n, function(e) {}, function(e) {}));
    },
    timeCountDown: function() {
        var n = this, o = 60;
        !function t() {
            0 == o ? (n.setData({
                getdynamictitle: "获取动态码",
                getdynamicabled: !0
            }), o = -1) : (n.setData({
                getdynamictitle: o + "s后重新发送",
                getdynamicabled: !1
            }), o--), o >= 0 ? e = setTimeout(t, 1e3) : e && clearTimeout(e);
        }();
    },
    getWechatCode: function() {
        var e = this;
        wx.login({
            success: function(n) {
                n.code && "the code is a mock one" != n.code && (console.log("code:" + n.code), 
                wx.getUserInfo({
                    success: function(i) {
                        i.encryptedData;
                        console.log("iv:" + i.iv);
                        var r = {
                            RequestToken: n.code,
                            TokenType: "AuthCode",
                            ThirdType: "WeChatApp",
                            Context: [ {
                                Key: "encryptData",
                                Value: i.encryptedData
                            }, {
                                Key: "iv",
                                Value: i.iv
                            }, {
                                Key: "clientID",
                                Value: o.cwx.clientID
                            } ]
                        };
                        o.cwx.request(t.getRequestObject("10209/ThirdPartAuthenticate.json", r, function(n) {
                            0 == (n && n.data ? n.data.ReturnCode : "904") ? (a = n.data.OpenID, n.data && n.data.UID && "" != n.data.UID ? e.renderUI(n.data) : e.changeOtherLogin()) : e.setData({
                                rediectLoginBtnShow: "display:none"
                            });
                        }, function(e) {}));
                    },
                    fail: function(e) {}
                }));
            },
            fail: function(e) {
                console.log("获取code失败"), console.log(e);
            }
        });
    },
    renderUI: function(e) {
        var n = this, o = "携程会员", t = "";
        if (e && e.Extension) {
            var i = e.Extension;
            if (i.length > 0) for (var a = 0; a < i.length; a++) "NickName" == i[a].Key ? "null" != i[a].Value && "" != i[a].Value && (o = i[a].Value) : (i[a].Key = "PhotoImageUrl") && (t = i[a].Value);
        }
        "" != o && n.setData({
            nickname: o,
            nicknameShow: "display:block"
        }), "" != t && n.setData({
            avatarUrl: t,
            avatarShow: "display:block"
        }), e.BindedMobilePhone && "" != e.BindedMobilePhone ? n.setData({
            showname: e.BindedMobilePhone,
            rediectLoginBtnShow: "display:block",
            shownameShow: "display:block"
        }) : e.BindedEmail && "" != e.BindedEmail ? n.setData({
            showname: e.BindedEmail,
            rediectLoginBtnShow: "display:block",
            shownameShow: "display:block"
        }) : e.UID && "" != e.UID && n.setData({
            showname: n.maskoffcode(e.UID),
            rediectLoginBtnShow: "display:block",
            shownameShow: "display:block"
        });
    },
    maskoffcode: function(e) {
        if (!e) return "";
        var n = e = e.trim();
        if (e && e.length > 7) n = (o = e.substr(0, 4)) + "*****" + (t = e.substr(-3, 3)); else if (e && e.length > 3) {
            var o = e.substr(0, 2), t = e.substr(-1, 1);
            n = o + "*****" + t;
        } else n = e;
        return n;
    },
    setMarketReferralCode: function(e, n) {
        if (void 0 != e && e.trim().length > 0) {
            var t = {
                DUID: o.cwx.user.duid,
                referralCode: e,
                isRegister: n
            };
            o.cwx.mkt.setReferralCode(this, t);
        }
    },
    getImageCode: function() {
        var e = this, n = e.inputContent.mobilephone;
        if (void 0 == n || 0 == n.trim().length) return !1;
        if (!/^1(3|4|5|7|8)\d{9}$/.test(n.trim())) return !1;
        var i = {
            AccountHead: {},
            Data: {
                CountryCode: "86",
                MobilePhone: n.trim(),
                sendScene: "RegistCode",
                CheckMobilePhoneNumber: "NoCheck",
                Context: [ {
                    Key: "clientID",
                    Value: o.cwx.clientID
                }, {
                    Key: "Version",
                    Value: "1.0"
                }, {
                    Key: "Url",
                    Value: "accounts/login.wxml"
                }, {
                    Key: "Platform",
                    Value: "WechatApp"
                }, {
                    Key: "page_id",
                    Value: e.pageId
                } ]
            }
        };
        o.cwx.request(t.getGatewayRequestObj("risk/10261/SendMessageByPhone.json", i, function(n) {
            if (n && n.data) {
                var o = n.data;
                if (0 == o.ReturnCode) {
                    console.log("risk result:" + o.Result);
                    var t = JSON.parse(o.Result);
                    if (t && 1001 == t.ReturnCode) {
                        var i = "data:image/gif;base64," + t.ImgCode;
                        return void e.setData({
                            imgCodeShow: "display:block",
                            imgCodeUrl: i,
                            captchaID: t.CaptchaID,
                            signature: t.Signature
                        });
                    }
                }
            }
            e.setData({
                imgCodeShow: "display:none"
            });
        }, function(n) {
            e.setData({
                imgCodeShow: "display:none"
            });
        }));
    },
    sendVerifyCodeWithRiskControl: function() {
        setTimeout(function() {
            var e = this, n = "", i = {};
            console.log("发送动态密码");
            var a = e.inputContent.mobilephone;
            if (void 0 == a || 0 == a.trim().length) return n = "请输入手机号", i.mobilewarn = "1", 
            e.errorMsgShow(n, 1, i), !1;
            if (!/^1(3|4|5|7|8)\d{9}$/.test(a.trim())) return n = "手机号格式不正确", i.mobilewarn = "1", 
            e.errorMsgShow(n, 1, i), !1;
            var r = e.inputContent.img_code_box;
            if ("display:block" == e.data.imgCodeShow && (void 0 == r || 0 == r.length)) return n = "请输入图片验证码", 
            i.imgcodewarn = "1", e.errorMsgShow(n, 1, i), !1;
            e.data.signature, e.data.captchaID, a.trim(), o.cwx.clientID, e.pageId;
            var c = {
                clientId: "wx",
                reqTime: "",
                clientInfo: "",
                token: "",
                appVersion: "",
                deviceId: "",
                channel: o.cwx.config.channel2,
                partnerName: o.cwx.config.partner,
                userMobile: a.trim()
            }, s = this.makeSign(c);
            c.sign = s, o.cwx.request(t.getRequestObject("10957/json/SendLoginCode", c, function(o) {
                if (o && o.data && 1 == o.data.resultCode) {
                    if (1 == o.data.resultCode) return void e.timeCountDown();
                } else o && o.data && -1 == o.data.resultCode ? (n = o.data.resultMessage, i.mobilewarn = "1") : n = "发送失败";
                n && "" != n && e.errorMsgShow(n, 1, i), e.getImageCode();
            }, function(o) {
                return console.log("发送失败"), console.log(o), n = "发送失败", e.errorMsgShow(n, 1, i), 
                !1;
            }));
        }.bind(this), 300);
    },
    makeSign: function(e) {
        var o = Object.keys(e);
        o.sort();
        for (var t = "", a = "", r = 0, c = o.length; r < c; r++) {
            var s = o[r], l = e[s] ? e[s] : 0 == e[s] ? e[s] : "";
            "object" != (void 0 === l ? "undefined" : n(l)) && (t = t + a + s + "=" + l, a = "&");
        }
        return i.MD5("bkcpigycmtjh6d6fp3lfyhzbpjitulla" + i.MD5(t).toString()).toString();
    }
});