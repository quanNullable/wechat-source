var i = require("./image-scale.js"), e = function(e) {
    var _ = e.id, t = e.pic_url, p = e.name, n = e.distance, o = e.month_sales_tip, r = e.min_price_tip, s = e.delivery_type, c = e.shipping_fee_tip, a = e.wm_poi_score, m = e.delivery_time_tip, u = e.status, d = e.status_desc, l = e.shipping_time_info, f = e.poi_type_icon, v = e.discounts2, y = void 0 === v ? [] : v, g = e.average_price_tip, h = e.mt_poi_id, b = e.recommend_info, w = e.label_info;
    return y.forEach(function(e) {
        e.icon_url = i(e.icon_url, 0, 0, "o");
    }), w && (w = (w = w.filter(function(i) {
        return 3 === i.type && 1 === i.poi_service_type;
    })).length > 0 ? w[0] : void 0), {
        id: _,
        mt_poi_id: h,
        pic_url: i(t, 168),
        name: p,
        distance: n,
        month_sales_tip: o,
        min_price_tip: r,
        delivery_type: s,
        shipping_fee_tip: c,
        wm_poi_score: a,
        delivery_time_tip: m,
        status: u,
        status_desc: d,
        shipping_time_info: l,
        poi_type_icon: i(f, 60),
        discounts2: y,
        average_price_tip: g,
        recommend_info: b,
        label_info: w
    };
};

module.exports = function(i) {
    return i.map(e);
};