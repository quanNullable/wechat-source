var i = require("../../utils/object-assign.js"), l = {
    lxInputModalView: function(i) {
        var l = 1 === i ? "b_yn1afbv6" : "b_azauatig";
        this.lxMge.view({
            val_bid: l
        });
    },
    lxInputNextClick: function() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, t = "";
        t = 1 === i ? 1 === l ? "b_p6mxt2t9" : "b_tyd7a6bf" : 1 === l ? "b_gudg9s5l" : "b_h62yw2lt", 
        this.lxMge.click({
            val_bid: t
        });
    },
    lxInputCancelClick: function() {
        this.lxMge.click({
            val_bid: "b_fxvv5nv3"
        });
    },
    lxInputClick: function() {
        this.lxMge.click({
            val_bid: "b_08lfbowc"
        });
    },
    lxAuthClick: function() {
        this.lxMge.click({
            val_bid: "b_1oavpfm9"
        });
    }
};

module.exports = function(t) {
    return i(t, l), t;
};