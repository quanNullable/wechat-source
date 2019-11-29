var e = {
    pay: "立即付款",
    cancel: "取消订单",
    confirm: "确认收货",
    comment: "评价",
    appeal: "退款申诉",
    refund: "申请退款",
    cancelrefund: "取消退款"
};

module.exports = function(a) {
    var n = a.pay_status, c = a.status, r = a.logistics_status, t = a.pay_refund_res_type, s = a.comment_status, o = [];
    1 === c ? o = 100 === n ? [ "cancel" ] : [ "pay", "cancel" ] : 2 === c ? o = [ "cancel" ] : 4 === c ? 0 === n || 3 === n ? o = 0 === r ? [ "confirm", "hasten", "cancel" ] : [ "hasten", "cancel" ] : 5 === n ? o = [ "restaurant", "service", "cancelrefund" ] : 7 === n && (o = 0 === r ? 1 === t ? [ "confirm", "hasten", "appeal" ] : [ "confirm", "hasten" ] : 1 === t ? [ "hasten", "appeal" ] : [ "hasten" ]) : 6 === c ? o = 0 === n || 3 === n ? [ "confirm", "hasten", "cancel" ] : 5 === n ? [ "restaurant", "service", "cancelrefund" ] : 1 === t ? [ "confirm", "hasten", "appeal" ] : 3 === t ? [ "confirm", "hasten", "service" ] : [ "confirm", "hasten" ] : 7 === c ? o = 0 === n || 3 === n ? [ "confirm" ] : 5 === n ? [ "restaurant", "service", "cancelrefund" ] : 1 === t ? [ "confirm", "appeal" ] : 3 === t ? [ "confirm", "service" ] : [ "confirm" ] : 8 === c ? 0 === n || 3 === n ? o = 0 === s ? [ "comment", "complain" ] : [ "complain" ] : 5 === n ? o = [ "service", "restaurant", "cancelrefund" ] : 1 === t ? o = 0 === s ? [ "comment", "appeal" ] : [ "appeal" ] : 3 === t ? o = 0 === s ? [ "comment", "service" ] : [ "service" ] : 0 === s && (o = [ "comment" ]) : 9 === c && (o = 100 === n ? [ "goother" ] : [ "goother", "complain" ]);
    for (var i = [], m = o.length - 1; m > -1; --m) {
        var l = o[m];
        e.hasOwnProperty(l) && i.push({
            type: l,
            title: e[l]
        });
    }
    return i;
};