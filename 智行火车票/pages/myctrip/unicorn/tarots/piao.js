var t = require("basecard.js"), e = function(t, e) {
    this.bizType = t.BizType, this.orderEnity = t, this.id = e;
};

require("../skyrim/extend.js")(e, t), e.prototype.initItemsData = function() {
    if (this.itemProperty && this.itemProperty.orderItem) for (var t = null, e = this.orderEnity[this.itemProperty.orderItem], r = 0, i = e.length; r < i; r++) {
        var o = e[r];
        t = {
            content: o[this.itemProperty.startTime].toDate(8).fnGetDateFormat("MM-dd") + " 使用  " + o.Quantity + "张"
        }, this.itemData.push(t);
    }
    this.itemsData = this.itemData[0] || {};
}, e.prototype.setProductName = function() {
    var t;
    return this.itemProperty && this.itemProperty.OrderName ? t = this.orderEnity[this.itemProperty.OrderName] : this.orderEnity[this.itemProperty.orderItem] && this.orderEnity[this.itemProperty.orderItem].length > 0 && (t = this.orderEnity[this.itemProperty.orderItem][0].ProductName), 
    t || "";
}, module.exports = {
    getInstance: function(r, i) {
        var o = new e(r, i);
        return t.call(o), o;
    }
};