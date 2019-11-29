var e = require("../actions/user.js"), r = require("../utils/object-assign.js"), s = require("../utils/wx.js").storage.setItem, t = require("../utils/filter-action.js"), i = require("../constants.js").KEY_USER, u = {
    token: "",
    user_id: "",
    open_id: "",
    addresses: []
}, n = function(e) {
    var r = e.token, t = e.user_id, u = e.open_id;
    return s(i, {
        token: r,
        user_id: t,
        open_id: u
    });
};

module.exports = function() {
    var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u, i = arguments[1];
    switch (i.type) {
      case e.USER_STORE:
        var a = t(s, i), o = r({}, s, a);
        return n(o), o;

      case e.USER_LOADED:
        var d = t(s, i);
        return r({}, s, d);

      case e.USER_SET_ADDRESSES:
        return r({}, s, {
            addresses: i.addresses
        });

      case e.USER_EXIT:
        return n(u), u;

      default:
        return s;
    }
};