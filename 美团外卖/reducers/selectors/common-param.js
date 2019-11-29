var e = require("../../utils/visit-id.js"), i = require("../../constants.js"), t = i.VERSION, u = i.NAME;

module.exports = function(i) {
    var d = i.recipient, n = d.longitude, r = d.latitude, _ = i.dev.uuid, m = i.user, s = m.token, a = m.user_id, o = i.wx, w = o.longitude, l = o.latitude, c = o.model, v = o.version;
    return {
        wm_ctype: u,
        wm_dtype: c,
        wm_dversion: v,
        wm_uuid: _,
        wm_longitude: n || w,
        wm_latitude: r || l,
        wm_visitid: e(),
        wm_appversion: t,
        wm_channel: "",
        wm_did: "",
        wm_logintoken: s,
        userToken: s,
        req_time: Date.now(),
        waimai_sign: "/",
        wm_actual_longitude: w,
        wm_actual_latitude: l,
        userid: a,
        user_id: a,
        wm_mac: ""
    };
};