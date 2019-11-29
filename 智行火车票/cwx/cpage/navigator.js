function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function a(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function o() {
    return ++c;
}

function i(t, e) {
    for (var a = -1, o = 0; o < t.length; o++) if (-1 != t[o].indexOf(e)) {
        a = o;
        break;
    }
    return a;
}

var n = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var o = e[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, a, o) {
        return a && t(e.prototype, a), o && t(e, o), e;
    };
}(), r = function t(e, a, o) {
    null === e && (e = Function.prototype);
    var i = Object.getOwnPropertyDescriptor(e, a);
    if (void 0 === i) {
        var n = Object.getPrototypeOf(e);
        return null === n ? void 0 : t(n, a, o);
    }
    if ("value" in i) return i.value;
    var r = i.get;
    if (void 0 !== r) return r.call(o);
}, l = require("../ext/global.js").cwx, _ = require("../ext/global.js").CPage, c = 0, s = {}, u = [], p = __wxConfig.tabBar && __wxConfig.tabBar.list ? __wxConfig.tabBar.list.map(function(t) {
    return t.pagePath;
}) : [ "pages/home/homepage", "pages/myctrip/list/list" ], g = function(c) {
    function g(a) {
        return t(this, g), e(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, a));
    }
    return a(g, _.baseClass), n(g, [ {
        key: "onLoad",
        value: function(t) {
            try {
                l.mkt.setUnion(t);
            } catch (t) {
                console.log("CPage cwx.mkt.setUnion error = ", t);
            }
            1 == u.length && -1 != i(p, this.__page.__route__) ? u = [ this.__page.__route__ ] : u.push(this.__page.__route__);
            var e = null;
            if (delete this.__navigator_fromUid, t && t.hasOwnProperty("__navigator")) {
                e = t.__navigator, delete t.__navigator;
                var a = s[e];
                a && (this.__navigator_fromUid = e, t.data = a.data);
            }
            r(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "onLoad", this) && r(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "onLoad", this).call(this, t), 
            this.__navigator_isBack = !1, this.__navigator_isBackFlag = !1;
        }
    }, {
        key: "onShow",
        value: function() {
            if (r(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "onShow", this) && r(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "onShow", this).call(this), 
            this.hasOwnProperty("__navigator_isBackFlag") ? delete this.__navigator_isBackFlag : this.__navigator_isBack = !0, 
            this.__navigator_isBack) {
                1 == u.length && -1 != p.indexOf(this.__page.__route__) && (u = [ this.__page.__route__ ]);
                var t = this.__navigator_toUid;
                t && s[t] && (s[t].callback && s[t].backDatas.forEach(function(e) {
                    s[t].callback.call(this.__page, e);
                }.bind(this)), s[t].navComplete && s[t].navComplete.call(this.__page), delete this.__navigator_toUid);
            }
        }
    }, {
        key: "onUnload",
        value: function() {
            u[u.length - 1] == this.__page.__route__ && u.pop();
        }
    }, {
        key: "navigateTo",
        value: function(t) {
            var e = o(), a = t.url, i = {
                url: a + (/\?/.test(a) ? "&" : "?") + "__navigator=" + encodeURIComponent(e),
                success: t.success ? t.success.bind(this.__page) : null,
                fail: t.fail ? t.fail.bind(this.__page) : null,
                complete: t.complete ? t.complete.bind(this.__page) : null
            };
            if (this.getPageLevel() >= 10) {
                var n = {
                    error: "页面层级超过10层",
                    errorCode: "500"
                };
                return console.log("CPage.navigateTo :", n, a), i.fail && i.fail(n), void (i.complete && i.complete(n));
            }
            s[e] = {
                data: t.data,
                immediateCallback: t.immediateCallback ? t.immediateCallback.bind(this.__page) : null,
                callback: t.callback ? t.callback.bind(this.__page) : null,
                navComplete: t.navComplete ? t.navComplete.bind(this.__page) : null,
                backDatas: []
            }, this.__navigator_toUid = e, l.navigateTo(i);
        }
    }, {
        key: "navigateBack",
        value: function(t) {
            var e = this.__navigator_fromUid;
            e && s[e] && arguments.length > 0 && (s[e].backDatas.push(t), s[e].immediateCallback && s[e].immediateCallback(t)), 
            l.navigateBack();
        }
    }, {
        key: "invokeCallback",
        value: function(t) {
            var e = this.__navigator_fromUid;
            e && s[e] && (s[e].backDatas.push(t), s[e].immediateCallback && s[e].immediateCallback(t));
        }
    }, {
        key: "getPageStack",
        value: function() {
            return l.util.copy(u);
        }
    }, {
        key: "getPageLevel",
        value: function() {
            return this.getPageStack().length;
        }
    } ]), g;
}();

module.exports = g;