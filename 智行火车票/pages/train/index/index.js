function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t, i, a) {
    return i in t ? Object.defineProperty(t, i, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = a, t;
}

var a, e = require("../../../cwx/cwx"), o = require("../../flight/common/model"), n = require("../../flight/common/store"), s = require("../common/model"), r = require("../common/service"), c = require("../common/store"), d = t(require("../common/cDate")), h = t(require("../common/util")), u = require("../common/components/toast/toast");

e.cwx.config.init();

var f = e.cwx.train;

f.preSaleDays = 30, f.preRobDays = 60;

var y = (0, u.trainToast)(), l = [ {
    cityName: "北京"
}, {
    cityName: "上海"
}, {
    cityName: "广州"
}, {
    cityName: "深圳"
}, {
    cityName: "苏州"
}, {
    cityName: "杭州"
}, {
    cityName: "天津"
}, {
    cityName: "南京"
}, {
    cityName: "成都"
}, {
    cityName: "西安"
}, {
    cityName: "重庆"
}, {
    cityName: "郑州"
}, {
    cityName: "长沙"
}, {
    cityName: "合肥"
}, {
    cityName: "昆山"
}, {
    cityName: "宁波"
} ], S = [ {
    cityName: "北京",
    cityCode: "BJS"
}, {
    cityName: "成都",
    cityCode: "CTU"
}, {
    cityName: "长沙",
    cityCode: "CSX"
}, {
    cityName: "大连",
    cityCode: "DLC"
}, {
    cityName: "福州",
    cityCode: "FOC"
}, {
    cityName: "广州",
    cityCode: "CAN"
}, {
    cityName: "杭州",
    cityCode: "HGH"
}, {
    cityName: "济南",
    cityCode: "TNA"
}, {
    cityName: "昆明",
    cityCode: "KMG"
}, {
    cityName: "南京",
    cityCode: "NKG"
}, {
    cityName: "青岛",
    cityCode: "TAO"
}, {
    cityName: "上海",
    cityCode: "SHA"
}, {
    cityName: "深圳",
    cityCode: "SZX"
}, {
    cityName: "三亚",
    cityCode: "SYX"
}, {
    cityName: "天津",
    cityCode: "TSN"
}, {
    cityName: "武汉",
    cityCode: "WUH"
}, {
    cityName: "西安",
    cityCode: "SIA"
}, {
    cityName: "厦门",
    cityCode: "XMN"
}, {
    cityName: "重庆",
    cityCode: "CKG"
}, {
    cityName: "郑州",
    cityCode: "CGO"
} ], m = {
    pageId: "10320660959",
    data: (a = {
        isTieyou: e.cwx.config.isTieyou,
        isFlight: 1,
        isship: 1,
        dStation: "",
        aStation: "",
        busdStation: "",
        busaStation: "",
        shipdStation: "",
        shipaStation: "",
        dStationCode: "",
        aStationCode: "",
        monthDay: "",
        dayInfo: "",
        selectDate: "",
        exchange: !1,
        isGaotieOnly: !1,
        trainNotice: null,
        showChooseType: "",
        isFilterViewAnimation: !1,
        tabIndex: 0,
        showType: "",
        partnerCN: e.cwx.config.partnerCN,
        isStu: !1,
        notice: null
    }, i(a, "trainNotice", null), i(a, "isLogin", !1), i(a, "couponNumber", 0), i(a, "speedPointNumber", 0), 
    a),
    onLoad: function(t) {
        console.log("index options = ", t), this.loadQueryFromStore(), this.loadNotice(), 
        this.loadStation(), this.loadFlightStation();
        var i = 1;
        if (1 == t.flight && (i = 2), 2 == t.flight) {
            i = 3;
            var a = t.utmSource || t.utmsource || "";
            wx.setStorageSync("BUS_WECHAT_UTMSOURCE", a), t.mFrom && wx.setStorageSync("BUS_QUERY_FROM", t.mFrom), 
            t.mTo && wx.setStorageSync("BUS_QUERY_TO", t.mTo);
        }
        if (this.setData({
            isFlight: i
        }), t.scene) {
            var e = decodeURIComponent(t.scene || ""), o = e.slice(0, 4);
            if (32 === e.length) {
                var n = e;
                this.navigateTo({
                    url: "../shareaccelerate/shareaccelerate?mid=" + n
                });
            } else if (4001 == o) {
                var s = e.substr(4);
                s && this.navigateTo({
                    url: "../shareaccelerate/shareaccelerate?mid=" + s
                });
            } else if (4002 == o) {
                var r = e.slice(4);
                1 != r && 2 != r && 3 != r && (r = 1), this.setData({
                    isFlight: r
                });
            }
        }
        t.savetohome && this.robshareAd(), t.stu && this.setData({
            isStu: !0
        });
    },
    onShow: function(t) {
        var i = this;
        this.loadConfigPayWhiteList(), this.getForceConfig(), this.setData({
            busdStation: wx.getStorageSync("BUS_QUERY_FROM") || "上海",
            busaStation: wx.getStorageSync("BUS_QUERY_TO") || "北京",
            shipdStation: wx.getStorageSync("SHIP_QUERY_FROM") || "大连",
            shipaStation: wx.getStorageSync("SHIP_QUERY_TO") || "烟台"
        }), this.loadTrainNotice(), e.cwx.user.isLogin() ? (this.setData({
            isLogin: !0
        }), (0, r.GetUserAccountInfoPromise)({}).then(function(t) {
            i.setData({
                couponNumber: t.couponInfo.num,
                speedPointNumber: t.speedPointInfo.num
            });
        }).catch(function(t) {
            console.log(t);
        })) : this.setData({
            isLogin: !1
        });
    },
    loadQueryFromStore: function() {
        var t = c.TrainQueryStore.get() || {}, i = t.dStation || "上海", a = t.aStation || "北京", e = t.date || "";
        new d.default(e).getTime() <= new d.default().getTime() && (e = new d.default().addDay(1).format("Y-m-d"));
        var o = d.default.format(e, "n月j日"), n = d.default.format(e, "D") || d.default.weekday(e), s = !!t.isGaotieOnly;
        this.setData({
            dStation: i,
            aStation: a,
            selectDate: e,
            monthDay: o,
            dayInfo: n,
            isGaotieOnly: s
        });
    },
    loadNotice: function() {
        var t = this, i = {
            Channel: "tieyouwx"
        };
        this.showTrainLoading(), (0, s.TrainNoticeModel)(i, function(i) {
            t.hideTrainLoading(), i.NoticeInfo && t.setData({
                notice: i.NoticeInfo
            });
        }, function(t) {});
    },
    loadStation: function() {
        var t = this;
        if (!c.TrainStationStore.get()) {
            this.showTrainLoading();
            var i = {
                action: "all"
            };
            (0, s.TrainStationModel)(i, function(i) {
                t.hideTrainLoading(), i && t.handleStation(i);
            }, function(t) {});
        }
    },
    handleStation: function(t) {
        var i = [], a = {};
        e._.each(t, function(t, a) {
            "hot" != a && e._.each(t, function(t) {
                var e = {
                    cityName: t[0],
                    cityID: t[3],
                    py: t[2],
                    pyHead: t[1],
                    firstLetter: a
                };
                i.push(e);
            });
        }), i = e._.sortBy(i, "firstLetter"), e._.each(i, function(t) {
            a[t.firstLetter] || (a[t.firstLetter] = []), a[t.firstLetter].push({
                cityName: t.cityName,
                cityID: t.cityID,
                py: t.py,
                pyHead: t.pyHead
            });
        }), c.TrainStationStore.setAttr("cityMainList", a);
    },
    chooseStation: function(t) {
        var i = this, a = t.currentTarget.dataset.type, o = ("d" == a ? 1 : 0) ^ (this.data.exchange ? 1 : 0) ? "出发" : "到达", r = 2 == this.data.isFlight ? {
            inlandCities: n.FlightCityStore.get() || {},
            interCities: {}
        } : {
            inlandCities: c.TrainStationStore.get() || {},
            interCities: {}
        };
        r.inlandCities.hotCities = 2 == this.data.isFlight ? S : l;
        var d = [];
        for (var h in r.inlandCities.cityMainList) d = d.concat(r.inlandCities.cityMainList[h]);
        e.cwx.component.city({
            title: o,
            handleSearch: function(t, i, a) {
                var o = t.toLowerCase(), n = d.filter(function(t) {
                    return t.cityName.indexOf(o) > -1 || t.py.indexOf(o) > -1 || t.pyHead.indexOf(o) > -1;
                });
                a(n = e._.sortBy(n, "cityID"));
            },
            loadData: function(t) {
                t(r);
            },
            handleCurrentPosition: function(t, i) {
                var a = {
                    Latitude: t.latitude,
                    Longitude: t.longitude,
                    Language: "CN"
                };
                (0, s.LBSModel)(a, function(t) {
                    i({
                        cityName: t.CityEntities[0].CityName
                    });
                }, function(t) {});
            }
        }, function(t) {
            "d" == a ? i.setData({
                dStation: t.cityName,
                dStationCode: t.cityCode
            }) : i.setData({
                aStation: t.cityName,
                aStationCode: t.cityCode
            }), i.pushToHistory(t);
        });
    },
    pushToHistory: function(t) {
        var i = (2 == this.data.isFlight ? n.FlightCityStore.getAttr("historyCities") : c.TrainStationStore.getAttr("historyCities")) || [], a = e._.find(i, function(i) {
            return i.cityName == t.cityName;
        }), o = i.indexOf(a);
        o > -1 && i.splice(o, 1), i.unshift(t), i = i.slice(0, 6), 2 == this.data.isFlight ? n.FlightCityStore.setAttr("historyCities", i) : c.TrainStationStore.setAttr("historyCities", i);
    },
    exchangeStation: function() {
        this.setData({
            exchange: !this.data.exchange
        });
    },
    exchangeStationbus: function() {
        var t = this, i = t.data.busdStation, a = t.data.busaStation;
        wx.setStorageSync("BUS_QUERY_FROM", a), wx.setStorageSync("BUS_QUERY_TO", i), this.setData({
            busdStation: a,
            busaStation: i
        });
    },
    exchangeStationship: function() {
        var t = this, i = t.data.shipdStation, a = t.data.shipaStation;
        wx.setStorageSync("SHIP_QUERY_FROM", a), wx.setStorageSync("SHIP_QUERY_TO", i), 
        this.setData({
            shipdStation: a,
            shipaStation: i
        });
    },
    chooseDate: function() {
        var t = this, i = this.data.selectDate, a = d.default.format(i, "Y-n-j"), o = d.default.format("", "Y-n-j"), n = new d.default().addDay(f.preRobDays - 1).format("Y-n-j"), s = void 0, r = this.getQueryInfo(), c = r.dStationCode || this.getStationCodeWithName(r.dStation), u = r.aStationCode || this.getStationCodeWithName(r.aStation), y = {};
        2 == this.data.isFlight ? (n = new d.default().addDay(180).format("Y-n-j"), y = {
            data: {
                departCityCode: c,
                arriveCityCode: u,
                departDate: i,
                cacheUsage: 0,
                hasChild: !1,
                hasBaby: !1,
                hasEconomyClass: !0,
                isRoundTrip: !1,
                nextDepartDate: null,
                routeIndex: 0,
                searchType: 0,
                orderid: ""
            }
        }) : 1 == this.data.isFlight && (s = h.default.getCalendarInfo(n)), e.cwx.component.calendar({
            choosenDate: a,
            beginDate: o,
            endDate: n,
            title: "选择出发日期",
            flight: 2 == this.data.isFlight,
            queryParams: y,
            info: s
        }, function(i) {
            var a = d.default.parse(i).format("Y-m-d"), e = d.default.parse(i).format("n月j日"), o = d.default.parse(i).format("D") || d.default.weekday(a);
            t.setData({
                selectDate: a,
                monthDay: e,
                dayInfo: o
            });
        });
    },
    switchChange: function() {
        this.setData({
            isGaotieOnly: !this.data.isGaotieOnly
        });
    },
    trainOrFlight: function(t) {
        var i = (t.currentTarget.dataset || {}).params;
        this.setData({
            isFlight: parseInt(i)
        });
    },
    getQueryInfo: function() {
        if (this.data.dStation == this.data.aStation) return h.default.showModal({
            m: "出发和到达站不能相同，请重新选择"
        });
        var t = {
            date: this.data.selectDate,
            isGaotieOnly: this.data.isGaotieOnly
        };
        return this.data.exchange ? (t.dStation = this.data.aStation, t.dStationCode = this.data.aStationCode, 
        t.aStation = this.data.dStation, t.aStationCode = this.data.dStationCode) : (t.dStation = this.data.dStation, 
        t.dStationCode = this.data.dStationCode, t.aStation = this.data.aStation, t.aStationCode = this.data.aStationCode), 
        t;
    },
    search: function(t) {
        var i = this.getQueryInfo();
        c.TrainQueryStore.set(i), 2 != this.data.isFlight ? 3 == this.data.isFlight ? 1 == this.data.isship ? this.searchNewDate() : this.shipsearch() : ((0, 
        r.saveUserFormID)(t, "1002"), this.navigateTo({
            url: "../list/list?dstation=" + i.dStation + "&astation=" + i.aStation + "&date=" + i.date + "&isGaotieOnly=" + !!i.isGaotieOnly
        })) : this.flightSearch(i);
    },
    searchSubmit: function(t) {
        this.search(t.detail.formId);
    },
    searchNewDate: function(t) {
        wx.setStorageSync("BUS_NO_UPDATE", 0), this.navigateTo({
            url: "/pages/bus/list/index?mDate=" + this.data.selectDate + "&mFrom=" + this.data.busdStation + "&mTo=" + this.data.busaStation
        });
    },
    shipsearch: function(t) {
        this.navigateTo({
            url: "/pages/ship/list/list?mDate=" + this.data.selectDate + "&mFrom=" + this.data.shipdStation + "&mTo=" + this.data.shipaStation + "&mUtmsource=" + this.data.mUtmsource
        });
    },
    flightSearch: function(t) {
        e._.isEmpty(t.dStationCode) && (t.dStationCode = this.getStationCodeWithName(t.dStation), 
        e._.isEmpty(t.dStationCode)) ? h.default.showModal({
            m: "您所选择的出发站点没有机场"
        }) : e._.isEmpty(t.aStationCode) && (t.aStationCode = this.getStationCodeWithName(t.aStation), 
        e._.isEmpty(t.aStationCode)) ? h.default.showModal({
            m: "您所选择的到达站点没有机场"
        }) : this.navigateTo({
            url: "/pages/flight/list/list?departCity=" + t.dStation + "&departCityCode=" + t.dStationCode + "&arriveCity=" + t.aStation + "&arriveCityCode=" + t.aStationCode + "&departDate=" + t.date
        });
    },
    onUnload: function() {},
    showNotice: function() {
        var t = this;
        this.setData({
            showChooseType: "notice"
        }), setTimeout(function() {
            t.setData({
                isFilterViewAnimation: !0
            });
        }, 10);
    },
    hideNotice: function() {
        var t = this;
        this.setData({
            isFilterViewAnimation: !1
        }), setTimeout(function() {
            t.setData({
                showChooseType: ""
            });
        }, 200);
    },
    onShareAppMessage: function() {
        return {
            bu: "train",
            title: "智行火车票预订",
            desc: "预订安全靠谱，抢票快人一步！【智行旅行】",
            path: "pages/train/index/index"
        };
    },
    getStationCodeWithName: function(t) {
        var i = n.FlightCityStore.get();
        i = i.cityMainList;
        var a = void 0, e = !1, o = Object.keys(i), s = !0, r = !1, c = void 0;
        try {
            for (var d, h = o[Symbol.iterator](); !(s = (d = h.next()).done); s = !0) {
                var u = i[d.value], f = !0, y = !1, l = void 0;
                try {
                    for (var S, m = u[Symbol.iterator](); !(f = (S = m.next()).done); f = !0) {
                        var g = S.value;
                        if (0, g.cityName == t) {
                            a = g.cityCode, e = !0;
                            break;
                        }
                    }
                } catch (t) {
                    y = !0, l = t;
                } finally {
                    try {
                        !f && m.return && m.return();
                    } finally {
                        if (y) throw l;
                    }
                }
                if (e) break;
            }
        } catch (t) {
            r = !0, c = t;
        } finally {
            try {
                !s && h.return && h.return();
            } finally {
                if (r) throw c;
            }
        }
        return a;
    },
    loadFlightStation: function() {
        var t = this;
        if (!n.FlightCityStore.get()) {
            this.showTrainLoading();
            var i = {
                data: {
                    dataChangeLastTime: "2016-01-19T00:00:00",
                    distinctCity: !0
                }
            };
            (0, o.FlightCityListModel)(i, function(i) {
                t.hideTrainLoading(), i && i.data && t.handleFlightStation(i.data);
            }, function(t) {
                console.log(t);
            });
        }
    },
    handleFlightStation: function(t) {
        var i = {};
        e._.each(t, function(t) {
            i[t.firstLetter] || (i[t.firstLetter] = []), i[t.firstLetter].push({
                cityName: t.cityName,
                cityCode: t.cityCode,
                py: t.cityNamePY,
                pyHead: t.cityNameJP
            });
        });
        var a = Object.keys(i), o = {};
        (a = a.sort()).forEach(function(t) {
            o[t] = i[t];
        }), n.FlightCityStore.setAttr("cityMainList", o);
    },
    loadConfigPayWhiteList: function() {
        var t = {
            ConfigKey: "tieyouwx_pay_whitelist"
        };
        (0, s.ConfigInfoModel)(t, function(t) {
            if (200 == t.code) {
                var i = JSON.parse(t.data);
                if (i.ConfigInfo && i.ConfigInfo.Content) {
                    var a = [];
                    try {
                        a = i.ConfigInfo.Content.split(","), h.default.setConfigPayPostfix(a);
                    } catch (t) {
                        h.default.setConfigPayPostfix([]);
                    }
                }
            }
        }, function(t) {
            h.default.setConfigPayPostfix([]);
        });
    },
    getForceConfig: function() {
        var t = {
            ConfigKey: "wx_force12306"
        };
        (0, s.ConfigInfoModel)(t, function(t) {
            if (200 == t.code) {
                var i = JSON.parse(t.data);
                if (i.ConfigInfo && i.ConfigInfo.Content) {
                    var a = parseInt(i.ConfigInfo.Content);
                    h.default.setConfigForceBuy(!!a);
                }
            }
        }, function(t) {});
    },
    robshareAd: function() {
        var t = wx.getSystemInfoSync().system || "";
        (t = t.toLowerCase()).indexOf("android") > -1 && this.setData({
            showType: "save"
        });
    },
    onSelectFrom: function() {
        this.navigateTo({
            url: "/pages/bus/station/index?isFrom=1&from=" + this.data.busdStation + "&to=" + this.data.busaStation
        });
    },
    onSelectTo: function() {
        this.navigateTo({
            url: "../../bus/station/index?from=" + this.data.busdStation + "&to=" + this.data.busaStation
        });
    },
    onSelectshipline: function() {
        this.navigateTo({
            url: "../../ship/shipline/shipline"
        });
    },
    onclickbus: function() {
        this.setData({
            isship: 1
        });
    },
    onclickship: function() {
        this.setData({
            isship: 2
        });
    },
    hideBackDrop: function() {
        this.setData({
            showType: ""
        });
    },
    switchStu: function() {
        this.setData({
            isStu: !this.data.isStu
        });
    },
    loadTrainNotice: function() {
        var t = this, i = {
            ConfigKey: "tieyou_wx_index_notice"
        }, a = function() {
            t.setData({
                trainNotice: ""
            });
        };
        (0, r.GetConfigInfoPromise)(i).then(function(i) {
            i.ConfigInfo && i.ConfigInfo.Content ? t.setData({
                trainNotice: i.ConfigInfo.Content
            }) : a();
        }).catch(function(t) {
            a(), console.error(t);
        });
    },
    login: function() {
        e.cwx.user.login({
            callback: function(t) {
                t.ReturnCode && 0 == t.ReturnCode && this.setData({
                    isLogin: !0
                });
            }
        });
    },
    loginOrCheck: function() {
        e.cwx.user.isLogin() ? this.checkCardCoupon() : this.login();
    },
    checkCardCoupon: function() {
        e.cwx.user.isLogin() ? this.navigateTo({
            url: "../kaquan/kaquan"
        }) : this.login();
    },
    noop: function() {}
};

Object.assign(m.data, y.data), Object.keys(y.methods).forEach(function(t) {
    m[t] = y.methods[t];
}), (0, e.CPage)(m);