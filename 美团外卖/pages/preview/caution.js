var t = require("../../npm/@hfe/mp-owl/lib/index.js"), e = require("../../utils/object-assign.js"), a = require("../../actions/purchase.js").setRecipient, s = require("../../weapp-redux/index.js").connect, i = require("../../utils/mix.js"), u = require("../base.js"), r = {
    data: {
        selects: [],
        text: "",
        currentValue: "",
        focus: !1
    },
    onInputCaution: function(t) {
        var e = t.detail.value, a = this.data.currentValue;
        e.length >= 50 && a.length >= 50 && this.toast({
            message: "备注最多输入50字哦",
            className: "toast-caution"
        }), this.setData({
            currentValue: e
        });
    },
    onConfirmCaution: function(t) {
        var e = t.detail.value, s = void 0 === e ? this.data.currentValue : e, i = s.replace(/\s+$/, ""), u = this.store;
        i !== u.getState().purchase.caution && u.dispatch(a({
            caution: s
        })), wx.navigateBack();
    },
    onClickCautionSelect: function(t) {
        var a = this, s = t.currentTarget.dataset.item, i = this.data.currentValue;
        i.length >= 50 && this.toast({
            message: "备注最多输入50字哦",
            className: "toast-caution"
        });
        var u = (i.replace(/\s+$/, "") + " " + s + " ").slice(0, 50), r = {
            focus: !0
        };
        i !== u && e(r, {
            currentValue: u,
            text: u
        }), this.setData(r), this.clearTimeout(this.cautionFocusTo), this.cautionFocusTo = this.setTimeout(function() {
            a.setData({
                focus: !0
            });
        }, 500);
    },
    onLoad: function() {
        var t = this.store.getState().purchase.caution, a = getApp(), s = a.remark_field;
        a.remark_field = null;
        var i = {
            currentValue: t,
            text: t,
            focus: !0
        };
        if (s) {
            var u = s.customer_values, r = s.default_values, c = s.hint;
            e(i, {
                hint: c,
                selects: u.concat(r).slice(0, 6)
            });
        }
        this.setData(i), this.loading(!1);
    }
};

(0, t.page)(i(r, s(), u));