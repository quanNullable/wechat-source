function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function o(t, e) {
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

var a = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var a = e[o];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, o, a) {
        return o && t(e.prototype, o), a && t(e, a), e;
    };
}(), n = function t(e, o, a) {
    null === e && (e = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(e, o);
    if (void 0 === n) {
        var r = Object.getPrototypeOf(e);
        return null === r ? void 0 : t(r, o, a);
    }
    if ("value" in n) return n.value;
    var i = n.get;
    if (void 0 !== i) return i.call(a);
}, r = require("../ext/global.js"), i = r.cwx, _ = r.CPage, s = require("./ubt_wx.js"), u = function(r) {
    function u(o) {
        function a(t, e, o) {
            return function(a) {
                o && n.__ubt_isEvent(arguments) && n.__ubt_logTap(a, t);
                var r, _ = Array.prototype.slice.call(arguments, 0);
                if (e) try {
                    r = e.apply(n.__page, _);
                } catch (t) {
                    try {
                        "string" == typeof t && (t = new Error(t));
                        var s = {
                            message: t && t.message,
                            file: 0,
                            category: "inner-error",
                            framework: "normal",
                            time: 0,
                            line: 0,
                            column: 0,
                            stack: t && t.stack && t.stack.split("\n"),
                            repeat: 1
                        };
                        n.__ubt_instance.send("error", s);
                    } catch (t) {}
                    if (!i.util.isDevice()) throw t;
                    setTimeout(function() {
                        throw t;
                    }, 0);
                }
                return r;
            };
        }
        t(this, u);
        var n, r = {};
        for (var c in o) if (o.hasOwnProperty(c)) switch (c) {
          case "ubtTrack":
          case "ubtMetric":
          case "ubtTrace":
            break;

          case "onLoad":
          case "onReady":
          case "onShow":
          case "onHide":
          case "onUnload":
            r[c] = a(c, o[c], !1);
            break;

          default:
            _.__isComponent || "function" != i.util.type(o[c]) ? r[c] = o[c] : r[c] = a(c, o[c], !0);
        }
        r.ubtTrack = a("ubtTrack", null, !0);
        var p = e(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, r));
        return n = p, p.__ubt_instance = s.createPV(), p.__ubt_events = {}, p;
    }
    return o(u, _.baseClass), a(u, [ {
        key: "onLoad",
        value: function(t) {
            n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onLoad", this) && n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onLoad", this).call(this, t), 
            this.__ubt_totalActiveTime = 0, this.__ubt_onLoadTime = +new Date(), this.__ubt_isBack = !1, 
            this.__ubt_isBackFlag = !1;
        }
    }, {
        key: "onReady",
        value: function() {
            n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onReady", this) && n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onReady", this).call(this), 
            this.__ubt_isBack || (this.__ubt_onActiveTime = +new Date());
            var t = this.__ubt_getPageInfo();
            t.readyTime = +new Date() - this.__ubt_onLoadTime, this.__isComponent || (i.config.ubtDebug && console.log("UBT Page Performance", t), 
            this.__ubt_instance.send("metric", {
                name: 100359,
                value: t.readyTime
            }));
        }
    }, {
        key: "onShow",
        value: function() {
            n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onShow", this) && n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onShow", this).call(this), 
            this.hasOwnProperty("__ubt_isBackFlag") ? delete this.__ubt_isBackFlag : this.__ubt_isBack = !0, 
            this.__ubt_isBack && (this.__ubt_onActiveTime = +new Date());
            var t = this.__ubt_getPageInfo();
            t.isBack = this.__ubt_isBack, t.url = "" + this.__page.__route__, this.__isComponent || (i.config.ubtDebug && console.log("UBT Pageview", t), 
            this.__ubt_instance = this.__ubt_instance.send("pv", t));
        }
    }, {
        key: "onHide",
        value: function() {
            n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onHide", this) && n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onHide", this).call(this), 
            this.__ubt_totalActiveTime += +new Date() - this.__ubt_onActiveTime;
        }
    }, {
        key: "onUnload",
        value: function() {
            n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onUnload", this) && n(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "onUnload", this).call(this), 
            this.__ubt_totalActiveTime += +new Date() - this.__ubt_onActiveTime, this.__isComponent || this.__ubt_instance.send("metric", {
                name: 100370,
                value: this.__ubt_totalActiveTime
            });
        }
    }, {
        key: "__ubt_isEvent",
        value: function(t) {
            var e = t[0];
            return !!(1 == t.length && e && e.timeStamp && ("tap" == e.type || "longtap" == e.type) && !this.__ubt_events.hasOwnProperty(e.type + "_" + e.timeStamp) && e.touches && e.touches[0] && e.target && e.currentTarget);
        }
    }, {
        key: "__ubt_getPageInfo",
        value: function() {
            var t = {};
            if (this.__isComponent) {
                for (var e = this.__page; !e.__isComponent; ) e = e.__page;
                t.pageId = "" + (e.pageId || e.pageid || "0");
            } else t.pageId = "" + (this.pageId || this.pageid || "0");
            return t;
        }
    }, {
        key: "__ubt_logTap",
        value: function(t, e) {
            var o = this, a = t.type + "_" + t.timeStamp;
            this.__ubt_events[a] = !0, setTimeout(function() {
                delete o.__ubt_events[a];
            }, 1e3);
            var n = this.__ubt_getPageInfo();
            if (n.type = t.type, n.xpath = "//Page", !i.util.compare(t.currentTarget, t.target)) {
                n.xpath += "/CurrentTarget";
                var r = t.currentTarget.id;
                r && (n.xpath += "[@id=" + r + "]");
                var _ = t.currentTarget.dataset.ubtKey;
                _ && (n.xpath += "[@cid=" + _ + "]");
            }
            n.xpath += "/Target";
            var s = t.target.id;
            "string" == typeof e && (n.xpath += "[@fn=" + e + "]"), s && (n.xpath += "[@id=" + s + "]");
            var u = t.target.dataset.ubtKey;
            u && (n.xpath += "[@cid=" + u + "]"), n.xpath += "[@x=" + t.touches[0].pageX + "]", 
            n.xpath += "[@y=" + t.touches[0].pageY + "]", i.config.ubtDebug && console.log("UBT Page Event", n), 
            this.__ubt_instance.send("useraction", {
                action: "click",
                ts: +new Date(),
                xpath: n.xpath
            });
        }
    }, {
        key: "ubtTrace",
        value: function(t, e) {
            var o = "";
            switch (i.util.type(e)) {
              case "string":
              case "number":
                o = e;
                break;

              default:
                o = JSON.stringify(e);
            }
            if (i.config.ubtDebug) {
                var a = this.__ubt_getPageInfo();
                a.traceName = t, a.traceValue = o, console.log("UBT Page Trace", a);
            }
            this.__ubt_instance.send("tracelog", {
                name: t,
                value: o
            });
        }
    }, {
        key: "ubtMetric",
        value: function(t) {
            this.__ubt_instance.send("metric", t || {});
        }
    } ]), u;
}(), c = {};

r.UBT = c, module.exports = u;