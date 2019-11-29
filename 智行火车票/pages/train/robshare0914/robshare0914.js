function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    u.default.showModal({
        m: "亲爱的好友，如果不授权，就无法为我加速哦",
        confirmText: "好吧"
    });
}

function a() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.shareKey, a = void 0 === t ? "" : t, n = e.reqTime, o = void 0 === n ? "" : n, i = e.openId, s = void 0 === i ? "" : i, r = e.accPackageId, u = "" + a + o + s + (void 0 === r ? "" : r) + "7Ki9Xtdz2wyZKfoW";
    return c.default.MD5(u).toString();
}

function n() {
    var e = u.default.getDeferred();
    return o(function() {
        u.default.showModal({
            m: "APP下载链接已复制到剪贴板,打开浏览器粘贴链接即可下载",
            confirmText: "ok"
        }), e.resolve();
    }), e.promise;
}

function o(e) {
    var t = s.cwx.config.isTieyou ? "t.ctrip.cn/erfn3b" : "suanya.cn/train";
    s.cwx.setClipboardData ? s.cwx.setClipboardData({
        data: t,
        success: function(t) {
            e && e();
        }
    }) : u.default.showModal({
        m: "APP下载链接为" + t + ",打开浏览器输入链接即可下载"
    });
}

function i(e) {
    (0, d.saveUserFormID)(e.detail.formId, "1001");
}

var s = require("../../../cwx/cwx"), c = e(require("../../../3rd/crypto-js/crypto-js")), r = require("../common/model"), u = (e(require("../common/cDate")), 
e(require("../common/util"))), h = e(require("../common/common")), d = require("../common/service"), l = require("../common/components/toast/toast"), g = (require("../common/store"), 
require("../../../pages/accounts/common.js"), s.cwx.train, (0, l.trainToast)()), f = {
    share: 1,
    award: 2,
    share0503: 3
}, w = {
    pageId: s.cwx.config.isTieyou ? "10320669404" : "10320669091",
    data: {
        sharePic: "",
        arriveStation: "",
        departureStation: "",
        trainNum: "",
        statusDesc: "",
        speedLevelName: "",
        nextLevel: "",
        lightningLevel: 0,
        passengerCount: 0,
        flowPacketCount: 0,
        btnType: 0,
        acceState: 0,
        sharedRecords: [],
        accPackageId: 0,
        partnerCN: s.cwx.config.partnerCN,
        accePackages: null,
        showMask: "",
        curPkgIdx: 0,
        lottery: {
            isRunning: !1
        },
        isShowAll: !1,
        isTieyou: s.cwx.config.isTieyou,
        getPackageType: 0,
        canOpenTypeUserInfo: wx.canIUse && wx.canIUse("button.open-type.getUserInfo"),
        canShare: wx.canIUse && wx.canIUse("button.open-type.share"),
        canRichText: wx.canIUse && wx.canIUse("rich-text"),
        isGetUserInfoFailed: !1,
        preparePercent: 0,
        isDownloadClicked: !1,
        isShared: 2,
        isHotelNewGuest: 1,
        isFlightNewGuest: 1,
        isIOS: "",
        speedLevels: [],
        newGuestCouponGeted: !1,
        isSharedForPackage: 0,
        newPointGuest: -1,
        newPointShareType: null,
        balloonTxt: "",
        availablePoint: 0,
        isCanGetNewGuestGift: !1,
        isLogin: !1
    },
    onLoad: function(e) {
        var t = this;
        u.default.setTitle(s.cwx.config.partnerCN + "火车票抢票神器");
        var a = wx.getSystemInfoSync().system || "";
        (a = a.toLowerCase()).indexOf("android") > -1 ? this.setData({
            isIOS: !1
        }) : this.setData({
            isIOS: !0
        }), this.shareKey = u.default.getMidFromScene(e.scene), e.allianceid || (s.cwx.config.isTieyou ? s.cwx.mkt.setUnion({
            allianceid: 653997,
            sid: 1181398
        }) : s.cwx.mkt.setUnion({
            allianceid: 653998,
            sid: 1181385
        })), this.acceImm = !0, (0, d.GetShareImg)().then(function(e) {
            t.shareImgs = e;
        }), (0, d.GetSpeedLvlName)().then(function(e) {
            t.setData({
                speedLevels: e
            });
        }), this.getBallonTxt();
    },
    onShow: function() {
        var e = this;
        h.default.getOpenId().then(function(t) {
            e.data.getPackageType ? s.cwx.user.isLogin() ? (e.getPackage(e.data.getPackageType), 
            e.setData({
                getPackageType: 0
            })) : (e.setData({
                showMask: ""
            }), e.logPackage(2), e.getAcceList()) : e.getAcceList().then(function() {
                e.acceImm && 1 === e.data.btnType && (e.acceImm = !1, e.onAcceRate());
            });
        }), s.cwx.mkt.getUnion(function(t) {
            e.unionData = t;
        }), s.cwx.user.isLogin() ? (this.getUserPointInfo(), this.getNewGuestCouponStatus(), 
        this.setData({
            isLogin: !0
        })) : this.setData({
            isLogin: !1
        });
    },
    onUnLoad: function() {
        this.timeoutId && clearTimeout(this.timeoutId);
    },
    getAcceList: function() {
        var e = this;
        this.showTrainLoading();
        var t = {
            shareKey: this.shareKey,
            openId: s.cwx.user.openid,
            reqTime: "" + new Date().getTime(),
            partner: s.cwx.config.partner
        };
        t.sign = a(t);
        return (0, d.GetGrabOrderShareInfoPromise)(t).then(function(t) {
            if (1 == t.resultCode) {
                var a = t.arriveStation, n = void 0 === a ? "" : a, o = t.departureStation, i = void 0 === o ? "" : o, s = t.trainNum, c = void 0 === s ? "" : s, r = t.statusDesc, u = void 0 === r ? "" : r, h = t.speedLevelName, d = void 0 === h ? "" : h, l = t.speedLevelDesc, g = t.lightningLevel, w = void 0 === g ? 0 : g, p = t.passengerCount, m = void 0 === p ? 0 : p, v = t.isShared, P = void 0 === v ? 0 : v, k = t.isShared, T = t.sharedRecords, S = t.flowPacketCount, I = void 0 === S ? 0 : S, x = t.btnType, y = void 0 === x ? 0 : x, b = t.isHotelNewGuest, D = void 0 === b ? 1 : b, C = t.isFlightNewGuest, L = void 0 === C ? 1 : C, G = t.pointCount, A = void 0 === G ? 0 : G, U = t.newPointGuest, M = void 0 === U ? 1 : U, N = t.newPointShareType, F = void 0 === N ? {
                    status: -1
                } : N;
                T.forEach(function(e) {
                    try {
                        e.passagePhotoUrl || (e.passagePhotoUrl = "https://images4.c-ctrip.com/target/t1/headphoto/646/318/109/a865fe5f5465407d8befd5dc487a8554_C_180_180.jpg"), 
                        e.passageName = decodeURIComponent(e.passageName);
                    } catch (e) {
                        console.log(e);
                    }
                }), e.data.canRichText || (l = l.replace(/<span([^>]*)>([^<]*)<\/span>/gi, "$2")), 
                0 === y && 1 == k && (e.shareCallback = function() {
                    e.logPackage(0), e.setData({
                        isSharedForPackage: 1
                    }), e.getPackage(f.share0503), e.shareCallback = e.noop;
                }), e.setData({
                    arriveStation: n,
                    departureStation: i,
                    trainNum: c,
                    statusDesc: u,
                    speedLevelName: d,
                    nextLevel: l,
                    lightningLevel: w,
                    passengerCount: m,
                    acceState: P,
                    sharedRecords: T,
                    flowPacketCount: I,
                    btnType: y,
                    pointCount: A,
                    isShared: k,
                    isHotelNewGuest: D,
                    isFlightNewGuest: L,
                    newPointShareType: F,
                    newPointGuest: -1 == e.data.newPointGuest ? M : e.data.newPointGuest
                });
            } else e.setData({
                acceState: -1
            }), e.setData({
                showMask: "failed-repair"
            });
            e.hideTrainLoading();
        }).catch(function() {
            e.setData({
                showMask: "failed-repair"
            }), e.hideTrainLoading();
        });
    },
    getAccePkgList: function(e) {
        var t = this, a = {
            ChannelName: s.cwx.config.partner
        };
        this.showTrainLoading(), (0, r.GetAcceleratePackageListInfoModel)(a, function(a) {
            if (t.hideTrainLoading(), 0 == a.ResultCode) {
                var n = [];
                n.push(a.AccePackageTable.PackageTable_A), n.push(a.AccePackageTable.PackageTable_B), 
                n.push(a.AccePackageTable.PackageTable_C), n.push(a.AccePackageTable.PackageTable_F), 
                n.push(a.AccePackageTable.PackageTable_E), n.push(a.AccePackageTable.PackageTable_D), 
                t.setData({
                    accePackages: n
                }), e && e();
            }
        }, function(e) {
            console.log("err", e), t.showTrainToast("系统异常");
        }, function() {});
    },
    getUserInfo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, a = wx.getStorageSync("USERINFO");
        if (a) e(a); else {
            var n = this;
            s.cwx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(t) {
                            n.setData({
                                isGetUserInfoFailed: !1
                            }), wx.setStorageSync("USERINFO", t.userInfo), e(t.userInfo);
                        },
                        fail: function(e) {
                            n.setData({
                                isGetUserInfoFailed: !0
                            }), t();
                        }
                    });
                },
                fail: function() {
                    n.setData({
                        isGetUserInfoFailed: !0
                    }), t();
                }
            });
        }
    },
    onAcceRate: function() {
        var e = this;
        this.getUserInfo(function() {
            e.openLottery.apply(e, arguments);
        }, function() {
            t();
        });
    },
    buyTicket: function() {
        s.cwx.reLaunch({
            url: "/pages/train/index/index?savetohome=1"
        });
    },
    acceAfterUserInfo: function(e) {
        var a = this;
        e && e.detail && e.detail.userInfo ? (this.setData({
            isGetUserInfoFailed: !1
        }), s.cwx.user.openid ? this.onAcceRate() : h.default.getOpenId().then(function(e) {
            a.onAcceRate();
        })) : (this.setData({
            isGetUserInfoFailed: !0
        }), t());
    },
    getPackage: function(e) {
        var t = this;
        if (!s.cwx.user.isLogin()) return t.setData({
            getPackageType: e
        }), void s.cwx.user.login({
            callback: function(e) {}
        });
        this.showTrainLoading();
        var a = {
            shareKey: this.shareKey,
            partner: s.cwx.config.partner,
            openId: s.cwx.user.openid,
            isShared: this.data.isSharedForPackage,
            key: function() {
                switch (e) {
                  case f.share0503:
                    return t.data.newPointShareType.key;

                  default:
                    return "";
                }
            }()
        };
        return (0, d.AcquireSpeedPointPromise)(a).then(function(a) {
            if (t.hideTrainLoading(), 1 == a.resultCode) {
                var n = a.newPointShareType, o = void 0 === n ? {
                    status: t.data.newPointShareType.status
                } : n;
                if (e === f.share0503 && 1 == a.newPointShareType.status && (t.logPackage(1), t.setData({
                    showMask: "geted",
                    newPointShareType: o
                }), s.cwx.user.isLogin())) return t.getUserPointInfo();
                if (e === f.share0503 && 2 == a.newPointShareType.status) return t.getPackage(e);
            } else t.setData({
                showMask: "failed-repair"
            });
        }).catch(function(e) {
            t.setData({
                showMask: "failed-repair"
            }), t.hideTrainLoading();
        });
    },
    openLottery: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        s.cwx.user.openid && this.getAccePkgList(function() {
            e.showTrainLoading();
            var n = {
                reqTime: "" + new Date().getTime(),
                shareKey: e.shareKey,
                openId: s.cwx.user.openid,
                passageName: encodeURIComponent(t.nickName),
                passagePhotoUrl: t.avatarUrl,
                contactMobile: s.cwx.user.userName,
                partner: s.cwx.config.partner
            };
            n.sign = a(n), (0, r.CalculateAcceleratePackageModel)(n, function(t) {
                if (e.hideTrainLoading(), 1 == t.resultCode) {
                    var a = void 0;
                    switch (t.tableNum) {
                      case "A":
                      case "a":
                        a = 0;
                        break;

                      case "B":
                      case "b":
                        a = 1;
                        break;

                      case "C":
                      case "c":
                        a = 2;
                        break;

                      case "D":
                      case "d":
                        a = 5;
                        break;

                      case "E":
                      case "e":
                        a = 4;
                        break;

                      case "F":
                      case "f":
                        a = 3;
                        break;

                      default:
                        a = -1;
                    }
                    if (-1 === a) return void u.default.showModal({
                        m: "您已经抽过奖啦"
                    });
                    e.setData({
                        showMask: "lottery",
                        accPackageId: t.accPackageId
                    }), e.startLottery(a).then(function() {
                        return s.cwx.user.isLogin() && e.getUserPointInfo(), e.getAcceList(), e.setTimeout(function() {
                            e.setData({
                                showMask: e.data.newPointGuest ? "old-acce" : "new-acce"
                            });
                        }, 1e3);
                    });
                } else u.default.showModal({
                    m: t.resultMessage
                });
            }, function(t) {
                e.hideTrainLoading();
            });
        });
    },
    startLottery: function(e) {
        function t() {
            setTimeout(function() {
                0 == h ? r = 1 : h < 10 ? a() : h < 30 ? n() : o(h), h++, c.data.lottery.isRunning && t();
            }, 1e3 / r);
        }
        function a() {
            r < 50 && (r += 2), i();
        }
        function n() {
            i();
        }
        function o(t) {
            r > 10 ? (r -= 2, i()) : e === c.data.curPkgIdx ? (c.setData({
                lottery: {
                    isRunning: !1
                }
            }), s.resolve()) : i();
        }
        function i() {
            c.setData({
                curPkgIdx: (c.data.curPkgIdx + 1) % d
            });
        }
        var s = u.default.getDeferred(), c = this, r = 1e4, h = 0, d = this.data.accePackages.length;
        return this.setData({
            curPkgIdx: -1,
            lottery: {
                isRunning: !0
            }
        }), t(), s.promise;
    },
    hideBackdrop: function() {
        "lottery" !== this.data.showMask && "old-acce" !== this.data.showMask && this.setData({
            showMask: ""
        });
    },
    showPost: function() {
        var e = this, t = this;
        this.showTrainLoading();
        var a = {
            ShareKey: this.shareKey,
            RequestId: s.cwx.user.openid,
            ReqTime: "" + new Date().getTime(),
            Partner: s.cwx.config.partner,
            FromStation: this.data.departureStation,
            ToStation: this.data.arriveStation,
            PassagePhotoUrl: "",
            channel: s.cwx.config.config2
        };
        a.sign = c.default.MD5("" + a.ReqTime + a.RequestId + a.ShareKey + "s7Ki9Xtdz2wyZKfoW").toString(), 
        (0, r.GetShareImgForTZModel)(a, function(t) {
            e.hideTrainLoading(), console.log(t);
        }, function(t) {
            e.hideTrainLoading();
        }), t.setData({
            showMask: "post",
            sharePic: ""
        });
    },
    savePost: function(e) {
        var t = this, a = e.currentTarget.dataset.url || "";
        wx.downloadFile({
            url: a,
            success: function(e) {
                console.log("*********** 下载海报图片 - 成功 ************"), console.log(e), t.setData({
                    downloadTempPath: e.tempFilePath
                }), t.saveSharePic();
            },
            fail: function(e) {
                console.log("*********** 下载海报图片 - 失败 ************"), console.log(e), u.default.showToast("图片下载失败，错误信息： " + e.errMsg);
            }
        });
    },
    saveSharePic: function() {
        var e = this;
        wx.saveImageToPhotosAlbum && s._.isFunction(wx.saveImageToPhotosAlbum) ? wx.saveImageToPhotosAlbum({
            filePath: e.data.downloadTempPath,
            success: function(t) {
                console.log("*********** 保存海报图片 - 成功 ************"), console.log(t), e.showToast("已保存到相册系统"), 
                e.hideBackdrop();
            },
            fail: function(t) {
                console.log("*********** 保存海报图片 - 失败 ************"), console.log(t), e.reopenAuth();
            }
        }) : wx.showModal({
            title: "提示",
            content: "客户端版本较低，暂不支持保存图片至相册系统，建议截图保存，或升级后重试",
            showCancel: !1,
            success: function(e) {}
        });
    },
    reopenAuth: function() {
        var e = this, t = !1;
        wx.getSetting({
            success: function(a) {
                void 0 == (t = a.authSetting["scope.writePhotosAlbum"]) ? (console.log("*************** 相册授权undefined *****************"), 
                e.hideBackdrop()) : 0 == t ? (console.log("*************** 相册未授权 *****************"), 
                wx.showModal({
                    title: "提示",
                    content: "相册系统未授权，请重新授权并保存图片",
                    success: function(t) {
                        t.confirm ? wx.openSetting({
                            success: function(t) {
                                t.authSetting["scope.writePhotosAlbum"] ? (console.log("*************** 相册重新授权 - 成功 *****************"), 
                                e.saveSharePic()) : (console.log("*************** 相册重新授权 - 失败 *****************"), 
                                e.hideBackdrop());
                            }
                        }) : e.hideBackdrop();
                    }
                })) : (console.log("*************** 相册已授权 *****************"), e.saveSharePic());
            }
        });
    },
    showAllRecords: function() {
        this.setData({
            isShowAll: !this.data.isShowAll
        });
    },
    onShareAppMessage: function() {
        var e = this;
        return u.default.getRobShareObj({
            shareKey: this.shareKey,
            arriveStation: this.data.arriveStation,
            allianceid: this.unionData.allianceid,
            sid: this.unionData.sid,
            shareImgs: this.shareImgs,
            success: function() {
                s._.isFunction(e.shareCallback) && e.shareCallback();
            }
        });
    },
    download: function() {
        var e = this;
        n().then(function() {
            e.setData({
                isDownloadClicked: !0
            });
        });
    },
    showDownloadToast: function() {
        var e = this;
        o(function() {
            e.showTrainToast("已复制", "ok");
        });
    },
    noop: function() {},
    setTimeout: function(e) {
        function t() {
            return e.apply(this, arguments);
        }
        return t.toString = function() {
            return e.toString();
        }, t;
    }(function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, a = u.default.getDeferred();
        return this.timeoutId = setTimeout(function() {
            e(), a.resolve();
        }, t), a.promise;
    }),
    logPackage: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
        this.ubtMetric({
            name: 101597,
            value: e
        }), this.ubtTrace(101989, {
            c: e
        });
    },
    shareSubmit: i,
    rewardsSubmit: i,
    buyTicketSubmit: i,
    hideBackdropSubmit: function(e) {
        this.hideBackdrop(), i(e);
    },
    showUserTips: function() {
        this.setData({
            showMask: "user-tips"
        });
    },
    hit: function() {
        this.setData({
            showMask: "failed-mercy"
        });
    },
    getBallonTxt: function() {
        var e = this, t = {
            ConfigKey: "tieyou_wx_robshare_btntag"
        };
        (0, d.GetConfigInfoPromise)(t).then(function(t) {
            t.ConfigInfo && t.ConfigInfo.Content && e.setData({
                balloonTxt: t.ConfigInfo.Content
            });
        }).catch(function() {});
    },
    getUserPointInfo: function() {
        var e = this;
        return (0, d.GetUserPointInfoPromise)().then(function(t) {
            if (1 == t.resultCode) return e.setData({
                availablePoint: t.AvailablePoint
            }), t.AvailablePoint;
        });
    },
    getNewGuestCouponStatus: function() {
        var e = this;
        return (0, d.GetHotelAndFlightNewGuestCouponStatusPromise)({}).then(function(t) {
            if (1 == t.resultCode) {
                var a = t.isHotelNewGuest, n = t.isFlightNewGuest, o = !a || !n;
                e.setData({
                    isCanGetNewGuestGift: o
                });
            }
        }).catch(function(e) {
            console.error(e);
        });
    },
    getNewGuestCoupon: function() {
        this.navigateTo({
            url: "../newguestgifts/newguestgifts?type=1"
        });
    },
    giveUpCoupon: function() {
        this.hideBackdrop(), this.shareCallback = this.noop, this.getPackage(f.share0503);
    }
};

Object.assign(w.data, g.data), Object.keys(g.methods).forEach(function(e) {
    w[e] = g.methods[e];
}), (0, s.CPage)(w);