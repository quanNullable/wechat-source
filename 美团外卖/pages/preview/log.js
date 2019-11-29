var i = require("../../utils/object-assign.js"), l = {
    USABLEADDR: 1
}, t = function(i) {
    return i === l.USABLEADDR;
}, e = {
    lx_address_type: 0,
    lxAllView: function(i) {
        var l = i.previewData, t = void 0 === l ? {} : l;
        this.lxAddrView(t).lxSubmitView();
    },
    lxAddrView: function(i) {
        var l = i.address_type, e = void 0 === l ? 0 : l;
        return this.lxMge.view({
            val_bid: "b_zXVeV",
            custom: {
                address_type: this.lx_address_type || e,
                is_recommend: t(e) ? 1 : 0
            }
        }), this;
    },
    lxAddrClick: function(i) {
        var l = i.currentTarget.dataset.addressType, e = void 0 === l ? 0 : l;
        this.lxMge.click({
            val_bid: "b_Cuvkr",
            custom: {
                is_recommend: t(e) ? 1 : 0
            }
        });
    },
    lxArrivalTimeClick: function() {
        this.lxMge.click({
            val_bid: "b_8Xs6V"
        });
    },
    lxFoodToggleOpenClick: function() {
        this.lxMge.click({
            val_bid: "b_lxmcrvvx"
        });
    },
    lxFoodToggleCloseClick: function() {
        this.lxMge.click({
            val_bid: "b_or3smks8"
        });
    },
    lxRedpackClick: function() {
        this.lxMge.click({
            val_bid: "b_1CdKD"
        });
    },
    lxShopCouponClick: function() {
        this.lxMge.click({
            val_bid: "b_f6INz"
        });
    },
    lxPayTypeClick: function(i) {
        this.lxMge.click({
            val_bid: "b_ksH4S",
            custom: {
                pay_type: i
            }
        });
    },
    lxRemindClick: function() {
        this.lxMge.click({
            val_bid: "b_e64riq44"
        });
    },
    lxDinnerClick: function(i) {
        this.lxMge.click({
            val_bid: "b_uWU2j",
            custom: {
                dinner_usercount: i
            }
        });
    },
    lxSubmitView: function() {
        this.lxMge.view({
            val_bid: "b_JPPE5"
        });
    },
    lxNoAddrView: function() {
        this.lxMge.view({
            val_bid: "b_zc57bupl"
        });
    },
    lxSubmitClick: function() {
        var i = this.data.poi_id;
        this.lxMge.click({
            val_bid: "b_ciJxy",
            poi_id: i,
            custom: {}
        });
    },
    lxPrivacySwitchStatusView: function(i) {
        var l = i.previewData.token;
        this.lxMge.view({
            val_bid: "b_lfipvofu",
            token: l
        });
    },
    lxPrivacySwitchStatusClick: function() {
        var i = this.data, l = i.previewData.token, t = i.privacy.using;
        this.lxMge.click({
            val_bid: "b_4hkay8i6",
            token: l,
            custom: {
                status: t
            }
        });
    }
};

module.exports = function(l) {
    return i(l, e), l;
};