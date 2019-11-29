var i = require("../../utils/object-assign.js"), l = {
    lxOrdersLoginClick: function() {
        this.lxMge.click({
            val_bid: "b_jythgl7s"
        });
    },
    lxBuyAgainView: function(i) {
        this.lxMge.view({
            val_bid: "b_xmjOO",
            poi_id: i
        });
    },
    lxBuyAgainClick: function(i) {
        this.lxMge.click({
            val_bid: "b_sw2w4",
            poi_id: i
        });
    },
    lxToRestaurantClick: function(i) {
        this.lxMge.click({
            val_bid: "b_y1nOb",
            poi_id: i
        });
    },
    lxOrderItemView: function(i) {
        this.lxMge.view({
            val_bid: "b_d6ddxuwl",
            poi_id: i
        });
    },
    lxOrderItemClick: function(i) {
        this.lxMge.click({
            val_bid: "b_bN3Az",
            poi_id: i
        });
    }
};

module.exports = function(t) {
    return i(t, l), t;
};