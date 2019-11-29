var n = null, e = require("../api/index.js").getFilterConditions;

module.exports = {
    get: function(t) {
        return n || e(t).then(function(e) {
            return n = e, e;
        });
    },
    clear: function() {
        n = null;
    }
};