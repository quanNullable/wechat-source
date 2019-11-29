var e = require("./global.js"), r = require("./lz77.js");

"function" != typeof Object.assign && (Object.assign = function(e) {
    if (null == e) throw new TypeError("Cannot convert undefined or null to object");
    e = Object(e);
    for (var r = 1; r < arguments.length; r++) {
        var n = arguments[r];
        if (null != n) for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
    }
    return e;
});

var n = {};

n.entryPath = __wxConfig.pages[0], n.cwxPath = n.entryPath.replace(/\/entry\/entry$/, ""), 
n.getRootPathPrefix = function(e) {
    for (var r = require("./config.js"), t = ""; ;) try {
        if (r === e(t + n.cwxPath + "/config.js")) break;
    } catch (e) {
        t += "../";
    }
    return t;
}, n.type = function(e) {
    var r = "";
    if (null === e) r = "null"; else if (void 0 === e) r = "undefined"; else {
        var n = Object.prototype.toString.call(e), t = n.match(/^\[object (\w+?)\]$/);
        r = t ? t[1].toLowerCase() : n;
    }
    return r;
}, n.compare = function(e, r) {
    return JSON.stringify(e) == JSON.stringify(r);
}, n.runCode = function(r, t) {
    e.__runCodeResult = void 0;
    var o = [], a = [];
    switch (n.type(t)) {
      case "array":
        a = t;
        break;

      case "object":
        for (var c in t) t.hasOwnProperty(c) && (o.push(c), a.push(t[c]));
    }
    return o.push(r), __Func.apply(null, o).apply(this, a);
}, n.runExpr = function(e, r) {
    return n.runCode.call(this, "return (" + e + ")", r);
}, n.requireRemote = function(e, r) {
    var t = "__remote__/" + e.replace(/:\/\//, "/");
    try {
        var o = __wxConfig.projectConfig.Network.RequestDomain;
        __wxConfig.projectConfig.Network.RequestDomain = (e.match(/^\w+:\/\/[^\/]*\//) || [ "" ])[0];
    } catch (e) {}
    wx.request({
        url: e,
        success: function(e) {
            n.runCode('define("' + t + '", function(require, module){' + e.data + "})");
            var o = require(n.getRootPathPrefix(require) + t);
            r && r(o);
        },
        fail: function() {
            console.log("Error //todo");
        }
    });
    try {
        __wxConfig.projectConfig.Network.RequestDomain = o;
    } catch (e) {}
}, n.copy = function(e) {
    var r;
    switch (n.type(e)) {
      case "array":
        r = e.map(n.copy);
        break;

      case "object":
        r = {};
        for (var t in e) e.hasOwnProperty(t) && (r[t] = n.copy(e[t]));
        break;

      case "date":
        r = new Date(+e);
        break;

      default:
        r = e;
    }
    return r;
}, n.isDevice = function() {
    return !e.navigator;
}, n.cc2str = function(e) {
    for (var r = "", n = 0; n < e.length; n++) r += String.fromCharCode(e[n]);
    return r;
}, n.base64 = {
    key: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    btoa: function(e, r) {
        for (var t = (r = r || {}).key || n.base64.key, o = "", a = 0, c = r.charCodeArray ? function(r) {
            return e[r];
        } : function(r) {
            return e.charCodeAt(r);
        }; a < e.length; ) {
            var u = c(a++), i = c(a++), s = c(a++);
            o += t[u >> 2] + t[(3 & u) << 4 | i >> 4] + t[isNaN(i) ? 64 : (15 & i) << 2 | s >> 6] + t[isNaN(s) ? 64 : 63 & s];
        }
        return o;
    },
    atob: function(e, r) {
        for (var t = (r = r || {}).key || n.base64.key, o = {}, a = 0; a < t.length; a++) o[t[a]] = a;
        for (var c = [], a = 0; a < e.length; ) {
            var u = o[e[a++]], i = o[e[a++]], s = o[e[a++]], f = o[e[a++]];
            c.push(u << 2 | i >> 4), 64 != s && c.push((15 & i) << 4 | s >> 2), 64 != f && c.push((3 & s) << 6 | f);
        }
        return r.charCodeArray ? c : n.cc2str(c);
    },
    encode: function(e) {
        return n.base64.btoa(unescape(encodeURIComponent(e)));
    },
    decode: function(e) {
        return decodeURIComponent(escape(n.base64.atob(e)));
    }
}, n.base64Encode = function(e) {
    return n.base64.encode(e);
}, n.base64Decode = function(e) {
    return n.base64.decode(e);
}, n.mktBase64Encode = function(e) {
    var r = n.base64Encode(e), t = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ], o = Math.min(r.length, t.length), a = 0, c = 0;
    do {
        a = Math.floor(Math.random() * o), c = Math.floor(Math.random() * (o - a)) + a;
    } while (!(a > 0 && c < o - 1 && c > a + 1));
    var u = r.substr(a, c - a).split("").reverse().join("");
    return r.substr(0, a) + u + r.substr(c, r.length - c) + t[a] + t[c];
}, n.mktBase64Decode = function(e) {
    var r = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ], t = e.length, o = e.substr(0, e.length - 2), a = r.indexOf(e.substr(t - 2, 1)), c = r.indexOf(e.substr(t - 1, 1)), u = o.substr(a, c - a).split("").reverse().join(""), i = o.substr(0, a) + u + o.substr(c, o.length - c);
    return n.base64Decode(i);
}, n.lz77 = {
    key: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_~",
    encode: function(e) {
        return r.encode(e);
    },
    decode: function(e) {
        return r.decode(e);
    },
    encodeURIComponent: function(e) {
        function r(r) {
            return e.apply(this, arguments);
        }
        return r.toString = function() {
            return e.toString();
        }, r;
    }(function(e) {
        return n.base64.btoa(r.encode(unescape(encodeURIComponent(e)), {
            charCodeArray: !0
        }), {
            key: n.lz77.key,
            charCodeArray: !0
        });
    }),
    decodeURIComponent: function(e) {
        function r(r) {
            return e.apply(this, arguments);
        }
        return r.toString = function() {
            return e.toString();
        }, r;
    }(function(e) {
        return decodeURIComponent(escape(r.decode(n.base64.atob(e, {
            key: n.lz77.key,
            charCodeArray: !0
        }), {
            charCodeArray: !0
        })));
    })
}, wx.getSystemInfo({
    success: function(e) {
        n.systemInfo = e;
    }
}), module.exports = n;