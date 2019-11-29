var e = require("../actions/purchase.js"), r = require("../actions/poi.js"), t = require("../utils/object-assign.js"), s = require("../utils/filter-action.js"), i = {
    id: 0,
    phone: "",
    name: "",
    address: "",
    house_number: "",
    gender: "",
    latitude: "",
    longitude: "",
    caution: "",
    token: "",
    prefer: !1
};

module.exports = function() {
    var u = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i, n = arguments[1];
    switch (n.type) {
      case e.PURCHASE_SET_RECIPIENT:
        var a = s(i, n);
        return a.prefer = !0, t({}, u, a);

      case e.PURCHASE_SET_TOKEN:
        return t({}, u, s(i, n));

      case r.POI_EXIT:
      case e.PURCHASE_UNSET:
        return i;

      default:
        return u;
    }
};