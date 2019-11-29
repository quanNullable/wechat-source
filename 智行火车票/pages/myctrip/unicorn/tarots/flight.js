var e = require("basecard.js"), t = function(e, t) {
    this.bizType = e.BizType, this.orderEnity = e, this.id = t;
};

require("../skyrim/extend.js")(t, e), t.prototype.setOrderStatus = function() {
    var e = [], t = this.orderEnity || {}, i = t.OrderStatusName || "";
    return e.push({
        statusName: i
    }), n(t) && e.unshift({
        statusName: n(t)
    }), r(t) && e.unshift({
        statusName: r(t)
    }), e;
}, t.prototype.initItemsData = function() {
    var e = this.orderEnity && this.orderEnity.FlightInfo || {}, t = this.orderEnity && this.orderEnity.Passagers || [], r = e.TrainItems || [], n = this.orderEnity && "FlightDomestic" === this.orderEnity.BizType, m = !(!r || !r.length);
    if (e.isFlightAndTrain = !(!r || !r.length), e.isHistory = !1, this.sortOrderChange(e.Items, e.AirChangedItems, t, {
        isNeedJudge: !1,
        callback: function(e, t) {
            t[j].SegmentNo = e[i].SegmentNo;
        }
    }), n && !m && this.sortOrderChange(e.Items, e.ChangedItems, t, {
        isNeedJudge: !0,
        judgeStatement: "S",
        newKey: "SegmentNo"
    }), a(e, t), s(e), o.call(this, e), e.isConnecting) {
        var u = this;
        this.itemData = {
            orderItems: []
        }, _.each(e.connectItems, function(e) {
            u.itemData.orderItems.push({
                title: e && e.length && e[0].title || "",
                isTypeReturn: !1,
                forwardItems: e
            });
        });
    } else this.itemData = {
        orderItems: [ {
            title: e && e.forwardItems && e.forwardItems.length && e.forwardItems[0].title || "",
            forwardItems: e.forwardItems,
            backwardItems: e.isTypeReturn ? e.backwardItems : [],
            isTypeReturn: e.isTypeReturn
        } ]
    };
    this.itemsData = this.itemData;
};

var r = function(e) {
    var t = (e && e.FlightInfo || {}).AirChangedItems;
    return t && t instanceof Array && t.length ? "航变" : "";
}, n = function(e) {
    var t = e.FlightInfo || {};
    return t && t.OrderChangeStatusName || "";
}, a = function(e, t) {
    for (var r = {}, n = e.Items, i = 0, a = n.length; i < a; i++) {
        r[n[i].SegmentNo] || (r[n[i].SegmentNo] = {});
        for (var s = 0; s < t.length; s++) r[n[i].SegmentNo][t[s]] || (r[n[i].SegmentNo][t[s]] = []), 
        n[i].Passagers && 0 !== n[i].Passagers.length || (n[i].Passagers = t), n[i].Passagers.indexOf(t[s]) > -1 && r[n[i].SegmentNo][t[s]].push(n[i]);
    }
    for (var o in r) if (r.hasOwnProperty(o)) for (var m in r[o]) if (r[o].hasOwnProperty(m)) {
        for (var u in r[o]) if (r[o].hasOwnProperty(u) && m != u && _.isEqual(r[o][m], r[o][u])) {
            r[o][m] = null, delete r[o][m];
            break;
        }
        r[o][m] && r[o][m].sort(function(e, t) {
            return parseInt(e.Sequence, 10) - parseInt(t.Sequence, 10);
        });
    }
    e.SegmentNos = r;
}, s = function(e) {
    e.isSingleTrip = "单程" === e.TripType, e.isConnecting = "联程" === e.TripType, e.isTypeReturn = "往返" === e.TripType, 
    e.isHXOrder = "T" === e.IsHX;
}, o = function(e) {
    var t = this, r = e.SegmentNos, n = [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十" ];
    e.forwardItems = [], e.backwardItems = [], e.connectItems = {};
    var i = !1;
    _.each(r, function(r) {
        _.each(r, function(r) {
            var a = r.length, s = {
                depCityName: r[0] && r[0].DepartureCity || "",
                depTime: r[0] && r[0].DepartureDateTime,
                arrCityName: r[a - 1] && r[a - 1].ArrivalCity || "",
                arrTime: r[a - 1] && r[a - 1].ArrivalDateTime,
                flightNos: m(r)
            };
            if (e.isFlightAndTrain && !e.isConnecting && !i) {
                var o = r[0] && r[0].SegmentNo || "";
                s = h(o, s, e.TrainItems), i = s.flag;
            }
            var u = function() {
                var r;
                return e.isHistory && (r = {
                    fmt: "yyyy-MM-dd",
                    word: " 出发 ",
                    hasNum: !0
                }), t.sortDisplay(s.depTime, s.arrTime, s.flightNos, e.isHXOrder, r);
            }(), d = {
                title: {
                    depCity: s.depCityName,
                    arrCity: s.arrCityName + (e.isTypeReturn ? "（往返）" : "")
                },
                content: u,
                subContent: e.isHistory ? "" : s.flightNos,
                departureDateTime: s.depTime ? s.depTime.replace(/-/g, "/") : ""
            }, f = r[0] && r[0].SegmentNo || 0;
            e.isConnecting ? parseInt(f, 10) < 11 && (d.title.arrCity += "（第" + n[f - 1] + "程）", 
            e.connectItems[f] || (e.connectItems[f] = []), e.connectItems[f].push(d)) : (1 === parseInt(f, 10) && (d.isTypeReturn = e.isTypeReturn, 
            e.forwardItems.push(d)), 2 === parseInt(f, 10) && (d.isTypeReturn = e.isTypeReturn, 
            e.backwardItems.push(d)));
        });
    }), u(e);
}, m = function(e) {
    for (var t = [], r = 0, n = e.length; r < n; r++) if (e[r].FlightNo) {
        var i = e[r].DepTerminal ? "（" + e[r].DepTerminal + " 出发）" : "";
        t.push(e[r].FlightNo + i);
    }
    var a = !!(t[0] && t[0].indexOf("出发") > 0 || t[1] && t[1].indexOf("出发") > 0);
    return t.length >= 2 ? t[0] + (a ? "\n" : "，") + t[1] + (t.length > 2 ? "等" : "") : t[0];
}, u = function(e) {
    if (e.forwardItems && e.forwardItems.length > 1 && e.forwardItems.sort(function(e, t) {
        return new Date(e.departureDateTime) - new Date(t.departureDateTime);
    }), e.backwardItems && e.backwardItems.length > 1 && e.backwardItems.sort(function(e, t) {
        return new Date(e.departureDateTime) - new Date(t.departureDateTime);
    }), e.connectItems && !_.isEmpty(e.connectItems)) for (var t in e.connectItems) e.connectItems.hasOwnProperty(t) && e.connectItems[t] && e.connectItems[t].length > 1 && e.connectItems[t].sort(function(e, t) {
        return new Date(e.departureDateTime) - new Date(t.departureDateTime);
    });
}, h = function(e, t, r) {
    for (var n = r.length, i = 0; i < n; i++) {
        var a = parseInt(r[i].Validity, 10), s = r[i].WayType, o = r[i].DepartureDateStr, m = r[i].ArrivalDateStr;
        if (parseInt(e, 10) !== a) return t.flag = !1, t;
        if ("F" === s ? (t.arrCityName = r[i].ArrivalStation, t.arrTime = m) : "T" === s && (t.depCityName = r[i].DepartureStation, 
        t.depTime = o), r[i].TrainNumber) {
            var u = t.flightNos.indexOf("\n") > 0, h = t.flightNos.split(u ? "\n" : "，");
            h.length < 2 && ("F" === s ? t.flightNos += "，" + r[i].TrainNumber : t.flightNos = r[i].TrainNumber + "，" + t.flightNos), 
            2 === h.length && (t.flightNos = function() {
                var e = t.flightNos, n = e.indexOf("等") > -1;
                return "F" !== s || n ? u ? e = r[i].TrainNumber + "，" + e : (h.unshift(r[i].TrainNumber), 
                h.pop(), e = h.join("，") + "等") : e += "等", e;
            }());
        }
    }
    return t.flag = !0, t;
};

module.exports = {
    getInstance: function(r, n) {
        var i = new t(r, n);
        return e.call(i), i;
    }
};