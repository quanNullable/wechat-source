var t = function() {
    function t(t, r) {
        var e = [], n = !0, a = !1, i = void 0;
        try {
            for (var o, u = t[Symbol.iterator](); !(n = (o = u.next()).done) && (e.push(o.value), 
            !r || e.length !== r); n = !0) ;
        } catch (t) {
            a = !0, i = t;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (a) throw i;
            }
        }
        return e;
    }
    return function(r, e) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return t(r, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = require("./starts-with.js"), e = function() {
    try {
        var t = top.document.createElement("canvas");
        t.width = 1, t.height = 1;
        var e = t.toDataURL("image/webp");
        return r(e, "data:image/webp");
    } catch (t) {
        return !1;
    }
}(), n = /^https?:\/\/p\d\.meituan.net\//, a = /^\d+\.\d+\./, i = 0, o = function(t) {
    var r = t / 750;
    return Math.min(Math.max(.2, .2 * Math.round(r / .2)), 2);
};

module.exports = function(r) {
    var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, h = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 80;
    if (!r) return r;
    if (0 === i) {
        var d = getApp().store.getState().wx, l = d.windowWidth, v = d.pixelRatio;
        l > 0 && v > 0 && (i = o(l * v));
    }
    var f = u, s = h;
    0 !== i && (f = Math.round(i * u), s = Math.round(i * h));
    var p = n.exec(r);
    if (!p) return r;
    var w = t(p, 1)[0], m = r.slice(w.length);
    if (a.test(m)) return r;
    var g = "" + w + f + "." + s + "." + c + "/" + m, y = ".webp" === r.slice(-5);
    return !e || y ? g : g + ".webp";
};