var i = require("../../utils/object-assign.js"), _ = {
    lxMapClick: function() {
        this.lxMge.click({
            val_bid: "b_eyViQ",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxMapView: function(i) {
        !this.showMap && i && this.lxMge.view({
            val_bid: "b_0rOwO",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxOrderShopView: function() {
        this.lxMge.view({
            val_bid: "b_rww3xjsy",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxOrderShopClick: function() {
        this.lxMge.click({
            val_bid: "b_ILLpm",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxOneMoreAgainClick: function() {
        this.lxMge.click({
            val_bid: "b_Y8pXD",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxOrderFoodListClick: function() {
        this.lxMge.click({
            val_bid: "b_3nzzrujj",
            poi_id: this.wm_poi_id || ""
        });
    }
};

module.exports = function(l) {
    return i(l, _), l;
};