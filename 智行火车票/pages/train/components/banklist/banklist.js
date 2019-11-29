Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = {
    goUnionPay: function(i, n, o) {
        this.navigateTo({
            url: "../pay/pay",
            data: {
                orderNumber: i,
                totalPrice: n
            },
            immediateCallback: function() {
                o && o();
            }
        });
    }
};

exports.default = {
    init: function(i) {
        this.goUnionPay = this.goUnionPay.bind(i);
    },
    goUnionPay: i.goUnionPay
};