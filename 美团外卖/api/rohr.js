var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(o) {
    return void 0 === o ? "undefined" : t(o);
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : t(o);
}, n = require("../npm/pako/lib/deflate.js").deflate, e = require("./btoa.js"), r = require("../store.js"), i = function(t) {
    var o = n(JSON.stringify(t), {
        to: "string"
    });
    return e(o);
}, c = function(t) {
    var n = [];
    return Object.keys(t).sort().forEach(function(e) {
        var r = t[e];
        "_token" !== e && "" !== r && void 0 !== r && null !== r && (r && "object" === (void 0 === r ? "undefined" : o(r)) && (r = JSON.stringify(r)), 
        n.push(e + "=" + r));
    }), i(n.join("&"));
}, u = {
    rId: 100016,
    ts: 0,
    cts: 0,
    brVD: [],
    brR: [],
    bI: [],
    mT: [],
    kT: [],
    aT: [],
    tT: [],
    sign: ""
}, a = function() {
    if (0 === u.ts) {
        var t = r.getState().wx, o = t.pixelRatio, n = t.windowWidth, e = t.windowHeight, i = [ n, e ], c = [ Math.round(o * n), Math.round(o * e) ], a = c;
        u.ts = Date.now(), u.brVD = i, u.brR = [ c, a, 24, 24 ];
    }
}, l = {
    handleTouchMove: function(t) {
        var o = t.touches, n = t.changedTouches, e = n && n[0] || o && o[0];
        if (e) {
            var r = e.clientX, i = e.clientY;
            u.mT = [ r + "," + i ].concat(u.mT.slice(0, 29)), u.tT = [ r + "," + i + "," + o.length ].concat(u.tT.slice(0, 29));
        }
    },
    handleTap: function(t) {
        var o = t.detail, n = o.x, e = o.y;
        u.aT = [ n + "," + e + ",view" ].concat(u.aT.slice(0, 29));
    },
    reload: function(t) {
        a();
        var o = "", n = "";
        try {
            var e = getCurrentPages(), r = e.length;
            o = e[r - 1].__route__, r > 1 && (n = e[r - 2].__route__);
        } catch (t) {
            console.error(t);
        }
        return u.sign = c(t), u.cts = Date.now(), u.bI = [ o, n ], i(u);
    }
};

module.exports = l;