var r = require("../utils/object-assign.js");

module.exports = function(t) {
    return function(e) {
        if (e) {
            var u = r({}, e);
            return u.type = t, u;
        }
        return {
            type: t
        };
    };
};