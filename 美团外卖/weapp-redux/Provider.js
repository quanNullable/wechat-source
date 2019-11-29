var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./warning.js")), t = require("../utils/object-assign.js"), r = function(t) {
    var r = [ "subscribe", "dispatch", "getState" ].filter(function(e) {
        return !t.hasOwnProperty(e);
    });
    r.length > 0 && (0, e.default)("Store似乎不是一个合法的Redux Store对象: 缺少这些方法: " + r.join(", ") + "。");
};

module.exports = function(e) {
    return r(e), function(r) {
        return t({}, r, {
            store: e
        });
    };
};