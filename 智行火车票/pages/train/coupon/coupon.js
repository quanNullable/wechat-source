function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

var t = require("../../../cwx/cwx"), n = require("../common/model"), a = (o(require("../common/cDate")), 
o(require("../common/util"))), e = t.cwx.common;

(0, t.CPage)({
    data: {
        validCouponList: [],
        invalidCouponList: [],
        selectedCoupon: {},
        couponType: 0,
        eventBody: []
    },
    onLoad: function(o) {
        this.data.couponType = o.couponType, this.data.eventBody = e.eventBody, this.loadData();
    },
    loadData: function(o) {
        var t = this;
        a.default.showLoading();
        var e = {
            data: {
                couponType: this.data.couponType,
                eventBody: this.data.eventBody
            }
        };
        (0, n.GetUserAvailableCouponsModel)(e, function(o) {
            a.default.hideLoading(), 1 === o.resultCode && o.couponList.forEach(function(o) {
                0 === o.couponState ? t.data.validCouponList.push(o) : t.data.invalidCouponList.push(o), 
                t.setData({
                    validCouponList: t.data.validCouponList,
                    invalidCouponList: t.data.invalidCouponList
                });
            });
        }, function(o) {
            a.default.showWaringDialog("查询失败，请稍候重试");
        }, function() {});
    },
    chooseCoupon: function(o) {
        var t = o.currentTarget.dataset.index, n = this.data.validCouponList[t];
        this.setData({
            selectedCoupon: n
        }), this.commit();
    },
    chooseNoCoupon: function(o) {
        this.setData({
            selectedCoupon: null
        }), this.commit();
    },
    commit: function() {
        e.selectedCoupon = this.data.selectedCoupon, this.navigateBack();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});