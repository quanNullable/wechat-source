function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, a) {
            function r(i, c) {
                try {
                    var s = e[i](c), o = s.value;
                } catch (t) {
                    return void a(t);
                }
                if (!s.done) return Promise.resolve(o).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(o);
            }
            return r("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../api/index.js").getcityList, r = {
    setSearchData: function(t) {
        var e = {};
        Object.keys(t).forEach(function(a) {
            e["locSearch." + a] = t[a];
        }), this.setData(e);
    },
    onClickCitySelect: function() {
        var r = this;
        return t(e.default.mark(function t() {
            var i, c, s, o, n, h, l, u, S, d, f, w, L, v, p;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (i = r.data.locSearch, c = i.activeTab, s = i.cityShow, r.onSearchClear(), r.setSearchData({
                        activeTab: c ? "" : "select",
                        cityShow: !s
                    }), !s && !r.data.locSearch.cityList.length) {
                        t.next = 5;
                        break;
                    }
                    return t.abrupt("return");

                  case 5:
                    return o = [], n = [], t.next = 9, a();

                  case 9:
                    for (h = t.sent, o = h.cityNavList, n = h.classifyNavList, l = wx.getSystemInfoSync(), 
                    u = l.pixelRatio, S = l.windowHeight - 214 / u - 50, d = S / n.length * .8, f = .8 * S, 
                    w = 214 / u + .1 * S, L = [], v = 0; v < n.length; v++) (p = {}).name = n[v].index, 
                    p.tHeight = v * d, p.bHeight = (v + 1) * d, L.push(p);
                    r.setSearchData({
                        winHeight: S,
                        itemH: d,
                        sideBarHeight: f,
                        sideBarTop: w,
                        searchLetter: L,
                        cityList: o
                    });

                  case 21:
                  case "end":
                    return t.stop();
                }
            }, t, r);
        }))();
    },
    onClearCitySelect: function() {
        this.onSearchClear(), this.setSearchData({
            activeTab: "",
            cityShow: !1
        });
    },
    searchStart: function(t) {
        var e = t.currentTarget.dataset.letter, a = this.data.locSearch.sideBarTop, r = this.data.locSearch.itemH, i = r * t.currentTarget.dataset.index + a + r / 2;
        this.scrollEnable = !1, this.setSearchData({
            waterTop: i,
            showLetter: e,
            isShowLetter: !0,
            scrollLetter: ""
        }), console.log(t);
    },
    searchMove: function(t) {
        var e = this, a = this.data.locSearch.searchLetter, r = this.data.locSearch.itemH, i = this.data.locSearch.sideBarTop, c = t.changedTouches[0].clientY - i, s = parseInt(c / r, 10), o = a[s] && a[s].name, n = r * s + i + r / 2;
        o && o !== this.data.locSearch.showLetter && (wx.vibrateShort ? wx.vibrateShort({
            complete: function() {
                e.setSearchData({
                    waterTop: n,
                    showLetter: o,
                    isShowLetter: !0
                });
            }
        }) : this.setSearchData({
            waterTop: n,
            showLetter: o,
            isShowLetter: !0
        }));
    },
    searchEnd: function() {
        var t = this;
        this.setScrollTop(this, this.data.locSearch.showLetter), setTimeout(function() {
            t.setSearchData({
                isShowLetter: !1
            });
        }, 500);
    },
    setScrollTop: function(t, e) {
        var a = this, r = 0, i = t.data.locSearch.cityList, c = 0, s = 0;
        clearTimeout(t.timer);
        for (var o = 0; o < i.length && "break" !== function(o) {
            if (e === i[o].index) return r = 30 * s + 41 * c, t.timer = setTimeout(function() {
                a.scrollEnable = !0, a.setSearchData({
                    scrollLetter: i[o].index
                });
            }, 200), "break";
            s += 1, c += i[o].cities.length;
        }(o); o++) ;
        t.setSearchData({
            scrollTop: r
        });
    },
    bindCity: function(t) {
        var e = t.currentTarget.dataset.city;
        this.setSearchData({
            activeTab: "",
            city: e,
            cityShow: !1
        });
    },
    scrollEnable: !0,
    cityScroll: function(t) {
        if (this.scrollEnable) for (var e = t.detail.scrollTop, a = this.data.locSearch.cityList, r = 0, i = 0, c = 0, s = 0; s < a.length; s++) if (e > r) {
            if (c += 1, i += a[s].cities.length, r = 30 * c + 41 * i, e <= r) {
                this.data.locSearch.scrollLetter !== a[s].index && this.setSearchData({
                    scrollLetter: a[s].index,
                    showLetter: ""
                });
                break;
            }
        } else c += 1, i += a[s].cities.length;
    }
};

module.exports = function(t) {
    t.data.locSearch = {
        cityShow: !1,
        activeTab: "",
        searchLetter: [],
        showLetter: "",
        scrollLetter: "",
        winHeight: 0,
        sideBarHeight: "",
        sideBarTop: "214",
        waterTop: "",
        startPageY: 0,
        cityList: [],
        isShowLetter: !1,
        scrollTop: 0,
        city: "选择城市"
    }, Object.keys(r).forEach(function(e) {
        t[e] = r[e];
    });
};