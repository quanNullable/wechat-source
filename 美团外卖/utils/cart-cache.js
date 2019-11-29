var t = function() {
    var t = Object.create(null);
    return {
        getItem: function(e, n) {
            return t[e] ? t[e][n] : null;
        },
        setItem: function(e, n) {
            t[e] || (t[e] = Object.create(null)), t[e][n.id] = n;
        },
        get: function(e) {
            return t[e];
        }
    };
};

module.exports = {
    sku: t(),
    spu: t()
};