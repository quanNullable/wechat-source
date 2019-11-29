var t = require("basecard.js"), e = function(t, e) {
    this.bizType = t.BizType, this.orderEnity = t, this.id = e;
};

require("../skyrim/extend.js")(e, t), e.prototype.initItemsData = function() {
    if (this.itemProperty && this.itemProperty.orderItem) {
        var t = this.orderEnity[this.itemProperty.orderItem], e = this;
        _.each(t, function(t) {
            var r = {
                title: i(t) || {},
                content: a(t) || ""
            };
            t.FetcherCode && !e.isHistory && (r.subContent1 = "取票号: " + t.FetcherCode), t.FetcherPassword && !e.isHistory && (r.subContent2 = "取票密码: " + t.FetcherPassword), 
            t.FetcherOrderID && !e.isHistory && (r.subContent3 = "取票订单号: " + t.FetcherOrderID), 
            e.itemData.push(r);
        }), this.itemsData = this.itemData[0] || {};
    }
};

var r = function(t) {
    var e = t.DepartureCityName || "", r = t.DepartureStationName || "", i = t.ArrivalCityName || "", a = t.ArrivalStationName || "";
    return {
        depDisplay: r && 0 === r.indexOf(e) ? r || "" : e + r || "",
        arrDisplay: a && 0 === a.indexOf(i) ? a || "" : i + a || ""
    };
}, i = function(t) {
    var e = r(t);
    return {
        depCity: e.depDisplay || "",
        arrCity: e.arrDisplay || ""
    };
}, a = function(t) {
    return t.DepartureDateStr + " 出发" || "";
};

module.exports = {
    getInstance: function(r, i) {
        var a = new e(r, i);
        return t.call(a), a;
    }
};