var e = require("basestore.js").BaseStore;

module.exports = {
    OrderDetailStore: function(r) {
        return r = r || {}, r.key = "PAYMENT_ORDER_DETAIL_STORE", new e(r);
    },
    OrderDetailExtendStore: function(r) {
        return r = r || {}, r.key = "PAYMENT_ORDER_DETAIL_EXTEND_STORE", new e(r);
    },
    PayResultOrderStore: function(r) {
        return r = r || {}, r.key = "PAYMENT_RESULT_ORDER_STORE", new e(r);
    },
    PayParamsStore: function(r) {
        return r = r || {}, r.key = "PAYMENT_PARAMS_STORE", new e(r);
    }
};