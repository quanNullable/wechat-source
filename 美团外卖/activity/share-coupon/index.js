function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function o(r, n) {
                try {
                    var i = t[r](n), s = i.value;
                } catch (e) {
                    return void a(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(s);
            }
            return o("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../utils/object-assign.js"), o = require("../../api/activity-api.js").request, r = require("../../api/analytics.js"), n = r.event, i = r.manual_pv, s = {
    onCouponPopCancle: function(e) {
        if ("cancle" === e.target.dataset.type) {
            if (this.setData({
                share_coupon_pop: !1
            }), this.mapSwtich) try {
                var t = wx.getSystemInfoSync();
                /iPhone/.test(t.model) ? wx.pageScrollTo({
                    scrollTop: 660 * t.windowWidth / 750,
                    duration: 0
                }) : wx.pageScrollTo({
                    scrollTop: 20,
                    duration: 0
                });
            } catch (e) {
                wx.pageScrollTo({
                    scrollTop: 20,
                    duration: 0
                });
            }
            this.setData({
                showMap: this.mapSwtich,
                disableReload: !1
            }), console.log("cancle");
        }
    },
    onClickCouponEntrance: function() {
        1 === this.data.showMap && this.setData({
            showMap: 0,
            disableReload: !0
        }), n({
            event_type: "click",
            val_bid: "b_KH3VP",
            val_lab: {
                custom: {
                    order_id: this.view_id,
                    source_id: 3
                }
            }
        }), this.setData({
            share_coupon_pop: !0
        }), i({
            val_lab: {
                custom: {
                    order_id: this.view_id,
                    source_id: 3
                }
            },
            c_id: "b_x82rg"
        });
    },
    loadShareCouponSwitch: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, n, i, s, c, p, u, h, l;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, r = getApp().store.getState(), n = r.wx, i = n.networkType, s = n.system, 
                    c = /iOS/.test(s) ? "iOS" : "Android", e.next = 5, o({
                        domain: "https://marketing.waimai.meituan.com/",
                        url: "o/wxapp/coupon/checkShare",
                        method: "POST",
                        successCode: 0,
                        data: {
                            orderId: a.view_id,
                            "couponShareUserInfo.clientType": c,
                            "couponShareUserInfo.device.deviceType": "phone",
                            "couponShareUserInfo.device.osType": c,
                            "couponShareUserInfo.device.osVersion": s,
                            "couponShareUserInfo.device.appName": "MT_WAIMAI_WEIXIN",
                            "couponShareUserInfo.device.netType": i
                        }
                    });

                  case 5:
                    p = e.sent, u = p.canShare, h = p.shareTipVo, a._share_tip = h, a._share_switch = u, 
                    e.next = 16;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(0), l = e.t0.message, console.log(l);

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 12 ] ]);
        }))();
    },
    onShareAppMessage: function(e) {
        if ("button" === e.from) {
            var t = this;
            n({
                event_type: "click",
                val_bid: "b_4hn5A",
                val_lab: {
                    custom: {
                        order_id: this.view_id,
                        source_id: 3
                    }
                }
            });
            var a = this.data.share_tip.share_info.url.match(/\w*\?urlKey=\w*/)[0], o = a.split("?urlKey=")[0], r = a.split("?urlKey=")[1];
            return {
                title: this.data.share_tip.share_info.title,
                imageUrl: this.data.share_tip.share_info.icon || "http://p0.meituan.net/codeman/a1e66280f23ab6aaefe29d86bfbc6601116200.png",
                path: "/sub_pages/sharecoupon/shareInit?channelUrlKey=" + o + "&urlKey=" + r,
                complete: function() {
                    t.setData({
                        share_coupon_pop: !1
                    });
                }
            };
        }
        var i = this.pageName || "unknown";
        return {
            title: "美团外卖",
            desc: this.onShareAppDesc(),
            path: "/pages/index/index?from=from_share_" + i
        };
    }
};

module.exports = function(e) {
    return e = a(e, s);
};