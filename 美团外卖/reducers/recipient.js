var e = require("../actions/recipient.js"), r = require("../utils/object-assign.js"), t = require("../utils/filter-action.js"), i = {
    id: 0,
    phone: "",
    name: "",
    address: "",
    house_number: "",
    gender: "",
    latitude: "",
    longitude: "",
    partial: !1
};

module.exports = function() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i, s = arguments[1];
    switch (s.type) {
      case e.RECIPIENT_SET:
        var u = t(i, s);
        return u.partial = !1, r({}, a, u);

      case e.RECIPIENT_PARTIAL:
        var n = t(i, s);
        return n.partial = !0, r({}, i, n);

      default:
        return a;
    }
};