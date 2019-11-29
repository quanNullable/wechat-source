function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = e(require("./Provider.js")), t = e(require("./connect.js"));

module.exports = {
    Provider: r.default,
    connect: t.default
};