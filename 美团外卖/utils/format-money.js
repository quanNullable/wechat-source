module.exports = function(t) {
    return t ? Math.abs(t) % 100 ? (Math.abs(t) / 100).toFixed(1) : Math.abs(t) / 100 : 0;
};