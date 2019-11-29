function t() {
    this.baseData = {}, this.itemData = [], this.actionData = {};
}

var e = require("../scrolls/librarian.js");

t.prototype.init = function() {
    this.setDefaultScroll(), this.setPrivateScroll();
}, t.prototype.setDefaultScroll = function() {
    this.cardLibrarian = e.getTargetValue("card", [ this.id ]), this.cardLibrarian = this.cardLibrarian && this.cardLibrarian.length > 0 && this.cardLibrarian[0] || null;
}, t.prototype.setPrivateScroll = function() {}, t.prototype.initCardData = function() {
    this.heterogeneousData(), this.handlerData();
}, t.prototype.heterogeneousData = function() {
    this.itemProperty = e.getTargetValue("iohelper", [ this.id ], "buKeys"), this.itemProperty = this.itemProperty && this.itemProperty.length > 0 && this.itemProperty[0] || null;
}, t.prototype.handlerData = function() {
    this.initBaseData(), this.initItemsData(), this.initActionsData();
}, t.prototype.initBaseData = function() {
    this.baseData.bizType = this.setBizType(), this.baseData.icon = this.setIcon(), 
    this.baseData.cancelClass = this.setCancelClass(), this.baseData.templateId = this.cardLibrarian && this.cardLibrarian.templateInfo && this.cardLibrarian.templateInfo.tplId || "", 
    this.baseData.orderStatus = this.setOrderStatus(), this.baseData.orderCurrency = this.setOrderCurrency(), 
    this.baseData.orderTotalPrice = this.setOrderTotalPrice(), this.baseData.orderProductName = this.setProductName(), 
    this.baseData.orderId = this.orderEnity.OrderID, this.setPrivateBaseData();
}, t.prototype.setBizType = function() {
    return this.bizType || "";
}, t.prototype.setIcon = function() {
    return this.cardLibrarian && this.cardLibrarian.templateInfo && this.cardLibrarian.templateInfo.iconClassName || "";
}, t.prototype.setCancelClass = function() {
    var t = "";
    return "已取消" !== this.orderEnity.OrderStatusName && "取消" !== this.orderEnity.OrderStatusName && "已经取消" !== this.orderEnity.OrderStatusName || (t = "order-cancel"), 
    t;
}, t.prototype.setOrderStatus = function() {
    return [ {
        statusName: this.orderEnity.OrderStatusName
    } ];
}, t.prototype.setOrderCurrency = function() {
    return "¥";
}, t.prototype.setOrderTotalPrice = function() {
    return this.orderEnity.OrderTotalPrice;
}, t.prototype.setProductName = function() {
    return this.orderEnity && this.orderEnity.OrderName || "";
}, t.prototype.setPrivateBaseData = function() {}, t.prototype.initItemsData = function() {}, 
t.prototype.initActionsData = function() {
    for (var t = this.orderEnity && this.orderEnity.OrderActions, e = [ "Detail", "ReadOrder", "OrderDetailLink", "ViewOrderDetail", "ToDetail", "OrderDetail", "ViewOrderInfo", "ViewDetail" ], r = 0, a = t.length; r < a; r++) e.indexOf(t[r].ActionCode) > -1 && (t[r].ActionCode = "Detail");
    this.actionData = t;
}, t.prototype.getActionData = function() {
    return this.actionData;
}, t.prototype.getRenderData = function() {
    return {
        baseData: this.baseData,
        itemDate: this.itemsData
    };
}, t.prototype.sortOrderChange = function(t, e, r, a) {
    if (t && e) {
        a || (a = {}), void 0 === a.isNeedJudge && (a.isNeedJudge = !1), void 0 === a.judgeStatement && (a.judgeStatement = ""), 
        void 0 === a.newKey && (a.newKey = "");
        for (var i = 0; i < t.length; i++) if (t[i].flag) t[i].flag = null, delete t[i].flag; else for (var s = 0; s < e.length; s++) if (!(a.isNeedJudge && e[s].OrderChangeStatus !== a.judgeStatement || t[i].Sequence && t[i].Sequence != e[s].Sequence)) if (e[s].Passagers = e[s].Passagers.unique(), 
        _.isEqual(e[s].Passagers.sort(), r.sort())) for (var o in e[s]) e[s].hasOwnProperty(o) && "SegmentNo" !== o && (t[i][o] = e[s][o]); else {
            if (e[s][a.newKey] = t[i][a.newKey], e[s].flag = !0, t.splice(i + 1, 0, e[s]), 0 === t[i].Passagers.length) for (n = 0; n < r.length; n++) t[i].Passagers.push(r[n]);
            for (var n = 0; n < e[s].Passagers.length; n++) t[i].Passagers = t[i].Passagers.without(e[s].Passagers[n]), 
            0 === t[i].Passagers.length && t.splice(i, 1);
        }
    }
}, t.prototype.sortDisplay = function(t, e, r, a, i) {
    if (!t || !e) return "";
    if (i && !_.isEmpty(i)) return t.formatDate(i.fmt || "yyyy-MM-dd") + (i.word || " 出发 ") + (i.hasNum ? r : "");
    var s = t.formatDate("yyyy"), o = t.formatDate("MM-dd"), n = e.formatDate("yyyy"), d = e.formatDate("MM-dd"), h = s !== n && +n - +s > 0, u = !h && o === d;
    if (h) {
        var c = a ? "yyyy-MM-dd" : "yyyy-MM-dd hh:mm";
        return t.formatDate(c) + " 至\n" + e.formatDate(c);
    }
    var y = u ? [ "MM-dd hh:mm", "hh:mm" ] : [ "MM-dd hh:mm", "MM-dd hh:mm" ];
    return t.formatDate(y[0]) + " 至 " + e.formatDate(y[1]);
}, module.exports = t;