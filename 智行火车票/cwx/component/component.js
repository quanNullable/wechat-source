var e = require("../cwx.js"), r = {
    city: "/cwx/component/city/city",
    calendar: "/cwx/component/calendar/calendar",
    imagebrowser: "/cwx/component/imagebrowser/imagebrowser",
    shipforeignpassanger: "/pages/ship/foreignpassenger/index"
}, a = {};

for (var n in r) !function(n) {
    a[n] = function(a, c) {
        var i = a;
        arguments.length > 1 && (i = {
            data: a,
            callback: c
        });
        var o = e.cwx.getCurrentPage();
        i.url = r[n], o.navigateTo(i);
    };
}(n);

module.exports = a;