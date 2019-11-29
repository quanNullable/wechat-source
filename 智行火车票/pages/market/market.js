var e = require("../../cwx/cwx.js"), i = require("./unionConfig.js"), r = i[e.cwx.appId] || i.wx0e6ed4f51db9d078, n = {}, o = function(i, r, n, o, a, d) {
    var t = wx.getStorageSync("mkt_union"), s = new Date().getTime() + 6048e5, l = new Date().getTime() + 6048e5, c = new Date().getTime() + 6048e5, u = new Date().getTime() + 72e5, p = null, m = null, f = null, x = {}, I = 0, g = 0, S = "", k = 0, w = "", C = "", O = "", y = "", E = 0, T = 0, D = "", J = 0, N = !1, U = !1, _ = !1, b = !1;
    if (t && (p = JSON.parse(t)), p && p.exmktid && (m = JSON.parse(p.exmktid)), i && "[object Object]" == Object.prototype.toString.call(i) && e._.each(i, function(e, i) {
        x[i.toLowerCase()] = e;
    }), x && x.mktshare) try {
        f = JSON.parse(e.cwx.util.mktBase64Decode(x.mktshare.replace(/\(\)/g, "=")));
    } catch (e) {
        console.log("【Market】Paser mktshare error ==> ", e);
    }
    n || (x && parseInt(x.allianceid) && parseInt(x.sid) ? (I = parseInt(x.allianceid), 
    g = parseInt(x.sid), S = x.ouid || S, U = !0) : f && parseInt(f.allianceid) && parseInt(f.sid) ? (I = parseInt(f.allianceid), 
    g = parseInt(f.sid), S = f.ouid || S, U = !0) : p && parseInt(p.allianceid) && parseInt(p.sid) && (I = parseInt(p.allianceid), 
    g = parseInt(p.sid), S = p.ouid || S)), o || (x && parseInt(x.sourceid) ? (k = parseInt(x.sourceid), 
    N = !0) : f && parseInt(f.sourceid) ? (k = parseInt(f.sourceid), N = !0) : p && parseInt(p.sourceid) && (k = parseInt(p.sourceid))), 
    a || (f && f.fromopenid ? (y = f.fromopenid, _ = !0) : m && m.fromopenid && (y = m.fromopenid), 
    x && parseInt(x.fromallianceid) && parseInt(x.fromsid) ? (E = parseInt(x.fromallianceid), 
    T = parseInt(x.fromsid), D = x.fromouid || D, _ = !0) : f && parseInt(f.fromallianceid) && parseInt(f.fromsid) ? (E = parseInt(f.fromallianceid), 
    T = parseInt(f.fromsid), D = f.fromouid || D, _ = !0) : m && parseInt(m.fromallianceid) && parseInt(m.fromsid) && (E = parseInt(m.fromallianceid), 
    T = parseInt(m.fromsid), D = m.fromouid || D), x && parseInt(x.fromsourceid) ? (J = parseInt(x.fromsourceid), 
    _ = !0) : f && parseInt(f.fromsourceid) ? (J = parseInt(f.fromsourceid), _ = !0) : m && parseInt(m.fromsourceid) && (J = parseInt(m.fromsourceid))), 
    d || (r ? (w = r, b = !0) : m && m.ReferralCode && (w = m.ReferralCode)), x && x.openid ? C = x.openid : m && m.openid && (C = m.openid), 
    x && x.unionid ? O = x.unionid : m && m.unionid && (O = m.unionid), !U && m && m.aidSidExpires && (s = m.aidSidExpires), 
    !N && m && m.sourceidExpires && (l = m.sourceidExpires), !_ && m && m.fromUnionExpires && (c = m.fromUnionExpires), 
    !b && m && m.referralCodeExpires && (u = m.referralCodeExpires);
    try {
        wx.setStorageSync("mkt_union", JSON.stringify({
            allianceid: I,
            sid: g,
            ouid: S,
            sourceid: k,
            exmktid: JSON.stringify({
                ReferralCode: w,
                openid: C,
                fromopenid: y,
                unionid: O,
                fromallianceid: E,
                fromsid: T,
                fromouid: D,
                fromsourceid: J,
                aidSidExpires: s,
                sourceidExpires: l,
                fromUnionExpires: c,
                referralCodeExpires: u
            })
        }));
    } catch (e) {
        console.log("【Market】Store market union error ==> ", e);
    }
}, a = function() {
    var e = null, i = 0, n = 0, a = "", d = 0, t = "", s = {};
    return !wx.getStorageSync("mkt_union") && o(), (e = JSON.parse(wx.getStorageSync("mkt_union"))) && (t = e.exmktid), 
    t && (s = JSON.parse(e.exmktid)), new Date().getTime() >= s.aidSidExpires && (o(null, null, !0), 
    e = JSON.parse(wx.getStorageSync("mkt_union"))), new Date().getTime() >= s.sourceidExpires && (o(null, null, !1, !0), 
    e = JSON.parse(wx.getStorageSync("mkt_union"))), new Date().getTime() >= s.fromUnionExpires && (o(null, null, !1, !1, !0), 
    e = JSON.parse(wx.getStorageSync("mkt_union"))), new Date().getTime() >= s.referralCodeExpires && (o(null, null, !1, !1, !1, !0), 
    e = JSON.parse(wx.getStorageSync("mkt_union"))), parseInt(e.allianceid) && parseInt(e.sid) ? (i = parseInt(e.allianceid), 
    n = parseInt(e.sid), a = e.ouid) : (i = r.aid, n = r.sid, a = r.ouid), d = parseInt(e.sourceid) ? parseInt(e.sourceid) : r.sourceid, 
    {
        allianceid: i,
        sid: n,
        ouid: a,
        sourceid: d,
        exmktid: t
    };
};

n.setUnion = function(e) {
    o(e);
}, n.getUnion = function(i) {
    var r = null, n = null;
    n = {
        allianceid: (r = a()).allianceid,
        sid: r.sid,
        ouid: r.ouid,
        sourceid: r.sourceid,
        exmktid: r.exmktid
    }, e._.isFunction(i) && i(n);
}, n.getUnionForCookie = function() {
    var e = null;
    return e = a(), "Union=OUID=" + e.ouid + "&AllianceID=" + e.allianceid + "&SID=" + e.sid + "&SourceID=" + e.sourceid;
}, n.setReferralCode = function(i, n) {
    var a = "";
    i && i.ubtTrace && e._.isFunction(i.ubtTrace) ? n ? (o(null, n.referralCode), a = JSON.stringify({
        DUID: e.cwx.user.duid || "",
        referralCode: n.referralCode || "",
        isRegister: n.isRegister || !1
    }), i.ubtTrace(r.rcKey, a)) : console.log("【Market】Call cwx.mkt.setReferralCode() method ==> Parameters null") : console.log("【Market】Call cwx.mkt.setReferralCode() method ==> Cannot send ubt");
}, n.sendUnionTrace = function(i, n) {
    var o = null, d = "";
    i && i.ubtTrace && e._.isFunction(i.ubtTrace) ? n ? (o = a(), d = JSON.stringify({
        appid: e.cwx.appId,
        orderid: n.toString(),
        allianceid: o.allianceid,
        sid: o.sid,
        ouid: o.ouid,
        sourceid: o.sourceid,
        exmktid: o.exmktid
    }), i.ubtTrace(r.ouKey, d)) : console.log("【Market】Call cwx.mkt.sendUnionTrace() method ==> OrderID null") : console.log("【Market】Call cwx.mkt.sendUnionTrace() method ==> Cannot send ubt");
}, n.getShareUnion = function() {
    var i = null, r = null, n = {};
    return (i = a()) && (n = {
        allianceid: i.allianceid,
        sid: i.sid,
        ouid: i.ouid,
        sourceid: i.sourceid
    }, i.exmktid && (r = JSON.parse(i.exmktid))), r && (n = e._.extend(n, {
        fromallianceid: r.fromallianceid,
        fromsid: r.fromsid,
        fromouid: r.fromouid,
        fromsourceid: r.fromsourceid,
        fromopenid: r.openid
    })), "mktshare=" + e.cwx.util.mktBase64Encode(JSON.stringify(n)).replace(/=/g, "()");
}, module.exports = n;