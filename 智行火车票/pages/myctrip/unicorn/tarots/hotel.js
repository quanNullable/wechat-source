function t(t, e) {
    this.bizType = t.BizType, this.orderEnity = t, this.id = e;
}

var e = require("basecard.js");

require("../skyrim/extend.js")(t, e), t.prototype.initItemsData = function() {
    if (this.itemProperty && this.itemProperty.orderItem) for (var t = {}, e = this.orderEnity[this.itemProperty.orderItem], r = 0, i = e.length; r < i; r++) {
        var o = e[r], s = o.HotelAddress || "", n = o[this.itemProperty.startTime].toDate(8).fnGetDateFormat("yyyy-MM-dd") || "", y = o[this.itemProperty.endTime].toDate(8).fnGetDateFormat("yyyy-MM-dd") || "", m = o.NightAmount, a = o.RoomAmount, d = new Date().getFullYear().toString(), h = n.split("-")[0], u = y.split("-")[0], p = h === u ? 0 : 1;
        p || d !== h || d !== u || (n = n.substring(5), y = y.substring(5)), t = {
            content: s,
            subContent: n + (!!p || d !== h && d !== u ? " 至\n" : " 至 ") + y + "  " + m + "晚/" + a + "间"
        }, this.itemData.push(t);
    }
    this.itemsData = this.itemData[0] || {};
}, t.prototype.setProductName = function() {
    return this.orderEnity[this.itemProperty.orderItem] && this.orderEnity[this.itemProperty.orderItem].length > 0 && this.orderEnity.OrderName || this.orderEnity[this.itemProperty.orderItem][0].ProductName;
}, t.prototype.setOrderCurrency = function() {
    if (this.itemProperty && this.itemProperty.Currency) {
        var t = this.orderEnity[this.itemProperty.Currency];
        return t && "RMB" === t || "CNY" === t ? "¥" : t;
    }
}, module.exports = {
    getInstance: function(r, i) {
        var o = new t(r, i);
        return e.call(o), o;
    }
};