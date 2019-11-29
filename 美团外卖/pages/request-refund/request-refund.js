function e(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new n(function(e, t) {
            function r(s, i) {
                try {
                    var u = a[s](i), o = u.value;
                } catch (e) {
                    return void t(e);
                }
                if (!u.done) return n.resolve(o).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(o);
            }
            return r("next");
        });
    };
}

var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), t = require("../../npm/@hfe/mp-owl/lib/index.js"), n = require("../../npm/promise-polyfill/promise.js"), r = require("../../api/index.js").refundSubmit, s = require("../base.js")({
    pageName: "request-refund",
    data: {
        refundData: {},
        typeReasons: [],
        reasonValue: "",
        reasonId: 0,
        reasonChecked: !1,
        reasonCheckedObj: {},
        selectedReason: -1,
        selectedReasonType: -1
    },
    reasonInput: function(e) {
        this.data.reasonValue = e.detail.value;
    },
    chooseReason: function(e) {
        var a = e.currentTarget.dataset, t = a.id, n = a.type;
        this.setData({
            selectedReason: parseInt(t, 10) || -1,
            selectedReasonType: parseInt(n, 10) || -1
        });
    },
    onClickSubmit: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var n, s, i, u, o, d, c, l, p, f;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (n = t.data, s = n.refundData, i = n.selectedReasonType, u = n.reasonValue, -1 !== i) {
                        e.next = 4;
                        break;
                    }
                    return t.alert({
                        message: "请至少选择一项"
                    }), e.abrupt("return");

                  case 4:
                    if (4 !== i || u) {
                        e.next = 7;
                        break;
                    }
                    return t.alert({
                        message: "请填写申请退款的原因"
                    }), e.abrupt("return");

                  case 7:
                    t.loading(!0), o = 2, d = s.refund_type || [], c = d.length - 1;

                  case 11:
                    if (!(c > -1)) {
                        e.next = 19;
                        break;
                    }
                    if (1 !== (l = d[c]).is_selected) {
                        e.next = 16;
                        break;
                    }
                    return o = l.type, e.abrupt("break", 19);

                  case 16:
                    --c, e.next = 11;
                    break;

                  case 19:
                    return e.prev = 19, e.next = 22, r({
                        view_id: t.view_id,
                        refund_reason_type: t.data.selectedReasonType,
                        refund_reason_id: t.data.selectedReason,
                        private_reason: t.data.reasonValue,
                        refund_type: o
                    });

                  case 22:
                    wx.navigateBack(), e.next = 31;
                    break;

                  case 25:
                    e.prev = 25, e.t0 = e.catch(19), p = e.t0.code, f = e.t0.message, t.alert({
                        message: f
                    }), wx.navigateBack();

                  case 31:
                    t.loading(!1);

                  case 32:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 19, 25 ] ]);
        }))();
    },
    onLoad: function(e) {
        var a = e.view_id;
        this.loading(!1), this.view_id = a;
        var t = getApp(), n = t.refundData;
        t.refundData = null, n || wx.navigateBack(), this.setData({
            refundData: n
        }), this.alert({
            message: "建议您优先联系商家协商处理，如因您自身原因导致的退款申请，商家及客服有权利拒绝。"
        });
    }
});

(0, t.page)(s);