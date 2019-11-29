var e = require("../npm/redux/lib/index.js"), r = require("./addr-edit.js"), i = require("./cart.js"), s = require("./poi.js"), u = require("./dev.js"), d = require("./user.js"), a = require("./recipient.js"), t = require("./purchase.js"), j = require("./wx.js"), q = require("./extradata.js"), c = require("./web-view.js"), p = (0, 
e.combineReducers)({
    addrEdit: r,
    cart: i,
    poi: s,
    dev: u,
    user: d,
    recipient: a,
    purchase: t,
    wx: j,
    extradata: q,
    webview: c
});

module.exports = p;