var t = require("../../../cwx/cwx"), a = require("../common/model"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../common/util")), i = require("../common/components/tip-bot/tip-bot"), o = require("../common/components/toast/toast"), s = (require("../common/store"), 
t.cwx.train), c = (0, o.trainToast)(), n = {
    data: {
        packageList: [],
        selectPackage: {},
        nonePackageId: 0,
        xTitle: "",
        xDesc: "",
        showChooseType: "",
        isFilterViewAnimation: !1,
        isWorkTime: !0,
        pkg12306idx: 0
    },
    onLoad: function() {
        var t = e.default.isWorkTime();
        this.setData({
            packageList: s.packageList,
            selectPackage: s.selectPackage,
            isWorkTime: t
        }), this.load12306FromStore();
    },
    loadData: function(t) {
        var e = this, i = {
            InfoKey: t
        };
        this.showTrainLoading(), (0, a.XProductModel)(i, function(t) {
            e.hideTrainLoading();
            var a = void 0, i = void 0;
            try {
                a = t.ProductInfoTitle, i = t.ProductInfoDesc.split("\r\n");
            } catch (t) {
                a = "", i = "";
            }
            e.setData({
                xTitle: a,
                xDesc: i,
                showChooseType: "detail"
            }), setTimeout(function() {
                e.setData({
                    isFilterViewAnimation: !0
                }, 10);
            });
        }, function(t) {});
    },
    choosePkg: function(a) {
        var i = a.currentTarget.dataset.index, o = this.data.packageList[i];
        !e.default.isForceBuy() || !t._.some([ "低速抢票", "不购买套餐" ], function(t) {
            return o.PackageTitle.startsWith(t);
        }) || this.data.isWorkTime && this.data.logedin ? (this.setData({
            selectPackage: o
        }), this.commit()) : this.setData({
            showType: "login-12306",
            pkg12306idx: i
        });
    },
    showDetail: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.packageList[a];
        this.loadData(e.PackageID);
    },
    hideDetail: function() {
        var t = this;
        this.setData({
            isFilterViewAnimation: !1
        }), setTimeout(function() {
            t.setData({
                showChooseType: ""
            }, 300);
        });
    },
    commit: function() {
        s.selectPackage = this.data.selectPackage, this.navigateBack();
    },
    hideBackDrop: function() {
        "login-12306" === this.data.showType && this.load12306FromStore(), this.setData({
            showType: ""
        });
    },
    chooseVIP: function() {
        var t = this.data.packageList[0];
        s.selectPackage = t, this.setData({
            selectPackage: t
        }), this.navigateBack();
    },
    buyTomorrow: function() {
        t.cwx.navigateBack({
            delta: 2
        });
    },
    login12306cb: function() {
        if (this.data.logedin) {
            var t = this.data.packageList[this.data.pkg12306idx];
            s.selectPackage = t, this.navigateBack();
        }
    }
};

Object.assign(n.data, i.login12306.data, c.data), Object.keys(i.login12306.methods).forEach(function(t) {
    n[t] = i.login12306.methods[t];
}), Object.keys(c.methods).forEach(function(t) {
    n[t] = c.methods[t];
}), (0, t.CPage)(n);