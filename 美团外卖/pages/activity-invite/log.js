var i = Object.assign || function(i) {
    for (var t = 1; t < arguments.length; t++) {
        var c = arguments[t];
        for (var l in c) Object.prototype.hasOwnProperty.call(c, l) && (i[l] = c[l]);
    }
    return i;
}, t = require("../../utils/object-assign.js"), c = {
    lxClickInviteBtn: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.lxMge.click(i({
            val_bid: "b_m8w6jho8"
        }, t, {
            custom: t
        }));
    },
    lxClickQrCodeBtn: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.lxMge.click(i({
            val_bid: "b_3cai8fid"
        }, t, {
            custom: t
        }));
    },
    lxClickShare: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.lxMge.click(i({
            val_bid: "b_jvkvedjk"
        }, t, {
            custom: t
        }));
    },
    lxClickShareSuccess: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.lxMge.click(i({
            val_bid: "b_2fldaj3j"
        }, t, {
            custom: t
        }));
    }
};

module.exports = function(i) {
    return t(i, c), i;
};