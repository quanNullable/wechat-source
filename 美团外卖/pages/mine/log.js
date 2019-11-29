var i = require("../../utils/object-assign.js"), l = {
    lxLoginClick: function() {
        this.lxMge.click({
            val_bid: "b_d9m3k15m"
        });
    },
    lxLoginOutClick: function() {
        this.lxMge.click({
            val_bid: "b_hdulkwn5"
        });
    }
};

module.exports = function(t) {
    return i(t, l), t;
};