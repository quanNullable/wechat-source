var e = require("../ext/global.js").cwx, t = 0, a = function t(a) {
    if (t.__isComponent) {
        var n = e.util.copy(a);
        t.createInstance(n);
    } else {
        var r = {
            onLoad: function() {
                var n = this, r = Array.prototype.slice.call(arguments, 0), o = e.util.copy(a), s = t.createInstance(o);
                for (var i in s) s.hasOwnProperty(i) && ("data" == i ? (this.data = s[i], this.setData(s[i])) : ("__cpage" == i || 0 != i.indexOf("__") || o.hasOwnProperty(i)) && (n[i] = s[i]));
                this.setData({
                    partner: e.config.partner
                });
                for (var c = s.__proto__; c && c != Object.prototype; ) Object.getOwnPropertyNames(c).forEach(function(t) {
                    "constructor" != t && "__proto__" != t && 0 != t.indexOf("__") && ("function" == e.util.type(c[t]) ? s[t] === c[t] && (n[t] = c[t].bind(s)) : n[t] = c[t]);
                }), c = c.__proto__;
                this.onLoad.apply(this, r);
            }
        };
        if (a.data && (r.data = e.util.copy(a.data), delete a.data), a.onShareAppMessage) try {
            var o = a.onShareAppMessage;
            r.onShareAppMessage = function() {
                var t = o.call(this);
                if (this.ubtTrace) {
                    var a = e.util.copy(t);
                    this.ubtTrace("wxshare", a);
                }
                var n = e.mkt.getShareUnion();
                return n = (-1 != t.path.indexOf("?") ? "&" : "?") + n, t.path += n, t;
            }, delete a.onShareAppMessage;
        } catch (e) {
            console.log("wrapOnShareAppMessage error");
        }
        Page(r);
    }
};

a.__isComponent = 0, a.__cache = [], a.createInstance = function(e) {
    var n = new a.baseClass(e);
    n.__instanceId = t++;
    return a.__isComponent && (a.__cache[a.__isComponent] = {
        id: n.__instanceId,
        options: e,
        instance: n
    }), n;
}, a.baseClass = require("./base.js"), a.modules = {
    UBT: function() {
        return require("./ubt.js");
    },
    Navigator: function() {
        return require("./navigator.js");
    }
}, a.use = function(t) {
    if ("string" == e.util.type(t)) {
        var n = a.modules[t];
        if ("function" != e.util.type(n)) throw "Unknow CPage module " + t;
        t = n();
    }
    if ("function" != e.util.type(t)) throw "CPage module only support class";
    a.baseClass = t;
}, module.exports = a;