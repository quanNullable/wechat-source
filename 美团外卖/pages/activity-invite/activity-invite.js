function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, a) {
            function n(i, o) {
                try {
                    var r = e[i](o), s = r.value;
                } catch (t) {
                    return void a(t);
                }
                if (!r.done) return Promise.resolve(s).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(s);
            }
            return n("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, n = require("../../npm/@hfe/mp-owl/lib/index.js"), i = require("../../actions/web-view.js"), o = [ "remind", "ma", "knowledge" ], r = [ 0, "10%", "25%", "37%", "50%", "50%", "65%", "75%" ], s = require("../../api/promotion-api.js").request, d = require("../../api/wx.js").getUserInfo, c = require("../../utils/mix.js"), u = require("../base.js"), h = require("./log.js"), l = require("../../weapp-redux/index.js").connect, f = require("../../api/analytics.js").pv, p = l(function(t) {
    var e = t.user, a = t.dev.env;
    return {
        user: e || {},
        env: a
    };
}, function(t) {
    return {
        updateWebview: function(e) {
            return t((0, i.updateWebview)(e));
        }
    };
}), v = {
    data: {
        overlayType: "",
        showNewVersion: !1,
        showMainContent: !1,
        showListMore: !1,
        showRetry: !1,
        list: [],
        totalSalary: 0,
        invitedNum: 0,
        futureSalary: 0,
        bonusProcessWidth: r[0],
        img: {
            share: "https://www.dpfile.com/app/wm-mp-assets/share-redpacket-17.png?62e1022d13dc8cc15b2b2b2e0825c75b",
            iconQuestion: "https://www.dpfile.com/app/wm-mp-assets/icon-question.png?d7f8e6761bc2547ddff0052692e39e55",
            defaultHeadImgUrl: "https://www.dpfile.com/app/wm-mp-assets/default-avatar.png?f240307f918a57c80d46682464fecbbb"
        },
        url: {
            invitation: "invite/getmyinvitation",
            shareCard: "invite/getsharecard",
            qrCode: "invite/qrimage",
            updateWxUserInfo: "invite/userinfo",
            formId: "invite/formid"
        },
        userInfo: null,
        contractType: 0,
        qrCodeImg: "",
        token: "",
        openId: "",
        isOnLoadFail: !1,
        shareConfig: {
            title: "美团外卖15元新人红包，点击免费领取",
            content: "美团外卖15元新人红包，点击免费领取",
            picUrl: "https://www.dpfile.com/app/wm-mp-assets/share-redpacket-15-2.png?8c29dd81cdb078292f220a3388bdb540",
            path: ""
        },
        invitationUrl: "",
        remindContent: "我发给你的美团外卖新人红包用了吗？5折就能吃大餐！快去下单吧~http://dpurl.cn/n/kA",
        log: {
            channel_id: "",
            activity_type: 1,
            source_id: ""
        },
        showCount: 0,
        scenes: [ 1001, 1019, 1089 ]
    },
    formatUrl: function(t) {
        return t;
    },
    getHostByEnv: function() {
        return "qa" === this.data.env ? "https://promotion.waimai.test.sankuai.com" : "https://promotion-waimai.meituan.com";
    },
    getUrl: function(t) {
        return "" + this.getHostByEnv() + t;
    },
    showRemind: function() {
        this.setData({
            overlayType: o[0]
        });
    },
    showQrCode: function() {
        this.setData({
            overlayType: o[1]
        });
    },
    showTip: function() {
        this.setData({
            overlayType: o[2]
        });
    },
    hideOverlay: function() {
        this.setData({
            overlayType: ""
        });
    },
    updateBonusProcess: function() {
        var t = Math.floor(this.data.invitedNum), e = r[t = (t = t > r.length ? r.length - 1 : t) < 0 ? 0 : t];
        this.setData({
            bonusProcessWidth: e
        });
    },
    getFormId: function(t) {
        var e = t && t.detail && t.detail.formId;
        e && this.fetchFormId(e, this);
    },
    handleTapReload: function() {
        if (this.data.showRetry) {
            this.setData({
                showRetry: !1
            });
            var t = this.data.user;
            t.token ? (this.setData({
                token: t.token,
                openId: t.open_id
            }), this.getUserInfo()) : (this.setData({
                isOnLoadFail: !0
            }), this.goToLogin());
        }
    },
    handleTapInviteNow: function() {
        this.lxClickInviteBtn(this.data.log);
    },
    handleTapQrCode: function() {
        this.lxClickQrCodeBtn(this.data.log), this.fetchQrCode(this);
    },
    handleTapOverlay: function() {
        this.hideOverlay();
    },
    handleTapOverlayContent: function() {},
    handleTapQuestion: function() {
        this.showTip();
    },
    handleTapKnowledgeBtn: function() {
        this.hideOverlay();
    },
    handleTapStatusTip: function() {
        this.showRemind();
    },
    handleTapNotRemind: function() {
        this.hideOverlay();
    },
    handleTapToPaste: function() {
        var t = this;
        wx.setClipboardData({
            data: t.data.remindContent,
            success: function() {
                t.toast({
                    message: "文本复制成功，可直接去粘贴",
                    className: "invite-toast"
                }), t.hideOverlay();
            },
            fail: function() {
                t.toast({
                    message: "文本复制失败，请重试",
                    className: "invite-toast"
                });
            }
        });
    },
    handleTapViewMore: function() {
        this.goToWebView(this.getUrl("/invite/page/friendlist"), {
            path: "/pages/web-view/web-view?type=REDIRECT&scenes=" + this.data.scenes.toString() + "&redirectUrl=" + encodeURIComponent(this.formatUrl(this.data.invitationUrl))
        });
    },
    fetchFormId: function(a, n) {
        var i = this;
        return t(e.default.mark(function t() {
            var o;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return o = n.data.url.formId, t.next = 3, s({
                        url: o,
                        method: "POST",
                        data: {
                            formIds: a,
                            token: n.data.token
                        }
                    });

                  case 3:
                  case "end":
                    return t.stop();
                }
            }, t, i);
        }))();
    },
    fetchShare: function(a) {
        var n = this;
        return t(e.default.mark(function t() {
            var i, o;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = a.data.url.shareCard, t.next = 3, s({
                        url: i,
                        method: "GET",
                        data: {
                            ewxinfo: "",
                            token: a.data.token
                        }
                    });

                  case 3:
                    o = t.sent, (o = o || {}).data = o.data || {}, 0 === o.code ? n.setData({
                        invitationUrl: o.data.invitationUrl
                    }) : a.toast({
                        message: "获取分享信息失败",
                        className: "invite-toast"
                    });

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    },
    fetchQrCode: function(a) {
        var n = this;
        return t(e.default.mark(function t() {
            var i, o;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = a.data.url.qrCode, t.next = 3, s({
                        url: i,
                        method: "GET",
                        data: {
                            token: a.data.token
                        }
                    });

                  case 3:
                    (o = t.sent).data = o.data || {}, 0 === o.code && o.data.qrImgCode && (a.setData({
                        qrCodeImg: o.data.qrImgCode || ""
                    }), a.showQrCode());

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    },
    fetchInvitation: function(a) {
        var n = this;
        return t(e.default.mark(function t() {
            var i, o;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = a.data.url.invitation, t.next = 3, s({
                        url: i,
                        method: "GET",
                        data: {
                            ewxinfo: "",
                            sourceCode: 1,
                            token: a.data.token
                        }
                    });

                  case 3:
                    o = t.sent, (o = o || {}).data = o.data || {}, 0 === o.code ? (a.setData({
                        showMainContent: !0,
                        contractType: o.data.contractType || 0
                    }), a.render(o.data), o.data.hasWxUserInfo || a.fetchUpdateWxUserInfo(a)) : 1 === o.code ? 4 !== o.subcode && 7 !== o.subcode || a.goToLogin() : (a.toast({
                        message: "请求异常",
                        className: "invite-toast"
                    }), a.setData({
                        showRetry: !0
                    }));

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    },
    fetchUpdateWxUserInfo: function(a) {
        var n = this;
        return t(e.default.mark(function t() {
            var i, o, r, d, c, u, h;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = a.data.url.updateWxUserInfo, o = a.data.userInfo, r = o.nickName, d = o.avatarUrl, 
                    t.next = 5, s({
                        url: i,
                        method: "POST",
                        data: {
                            nickName: r,
                            avatarUrl: d,
                            openId: a.data.openId,
                            token: a.data.token
                        }
                    });

                  case 5:
                    c = t.sent, u = c.code, h = c.subcode, 1 === u && (4 !== h && 7 !== h || a.goToLogin());

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    },
    getUserInfo: function() {
        var a = this;
        return t(e.default.mark(function t() {
            var n, i;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, d();

                  case 3:
                    n = t.sent, (i = n.userInfo) ? (a.setData({
                        userInfo: i
                    }), a.fetchInvitation(a), a.fetchShare(a)) : a.goToLogin(), t.next = 11;
                    break;

                  case 8:
                    t.prev = 8, t.t0 = t.catch(0), a.goToLogin();

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, a, [ [ 0, 8 ] ]);
        }))();
    },
    render: function(t) {
        var e = this;
        this.loading(!1), this.setData({
            log: a({}, this.data.log, {
                activity_type: t.contractType ? 2 : 1,
                channel_id: t.channelIds || ""
            })
        }, function() {
            e.getReportData = function() {
                return {
                    cid: "c_ccdm5c7r",
                    val: a({}, e.data.log, {
                        custom: e.data.log
                    })
                };
            }, f();
        }), this.renderHeader(t), this.renderInfo(t);
        var n = this;
        t.inviteeList = t.inviteeList || [], t.inviteeList = t.inviteeList.map(function(t) {
            return t.headImgUrl = t.headImgUrl || n.data.img.defaultHeadImgUrl, t;
        }), this.renderList(t.inviteeList);
    },
    renderHeader: function(t) {
        0 === this.data.contractType ? this.setData({
            showNewVersion: !1
        }) : (this.setData({
            showNewVersion: !0,
            invitedNum: t.invitedNum || 0
        }), this.updateBonusProcess());
    },
    renderInfo: function(t) {
        this.setData({
            totalSalary: t.totalSalary || 0,
            invitedNum: t.invitedNum || 0,
            futureSalary: t.futureSalary || 0
        });
    },
    renderList: function(t) {
        this.setData({
            showListMore: t.length > 3,
            list: t.slice(0, 3)
        });
    },
    goToLogin: function() {
        wx.navigateTo({
            url: "../loginV2/login?login_page=3"
        });
    },
    goToWebView: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = this.data, n = a.token, i = a.shareConfig;
        this.updateWebview({
            webviewUrl: t,
            loginData: {
                token: n
            },
            baseData: {},
            shareConfig: {
                title: e.title || i.title,
                desc: e.desc || i.content,
                path: e.path || i.path,
                imageUrl: e.imageUrl || i.picUrl
            }
        }), wx.navigateTo({
            url: "/pages/web-view/web-view?type=DIRECT"
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return t.lxClickShare(t.data.log), {
            title: this.data.shareConfig.title,
            desc: this.data.shareConfig.content,
            path: "/pages/web-view/web-view?type=REDIRECT&scenes=" + this.data.scenes.toString() + "&redirectUrl=" + encodeURIComponent(this.formatUrl(this.data.invitationUrl)),
            imageUrl: this.data.shareConfig.picUrl,
            success: function() {
                t.lxClickShareSuccess(t.data.log);
            }
        };
    },
    onLoad: function(t) {
        var e = t.source_id, n = void 0 === e ? "" : e, i = t.lq_source, o = void 0 === i ? "" : i;
        this.setData({
            log: a({}, this.data.log, {
                source_id: n,
                lq_source: o
            })
        });
        var r = this.data.user;
        r.token ? (this.setData({
            token: r.token,
            openId: r.open_id
        }), this.getUserInfo()) : (this.setData({
            isOnLoadFail: !0
        }), this.goToLogin());
    },
    onShow: function() {
        var t = this.data, e = t.user, a = t.isOnLoadFail, n = t.showCount;
        this.setData({
            showCount: n + 1
        }), e && e.token && e.open_id && a ? (this.setData({
            token: e.token,
            openId: e.open_id,
            isOnLoadFail: !1
        }), this.data.userInfo || this.getUserInfo()) : 0 !== n && this.setData({
            showRetry: !0
        });
    }
};

(0, n.page)(c(v, p, u, h));