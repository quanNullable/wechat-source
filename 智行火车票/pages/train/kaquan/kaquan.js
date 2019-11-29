var t = require("../../../cwx/cwx"), o = require("../common/components/toast/toast"), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../common/util")), e = require("../common/service"), c = (0, o.trainToast)(), a = {
    pageId: "10650001607",
    data: {
        speedPointNumber: 0,
        lockPoint: 0,
        couponList: []
    },
    onLoad: function(t) {},
    onShow: function() {
        var t = this;
        (0, e.GetUserAccountInfoPromise)({}).then(function(o) {
            t.setData({
                speedPointNumber: o.speedPointInfo.num
            });
        }).catch(function() {
            t.showTrainToast("获取加速包失败，请重试", "txt");
        }), (0, e.GetUserPointInfoPromise)().then(function(o) {
            t.setData({
                lockPoint: o.LockPoint
            });
        }).catch(function() {
            t.showTrainToast("获取锁定加速包失败，请重试", "txt");
        });
        var o = {
            pageIndex: 1
        };
        (0, e.GetCouponListPromise)({
            data: o
        }).then(function(o) {
            -1 == o.resultCode ? t.showTrainToast("获取优惠券失败，请重试", "txt") : (o.couponList.forEach(function(t) {
                t.couponStartDate = t.couponStartDate.split(" ")[0], t.couponEndDate = t.couponEndDate.split(" ")[0], 
                100 == t.couponType || 101 == t.couponType || 102 == t.couponType || 103 == t.couponType || 104 == t.couponType || 105 == t.couponType ? (t.type = 0, 
                t.title = "火车票优惠券") : 200 == t.couponType || 500 == t.couponType ? (t.type = 1, 
                t.title = "机票优惠券") : 400 == t.couponType ? (t.type = 2, t.title = "车票优惠券") : 300 == t.couponType ? (t.type = 3, 
                t.title = "酒店优惠券") : (t.type = 4, t.title = "优惠券");
            }), t.setData({
                couponList: o.couponList
            }));
        }).catch(function() {
            t.showTrainToast("获取优惠券失败，请重试", "txt");
        });
    },
    clickCoupon: function(t) {
        var o = t.currentTarget.dataset.type;
        0 == o || 2 == o ? this.gotoIndexPage(o) : this.showModal();
    },
    gotoIndexPage: function(o) {
        t.cwx.reLaunch({
            url: "/pages/train/index/index?flight=" + o
        });
    },
    showModal: function() {
        n.default.showModal({
            title: "温馨提示",
            m: "该优惠券仅限APP内使用，点击【确定】复制下载链接，打开浏览器粘贴链接即可下载。",
            done: function(o) {
                var n = t.cwx.config.isTieyou ? "t.ctrip.cn/erfn3b" : "suanya.cn/train";
                o.confirm && t.cwx.setClipboardData({
                    data: n,
                    success: function() {}
                });
            }
        });
    }
};

Object.assign(a.data, c.data), Object.keys(c.methods).forEach(function(t) {
    a[t] = c.methods[t];
}), (0, t.CPage)(a);