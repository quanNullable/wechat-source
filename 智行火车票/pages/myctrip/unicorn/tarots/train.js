var e = require("basecard.js"), t = function(e, t) {
    this.bizType = e.BizType, this.orderEnity = e, this.id = t;
};

require("../skyrim/extend.js")(t, e), t.prototype.setOrderStatus = function() {
    var e = [], t = this.orderEnity || {}, n = t.OrderStatusName || "";
    return e.push({
        statusName: n
    }), r(t) && e.unshift({
        statusName: r(t)
    }), e;
}, t.prototype.initItemsData = function() {
    var e = this.orderEnity && this.orderEnity.TrainInfo || {}, t = this.orderEnity && this.orderEnity.Passagers || [];
    if (e && !_.isEmpty(e)) {
        e.isHistory = !1, this.sortOrderChange(e.Items, e.ChangedItems, t, {
            isNeedJudge: !0,
            judgeStatement: "40",
            newKey: "WayType"
        }), n(e), a(e), i.call(this, e);
        var r = this;
        if (this.itemData = {
            orderItems: []
        }, e.isConnecting) _.each(e.connectItems, function(e) {
            r.itemData.orderItems.push({
                title: e[0].title,
                isTypeReturn: !1,
                forwardItems: e
            });
        }); else {
            var s = _.extend(e.forwardItems, e.backwardItems);
            _.each(s, function(t) {
                var n = 1 === parseInt(t[0].wayType, 10), a = {
                    title: t[0].title,
                    forwardItems: n ? t : [],
                    backwardItems: n ? [] : t,
                    isTypeReturn: e.isTypeReturn
                };
                r.itemData.orderItems.push(a);
            });
        }
        this.itemsData = this.itemData;
    } else this.itemData = {};
};

var r = function(e) {
    var t = e.TrainInfo || {};
    return t && t.OrderChangeStatusName || "";
}, n = function(e) {
    for (var t = {}, r = [], n = 0, a = e.Items.length; n < a; n++) r.indexOf(e.Items[n].TrainNumber) > -1 || r.push(e.Items[n].TrainNumber);
    for (var n = 0, a = e.Items.length; n < a; n++) {
        t[e.Items[n].WayType] || (t[e.Items[n].WayType] = {});
        for (m = 0; m < r.length; m++) t[e.Items[n].WayType][r[m]] || (t[e.Items[n].WayType][r[m]] = []), 
        e.Items[n].TrainNumber === r[m] && t[e.Items[n].WayType][r[m]].push(e.Items[n]);
    }
    for (var i in t) if (t.hasOwnProperty(i)) for (var s in t[i]) if (t[i].hasOwnProperty(s)) if (0 === t[i][s].length) t[i][s] = null, 
    delete t[i][s]; else {
        var o = [];
        for (n = 0; n < t[i][s].length; n++) for (var m = n + 1; m < t[i][s].length; m++) {
            var u = !0;
            for (var c in t[i][s][n]) if (t[i][s][n].hasOwnProperty(c) && t[i][s][m].hasOwnProperty(c) && "Passagers" != c && "CarriageNo" != c && "SeatNo" != c && "Sequence" != c && "TicketWindow" != c && t[i][s][n][c] != t[i][s][m][c]) {
                u = !1;
                break;
            }
            u && (t[i][s][n].Passagers.push(t[i][s][m].Passagers[0]), t[i][s][n].CarriageNo += "," + t[i][s][m].CarriageNo, 
            t[i][s][n].SeatNo += "," + t[i][s][m].SeatNo, o.push(t[i][s][m]));
        }
        for (n = 0; n < o.length; n++) t[i][s] = t[i][s].without(o[n]);
        t[i][s].sort(function(e, t) {
            return Number(e.Sequence) - Number(t.Sequence);
        });
    }
    e.SegmentNos = t;
}, a = function(e) {
    var t = _.keys(e.SegmentNos).sort();
    e.isSingleTrip = !1, e.isTypeReturn = !1, e.isConnecting = !1, t.length && (t.indexOf("3") > -1 ? e.isConnecting = !0 : t.indexOf("2") > -1 ? e.isTypeReturn = !0 : e.isSingleTrip = !0);
}, i = function(e) {
    var t = this, r = e.SegmentNos, n = {};
    _.each(r, function(r) {
        _.each(r, function(r) {
            _.each(r, function(r) {
                var a = r.DepartureDateStr || "", i = r.ArrivalDateStr || "", o = r.DepartureStation || "", m = r.ArrivalStation || "", u = r.TrainNumber || "", c = function() {
                    var r;
                    return new Date(a.replace(/-/g, "/")) > new Date(i.replace(/-/g, "/")) ? r = {
                        fmt: "MM-dd hh:mm",
                        word: " 出发",
                        hasNum: !1
                    } : e.isHistory && (r = {
                        fmt: "yyyy-MM-dd",
                        word: " 出发 ",
                        hasNum: !0
                    }), t.sortDisplay(a, i, u, !1, r);
                }(), f = s(r), d = {
                    title: {
                        depCity: o,
                        arrCity: m
                    },
                    content: c,
                    subContent: e.isHistory ? "" : f.length ? u + " " + f : u,
                    wayType: r.WayType,
                    depTimeStr: a ? a.replace(/-/g, "/") : ""
                }, h = o + "-" + m, p = r.WayType;
                void 0 === n[p] && (n[p] = {}), void 0 === n[p][h] && (n[p][h] = []), n[p][h].push(d);
            });
        });
    }), o(e, n);
}, s = function(e) {
    var t = e.CarriageNo, r = e.SeatNo, n = [], a = !1;
    if (void 0 === t && void 0 === r) return "";
    if (t = t ? t.split(",") : "", r = r ? r.split(",") : "", t.length && r.length && t.length === r.length) for (var i = 0, s = t.length; i < s; i++) {
        var o = "", m = "", u = "";
        if (o = t[i] && "undefined" !== t[i] ? t[i] + "车" : "", m = r[i] && "undefined" !== r[i] ? r[i] : "", 
        u = o + m) {
            if (i > 0) {
                a = !0;
                break;
            }
            n.push(u);
        }
    }
    return n.length ? n.toString() + (a ? "等" : "") : "";
}, o = function(e, t) {
    if (e.isConnecting) {
        if (e.connectItems = t, !_.isEmpty(e.connectItems)) for (var r in e.connectItems) if (e.connectItems.hasOwnProperty(r)) for (var n in e.connectItems[r]) e.connectItems[r].hasOwnProperty(n) && e.connectItems[r][n] && e.connectItems[r][n].length > 1 && e.connectItems[r][n].sort(function(e, t) {
            return new Date(e.depTimeStr) - new Date(t.depTimeStr);
        });
    } else {
        e.forwardItems = t[1];
        for (var n in e.forwardItems) e.forwardItems.hasOwnProperty(n) && e.forwardItems[n] && e.forwardItems[n].length > 1 && e.forwardItems[n].sort(function(e, t) {
            return new Date(e.depTimeStr) - new Date(t.depTimeStr);
        });
        if (e.isTypeReturn) {
            e.backwardItems = t[2];
            for (var n in e.backwardItems) e.backwardItems.hasOwnProperty(n) && e.backwardItems[n] && e.backwardItems[n].length > 1 && e.backwardItems[n].sort(function(e, t) {
                return new Date(e.depTimeStr) - new Date(t.depTimeStr);
            });
        }
    }
};

module.exports = {
    getInstance: function(r, n) {
        var a = new t(r, n);
        return e.call(a), a;
    }
};