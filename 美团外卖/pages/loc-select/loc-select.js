function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, a) {
            function s(n, i) {
                try {
                    var o = t[n](i), c = o.value;
                } catch (e) {
                    return void a(e);
                }
                if (!o.done) return r.resolve(c).then(function(e) {
                    s("next", e);
                }, function(e) {
                    s("throw", e);
                });
                e(c);
            }
            return s("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../npm/@hfe/mp-owl/lib/index.js"), s = require("../../actions/recipient.js"), n = require("../../actions/dev.js"), r = require("../../npm/promise-polyfill/promise.js"), i = require("../../utils/throttle.js"), o = require("../../utils/starts-with.js"), c = require("../../utils/mix.js"), u = require("../../api/analytics.js"), l = require("../../components/loc-search/loc-search.js"), h = require("../../utils/get-nearest-address.js"), d = require("../../api/index.js"), p = d.addrGet, g = d.addrSearch, f = d.addrSuggest, v = d.posname, x = d.cityName, m = d.nearAddr, S = require("../../api/wx.js").getLocation, w = require("../../weapp-redux/index.js").connect, D = require("../base.js")({
    pageName: "loc-select",
    data: {
        addresses: [],
        hasLogin: !1,
        near: [],
        searchTextInput: "",
        searchText: "",
        searchResults: [],
        showMore: !1,
        isSuggest: !0,
        autoState: 0,
        hasMoreBtn: !1,
        inputFocus: !1,
        locCity: "",
        locState: "done",
        isDeny: !1
    },
    addressesShowLimit: 3,
    t: 0,
    addrFilter: function(e) {
        var t = e.name, a = e.address, s = e.wm_latitude, n = e.wm_longitude, r = e.location, i = e.distance, o = this.data.searchText, c = "", u = t, l = t.indexOf(o);
        return l >= 0 ? (c = t.slice(0, l), u = t.slice(l + o.length)) : o = "", (i = parseInt(i, 10)) > 0 && (i >= 1e3 ? (i = (i / 1e3).toFixed(1), 
        i += "千米") : i += "米"), {
            prename: c,
            poiName: o,
            leftName: u,
            name: t,
            address: a,
            wm_latitude: s,
            wm_longitude: n,
            location: r,
            distance: i
        };
    },
    query: function(e) {
        var t = this, a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        if (e) {
            if ("选择城市" === this.data.locSearch.city) return this.setData({
                inputFocus: !1
            }), void this.confirm({
                message: "请先选择城市",
                textCancel: "取消",
                textOK: "确定",
                cancel: function() {},
                ok: function() {
                    t.onClickCitySelect();
                }
            });
            this.setData({
                searchText: e,
                searching: !0,
                isSuggest: a
            });
            var s = this.t, n = s + 1;
            n === s && (s = 0, n = 1), this.t = n, (a ? f : g)({
                keyword: e,
                cityname: this.data.locSearch.city || ""
            }).then(function(e) {
                if (t.t === n) {
                    var a = e.mapPoiVo;
                    t.setData({
                        searching: !1,
                        searchResults: a.map(t.addrFilter)
                    });
                }
            }).catch(function() {
                t.t === n && t.setData({
                    searching: !1,
                    searchResults: []
                });
            });
        } else this.setData({
            searchText: e,
            searchResults: [],
            searching: !1,
            isSuggest: a
        });
    },
    checkEnv: function(e) {
        if (o(e, "30191")) {
            var t = void 0, a = e.slice("30191".length).replace(/\s/g, "").toLowerCase();
            switch (a) {
              case "qalx":
              case "lx":
                a = "qalx" === a ? "qa" : "", t = u.turnOnValidate(), this.storeENV({
                    env: a
                }), wx.setClipboardData({
                    data: t
                }), this.toast({
                    message: "环境：" + (a || "线上") + "灵犀验证已开启，验证码：" + t
                });
                break;

              default:
                this.storeENV({
                    env: a
                }), this.toast({
                    message: "切换到环境[" + (a || "线上") + "]"
                });
            }
            return !0;
        }
        return !1;
    },
    onSearchSubmit: function() {
        var e = this.searchText;
        this.checkEnv(e) || (this.searchText ? this.query(e, !1) : this.alert({
            message: "请输入收货地址",
            ok: function() {}
        }));
    },
    onSearchInput: i(function(e) {
        var t = e.detail.value;
        this.searchText = t, this.setSearchData({
            activeTab: "",
            cityShow: !1
        }), this.checkEnv(t) || this.query(t, !0);
    }, 300),
    onSearchClear: function() {
        this.setData({
            searchTextInput: " "
        }), this.setData({
            searchTextInput: "",
            searchText: "",
            searchResults: [],
            searching: !1
        });
    },
    onTapAddr: function(e) {
        var t = e.currentTarget.dataset, a = t.id, s = t.address, n = t.latitude, r = t.longitude, i = parseInt(n, 10), o = parseInt(r, 10), c = null;
        if (a) for (var u = this.data.addresses, l = u.length - 1; l > -1; --l) {
            var h = u[l];
            if (String(h.id) === String(a)) {
                c = h;
                break;
            }
        }
        c ? this.setRecipient(c) : this.partialRecipient({
            address: s,
            latitude: i,
            longitude: o
        });
        var d = getApp().eventBus;
        wx.navigateBack(), d.fire("location:changed");
    },
    onClickMore: function() {
        var e = !this.data.showMore;
        this.setData({
            showMore: e
        });
    },
    onClickLocAuto: function() {
        var e = this;
        this.setData({
            autoState: 1,
            locState: "loading"
        });
        var t = this, a = setTimeout(function() {
            "loading" === t.data.locState && t.setData({
                autoState: 0,
                locState: "fail"
            });
        }, 5e3);
        S().then(function(t) {
            var s = t.latitude, n = t.longitude;
            return v({
                wm_latitude: s,
                wm_longitude: n
            }).then(function(t) {
                var r = t.result;
                e.partialRecipient({
                    address: r,
                    latitude: s,
                    longitude: n
                }), e.setData({
                    autoState: 0,
                    locState: "done"
                });
                var i = getApp().eventBus;
                clearTimeout(a), i.fire("location:changed"), wx.navigateBack();
            });
        }).catch(function(t) {
            clearTimeout(a);
            var s = t && t.errMsg && -1 !== t.errMsg.toLowerCase().indexOf("auth");
            e.setData({
                autoState: 0,
                locState: "fail",
                isDeny: s
            }), s && e.locTest();
        });
    },
    locTest: function() {
        var e = this, t = wx.openSetting;
        this.setData({
            locState: "failLoc",
            isDeny: !0
        }), t ? this.confirm({
            message: "外卖送餐需要您的地理位置",
            textOK: "去开启",
            ok: function() {
                t({
                    success: function(t) {
                        var a = t.authSetting["scope.userLocation"];
                        e.setData({
                            autoState: 1,
                            locState: "loading"
                        }), a && e.onClickLocAuto();
                    }
                });
            },
            cancel: function() {}
        }) : this.alert({
            message: "检测到您没打开美团外卖的定位权限，请到设置启用：点击右上角按钮，进入小程序介绍页，再次点击右上角按钮，进入设置页面，打开定位权限",
            ok: function() {}
        });
    },
    getLocCity: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var s, n, r, i;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return s = "", a.loading(!0), e.prev = 2, e.next = 5, x();

                  case 5:
                    n = e.sent, (s = n.result) && (a.setData({
                        locCity: s
                    }), r = getApp(), (i = r.eventBus).fire("city:changed", s)), e.next = 13;
                    break;

                  case 10:
                    e.prev = 10, e.t0 = e.catch(2), console.error(e.t0);

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 2, 10 ] ]);
        }))();
    },
    onShow: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var s, n, r, i, o, c, u, l, d, g, f, x, w, D, y, k, q, L, T, b, C, M;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (s = a.store.getState(), n = s.wx, r = n.latitude, i = n.longitude, o = getApp(), 
                    c = o.eventBus, u = [], a.getLocCity(), c.on("location:changed", function() {
                        a.getLocCity();
                    }), c.on("city:changed", function() {
                        a.setSearchData({
                            city: a.data.locCity
                        });
                    }), l = a.data, d = l.hasLogin, g = l.locName, (f = Boolean(g)) || !d) {
                        e.next = 26;
                        break;
                    }
                    return x = null, e.prev = 10, e.next = 13, p({
                        type: 1
                    });

                  case 13:
                    u = e.sent, w = u.length > a.addressesShowLimit, D = a.data.showMore, a.setData({
                        addresses: u,
                        hasMoreBtn: w,
                        showMore: !!w && D,
                        hasLogin: !0,
                        inputFocus: 0 === u.length
                    }), x = h(r, i, u), e.next = 23;
                    break;

                  case 20:
                    e.prev = 20, e.t0 = e.catch(10), console.error(e.t0);

                  case 23:
                    x && (a.setRecipient(x), f = !0), e.next = 41;
                    break;

                  case 26:
                    return e.prev = 26, e.next = 29, p({
                        type: 1
                    });

                  case 29:
                    u = e.sent, y = u.length > a.addressesShowLimit, k = a.data.showMore, a.setData({
                        addresses: u,
                        hasMoreBtn: y,
                        showMore: !!y && k,
                        hasLogin: !0,
                        inputFocus: 0 === u.length
                    }), e.next = 41;
                    break;

                  case 35:
                    e.prev = 35, e.t1 = e.catch(26), q = e.t1.code, L = {
                        inputFocus: 0 === a.data.addresses.length
                    }, 401 === q && (L.hasLogin = !1), a.setData(L);

                  case 41:
                    return e.prev = 41, T = [], e.next = 45, m();

                  case 45:
                    b = e.sent, T = b.mapPoiVo, a.setData({
                        near: T
                    }), e.next = 53;
                    break;

                  case 50:
                    e.prev = 50, e.t2 = e.catch(41), console.error(e.t2);

                  case 53:
                    if (f) {
                        e.next = 66;
                        break;
                    }
                    return C = "", e.prev = 55, e.next = 58, v();

                  case 58:
                    M = e.sent, C = M.result, e.next = 65;
                    break;

                  case 62:
                    e.prev = 62, e.t3 = e.catch(55), console.error(e.t3);

                  case 65:
                    C && (a.partialRecipient({
                        address: C,
                        latitude: r,
                        longitude: i
                    }), f = !0);

                  case 66:
                    f ? a.setData({
                        autoState: 0,
                        locState: "done"
                    }) : (a.setData({
                        autoState: 1,
                        locState: "loading"
                    }), S().then(a.setData({
                        autoState: 0,
                        locState: "done"
                    })).catch(function(e) {
                        var t = e && e.errMsg && -1 !== e.errMsg.toLowerCase().indexOf("auth");
                        a.setData({
                            autoState: -1,
                            locState: "fail",
                            isDeny: t
                        }), t && a.locTest();
                    })), a.loading(!1);

                  case 68:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 10, 20 ], [ 26, 35 ], [ 41, 50 ], [ 55, 62 ] ]);
        }))();
    }
});

(0, a.page)(c(D, w(function(e) {
    var t = e.recipient.address, a = e.user.token;
    return {
        locName: t,
        hasLogin: Boolean(a)
    };
}, function(e) {
    return {
        partialRecipient: function(t) {
            return e((0, s.partial)(t));
        },
        setRecipient: function(t) {
            return e((0, s.set)(t));
        },
        storeENV: function(t) {
            return e((0, n.storeENV)(t));
        }
    };
}), l));