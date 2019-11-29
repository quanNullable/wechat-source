var e = require("../../3rd/crypto-js/crypto-js"), t = {
    getRequestObject: function(e, t, a, r) {
        var s = {};
        return s.url = "/restapi/soa2/" + e, s.data = t, s.success = a, s.fail = r, console.log(s), 
        s;
    },
    getGatewayRequestObj: function(e, t, a, r) {
        var s = {};
        return s.url = "/gateway/api/" + e, s.data = t, s.success = a, s.fail = r, console.log(s), 
        s;
    },
    getRequestObjectV1: function(e, t, a, r) {
        var s = {};
        return s.url = "https://m.tieyou.com/jy/index.php?param=" + e + ".html", s.data = t, 
        s.success = a, s.fail = r, console.log(s), s;
    },
    bindAccountV1: function(t, a, r, s) {
        var c = {}, o = e.enc.Utf8.parse("-!@QWaszx#^GDFUN"), n = e.enc.Utf8.parse("09,.34ajoydfuEEi"), u = e.AES.encrypt(t, o, {
            iv: n
        });
        return c.data = {
            mobile: u.toString(),
            partnerName: a
        }, c.success = r, c.fail = s, c.url = "/restapi/soa2/10957/json/AccountBindV1", 
        c;
    }
};

module.exports = t;