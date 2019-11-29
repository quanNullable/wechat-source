module.exports = function(o) {
    var t = Math.floor(o / 100), r = parseInt((o % 100).toFixed(0), 10), e = Math.floor(r / 10), a = Math.floor(r % 10);
    return 0 === r ? "" + t : 0 === a ? t + "." + e : t + "." + e + a;
};