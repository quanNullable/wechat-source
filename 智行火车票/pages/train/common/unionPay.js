function e(e) {
    var n = e.match(/<form([^>]+)>([\s\S]*)?<\/form>/i);
    if (n) {
        var o = n[1].match(/action=['"]([^'"]+)/i);
        if (o = o && o[1]) {
            var r = {}, t = {
                url: o,
                form: r,
                method: "POST"
            }, a = /name=['"]([^'"]+)/i, i = /value=['"]([^'"]*)/i;
            if ((n = n[2].match(/<input[^>]+/gi)) && n.length) for (var c = 0, s = n.length; c < s; c++) {
                var u = n[c], d = u.match(a), l = u.match(i);
                d = d && d[1], l = l && l[1], d && (r[d] = l);
            }
            return t;
        }
        return null;
    }
    return null;
}

function n(e, n, o) {
    var r = '\n    var window = {\n        visiablepan: "' + l.visiablepan + '",\n        publicKey: "' + l.publicKey + '",\n        exponent: "' + l.exponent + '",\n        navigator: navigator,\n        password:"' + n + '",\n    };\n    ';
    console.log(r);
    t({
        before: v + r,
        script: e,
        after: "\n        ;formatToHex(window.password, window.visiablepan);\n    "
    }, function(e) {
        try {
            var n = e.data;
            1 === e.code && o && o(n ? null : new Error("Can't handle script."), n);
        } catch (e) {
            o && o(e);
        }
    });
}

function o(e, n, o) {
    var r = '\n    var window = {\n        visiablepan: "' + l.visiablepan + '",\n        publicKey: "' + l.publicKey + '",\n        exponent: "' + l.exponent + '",\n        navigator: navigator\n    };\n    ';
    console.log(r);
    var a = JSON.stringify(n);
    t({
        before: v + r,
        script: e,
        after: "\n        ;window.atmRSA.do_encrypt('" + a + "')\n    "
    }, function(e) {
        try {
            var n = e.data;
            1 === e.code && o && o(n ? null : new Error("Can't handle script."), n);
        } catch (e) {
            o && o(e);
        }
    });
}

function r(e, n, o) {
    var r = /define\(\"up\.m\.encrypt\"\,\s*\[\]\s*\,function\(\)\{([\S\s]*)\}\)/g.exec(e);
    t({
        before: "\n    var D = {};\n    function ABC() {\n    ",
        script: r = r && r[1],
        after: '\n        };\n        ABC().a("' + n + '", [' + l.sk + "])\n    "
    }, function(e) {
        try {
            var n = e.data;
            1 === e.code && o && o(n ? null : new Error("Can't handle script."), n);
        } catch (e) {
            o && o(e);
        }
    });
}

function t(e, n) {
    var o = a(e.before), r = a(e.after);
    wx.request({
        url: "https://m.tieyou.com/index.php?param=/api/remoteEvalV1.html",
        method: "POST",
        data: {
            channel: "tieyouwx",
            before: o,
            script: e.script,
            after: r
        },
        success: function(e) {
            e.data.data = e.data.res, n(e.data);
        },
        fail: function() {
            n({
                data: null,
                code: -1,
                err: "error: request remote eval failed"
            });
        }
    });
}

function a(e) {
    var n = "123454536f667445454d537973576562";
    n = i.default.enc.Utf8.parse(n);
    var o = "1234577290ABCDEF1264147890ACAE45";
    o = i.default.enc.Utf8.parse(o);
    var r = i.default.AES.encrypt(e, n, {
        iv: o,
        mode: i.default.mode.CBC,
        padding: i.default.pad.ZeroPadding
    }).toString();
    return console.log("text"), console.log(e), console.log(r), r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../3rd/crypto-js/crypto-js")), c = {}, s = {
    request: function(e, n) {
        var o = {};
        e.headers && Object.keys(e.headers).forEach(function(n) {
            o[n.toLowerCase()] = e.headers[n];
        }), wx.request({
            url: e.url,
            header: o,
            method: (e.method || "POST").toUpperCase(),
            data: e.form,
            success: function(e) {
                console.log("success"), console.log(e), e.body = e.data, n(null, e);
            },
            fail: function(e) {
                console.log("fail"), console.log(e), wx.showLoading({
                    title: JSON.stringify(e)
                });
            }
        });
    }
}, u = {
    dismissDialog: function() {
        wx.hideLoading();
    },
    progressDialog: function(e) {
        wx.showLoading ? wx.showLoading({
            title: e,
            mask: !0
        }) : u.toast(e);
    },
    openLogin: function(e) {
        e({}, null);
    },
    openSingleDialog: function() {
        wx.showLoading ? wx.showLoading({
            title: msg,
            mask: !0
        }) : u.toast(msg);
    },
    toast: function(e) {
        wx.showToast({
            title: e,
            icon: "info",
            mask: !0
        });
    }
}, d = {
    unionPayErr_log: function(e) {
        console.log(e);
    }
}, l = {}, p = "", m = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", f = !1, y = function(e) {
    f || u.progressDialog(e);
}, h = function(e, n, o) {
    return o ? (o.message = o.message + "(" + e + ")", o) : {
        code: e,
        message: n + "(" + e + ")"
    };
}, v = '\n    var navigator = {\n    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"\n    };\n\n    var $ = function() {\n        return {\n            tap: function(){\n\n            },\n\n            click: function() {\n\n            }\n        }\n    };\n    var document = {\n        hasOwnProperty: function(){},\n        getElementById: function(){}\n    }\n', g = function(e) {
    var n = {};
    return n.Accept = "*/*", n["Accept-Language"] = "zh-CN,zh;q=0.8,en;q=0.6", n["CONTENT-TYPE"] = "application/json; charset=UTF-8;", 
    n.Host = "mcashier.95516.com", n.Origin = "https://mcashier.95516.com", n.Referer = p, 
    n["User-Agent"] = m, n;
}, b = function(n, o) {
    var r = {
        url: n.url,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": m,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        method: "post",
        form: n.form
    };
    s.request(r, function(n, r) {
        if (!n && r.body) {
            var t = e(r.body);
            t ? o(n, t) : (d.unionPayErr_log(r.body), o(h(802, "获取支付表单失败"), r));
        } else d.unionPayErr_log(r.body), o(h(801, "获取支付表单失败", n), r);
    });
}, w = function(n, o) {
    var r = {
        url: n.url,
        method: n.method,
        form: n.form,
        headers: {
            "User-Agent": m,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    };
    s.request(r, function(n, r) {
        if (!n && r.body) {
            var t = e(r.body);
            t ? o(n, t) : (d.unionPayErr_log(r.body), o(h(812, "获取支付表单失败"), t));
        } else d.unionPayErr_log(r.body), o(h(811, "获取支付表单失败", n), r);
    });
}, S = function(e, n) {
    var o = {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://cmsp.mobile.unionpay.com",
        Referer: "https://cmsp.mobile.unionpay.com/easypay/railway/trans",
        "User-Agent": m,
        "Upgrade-Insecure-Requests": "1"
    }, r = {
        url: e.url,
        method: e.method,
        form: e.form,
        headers: o,
        followRedirect: 0
    };
    s.request(r, function(e, t) {
        if (e) d.unionPayErr_log(t.body), n(h(821, "获取支付信息错误", e), t); else {
            var a = "", i = t.body.match(/<form([^>]+)>([\s\S]*)?<\/form>/i);
            if (i) {
                var c = i[1].match(/action=['"]([^'"]+)/i);
                a = c && c[1];
            }
            if (a) {
                var u = {
                    url: a,
                    method: "get",
                    headers: o
                };
                s.request(u, function(e, o) {
                    if (!e && o.body) {
                        var r = o.body, t = /window.initObjectStr\s=\s[']([^']*)/i, a = r.match(t);
                        a = a && a[1];
                        var i = JSON.parse(a) || {};
                        if ("00" == i.r) {
                            var c = {}, s = i.p;
                            l.t = i.t, l.merchantCode = s.merchantCode, l.publicKey = s.modulus, l.exponent = s.exponent, 
                            l.sk = s.sk, p = u.url, s.order && (c.acqName = s.order.acqName, c.merchantName = s.order.merchantName, 
                            c.orderAmount = s.order.orderAmount, c.orderCurrency = s.order.orderCurrency, c.orderNumber = s.order.orderNumber, 
                            c.orderTime = s.order.orderTime);
                            t = /data-main\s?=\s?["]([^"]*)/i;
                            a = (a = r.match(t)) && a[1], n(e, {
                                nextReqInfo: {
                                    url: a
                                },
                                order: c
                            });
                        } else d.unionPayErr_log(o.body), n(h(823, i.m || "获取支付信息错误"), o);
                    } else d.unionPayErr_log(o.body), n(h(822, "获取支付信息错误", e), o);
                });
            } else if (!e && t.body) {
                var m = t.body, f = /window.initObjectStr\s=\s[']([^']*)/i, y = m.match(f);
                y = y && y[1];
                var v = JSON.parse(y) || {};
                if ("00" == v.r) {
                    var g = {}, b = v.p;
                    l.t = v.t, l.merchantCode = b.merchantCode, l.publicKey = b.modulus, l.exponent = b.exponent, 
                    l.sk = b.sk, p = r.url, b.order && (g.acqName = b.order.acqName, g.merchantName = b.order.merchantName, 
                    g.orderAmount = b.order.orderAmount, g.orderCurrency = b.order.orderCurrency, g.orderNumber = b.order.orderNumber, 
                    g.orderTime = b.order.orderTime);
                    f = /data-main\s?=\s?["]([^"]*)/i;
                    y = (y = m.match(f)) && y[1], n(e, {
                        nextReqInfo: {
                            url: y
                        },
                        order: g
                    });
                } else d.unionPayErr_log(t.body), n(h(825, v.m || "获取支付信息错误"), t);
            } else d.unionPayErr_log(t.body), n(h(824, "获取支付信息错误", e), t);
        }
    });
}, q = function(e, n) {
    var o = {
        url: e.url,
        method: "get"
    }, r = function(e, n, o) {
        s.request(e, function(e, r) {
            !e && r.body ? ("encryptpd" == n ? l.encryptpdJS = r.body : l.encryptJS = r.body, 
            o(e, r)) : (d.unionPayErr_log(r.body), o(e, r));
        });
    };
    s.request(o, function(e, o) {
        if (!e && o.body) {
            var t = o.body, a = /["]([^"]*phone\.encryptpd\.js)\"\s?\:\s?["]([^"]*)/i, i = t.match(a), c = {
                url: "https://acpstatic.95516.com/gw/mobile" + (i && i[1]) + "?v=" + (i && i[2]),
                method: "get"
            }, s = /["]([^"]*up\.m\.encrypt\.js)\"\s?\:\s?["]([^"]*)/i, u = t.match(s), l = {
                url: "https://acpstatic.95516.com/gw/mobile" + (u && u[1]) + "?v=" + (u && u[2]),
                method: "get"
            };
            r(c, "encryptpd", function(e, o) {
                e ? (d.unionPayErr_log(o.body), n(h(832, "获取支付信息错误", e), o)) : r(l, "encrypt", function(e, o) {
                    e ? (d.unionPayErr_log(o.body), n(h(833, "获取支付信息错误", e), o)) : n(e, o);
                });
            });
        } else d.unionPayErr_log(o.body), n(h(831, "获取支付信息错误", e), o);
    });
};

c.loadBankWeb = function(e, n) {
    var o = function(e, o) {
        u.dismissDialog(), n(e, o);
    }, r = {};
    f = e.hideDialog, y("正在获取支付信息"), b(e.request, function(e, n, t) {
        e ? o(e, {}) : w(n, function(e, n) {
            e ? o(e, n) : S(n, function(e, n) {
                e ? o(e, n) : ((r = n.order).rstType = "ToYLCRN", q(n.nextReqInfo, function(e, n) {
                    o(e, r);
                }));
            });
        });
    });
}, c.loadZgyLRailTransReq = function(e, n) {
    var o = function(e, o) {
        u.dismissDialog(), n(e, o);
    }, r = {};
    y("正在获取支付信息"), w(e, function(e, n) {
        e ? o(e, n) : S(n, function(e, n) {
            e ? o(e, n) : ((r = n.order).rstType = "ToYLCRN", q(n.nextReqInfo, function(e, n) {
                o(e, r);
            }));
        });
    });
};

var x = function(e, n) {
    return {
        p: e,
        t: l.t,
        s: "2",
        l: "zh_CN"
    };
}, C = function(e, n, o, r) {
    return {
        url: e,
        method: n,
        form: r ? o : JSON.stringify(o),
        headers: g()
    };
}, P = function(e, n) {
    s.request(e, function(e, o) {
        var r = {};
        if (e) return n(e, r);
        if (!o.body) return n(h(901, "获取数据失败"));
        if ("string" == typeof o.body) var t = JSON.parse(o.body); else t = o.body;
        if (!t) return n(h(902, "获取数据失败"));
        if ("00" == t.r) {
            var a = t.p;
            n(null, t, a);
        } else t.m ? (d.unionPayErr_log(o.body), n(h(903, t.m), t, null)) : (d.unionPayErr_log(o.body), 
        n(h(904, "获取数据结构错误"), t, null));
    });
}, T = function(e, n) {
    var o = function e(o) {
        var r = "https://mcashier.95516.com/mobile/bankOpenStatusQuery.action?r=" + Math.random(), t = x({
            qn: l.qn
        }), a = C(r, "post", t);
        o += 1, P(a, function(r, t, a) {
            r ? n(r, {}) : "InProcess" == a.status ? o < 10 ? e(o) : n(h(841, "获取银行卡状态超时"), {}) : "Succeed" == a.status ? n(null, t) : n(h(842, "获取银行卡状态失败"), {});
        });
    }, r = "https://mcashier.95516.com/mobile/cardValidate.action?r=" + Math.random(), e = x({
        cardNumber: e.cardNo
    }), t = C(r, "post", e);
    P(t, function(e, r, t) {
        e ? n(h(843, "获取银行卡状态失败", e), r) : "query" == t.route ? (l.qn = t.qn, o(0)) : n(e, r);
    });
}, N = function(e, n) {
    var o = [], r = {
        bankName: e.bankName,
        cardType: e.cardTypeDisplay,
        cardDisplay: e.cardNumberDisplay
    };
    if (n.mobile && o.push({
        key: "mobile",
        name: "手机号",
        desc: "请输入手机号",
        length: 11,
        type: "input"
    }), n.smsCode && o.push({
        key: "smsCode",
        name: "验证码",
        desc: "短信验证码",
        length: 6,
        type: "input_button"
    }), n.expire && o.push({
        key: "expire",
        name: "有效期",
        desc: "示例:09/15输入0915",
        length: 4,
        type: "input"
    }), n.cvn2 && o.push({
        key: "cvn2",
        name: "安全码",
        desc: "背后安全码,最后三位",
        length: 6,
        type: "input"
    }), n.password && o.push({
        key: "password",
        name: "取款密码",
        desc: "银行卡取款密码",
        length: 6,
        type: "encryptInput"
    }), n.credential) {
        var t = [ {
            name: "身份证",
            value: "01"
        }, {
            name: "军官证",
            value: "02"
        }, {
            name: "护照",
            value: "03"
        }, {
            name: "回乡证",
            value: "04"
        }, {
            name: "台胞证",
            value: "05"
        }, {
            name: "警官证",
            value: "06"
        }, {
            name: "士兵证",
            value: "07"
        }, {
            name: "其他",
            value: "99"
        } ];
        o.push({
            key: "credentialType",
            name: "证件类型",
            value: t,
            type: "list"
        }), o.push({
            key: "credential",
            name: "证件号码",
            length: 18,
            type: "input"
        });
    }
    return r.ruleList = o, r;
}, E = function(e, n) {
    var o = "https://mcashier.95516.com/mobile/getCardInfo.action?r=" + Math.random(), e = x({}), r = C(o, "post", e);
    P(r, function(e, o, r) {
        if (e) n(h(851, "获取银行卡信息失败", e), o); else {
            var t = r.displayCardInfo, a = t.rules, i = N(t, a);
            l.visiablepan = t.cardNumber, l.smsType = t.smsType, n(e, i);
        }
    });
}, k = function(e, n) {
    var o = function e(o) {
        var r = "https://mcashier.95516.com/mobile/sendSMSProcessing.action?r=" + Math.random(), t = x({
            qn: l.qn
        }), a = C(r, "post", t);
        P(a, function(r, t, a) {
            r ? n(h(862, "", r), t) : "Succeed" == a.status ? n(r, t) : "InProcess" == a.status && o < 10 ? e(o + 1) : n(h(861, "获取验证码信息错误"), {});
        });
    }, r = "https://mcashier.95516.com/mobile/sendSMS.action?r=" + Math.random(), t = x({
        smsType: l.smsType,
        mobile: e.payInfo.mobile
    }), a = C(r, "post", t);
    P(a, function(e, r, t) {
        e ? n(h(863, "", e), r) : t.proceed ? (l.qn = t.qn, o(0)) : n(e, r);
    });
}, _ = function(e, t) {
    var a = e.payInfo;
    if (a) {
        var i = function(e) {
            var n = {};
            for (var o in e) e[o] && e[o].length > 0 && (n[o] = e[o]);
            return n.credential && (n.credentialType = "01"), n.saveMemorizedCard = !1, n.discountInfo = {}, 
            n;
        }, c = function() {
            var e = "https://mcashier.95516.com/mobile/cardPay.action?r=" + Math.random(), n = x(i(a)), o = C(e, "post", n);
            P(o, function(e, n, o) {
                e ? t(h(872, "", e), n) : t(e, n);
            });
        }, s = !1, u = !1;
        !function e() {
            if (a.password && !s) {
                if (!l.encryptpdJS) return void t(h(873, "提交支付信息处理错误(epd01)"), {});
                s = !0, n(l.encryptpdJS, a.password, function(n, o) {
                    n ? t(h(874, "提交支付信息处理错误(epd02)"), {}) : (a.password = o, e());
                });
            } else if (a.cvn2 && !u) {
                if (!l.encryptJS) return void t(h(875, "提交支付信息处理错误(ecvn01)"), {});
                u = !0, r(l.encryptJS, a.cvn2, function(n, r) {
                    n ? t(h(877, "提交支付信息处理错误(ecvn03)"), {}) : o(l.encryptpdJS, {
                        cvn2: r,
                        expire: a.expire
                    }, function(n, o) {
                        n ? t(h(876, "提交支付信息处理错误(epd02)"), {}) : (a.encryptKey = o, a.cvn2 = "", a.expire = "", 
                        e());
                    });
                });
            } else c();
        }();
    } else t(h(871, "提交支付参数错误"), {});
}, M = function(e, n) {
    !function o(r, t) {
        var a = "https://mcashier.95516.com/mobile/cardPayProcessing.action?r=" + Math.random(), i = x({}), c = C(a, "post", i);
        P(c, function(r, a, i) {
            r ? n(h(883, "", r), a) : "Succeed" == i.status ? n(r, a) : "Failed" == i.status ? n(r, a) : t < 12 ? setTimeout(function() {
                o(e, t + 1);
            }, 2e3) : n(h(882, "获取支付结果超时"), a);
        });
    }(0, 0);
}, A = function(e, n) {
    var o = "https://mcashier.95516.com/mobile/cardPayResult.action?r=" + Math.random(), r = x({}), t = C(o, "post", r);
    P(t, function(e, o, r) {
        e ? n(h(891, "", e), o) : n(e, o);
    });
};

c.checkCardInfo = function(e, n) {
    var o = function(e, o) {
        n(e, o);
    };
    u.progressDialog("正在提交支付..."), T(e, function(e, n) {
        e ? (u.toast("检测卡号失败(01)"), o(e, {})) : E(n, function(e, n) {
            e ? (u.toast("检测卡号失败(02)"), o(e, uData)) : (u.toast("检测卡号成功"), o(e, n));
        });
    });
}, c.unionPaySendSMS = function(e, n) {
    var o = function(e, o) {
        n(e, o);
    };
    u.progressDialog("正在发送短信验证码..."), k(e, function(e, n) {
        e ? (u.toast("发送短信失败(01)"), o(e, {})) : (u.toast("发送短信成功"), o(e, n));
    });
}, c.unionPayConfirm = function(e, n) {
    var o = function(e, o) {
        u.dismissDialog(), n(e, o);
    };
    u.progressDialog("正在提交支付..."), _(e, function(e, n) {
        e ? o(e, {}) : M(n, function(e, n) {
            e ? o(e, n) : A(0, function(e, n) {
                e ? o(e, {}) : (u.toast("提交支付成功"), o(e, n));
            });
        });
    });
}, c.parseForm = e, c.remoteEval = t, exports.default = c;