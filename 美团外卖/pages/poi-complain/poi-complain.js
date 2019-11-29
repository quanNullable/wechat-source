function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, n) {
            function a(i, u) {
                try {
                    var s = t[i](u), o = s.value;
                } catch (e) {
                    return void n(e);
                }
                if (!s.done) return r.resolve(o).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(o);
            }
            return a("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../npm/@hfe/mp-owl/lib/index.js"), r = require("../../npm/promise-polyfill/promise.js"), a = require("../../api/index.js"), i = a.complaintPreview, u = a.complaintSubmit, s = require("../../utils/mix.js"), o = require("../base.js"), c = {
    pageName: "refund-progress",
    data: {
        view_id: 0,
        result: {},
        refund_record_list: [],
        complaintPreview: null,
        inputValue: ""
    },
    onInputCaution: function(e) {
        var t = e.detail.value;
        this.setData({
            inputValue: t
        });
    },
    submitForm: function() {
        var n = this;
        return e(t.default.mark(function e() {
            var r, a;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (n.loading(!0), e.prev = 1, n.data.inputValue) {
                        e.next = 5;
                        break;
                    }
                    return n.toast({
                        message: "请填写投诉内容"
                    }), e.abrupt("return");

                  case 5:
                    return e.next = 7, u({
                        order_view_id: n.view_id,
                        complaint_content: n.data.inputValue
                    });

                  case 7:
                    r = e.sent, e.next = 14;
                    break;

                  case 10:
                    e.prev = 10, e.t0 = e.catch(1), a = e.t0.message, n.toast({
                        message: a
                    });

                  case 14:
                    n.loading(!1), n.toast({
                        message: "已收到您的投诉，客服会尽快与您联系，并为您处理"
                    }), n.setTimeout(function() {
                        wx.navigateBack();
                    }, 1500);

                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 1, 10 ] ]);
        }))();
    },
    loadComplaintPreview: function() {
        var n = this;
        return e(t.default.mark(function e() {
            var r, a;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n.loading(!0), e.prev = 1, e.next = 4, i({
                        order_view_id: n.view_id
                    });

                  case 4:
                    r = e.sent, n.setData({
                        complaintPreview: r
                    }), e.next = 12;
                    break;

                  case 8:
                    e.prev = 8, e.t0 = e.catch(1), a = e.t0.message, n.toast({
                        message: a
                    });

                  case 12:
                    n.loading(!1);

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 1, 8 ] ]);
        }))();
    },
    onLoad: function(e) {
        var t = e.view_id;
        this.view_id = t, this.loadComplaintPreview();
    }
};

(0, n.page)(s(c, o));