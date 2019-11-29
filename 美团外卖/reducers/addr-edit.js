var e = require("../actions/addr-edit.js"), t = require("../utils/object-assign.js"), r = require("../utils/filter-action.js"), i = {
    id: "",
    phone: "",
    name: "",
    address: "",
    house_number: "",
    gender: "",
    latitude: "",
    longitude: "",
    bind_type: ""
};

module.exports = function() {
    var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i, u = arguments[1];
    switch (u.type) {
      case e.ADDR_EDIT_SET:
        return t({}, s, r(i, u));

      case e.ADDR_EDIT_UNSET:
        return i;

      default:
        return s;
    }
};