Date.prototype.addDays = function(t) {
    var e = this.getFullYear(), r = this.getMonth(), s = this.getDate() + t;
    return new Date(e, r, s);
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
}, Date.prototype.getFirstDateInMonth = function() {
    return new Date(this.getFullYear(), this.getMonth(), 1);
}, Date.prototype.getLastDateInMonth = function() {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0);
}, Date.prototype.getFirstMonthInYear = function() {
    return new Date(this.getFullYear(), 1, 1);
}, Date.prototype.addMonths = function(t) {
    t = !t || isNaN(t) ? 0 : t;
    var e = this.getMonth() + t;
    return new Date(this.getFullYear(), e, this.getDate());
}, Date.prototype.addYears = function(t) {
    var e = this.getFullYear() + t, r = this.getMonth(), s = this.getDate();
    return new Date(e, r, s);
}, Date.prototype.isSameDate = function(t) {
    return this.setHours(0, 0, 0, 0) == t.setHours(0, 0, 0, 0);
}, Date.prototype.isBeforeDate = function(t) {
    return this.setHours(0, 0, 0, 0) < t.setHours(0, 0, 0, 0);
}, Date.prototype.isAfterDate = function(t) {
    return this.setHours(0, 0, 0, 0) > t.setHours(0, 0, 0, 0);
}, Date.prototype.getWeekText = function() {
    return [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ][this.getDay()];
};