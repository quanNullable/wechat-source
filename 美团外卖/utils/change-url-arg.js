module.exports = function(e, t, r) {
    var c = t + "=([^&]*)", a = t + "=" + r;
    return e.match(c) ? e.replace(new RegExp("(" + t + "=)([^&]*)"), a) : e.match("[?]") ? e + "&" + a : e + "?" + a;
};