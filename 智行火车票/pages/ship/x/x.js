var e = require("../../../cwx/cwx.js"), a = require("../api/api.js"), t = (require("../common/common.js"), 
require("../common/utils.js"));

(0, e.CPage)({
    data: {
        shipInfo: {},
        service_fee: 0,
        ship_name: ""
    },
    onLoad: function(e) {
        var t = this, i = {
            city_name: e.from_city_name,
            to_city_name: e.to_city_name,
            from_date: e.from_date,
            from_time: e.from_time,
            ship_name: e.ship_name,
            from_station_name: e.from_station_name,
            to_station_name: e.to_station_name,
            vendor: e.vendor
        };
        t.setData({
            ship_name: e.ship_name
        }), wx.setNavigationBarTitle({
            title: e.ship_name
        }), a.getShipInfo(i, function(e, a) {
            t.setData({
                shipInfo: a
            });
        });
    },
    bookingClick: function(a) {
        var i = this, o = a.currentTarget.dataset || {}, n = i.data.shipInfo, s = n.foreign_passenger, _ = JSON.stringify(s), r = n.passenger, m = JSON.stringify(r), c = [];
        r.forEach(function(e) {
            c.push(e.id_type);
        });
        var p = JSON.stringify(c), f = n.rule_desc, u = !1, d = 0;
        o.params.seat_child_price && o.params.seat_child_price > 0 && (u = !0, d = o.params.seat_child_price), 
        wx.setStorageSync("rule_desc", f);
        var g = {
            from_station_name: n.from_station_name,
            ship_name: n.ship_name,
            to_station_name: n.to_station_name,
            website: n.website,
            from_date: n.from_date,
            from_time: n.from_time,
            to_date: n.to_date,
            to_time: n.to_time,
            use_time: n.use_time,
            is_air_line: n.is_air_line,
            seat_name: o.params.seat_name,
            seat_ps: o.params.seat_ps,
            seat_price: o.params.seat_price,
            seat_child_price: d,
            service_fee: n.service_fee,
            from_city_name: n.from_city_name,
            to_city_name: n.to_city_name,
            to_day: n.to_day,
            vendor: n.vendor,
            ischild: u,
            foreign_passengercode: _,
            passengertypescode: p,
            passengercode: m,
            passgenumber: n.max_passenger_count
        };
        e.cwx.user.isLogin() ? wx.navigateTo({
            url: t.AppendParams("../book/book", g),
            success: function(e) {},
            fail: function(e) {
                console.log("[book]跳转填写页失败");
            }
        }) : e.cwx.user.login({
            callback: function(e) {
                0 == e.ReturnCode && wx.navigateTo({
                    url: t.AppendParams("../book/book", g),
                    success: function(e) {},
                    fail: function(e) {
                        console.log("[book]跳转填写页失败");
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {}
});