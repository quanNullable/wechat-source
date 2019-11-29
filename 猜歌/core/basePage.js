function e(e, t) {
    var n = {};
    for (var i in e) t.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
    return n;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
}, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = (require("../utils/weixinHelper.js"), require("../utils/common.js")), o = require("../api/systemApi.js"), a = require("../api/shareApi.js"), r = require("../utils/validator.js"), s = (require("../config/errorenum.js"), 
require("../config/urienum.js")), c = require("../utils/cacheHepler.js"), u = require("../utils/memoryHelper.js"), l = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/deepAssign.js"));

require("../config/appsetting.js"), require("../config/appsetting.js");

module.exports = {
    basePage: function(h) {
        var f = {
            shareoption: {
                title: null,
                image: null,
                titleField: "",
                imageField: "",
                path: "/pages/index/index",
                reLaunch: !1
            },
            showLoading: function(e, t) {
                wx.showLoading({
                    title: e
                });
            },
            hideLoading: function() {
                wx.hideLoading();
            },
            getMemory: u.getMemory,
            setMemory: u.setMemory,
            getCache: c.getCache,
            setCache: c.setCache,
            isValids: r.isValids,
            isEmpty: i.isEmpty,
            getLocalUser: c.getLocalUser,
            deepAssign: l.default,
            data: {
                imageBase: s.imageBase,
                videoBase: s.videoBase,
                isInitialize: !1
            }
        }, p = (h.withShareTicket, e(h, [ "withShareTicket" ])), d = {
            submitFormId: function(e) {
                try {
                    "object" == (void 0 === e ? "undefined" : n(e)) && e.detail && e.detail.formId ? (0, 
                    o.addFormId)(e.detail.formId) : "string" == typeof e && (0, o.addFormId)(e);
                } catch (e) {
                    console.log("add form id error ", e);
                }
            },
            navigateSubmit: function(n) {
                this.submitFormId(n);
                var o = n.currentTarget.dataset, a = o.type, r = void 0 === a ? "navigateTo" : a, s = o.url, c = e(o, [ "type", "url" ]);
                wx.hasOwnProperty(r) && !(0, i.isEmpty)(s) && wx[r](t({
                    url: s
                }, c));
            },
            updateSubmit: function(n) {
                this.submitFormId(n);
                var o = n.currentTarget.dataset, a = o.primary, r = (e(o, [ "primary" ]), {});
                a.split(";").forEach(function(e) {
                    var t = e.split("="), n = t[1];
                    "true" == n ? n = !0 : "false" == n && (n = !1), r[t[0]] = n;
                }), (0, i.isEmpty)(r) || this.setData(t({}, r));
            },
            navigate2Mini: function(e) {
                console.log("navigate2Mini");
                var t = e.currentTarget.dataset, n = t.type, i = t.appid, o = t.path, a = t.extardata, r = t.version, s = n;
                1 == s || (2 == s ? wx.navigateToMiniProgram({
                    appId: i,
                    path: o,
                    extarData: {
                        channel: a,
                        data: a
                    },
                    envVersion: r,
                    success: function(e) {}
                }) : 3 == s && wx.navigateTo({
                    url: "../ad/ad"
                }));
            },
            listenNetwork: function() {
                var e = this, t = function(t) {
                    if ("none" == t.networkType) {
                        e.notification ? e.notification.showToast("当前网络状态不佳，可能会影响您体验") : wx.showToast({
                            title: "当前网络状态不佳，可能会影响您体验",
                            icon: "none",
                            duration: 4e3
                        });
                    }
                };
                wx.getNetworkType({
                    success: function(e) {
                        t(e);
                    },
                    complete: function() {
                        wx.onNetworkStatusChange(function(e) {
                            t(e);
                        });
                    }
                });
            },
            checkVersion: function() {
                var e = wx.getUpdateManager();
                e.onCheckForUpdate(function(t) {
                    t.hasUpdate && that.notification.showDialog("发现新版本", {
                        showCancel: !1,
                        confirmText: "使用最新版本",
                        onConfirm: function() {
                            e.applyUpdate();
                        }
                    });
                }), e.onUpdateReady(function() {
                    that.notification.showDialog("新版本已经准备好，是否重启应用？", {
                        showCancel: !1,
                        onConfirm: function() {
                            e.applyUpdate();
                        }
                    });
                }), e.onUpdateFailed(function() {});
            },
            onLoad: function(e) {
                var n = this;
                this.selectComponent && null == this.notification && (this.notification = this.selectComponent("#notification")), 
                this.listenNetwork(), this.checkVersion(), (0, u.registerLoadUserCallback)(function() {
                    (0, i.isFunction)(h.onInit) && h.onInit.call(n, t({}, e)), n.setData({
                        isInitialize: !0
                    });
                });
            },
            onReady: function(e) {
                this.selectComponent && null == this.notification && (this.notification = this.selectComponent("#notification")), 
                (0, i.isFunction)(h.onReady) && h.onReady.call(this, e);
            },
            onShow: function(e) {
                (0, i.isFunction)(h.onPageShow) && h.onPageShow.call(this, e);
            },
            reLaunch2Index: function() {
                this.shareoption.reLaunch && (!(0, i.isFunction)(this.shareoption.onBeforeLaunch) || (0, 
                i.isFunction)(this.shareoption.onBeforeLaunch) && 0 != this.shareoption.onBeforeLaunch.call(this)) && wx.reLaunch({
                    url: "../index/index"
                });
            },
            addShareCount: function(e) {
                var t = this;
                (0, a.addShare)(e, function(e) {
                    (0, i.isFunction)(t.shareoption.onCompleted) && t.shareoption.onCompleted.call(t), 
                    1 == e.code ? 1 == e.number ? t.notification.showDialog("分享成功", {
                        showCancel: !1,
                        onConfirm: function() {
                            t.reLaunch2Index();
                        },
                        onCancel: function() {
                            t.reLaunch2Index();
                        }
                    }) : 0 == e.number ? t.notification.showDialog("今日分享次数已经用完啦", {
                        showCancel: !1,
                        onConfirm: function() {
                            t.reLaunch2Index();
                        }
                    }) : 0 == e.data.number && 0 == e.data.code && t.notification.showDialog("此群已经收到了您的邀约，去约其他群的朋友一起学习吧", {
                        showCancel: !1,
                        onConfirm: function() {}
                    }) : t.notification.showDialog("糟糕，好像出了点问题", {
                        showCancel: !1,
                        onConfirm: function() {}
                    });
                });
            },
            onShareAppMessage: function(e) {
                var n = this, o = (0, u.getMemoryShareOption)();
                wx.showShareMenu({
                    withShareTicket: !0
                }), (0, i.isFunction)(n.onBeforeShare) && n.onBeforeShare(e);
                var a = "我发现了一个有趣小程序，赶紧来看看吧", r = null;
                return (0, i.isEmpty)(o) || (a = o[n.shareoption.titleField], r = o[n.shareoption.imageField], 
                (0, i.isEmpty)(a) && (a = "我发现了一个有趣小程序，赶紧来看看吧"), (0, i.isEmpty)(r) && (r = null)), 
                {
                    title: a,
                    path: n.shareoption.path,
                    imageUrl: r,
                    success: function(o) {
                        var a = o.shareTickets;
                        a[a.length - 1];
                        (0, i.isFunction)(n.onAfterShare) && n.onAfterShare(t({}, e, {
                            shareTickets: a
                        }));
                    },
                    fail: function(e) {}
                };
            },
            onPullDownRefresh: function(e) {
                var t = this;
                t.setData({
                    page: 1
                }), console.log("onPullDownRefresh"), (0, i.isFunction)(h.onRefresh) && h.onRefresh.call(t, e), 
                wx.stopPullDownRefresh();
            }
        };
        return (0, l.default)(f, p, d);
    }
};