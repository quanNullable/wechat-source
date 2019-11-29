function o(o, a) {
    if (!(o instanceof a)) throw new TypeError("Cannot call a class as a function");
}

function a(o, a, n) {
    var t = "__" + a, s = o[a], i = !1;
    o[a] = function() {
        var e = Array.prototype.slice.call(arguments, 0);
        (!n || n && !i) && (i = !0, "onLoad" == a && (o.__page = this, this.__cpage = o), 
        s && s.apply(o, e)), o[t] && o[t].apply(this, e);
    };
}

module.exports = function n(t) {
    o(this, n);
    for (var s in t) if (t.hasOwnProperty(s)) switch (s) {
      case "onLoad":
      case "onReady":
      case "onShow":
      case "onHide":
      case "onUnload":
        this["__" + s] = t[s];
        break;

      default:
        this[s] = t[s];
    }
    var i = require("../ext/global.js").CPage;
    this.__isComponent = !!i.__isComponent, a(this, "onLoad", !0), a(this, "onReady", !1), 
    a(this, "onShow", !1), a(this, "onHide", !1), a(this, "onUnload", !0);
};