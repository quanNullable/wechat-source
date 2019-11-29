Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.encrypt = function(t, r) {
    var r = r.slice(0, 16), n = e.default.enc.Utf8.parse(r), a = e.default.enc.Utf8.parse(r), u = t;
    u = JSON.stringify(u);
    var d = e.default.AES.encrypt(u, n, {
        iv: a,
        mode: e.default.mode.CBC,
        padding: e.default.pad.Pkcs7
    });
    return d = d.toString();
}, exports.encryptSeed = function(t, r) {
    var n = e.default.enc.Utf8.parse(r + "_" + t), a = e.default.SHA256(n).toString();
    return a = a.substr(0, 12), a = parseInt(a, 16), a += 46704096e5;
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../lib/aes"));