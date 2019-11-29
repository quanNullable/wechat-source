var e = require("../actions/user.js"), r = require("./wx.js").storage.getItem, t = require("../store.js"), s = require("../constants.js").KEY_USER;

module.exports = function() {
    return r(s).then(function(r) {
        var s = r.data;
        return t.dispatch((0, e.loaded)(s));
    });
};