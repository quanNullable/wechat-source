var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(o) {
    return void 0 === o ? "undefined" : t(o);
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : t(o);
}, e = require("../npm/@hfe/mp-owl/lib/index.js"), n = require("../utils/promisify.js").obj, r = require("../utils/param.js"), i = require("../store.js"), u = n(e.request), m = {
    online: "https://promotion-waimai.meituan.com/",
    st: "https://promotion-waimai.meituan.com/",
    release: "https://promotion-waimai.meituan.com/",
    qa: "https://promotion.waimai.test.sankuai.com/"
}, a = function(t) {
    var e = t.data;
    e && "object" === (void 0 === e ? "undefined" : o(e)) && (t.method = t.method ? t.method : "POST", 
    "GET" === t.method ? t.url = t.url + "?" + r(e) : t.data = r(e), t.header = {
        "content-type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
    });
    var n = i.getState().dev.env;
    return n = n || "online", t.url = m[n] + t.url, u(t);
};

module.exports = {
    request: function(t) {
        return a(t).then(function(t) {
            var o = t.statusCode, e = t.errMsg, n = t.data;
            if ("200" !== String(o)) {
                var r = "Status code not 200[" + o + "]: " + e;
                throw {
                    code: -o,
                    data: n,
                    msg: r,
                    message: r
                };
            }
            return n;
        }).catch(function(t) {
            throw t;
        });
    }
};