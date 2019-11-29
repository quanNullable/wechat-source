module.exports = function(e) {
    var i = e.toFixed(2);
    return ".00" === i.slice(-3) ? i.slice(0, -3) : "0" === i.slice(-1) ? i.slice(0, -1) : i;
};