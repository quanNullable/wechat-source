var e = require("./trace-tag.js"), t = require("./object-assign.js"), r = require("./visit-id.js"), i = null;

module.exports = {
    start: function(t) {
        return i = e(t);
    },
    get: function(e) {
        var n = i;
        return n ? t({
            req_time: Date.now(),
            visitid: r()
        }, n, e) : n;
    },
    end: function(e) {
        var n = i;
        return n ? (i = null, t({
            req_time: Date.now(),
            visitid: r()
        }, n, e)) : n;
    }
};