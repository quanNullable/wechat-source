var e = require("./format-seconds.js"), t = {
    pay: function(t, r) {
        var a = t.remain_pay_time, n = r.start, i = r.now;
        if (0 === a) return {
            text: "等待支付"
        };
        var u = Math.max(0, a - Math.round((i - n) / 1e3));
        return u > 0 ? {
            text: "支付剩余时间",
            strong: e(u),
            shouldCallLater: !0
        } : {
            shouldReload: !0
        };
    },
    payTimeout: function() {
        return {
            text: "支付超时，交易已关闭。"
        };
    },
    receive: function(t, r) {
        var a = t.poi_remain_receive_time, n = r.start, i = r.now;
        if (0 === a) return {
            text: "等待接单"
        };
        var u = Math.max(0, a - Math.round((i - n) / 1e3));
        return u > 0 ? {
            text: "等待接单",
            strong: e(u),
            shouldCallLater: !0
        } : {
            shouldReload: !0
        };
    },
    delivery: function(e) {
        return {
            text: "预计送达",
            strong: e.expected_arrival_time
        };
    }
};

module.exports = function(e, r) {
    var a = e.status, n = e.pay_status, i = e.preorder_begin_deal_time, u = e.pay_success_time, o = e.order_push_time, s = e.operator_tip, l = r.now;
    if (s && (1 === a || 2 === a) && (3 === n || 0 === n) && Math.max(i, u, o) > Math.round(l / 1e3)) return {
        text: s
    };
    if (1 === a) {
        if (1 === n || 2 === n) return t.pay(e, r);
        if (100 === n) return t.payTimeout(e, r);
    } else if (2 === a) {
        if (0 === n || 3 === n) return t.receive(e, r);
    } else if (!(4 !== a && 6 !== a || 0 !== n && 3 !== n && 7 !== n)) return t.delivery(e, r);
    return null;
};