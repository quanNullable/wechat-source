var i = Object.assign || function(i) {
    for (var l = 1; l < arguments.length; l++) {
        var e = arguments[l];
        for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (i[t] = e[t]);
    }
    return i;
}, l = require("../../utils/object-assign.js"), e = {
    lxViewSpu: function(l) {
        this.lxMge.view(i({
            val_bid: "b_Wl3cp"
        }, l));
    },
    lxClickSpu: function(l) {
        this.lxMge.click(i({
            val_bid: "b_sct3Y"
        }, l));
    },
    lxClickAddFood: function(l) {
        this.lxMge.click(i({
            val_bid: "b_xU9Ua"
        }, l));
    },
    lxClickAddModalFood: function(l) {
        this.lxMge.click(i({
            val_bid: "b_m9pmX"
        }, l));
    },
    lxShowDiscounts: function(l) {
        this.lxMge.view(i({
            val_bid: "b_DzJtl"
        }, l));
    },
    lxClickDiscounts: function(l) {
        this.lxMge.click(i({
            val_bid: "b_c3QkV"
        }, l));
    },
    lxClickLeftTab: function(l) {
        this.lxMge.click(i({
            val_bid: "b_MOzqJ"
        }, l));
    },
    lxScrollLeftTab: function(l) {
        this.lxMge.click(i({
            val_bid: "b_4UpWy"
        }, l));
    },
    lxClickSwiperTabHeader: function(l) {
        var e = void 0;
        switch (l.targetIndex) {
          case 0:
            e = "b_Qq92p";
            break;

          case 1:
            e = "b_SHvZg";
            break;

          case 2:
            e = "b_eqjRl";
        }
        e && this.lxMge.click(i({
            val_bid: e
        }, l));
    },
    lxViewShopInRest: function(l) {
        this.lxMge.view(i({
            val_bid: "b_rgj7Z"
        }, l));
    },
    lxToggleCart: function(l) {
        this.lxMge.click(i({
            val_bid: "b_6yMpF"
        }, l));
    },
    lxSubmitCart: function(l) {
        this.lxMge.click(i({
            val_bid: "b_ac7Bs"
        }, l));
    },
    lxAddMoreView: function(l) {
        this.lxMge.click(i({
            val_bid: "b_JA73d"
        }, l));
    },
    lxAddMoreClick: function(l) {
        this.lxMge.click(i({
            val_bid: "b_UjQR8"
        }, l));
    },
    lxMgeLog: function(l, e) {
        this.lxMge.click(i({
            val_bid: l
        }, e));
    },
    lxLogWXAppError: function(l, e) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, c = "", o = {};
        try {
            var a = wx.getSystemInfoSync();
            o = {
                brand: a.brand,
                model: a.model,
                version: a.version,
                system: a.system,
                platform: a.platform,
                SDKVersion: a.SDKVersion
            };
        } catch (l) {
            o = {
                otherInfo: "cannot get sys info"
            };
        }
        var n = i({
            userInfo: o,
            event: e
        }, t, {
            loadFrom: this.loadFrom,
            isUnderSpuMaxNumber: this.data.isUnderSpuMaxNumber
        });
        switch (l) {
          case "NULL":
            c = "b_gg87ashh", "modalFoodViewData" === t.source && (n.modalFood = this.data.modalFood);
            break;

          case "UNDEFINED":
            c = "b_j4ce6kqi";
            break;

          case "WXAPI":
            c = "b_kde02x89";
        }
        c && this.lxMgeLog(c, n);
    }
};

module.exports = function(i) {
    return l(i, e), i;
};