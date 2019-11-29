module.exports = function(t) {
    var e = "" + t, r = e.split(".");
    return r.length > 1 ? [ r[0], "." + r[1] ] : [ e, "" ];
};