module.exports = function(t, n) {
    return function(r) {
        return t(n(r));
    };
};