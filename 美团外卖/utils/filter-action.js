module.exports = function(e, r) {
    return Object.keys(r).reduce(function(t, n) {
        return e.hasOwnProperty(n) && (t[n] = r[n]), t;
    }, {});
};