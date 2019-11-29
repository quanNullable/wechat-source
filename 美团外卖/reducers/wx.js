var e = require("../actions/wx.js"), i = require("../utils/object-assign.js"), t = require("../utils/filter-action.js");

module.exports = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
        x: 0,
        y: 0,
        z: 0,
        direction: 0,
        latitude: 0,
        longitude: 0,
        orig_latitude: 0,
        orig_longitude: 0,
        speed: 0,
        accuracy: 0,
        model: "unknown",
        pixelRatio: 0,
        windowWidth: 0,
        windowHeight: 0,
        language: "",
        version: "1.0.0",
        SDKVersion: 0,
        platform: "",
        system: "",
        nickName: "",
        avatarUrl: "",
        gender: "",
        province: "",
        city: "",
        country: "",
        ua: "",
        networkType: ""
    }, n = arguments[1];
    return n.type === e.WX_SET ? i({}, r, t(r, n)) : r;
};