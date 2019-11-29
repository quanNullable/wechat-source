function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new i(function(e, a) {
            function n(s, r) {
                try {
                    var o = t[s](r), u = o.value;
                } catch (e) {
                    return void a(e);
                }
                if (!o.done) return i.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }
            return n("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../npm/@hfe/mp-owl/lib/index.js"), n = require("../../actions/addr-edit.js"), s = require("../../actions/purchase.js"), i = require("../../npm/promise-polyfill/promise.js"), r = require("../../utils/throttle.js"), o = require("../../components/loc-search/loc-search.js"), u = require("../../utils/mix.js"), c = require("../../api/index.js"), d = c.addrEdit, h = c.addrSearch, l = c.addrSuggest, p = c.nearAddr, g = c.cityName, f = require("../../weapp-redux/index.js").connect, m = require("../../utils/object-assign.js"), v = require("../base.js"), x = f(void 0, function(e) {
    return {
        dispatchUnsetAddrEdit: function() {
            e((0, n.unset)());
        },
        setRecipient: function(t) {
            return e((0, s.setRecipient)(t));
        }
    };
})(v({
    pageName: "addr-add",
    data: {
        focusedInput: "name",
        name: "",
        gender: "先生",
        address: "",
        house_number: "",
        phone: "",
        validname: !0,
        validaddress: !0,
        validhouse_number: !0,
        validphone: !0,
        inputName: "",
        inputHouse_number: "",
        inputPhone: "",
        showMap: !1,
        addresses: [],
        searchTextInput: "",
        searchText: "",
        searchResults: [],
        phoneSuggest: [],
        action: "add",
        near: [],
        locCity: ""
    },
    actions: {
        add: 1,
        del: 2,
        edit: 3
    },
    sources: {
        preview: 1,
        mine: 2
    },
    from: "",
    source: "mine",
    id: "",
    poi_id: "",
    action: "add",
    latitude: 0,
    longtitude: 0,
    bind_type: 0,
    validGender: function(e) {
        return "先生" === e ? e : "女士";
    },
    onClickGender: function(e) {
        var t = e.currentTarget.dataset.gender;
        this.setData({
            gender: this.validGender(t)
        });
    },
    onInputName: function(e) {
        var t = e.detail.value;
        this.setData({
            name: t,
            validname: !0
        });
    },
    onInputPhone: function(e) {
        var t = e.detail.value;
        this.setData({
            phone: t,
            validphone: !0,
            phoneSuggest: this.calcPhoneSuggest(t)
        });
    },
    onInputHouse: function(e) {
        var t = e.detail.value;
        this.setData({
            house_number: t,
            validhouse_number: !0
        });
    },
    calcPhoneSuggest: function(e) {
        var t = this.store.getState().user.addresses, a = e.length;
        if (a >= 11 || 0 === a) return [];
        for (var n = [], s = {}, i = t.length, r = 0; r < i; ++r) {
            var o = t[r].phone;
            11 !== o.length || s.hasOwnProperty(o) || -1 === o.indexOf(e) || (s[o] = 1, n.push(o));
        }
        return n;
    },
    blurTo: 0,
    onFocusPhone: function() {
        clearTimeout(this.blurTo), this.setData({
            phoneSuggest: this.calcPhoneSuggest(this.data.phone)
        });
    },
    onBlurPhone: function() {
        var e = this;
        clearTimeout(this.blurTo), this.blurTo = setTimeout(function() {
            e.setData({
                phoneSuggest: []
            });
        }, 100);
    },
    onClickPhoneSuggest: function(e) {
        var t = e.currentTarget.dataset.phone;
        this.data.inputPhone === t && this.setData({
            inputPhone: t + " "
        }), this.setData({
            showPhoneSuggest: !1,
            phoneSuggest: [],
            inputPhone: t,
            phone: t
        });
    },
    getArgs: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this.id, a = this.action, n = this.actions, s = this.source, i = this.sources, r = this.data, o = r.name, u = r.address, c = r.house_number, d = r.phone, h = r.gender, l = this.latitude, p = this.longitude, g = this.poi_id;
        return {
            type: n[a] || n.add,
            id: t,
            name: o,
            phone: d,
            address: u,
            latitude: l,
            longitude: p,
            gender: h,
            house_number: c,
            source: i[s] || i.mine,
            bind_type: 11,
            wm_poi_id: e ? "" : g || ""
        };
    },
    onClickSubmit: function() {
        var a = this;
        return e(t.default.mark(function n() {
            var s, i, r, o, u, c, h, l, p, g, f, v, x, b, w, _, y, S;
            return t.default.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    for (i = (s = [ {
                        id: "phone",
                        msg: "请填写正确的手机号",
                        test: function(e) {
                            return /^[0-9]{11}$/.test(e);
                        }
                    }, {
                        id: "address",
                        msg: "请选择正确的地址"
                    } ]).length, r = a.data, o = {}, u = "", c = 0; c < i; ++c) h = s[c], l = h.id, 
                    p = h.msg, g = h.test, f = r[l], (v = f && (!g || g(f))) || (o["valid" + l] = !1, 
                    u || (u = p));
                    if (!u) {
                        n.next = 10;
                        break;
                    }
                    a.toast({
                        message: u
                    }), n.next = 28;
                    break;

                  case 10:
                    return a.loading(!0), x = a.getArgs(), n.prev = 12, n.next = 15, d(x);

                  case 15:
                    b = n.sent, w = b.id, _ = b.over_shipping, y = b.over_shipping_txt, (S = 1 === _) ? a.confirm({
                        message: y,
                        textOK: "仍然保存",
                        textCancel: "调整地址",
                        ok: function() {
                            var n = e(t.default.mark(function e() {
                                var n, s, i, r;
                                return t.default.wrap(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        return a.loading(!0), e.prev = 1, n = a.getArgs(!0), e.next = 5, d(n);

                                      case 5:
                                        s = e.sent, i = s.id, "preview" === a.from && a.setRecipient(m(n, {
                                            id: i
                                        })), wx.navigateBack(), e.next = 15;
                                        break;

                                      case 11:
                                        e.prev = 11, e.t0 = e.catch(1), r = e.t0.message, a.alert({
                                            message: r
                                        });

                                      case 15:
                                        a.loading(!1);

                                      case 16:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e, a, [ [ 1, 11 ] ]);
                            }));
                            return function() {
                                return n.apply(this, arguments);
                            };
                        }()
                    }) : ("preview" === a.from && a.setRecipient(m(x, {
                        id: w
                    })), wx.navigateBack()), n.next = 27;
                    break;

                  case 23:
                    n.prev = 23, n.t0 = n.catch(12), p = n.t0.message, a.alert({
                        message: p
                    });

                  case 27:
                    a.loading(!1);

                  case 28:
                  case "end":
                    return n.stop();
                }
            }, n, a, [ [ 12, 23 ] ]);
        }))();
    },
    onClickDelete: function() {
        var a = this;
        this.loading(!0);
        try {
            this.confirm({
                message: "确认要删除地址",
                textOK: "确认",
                textCancel: "取消",
                ok: function() {
                    var n = e(t.default.mark(function e() {
                        var n, s;
                        return t.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return a.loading(!0), e.prev = 1, n = a.getArgs(!0), e.next = 5, d(m(n, {
                                    type: 2
                                }));

                              case 5:
                                wx.navigateBack(), e.next = 12;
                                break;

                              case 8:
                                e.prev = 8, e.t0 = e.catch(1), s = e.t0.message, a.alert({
                                    message: s
                                });

                              case 12:
                                a.loading(!1);

                              case 13:
                              case "end":
                                return e.stop();
                            }
                        }, e, a, [ [ 1, 8 ] ]);
                    }));
                    return function() {
                        return n.apply(this, arguments);
                    };
                }()
            });
        } catch (a) {
            var n = a.message;
            this.alert({
                message: n
            });
        }
        this.loading(!1);
    },
    t: 0,
    addrFilter: function(e) {
        var t = e.name, a = e.address, n = e.wm_latitude, s = e.wm_longitude, i = e.location, r = e.distance, o = this.data.searchText, u = "", c = t, d = t.indexOf(o);
        return d >= 0 ? (u = t.slice(0, d), c = t.slice(d + o.length)) : o = "", (r = parseInt(r, 10)) > 0 && (r >= 1e3 ? (r = (r / 1e3).toFixed(1), 
        r += "千米") : r += "米"), {
            prename: u,
            poiName: o,
            leftName: c,
            name: t,
            address: a,
            wm_latitude: n,
            wm_longitude: s,
            location: i,
            distance: r
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
            var n = this.t, s = n + 1;
            s === n && (n = 0, s = 1), this.t = s, (a ? l : h)({
                keyword: e,
                cityname: this.data.locSearch.city || ""
            }).then(function(e) {
                if (t.t === s) {
                    var a = e.mapPoiVo.map(t.addrFilter);
                    t.setData({
                        searching: !1,
                        searchResults: a
                    });
                }
            }).catch(function() {
                t.t === s && t.setData({
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
    onSearchSubmit: function() {
        this.searchText ? this.query(this.searchText, !1) : this.alert({
            message: "请输入收货地址",
            ok: function() {}
        });
    },
    onSearchInput: r(function(e) {
        var t = e.detail.value;
        this.searchText = t, this.query(t, !0);
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
    onSearchBack: function() {
        this.setData({
            showMap: !1
        });
    },
    onTapAddr: function(e) {
        var t = e.currentTarget.dataset, a = t.address, n = t.latitude, s = t.longitude, i = parseInt(n, 10), r = parseInt(s, 10);
        this.setMap({
            address: a,
            latitude: i,
            longitude: r
        }), this.setData({
            showMap: !1
        });
    },
    onClickMap: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var n, s, i, r, o, u;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, n = [], e.next = 4, p();

                  case 4:
                    s = e.sent, n = s.mapPoiVo, a.setData({
                        near: n
                    }), e.next = 12;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e.catch(0), console.error(e.t0);

                  case 12:
                    return e.prev = 12, i = "", e.next = 16, g();

                  case 16:
                    r = e.sent, (i = r.result) && (a.setData({
                        locCity: i
                    }), o = getApp(), (u = o.eventBus).fire("city:changed", i)), e.next = 24;
                    break;

                  case 21:
                    e.prev = 21, e.t1 = e.catch(12), console.error(e.t1);

                  case 24:
                    a.setData({
                        searchTextInput: " "
                    }), a.setData({
                        showMap: !0,
                        addresses: [],
                        searchTextInput: "",
                        searchText: "",
                        searchResults: [],
                        focusedInput: "search"
                    });

                  case 26:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 9 ], [ 12, 21 ] ]);
        }))();
    },
    onConfirmName: function() {
        this.data.phone || this.setData({
            focusedInput: "phone"
        });
    },
    setMap: function(e) {
        var t = e.latitude, a = e.longitude, n = e.address;
        this.longitude = a, this.latitude = t, this.setData({
            address: n,
            validaddress: !0
        });
    },
    onLoad: function(e) {
        var t = this, a = e.from, n = void 0 === a ? "" : a, s = e.action, i = void 0 === s ? "add" : s, r = e.addr_id, o = void 0 === r ? "" : r, u = e.source, c = void 0 === u ? "mine" : u, d = e.poi_id, h = void 0 === d ? "" : d;
        this.action = i, this.source = c, this.poi_id = h, this.from = n;
        var l = this.store.getState().addrEdit;
        if ("edit" === i && l.id && o && String(l.id) === o) {
            this.id = o;
            var p = l.name, g = l.gender, f = l.address, m = l.house_number, v = l.phone, x = l.longitude, b = l.latitude, w = l.bind_type;
            this.longitude = x, this.latitude = b, this.bind_type = w, this.setData({
                action: i,
                gender: this.validGender(g),
                inputName: p,
                name: p,
                address: f,
                inputHouse_number: m,
                house_number: m,
                inputPhone: v,
                phone: v
            });
        } else wx.setNavigationBarTitle({
            title: "新增收货地址"
        });
        getApp().eventBus.on("city:changed", function() {
            t.setSearchData({
                city: t.data.locCity
            });
        }), this.loading(!1);
    },
    onUnload: function() {
        clearTimeout(this.to), this.dispatchUnsetAddrEdit();
    }
}));

(0, a.page)(u(x, o));