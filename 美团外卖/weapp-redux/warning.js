module.exports = function(o) {
    "undefined" != typeof console && "function" == typeof console.error && console.error(o);
    try {
        throw new Error(o);
    } catch (o) {}
};