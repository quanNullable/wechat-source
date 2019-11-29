var e = require("./object-assign.js"), t = require("../store.js"), i = require("../constants.js"), u = i.VERSION, r = i.NAME;

module.exports = function(i) {
    var d = String(Math.random()), a = t.getState(), s = a.recipient, n = s.latitude, o = s.longitude, l = a.dev.uuid, c = a.wx, p = c.model, g = c.version, m = c.latitude, v = c.longitude, _ = a.user.user_id;
    return e({
        request_id: d,
        dtype: p,
        dversion: g,
        appname: r,
        appversion: u,
        customerid: _ || 0,
        uuid: l,
        ctype: r,
        latitude: n,
        longitude: o,
        wm_actual_latitude: m,
        wm_actual_longitude: v
    }, i);
};