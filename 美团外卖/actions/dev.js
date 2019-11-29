Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./action.js"), D = exports.DEV_UUID_STORE = "DEV_UUID_STORE", E = exports.DEV_UUID_LOADED = "DEV_UUID_LOADED", _ = exports.DEV_ENV_STORE = "DEV_ENV_STORE", r = exports.DEV_ENV_LOADED = "DEV_ENV_LOADED";

exports.storeUUID = e(D), exports.loadedUUID = e(E), exports.storeENV = e(_), exports.loadedENV = e(r);