!function(t) {
    var r = (t = t || {}).Base64, e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = function(t) {
        for (var r = {}, e = 0, n = t.length; e < n; e++) r[t.charAt(e)] = e;
        return r;
    }(e), o = String.fromCharCode, c = function(t) {
        if (t.length < 2) return (r = t.charCodeAt(0)) < 128 ? t : r < 2048 ? o(192 | r >>> 6) + o(128 | 63 & r) : o(224 | r >>> 12 & 15) + o(128 | r >>> 6 & 63) + o(128 | 63 & r);
        var r = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
        return o(240 | r >>> 18 & 7) + o(128 | r >>> 12 & 63) + o(128 | r >>> 6 & 63) + o(128 | 63 & r);
    }, a = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, u = function(t) {
        return t.replace(a, c);
    }, i = function(t) {
        var r = [ 0, 2, 1 ][t.length % 3], n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0);
        return [ e.charAt(n >>> 18), e.charAt(n >>> 12 & 63), r >= 2 ? "=" : e.charAt(n >>> 6 & 63), r >= 1 ? "=" : e.charAt(63 & n) ].join("");
    }, f = t.btoa ? function(r) {
        return t.btoa(r);
    } : function(t) {
        return t.replace(/[\s\S]{1,3}/g, i);
    }, h = function(t) {
        return f(u(t));
    }, d = function(t, r) {
        return r ? h(String(t)).replace(/[+\/]/g, function(t) {
            return "+" == t ? "-" : "_";
        }).replace(/=/g, "") : h(String(t));
    }, g = new RegExp([ "[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}" ].join("|"), "g"), A = function(t) {
        switch (t.length) {
          case 4:
            var r = ((7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3)) - 65536;
            return o(55296 + (r >>> 10)) + o(56320 + (1023 & r));

          case 3:
            return o((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));

          default:
            return o((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1));
        }
    }, l = function(t) {
        return t.replace(g, A);
    }, s = function(t) {
        var r = t.length, e = r % 4, c = (r > 0 ? n[t.charAt(0)] << 18 : 0) | (r > 1 ? n[t.charAt(1)] << 12 : 0) | (r > 2 ? n[t.charAt(2)] << 6 : 0) | (r > 3 ? n[t.charAt(3)] : 0), a = [ o(c >>> 16), o(c >>> 8 & 255), o(255 & c) ];
        return a.length -= [ 0, 0, 2, 1 ][e], a.join("");
    }, p = t.atob ? function(r) {
        return t.atob(r);
    } : function(t) {
        return t.replace(/[\s\S]{1,4}/g, s);
    }, C = function(t) {
        return l(p(t));
    }, b = function(t) {
        return C(String(t).replace(/[-_]/g, function(t) {
            return "-" == t ? "+" : "/";
        }).replace(/[^A-Za-z0-9\+\/]/g, ""));
    };
    if (t.Base64 = {
        VERSION: "2.1.9",
        atob: p,
        btoa: f,
        fromBase64: b,
        toBase64: d,
        utob: u,
        encode: d,
        encodeURI: function(t) {
            return d(t, !0);
        },
        btou: l,
        decode: b,
        noConflict: function() {
            var e = t.Base64;
            return t.Base64 = r, e;
        }
    }, "function" == typeof Object.defineProperty) {
        var B = function(t) {
            return {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            };
        };
        t.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", B(function() {
                return b(this);
            })), Object.defineProperty(String.prototype, "toBase64", B(function(t) {
                return d(this, t);
            })), Object.defineProperty(String.prototype, "toBase64URI", B(function() {
                return d(this, !0);
            }));
        };
    }
    module.exports = t.Base64;
}(void 0);