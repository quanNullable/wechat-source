var t = require("../../cwx.js"), i = null, a = null, e = null, n = 0;

(0, t.CPage)({
    pageId: "10320654345",
    data: {
        title: "请选择城市",
        isShowCurrentPosition: !0,
        isFoldShow: !1,
        currentTab: 0,
        currentCity: {
            cityName: "定位中..."
        },
        toView: "positon",
        searchValue: "",
        isSearchView: !1,
        inputKeyword: "",
        loadDataFinish: !1,
        currentTag: "",
        currentAppend: "",
        showInter: !1,
        cityTags: []
    },
    onReady: function() {
        t.cwx.setNavigationBarTitle({
            title: this.title
        }), this._showLoading(), this.loadData(this._onDataLoaded.bind(this));
    },
    onLoad: function(t) {
        this.title = t.data.title || this.data.title;
        var i = this.data.isFoldShow;
        void 0 !== t.data.isShowCurrentPosition && (i = t.data.isFoldShow);
        var a = this.data.isShowCurrentPosition;
        void 0 !== t.data.isShowCurrentPosition && (a = t.data.isShowCurrentPosition), this.setData({
            isFoldShow: i,
            isShowCurrentPosition: a,
            loadDataFinish: !1,
            currentCity: {
                cityName: "定位中..."
            }
        }), this.loadData = t.data.loadData || function() {}, this.data.handleSearch = t.data.handleSearch, 
        this.data.handleCurrentPosition = t.data.handleCurrentPosition, this.beginLocate();
    },
    beginLocate: function() {
        t.cwx.locate.startGetGeoPoint({
            success: function(t) {
                "function" == typeof this.data.handleCurrentPosition && this.data.handleCurrentPosition(t, this._onHandleCurrentPosition.bind(this));
            }.bind(this),
            fail: function(t) {
                this.data.currentCity = {
                    cityName: "定位失败"
                }, this.setData({
                    currentCity: this.data.currentCity
                }), console.log("cwx.locate.startGetGeoPoint error ", t);
            }.bind(this)
        });
    },
    cityTap: function(t) {
        var i = t.currentTarget.dataset.cityname;
        if ("定位中..." !== i) if ("定位失败" !== i) {
            if (this.data.currentCity.cityName === i) return this.invokeCallback(this.data.currentCity), 
            void this.navigateBack();
            var a, e = t.currentTarget.dataset.section, n = t.currentTarget.dataset.row;
            a = "historyCities" == e ? this.data.currentTabCities.historyCities[n] : "hotCities" == e ? this.data.currentTabCities.hotCities[n] : "search" == e ? this.data.searchResult[n] : this.data.currentTabCities.cityMainList[e][n], 
            this.invokeCallback(a), this.navigateBack();
        } else this.beginLocate();
    },
    inlandTabClick: function() {
        e = i, n = 0, this.data.currentTab = 0, this.data.currentAppend = i.cityTags[0], 
        this.data.currentTabCities = null;
        var t = null;
        do {
            t = this._appendNextSection(this.data.currentAppend);
        } while (n < 30);
        t && (this.setData({
            currentAppend: this.data.currentAppend,
            currentTab: 0,
            currentTabCities: t,
            cityTags: e.cityTags
        }), this.setData({
            toView: this.data.currentAppend
        }));
    },
    interTabClick: function() {
        e = a, n = 0, this.data.currentAppend = a.cityTags[0], this.data.currentTab = 1, 
        this.data.currentTabCities = null;
        var t = null;
        do {
            t = this._appendNextSection(this.data.currentAppend);
        } while (n < 30);
        t && (this.setData({
            currentAppend: this.data.currentAppend,
            currentTab: 1,
            currentTabCities: t,
            cityTags: e.cityTags
        }), this.setData({
            toView: this.data.currentAppend
        }));
    },
    searchInput: function(t) {
        var i = t.detail.value;
        this.setData({
            inputKeyword: i
        }), this.data.notHandle || (this.data.notHandle = !0, setTimeout(function() {
            this.data.notHandle = !1, this.data.handleSearch(this.data.inputKeyword, this.data.currentTab, this._onHandleSearchResult.bind(this));
        }.bind(this), 400));
    },
    gotoSearch: function(t) {
        this.data.isSearchView || this.setData({
            isSearchView: !0
        });
    },
    searchClear: function(t) {
        this.setData({
            inputKeyword: ""
        }), this._onHandleSearchResult([]);
    },
    searchCancel: function(t) {
        this.setData({
            isSearchView: !1,
            inputKeyword: ""
        }), this._onHandleSearchResult([]), wx.hideKeyboard();
    },
    tagTap: function(t) {
        var i = t.currentTarget.dataset.citytag;
        this.data.isFoldShow && this.setData({
            currentTag: i
        }), this.data.currentAppend = i;
        var a = this._appendNextSection(this.data.currentAppend);
        a && this.setData({
            currentAppend: this.data.currentAppend,
            currentTabCities: a
        }), this.setData({
            toView: i
        });
    },
    _trimeData: function(t) {
        i = t.inlandCities, a = t.interCities, i.historyCities = i.historyCities || [], 
        a.historyCities = a.historyCities || [];
        var n = [];
        for (var s in i.cityMainList) (c = i.cityMainList[s]).length > 0 ? n.push(s) : delete i.cityMainList[s];
        i.cityTags = n;
        var r = [];
        for (var s in a.cityMainList) {
            var c = a.cityMainList[s];
            c.length > 0 ? r.push(s) : delete a.cityMainList[s];
        }
        a.cityTags = r, e = i, this.data.currentAppend = n[0];
    },
    _appendNextSection: function(i) {
        var a = this.data.currentTabCities;
        a || ((a = t.cwx.util.copy(e)).cityMainList = {}, a.cityTags = []);
        var s = e.cityTags.indexOf(i);
        if (-1 == s || a.cityMainList[i] || -1 != a.cityTags.indexOf(i)) return null;
        for (var r = e.cityTags, c = 0; c < r.length; c++) if (c <= s) {
            var h = r[c];
            if (!a.cityMainList[h] && -1 == a.cityTags.indexOf(h)) {
                var o = e.cityMainList[h];
                n += o.length, a.cityMainList[h] = o, a.cityTags.push(h);
            }
        }
        return s < e.cityTags.length - 1 && (this.data.currentAppend = e.cityTags[s + 1]), 
        a;
    },
    _onDataLoaded: function(t) {
        n = 0, this._trimeData(t);
        var i = null;
        do {
            i = this._appendNextSection(this.data.currentAppend);
        } while (n < 30);
        this.data.loadDataFinish = !0, i && this.setData({
            currentAppend: this.data.currentAppend,
            loadDataFinish: this.data.loadDataFinish,
            currentTabCities: i,
            showInter: 0 != a.cityTags.length,
            cityTags: e.cityTags
        }), wx.hideToast();
    },
    handlerScrollLower: function(t) {
        var i = this._appendNextSection(this.data.currentAppend);
        i && this.setData({
            currentTabCities: i
        });
    },
    _onHandleSearchResult: function(t) {
        this.setData({
            searchResult: t
        });
    },
    _onHandleCurrentPosition: function(t) {
        if (null === t) return this.data.currentCity = {
            cityName: "定位失败"
        }, void this.setData({
            currentCity: this.data.currentCity
        });
        this.setData({
            currentCity: t
        });
    },
    _showLoading: function() {
        if (!this.data.loadDataFinish) {
            var i = this;
            t.cwx.showToast({
                title: "加载中..",
                icon: "loading",
                duration: 1e4,
                complete: function() {
                    i._showLoading();
                }
            });
        }
    }
});