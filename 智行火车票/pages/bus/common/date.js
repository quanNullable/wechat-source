Date.prototype.addDays = function(t) {
    return t && !isNaN(t) || (t = 0), this.setDate(this.getDate() + t), this;
}, Date.prototype.format = function(t) {
    var e = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var r in e) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[r] : ("00" + e[r]).substr(("" + e[r]).length)));
    return t;
};

var t = {
    parse: function(t, e) {
        if (void 0 === t) return new Date();
        if ("string" == typeof t) {
            var r = /^(\d{4})\-?(\d{1,2})\-?(\d{1,2})/i;
            (t = t || "").match(r) && (t = t.replace(r, "$2/$3/$1"));
            var s = Date.parse(t);
            return new Date(s || new Date());
        }
        return "number" == typeof t ? new Date(t) : new Date();
    }
};

module.exports = t;