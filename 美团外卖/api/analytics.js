var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/@analytics/wechat-sdk/lib/index.js")), t = require("../utils/object-assign.js"), a = function() {
    var t = e.default.get("uid"), a = e.default.get("wxid"), l = getApp().store.getState().user, i = l.user_id, u = l.open_id, d = !t || "0" === t;
    if (!(i && "0" !== i || d)) return e.default.set("uid", 0);
    d && e.default.set("uid", i || 0);
    var r = !a || "" === a;
    return u && "" !== u || r ? (r && e.default.set("wxid", u || ""), !0) : e.default.set("wxid", "");
}, l = {};

l.init = function() {
    e.default.init("https://report.meituan.com", {
        appnm: "waimai_wxapp",
        category: "waimai"
    });
}, l.event = function(i) {
    l.set_lch(), a(), i.val_lab = i.val_lab ? i.val_lab : {};
    var u = getApp().store.getState().wx, d = u.longitude, r = u.latitude, n = {};
    i.val_lab.custom ? (i.val_lab.custom.longitude = d, i.val_lab.custom.latitude = r, 
    n = i.val_lab) : n = t(i.val_lab, {
        custom: {
            longitude: d,
            latitude: r
        }
    }), "pageview" === i.event_type ? e.default.pageView(i.cid, n) : "view" === i.event_type ? e.default.moduleView(i.val_bid, n) : "click" === i.event_type ? e.default.moduleClick(i.val_bid, n) : "order" === i.event_type && e.default.order(i.val_bid, n.order_id);
}, l.pv = function() {
    l.set_lch();
    var e = "", a = getCurrentPages(), i = a[a.length - 1], u = getApp().store.getState().user.user_id, d = {
        custom: {
            user_id: u
        }
    }, r = i.getReportData();
    if (!r || !0 !== r.manual_pv) {
        var n = r.val ? r.val : {};
        n.cat_id && (d.custom.cat_id = n.cat_id), n.label_word && (d.custom.label_word = n.label_word), 
        r.cid && (e = r.cid), d = t(d, n), l.event({
            event_type: "pageview",
            cid: e,
            uid: u || 0,
            val_lab: d
        });
    }
}, l.manual_pv = function(e) {
    l.set_lch(), l.event({
        event_type: "pageview",
        cid: e.c_id,
        val_lab: e.val_lab ? e.val_lab : {}
    });
}, l.setEnv = function(t, a) {
    e.default.set(t, a);
}, l.route = null, l.set_lch = function() {
    try {
        var t = getCurrentPages()[0].route;
        if (t === l.route) return;
        l.route = t;
        for (var a = !1, i = [ "sharecoupon", "wx-gift", "activity-invite" ], u = 0; u < i.length; u++) new RegExp(i[u]).test(t) && (a = !0);
        if (a) e.default.set("lch", "wxi"); else try {
            var d = wx.getStorageSync("wx_scene");
            e.default.set("lch", d || "wx");
        } catch (t) {
            e.default.set("lch", "wx");
        }
    } catch (t) {
        e.default.set("lch", "wx");
    }
}, l.turnOnValidate = e.default.turnOnValidate, l.start = e.default.start, l.quit = e.default.quit, 
module.exports = l;