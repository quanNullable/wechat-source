var e = require("../actions/dev.js"), r = require("../utils/wx.js").storage.setItem, s = require("../utils/object-assign.js"), t = require("../constants.js"), u = t.KEY_UUID, i = t.KEY_ENV;

module.exports = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
        uuid: "",
        env: ""
    }, n = arguments[1], E = n.uuid, a = n.env;
    switch (n.type) {
      case e.DEV_UUID_STORE:
        r(u, E);

      case e.DEV_UUID_LOADED:
        return s({}, t, {
            uuid: E
        });

      case e.DEV_ENV_STORE:
        return r(i, a), t;

      case e.DEV_ENV_LOADED:
        return s({}, t, {
            env: a
        });

      default:
        return t;
    }
};