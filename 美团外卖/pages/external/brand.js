function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function a(r, i) {
                try {
                    var o = e[r](i), s = o.value;
                } catch (t) {
                    return void n(t);
                }
                if (!o.done) return Promise.resolve(s).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(s);
            }
            return a("next");
        });
    };
}

function e(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../actions/recipient.js"), i = require("../../utils/promise-try.js"), o = require("../../utils/wait.js"), s = require("../../utils/object-assign.js"), c = require("../../utils/image-scale.js"), u = require("../../api/wx.js").getLocation, l = require("../../utils/get-nearest-address.js"), d = require("../base.js"), p = {
    292: {},
    267: {
        banners: [ {
            pic_url: "http://p1.meituan.net/dptakeaway/ec369a19e4a4501406aeacbdc858af85298560.png"
        } ]
    },
    1015: {
        banners: [ {
            pic_url: "http://p1.meituan.net/dptakeaway/bbf6d600a64f9768bdbc501270d57d50478628.png"
        } ]
    }
}, f = {
    mapStateToData: function(t) {
        var e = t.recipient.address, n = t.user.token;
        return {
            locName: e,
            hasLogin: Boolean(n)
        };
    },
    mapDispatchToPage: function(t) {
        return {
            setRecipient: function(e) {
                return t((0, r.set)(e));
            },
            partialRecipient: function(e) {
                return t((0, r.partial)(e));
            }
        };
    },
    data: {
        locState: "loading",
        has_more: !1,
        poi_list: [],
        no_result: !1,
        banners: []
    },
    brand_id: 0,
    page_index: 0,
    onClickPoi: function(t) {
        var e = t.currentTarget.dataset.poi, n = t.target.dataset.spu;
        n ? wx.navigateTo({
            url: "/pages/restaurant/restaurant?poi_id=" + e + "&spu_id=" + n
        }) : wx.navigateTo({
            url: "/pages/restaurant/restaurant?poi_id=" + e
        });
    },
    onClickPoilistActvs: function(t) {
        var n = t.currentTarget.dataset.index, a = this.data.poi_list[n]._actvs_expand;
        this.setData(e({}, "poi_list[" + n + "]._actvs_expand", !a));
    },
    load: function(e) {
        var a = this;
        return t(n.default.mark(function t() {
            var r, i, o, u, l, d, f, h, g, v;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, e || a.data.has_more) {
                        t.next = 3;
                        break;
                    }
                    return t.abrupt("return");

                  case 3:
                    return t.next = 5, a.api.brandPoiList({
                        brand_id: a.brand_id,
                        page_index: e ? 0 : a.page_index
                    });

                  case 5:
                    r = t.sent, i = p[a.brand_id], o = s({}, i, r), u = o.has_more, l = o.poi_list, 
                    d = o.brand_name, f = o.banners, a.page_index = e ? 1 : a.page_index + 1, l.forEach(function(t) {
                        t.pic_url = c(t.pic_url, 186, 140, 80), t.rcmd_products.forEach(function(t) {
                            t.pic = c(t.pic, 150, 150, 80);
                        });
                    }), h = f && f.map(function(t) {
                        return s({}, t, {
                            pic_url: c(t.pic_url, 750, 300, 60)
                        });
                    }), g = e ? l : a.data.poi_list.concat(l), d && a.setNavigationBarTitle({
                        title: "美团外卖·" + d
                    }), a.setData({
                        banners: h,
                        has_more: u,
                        poi_list: g,
                        no_result: 0 === g.length
                    }), t.next = 20;
                    break;

                  case 16:
                    t.prev = 16, t.t0 = t.catch(0), v = t.t0.message, a.error({
                        message: v,
                        textOK: "查看更多商家",
                        ok: function() {
                            wx.switchTab({
                                url: "/pages/index/index"
                            });
                        }
                    });

                  case 20:
                  case "end":
                    return t.stop();
                }
            }, t, a, [ [ 0, 16 ] ]);
        }))();
    },
    onReachBottom: function() {
        this.load();
    },
    onUnload: function() {
        var t = getApp().eventBus;
        t.off("user:logout", this.reload), t.off("user:login", this.reload), t.off("location:changed", this.locChanged);
    },
    _onLoad: function() {
        var e = this;
        return t(n.default.mark(function a() {
            var r, i, o, s, c, u, d, p, f, h, g, v, x, m;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (r = getApp(), i = r.eventBus, o = function() {
                        var a = t(n.default.mark(function t() {
                            return n.default.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                  case 0:
                                    return e.loading(!0), t.next = 3, e.load(!0);

                                  case 3:
                                    e.loading(!1);

                                  case 4:
                                  case "end":
                                    return t.stop();
                                }
                            }, t, e);
                        }));
                        return function() {
                            return a.apply(this, arguments);
                        };
                    }(), e.reload = o, s = function() {
                        e.setData({
                            locState: "done"
                        }), o();
                    }, e.locChanged = s, i.on("user:logout", o), i.on("user:login", o), i.on("location:changed", s), 
                    c = e.store.getState(), u = c.wx, d = u.latitude, p = u.longitude, e.loading(!0), 
                    f = !1, !(h = e.data.hasLogin)) {
                        a.next = 25;
                        break;
                    }
                    return g = null, a.prev = 14, a.next = 17, e.api.addrGet({
                        type: 1
                    });

                  case 17:
                    v = a.sent, g = l(d, p, v), a.next = 24;
                    break;

                  case 21:
                    a.prev = 21, a.t0 = a.catch(14), console.error(a.t0);

                  case 24:
                    g && (e.setRecipient(g), f = !0);

                  case 25:
                    if (f) {
                        a.next = 38;
                        break;
                    }
                    return x = "", a.prev = 27, a.next = 30, e.api.posname();

                  case 30:
                    m = a.sent, x = m.result, a.next = 37;
                    break;

                  case 34:
                    a.prev = 34, a.t1 = a.catch(27), console.error(a.t1);

                  case 37:
                    x && (e.partialRecipient({
                        address: x,
                        latitude: d,
                        longitude: p
                    }), f = !0);

                  case 38:
                    if (!f) {
                        a.next = 44;
                        break;
                    }
                    return e.setData({
                        locState: "done"
                    }), a.next = 42, e.load(!0);

                  case 42:
                    a.next = 46;
                    break;

                  case 44:
                    e.setData({
                        locState: "false"
                    }), e.error({
                        message: "无法获取地址，请手动定位",
                        textOK: "设置地址",
                        ok: function() {
                            wx.navigateTo({
                                url: "../loc-select/loc-select"
                            });
                        }
                    });

                  case 46:
                    e.loading(!1);

                  case 47:
                  case "end":
                    return a.stop();
                }
            }, a, e, [ [ 14, 21 ], [ 27, 34 ] ]);
        }))();
    },
    locationRetrying: !1,
    locationError: function() {
        var e = this, a = this.locationRetrying;
        if (this.data.locationEnabled) this.error(); else {
            var r = this.onClickTryLocaton;
            r || (this.onClickTryLocaton = r = function() {
                var a = t(n.default.mark(function t() {
                    return n.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.next = 2, e.locationObtain();

                          case 2:
                            e.onShow();

                          case 3:
                          case "end":
                            return t.stop();
                        }
                    }, t, e);
                }));
                return function() {
                    return a.apply(this, arguments);
                };
            }()), this.error({
                message: a ? "正在尝试获取地址..." : "无法获取地址，请打开定位权限，然后点击重试",
                textOK: a ? "正在获取地址" : "点击尝试获取地址",
                ok: r
            });
        }
    },
    locationPrompting: !1,
    locationPrompt: function() {
        var e = this;
        this.locationPrompting || (this.locationPrompting = !0, wx.getLocation({
            success: function() {
                e.locationPrompting = !1;
            },
            fail: function(a) {
                var r = wx.openSetting;
                a && a.errMsg && -1 !== a.errMsg.toLowerCase().indexOf("auth") && (r ? e.confirm({
                    message: "检测到您没打开美团外卖的定位权限，是否去设置打开？",
                    ok: function() {
                        e.locationPrompting = !1, r({
                            success: function() {
                                var a = t(n.default.mark(function t(a) {
                                    var r = a.authSetting["scope.userLocation"];
                                    return n.default.wrap(function(t) {
                                        for (;;) switch (t.prev = t.next) {
                                          case 0:
                                            if (!r) {
                                                t.next = 4;
                                                break;
                                            }
                                            return t.next = 3, e.locationObtain();

                                          case 3:
                                            e.onShow();

                                          case 4:
                                          case "end":
                                            return t.stop();
                                        }
                                    }, t, e);
                                }));
                                return function(t) {
                                    return a.apply(this, arguments);
                                };
                            }()
                        });
                    },
                    cancel: function() {
                        e.locationPrompting = !1;
                    }
                }) : e.alert({
                    message: "检测到您没打开美团外卖的定位权限，请到设置启用：点击右上角按钮，进入小程序介绍页，再次点击右上角按钮，进入设置页面，打开定位权限",
                    ok: function() {
                        e.locationPrompting = !1;
                    }
                }));
            }
        }));
    },
    locationTest: function() {
        var t = this.store.getState().wx, e = t.latitude, n = t.longitude, a = 0 !== e && 0 !== n;
        a || (this.hasGuideLocation = !0, this.locationPrompt()), this.setData({
            locationEnabled: a
        });
    },
    locationObtain: function() {
        var e = this;
        return t(n.default.mark(function t() {
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.locationRetrying = !0, e.locationError(), t.next = 4, i([ u(), o(1e3) ]);

                  case 4:
                    e.locationRetrying = !1, e.locationTest(), e.locationError();

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    hasCallOnLoad: !1,
    hasGuideLocation: !1,
    onShow: function() {
        if (this.locationTest(), !this.data.locationEnabled) return this.loading(!1), void this.locationError();
        this.hasCallOnLoad ? this._onShow && this._onShow() : this._onLoad(), this.hasCallOnLoad = !0;
    },
    onLoad: function(t) {
        var e = t.brand_id;
        this.brand_id = e;
        var n = this.store.getState().dev.env;
        n && this.toast({
            message: "当前环境" + n
        }), this.locationTest();
    }
};

(0, a.page)(d(f));