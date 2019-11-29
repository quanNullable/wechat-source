function t() {
    String.prototype.toDate || (String.prototype.toDate = function(t) {
        var e = 6e4 * new Date().getTimezoneOffset() + 60 * (t || 0) * 6e4, r = this.replace(/\D/gim, "").substring(0, 13);
        return new Date(parseInt(r) + e);
    }), String.prototype.formatDate || (String.prototype.formatDate = function(t) {
        var e = /^(\d{1,4})\-(\d{1,2})\-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/, r = this.match(e);
        if (r) {
            var n = {
                "y+": +r[1],
                "M+": +r[2],
                "d+": +r[3],
                "h+": +r[4],
                "m+": +r[5],
                "s+": +r[6]
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (n["y+"] + "").substr(4 - RegExp.$1.length)));
            for (var o in n) n.hasOwnProperty(o) && new RegExp("(" + o + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? n[o] : ("00" + n[o]).substr(("" + n[o]).length)));
            return t;
        }
        return "";
    });
}

function e() {
    Date.prototype.fnGetDateFormat || (Date.prototype.fnGetDateFormat = function(t) {
        var e = this, r = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var n in r) r.hasOwnProperty(n) && new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? r[n] : ("00" + r[n]).substr(("" + r[n]).length)));
        return t;
    });
}

function r() {
    Array.prototype.unique || (Array.prototype.unique = function() {
        if (this instanceof Array) {
            for (var t = {}, e = [], r = 0, n = this.length; r < n; r++) t.hasOwnProperty(this[r]) || (e.push(this[r]), 
            t[this[r]] = 1);
            return e;
        }
        return [];
    }), Array.prototype.without || (Array.prototype.without = function() {
        if (this instanceof Array) {
            var t = arguments;
            if (t.length) {
                for (var e = [], r = 0, n = t.length; r < n; r++) e.push(t[r]);
                for (var o = [], i = 0, s = this.length; i < s; i++) -1 === e.indexOf(this[i]) && o.push(this[i]);
                return o;
            }
            return this;
        }
        return [];
    });
}

module.exports = {
    init: function() {
        t(), e(), r();
    }
};